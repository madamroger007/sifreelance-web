<script lang="ts">
  import "./(css)/components.css";
  import { isDarkMode } from "$lib/stores";
  import { onMount } from "svelte";

  let { children } = $props();

  onMount(() => {
    isDarkMode.init();
  });

</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
  />
</svelte:head>


{@render children()}
