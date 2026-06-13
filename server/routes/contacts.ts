import { Router } from 'express';
import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate } from '../middleware/auth.js';
import { contactSchema, idParamSchema } from '../validators/index.js';

const router = Router();

// GET / — Protected (admin). Returns all contacts.
router.get('/', authenticate, async (_req: Request, res: Response) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { created_at: 'desc' },
    });
    res.json({
      success: true,
      message: 'Contacts retrieved',
      data: contacts,
    });
  } catch {
    res
      .status(500)
      .json({ success: false, message: 'Internal server error', data: null });
  }
});

// POST / — Public (contact form). Create a new contact message.
router.post('/', async (req: Request, res: Response) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: parsed.error.errors[0]?.message ?? 'Validation failed',
        data: null,
      });
      return;
    }

    const contact = await prisma.contact.create({
      data: {
        ...parsed.data,
        is_read: false,
      },
    });

    res
      .status(201)
      .json({ success: true, message: 'Message sent successfully', data: contact });
  } catch {
    res
      .status(500)
      .json({ success: false, message: 'Internal server error', data: null });
  }
});

// PATCH /:id/read — Protected. Mark a contact as read.
router.patch('/:id/read', authenticate, async (req: Request, res: Response) => {
  try {
    const parsed = idParamSchema.safeParse(req.params);
    if (!parsed.success) {
      res
        .status(400)
        .json({ success: false, message: 'Invalid ID parameter', data: null });
      return;
    }

    const existing = await prisma.contact.findUnique({
      where: { id: parsed.data.id },
    });

    if (!existing) {
      res
        .status(404)
        .json({ success: false, message: 'Contact not found', data: null });
      return;
    }

    const contact = await prisma.contact.update({
      where: { id: parsed.data.id },
      data: { is_read: true },
    });

    res.json({
      success: true,
      message: 'Contact marked as read',
      data: contact,
    });
  } catch {
    res
      .status(500)
      .json({ success: false, message: 'Internal server error', data: null });
  }
});

export default router;
