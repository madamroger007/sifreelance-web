import prisma from "..";
import type { CreateProjectInput, UpdateProjectInput } from "../../types/project";

export async function findProjectsByUserIdRepository(userId: string) {
    // Implementation to find projects by user ID
    return prisma.project.findMany({
        where: { userId },
    })
}

export function findProjectByIdRepository(id: string) {
    // Implementation to find project by ID
    return prisma.project.findUnique({
        where: { id },
    })
}

export async function createProjectRepository(data: CreateProjectInput) {
    // Implementation to create project
   return await prisma.project.create({
        data,
    })
}

export async function updateProjectRepository(id: string, data: Partial<UpdateProjectInput>) {
    // Implementation to update project
    await prisma.project.update({
        where: { id },
        data,
    })
}

export async function deleteProjectRepository(id: string) {
    // Implementation to delete project
     await prisma.project.delete({
        where: { id },
    })
}

