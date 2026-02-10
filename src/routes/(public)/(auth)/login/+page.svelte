<script lang="ts">
  import { goto } from "$app/navigation";
  import { auth, mockUser } from "$lib/stores";

  function handleLogin() {
    auth.login(mockUser);
    goto("/dashboard");
  }
</script>

<div
  class="w-full max-w-md p-8 bg-card dark:bg-card-dark rounded-3xl shadow-2xl border border-border dark:border-border-dark space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500"
>
  <div class="text-center space-y-2">
    <div class="flex justify-center mb-4">
      <div
        class="size-16 rounded-2xl bg-card dark:bg-card-dark flex items-center justify-center text-text dark:text-text-dark shadow-xl shadow-primary/20 border border-border dark:border-border-dark"
      >
        <span class="material-symbols-outlined text-4xl">psychology</span>
      </div>
    </div>
    <h1 class="text-3xl font-black text-text dark:text-text-dark">
      Welcome Back
    </h1>
    <p class="text-text dark:text-text-dark font-medium">
      Sign in to your SiFreelancer account
    </p>
  </div>

  <div class="space-y-4">
    <div class="space-y-1.5">
      <label
        for="email"
        class="text-xs font-bold text-text dark:text-text-dark uppercase tracking-widest ml-1"
        >Email Address</label
      >
      <input
        id="email"
        type="email"
        placeholder="name@company.com"
        class="w-full px-4 py-3.5 rounded-xl bg-text-input dark:bg-text-input-dark focus:ring-primary focus:border-primary transition-all text-text dark:text-text-dark" 
      />
    </div>
    <div class="space-y-1.5">
      <div class="flex justify-between items-center px-1">
        <label
          for="password"
          class="text-xs font-bold text-text dark:text-text-dark uppercase tracking-widest"
          >Password</label
        >
        <a
          href="/forgot-password"
          class="text-xs font-bold text-primary hover:underline text-text dark:text-text-dark"
          >Forgot Password?</a
        >
      </div>
      <input
        id="password"
        type="password"
        placeholder="••••••••"
        class="w-full px-4 py-3.5 rounded-xl bg-text-input dark:bg-text-input-dark text-text dark:text-text-dark focus:ring-primary focus:border-primary transition-all"
      />
    </div>
    <button
      onclick={handleLogin}
      class="w-full bg-primary text-text dark:text-text-dark px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all border border-border dark:border-border-dark"
    >
      Login
    </button>
  </div>

  <div class="relative flex items-center py-2">
    <div class="flex-grow border-t border-border dark:border-border-dark"></div>
    <span
      class="flex-shrink mx-4 text-xs font-bold text-text dark:text-text-dark uppercase tracking-widest"
      >or continue with</span
    >
    <div class="flex-grow border-t border-border dark:border-border-dark"></div>
  </div>

  <div class="grid grid-cols-2 gap-4">
    <button
      class="flex items-center justify-center gap-2 py-3 rounded-xl border border-border dark:border-border-dark hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
    >
      <img
        src="https://www.google.com/favicon.ico"
        alt="google"
        class="size-4"
      />
      <span class="text-sm font-bold dark:text-gray-300">Google</span>
    </button>
    <button
      class="flex items-center justify-center gap-2 py-3 rounded-xl border border-border dark:border-border-dark hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
    >
      <img
        src="https://github.com/favicon.ico"
        alt="github"
        class="size-4 dark:invert"
      />
      <span class="text-sm font-bold dark:text-gray-300">GitHub</span>
    </button>
  </div>

  <p class="text-center text-sm font-medium text-text dark:text-text-dark">
    Don't have an account?
    <a href="/register" class="text-primary font-bold hover:underline"
      >Register</a
    >
  </p>
</div>
