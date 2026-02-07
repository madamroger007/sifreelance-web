<script lang="ts">
  import { page } from "$app/stores";
  import { navItems, settingsNavItem } from "$lib/data/navigation";

  $: currentPath = $page.url.pathname;

  function isActive(href: string): boolean {
    if (href === "/dashboard") {
      return currentPath === "/dashboard" || currentPath === "/";
    }
    return currentPath.startsWith(href);
  }
</script>

<aside
  class="hidden md:flex w-64 flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark fixed inset-y-0 z-50"
>
  <div class="p-6 flex items-center gap-2">
    <span class="material-symbols-outlined text-primary text-2xl font-bold"
      >psychology</span
    >
    <p class="text-primary text-xl font-black tracking-tight">SiFreelancer</p>
  </div>

  <nav class="flex-1 px-4 space-y-2">
    {#each navItems as item}
      <a
        href={item.href}
        class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors {isActive(
          item.href,
        )
          ? 'bg-primary/10 text-primary'
          : 'hover:bg-gray-100 dark:hover:bg-white/10'}"
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
      class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors {isActive(
        settingsNavItem.href,
      )
        ? 'bg-primary/10 text-primary'
        : 'hover:bg-gray-100 dark:hover:bg-white/10'}"
    >
      <span
        class="material-symbols-outlined"
        style={isActive(settingsNavItem.href)
          ? "font-variation-settings: 'FILL' 1"
          : ""}
      >
        {settingsNavItem.icon}
      </span>
      <span class="font-semibold">{settingsNavItem.label}</span>
    </a>
    <a
      href="/"
      class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
    >
      <span class="material-symbols-outlined">logout</span>
      <span class="font-semibold text-sm">Sign Out</span>
    </a>
  </div>
</aside>
