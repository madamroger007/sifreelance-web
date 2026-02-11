<script lang="ts">
  import { signIn } from "@auth/sveltekit/client";
</script>

<div class="grid grid-cols-2 gap-4">
  <button
    class="flex items-center justify-center gap-2 py-3 rounded-xl border border-border dark:border-border-dark hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
    on:click={() => signIn("google")}
  >
    <img src="https://www.google.com/favicon.ico" alt="google" class="size-4" />
    <span class="text-sm font-bold dark:text-gray-300">Google</span>
  </button>
  <button
    class="flex items-center justify-center gap-2 py-3 rounded-xl border border-border dark:border-border-dark hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
    on:click={() => signIn("github")}
  >
    <img
      src="https://github.com/favicon.ico"
      alt="github"
      class="size-4 dark:invert"
    />
    <span class="text-sm font-bold dark:text-gray-300">GitHub</span>
  </button>
</div>
