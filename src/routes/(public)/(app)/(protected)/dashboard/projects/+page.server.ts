import { getProjectsByUserIdService } from "$lib/server/services/project/project-service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth();
    if (!session?.user?.id) {
        return {
            title: "Projects",
            projects: [],
        };
    }
    const result = await getProjectsByUserIdService(session.user.id);
    return {
        title: "Projects",
        projects: result,
    };
}