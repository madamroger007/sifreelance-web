import { deleteProjectService, getProjectsByUserIdService } from "$lib/server/services/project/project-service";
import { fail, type Actions } from "@sveltejs/kit";
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

export const actions: Actions = {
    delete: async ({ request }) => {
        const formData = await request.formData();
        const projectId = formData.get("projectId");
        if (typeof projectId !== "string") {
            return fail(400, { error: "Invalid project ID" });
        }
        console.log("Deleting project with ID:", projectId);
        await deleteProjectService(projectId);
        return { success: true };
    },
}