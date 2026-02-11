import { z } from 'zod';

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const signUpSchema = z.object({
    name: z.string().min(3, 'Name is required').max(50, 'Name must be less than 50 characters'),
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters long'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export type RegisterUserSchema = z.infer<typeof signUpSchema>
export type LoginUserSchema = z.infer<typeof signInSchema>