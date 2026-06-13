import { Router } from 'express';
import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate } from '../middleware/auth.js';
import { testimonialSchema, idParamSchema } from '../validators/index.js';

const router = Router();

// GET / — Public. Returns all testimonials (frontend filters client-side).
router.get('/', async (_req: Request, res: Response) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { created_at: 'desc' },
    });
    res.json({
      success: true,
      message: 'Testimonials retrieved',
      data: testimonials,
    });
  } catch {
    res
      .status(500)
      .json({ success: false, message: 'Internal server error', data: null });
  }
});

// POST / — Protected. Create a new testimonial.
router.post('/', authenticate, async (req: Request, res: Response) => {
  try {
    const parsed = testimonialSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: parsed.error.errors[0]?.message ?? 'Validation failed',
        data: null,
      });
      return;
    }

    const testimonial = await prisma.testimonial.create({
      data: parsed.data,
    });

    res.status(201).json({
      success: true,
      message: 'Testimonial created',
      data: testimonial,
    });
  } catch {
    res
      .status(500)
      .json({ success: false, message: 'Internal server error', data: null });
  }
});

// DELETE /:id — Protected. Delete a testimonial.
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const parsed = idParamSchema.safeParse(req.params);
    if (!parsed.success) {
      res
        .status(400)
        .json({ success: false, message: 'Invalid ID parameter', data: null });
      return;
    }

    const existing = await prisma.testimonial.findUnique({
      where: { id: parsed.data.id },
    });

    if (!existing) {
      res
        .status(404)
        .json({
          success: false,
          message: 'Testimonial not found',
          data: null,
        });
      return;
    }

    await prisma.testimonial.delete({
      where: { id: parsed.data.id },
    });

    res.json({ success: true, message: 'Testimonial deleted', data: null });
  } catch {
    res
      .status(500)
      .json({ success: false, message: 'Internal server error', data: null });
  }
});

export default router;
