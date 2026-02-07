<script lang="ts">
  let { children } = $props();
</script>

<div
  class="min-h-screen bg-slate-50 dark:bg-background-dark flex items-center justify-center p-6"
>
  {@render children()}
</div>
