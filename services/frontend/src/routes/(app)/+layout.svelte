<script lang="ts">
  import { Sidebar, MobileNav } from "$lib/components/layout";

  let { children } = $props();
</script>

<div class="min-h-screen flex flex-col md:flex-row">
  <Sidebar />

  <main
    class="flex-1 md:ml-64 flex flex-col bg-background-light dark:bg-background-dark pb-24 md:pb-0 min-h-screen"
  >
    {@render children()}
  </main>

  <MobileNav />
</div>
