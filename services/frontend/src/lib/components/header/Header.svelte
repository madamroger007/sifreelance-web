<script lang="ts">
  export let title: string = "";
  export let subtitle: string = "";
  export let showUser: boolean = false;
  export let userAvatar: string = "";
  export let userName: string = "";
</script>

<header
  class="sticky top-0 z-30 bg-background/80 dark:bg-background-dark/80 backdrop-blur-lg px-5 py-4 flex items-center justify-between border-b border-border dark:border-border-dark"
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
          class="text-[10px] text-text dark:text-text-dark font-medium uppercase tracking-tight"
        >
          {subtitle}
        </p>
      {/if}
      <h1 class="text-sm font-bold dark:text-text-dark text-text">{title || userName}</h1>
    </div>
  </div>
  <div class="flex items-center gap-2">
    <button
      class="w-10 h-10 flex items-center justify-center rounded-full bg-background-light dark:bg-background-dark text-text dark:text-text-dark"
    >
      <span class="material-symbols-outlined text-[22px]">search</span>
    </button>
    <button
      class="w-10 h-10 flex items-center justify-center rounded-full bg-background-light dark:bg-background-dark text-text dark:text-text-dark   relative"
    >
      <span class="material-symbols-outlined text-[22px]">notifications</span>

    </button>
  </div>
</header>
