<script lang="ts">
  import { transactions } from "$lib/frontend/data/mock";
</script>

<main class="p-4 flex flex-col gap-6 max-w-4xl mx-auto w-full">
  <div
    class="bg-slate-200/50 dark:bg-gray-800 p-1 rounded-xl flex max-w-sm mx-auto w-full"
  >
    <button
      class="flex-1 py-2 text-sm font-semibold rounded-lg bg-white dark:bg-primary shadow-sm text-primary dark:text-white transition-all"
    >
      Income
    </button>
    <button
      class="flex-1 py-2 text-sm font-semibold rounded-lg text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all"
    >
      Expenses
    </button>
  </div>

  <section
    class="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-gray-800"
  >
    <div class="flex justify-between items-start mb-4">
      <div>
        <p
          class="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider"
        >
          Total Cashflow
        </p>
        <h2 class="text-4xl font-black mt-1 dark:text-white">$42,850.00</h2>
        <div
          class="flex items-center gap-1 mt-1 text-teal-600 font-medium text-sm"
        >
          <span class="material-symbols-outlined text-sm">trending_up</span>
          <span>+12.4% vs last month</span>
        </div>
      </div>
      <div
        class="bg-primary text-white p-3 rounded-2xl shadow-lg shadow-primary/20"
      >
        <span class="material-symbols-outlined">insights</span>
      </div>
    </div>
    <div class="w-full h-40 mt-4 relative">
      <svg
        class="w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 400 150"
      >
        <defs>
          <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#3713ec" stop-opacity="0.3"></stop>
            <stop offset="100%" stop-color="#3713ec" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
        <path
          d="M0,120 Q50,110 80,80 T150,90 T220,40 T300,60 T400,20 L400,150 L0,150 Z"
          fill="url(#chartGradient)"
        ></path>
        <path
          d="M0,120 Q50,110 80,80 T150,90 T220,40 T300,60 T400,20"
          fill="none"
          stroke="#3713ec"
          stroke-linecap="round"
          stroke-width="3"
        ></path>
      </svg>
    </div>
  </section>

  <section class="space-y-4">
    <div class="flex items-center justify-between">
      <h3 class="font-black text-lg dark:text-white">Recent Transactions</h3>
      <button class="text-primary text-sm font-bold flex items-center gap-1">
        Filter
        <span class="material-symbols-outlined text-sm">filter_list</span>
      </button>
    </div>
    <div class="space-y-3">
      {#each transactions as transaction}
        <a
          href="/dashboard/finance/new"
          class="bg-white dark:bg-gray-900 p-5 rounded-2xl flex items-center justify-between border border-slate-50 dark:border-gray-800 shadow-sm hover:scale-[1.01] transition-transform cursor-pointer"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center"
            >
              <span class="material-symbols-outlined text-2xl"
                >{transaction.icon}</span
              >
            </div>
            <div>
              <p class="font-bold text-sm dark:text-white">
                {transaction.name}
              </p>
              <p class="text-xs text-slate-500 dark:text-gray-400">
                {transaction.description}
              </p>
            </div>
          </div>
          <div class="text-right">
            <p class="font-black text-teal-600 text-base">
              {transaction.amount}
            </p>
            <p
              class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
            >
              {transaction.date}
            </p>
          </div>
        </a>
      {/each}
    </div>
  </section>
</main>

<a href="/dashboard/finance/new" class="card-button-fixed-bottom-right">
  <span class="material-symbols-outlined text-3xl font-bold">add</span>
</a>
