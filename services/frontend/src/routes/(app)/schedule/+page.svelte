<script lang="ts">
  import { scheduleEvents } from "$lib/data/mock";
</script>

<header
  class="sticky top-0 z-30 flex items-center justify-between bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 border-b border-gray-200 dark:border-gray-800"
>
  <div class="flex items-center gap-3">
    <h1 class="text-xl font-bold tracking-tight dark:text-white">Schedule</h1>
  </div>
  <div class="flex items-center gap-2">
    <button
      class="flex size-10 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
    >
      <span class="material-symbols-outlined">search</span>
    </button>
    <div
      class="size-8 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden ml-2"
    >
      <img
        alt="avatar"
        class="size-full object-cover"
        src="https://picsum.photos/100/100?random=8"
      />
    </div>
  </div>
</header>

<div class="p-4 max-w-6xl mx-auto w-full space-y-6">
  <div class="flex items-center justify-between gap-4">
    <div class="hidden sm:block">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        SiFreelancer Calendar
      </p>
      <p class="text-lg font-black dark:text-white">Your Weekly Agenda</p>
    </div>
    <a
      href="/schedule/new"
      class="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-primary/20"
    >
      <span class="material-symbols-outlined">add</span>
      <span>New Event</span>
    </a>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div class="lg:col-span-7 space-y-4">
      <div
        class="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-sm border border-gray-100 dark:border-gray-800"
      >
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-xl font-black dark:text-white">May 2024</h2>
          <div class="flex gap-2">
            <button
              class="size-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-gray-800 dark:text-gray-400"
            >
              <span class="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              class="size-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-gray-800 dark:text-gray-400"
            >
              <span class="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div class="grid grid-cols-7 text-center gap-2">
          {#each ["S", "M", "T", "W", "T", "F", "S"] as day}
            <div
              class="py-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]"
            >
              {day}
            </div>
          {/each}
          {#each Array.from({ length: 31 }) as _, i}
            <a
              href="/schedule/new"
              class="aspect-square flex items-center justify-center text-sm font-bold rounded-2xl cursor-pointer transition-all {i +
                1 ===
              12
                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                : 'hover:bg-slate-50 dark:hover:bg-white/5 dark:text-gray-400'}"
            >
              {i + 1}
            </a>
          {/each}
        </div>
      </div>
    </div>

    <div class="lg:col-span-5 space-y-6">
      <div class="flex items-center justify-between px-2">
        <h3 class="text-lg font-black dark:text-white">Upcoming Agenda</h3>
        <span
          class="text-[10px] font-black text-primary bg-primary/10 px-3 py-1.5 rounded-full uppercase tracking-widest"
          >May 12</span
        >
      </div>
      <div class="space-y-4">
        {#each scheduleEvents as event}
          <a
            href="/schedule/new"
            class="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 flex gap-6 hover:shadow-lg transition-all cursor-pointer group"
          >
            <div class="flex flex-col items-center gap-2 min-w-[60px]">
              <span class="text-base font-black dark:text-white"
                >{event.time}</span
              >
              <div
                class="w-1 flex-1 bg-slate-100 dark:bg-gray-800 rounded-full group-hover:bg-primary transition-colors"
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
