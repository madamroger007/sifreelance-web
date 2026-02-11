<script lang="ts">
  import type { Project } from "$lib/types";

  export let projects: Project[];
</script>

<div class="md:hidden space-y-4">
  {#each projects as proj}
    <a
      href="/projects/new"
      class="block card-component-container-2 active:scale-[0.98] transition-all"
    >
      <div class="flex justify-between items-start mb-3">
        <div>
          <h3 class="font-bold text-slate-900 dark:text-white">
            {proj.name}
          </h3>
          <p class="text-xs text-slate-500">{proj.client}</p>
        </div>
        <span
          class="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider {proj.status ===
          'Completed'
            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
            : 'bg-indigo-50 text-indigo-600'}"
        >
          {proj.status}
        </span>
      </div>
      <div
        class="flex justify-between items-center pt-3 border-t border-slate-50 dark:border-gray-800"
      >
        <div class="flex gap-4">
          <div class="flex flex-col">
            <span class="text-[10px] text-slate-400 uppercase font-bold"
              >Scope</span
            >
            <span class="text-xs dark:text-gray-300 font-medium"
              >{proj.scope}</span
            >
          </div>
          <div class="flex flex-col">
            <span class="text-[10px] text-slate-400 uppercase font-bold"
              >Suggested</span
            >
            <span class="text-xs text-primary font-bold">{proj.price}</span>
          </div>
        </div>
        <div
          class="size-8 rounded-full bg-slate-50 dark:bg-gray-800 flex items-center justify-center text-slate-400"
        >
          <span class="material-symbols-outlined text-sm">chevron_right</span>
        </div>
      </div>
    </a>
  {/each}
</div>
