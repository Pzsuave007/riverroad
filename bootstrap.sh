#!/bin/bash
# ============================================================
# River Road — bootstrap.sh
# First-time setup on a fresh VPS. Run as ROOT.
#
# Usage:
#   curl -sSL https://raw.githubusercontent.com/Pzsuave007/riverroad/main/bootstrap.sh | bash
# ============================================================
set -e

REPO_URL="https://github.com/Pzsuave007/riverroad.git"
CPANEL_USER="riverroadmetal"

if [ "$EUID" -ne 0 ]; then
    echo "X Run as root"
    exit 1
fi

echo ">>> Bootstrapping River Road on this VPS"
git config --global --add safe.directory '*' 2>/dev/null || true

# Sanity: tools we need
command -v git >/dev/null   || dnf install -y git
command -v curl >/dev/null  || dnf install -y curl
command -v rsync >/dev/null || dnf install -y rsync

REPO="/home/${CPANEL_USER}/repo"

if [ ! -d "$REPO/.git" ]; then
    echo ">>> Cloning repo to $REPO"
    rm -rf "$REPO"
    mkdir -p "/home/${CPANEL_USER}"
    git clone "$REPO_URL" "$REPO"
    chown -R "${CPANEL_USER}:${CPANEL_USER}" "$REPO"
else
    echo ">>> Repo already present at $REPO — pulling latest"
    cd "$REPO"
    git fetch origin && git reset --hard origin/main
    chown -R "${CPANEL_USER}:${CPANEL_USER}" "$REPO"
fi

echo ">>> Running deploy.sh"
bash "$REPO/deploy.sh"

echo ""
echo "  ✅ Bootstrap complete."
echo "  Next: cPanel UI → SSL (Let's Encrypt) + Force HTTPS + enable mod_proxy/mod_proxy_http/mod_headers/mod_rewrite"
