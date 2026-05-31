"""Backend API tests for River Road Custom Metal Fabrication."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://metal-fab-oregon.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "maria@riverroadmetal.com"
ADMIN_PASSWORD = "RiverRoad2026!"


@pytest.fixture(scope="session")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def admin_token(session):
    r = session.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, f"Login failed: {r.status_code} {r.text}"
    data = r.json()
    assert "access_token" in data and data["access_token"]
    assert data["user"]["email"] == ADMIN_EMAIL
    return data["access_token"]


@pytest.fixture
def auth_headers(admin_token):
    return {"Authorization": f"Bearer {admin_token}", "Content-Type": "application/json"}


# ---- Health ----
class TestHealth:
    def test_root(self, session):
        r = session.get(f"{API}/")
        assert r.status_code == 200
        assert r.json().get("status") == "ok"


# ---- Auth ----
class TestAuth:
    def test_login_success(self, session):
        r = session.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        assert r.status_code == 200
        d = r.json()
        assert "access_token" in d
        assert d["user"]["email"] == ADMIN_EMAIL
        assert d["user"]["role"] == "admin"

    def test_login_invalid(self, session):
        r = session.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrong"})
        assert r.status_code == 401

    def test_login_unknown_user(self, session):
        r = session.post(f"{API}/auth/login", json={"email": "noone@example.com", "password": "x"})
        assert r.status_code == 401

    def test_me_with_token(self, session, auth_headers):
        r = session.get(f"{API}/auth/me", headers=auth_headers)
        assert r.status_code == 200
        d = r.json()
        assert d["email"] == ADMIN_EMAIL
        assert d["role"] == "admin"

    def test_me_no_token(self, session):
        r = requests.get(f"{API}/auth/me")  # fresh session w/o auth
        assert r.status_code == 401

    def test_me_bad_token(self, session):
        r = requests.get(f"{API}/auth/me", headers={"Authorization": "Bearer not.a.real.token"})
        assert r.status_code == 401


# ---- Public Quote Submission ----
class TestQuoteSubmit:
    def test_create_quote_minimal(self, session):
        payload = {
            "full_name": "TEST Jane Doe",
            "email": "test_jane@example.com",
            "phone": "(503) 555-0100",
            "service_type": "Custom Metal Fabrication",
            "project_details": "Need custom railings for shop entrance.",
        }
        r = session.post(f"{API}/quotes", json=payload)
        assert r.status_code == 201, r.text
        d = r.json()
        assert d["id"]
        assert d["status"] == "new"
        assert d["full_name"] == payload["full_name"]
        assert d["email"] == payload["email"].lower()
        assert d["service_type"] == payload["service_type"]
        assert d["preferred_contact"] == "Email"

    def test_create_quote_full(self, session):
        payload = {
            "full_name": "TEST Full Quote",
            "email": "test_full@example.com",
            "phone": "(503) 555-0200",
            "company": "TEST Acme Co",
            "service_type": "Welding Services",
            "project_details": "Onsite welding for trailer frame.",
            "preferred_contact": "Phone",
        }
        r = session.post(f"{API}/quotes", json=payload)
        assert r.status_code == 201, r.text
        d = r.json()
        assert d["company"] == "TEST Acme Co"
        assert d["preferred_contact"] == "Phone"

    def test_create_quote_invalid_service(self, session):
        r = session.post(f"{API}/quotes", json={
            "full_name": "TEST X",
            "email": "x@example.com",
            "phone": "1234567",
            "service_type": "NotAValidService",
            "project_details": "details",
        })
        assert r.status_code == 422

    def test_create_quote_missing_fields(self, session):
        r = session.post(f"{API}/quotes", json={"full_name": "TEST X"})
        assert r.status_code == 422

    def test_create_quote_invalid_email(self, session):
        r = session.post(f"{API}/quotes", json={
            "full_name": "TEST X",
            "email": "not-an-email",
            "phone": "1234567",
            "service_type": "Custom Metal Fabrication",
            "project_details": "x",
        })
        assert r.status_code == 422


# ---- Admin Quotes ----
class TestAdminQuotes:
    def test_list_requires_auth(self, session):
        r = requests.get(f"{API}/admin/quotes")
        assert r.status_code == 401

    def test_list_with_auth(self, session, auth_headers):
        r = session.get(f"{API}/admin/quotes", headers=auth_headers)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)

    def test_stats_requires_auth(self, session):
        r = requests.get(f"{API}/admin/quotes/stats")
        assert r.status_code == 401

    def test_stats_with_auth(self, session, auth_headers):
        r = session.get(f"{API}/admin/quotes/stats", headers=auth_headers)
        assert r.status_code == 200
        d = r.json()
        for k in ["total", "new", "in_review", "contacted", "closed"]:
            assert k in d
            assert isinstance(d[k], int)

    def test_full_crud_flow(self, session, auth_headers):
        # CREATE
        payload = {
            "full_name": "TEST CRUD User",
            "email": "test_crud@example.com",
            "phone": "5035550000",
            "service_type": "Equipment / Trailer Repair",
            "project_details": "CRUD flow test",
        }
        cr = session.post(f"{API}/quotes", json=payload)
        assert cr.status_code == 201
        qid = cr.json()["id"]

        # VERIFY in admin list
        lr = session.get(f"{API}/admin/quotes", headers=auth_headers)
        assert lr.status_code == 200
        ids = [q["id"] for q in lr.json()]
        assert qid in ids

        # PATCH status
        pr = session.patch(f"{API}/admin/quotes/{qid}",
                           json={"status": "in_review"}, headers=auth_headers)
        assert pr.status_code == 200
        assert pr.json()["status"] == "in_review"

        # PATCH invalid status
        bad = session.patch(f"{API}/admin/quotes/{qid}",
                            json={"status": "bogus"}, headers=auth_headers)
        assert bad.status_code == 422

        # Filter by status
        fr = session.get(f"{API}/admin/quotes",
                         params={"status_filter": "in_review"}, headers=auth_headers)
        assert fr.status_code == 200
        assert any(q["id"] == qid for q in fr.json())

        # DELETE
        dr = session.delete(f"{API}/admin/quotes/{qid}", headers=auth_headers)
        assert dr.status_code == 200

        # Confirm deleted
        dr2 = session.delete(f"{API}/admin/quotes/{qid}", headers=auth_headers)
        assert dr2.status_code == 404

    def test_patch_nonexistent(self, session, auth_headers):
        r = session.patch(f"{API}/admin/quotes/does-not-exist",
                          json={"status": "new"}, headers=auth_headers)
        assert r.status_code == 404
