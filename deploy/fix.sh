#!/bin/bash
# ============================================================
# fix.sh — updates (pull latest + restart). Runs as CPANEL_USER.
# ============================================================
set -e

CPANEL_USER="riverroadmetal"
PORT=8008

REPO="/home/${CPANEL_USER}/repo"
PROD="/opt/${CPANEL_USER}/backend"
PH="/home/${CPANEL_USER}/public_html"

echo ">>> [user] git pull"
cd "$REPO"
git fetch origin && git reset --hard origin/main

if [ ! -f "$PROD/venv/bin/activate" ]; then
    echo "X venv missing — rm -rf $PROD/venv && bash $REPO/deploy.sh"
    exit 1
fi
source "$PROD/venv/bin/activate"

echo ">>> [user] Update python deps"
pip install \
    --extra-index-url https://d33sy5i8bnduwe.cloudfront.net/simple/ \
    -r "$REPO/deploy/requirements.prod.txt"

echo ">>> [user] Sync backend"
rsync -a \
    --exclude '__pycache__' --exclude 'tests' \
    --exclude '.env' --exclude 'venv' --exclude 'backend.log' \
    "$REPO/backend/" "$PROD/"

if [ -f "$REPO/frontend/build/index.html" ]; then
    echo ">>> [user] Sync frontend build"
    rm -rf "$PH/static" "$PH/index.html" "$PH/asset-manifest.json" "$PH/favicon.ico" "$PH/favicon.png" "$PH/manifest.json" "$PH/robots.txt" "$PH/brand"
    cp -r "$REPO/frontend/build/." "$PH/"
    cp "$REPO/deploy/htaccess" "$PH/.htaccess"
    find "$PH" -type f -exec chmod 644 {} \;
    find "$PH" -type d -exec chmod 755 {} \;
fi

echo ">>> [user] Restart backend"
pkill -f "uvicorn.*:${PORT}" 2>/dev/null || true
sleep 1
cd "$PROD"
nohup "$PROD/venv/bin/uvicorn" server:app --host 127.0.0.1 --port "$PORT" --workers 1 \
    > "$PROD/backend.log" 2>&1 &
sleep 4
curl -sf "http://127.0.0.1:${PORT}/api/" || { tail -n 40 "$PROD/backend.log"; exit 1; }

echo "  ✅ fix.sh done"
