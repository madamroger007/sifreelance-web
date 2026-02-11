import prisma, { type CreateUserInput, type UpdateUserInput } from "..";

export async function findAuthUserByEmail(email: string) {
    // Implementation to find user by email
    return prisma.user.findUnique({
        where: { email },
    })
}

export function findAuthUserById(id: string) {
    // Implementation to find user by ID
    return prisma.user.findUnique({
        where: { id },
    })
}

export async function createAuthUser(data: CreateUserInput) {
    // Implementation to create user
   return await prisma.user.create({
        data,
    })
}

export async function updateAuthUser(email: string, data: Partial<UpdateUserInput>) {
    // Implementation to update user
    await prisma.user.update({
        where: { email },
        data,
    })
}

export async function deleteAuthUser(id: string) {
    // Implementation to delete user
     await prisma.user.delete({
        where: { id },
    })
}

