<script lang="ts">
  export let title: string = "";
  export let subtitle: string = "";
  export let showUser: boolean = false;
  export let userAvatar: string = "";
  export let userName: string = "";
</script>

<header
  class="sticky top-0 z-30 bg-white/80 dark:bg-background-dark/80 backdrop-blur-lg px-5 py-4 flex items-center justify-between border-b border-slate-100 dark:border-gray-800"
>
  <div class="flex items-center gap-3">
    {#if showUser}
      <div
        class="w-10 h-10 rounded-full bg-slate-200 overflow-hidden ring-2 ring-primary/10"
      >
        <img
          alt="Profile"
          class="w-full h-full object-cover"
          src={userAvatar}
        />
      </div>
    {/if}
    <div>
      {#if subtitle}
        <p
          class="text-[10px] text-slate-500 font-medium uppercase tracking-tight"
        >
          {subtitle}
        </p>
      {/if}
      <h1 class="text-sm font-bold dark:text-white">{title || userName}</h1>
    </div>
  </div>
  <div class="flex items-center gap-2">
    <button
      class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 dark:bg-gray-800 text-slate-600 dark:text-gray-400"
    >
      <span class="material-symbols-outlined text-[22px]">search</span>
    </button>
    <button
      class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 dark:bg-gray-800 text-slate-600 dark:text-gray-400 relative"
    >
      <span class="material-symbols-outlined text-[22px]">notifications</span>
      <span
        class="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-white dark:border-gray-800"
      ></span>
    </button>
  </div>
</header>
