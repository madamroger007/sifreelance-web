<script lang="ts">
  import { Sidebar, MobileNav } from "$lib/components/layout";
  import Header from "$lib/components/header/Header.svelte";
  import { mockUser } from "$lib/stores";

  let { children } = $props();
</script>

<div class="min-h-screen flex flex-col md:flex-row">
  <Sidebar />

  <main
    class="flex-1 md:ml-64 flex flex-col bg-background dark:bg-background-dark pb-24 md:pb-0 min-h-screen"
  >
    <Header
      showUser={true}
      userAvatar={mockUser.avatar}
      userName={mockUser.name}
      subtitle="SiFreelancer Workspace"
    />
    {@render children()}
  </main>

  <MobileNav />
</div>
