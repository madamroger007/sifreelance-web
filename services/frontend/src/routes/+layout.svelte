<script lang="ts">
  import "../app.css";
  import { browser } from "$app/environment";
  import { isDarkMode } from "$lib/stores";

  let { children } = $props();

  // Apply dark mode on initial load
  $effect(() => {
    if (browser) {
      if ($isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  });
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
  />
</svelte:head>

{@render children()}
