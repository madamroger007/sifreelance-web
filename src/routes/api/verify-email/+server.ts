import { updateAuthUser } from "$lib/server/db/repositories/user.repository.js";
import { deleteVerificationToken, getVerificationToken } from "$lib/server/db/repositories/verification-token.repository";
import { redirect } from "@sveltejs/kit";

export async function GET({ url }) {
    const token = url.searchParams.get("token");
    const email = url.searchParams.get("email");
    if (!token || !email) {
        throw redirect(302, "/login?error=invalid-token");
    }
    const verificationToken = await getVerificationToken(token);
    if (!verificationToken) {
        throw redirect(302, "/login?error=invalid-token");
    }

    if (verificationToken.expires < new Date()) {
        throw redirect(302, "/login?error=token-expired");
    }

    await updateAuthUser(email, { emailVerified: new Date() });
    await deleteVerificationToken(token);
    throw redirect(302, "/login?verified=true");
}