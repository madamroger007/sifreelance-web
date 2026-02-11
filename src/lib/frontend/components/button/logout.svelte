<script lang="ts">
  import { signOut } from "@auth/sveltekit/client";
  import type { ClassValue } from "svelte/elements";
  
  export let customClass: ClassValue | null | undefined;
</script>

<button
  on:click={() => signOut()}
  class={customClass}
>
  <span class="material-symbols-outlined">logout</span>
  <span class="font-semibold text-sm">Sign Out</span>
</button>
