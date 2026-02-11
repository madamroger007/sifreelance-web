import prisma from "..";

export async function getVerificationToken(token: string) {
    // Implementation for creating a verification token in the database
    return await prisma.verificationToken.findUnique({
        where: { token }
    });
}

export async function deleteVerificationToken(token: string) {
    // Implementation for deleting a verification token from the database
    await prisma.verificationToken.deleteMany({
        where: { token }
    });
}

export async function createVerificationToken(email: string, token: string) {
    await prisma.verificationToken.create({
        data: {
            identifier: email,
            token,
            expires: new Date(Date.now() + 1000 * 60 * 60), // 1 jam
        }
    });
}