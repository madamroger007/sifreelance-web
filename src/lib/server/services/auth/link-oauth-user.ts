import { findAuthUserByEmail, createAuthUser } from '$lib/server/db/repositories/user.repository';

export async function handleOAuthLogin(profile: {
    email: string;
    name?: string;
    image?: string;
}) {
    let user = await findAuthUserByEmail(profile.email);

    if (!user) {
        user = await createAuthUser({
            email: profile.email,
            name: profile.name,
            image: profile.image,
        });
    }

    return user;
}
