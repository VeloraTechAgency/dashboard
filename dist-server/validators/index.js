import { z } from 'zod';
// Auth validators
export const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});
export const registerSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters').max(128),
    phone: z.string().min(1, 'Phone is required').max(20),
});
// Service validators
export const serviceSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200),
    description: z.string().min(1, 'Description is required').max(5000),
    icon: z.string().min(1, 'Icon is required').max(100),
    price: z.number().min(0, 'Price must be non-negative'),
    is_active: z.boolean(),
});
export const serviceUpdateSchema = z.object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().min(1).max(5000).optional(),
    icon: z.string().min(1).max(100).optional(),
    price: z.number().min(0).optional(),
    is_active: z.boolean().optional(),
});
// Project validators
export const projectSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200),
    description: z.string().min(1, 'Description is required').max(5000),
    thumbnail: z.string().max(500),
    tech_stack: z.string().min(1, 'Tech stack is required').max(500),
    project_url: z.string().max(500),
    is_featured: z.boolean(),
    is_active: z.boolean(),
});
export const projectUpdateSchema = z.object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().min(1).max(5000).optional(),
    thumbnail: z.string().max(500).optional(),
    tech_stack: z.string().min(1).max(500).optional(),
    project_url: z.string().max(500).optional(),
    is_featured: z.boolean().optional(),
    is_active: z.boolean().optional(),
});
// Contact validators
export const contactSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z.string().email('Invalid email format'),
    phone: z.string().min(1, 'Phone is required').max(20),
    subject: z.string().min(1, 'Subject is required').max(200),
    message: z.string().min(1, 'Message is required').max(5000),
});
// Testimonial validators
export const testimonialSchema = z.object({
    client_name: z.string().min(1, 'Client name is required').max(100),
    client_company: z.string().min(1, 'Client company is required').max(200),
    message: z.string().min(1, 'Message is required').max(2000),
    rating: z.number().int().min(1).max(5),
    is_active: z.boolean(),
});
// ID param validator
export const idParamSchema = z.object({
    id: z.string().regex(/^\d+$/, 'Invalid ID').transform(Number),
});
//# sourceMappingURL=index.js.map