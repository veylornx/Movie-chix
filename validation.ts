import { z } from 'zod';
export const contactSchema = z.object({name:z.string().trim().min(2).max(80),email:z.string().trim().email().max(160),subject:z.string().trim().min(3).max(160),message:z.string().trim().min(10).max(5000),website:z.string().max(0).optional()});
