#!/bin/bash
# ============================================================
# diagnose.sh — runs as root; prints 13 health checks
# ============================================================
CPANEL_USER="riverroadmetal"
PORT=8008
DOMAIN="riverroadmetal.com"
DB_NAME="riverroad_prod"

REPO="/home/${CPANEL_USER}/repo"
PROD="/opt/${CPANEL_USER}/backend"
PH="/home/${CPANEL_USER}/public_html"

ok()  { echo "  ✅ $1"; }
bad() { echo "  ❌ $1"; }

echo "=========================================="
echo "  River Road — Deployment Diagnose"
echo "=========================================="

echo ""
echo "[1] cPanel user exists"
id "$CPANEL_USER" >/dev/null 2>&1 && ok "$CPANEL_USER" || bad "$CPANEL_USER missing"

echo ""
echo "[2] Repo present"
[ -d "$REPO/.git" ] && ok "$REPO" || bad "no git repo at $REPO"

echo ""
echo "[3] Python venv healthy"
[ -f "$PROD/venv/bin/activate" ] && ok "$PROD/venv" || bad "$PROD/venv broken"

echo ""
echo "[4] Backend .env present"
[ -f "$PROD/.env" ] && ok "$PROD/.env" || bad "no .env"

echo ""
echo "[5] frontend/build exists in repo"
[ -f "$REPO/frontend/build/index.html" ] && ok "build OK" || bad "missing build"

echo ""
echo "[6] public_html populated"
[ -f "$PH/index.html" ] && ok "$PH/index.html" || bad "no index.html"

echo ""
echo "[7] .htaccess present"
[ -f "$PH/.htaccess" ] && ok ".htaccess OK" || bad "no .htaccess"

echo ""
echo "[8] Backend process running"
PID=$(pgrep -af "uvicorn.*:${PORT}" | head -n1 | awk '{print $1}')
if [ -n "$PID" ]; then ok "uvicorn PID $PID on :$PORT"; else bad "uvicorn NOT running on :$PORT"; fi

echo ""
echo "[9] Backend responding locally"
if curl -sf "http://127.0.0.1:$PORT/api/" >/dev/null; then ok "200 OK on /api/"; else bad "no response on /api/"; fi

echo ""
echo "[10] Apache modules"
for m in proxy proxy_http headers rewrite; do
    if httpd -M 2>/dev/null | grep -q "${m}_module"; then ok "mod_$m"; else bad "mod_$m missing"; fi
done

echo ""
echo "[11] MongoDB up"
if pgrep -x mongod >/dev/null; then ok "mongod"; else bad "mongod NOT running"; fi

echo ""
echo "[12] DB name present"
if command -v mongosh >/dev/null; then
    if mongosh --quiet --eval "db.adminCommand('listDatabases').databases.map(d => d.name).includes('${DB_NAME}')" 2>/dev/null | grep -q true; then
        ok "DB ${DB_NAME} exists"
    else
        echo "  ⚠️  DB ${DB_NAME} not yet created (will be on first write)"
    fi
fi

echo ""
echo "[13] HTTPS reachable"
HTTP=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN/api/" || echo "000")
if [ "$HTTP" = "200" ]; then ok "https://$DOMAIN/api/ → 200"; else bad "https://$DOMAIN/api/ → $HTTP"; fi

echo ""
echo "=========================================="
echo "Logs:"
echo "  tail -n 50 $PROD/backend.log"
echo "  tail -n 50 /usr/local/apache/logs/error_log"
echo "=========================================="
