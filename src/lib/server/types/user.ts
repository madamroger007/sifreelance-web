// User & Session types from Prisma schema
import type { User, Session } from '@prisma/client';

export type { User, Session };

// User creation input (without auto-generated fields)
export interface CreateUserInput {
    email: string;
    name?: string;
    password?: string;
    image?: string;
}

// User update input
export interface UpdateUserInput {
    email?: string;
    name?: string;
    password?: string;
    image?: string;
    emailVerified?: Date;
}

// Session creation input
export interface CreateSessionInput {
    sessionToken: string;
    userId: string;
    expires: Date;
}

// User with relations (use Prisma's generated types for full relations)
export type UserWithRelations = User & {
    projects?: Project[];
    finances?: Finance[];
    schedules?: Schedule[];
    sessions?: Session[];
};

// Import Prisma types for relations
import type { Project, Finance, Schedule } from '@prisma/client';
