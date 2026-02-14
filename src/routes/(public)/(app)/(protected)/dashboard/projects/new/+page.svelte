<script lang="ts">
  import { getCurrencyOptions } from "$lib/frontend/data/currencies";
  import { formatNumber } from "$lib/shared/utils/format-currency";

  type Recommendation = {
    recommendedMin: number;
    recommendedMax: number;
    currency: string;
    complexity: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
    estimatedHours: number;
    analysisSummary: string;
    reasoning: string[];
  };

  export let form:
    | {
        values?: Record<string, string>;
        recommendation?: Recommendation;
        error?: string;
        saved?: boolean;
      }
    | undefined;

  const values = form?.values ?? {};
  const recommendation = form?.recommendation ?? null;
  const hasRecommendation = Boolean(recommendation);
  const currencyOptions = getCurrencyOptions();
</script>

<div
  class="flex flex-col min-h-full bg-background-light dark:bg-background-dark pb-32"
>
  <header
    class="sticky top-0 z-40 bg-white/80 dark:bg-background-dark/80 backdrop-blur-lg border-b border-slate-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between"
  >
    <div class="flex items-center gap-4">
      <a
        href="/dashboard/projects"
        class="p-2 text-text dark:text-text-dark hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </a>
      <h1 class="text-xl font-bold tracking-tight dark:text-white">
        Create New Project
      </h1>
    </div>
    <button
      type="submit"
      form="project-form"
      formaction="?/save"
      class="bg-button-primary text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-60 disabled:pointer-events-none"
      disabled={!hasRecommendation}
    >
      Save Project
    </button>
  </header>

  <form
    id="project-form"
    method="post"
    class="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto w-full"
  >
    <!-- Main Form - Left -->
    <section
      class="lg:col-span-6 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500"
    >
      <div
        class="bg-card dark:bg-card-dark p-8 rounded-3xl shadow-sm border border-border dark:border-border-dark space-y-6"
      >
        <h2
          class="text-lg font-black text-text dark:text-text-dark border-b border-border dark:border-border-dark pb-4"
        >
          General Information
        </h2>

        <div class="grid grid-cols-1 gap-2">
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
              name="projectName"
              value={values.projectName ?? ""}
              required
              class="w-full px-4 py-3 rounded-xl border-border dark:border-border-dark bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary focus:border-primary"
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
              name="clientName"
              value={values.clientName ?? ""}
              required
              class="w-full px-4 py-3 rounded-xl border-border dark:border-border-dark bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary focus:border-primary"
            />
          </div>
          <div class="space-y-2">
            <label
              for="client-email"
              class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
              >Client Email</label
            >
            <input
              id="client-email"
              type="email"
              placeholder="e.g. contact@acme.com"
              name="clientEmail"
              value={values.clientEmail ?? ""}
              required
              class="w-full px-4 py-3 rounded-xl border-border dark:border-border-dark bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div class="space-y-2">
            <label
              for="project-type"
              class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
              >Project Type</label
            >
            <input
              id="project-type"
              type="text"
              placeholder="Web Development"
              name="projectType"
              value={values.projectType ?? ""}
              required
              class="w-full px-4 py-3 rounded-xl border-border dark:border-border-dark bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary focus:border-primary"
            />
          </div>
          <div class="space-y-2">
            <label
              for="status"
              class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
              >Status</label
            >
            <select
              id="status"
              name="status"
              value={values.status ?? "PENDING"}
              required
              class="w-full px-4 py-3 rounded-xl border-border dark:border-border-dark bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary"
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="ON_HOLD">On Hold</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div class="space-y-2 col-span-2 md:col-span-1">
            <label
              for="deadline"
              class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
              >Deadline</label
            >
            <input
              id="deadline"
              type="number"
              name="deadline"
              value={values.deadline ?? ""}
              required
              class="w-full px-4 py-3 rounded-xl border-border dark:border-border-dark bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary"
              placeholder="per Hours(12)"
            />
          </div>
          <div class="space-y-2 col-span-2 md:col-span-1">
            <label
              for="currency"
              class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
              >Currency</label
            >
            <select
              id="currency"
              name="currency"
              value={values.currency ?? "USD"}
              required
              class="w-full px-4 py-3 rounded-xl border-border dark:border-border-dark bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary"
            >
              {#each currencyOptions as currency}
                <option value={currency}>{currency}</option>
              {/each}
            </select>
          </div>
        </div>
        <div class="space-y-2">
          <div class="space-y-2 col-span-2 md:col-span-1">
            <label
              for="budget"
              class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
              >Budget</label
            >
            <input
              id="budget"
              type="number"
              placeholder="$0.00"
              name="budget"
              value={values.budget ?? ""}
              class="w-full px-4 py-3 rounded-xl border-border dark:border-border-dark bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary"
            />
          </div>

          <div class="space-y-2 col-span-2 md:col-span-1">
            <label
              for="price"
              class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
              >Price</label
            >
            <input
              id="price"
              type="number"
              placeholder="$0.00"
              name="price"
              value={values.price ?? ""}
              class="w-full px-4 py-3 rounded-xl border-border dark:border-border-dark bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- AI Assistant - Right -->
    <aside
      class="lg:col-span-6 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500"
    >
      <div
        class="bg-card dark:bg-card-dark rounded-3xl border-2 border-primary/10 shadow-2xl shadow-primary/5 overflow-hidden"
      >
        <div
          class="bg-primary p-6 flex items-center gap-4 text-text dark:text-text-dark"
        >
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
                for="description"
                class="text-[11px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest"
                >Project Description for AI</label
              >
              <textarea
                id="description"
                name="description"
                class="w-full p-2 rounded-2xl border-border dark:border-border-dark bg-slate-50/50 dark:bg-gray-950 text-sm focus:ring-primary focus:border-primary placeholder:text-slate-400 dark:text-text-dark resize-none"
                placeholder="e.g. Design a responsive dashboard UI for a fintech app, including 5 pages and a design system. Timeline: 2 weeks."
                rows="5">{values.description ?? ""}</textarea
              >
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div class="space-y-2">
                <label
                  for="complexity"
                  class="text-[11px] font-bold text-slate-400 uppercase tracking-widest"
                  >Complexity</label
                >
                <select
                  id="complexity"
                  name="complexity"
                  value={values.complexity ?? "MEDIUM"}
                  class="w-full p-3 rounded-xl border-border dark:border-border-dark bg-slate-50 dark:bg-gray-950 text-xs font-bold dark:text-white focus:ring-primary"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              formaction="?/generate"
              class="w-full bg-button-primary text-white py-4 rounded-xl font-bold text-sm shadow-xl shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span class="material-symbols-outlined text-lg">magic_button</span
              >
              Generate Price Range
            </button>
          </div>

          {#if form?.error}
            <div
              class="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-2xl p-4"
            >
              {form.error}
            </div>
          {/if}

          {#if recommendation}
            <div class="animate-in zoom-in-95 duration-300">
              <div
                class="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-[2rem] border-2 border-primary/20 space-y-4"
              >
                <div class="flex justify-between items-start">
                  <span
                    class="text-[10px] font-black text-text dark:text-text-dark uppercase tracking-[0.2em]"
                    >RECOMMENDATION</span
                  >
                </div>
                <div class="space-y-1">
                  <p class="text-4xl font-black text-slate-900 dark:text-white">
                    {recommendation.currency}
                    {formatNumber(recommendation.recommendedMin)} - {recommendation.currency}
                    {formatNumber(recommendation.recommendedMax)}
                  </p>
                  <p
                    class="text-xs text-slate-500 dark:text-gray-400 font-medium italic"
                  >
                    "{recommendation.analysisSummary} | {recommendation.reasoning.join(
                      ".",
                    )}"
                  </p>
                </div>
                <div class="flex gap-2">
                  <button
                    type="submit"
                    formaction="?/apply"
                    class="flex-1 bg-button-primary dark:bg-button-primary-dark text-white py-3 rounded-xl text-xs font-bold shadow-lg shadow-primary/20"
                    >Apply This Price</button
                  >
                  <button
                    type="submit"
                    formaction="?/generate"
                    class="px-4 py-3 bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-xl text-slate-400"
                  >
                    <span class="material-symbols-outlined">refresh</span>
                  </button>
                </div>
              </div>
            </div>
          {/if}

          {#if recommendation}
            <input
              type="hidden"
              name="recommendedMin"
              value={recommendation.recommendedMin}
            />
            <input
              type="hidden"
              name="recommendedMax"
              value={recommendation.recommendedMax}
            />
            <input
              type="hidden"
              name="estimatedHours"
              value={recommendation.estimatedHours}
            />
            <input
              type="hidden"
              name="analysisSummary"
              value={recommendation.analysisSummary}
            />
          {/if}
        </div>
      </div>
    </aside>
  </form>

  <!-- Sticky Mobile Actions -->
  <div
    class="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl border-t border-slate-100 dark:border-gray-800 flex gap-4 z-50"
  >
    <a
      href="/dashboard/projects"
      class="flex-1 py-4 bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300 rounded-2xl font-bold text-center"
      >Cancel</a
    >
    <button
      type="submit"
      form="project-form"
      formaction="?/save"
      class="flex-[2] py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 text-center disabled:opacity-60 disabled:pointer-events-none"
      disabled={!hasRecommendation}
    >
      Save Project
    </button>
  </div>

  {#if form?.saved}
    <div
      class="mx-6 mb-6 text-xs text-green-600 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 rounded-2xl p-4"
    >
      Project saved successfully.
    </div>
  {/if}
</div>
