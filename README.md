# Book of Dragons

Book of Dragons is a full-stack, fan-made encyclopedia for the *How to Train Your Dragon* universe. Visitors can search for dragons and classes, then explore species profiles with stats, abilities, habitats, and image galleries.

## Project highlights

- **Public catalog and admin dashboard.** The same React app serves the public encyclopedia and an admin area for managing dragons, classes, abilities, locations, and images.
- **Versioned REST API.** FastAPI exposes catalog and authentication endpoints under `/api/v1`, with interactive OpenAPI documentation at `/docs`.
- **Relational catalog and account storage.** PostgreSQL models relationships between species, abilities, and locations with SQLModel and Alembic migrations. MongoDB stores user accounts, and Redis tracks revoked JWTs.
- **Data import.** A Python CLI parses wiki pages and loads structured dragon records into the catalog.

- **Frontend** · React, TypeScript, Vite, Tailwind CSS, TanStack Query
- **Backend** · Python, FastAPI, SQLModel, Alembic, PostgreSQL, MongoDB, Redis, Celery

## Run locally

Use Node.js 24 and Python 3.14. Start PostgreSQL, MongoDB, and Redis, then create `backend/.env` with the required settings. Use a `postgresql+asyncpg://` URL for `DATABASE_URL`. [Configuration reference](backend/src/config.py)

From the repository root, set up and start the API.

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
python -m pip install fastapi uvicorn alembic 'sqlalchemy[asyncio]' sqlmodel \
  asyncpg pydantic-settings pymongo 'celery[redis]' bcrypt pyjwt itsdangerous \
  fastapi-mail jinja2 asgiref httpx beautifulsoup4 tqdm
mkdir -p src/templates
alembic upgrade head
uvicorn src:app --reload
```

From the repository root in a second terminal, start the frontend.

```bash
cd frontend
npm ci
VITE_API_URL=http://127.0.0.1:8000/api/v1 \
  VITE_GITHUB_URL=https://github.com/0x3ef/httyd-book-of-dragons npm run dev
```

The frontend runs on port 5173 and the API on port 8000. A fresh database has an empty catalog. Email flows require templates, a Celery worker, and an SMTP service.
