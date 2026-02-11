import { SvelteKitAuth } from "@auth/sveltekit";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "$lib/server/db";
import { validateUser } from "$lib/server/services/auth/validate-user";
import Google from "@auth/sveltekit/providers/google";
import GitHub from "@auth/sveltekit/providers/github";
import Credentials from "@auth/sveltekit/providers/credentials";
import { env } from '$env/dynamic/private';

export const { handle, signIn, signOut } = SvelteKitAuth({
    adapter: PrismaAdapter(prisma),
    secret: env.AUTH_SECRET,
    trustHost: true,
    providers: [
        Google({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
        GitHub({
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password)
                    return null;

                return validateUser(
                    credentials.email as string,
                    credentials.password as string
                );
            }
        }),
    ],
    session: {
        strategy: "jwt",
    },
})
