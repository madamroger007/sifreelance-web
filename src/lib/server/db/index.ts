import { PrismaClient } from '../../../../prisma/generated/prisma/client';
import { config } from 'dotenv';
import { env } from '$env/dynamic/private';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

config();

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });

if (env.NODE_ENV === 'development') globalForPrisma.prisma = prisma;

export default prisma;

// Re-export all models and types
export * from '../types';
