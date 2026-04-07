# Placement Management System

A full-stack application for managing student placements and company drives.

## Project Structure

```
backend/                  # Node.js API server
├── routes/              # API endpoints (auth, company, drive, student, application)
├── sql/                 # Database schema
├── server.js            # Main server
└── db.js                # Database config

frontend/                # Static web pages
├── public/              # HTML pages
├── script.js            # Client-side logic
└── images/              # Assets
```

## Quick Start

```bash
# Install and start everything
npm run install-all
npm start
```

**OR** run separately:
```bash
cd backend && npm install && npm start    # http://localhost:3000
```

Frontend is served by backend or via any static server.

## Configuration

- Backend: Configure database in `backend/db.js`
- Database: Run `backend/sql/schema.sql` on your MySQL instance
- Frontend: Update API endpoints if backend is remote

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/signup` | User registration |
| POST | `/api/auth/signin` | User login |
| GET/POST | `/api/company` | Company management |
| GET/POST | `/api/drives` | Drive operations |
| GET/POST | `/api/applications` | Application handling |
| GET/POST | `/api/students` | Student operations |

## Deployment

**Backend**: Deploy to cloud service (Heroku, AWS, Vercel)
**Frontend**: Deploy to static hosting (Netlify, Vercel, GitHub Pages) or serve via backend

## Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: HTML, CSS, JavaScript
- **Database**: MySQL
