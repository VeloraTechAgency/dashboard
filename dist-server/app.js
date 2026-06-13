import express from 'express';
import path from 'path';
import { securityHeaders, corsMiddleware, permissionsPolicy } from './middleware/security.js';
import { globalLimiter } from './middleware/rateLimiter.js';
import authRoutes from './routes/auth.js';
import servicesRoutes from './routes/services.js';
import projectsRoutes from './routes/projects.js';
import contactsRoutes from './routes/contacts.js';
import testimonialsRoutes from './routes/testimonials.js';
const app = express();
// Security middleware
app.use(securityHeaders);
app.use(corsMiddleware);
app.use(permissionsPolicy);
app.use(globalLimiter);
// Body parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));
// API routes
app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/testimonials', testimonialsRoutes);
// Health check
app.get('/api/health', (_req, res) => {
    res.json({ success: true, message: 'Server is running', data: null });
});
// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(import.meta.dirname, '..', 'dist');
    app.use(express.static(distPath));
    // SPA fallback: serve index.html for all non-API routes
    app.get('*', (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
    });
}
// Global error handler — never expose internal errors to clients
app.use((err, _req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_next) => {
    console.error('Unhandled error:', err.message);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        data: null,
    });
});
export default app;
//# sourceMappingURL=app.js.map