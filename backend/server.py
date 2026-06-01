from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

import os
import logging
import uuid
import bcrypt
import jwt
from datetime import datetime, timezone, timedelta
from typing import List, Optional, Literal

from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr, ConfigDict


# ---------- Mongo ----------
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]


# ---------- App ----------
app = FastAPI(title="River Road Custom Metal Fabrication API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("riverroad")


# ---------- Auth helpers ----------
JWT_ALGORITHM = "HS256"
JWT_EXPIRY_HOURS = int(os.environ.get("JWT_EXPIRY_HOURS", "24"))

def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))

def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRY_HOURS),
        "type": "access",
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)

bearer_scheme = HTTPBearer(auto_error=False)

async def get_current_admin(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme),
) -> dict:
    if not credentials or not credentials.credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = credentials.credentials
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"id": payload["sub"]})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return {"id": user["id"], "email": user["email"], "name": user.get("name", "Admin"), "role": user.get("role", "admin")}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ---------- Models ----------
class LoginInput(BaseModel):
    email: EmailStr
    password: str

class AdminUser(BaseModel):
    id: str
    email: EmailStr
    name: str
    role: str

class LoginResponse(BaseModel):
    access_token: str
    user: AdminUser


ServiceType = Literal[
    "Custom Metal Fabrication",
    "Welding Services",
    "On-Site Welding",
    "Equipment / Trailer Repair",
    "Structural Metalwork",
    "Portable Rock Wash Plant (Sale/Rent)",
    "Concrete Batch Plant (Sale/Rent)",
    "Slip Form Paver",
    "Sand Screw (Sale)",
    "Aggregate Equipment Sales",
    "Aggregate Equipment Rentals",
    "Crushing Support Equipment",
    "Other",
]

ContactMethod = Literal["Phone", "Email"]
QuoteStatus = Literal["new", "in_review", "contacted", "closed"]


class QuoteCreateInput(BaseModel):
    model_config = ConfigDict(extra="ignore")
    full_name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=5, max_length=40)
    company: Optional[str] = Field(default=None, max_length=160)
    service_type: ServiceType
    project_details: str = Field(min_length=1, max_length=5000)
    preferred_contact: ContactMethod = "Email"


class Quote(BaseModel):
    id: str
    full_name: str
    email: EmailStr
    phone: str
    company: Optional[str] = None
    service_type: str
    project_details: str
    preferred_contact: str
    status: str
    created_at: datetime


class QuoteStatusUpdate(BaseModel):
    status: QuoteStatus


# ---------- Public routes ----------
@api_router.get("/")
async def root():
    return {"service": "River Road Custom Metal Fabrication API", "status": "ok"}


@api_router.post("/quotes", response_model=Quote, status_code=201)
async def submit_quote(payload: QuoteCreateInput):
    quote_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    doc = {
        "id": quote_id,
        "full_name": payload.full_name.strip(),
        "email": payload.email.lower().strip(),
        "phone": payload.phone.strip(),
        "company": (payload.company or "").strip() or None,
        "service_type": payload.service_type,
        "project_details": payload.project_details.strip(),
        "preferred_contact": payload.preferred_contact,
        "status": "new",
        "created_at": now.isoformat(),
    }
    await db.quotes.insert_one(doc)
    logger.info(f"New quote submitted: {quote_id} - {doc['service_type']} - {doc['email']}")
    return Quote(**{**doc, "created_at": now})


# ---------- Auth routes ----------
@api_router.post("/auth/login", response_model=LoginResponse)
async def login(payload: LoginInput):
    email = payload.email.lower().strip()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(user["id"], user["email"])
    return LoginResponse(
        access_token=token,
        user=AdminUser(id=user["id"], email=user["email"], name=user.get("name", "Admin"), role=user.get("role", "admin")),
    )


@api_router.get("/auth/me", response_model=AdminUser)
async def me(current: dict = Depends(get_current_admin)):
    return AdminUser(**current)


# ---------- Admin routes ----------
@api_router.get("/admin/quotes", response_model=List[Quote])
async def list_quotes(
    status_filter: Optional[QuoteStatus] = None,
    current: dict = Depends(get_current_admin),
):
    query: dict = {}
    if status_filter:
        query["status"] = status_filter
    cursor = db.quotes.find(query, {"_id": 0}).sort("created_at", -1).limit(500)
    items = await cursor.to_list(500)
    for q in items:
        if isinstance(q.get("created_at"), str):
            q["created_at"] = datetime.fromisoformat(q["created_at"])
    return [Quote(**q) for q in items]


@api_router.get("/admin/quotes/stats")
async def quote_stats(current: dict = Depends(get_current_admin)):
    pipeline = [{"$group": {"_id": "$status", "count": {"$sum": 1}}}]
    agg = await db.quotes.aggregate(pipeline).to_list(50)
    totals = {row["_id"]: row["count"] for row in agg}
    total = sum(totals.values())
    return {
        "total": total,
        "new": totals.get("new", 0),
        "in_review": totals.get("in_review", 0),
        "contacted": totals.get("contacted", 0),
        "closed": totals.get("closed", 0),
    }


@api_router.patch("/admin/quotes/{quote_id}", response_model=Quote)
async def update_quote_status(
    quote_id: str,
    payload: QuoteStatusUpdate,
    current: dict = Depends(get_current_admin),
):
    result = await db.quotes.find_one_and_update(
        {"id": quote_id},
        {"$set": {"status": payload.status}},
        return_document=True,
        projection={"_id": 0},
    )
    if not result:
        raise HTTPException(status_code=404, detail="Quote not found")
    if isinstance(result.get("created_at"), str):
        result["created_at"] = datetime.fromisoformat(result["created_at"])
    return Quote(**result)


@api_router.delete("/admin/quotes/{quote_id}")
async def delete_quote(quote_id: str, current: dict = Depends(get_current_admin)):
    result = await db.quotes.delete_one({"id": quote_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Quote not found")
    return {"ok": True}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- Startup: seed admin ----------
@app.on_event("startup")
async def startup_event():
    await db.users.create_index("email", unique=True)
    await db.quotes.create_index("created_at")
    await db.quotes.create_index("status")

    admin_email = os.environ.get("ADMIN_EMAIL", "admin@example.com").lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "admin123")

    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        await db.users.insert_one({
            "id": str(uuid.uuid4()),
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "name": "River Road Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info(f"Admin user seeded: {admin_email}")
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one(
            {"email": admin_email},
            {"$set": {"password_hash": hash_password(admin_password)}},
        )
        logger.info(f"Admin password updated: {admin_email}")

    # Super-admin (global operator) — idempotent
    super_email = os.environ.get("SUPER_ADMIN_EMAIL", "").lower().strip()
    super_password = os.environ.get("SUPER_ADMIN_PASSWORD", "").strip()
    if super_email and super_password:
        s_existing = await db.users.find_one({"email": super_email})
        if s_existing is None:
            await db.users.insert_one({
                "id": str(uuid.uuid4()),
                "email": super_email,
                "password_hash": hash_password(super_password),
                "name": "Super Admin",
                "role": "super_admin",
                "created_at": datetime.now(timezone.utc).isoformat(),
            })
            logger.info(f"Super admin seeded: {super_email}")
        elif not verify_password(super_password, s_existing["password_hash"]):
            await db.users.update_one(
                {"email": super_email},
                {"$set": {"password_hash": hash_password(super_password), "role": "super_admin"}},
            )
            logger.info(f"Super admin password updated: {super_email}")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
