#!/bin/bash
# ============================================================
# River Road Custom Metal Fabrication — Deploy entrypoint
# Run as ROOT on the VPS. One command updates everything.
# ============================================================
set -e

# ============ AJUSTA ESTAS 4 VARIABLES ============
REPO_URL="https://github.com/Pzsuave007/riverroad.git"
CPANEL_USER="riverroadmetal"
PORT=8008
DOMAIN="riverroadmetal.com"
# ===================================================

REPO="/home/${CPANEL_USER}/repo"
PROD="/opt/${CPANEL_USER}/backend"

if [ "$EUID" -ne 0 ]; then
    echo "X Run as root"
    exit 1
fi

git config --global --add safe.directory '*' 2>/dev/null || true

as_user() { su -s /bin/bash -l "$CPANEL_USER" -c "$1"; }

# DETECCIÓN ROBUSTA: por activate file, NO por el directorio
if [ ! -f "$PROD/venv/bin/activate" ]; then
    echo ">>> FIRST-TIME INSTALL for $CPANEL_USER on port $PORT"

    # LIMPIAR ESTADO ROTO (carpeta venv vacía de intento previo)
    rm -rf "$PROD/venv"

    if [ ! -d "$REPO/.git" ]; then
        rm -rf "$REPO"
        git clone "$REPO_URL" "$REPO"
    fi
    chown -R "$CPANEL_USER:$CPANEL_USER" "$REPO"
    chmod 711 "/home/$CPANEL_USER"
    mkdir -p "$PROD"
    chown -R "$CPANEL_USER:$CPANEL_USER" "/opt/$CPANEL_USER"

    if [ ! -f "$PROD/.env" ]; then
        cp "$REPO/deploy/backend.env.production.example" "$PROD/.env"
        sed -i "s|^JWT_SECRET=.*|JWT_SECRET=$(openssl rand -hex 64)|" "$PROD/.env"
        chown "$CPANEL_USER:$CPANEL_USER" "$PROD/.env"
        chmod 600 "$PROD/.env"
        echo "  ⚠️  Edit $PROD/.env to set SUPER_ADMIN_PASSWORD and ADMIN_PASSWORD."
    fi

    as_user "bash $REPO/deploy/install_server.sh"
    as_user "bash $REPO/deploy/setup-autostart.sh"
else
    echo ">>> UPDATE for $CPANEL_USER"
    chown -R "$CPANEL_USER:$CPANEL_USER" "$REPO"
    as_user "bash $REPO/deploy/fix.sh"
fi

sleep 3
if curl -sf "http://127.0.0.1:$PORT/api/" >/dev/null; then
    echo "  ✅ Backend OK on port $PORT"
    echo "  🎉 https://$DOMAIN/"
else
    echo "  ❌ Backend not responding:"
    tail -n 30 "$PROD/backend.log" 2>/dev/null || true
    exit 1
fi
