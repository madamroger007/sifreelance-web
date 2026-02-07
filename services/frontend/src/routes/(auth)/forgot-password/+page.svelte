<div
  class="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-gray-800 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500"
>
  <div class="text-center space-y-2">
    <h1 class="text-3xl font-black text-slate-900 dark:text-white">
      Forgot Password
    </h1>
    <p class="text-slate-500 dark:text-gray-400 font-medium leading-relaxed">
      Enter your email and we'll send you a reset link.
    </p>
  </div>

  <div class="space-y-6">
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
    <button
      class="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
    >
      Send Reset Link
    </button>
    <a
      href="/login"
      class="w-full text-sm font-bold text-slate-400 hover:text-primary transition-colors flex items-center justify-center gap-2"
    >
      <span class="material-symbols-outlined text-lg">arrow_back</span>
      Back to Login
    </a>
  </div>
</div>
