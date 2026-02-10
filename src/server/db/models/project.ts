// Project types from Prisma schema
import type { Project } from '@prisma/client';

export type { Project };

// Re-export enums
export { ProjectStatus, Priority } from '@prisma/client';

// Project creation input (without auto-generated fields)
export interface CreateProjectInput {
    title: string;
    description?: string;
    status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'ON_HOLD';
    priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    budget?: number;
    deadline?: Date;
    clientName?: string;
    clientEmail?: string;
    userId: string;
}

// Project update input
export interface UpdateProjectInput {
    title?: string;
    description?: string;
    status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'ON_HOLD';
    priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    budget?: number;
    deadline?: Date;
    clientName?: string;
    clientEmail?: string;
}

// Project with relations (use Prisma's generated types for full relations)
export type ProjectWithRelations = Project & {
    user?: User;
    finances?: Finance[];
    schedules?: Schedule[];
};

// Import Prisma types for relations
import type { User, Finance, Schedule } from '@prisma/client';

// Project status labels for UI
export const PROJECT_STATUS_LABELS: Record<string, string> = {
    PENDING: 'Pending',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
    ON_HOLD: 'On Hold',
};

// Priority labels for UI
export const PRIORITY_LABELS: Record<string, string> = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    URGENT: 'Urgent',
};
