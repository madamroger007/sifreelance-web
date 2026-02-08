<div
  class="w-full max-w-md p-8 bg-card dark:bg-card-dark rounded-3xl shadow-2xl border border-border dark:border-border-dark space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500"
>
  <div class="text-center space-y-2">
    <h1 class="text-3xl font-black text-text dark:text-text-dark  ">
      Forgot Password
    </h1>
    <p class="text-text dark:text-text-dark font-medium leading-relaxed">
      Enter your email and we'll send you a reset link.
    </p>
  </div>

  <div class="space-y-6">
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
        class="w-full px-4 py-3.5 rounded-xl border-border dark:border-border-dark bg-text-input dark:bg-text-input-dark text-text dark:text-text-dark focus:ring-primary focus:border-primary transition-all"
      />
    </div>
    <button
      class="w-full bg-primary text-text dark:text-text-dark py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all border border-border dark:border-border-dark"
    >
      Send Reset Link
    </button>
    <a
      href="/login"
      class="w-full text-sm font-bold text-text dark:text-text-dark hover:text-primary transition-colors flex items-center justify-center gap-2"
    >
      <span class="material-symbols-outlined text-lg">arrow_back</span>
      Back to Login
    </a>
  </div>
</div>
