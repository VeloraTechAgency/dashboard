import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate } from '../middleware/auth.js';
import { serviceSchema, serviceUpdateSchema, idParamSchema, } from '../validators/index.js';
const router = Router();
// GET / — Public. Returns all services.
router.get('/', async (_req, res) => {
    try {
        const services = await prisma.service.findMany({
            orderBy: { created_at: 'desc' },
        });
        res.json({ success: true, message: 'Services retrieved', data: services });
    }
    catch {
        res
            .status(500)
            .json({ success: false, message: 'Internal server error', data: null });
    }
});
// GET /:id — Public. Returns single service.
router.get('/:id', async (req, res) => {
    try {
        const parsed = idParamSchema.safeParse(req.params);
        if (!parsed.success) {
            res
                .status(400)
                .json({ success: false, message: 'Invalid ID parameter', data: null });
            return;
        }
        const service = await prisma.service.findUnique({
            where: { id: parsed.data.id },
        });
        if (!service) {
            res
                .status(404)
                .json({ success: false, message: 'Service not found', data: null });
            return;
        }
        res.json({ success: true, message: 'Service retrieved', data: service });
    }
    catch {
        res
            .status(500)
            .json({ success: false, message: 'Internal server error', data: null });
    }
});
// POST / — Protected. Create a new service.
router.post('/', authenticate, async (req, res) => {
    try {
        const parsed = serviceSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({
                success: false,
                message: parsed.error.errors[0]?.message ?? 'Validation failed',
                data: null,
            });
            return;
        }
        const service = await prisma.service.create({
            data: parsed.data,
        });
        res
            .status(201)
            .json({ success: true, message: 'Service created', data: service });
    }
    catch {
        res
            .status(500)
            .json({ success: false, message: 'Internal server error', data: null });
    }
});
// PUT /:id — Protected. Update an existing service.
router.put('/:id', authenticate, async (req, res) => {
    try {
        const paramsParsed = idParamSchema.safeParse(req.params);
        if (!paramsParsed.success) {
            res
                .status(400)
                .json({ success: false, message: 'Invalid ID parameter', data: null });
            return;
        }
        const bodyParsed = serviceUpdateSchema.safeParse(req.body);
        if (!bodyParsed.success) {
            res.status(400).json({
                success: false,
                message: bodyParsed.error.errors[0]?.message ?? 'Validation failed',
                data: null,
            });
            return;
        }
        // Verify the service exists before attempting update
        const existing = await prisma.service.findUnique({
            where: { id: paramsParsed.data.id },
        });
        if (!existing) {
            res
                .status(404)
                .json({ success: false, message: 'Service not found', data: null });
            return;
        }
        const service = await prisma.service.update({
            where: { id: paramsParsed.data.id },
            data: bodyParsed.data,
        });
        res.json({ success: true, message: 'Service updated', data: service });
    }
    catch {
        res
            .status(500)
            .json({ success: false, message: 'Internal server error', data: null });
    }
});
// DELETE /:id — Protected. Delete a service.
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const parsed = idParamSchema.safeParse(req.params);
        if (!parsed.success) {
            res
                .status(400)
                .json({ success: false, message: 'Invalid ID parameter', data: null });
            return;
        }
        const existing = await prisma.service.findUnique({
            where: { id: parsed.data.id },
        });
        if (!existing) {
            res
                .status(404)
                .json({ success: false, message: 'Service not found', data: null });
            return;
        }
        await prisma.service.delete({
            where: { id: parsed.data.id },
        });
        res.json({ success: true, message: 'Service deleted', data: null });
    }
    catch {
        res
            .status(500)
            .json({ success: false, message: 'Internal server error', data: null });
    }
});
export default router;
//# sourceMappingURL=services.js.map