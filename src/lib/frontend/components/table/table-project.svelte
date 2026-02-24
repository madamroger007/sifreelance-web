<script lang="ts">
  import type { Project } from "$lib/shared/types/types";
  import Modal from "../card/modal.svelte";

  export let projects: Project[];

  let deleteModalOpen = false;
  let projectToDelete: string | null = null;

  function openDeleteModal(projectId: string) {
    projectToDelete = projectId;
    deleteModalOpen = true;
  }

  function closeDeleteModal() {
    deleteModalOpen = false;
    projectToDelete = null;
  }

  function confirmDelete() {
    if (projectToDelete) {
      const form = document.getElementById(
        `delete-form-${projectToDelete}`,
      ) as HTMLFormElement;
      if (form) {
        form.submit();
      }
    }
    closeDeleteModal();
  }
</script>

<!-- Desktop Table View -->
<div class="hidden md:block table-container-1 overflow-hidden">
  <table class="w-full text-left border-collapse">
    <thead>
      <tr class="bg-slate-50 dark:bg-gray-800/50">
        <th
          class="px-4 py-3 text-[11px] font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider"
          >Project Name</th
        >
        <th
          class="px-4 py-3 text-[11px] font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider"
          >Description</th
        >
        <th
          class="px-4 py-3 text-[11px] font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider"
          >Client</th
        >
        <th
          class="px-4 py-3 text-[11px] font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider"
          >Type</th
        >
        <th
          class="px-4 py-3 text-[11px] font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider"
          >Complexity</th
        >
        <th
          class="px-4 py-3 text-[11px] font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider"
          >Price</th
        >
        <th
          class="px-4 py-3 text-[11px] font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider"
          >Status</th
        >
        <th
          class="px-4 py-3 text-[11px] font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider"
          >Action</th
        >
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-50 dark:divide-gray-800">
      {#each projects as proj}
        <tr
          class="hover:bg-slate-50 dark:hover:bg-gray-800/30 transition-colors group"
        >
          <td class="px-4 py-4">
            <div class="flex items-center gap-3">
              <div
                class="size-8 rounded bg-indigo-50 dark:bg-indigo-500/30 flex items-center justify-center text-text dark:text-text-dark"
              >
                <span class="material-symbols-outlined text-sm"
                  >deployed_code</span
                >
              </div>
              <span class="text-sm font-bold dark:text-white">{proj.title}</span
              >
            </div>
          </td>
          <td class="px-4 py-4 text-sm text-slate-600 dark:text-gray-300"
            >{proj.description}</td
          >
          <td class="px-4 py-4 text-sm text-slate-600 dark:text-gray-300"
            >{proj.clientName}</td
          >
          <td class="px-4 py-4 text-xs font-medium dark:text-gray-300"
            >{proj.type}</td
          >
          <td class="px-4 py-4 text-xs text-slate-600 dark:text-gray-300"
            >{proj.complexity}</td
          >
          <td
            class="px-4 py-4 font-bold text-primary text-sm text-slate-600 dark:text-gray-300"
            >{proj.currency} {proj.price}</td
          >
          <td class="px-4 py-4">
            <span
              class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider {proj.status ===
              'Completed'
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                : proj.status === 'Review'
                  ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                  : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'}"
            >
              {proj.status}
            </span>
          </td>
          <td class="px-4 py-4 flex justify-center items-center">
            <a
              href="/dashboard/projects/form?id={proj.id}"
              class="p-1.5 hover:bg-white dark:hover:bg-gray-700 rounded text-slate-400 hover:text-primary transition-all"
            >
              <span class="material-symbols-outlined text-sm">edit</span>
            </a>
            <form
              id="delete-form-{proj.id}"
              method="post"
              action="?/delete"
              class="hidden"
            >
              <input type="hidden" name="projectId" value={proj.id} />
            </form>
            <button
              type="button"
              on:click={() => openDeleteModal(proj.id)}
              class="p-1.5 hover:bg-white dark:hover:bg-gray-700 rounded text-slate-400 hover:text-red-500 transition-all"
            >
              <span class="material-symbols-outlined text-sm">delete</span>
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<!-- Delete Confirmation Modal -->
<Modal
  bind:isOpen={deleteModalOpen}
  title="Delete Project"
  message="Are you sure you want to delete this project? This action cannot be undone."
  onConfirm={confirmDelete}
  onCancel={closeDeleteModal}
/>
