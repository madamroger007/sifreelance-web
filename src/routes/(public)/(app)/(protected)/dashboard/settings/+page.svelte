<script lang="ts">
  import { isDarkMode } from "$lib/frontend/stores";
  import Buttonlogout from "$lib/frontend/components/button/logout.svelte";
</script>

<main class="flex-1 overflow-y-auto px-4 py-6 space-y-6">
  <section class="space-y-3">
    <h3
      class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1"
    >
      Appearance
    </h3>
    <div
      class="bg-card dark:bg-card-dark rounded-xl overflow-hidden shadow-sm border border-border dark:border-border-dark"
    >
      <div class="card-component-container-1">
        <div class="flex items-center gap-3">
          <span
            class="material-symbols-outlined text-text-foreground dark:text-text-foreground-dark"
            >dark_mode</span
          >
          <p
            class="text-[15px] font-medium text-text-foreground dark:text-text-foreground-dark"
          >
            Dark Mode
          </p>
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
      <div class="card-component-container-1">
        <div class="flex items-center gap-3">
          <span
            class="material-symbols-outlined text-text-foreground dark:text-text-foreground-dark"
            >density_medium</span
          >
          <p
            class="text-[15px] font-medium text-text-foreground dark:text-text-foreground-dark"
          >
            Compact Mode
          </p>
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
      Financial & Language
    </h3>
    <div
      class="bg-card dark:bg-card-dark rounded-xl overflow-hidden shadow-sm border border-border dark:border-border-dark"
    >
      <div
        class="flex items-center justify-between p-3 border-b border-border dark:border-border-dark active:bg-gray-50 dark:active:bg-gray-800 transition-colors cursor-pointer"
      >
        <div class="flex items-center gap-3">
          <span
            class="material-symbols-outlined text-text-foreground dark:text-text-foreground-dark"
            >payments</span
          >
          <p
            class="text-[15px] font-medium text-text-foreground dark:text-text-foreground-dark"
          >
            Base Currency
          </p>
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
          <span
            class="material-symbols-outlined text-text-foreground dark:text-text-foreground-dark"
            >language</span
          >
          <p
            class="text-[15px] font-medium text-text-foreground dark:text-text-foreground-dark"
          >
            Language
          </p>
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
      Model Integration
    </h3>
    <div
      class="bg-card dark:bg-card-dark rounded-xl p-3 shadow-sm border border-border dark:border-border-dark space-y-4"
    >
      <div class="space-y-2">
        <label
          for="api-key"
          class="text-[13px] font-medium text-text-foreground dark:text-text-foreground-dark"
          >Model API Key</label
        >
        <div class="relative">
          <input
            id="api-key"
            class="text-input-primary"
            placeholder="Enter API Key"
            type="password"
            value=""
          />
          <button
            class="absolute right-3 top-1/2 -translate-y-1/2 text-text-foreground dark:text-text-foreground-dark"
          >
            <span class="material-symbols-outlined text-[20px]">visibility</span
            >
          </button>
        </div>
      </div>
      <div class="space-y-2">
        <label
          for="url-endpoint"
          class="text-[13px] font-medium text-text-foreground dark:text-text-foreground-dark"
          >Url Endpoint</label
        >
        <div class="relative">
          <input
            id="url-endpoint"
            class="text-input-primary"
            placeholder="Enter URL Endpoint Address"
            type="text"
            value=""
          />
        </div>
      </div>
      <button class="btn-primary"> Verify Connections </button>
    </div>
  </section>

  <section class="pt-4">
    <div class="btn-danger">
      <Buttonlogout
        customClass={"w-full gap-1 flex justify-center items-center rounded-xl text-white hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors cursor-pointer"}
      />
    </div>
    <p class="text-center text-xs text-gray-400 mt-4">
      Version 2.4.1 (Build 890)
    </p>
  </section>
</main>
