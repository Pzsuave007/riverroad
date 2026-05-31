# River Road Custom Metal Fabrication — PRD

## Original Problem Statement
Marketing website for **River Road Custom Metal Fabrication LLC**, a woman-owned Oregon business providing:
- Custom metal fabrication
- Professional welding (MIG / TIG / Stick / Mobile)
- Structural & industrial metalwork
- Heavy equipment repair & rebuilds
- Aggregate processing equipment (sale & rental)
- Concrete production equipment (sale & rental)
- Slip form pavers & crushing support equipment

Tagline: **Built Strong. Built Local. Built Right.**
Contact: 1302 Candlewood Drive, Salem, Oregon 97303 • (503) 260-9474 • maria.riverroadmetal@gmail.com • Mon–Fri 8 AM–5 PM.

## User Personas
1. **Contractor / Construction PM** — needs custom steel work or trailer repair, wants a fast quote.
2. **Aggregate / Quarry operator** — needs equipment rental, rebuild, or purchase.
3. **Industrial / Agricultural facility manager** — looking for repairs and structural metalwork.
4. **Maria (admin)** — reviews submitted quotes, updates statuses, manages pipeline.

## User Choices Captured (initial intake)
- Quote handling: **Store in database only** (no email integration yet)
- File uploads: **Skipped** for v1
- Admin panel: **Yes, basic JWT login**
- Gallery: **Professional placeholder images** (metal/fab/welding)
- Design vibe: **Industrial / rugged dark steel** with clean professional polish

## Architecture
- **Backend**: FastAPI + MongoDB (Motor async). JWT (HS256, 24h) via `Authorization: Bearer`. Admin seeded from env (`ADMIN_EMAIL`, `ADMIN_PASSWORD`).
- **Frontend**: React 19 + React Router 7 + Tailwind + shadcn/ui + framer-motion + lucide-react. Industrial dark theme — Clash Display headings, Manrope body, Forge Black background, Spark Orange (#EA580C) accent.
- **Endpoints** (all under `/api`):
  - `POST /quotes` (public) — submit quote
  - `POST /auth/login` — admin login
  - `GET /auth/me` — current admin
  - `GET /admin/quotes` (auth) — list, optional `?status_filter=`
  - `GET /admin/quotes/stats` (auth) — counts by status
  - `PATCH /admin/quotes/{id}` (auth) — update status
  - `DELETE /admin/quotes/{id}` (auth) — remove quote

## Implemented (v1 — 2026-05-31)
- Public marketing site `/`: Navbar, Hero, About (woman-owned story + 8 pillars), Services (bento grid: fabrication, welding, structural, equipment repair), Equipment (aggregate, concrete, slip-form, crushing, hoppers, custom), Industries (6 sectors), Project Gallery (6 placeholder images), Quote Form, Footer.
- Quote Form: full validation, service dropdown, preferred contact radio, success/error toasts.
- Admin login `/admin/login` with JWT.
- Protected admin dashboard `/admin`: stats grid, filterable quote table, inline status update, detail dialog with mailto/tel links, delete with confirm, logout.
- Backend tests (18 cases) — 100% pass; Playwright E2E — 100% pass.
- Test credentials documented at `/app/memory/test_credentials.md`.

## Prioritized Backlog

### P1 — Recommended next
- **Email notifications** on new quote submission (Resend or SendGrid) so Maria gets immediate alerts.
- **File uploads** in quote form (drawings, photos, sketches) via Emergent object storage.
- **Quote export** (CSV) from admin dashboard.

### P2 — Nice to have
- Real project gallery upload (admin-managed) once client provides photos.
- Internal notes / comments per quote in admin dashboard.
- Search + date range filtering on quote list.
- SEO meta tags + sitemap + Open Graph cards for local search visibility.
- Google Business Profile + Maps embed in Contact section.
- Service-specific landing pages for SEO (e.g., `/welding-salem-oregon`).

### P3 — Optional polish
- Brute-force lockout on `/api/auth/login`.
- Migrate FastAPI `on_event` → `lifespan` handlers.
- Tighten CORS to explicit origin in production.
- Split `AdminDashboard.jsx` into smaller components.

## Test Credentials
See `/app/memory/test_credentials.md`.
