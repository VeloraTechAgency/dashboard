import { z } from 'zod';
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const registerSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    phone: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
    phone: string;
}, {
    email: string;
    password: string;
    name: string;
    phone: string;
}>;
export declare const serviceSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    icon: z.ZodString;
    price: z.ZodNumber;
    is_active: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    icon: string;
    price: number;
    is_active: boolean;
}, {
    title: string;
    description: string;
    icon: string;
    price: number;
    is_active: boolean;
}>;
export declare const serviceUpdateSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    icon: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    is_active: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    description?: string | undefined;
    icon?: string | undefined;
    price?: number | undefined;
    is_active?: boolean | undefined;
}, {
    title?: string | undefined;
    description?: string | undefined;
    icon?: string | undefined;
    price?: number | undefined;
    is_active?: boolean | undefined;
}>;
export declare const projectSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    thumbnail: z.ZodString;
    tech_stack: z.ZodString;
    project_url: z.ZodString;
    is_featured: z.ZodBoolean;
    is_active: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    is_active: boolean;
    thumbnail: string;
    tech_stack: string;
    project_url: string;
    is_featured: boolean;
}, {
    title: string;
    description: string;
    is_active: boolean;
    thumbnail: string;
    tech_stack: string;
    project_url: string;
    is_featured: boolean;
}>;
export declare const projectUpdateSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    thumbnail: z.ZodOptional<z.ZodString>;
    tech_stack: z.ZodOptional<z.ZodString>;
    project_url: z.ZodOptional<z.ZodString>;
    is_featured: z.ZodOptional<z.ZodBoolean>;
    is_active: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    description?: string | undefined;
    is_active?: boolean | undefined;
    thumbnail?: string | undefined;
    tech_stack?: string | undefined;
    project_url?: string | undefined;
    is_featured?: boolean | undefined;
}, {
    title?: string | undefined;
    description?: string | undefined;
    is_active?: boolean | undefined;
    thumbnail?: string | undefined;
    tech_stack?: string | undefined;
    project_url?: string | undefined;
    is_featured?: boolean | undefined;
}>;
export declare const contactSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    subject: z.ZodString;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
    email: string;
    name: string;
    phone: string;
    subject: string;
}, {
    message: string;
    email: string;
    name: string;
    phone: string;
    subject: string;
}>;
export declare const testimonialSchema: z.ZodObject<{
    client_name: z.ZodString;
    client_company: z.ZodString;
    message: z.ZodString;
    rating: z.ZodNumber;
    is_active: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    message: string;
    is_active: boolean;
    client_name: string;
    client_company: string;
    rating: number;
}, {
    message: string;
    is_active: boolean;
    client_name: string;
    client_company: string;
    rating: number;
}>;
export declare const idParamSchema: z.ZodObject<{
    id: z.ZodEffects<z.ZodString, number, string>;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: string;
}>;
//# sourceMappingURL=index.d.ts.map