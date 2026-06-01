#!/bin/bash
# ============================================================
# install_server.sh — runs as CPANEL_USER (called by deploy.sh)
# DO NOT run yarn build here. Frontend build is pre-committed.
# ============================================================
set -e

CPANEL_USER="riverroadmetal"
PORT=8008
DOMAIN="riverroadmetal.com"

REPO="/home/${CPANEL_USER}/repo"
PROD="/opt/${CPANEL_USER}/backend"
PH="/home/${CPANEL_USER}/public_html"

echo ">>> [user] Python venv"
python3.9 -m venv "$PROD/venv" 2>/dev/null || python3 -m venv "$PROD/venv"
source "$PROD/venv/bin/activate"
pip install --upgrade pip setuptools wheel
pip install \
    --extra-index-url https://d33sy5i8bnduwe.cloudfront.net/simple/ \
    -r "$REPO/deploy/requirements.prod.txt"

echo ">>> [user] Copy backend (excluding venv, .env, logs)"
rsync -a \
    --exclude '__pycache__' --exclude 'tests' \
    --exclude '.env' --exclude 'venv' --exclude 'backend.log' \
    "$REPO/backend/" "$PROD/"

echo ">>> [user] Deploy pre-built frontend"
if [ ! -f "$REPO/frontend/build/index.html" ]; then
    echo "X frontend/build/index.html MISSING — build in Emergent and commit it"
    exit 1
fi
mkdir -p "$PH"
rm -rf "$PH/static" "$PH/index.html" "$PH/asset-manifest.json" "$PH/favicon.ico" "$PH/favicon.png" "$PH/manifest.json" "$PH/robots.txt" "$PH/brand"
cp -r "$REPO/frontend/build/." "$PH/"
cp "$REPO/deploy/htaccess" "$PH/.htaccess"
find "$PH" -type f -exec chmod 644 {} \;
find "$PH" -type d -exec chmod 755 {} \;

echo ">>> [user] Start backend on port $PORT"
pkill -f "uvicorn.*:${PORT}" 2>/dev/null || true
sleep 1
cd "$PROD"
nohup "$PROD/venv/bin/uvicorn" server:app --host 127.0.0.1 --port "$PORT" --workers 1 \
    > "$PROD/backend.log" 2>&1 &
sleep 4
curl -sf "http://127.0.0.1:${PORT}/api/" || { tail -n 40 "$PROD/backend.log"; exit 1; }

echo ">>> [user] Write restart helper"
cat > "/home/${CPANEL_USER}/restart.sh" <<EOF
#!/bin/bash
pkill -f "uvicorn.*:${PORT}" 2>/dev/null || true
sleep 1
cd ${PROD}
nohup ${PROD}/venv/bin/uvicorn server:app --host 127.0.0.1 --port ${PORT} --workers 1 > ${PROD}/backend.log 2>&1 &
EOF
chmod +x "/home/${CPANEL_USER}/restart.sh"

echo "  ✅ install_server.sh done"
