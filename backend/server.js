import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import authRoutes from './routes/auth.js';
import companyRoutes from './routes/company.js';
import driveRoutes from './routes/drive.js';
import applicationRoutes from './routes/application.js';
import studentRoutes from './routes/student.js';

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware setup
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Check if running on Vercel (production) or locally
const isProduction = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';

if (!isProduction) {
    // Local development only
    const frontendPath = path.join(__dirname, '../frontend/public');
    
    if (fs.existsSync(frontendPath)) {
        app.use(express.static(frontendPath));
        app.get('/', (req, res) => {
            const indexPath = path.join(frontendPath, 'index.html');
            res.sendFile(indexPath);
        });
    } else {
        app.get('/', (req, res) => {
            res.json({ 
                message: 'DBMS Placement API Server - Local Development (API Only)',
                version: '1.0.0',
                environment: 'development',
                endpoints: {
                    auth: '/api/auth',
                    company: '/api/company',
                    drives: '/api/drives',
                    applications: '/api/applications',
                    students: '/api/students'
                }
            });
        });
    }
} else {
    // Production mode - Vercel deployment
    app.get('/', (req, res) => {
        res.json({ 
            message: 'DBMS Placement API Server',
            version: '1.0.0',
            environment: 'production',
            status: 'running',
            endpoints: {
                auth: '/api/auth',
                company: '/api/company',
                drives: '/api/drives',
                applications: '/api/applications',
                students: '/api/students'
            },
            documentation: 'API endpoints available under /api/*'
        });
    });
}

// API route handlers
app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/drives', driveRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/students', studentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
        uptime: process.uptime()
    });
});

// 404 handler for unknown routes
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        message: `The requested route ${req.originalUrl} was not found on this server.`,
        availableRoutes: ['/api/auth', '/api/company', '/api/drives', '/api/applications', '/api/students']
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: isProduction ? 'Something went wrong!' : err.message
    });
});

// Export for Vercel serverless functions
export default app;

// Local development server (only runs when not in production)
if (!isProduction) {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`✅ Server running on http://localhost:${PORT}`);
        console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`🔗 API endpoints available at /api/*`);
    });
}
