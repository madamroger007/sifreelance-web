<script lang="ts">
  import CardViewMobile from "$lib/frontend/components/card/card-view-mobile.svelte";
  import FinanceChart from "$lib/frontend/components/chart/finance-chart.svelte";
  import type { Project } from "$lib/shared/types/types";

  export let data: {
    projects: Project[];
    totalRevenue: number;
    revenueBreakdown: { day: string; revenue: number }[];
  };

  $: totalRevenue = data.totalRevenue || 0;
  $: revenueBreakdown = data.revenueBreakdown || [];

  // Format currency
  function formatCurrency(value: number): string {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}k`;
    }
    return `$${value.toLocaleString()}`;
  }
</script>

<main class="p-5 pt-4 space-y-6">
  <section>
    <div class="flex overflow-x-auto gap-4 no-scrollbar">
      <div class="min-w-[150px] flex-1 card-component-container-2">
        <div class="flex items-center gap-2 mb-3">
          <div
            class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"
          >
            <span
              class="material-symbols-outlined text-primary text-lg text-text dark:text-text-dark"
              >account_balance_wallet</span
            >
          </div>
          <span class="text-xs font-semibold text-text dark:text-text-dark"
            >Total Profit</span
          >
        </div>
        <p class="text-xl font-bold tracking-tight dark:text-white">
          {formatCurrency(totalRevenue)}
        </p>
        <div class="flex items-center gap-1 mt-1">
          <span class="text-[10px] text-emerald-600 font-bold">+8%</span>
          <span class="text-[10px] text-text dark:text-text-dark"
            >vs last mo</span
          >
        </div>
      </div>
    </div>
  </section>

  <section>
    <FinanceChart
      {revenueBreakdown}
      title="Earnings Breakdown"
      label="Net Revenue"
    />
  </section>

  <section>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-base font-bold dark:text-text-dark text-text">
        Recent Project Pricing
      </h2>
      <button class="text-xs font-semibold text-text dark:text-text-dark"
        >View history</button
      >
    </div>
    <CardViewMobile projects={data.projects}  classes="space-y-4"/>
  </section>
</main>
