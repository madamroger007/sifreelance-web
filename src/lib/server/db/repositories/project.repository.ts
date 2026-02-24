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

export async function getTotalRevenueByUserIdRepository(userId: string) {
    const result = await prisma.project.aggregate({
        where: {
            userId,
            status: 'COMPLETED'
        },
        _sum: {
            price: true
        }
    });
    return result._sum.price || 0;
}

export async function getRevenueBreakdownByUserIdRepository(userId: string) {
    const projects = await prisma.project.findMany({
        where: {
            userId,
            price: { not: null }
        },
        select: {
            price: true,
            createdAt: true,
            status: true
        },
        orderBy: {
            createdAt: 'asc'
        }
    });
    return projects;
}

