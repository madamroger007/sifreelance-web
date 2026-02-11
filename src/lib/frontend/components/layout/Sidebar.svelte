<script lang="ts">
  import { page } from "$app/stores";
  import { navItems, settingsNavItem } from "$lib/frontend/data/navigation";
  import Buttonlogout from "$lib/frontend/components/button/logout.svelte";
  function isActive(url?: string) {
    if (!url) return false;
    const current = $page.url.pathname;
    console.log("current:", current, "url:", url);
    return current === url || current.startsWith(url + "/dashboard/");
  }
</script>

<aside
  class="hidden md:flex w-64 flex-col border-r border-border dark:border-border-dark bg-background dark:bg-background-dark fixed inset-y-0 z-50"
>
  <div class="p-6 flex items-center gap-2">
    <span
      class="material-symbols-outlined text-text dark:text-text-dark text-2xl font-bold"
      >psychology</span
    >
    <p class="text-text dark:text-text-dark text-xl font-black tracking-tight">
      SiFreelancer
    </p>
  </div>

  <nav class="flex-1 px-4 space-y-2">
    {#each navItems as item}
      <a
        href={item.href}
        class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-text-light dark:text-text-dark {isActive(
          item.href,
        )
          ? 'bg-gray-900/10 dark:bg-gray-100/10 text-text dark:text-text-dark border border-border dark:border-border-dark'
          : 'hover:bg-hover-overlay dark:hover:bg-hover-overlay-dark hover:border-border dark:hover:border-border-dark'}"
      >
        <span
          class="material-symbols-outlined"
          style={isActive(item.href) ? "font-variation-settings: 'FILL' 1" : ""}
        >
          {item.icon}
        </span>
        <span class="font-semibold">{item.label}</span>
      </a>
    {/each}
  </nav>

  <div class="p-4 mt-auto space-y-2">
    <a
      href={settingsNavItem.href}
      class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-text dark:text-text-dark {isActive(
        settingsNavItem.href,
      )
        ? 'bg-gray-900/10 dark:bg-gray-100/10  border border-border dark:border-border-dark'
        : 'hover:bg-hover-overlay dark:hover:bg-hover-overlay-dark hover:border-border dark:hover:border-border-dark'}"
    >
      <span
        class="material-symbols-outlined text-text dark:text-text-dark"
        style={isActive(settingsNavItem.href)
          ? "font-variation-settings: 'FILL' 1"
          : ""}
      >
        {settingsNavItem.icon}
      </span>
      <span class="font-semibold text-text dark:text-text-dark"
        >{settingsNavItem.label}</span
      >
    </a>
    <Buttonlogout customClass={"w-full flex  items-center gap-3 px-4 py-3 rounded-xl text-text dark:text-text-dark hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors cursor-pointer"}  />

  </div>
</aside>
