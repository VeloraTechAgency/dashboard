import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate } from '../middleware/auth.js';
import { projectSchema, projectUpdateSchema, idParamSchema, } from '../validators/index.js';
const router = Router();
// GET / — Public. Returns all projects.
router.get('/', async (_req, res) => {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { created_at: 'desc' },
        });
        res.json({
            success: true,
            message: 'Projects retrieved',
            data: projects,
        });
    }
    catch {
        res
            .status(500)
            .json({ success: false, message: 'Internal server error', data: null });
    }
});
// GET /featured — Public. Returns featured and active projects.
// IMPORTANT: This route MUST be defined BEFORE /:id to avoid route conflicts.
router.get('/featured', async (_req, res) => {
    try {
        const projects = await prisma.project.findMany({
            where: { is_featured: true, is_active: true },
            orderBy: { created_at: 'desc' },
        });
        res.json({
            success: true,
            message: 'Featured projects retrieved',
            data: projects,
        });
    }
    catch {
        res
            .status(500)
            .json({ success: false, message: 'Internal server error', data: null });
    }
});
// GET /:id — Public. Returns single project.
router.get('/:id', async (req, res) => {
    try {
        const parsed = idParamSchema.safeParse(req.params);
        if (!parsed.success) {
            res
                .status(400)
                .json({ success: false, message: 'Invalid ID parameter', data: null });
            return;
        }
        const project = await prisma.project.findUnique({
            where: { id: parsed.data.id },
        });
        if (!project) {
            res
                .status(404)
                .json({ success: false, message: 'Project not found', data: null });
            return;
        }
        res.json({ success: true, message: 'Project retrieved', data: project });
    }
    catch {
        res
            .status(500)
            .json({ success: false, message: 'Internal server error', data: null });
    }
});
// POST / — Protected. Create a new project.
router.post('/', authenticate, async (req, res) => {
    try {
        const parsed = projectSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({
                success: false,
                message: parsed.error.errors[0]?.message ?? 'Validation failed',
                data: null,
            });
            return;
        }
        const project = await prisma.project.create({
            data: parsed.data,
        });
        res
            .status(201)
            .json({ success: true, message: 'Project created', data: project });
    }
    catch {
        res
            .status(500)
            .json({ success: false, message: 'Internal server error', data: null });
    }
});
// PUT /:id — Protected. Update an existing project.
router.put('/:id', authenticate, async (req, res) => {
    try {
        const paramsParsed = idParamSchema.safeParse(req.params);
        if (!paramsParsed.success) {
            res
                .status(400)
                .json({ success: false, message: 'Invalid ID parameter', data: null });
            return;
        }
        const bodyParsed = projectUpdateSchema.safeParse(req.body);
        if (!bodyParsed.success) {
            res.status(400).json({
                success: false,
                message: bodyParsed.error.errors[0]?.message ?? 'Validation failed',
                data: null,
            });
            return;
        }
        // Verify the project exists before attempting update
        const existing = await prisma.project.findUnique({
            where: { id: paramsParsed.data.id },
        });
        if (!existing) {
            res
                .status(404)
                .json({ success: false, message: 'Project not found', data: null });
            return;
        }
        const project = await prisma.project.update({
            where: { id: paramsParsed.data.id },
            data: bodyParsed.data,
        });
        res.json({ success: true, message: 'Project updated', data: project });
    }
    catch {
        res
            .status(500)
            .json({ success: false, message: 'Internal server error', data: null });
    }
});
// DELETE /:id — Protected. Delete a project.
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const parsed = idParamSchema.safeParse(req.params);
        if (!parsed.success) {
            res
                .status(400)
                .json({ success: false, message: 'Invalid ID parameter', data: null });
            return;
        }
        const existing = await prisma.project.findUnique({
            where: { id: parsed.data.id },
        });
        if (!existing) {
            res
                .status(404)
                .json({ success: false, message: 'Project not found', data: null });
            return;
        }
        await prisma.project.delete({
            where: { id: parsed.data.id },
        });
        res.json({ success: true, message: 'Project deleted', data: null });
    }
    catch {
        res
            .status(500)
            .json({ success: false, message: 'Internal server error', data: null });
    }
});
export default router;
//# sourceMappingURL=projects.js.map