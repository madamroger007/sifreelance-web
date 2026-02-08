<script lang="ts">
  import { scheduleEvents } from "$lib/data/mock";
</script>

<div class="p-4 max-w-6xl mx-auto w-full space-y-6">
  <div class="flex items-center justify-between gap-4">
    <div class="hidden sm:block">
      <p class="text-sm text-text dark:text-text-dark">
        SiFreelancer Calendar
      </p>
      <p class="text-lg font-black dark:text-white">Your Weekly Agenda</p>
    </div>
    <a
      href="/schedule/new"
      class="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary text-text dark:text-text-dark px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-primary/20 border border-border dark:border-border-dark"
    >
      <span class="material-symbols-outlined">add</span>
      <span>New Event</span>
    </a>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div class="lg:col-span-7 space-y-4">
      <div
        class="bg-card dark:bg-card-dark rounded-[2.5rem] p-8 shadow-sm border border-border dark:border-border-dark"
      >
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-xl font-black dark:text-white">May 2024</h2>
          <div class="flex gap-2">
            <button
              class="size-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-gray-800 dark:text-gray-400 border border-border dark:border-border-dark"
            >
              <span class="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              class="size-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-gray-800 dark:text-gray-400 border border-border dark:border-border-dark hover:bg-slate-100 dark:hover:bg-gray-900"
            >
              <span class="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div class="grid grid-cols-7 text-center gap-2">
          {#each ["S", "M", "T", "W", "T", "F", "S"] as day}
            <div
              class="py-2 text-[10px] font-black text-text dark:text-text-dark uppercase tracking-[0.3em]"
            >
              {day}
            </div>
          {/each}
          {#each Array.from({ length: 31 }) as _, i}
            <a
              href="/schedule/new"
              class="aspect-square flex items-center justify-center text-sm font-bold rounded-2xl cursor-pointer transition-all  {i +
                1 ===
              12
                ? 'bg-primary text-text dark:text-text-dark shadow-lg shadow-primary/30 border border-border dark:border-border-dark'
                : 'hover:bg-slate-50 dark:hover:bg-white/5 dark:text-text-dark'}"
            >
              {i + 1}
            </a>
          {/each}
        </div>
      </div>
    </div>

    <div class="lg:col-span-5 space-y-6">
      <div class="flex items-center justify-between px-2">
        <h3 class="text-lg font-black text-text dark:text-text-dark">Upcoming Agenda</h3>
        <span
          class="text-[10px] font-black text-primary bg-primary/10 px-3 py-1.5 rounded-full uppercase tracking-widest"
          >May 12</span
        >
      </div>
      <div class="space-y-4">
        {#each scheduleEvents as event}
          <a
            href="/schedule/new"
            class="bg-card dark:bg-card-dark p-6 rounded-3xl border border-border dark:border-border-dark flex gap-6 hover:shadow-lg transition-all cursor-pointer group"
          >
            <div class="flex flex-col items-center gap-2 min-w-[60px]">
              <span class="text-base font-black text-text dark:text-text-dark"
                >{event.time}</span
              >
              <div
                class="w-1 flex-1 bg-card dark:bg-card-dark rounded-full group-hover:bg-primary transition-colors"
              ></div>
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between mb-2">
                <span
                  class="text-[10px] font-black uppercase tracking-widest text-emerald-500"
                  >{event.type}</span
                >
                <span class="material-symbols-outlined text-gray-300"
                  >chevron_right</span
                >
              </div>
              <h4 class="font-black text-base dark:text-white mb-1">
                {event.title}
              </h4>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {event.description}
              </p>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </div>
</div>
