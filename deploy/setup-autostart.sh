#!/bin/bash
# ============================================================
# setup-autostart.sh — crontab @reboot + daily Mongo backup.
# Runs as CPANEL_USER. Idempotent.
# ============================================================
set -e

CPANEL_USER="riverroadmetal"
DB_NAME="riverroad_prod"

RESTART="/home/${CPANEL_USER}/restart.sh"
BACKUP_DIR="/home/${CPANEL_USER}/backups"
mkdir -p "$BACKUP_DIR"

CRON="$(crontab -l 2>/dev/null || true)"

# @reboot autostart
if ! echo "$CRON" | grep -q "$RESTART"; then
    (echo "$CRON"; echo "@reboot bash $RESTART > /home/${CPANEL_USER}/restart.log 2>&1") | crontab -
    echo "  ✅ @reboot autostart added"
fi

# Daily Mongo backup 3 AM, 14-day retention
CRON="$(crontab -l 2>/dev/null || true)"
if ! echo "$CRON" | grep -q "mongodump --db ${DB_NAME}"; then
    (echo "$CRON"; echo "0 3 * * * mongodump --db ${DB_NAME} --out ${BACKUP_DIR}/\$(date +\\%Y\\%m\\%d) --quiet && find ${BACKUP_DIR} -mindepth 1 -maxdepth 1 -type d -mtime +14 -exec rm -rf {} \\;") | crontab -
    echo "  ✅ Daily Mongo backup scheduled (3 AM, retain 14 days)"
fi

echo "  ✅ setup-autostart.sh done"
