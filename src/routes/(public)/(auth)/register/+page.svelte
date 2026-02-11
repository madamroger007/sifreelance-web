<script lang="ts">
  export let form;
</script>

<form
  method="POST"
  class="w-full max-w-md p-8 bg-card dark:bg-card-dark rounded-3xl shadow-2xl border border-border dark:border-border-dark space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500"
>
  <div class="text-center space-y-2">
    <h1 class="text-3xl font-black text-text dark:text-text-dark">
      Create Account
    </h1>
    <p class="text-text dark:text-text-dark font-medium">
      Start managing your freelance work
    </p>
  </div>

  <div class="space-y-4">
    <div class="space-y-1.5">
      <label
        for="fullname"
        class="text-xs font-bold text-text dark:text-text-dark uppercase tracking-widest ml-1"
        >Full Name</label
      >
      <input
        id="fullname"
        type="text"
        name="name"
        placeholder="Alex Johnson"
        class="w-full px-4 py-3.5 rounded-xl border-border dark:border-border-dark bg-text-input dark:bg-text-input-dark text-text dark:text-text-dark focus:ring-primary focus:border-primary transition-all"
      />
    </div>
    <div class="space-y-1.5">
      <label
        for="email"
        class="text-xs font-bold text-text dark:text-text-dark uppercase tracking-widest ml-1"
        >Email Address</label
      >
      <input
        id="email"
        type="email"
        name="email"
        placeholder="name@company.com"
        class="w-full px-4 py-3.5 rounded-xl border-border dark:border-border-dark bg-text-input dark:bg-text-input-dark text-text dark:text-text-dark focus:ring-primary focus:border-primary transition-all"
      />
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-1.5">
        <label
          for="password"
          class="text-xs font-bold text-text dark:text-text-dark uppercase tracking-widest ml-1"
          >Password</label
        >
        <input
          id="password"
          type="password"
          name="password"
          placeholder="••••••••"
          class="w-full px-4 py-3.5 rounded-xl border-border dark:border-border-dark bg-text-input dark:bg-text-input-dark text-text dark:text-text-dark focus:ring-primary focus:border-primary transition-all"
        />
      </div>
      <div class="space-y-1.5">
        <label
          for="confirm"
          class="text-xs font-bold text-text dark:text-text-dark uppercase tracking-widest ml-1"
          >Confirm</label
        >
        <input
          id="confirm"
          type="password"
          name="confirmPassword"
          placeholder="••••••••"
          class="w-full px-4 py-3.5 rounded-xl border-border dark:border-border-dark bg-text-input dark:bg-text-input-dark text-text dark:text-text-dark focus:ring-primary focus:border-primary transition-all"
        />
      </div>
    </div>

    {#if form?.error}
      <p class="text-red-500">{form.error}</p>
    {/if}
    <button
      type="submit"
      class="w-full bg-primary text-text dark:text-text-dark py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all border border-border dark:border-border-dark"
    >
      Register
    </button>
  </div>

  <p class="text-center text-sm font-medium text-text dark:text-text-dark">
    Already have an account?
    <a href="/login" class="text-primary font-bold hover:underline">Login</a>
  </p>
</form>
