<script lang="ts">
  let description = $state("");
  let complexity = $state<"Low" | "Medium" | "High">("Medium");
  let projectType = $state<"Fixed" | "Hourly">("Fixed");
  let showResult = $state(false);
</script>

<div
  class="flex flex-col min-h-full bg-background-light dark:bg-background-dark pb-32"
>
  <header
    class="sticky top-0 z-40 bg-white/80 dark:bg-background-dark/80 backdrop-blur-lg border-b border-slate-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between"
  >
    <div class="flex items-center gap-4">
      <a
        href="/projects"
        class="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </a>
      <h1 class="text-xl font-bold tracking-tight dark:text-white">
        Create New Project
      </h1>
    </div>
    <a
      href="/projects"
      class="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 transition-all active:scale-95"
    >
      Save Project
    </a>
  </header>

  <main
    class="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto w-full"
  >
    <!-- Main Form - Left -->
    <section
      class="lg:col-span-7 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500"
    >
      <div
        class="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-gray-800 space-y-6"
      >
        <h2
          class="text-lg font-black dark:text-white border-b border-slate-50 dark:border-gray-800 pb-4"
        >
          General Information
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label
              for="project-name"
              class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
              >Project Name</label
            >
            <input
              id="project-name"
              type="text"
              placeholder="e.g. Phoenix Web App"
              class="w-full px-4 py-3 rounded-xl border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary focus:border-primary"
            />
          </div>
          <div class="space-y-2">
            <label
              for="client-name"
              class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
              >Client Name</label
            >
            <input
              id="client-name"
              type="text"
              placeholder="e.g. Acme Corp"
              class="w-full px-4 py-3 rounded-xl border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div class="space-y-2">
            <label
              for="project-type"
              class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
              >Project Type</label
            >
            <select
              id="project-type"
              class="w-full px-4 py-3 rounded-xl border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary"
            >
              <option>Fixed Price</option>
              <option>Hourly</option>
              <option>Retainer</option>
            </select>
          </div>
          <div class="space-y-2">
            <label
              for="status"
              class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
              >Status</label
            >
            <select
              id="status"
              class="w-full px-4 py-3 rounded-xl border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary"
            >
              <option>Prospect</option>
              <option>In Progress</option>
              <option>Review</option>
              <option>Completed</option>
            </select>
          </div>
          <div class="space-y-2 col-span-2 md:col-span-1">
            <label
              for="budget"
              class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
              >Budget</label
            >
            <input
              id="budget"
              type="text"
              placeholder="$0.00"
              class="w-full px-4 py-3 rounded-xl border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label
            for="notes"
            class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
            >Notes & Scope</label
          >
          <textarea
            id="notes"
            placeholder="Outline project goals..."
            rows="4"
            class="w-full px-4 py-3 rounded-xl border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary"
          ></textarea>
        </div>
      </div>
    </section>

    <!-- AI Assistant - Right -->
    <aside
      class="lg:col-span-5 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-3xl border-2 border-primary/10 shadow-2xl shadow-primary/5 overflow-hidden"
      >
        <div class="bg-primary p-6 flex items-center gap-4 text-white">
          <div
            class="size-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md"
          >
            <span class="material-symbols-outlined text-3xl">psychology</span>
          </div>
          <div>
            <h3 class="font-black text-lg">AI Price Assistant</h3>
            <p class="text-xs opacity-70">Smarter quotes in seconds</p>
          </div>
        </div>

        <div class="p-6 space-y-6">
          <div class="space-y-4">
            <div class="space-y-2">
              <label
                for="ai-description"
                class="text-[11px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest"
                >Project Description for AI</label
              >
              <textarea
                id="ai-description"
                bind:value={description}
                class="w-full rounded-2xl border-slate-200 dark:border-gray-800 bg-slate-50/50 dark:bg-gray-950 text-sm focus:ring-primary focus:border-primary placeholder:text-slate-400 dark:text-white resize-none"
                placeholder="e.g. Design a responsive dashboard UI for a fintech app, including 5 pages and a design system. Timeline: 2 weeks."
                rows="5"
              ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <span
                  class="text-[11px] font-bold text-slate-400 uppercase tracking-widest"
                  >Pricing Model</span
                >
                <div
                  class="flex p-1 bg-slate-50 dark:bg-gray-950 rounded-xl border border-slate-200 dark:border-gray-800"
                >
                  <button
                    onclick={() => (projectType = "Fixed")}
                    class="flex-1 py-2 text-xs font-bold rounded-lg transition-all {projectType ===
                    'Fixed'
                      ? 'bg-primary text-white'
                      : 'text-slate-400'}"
                  >
                    Fixed
                  </button>
                  <button
                    onclick={() => (projectType = "Hourly")}
                    class="flex-1 py-2 text-xs font-bold rounded-lg transition-all {projectType ===
                    'Hourly'
                      ? 'bg-primary text-white'
                      : 'text-slate-400'}"
                  >
                    Hourly
                  </button>
                </div>
              </div>
              <div class="space-y-2">
                <label
                  for="ai-complexity"
                  class="text-[11px] font-bold text-slate-400 uppercase tracking-widest"
                  >Complexity</label
                >
                <select
                  id="ai-complexity"
                  bind:value={complexity}
                  class="w-full py-2 px-3 rounded-xl border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-950 text-xs font-bold dark:text-white focus:ring-primary"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            <button
              onclick={() => (showResult = true)}
              class="w-full bg-primary text-white py-4 rounded-xl font-bold text-sm shadow-xl shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span class="material-symbols-outlined text-lg">magic_button</span
              >
              Generate Price Range
            </button>
          </div>

          {#if showResult}
            <div class="animate-in zoom-in-95 duration-300">
              <div
                class="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-[2rem] border-2 border-primary/20 space-y-4"
              >
                <div class="flex justify-between items-start">
                  <span
                    class="text-[10px] font-black text-primary uppercase tracking-[0.2em]"
                    >Recommendation</span
                  >
                  <button
                    onclick={() => (showResult = false)}
                    class="size-6 rounded-full hover:bg-white/20 flex items-center justify-center text-slate-400"
                  >
                    <span class="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
                <div class="space-y-1">
                  <p class="text-4xl font-black text-slate-900 dark:text-white">
                    $3.8k - $5.2k
                  </p>
                  <p
                    class="text-xs text-slate-500 dark:text-gray-400 font-medium italic"
                  >
                    "High-complexity dashboard design in a tight 2-week sprint."
                  </p>
                </div>
                <div class="flex gap-2">
                  <button
                    class="flex-1 bg-primary text-white py-3 rounded-xl text-xs font-bold shadow-lg shadow-primary/20"
                    >Apply This Price</button
                  >
                  <button
                    class="px-4 py-3 bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-xl text-slate-400"
                  >
                    <span class="material-symbols-outlined">refresh</span>
                  </button>
                </div>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </aside>
  </main>

  <!-- Sticky Mobile Actions -->
  <div
    class="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl border-t border-slate-100 dark:border-gray-800 flex gap-4 z-50"
  >
    <a
      href="/projects"
      class="flex-1 py-4 bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300 rounded-2xl font-bold text-center"
      >Cancel</a
    >
    <a
      href="/projects"
      class="flex-[2] py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 text-center"
      >Save Project</a
    >
  </div>
</div>
