<script lang="ts">
  import { transactions } from "$lib/frontend/data/mock";
</script>

<main class="p-4 flex flex-col gap-6 max-w-4xl mx-auto w-full">


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
