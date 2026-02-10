<script lang="ts">
  import type { Project } from "$lib/types";

  export let projects: Project[];
</script>

<!-- Desktop Table View -->
<div
  class="hidden md:block table-container-1 overflow-hidden"
>
  <table class="w-full text-left border-collapse">
    <thead>
      <tr class="bg-slate-50 dark:bg-gray-800/50">
        <th
          class="px-4 py-3 text-[11px] font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider"
          >Project Name</th
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
          >Scope</th
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
          class="hover:bg-slate-50 dark:hover:bg-gray-800/30 transition-colors cursor-pointer group"
        >
          <td class="px-4 py-4">
            <a href="/projects/new" class="flex items-center gap-3">
              <div
                class="size-8 rounded bg-indigo-50 dark:bg-indigo-500/30 flex items-center justify-center text-text dark:text-text-dark"
              >
                <span class="material-symbols-outlined text-sm"
                  >deployed_code</span
                >
              </div>
              <span class="text-sm font-bold dark:text-white">{proj.name}</span>
            </a>
          </td>
          <td class="px-4 py-4 text-sm text-slate-600 dark:text-gray-300"
            >{proj.client}</td
          >
          <td class="px-4 py-4 text-xs font-medium dark:text-gray-300"
            >{proj.type}</td
          >
          <td class="px-4 py-4 text-xs text-slate-600 dark:text-gray-300"
            >{proj.scope}</td
          >
          <td class="px-4 py-4 font-bold text-primary text-sm text-slate-600 dark:text-gray-300">{proj.price}</td>
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
          <td class="px-4 py-4">
            <a
              href="/projects/new"
              class="p-1.5 hover:bg-white dark:hover:bg-gray-700 rounded text-slate-400 hover:text-primary transition-all"
            >
              <span class="material-symbols-outlined text-sm">edit</span>
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
