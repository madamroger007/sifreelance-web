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

<nav
  class="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 z-50 flex items-center justify-between px-6 pt-3 pb-safe-area-inset-bottom h-[84px]"
>
  {#each navItems as item}
    <a
      href={item.href}
      class="flex flex-col items-center gap-1.5 w-1/5 {isActive(item.href)
        ? 'text-primary'
        : 'text-gray-400'}"
    >
      <span
        class="material-symbols-outlined text-[26px]"
        style={isActive(item.href) ? "font-variation-settings: 'FILL' 1" : ""}
      >
        {item.icon}
      </span>
      <span class="text-[10px] font-medium">{item.label}</span>
    </a>
  {/each}
  <a
    href={settingsNavItem.href}
    class="flex flex-col items-center gap-1.5 w-1/5 {isActive(
      settingsNavItem.href,
    )
      ? 'text-primary'
      : 'text-gray-400'}"
  >
    <span
      class="material-symbols-outlined text-[26px]"
      style={isActive(settingsNavItem.href)
        ? "font-variation-settings: 'FILL' 1"
        : ""}
    >
      {settingsNavItem.icon}
    </span>
    <span class="text-[10px] font-medium">{settingsNavItem.label}</span>
  </a>
</nav>
