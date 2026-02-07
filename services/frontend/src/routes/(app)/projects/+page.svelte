<script lang="ts">
  import { projects } from "$lib/data/mock";
</script>

<div class="flex flex-col min-h-full">
  <header
    class="sticky top-0 z-40 bg-white/80 dark:bg-background-dark/80 backdrop-blur-lg border-b border-slate-200 dark:border-gray-800 px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
  >
    <div>
      <h1 class="text-2xl font-bold tracking-tight dark:text-white">
        Projects
      </h1>
      <p class="text-sm text-slate-500 dark:text-gray-400">
        Manage projects and generate smart pricing
      </p>
    </div>
    <a
      href="/projects/new"
      class="bg-primary text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
    >
      <span class="material-symbols-outlined text-lg">add</span>
      Create Project
    </a>
  </header>

  <main class="flex-1 p-6 space-y-6">
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Active Projects
        </h2>
        <div class="flex gap-2">
          <button
            class="p-2 rounded-lg bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 text-slate-400"
          >
            <span class="material-symbols-outlined text-sm">filter_list</span>
          </button>
          <button
            class="p-2 rounded-lg bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 text-slate-400"
          >
            <span class="material-symbols-outlined text-sm">sort</span>
          </button>
        </div>
      </div>

      <!-- Desktop Table View -->
      <div
        class="hidden md:block bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-slate-100 dark:border-gray-800 overflow-hidden"
      >
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 dark:bg-gray-800/50">
              <th
                class="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider"
                >Project Name</th
              >
              <th
                class="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider"
                >Client</th
              >
              <th
                class="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider"
                >Type</th
              >
              <th
                class="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider"
                >Scope</th
              >
              <th
                class="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider"
                >Price</th
              >
              <th
                class="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider"
                >Status</th
              >
              <th
                class="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider"
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
                      class="size-8 rounded bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-primary"
                    >
                      <span class="material-symbols-outlined text-sm"
                        >deployed_code</span
                      >
                    </div>
                    <span class="text-sm font-bold dark:text-white"
                      >{proj.name}</span
                    >
                  </a>
                </td>
                <td class="px-4 py-4 text-sm text-slate-500 dark:text-gray-400"
                  >{proj.client}</td
                >
                <td class="px-4 py-4 text-xs font-medium dark:text-gray-300"
                  >{proj.type}</td
                >
                <td class="px-4 py-4 text-xs text-slate-500 dark:text-gray-400"
                  >{proj.scope}</td
                >
                <td class="px-4 py-4 font-bold text-primary text-sm"
                  >{proj.price}</td
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

      <!-- Mobile Card View -->
      <div class="md:hidden space-y-4">
        {#each projects as proj}
          <a
            href="/projects/new"
            class="block bg-white dark:bg-gray-900 p-4 rounded-xl border border-slate-100 dark:border-gray-800 shadow-sm active:scale-[0.98] transition-all"
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
                  <span class="text-xs text-primary font-bold"
                    >{proj.price}</span
                  >
                </div>
              </div>
              <div
                class="size-8 rounded-full bg-slate-50 dark:bg-gray-800 flex items-center justify-center text-slate-400"
              >
                <span class="material-symbols-outlined text-sm"
                  >chevron_right</span
                >
              </div>
            </div>
          </a>
        {/each}
      </div>
    </section>
  </main>

  <a
    href="/projects/new"
    class="md:hidden fixed bottom-28 right-6 size-14 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center z-50 active:scale-90 transition-transform"
  >
    <span class="material-symbols-outlined text-2xl">add</span>
  </a>
</div>
