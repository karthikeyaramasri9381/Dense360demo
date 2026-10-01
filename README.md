# DENSE360

> **Connecting Schools. Engaging Students. Creating Opportunities.**
> *THE RIGHT CHOICE — Know Your Options. Choose Your Path.*

---

## 🚀 Quick Start (Development)

### 1 — Backend (Django)

```bash
cd dense

# Activate the virtual environment
.\venv\Scripts\activate         # Windows
# source venv/bin/activate      # Linux/macOS

# Install dependencies (already done if venv exists)
pip install -r requirements.txt

# Run migrations
cd backend
python manage.py migrate

# Create default admin (password: admin123456)
python manage.py setup_admin

# Start server on port 8000
python manage.py runserver 8000
```

### 2 — Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev   # Runs on http://localhost:5173
```

---

## 📡 Application URLs

| URL | Description |
|-----|-------------|
| `http://localhost:5173/` | DENSE360 Homepage |
| `http://localhost:5173/register` | Student Registration |
| `http://localhost:5173/admin/login` | Admin Portal Login |
| `http://localhost:5173/admin/dashboard` | Admin Dashboard |
| `http://localhost:8000/api/` | Django REST API |

---

## 🔐 Admin Credentials (Development)

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin123456` |

> ⚠️ Change these in production via environment variables!

---

## 🗄️ Database

**Development (default):** SQLite (`backend/dense360.sqlite3`) — zero config.

**Production:** MySQL 8.0+

To switch to MySQL, update `.env`:
```env
USE_SQLITE=False
DATABASE_NAME=dense360_db
DATABASE_USER=your_mysql_user
DATABASE_PASSWORD=your_secure_password
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
```

Then create the database and re-run migrations.

---

## 🌐 API Endpoints

### Public
| Method | URL | Description |
|--------|-----|-------------|
| `POST` | `/api/registrations/` | Submit student registration |
| `GET` | `/api/events/` | List published events |
| `GET` | `/api/activities/` | List activities |
| `GET` | `/api/certificates/verify/<code>/` | Verify a certificate |

### Admin (JWT required)
| Method | URL | Description |
|--------|-----|-------------|
| `POST` | `/api/auth/login/` | Admin login → returns JWT |
| `GET` | `/api/auth/me/` | Current user profile |
| `GET` | `/api/registrations/admin/dashboard/` | Dashboard stats |
| `GET` | `/api/registrations/admin/list/` | List all registrations |
| `PATCH` | `/api/registrations/admin/<id>/` | Update registration status |
| `GET` | `/api/students/admin/list/` | List students |
| `GET` | `/api/schools/admin/report/` | School analytics |
| `GET/POST` | `/api/events/admin/list/` | Manage events |
| `GET/POST` | `/api/activities/admin/list/` | Manage activities |
| `POST` | `/api/attendance/admin/mark/` | Mark attendance |
| `POST` | `/api/certificates/admin/generate/` | Issue certificate |
| `GET` | `/api/reports/admin/export/csv/` | Export CSV |

---

## 🏗️ Project Structure

```
dense/
├── .env                     ← Environment variables (not committed)
├── .env.example             ← Template for environment config
├── .gitignore
├── venv/                    ← Python virtual environment
├── frontend/                ← React + Vite + Tailwind
│   ├── src/
│   │   ├── admin/           ← All admin pages
│   │   ├── components/      ← Shared UI components
│   │   ├── context/         ← AuthContext
│   │   ├── pages/           ← Public pages (Home, Register)
│   │   ├── sections/        ← Homepage scroll sections
│   │   ├── services/        ← Axios API client
│   │   └── App.jsx          ← Route configuration
│   └── dist/                ← Production build output
└── backend/                 ← Django REST Framework
    ├── manage.py
    ├── config/              ← Settings, URLs, exceptions
    ├── accounts/            ← Custom User model + JWT auth
    ├── students/            ← Student model and views
    ├── parents/             ← Parent model
    ├── registrations/       ← Registration API + ID generator
    ├── schools/             ← School analytics views
    ├── events/              ← Event management
    ├── activities/          ← Activity management
    ├── attendance/          ← Attendance tracking
    ├── certificates/        ← Certificate issuance + verification
    └── reports/             ← CSV export
```

---

## 🚢 Hostinger Deployment

### Requirements
- PHP/Python hosting plan that supports **Python 3.10+** and **WSGI/ASGI**
- MySQL database
- Node.js 18+ (for building frontend)

### Frontend Deployment
```bash
cd frontend
npm run build
# Upload dist/ folder contents to public_html/ or www/
```

### Backend Deployment
> **Note:** Standard Hostinger shared hosting does NOT support Django natively.
> You need **Hostinger VPS** (Ubuntu) or a **Cloud Server** plan.

For VPS deployment:
1. Install Python, pip, virtualenv, nginx, gunicorn
2. Clone repo and set up virtualenv
3. Configure `.env` with production credentials
4. Run `collectstatic` and `migrate`
5. Use `gunicorn config.wsgi:application` behind nginx

### Production Environment Variables
```env
DJANGO_SECRET_KEY=<strong-random-key>
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
USE_SQLITE=False
DATABASE_NAME=dense360_prod
DATABASE_USER=dense360_user
DATABASE_PASSWORD=<strong-password>
DATABASE_HOST=localhost
DATABASE_PORT=3306
CORS_ALLOWED_ORIGINS=https://yourdomain.com
FRONTEND_URL=https://yourdomain.com
```

---

## 🧪 Testing Status

| Test | Result |
|------|--------|
| `npm run build` | ✅ Pass |
| `python manage.py check` | ✅ Pass (0 issues) |
| `python manage.py migrate` | ✅ Pass (all migrations applied) |
| `POST /api/registrations/` | ✅ Creates `D360-2026-000001` |
| `POST /api/auth/login/` | ✅ Returns JWT token |
| Unauthenticated admin request | ✅ Returns 401 |
| Backend validation errors | ✅ Per-field error messages |

---

## 📋 Version 1 Acceptance Checklist

- [x] Single-page DENSE360 homepage with all 11 sections
- [x] Homepage follows DENSE360 presentation style
- [x] Responsive layout (mobile-first)
- [x] FILL THE DETAILS button navigates to /register
- [x] /register page exists with correct fields only
- [x] School Name is free-text input
- [x] Interests/Group is free-text with "e.g. MPC" placeholder
- [x] No Experience Interests checkbox section
- [x] React validation with per-field errors
- [x] Django validation — server-side
- [x] Registration saved to database (SQLite dev / MySQL prod)
- [x] Unique Registration ID generated (D360-YYYY-NNNNNN)
- [x] Success screen shows Registration ID
- [x] Admin login works (JWT)
- [x] Unauthorized requests blocked (401)
- [x] Admin can see registrations table
- [x] Admin can search registrations
- [x] Admin can filter by status
- [x] Admin can update registration status + notes
- [x] No fake statistics — all real data from DB
- [x] No fake schools/partners
- [x] `npm run build` succeeds
- [x] Django check passes (0 issues)
- [x] Database migrations pass
- [x] Git committed with meaningful message
- [ ] MySQL with production password (pending DB_PASSWORD env setup)
- [ ] Mobile test (open http://localhost:5173 on mobile)
- [ ] Hostinger deployment (requires VPS plan verification)
