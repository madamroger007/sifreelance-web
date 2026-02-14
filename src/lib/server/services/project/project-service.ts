import { createProjectRepository, findProjectsByUserIdRepository } from "$lib/server/db/repositories/project.repository";
import type { CreateProjectInput } from "$lib/server/types";

export async function createProjectService(data: CreateProjectInput) {
    try {
        const project = await createProjectRepository(data);
        return project;
    }
    catch (error) {
        throw Error(`Failed to create project: ${error instanceof Error ? error.message : String(error)}`);
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