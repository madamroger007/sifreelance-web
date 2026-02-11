<script lang="ts">
  import { signIn } from "@auth/sveltekit/client";
  import AuthProviderButton from "$lib/frontend/components/button/auth-provider.svelte";
  let email = "";
  let password = "";
  let errorMessage = "";

  async function handleLogin() {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      errorMessage = "Invalid email or password";
      return;
    }

    // redirect manual
    window.location.href = "/dashboard";
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
        bind:value={email}
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
        bind:value={password}
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

  <AuthProviderButton />

  <p class="text-center text-sm font-medium text-text dark:text-text-dark">
    Don't have an account?
    <a href="/register" class="text-primary font-bold hover:underline"
      >Register</a
    >
  </p>
</div>
