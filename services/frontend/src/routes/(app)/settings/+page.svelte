<script lang="ts">
  import { isDarkMode } from "$lib/stores";
</script>

<header
  class="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800"
>
  <div class="flex items-center justify-between px-4 py-3">
    <h1 class="text-xl font-bold tracking-tight dark:text-white">Settings</h1>
    <button
      class="text-primary font-semibold text-sm px-3 py-1 rounded-full hover:bg-primary/10 transition-colors"
      >Done</button
    >
  </div>
</header>

<main class="flex-1 overflow-y-auto px-4 py-6 space-y-6">
  <section class="space-y-3">
    <h3
      class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1"
    >
      Appearance
    </h3>
    <div
      class="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800"
    >
      <div
        class="flex items-center justify-between p-3 border-b border-gray-50 dark:border-gray-800"
      >
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-gray-400">dark_mode</span>
          <p class="text-[15px] font-medium dark:text-white">Dark Mode</p>
        </div>
        <label
          class="relative flex h-[28px] w-[48px] cursor-pointer items-center rounded-full border-none bg-gray-200 dark:bg-gray-700 p-0.5 transition-all"
        >
          <input
            type="checkbox"
            class="hidden peer"
            checked={$isDarkMode}
            onchange={(e) => isDarkMode.set(e.currentTarget.checked)}
          />
          <div
            class="h-[24px] w-[24px] rounded-full bg-white shadow-md transition-all transform {$isDarkMode
              ? 'translate-x-5'
              : 'translate-x-0'}"
          ></div>
          <div
            class="absolute inset-0 rounded-full transition-colors -z-10 {$isDarkMode
              ? 'bg-primary'
              : 'bg-gray-200 dark:bg-gray-700'}"
          ></div>
        </label>
      </div>
      <div class="flex items-center justify-between p-3">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-gray-400"
            >density_medium</span
          >
          <p class="text-[15px] font-medium dark:text-white">Compact Mode</p>
        </div>
        <label
          class="relative flex h-[28px] w-[48px] cursor-pointer items-center rounded-full border-none bg-gray-200 dark:bg-gray-700 p-0.5 transition-all"
        >
          <input type="checkbox" class="hidden peer" checked />
          <div
            class="h-[24px] w-[24px] rounded-full bg-white shadow-md translate-x-5"
          ></div>
          <div class="absolute inset-0 bg-primary rounded-full -z-10"></div>
        </label>
      </div>
    </div>
  </section>

  <section class="space-y-3">
    <h3
      class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1"
    >
      Localization
    </h3>
    <div
      class="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800"
    >
      <div
        class="flex items-center justify-between p-3 border-b border-gray-50 dark:border-gray-800 active:bg-gray-50 dark:active:bg-gray-800 transition-colors cursor-pointer"
      >
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-gray-400">payments</span>
          <p class="text-[15px] font-medium dark:text-white">Base Currency</p>
        </div>
        <div class="flex items-center gap-1">
          <span class="text-sm text-gray-500">USD ($)</span>
          <span class="material-symbols-outlined text-gray-300 text-[20px]"
            >chevron_right</span
          >
        </div>
      </div>
      <div
        class="flex items-center justify-between p-3 active:bg-gray-50 dark:active:bg-gray-800 transition-colors cursor-pointer"
      >
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-gray-400">language</span>
          <p class="text-[15px] font-medium dark:text-white">Language</p>
        </div>
        <div class="flex items-center gap-1">
          <span class="text-sm text-gray-500">English</span>
          <span class="material-symbols-outlined text-gray-300 text-[20px]"
            >chevron_right</span
          >
        </div>
      </div>
    </div>
  </section>

  <section class="space-y-3">
    <h3
      class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1"
    >
      Integration
    </h3>
    <div
      class="bg-white dark:bg-gray-900 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-800 space-y-4"
    >
      <div class="space-y-2">
        <label
          for="stripe-key"
          class="text-[13px] font-medium text-gray-600 dark:text-gray-400"
          >Stripe API Key</label
        >
        <div class="relative">
          <input
            id="stripe-key"
            class="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/50 transition-all dark:text-white"
            placeholder="Enter API Key"
            type="password"
            value=""
            readonly
          />
          <button
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            <span class="material-symbols-outlined text-[20px]">visibility</span
            >
          </button>
        </div>
      </div>
      <div class="space-y-2">
        <label
          for="paypal-id"
          class="text-[13px] font-medium text-gray-600 dark:text-gray-400"
          >PayPal Client ID</label
        >
        <div class="relative">
          <input
            id="paypal-id"
            class="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/50 transition-all dark:text-white"
            placeholder="Enter Client ID"
            type="text"
            value="AV_PpkW6Y..."
            readonly
          />
        </div>
      </div>
      <button
        class="w-full bg-primary text-white font-semibold py-3 rounded-lg text-sm active:scale-[0.98] transition-transform"
      >
        Verify Connections
      </button>
    </div>
  </section>

  <section class="pt-4">
    <a
      href="/"
      class="w-full flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-semibold py-4 rounded-xl text-sm border border-red-100 dark:border-red-900/30"
    >
      <span class="material-symbols-outlined text-[20px]">logout</span>
      Logout Account
    </a>
    <p class="text-center text-xs text-gray-400 mt-4">
      Version 2.4.1 (Build 890)
    </p>
  </section>
</main>
