<script lang="ts">
  import CardViewMobile from "$lib/components/card/card-view-mobile.svelte";
  import TableProject from "$lib/components/table/table-project.svelte";
  import { projects } from "$lib/data/mock";
</script>

<div class="flex flex-col">
  <main class="flex-1 p-6 space-y-6">
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <h2
          class="text-sm font-bold text-text dark:text-text-dark uppercase tracking-widest"
        >
          Active Projects
        </h2>
        <div class="flex gap-2">
          <button
            class="p-2 rounded-lg bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 text-slate-400"
          >
            <span class="material-symbols-outlined"> arrow_upward </span>
          </button>
          <button
            class="p-2 rounded-lg bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 text-slate-400"
          >
            <span class="material-symbols-outlined"> arrow_downward </span>
          </button>
        </div>
      </div>
      <TableProject {projects} />
    </section>

    <CardViewMobile {projects} />
  </main>

  <a href="/dashboard/projects/new" class="card-button-fixed-bottom-right">
    <span class="material-symbols-outlined text-3xl font-bold">add</span>
  </a>
</div>
