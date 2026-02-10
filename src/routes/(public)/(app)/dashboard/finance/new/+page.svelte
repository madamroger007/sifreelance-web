<script lang="ts">
  let type = $state<"Income" | "Expense">("Income");
</script>

<div
  class="flex flex-col min-h-full bg-background-light dark:bg-background-dark"
>
  <header
    class="sticky top-0 z-40 bg-white/80 dark:bg-background-dark/80 backdrop-blur-lg border-b border-slate-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between"
  >
    <div class="flex items-center gap-4">
      <a
        href="/finance"
        class="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </a>
      <h1 class="text-xl font-bold tracking-tight dark:text-white">
        Log Transaction
      </h1>
    </div>
    <a
      href="/finance"
      class="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 transition-all active:scale-95"
    >
      Save Entry
    </a>
  </header>

  <main
    class="p-6 max-w-2xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
  >
    <div
      class="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-gray-800 space-y-8"
    >
      <div
        class="flex p-1.5 bg-slate-50 dark:bg-gray-950 rounded-2xl border border-slate-200 dark:border-gray-800"
      >
        <button
          onclick={() => (type = "Income")}
          class="flex-1 py-3 text-sm font-black rounded-xl transition-all {type ===
          'Income'
            ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
            : 'text-slate-400'}"
        >
          Income
        </button>
        <button
          onclick={() => (type = "Expense")}
          class="flex-1 py-3 text-sm font-black rounded-xl transition-all {type ===
          'Expense'
            ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
            : 'text-slate-400'}"
        >
          Expense
        </button>
      </div>

      <div class="space-y-6">
        <div class="space-y-2">
          <label
            for="amount"
            class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1"
            >Amount</label
          >
          <div class="relative">
            <span
              class="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-400"
              >$</span
            >
            <input
              id="amount"
              type="number"
              placeholder="0.00"
              class="w-full pl-12 pr-6 py-5 rounded-3xl border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-950 dark:text-white text-3xl font-black focus:ring-primary transition-all"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label
              for="category"
              class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
              >Category</label
            >
            <select
              id="category"
              class="w-full px-5 py-4 rounded-2xl border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary"
            >
              <option>Project Payment</option>
              <option>Software Subscription</option>
              <option>Marketing</option>
              <option>Office Supplies</option>
              <option>Consulting</option>
            </select>
          </div>
          <div class="space-y-2">
            <label
              for="date"
              class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
              >Date</label
            >
            <input
              id="date"
              type="date"
              class="w-full px-5 py-4 rounded-2xl border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label
            for="description"
            class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
            >Description</label
          >
          <input
            id="description"
            type="text"
            placeholder="e.g. Adobe Suite Monthly"
            class="w-full px-5 py-4 rounded-2xl border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary"
          />
        </div>

        <div class="space-y-2">
          <label
            for="project-link"
            class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
            >Link to Project (Optional)</label
          >
          <select
            id="project-link"
            class="w-full px-5 py-4 rounded-2xl border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary"
          >
            <option>No Project</option>
            <option>Aurora Design System</option>
            <option>E-comm Dashboard</option>
          </select>
        </div>
      </div>

      <div class="pt-4">
        <a
          href="/finance"
          class="block w-full bg-slate-900 dark:bg-primary text-white py-5 rounded-3xl font-black text-lg shadow-2xl transition-all active:scale-95 text-center"
        >
          Confirm Transaction
        </a>
      </div>
    </div>
  </main>
</div>
