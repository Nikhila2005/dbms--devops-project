# Placement Management System

A full-stack web application for managing student placements and company drives.

## Project Structure

```
├── backend/                 # Backend API server
│   ├── routes/             # API route handlers
│   ├── sql/                # Database schema and scripts
│   ├── server.js           # Main server file
│   ├── db.js              # Database connection
│   ├── package.json        # Backend dependencies
│   └── node_modules/       # Backend dependencies
├── frontend/               # Frontend static files
│   ├── public/             # HTML pages
│   ├── images/             # Static images
│   ├── script.js           # Client-side JavaScript
│   └── package.json        # Frontend package info
└── package.json            # Root package.json for easy deployment
```

## Quick Start

### Option 1: Run Everything Together (Recommended)
```bash
# Install all dependencies
npm run install-all

# Start the application
npm start
```

### Option 2: Run Backend and Frontend Separately

#### Backend Only
```bash
cd backend
npm install
npm start
```

#### Frontend Only
The frontend consists of static files. You can serve them using:
- The backend server (serves frontend automatically)
- Any static file server (nginx, Apache, etc.)
- Live Server extension in VS Code

## Deployment

### Backend Deployment
1. Navigate to the `backend` folder
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. The server will run on `http://localhost:3000`

### Frontend Deployment
The frontend files are static and can be deployed to:
- **Static hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: AWS CloudFront, Cloudflare
- **Web server**: nginx, Apache

### Full Stack Deployment
1. Deploy backend to a cloud service (Heroku, AWS, DigitalOcean)
2. Deploy frontend to a static hosting service
3. Update API endpoints in frontend to point to your backend URL

## API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/company` - Company operations
- `GET /api/drives` - Drive management
- `GET /api/applications` - Application handling
- `GET /api/students` - Student operations

## Database Setup

1. Create a MySQL database
2. Run the SQL scripts from `backend/sql/schema.sql`
3. Update database connection details in `backend/db.js`

## Development

- Backend runs on port 3000
- Frontend is served statically by the backend
- All API calls are prefixed with `/api/`
- CORS is enabled for cross-origin requests
