import type { Project, Schedule, User } from "../../../../prisma/generated/prisma/client";

// Project creation input (without auto-generated fields)
export interface CreateProjectInput {
    title: string;
    description?: string;
    status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'ON_HOLD';
    complexity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    budget?: number;
    deadline: string;
    clientName?: string;
    clientEmail?: string;
    userId: string;
    tipe: string;
    price?: number;
}

// Project update input
export interface UpdateProjectInput {
    title?: string;
    description?: string;
    status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'ON_HOLD';
    complexity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    budget?: number;
    deadline?: string;
    clientName?: string;
    clientEmail?: string;
}

// Project with relations (use Prisma's generated types for full relations)
export type ProjectWithRelations = Project & {
    user?: User;
    schedules?: Schedule[];
};


// Project status labels for UI
export const PROJECT_STATUS_LABELS: Record<string, string> = {
    PENDING: 'Pending',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
    ON_HOLD: 'On Hold',
};

// Complexity labels for UI
export const COMPLEXITY_LABELS: Record<string, string> = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    URGENT: 'Urgent',
};
