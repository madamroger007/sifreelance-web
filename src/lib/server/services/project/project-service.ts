import { createProjectRepository, deleteProjectRepository, findProjectByIdRepository, findProjectsByUserIdRepository, getRevenueBreakdownByUserIdRepository, getTotalRevenueByUserIdRepository, updateProjectRepository } from "$lib/server/db/repositories/project.repository";
import type { CreateProjectInput, UpdateProjectInput } from "$lib/server/types";

export async function createProjectService(data: CreateProjectInput) {
    try {
        const project = await createProjectRepository(data);
        return project;
    }
    catch (error) {
        throw Error(`Failed to create project: ${error instanceof Error ? error.message : String(error)}`);
    }
}

export async function updateProjectService(projectId: string, data: Partial<UpdateProjectInput>) {
    try {
        const project = await updateProjectRepository(projectId, data);
        return project;
    }
    catch (error) {
        throw Error(`Failed to update project: ${error instanceof Error ? error.message : String(error)}`);
    }
}

export async function getProjectsByUserIdService(userId: string) {
    try {
        const projects = await findProjectsByUserIdRepository(userId);
        return projects;
    } catch (error) {
        throw Error(`Failed to retrieve projects: ${error instanceof Error ? error.message : String(error)}`);
    }
}

export async function getProjectByIdService(projectId: string) {
    try {
        const project = await findProjectByIdRepository(projectId);
        return project;
    } catch (error) {
        throw Error(`Failed to retrieve project: ${error instanceof Error ? error.message : String(error)}`);
    }
}

export async function deleteProjectService(projectId: string) {
    try {
        await deleteProjectRepository(projectId);
    } catch (error) {
        throw Error(`Failed to delete project: ${error instanceof Error ? error.message : String(error)}`);
    }
}

export async function getTotalRevenueService(userId: string) {
    try {
        const totalRevenue = await getTotalRevenueByUserIdRepository(userId);
        return totalRevenue;
    } catch (error) {
        throw Error(`Failed to get total revenue: ${error instanceof Error ? error.message : String(error)}`);
    }
}

export async function getRevenueBreakdownService(userId: string) {
    try {
        const projects = await getRevenueBreakdownByUserIdRepository(userId);

        // Group revenue by day of week
        const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const revenueByDay: Record<string, number> = {
            'MON': 0, 'TUE': 0, 'WED': 0, 'THU': 0, 'FRI': 0, 'SAT': 0, 'SUN': 0
        };

        projects.forEach(project => {
            if (project.price) {
                const dayIndex = new Date(project.createdAt).getDay();
                const dayName = dayNames[dayIndex];
                revenueByDay[dayName] += project.price;
            }
        });

        // Return array format for chart
        const chartData = ['MON', 'TUE', 'WED', 'THU', 'FRI'].map(day => ({
            day,
            revenue: revenueByDay[day]
        }));

        return chartData;
    } catch (error) {
        throw Error(`Failed to get revenue breakdown: ${error instanceof Error ? error.message : String(error)}`);
    }
}
