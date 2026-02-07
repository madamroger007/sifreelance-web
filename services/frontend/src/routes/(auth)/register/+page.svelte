<script lang="ts">
  import { goto } from "$app/navigation";
  import { auth, mockUser } from "$lib/stores";

  function handleRegister() {
    auth.login(mockUser);
    goto("/dashboard");
  }
</script>

<div
  class="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-gray-800 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500"
>
  <div class="text-center space-y-2">
    <h1 class="text-3xl font-black text-slate-900 dark:text-white">
      Create Account
    </h1>
    <p class="text-slate-500 dark:text-gray-400 font-medium">
      Start managing your freelance work
    </p>
  </div>

  <div class="space-y-4">
    <div class="space-y-1.5">
      <label
        for="fullname"
        class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
        >Full Name</label
      >
      <input
        id="fullname"
        type="text"
        placeholder="Alex Johnson"
        class="w-full px-4 py-3.5 rounded-xl border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary focus:border-primary transition-all"
      />
    </div>
    <div class="space-y-1.5">
      <label
        for="email"
        class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
        >Email Address</label
      >
      <input
        id="email"
        type="email"
        placeholder="name@company.com"
        class="w-full px-4 py-3.5 rounded-xl border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary focus:border-primary transition-all"
      />
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-1.5">
        <label
          for="password"
          class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
          >Password</label
        >
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          class="w-full px-4 py-3.5 rounded-xl border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary focus:border-primary transition-all"
        />
      </div>
      <div class="space-y-1.5">
        <label
          for="confirm"
          class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
          >Confirm</label
        >
        <input
          id="confirm"
          type="password"
          placeholder="••••••••"
          class="w-full px-4 py-3.5 rounded-xl border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary focus:border-primary transition-all"
        />
      </div>
    </div>
    <button
      onclick={handleRegister}
      class="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
    >
      Register
    </button>
  </div>

  <p class="text-center text-sm font-medium text-slate-500 dark:text-gray-400">
    Already have an account?
    <a href="/login" class="text-primary font-bold hover:underline">Login</a>
  </p>
</div>
