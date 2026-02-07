<script lang="ts">
  import { Header } from "$lib/components/layout";
  import { mockUser } from "$lib/stores";
</script>

<Header
  showUser={true}
  userAvatar={mockUser.avatar}
  userName={mockUser.name}
  subtitle="SiFreelancer Workspace"
/>

<main class="p-5 pt-4 space-y-6">
  <section>
    <div class="flex overflow-x-auto gap-4 no-scrollbar">
      <div
        class="min-w-[160px] flex-1 bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-slate-50 dark:border-gray-800"
      >
        <div class="flex items-center gap-2 mb-3">
          <div
            class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"
          >
            <span class="material-symbols-outlined text-primary text-lg"
              >account_balance_wallet</span
            >
          </div>
          <span class="text-xs font-semibold text-slate-500 dark:text-gray-400"
            >Total Profit</span
          >
        </div>
        <p class="text-xl font-bold tracking-tight dark:text-white">$12,480</p>
        <div class="flex items-center gap-1 mt-1">
          <span class="text-[10px] text-emerald-600 font-bold">+8%</span>
          <span class="text-[10px] text-slate-400">vs last mo</span>
        </div>
      </div>
      <div
        class="min-w-[160px] flex-1 bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-slate-50 dark:border-gray-800"
      >
        <div class="flex items-center gap-2 mb-3">
          <div
            class="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center"
          >
            <span class="material-symbols-outlined text-orange-600 text-lg"
              >pending_actions</span
            >
          </div>
          <span class="text-xs font-semibold text-slate-500 dark:text-gray-400"
            >Pending</span
          >
        </div>
        <p class="text-xl font-bold tracking-tight dark:text-white">$4,200</p>
        <div class="flex items-center gap-1 mt-1">
          <span class="text-[10px] text-slate-400">3 AI suggested quotes</span>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div
      class="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-slate-50 dark:border-gray-800"
    >
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-sm font-bold dark:text-white">Earnings Breakdown</h2>
        <div
          class="flex items-center gap-1 text-[10px] font-bold text-slate-400"
        >
          <span class="w-2 h-2 rounded-full bg-primary"></span>
          Net Revenue
        </div>
      </div>
      <div class="h-24 w-full relative">
        <svg
          class="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 400 100"
        >
          <defs>
            <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="#3713ec" stop-opacity="0.2"></stop>
              <stop offset="100%" stop-color="#3713ec" stop-opacity="0"></stop>
            </linearGradient>
          </defs>
          <path
            d="M0,80 Q50,70 100,85 T200,40 T300,60 T400,20 L400,100 L0,100 Z"
            fill="url(#chartFill)"
          ></path>
          <path
            d="M0,80 Q50,70 100,85 T200,40 T300,60 T400,20"
            fill="none"
            stroke="#3713ec"
            stroke-linecap="round"
            stroke-width="3"
          ></path>
        </svg>
      </div>
      <div class="flex justify-between mt-2 px-1">
        <span class="text-[9px] font-bold text-slate-400">MON</span>
        <span class="text-[9px] font-bold text-slate-400">TUE</span>
        <span class="text-[9px] font-bold text-primary">WED</span>
        <span class="text-[9px] font-bold text-slate-400">THU</span>
        <span class="text-[9px] font-bold text-slate-400">FRI</span>
      </div>
    </div>
  </section>

  <section>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-base font-bold dark:text-white">
        Recent Project Pricing
      </h2>
      <button class="text-xs font-semibold text-primary">View history</button>
    </div>
    <div class="grid grid-cols-1 gap-4">
      <div
        class="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-slate-50 dark:border-gray-800"
      >
        <div class="flex justify-between items-start mb-3">
          <div class="flex items-center gap-3">
            <div
              class="size-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-primary"
            >
              <span class="material-symbols-outlined">auto_awesome</span>
            </div>
            <div>
              <h3 class="text-sm font-bold dark:text-white">
                Fintech Dashboard
              </h3>
              <p class="text-[10px] text-slate-400">
                AI Suggested: $3.5k - $4k
              </p>
            </div>
          </div>
          <span
            class="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold uppercase"
            >Negotiating</span
          >
        </div>
        <div
          class="flex justify-between items-center pt-2 border-t border-slate-50 dark:border-gray-800 mt-2"
        >
          <div class="flex -space-x-2">
            <img
              alt=""
              class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800"
              src="https://picsum.photos/50/50?random=11"
            />
          </div>
          <p class="text-[10px] font-medium text-slate-400">Created 2h ago</p>
        </div>
      </div>
    </div>
  </section>
</main>
