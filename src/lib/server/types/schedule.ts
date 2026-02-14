import type { Project, Schedule, User } from "../../../../prisma/generated/prisma/client";


// Schedule creation input (without auto-generated fields)
export interface CreateScheduleInput {
    title: string;
    description?: string;
    startDate: Date;
    endDate?: Date;
    allDay?: boolean;
    userId: string;
    projectId?: string;
}

// Schedule update input
export interface UpdateScheduleInput {
    title?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    allDay?: boolean;
    projectId?: string;
}

// Schedule with relations (use Prisma's generated types for full relations)
export type ScheduleWithRelations = Schedule & {
    user?: User;
    project?: Project | null;
};

// Calendar event format (for UI components)
export interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end?: Date;
    allDay: boolean;
    description?: string;
    projectId?: string;
    projectTitle?: string;
}

// Convert Schedule to CalendarEvent
export function toCalendarEvent(
    schedule: ScheduleWithRelations
): CalendarEvent {
    return {
        id: schedule.id,
        title: schedule.title,
        start: schedule.startDate,
        end: schedule.endDate ?? undefined,
        allDay: schedule.allDay,
        description: schedule.description ?? undefined,
        projectId: schedule.projectId ?? undefined,
        projectTitle: schedule.project?.title,
    };
}
