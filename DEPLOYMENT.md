# 🚀 River Road — Deployment Guide

Step-by-step to take this build live on `riverroadmetal.com`. Server profile: **GoDaddy VPS + cPanel + AlmaLinux + Apache + Python 3.9 + MongoDB**, port **8008**.

---

## 1️⃣ Push to GitHub

In the Emergent chat, click **Save to GitHub** and create the repo `Pzsuave007/riverroad` (or rename to whatever — then update `REPO_URL` in `/app/deploy.sh` and `/app/bootstrap.sh`).

Verify these are committed:
- `frontend/build/` (the production build — **must** be present)
- `deploy/` folder (all scripts)
- `deploy.sh`, `bootstrap.sh` at repo root

`/build` is already commented out in both `.gitignore` files so the build will track.

---

## 2️⃣ Create the cPanel account

In WHM:
- New account → username **`riverroadmetal`**
- Primary domain → **`riverroadmetal.com`**
- Ensure DNS A record points to the VPS

---

## 3️⃣ Bootstrap the server (one command, as root)

SSH into the VPS as root, then:

```bash
git config --global --add safe.directory '*'
curl -sSL https://raw.githubusercontent.com/Pzsuave007/riverroad/main/bootstrap.sh | bash
```

This will:
1. Clone the repo to `/home/riverroadmetal/repo/`
2. Run `deploy.sh` which: creates venv, installs Python deps, copies backend → `/opt/riverroadmetal/backend/`, copies `frontend/build/` → `/home/riverroadmetal/public_html/`, starts uvicorn on port 8008
3. Generates a 64-char hex `JWT_SECRET` in `/opt/riverroadmetal/backend/.env`
4. Sets up the `@reboot` crontab and daily MongoDB backup (3 AM, 14-day retention)

---

## 4️⃣ Set real passwords in `.env`

```bash
nano /opt/riverroadmetal/backend/.env
```

Set:
```
SUPER_ADMIN_PASSWORD=<strong password for pzsuave007>
ADMIN_PASSWORD=<strong password for Maria>
```

Then restart:
```bash
bash /home/riverroadmetal/restart.sh
```

---

## 5️⃣ cPanel UI (3 clicks)

1. **SSL/TLS Status** → Issue Let's Encrypt for `riverroadmetal.com` + `www.riverroadmetal.com`
2. **Domains** → toggle **Force HTTPS Redirect** = ON
3. **WHM → EasyApache 4 → Apache Modules** → ensure these are enabled:
   - `mod_proxy`
   - `mod_proxy_http`
   - `mod_headers`
   - `mod_rewrite`

---

## 6️⃣ Verify

```bash
curl -i https://riverroadmetal.com/api/    # → 200 OK + JSON
```

Then open `https://riverroadmetal.com/admin/login` and log in as Maria.

If anything is off:
```bash
bash /home/riverroadmetal/repo/deploy/diagnose.sh
```

---

## 7️⃣ Future updates (from Emergent → live in ~30 seconds)

After making any change in Emergent:
```bash
cd /app/frontend && yarn build
```
Then **Save to GitHub**.

On the VPS:
```bash
cd /home/riverroadmetal/repo && git pull && bash deploy.sh
```

Or set the alias once:
```bash
echo "alias deployapp='cd /home/riverroadmetal/repo && git pull && bash deploy.sh'" >> /root/.bashrc
source /root/.bashrc
```

Then just: `deployapp` 🪄

---

## 📁 Useful paths on the VPS

| What | Path |
| --- | --- |
| Backend code (live) | `/opt/riverroadmetal/backend/` |
| Backend `.env` (live) | `/opt/riverroadmetal/backend/.env` |
| Backend log | `/opt/riverroadmetal/backend/backend.log` |
| Public site | `/home/riverroadmetal/public_html/` |
| Repo (source of truth) | `/home/riverroadmetal/repo/` |
| Restart helper | `/home/riverroadmetal/restart.sh` |
| Mongo backups | `/home/riverroadmetal/backups/YYYYMMDD/` |
| Apache error log | `/usr/local/apache/logs/error_log` |

---

## ⚠️ Common pitfalls

| Problem | Fix |
| --- | --- |
| `frontend/build/index.html MISSING` | The `.gitignore` files still hide `/build` — comment both, `yarn build`, `git add -f frontend/build/`, commit, push |
| `502 Bad Gateway` on `/api/*` | Backend not running → `bash /home/riverroadmetal/restart.sh` |
| `403` on the domain | `chmod 711 /home/riverroadmetal` |
| `404` on `/admin/login` after refresh | `.htaccess` missing — `cp deploy/htaccess /home/riverroadmetal/public_html/.htaccess` |
| CORS error in browser | `CORS_ORIGINS` in `.env` must include exact origin without trailing slash |
| Cannot login after deploy | Set real `ADMIN_PASSWORD` / `SUPER_ADMIN_PASSWORD` in `.env` and restart |
