import type { Project, Schedule, Session, User } from "../../../../prisma/generated/prisma/client";

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
    schedules?: Schedule[];
    sessions?: Session[];
};