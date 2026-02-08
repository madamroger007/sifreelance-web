<script lang="ts">
  import { landingFeatures, landingSteps } from "$lib/data/mock";
</script>

<div
  class="bg-gradient-linear-r-to-l min-h-screen text-text-dark transition-colors duration-500"
>
  <nav class="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
    <div class="flex items-center gap-2">
      <span class="material-symbols-outlined text-primary text-3xl font-bold"
        >psychology</span
      >
      <span class="text-2xl font-black tracking-tight text-primary"
        >SiFreelancer</span
      >
    </div>
    <div
      class="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-400"
    >
      <a href="#features" class="hover:text-primary transition-colors"
        >Features</a
      >
      <a href="#how-it-works" class="hover:text-primary transition-colors"
        >How it Works</a
      >

      <a
        href="/login"
        class="bg-primary text-white px-6 py-2.5 rounded-full shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
        >Sign In</a
      >
    </div>
    <button class="md:hidden text-slate-400">
      <span class="material-symbols-outlined">menu</span>
    </button>
  </nav>

  <!-- Hero Section -->
  <section
    class="px-6 pt-12 pb-20 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center"
  >
    <div class="space-y-8 text-center lg:text-left">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-widest"
      >
        <span class="material-symbols-outlined text-sm animate-pulse"
          >auto_awesome</span
        >
        New: AI Price Suggestion 2.0
      </div>
      <h1
        class="text-5xl lg:text-7xl font-black leading-tight tracking-tight text-white"
      >
        Manage Your Finance & Project Pricing <span
          class="text-primary underline decoration-primary/20">with AI</span
        >
      </h1>
      <p class="text-lg lg:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0">
        Track income, expenses, and let AI analyze fair pricing for every
        project you work on. All-in-one workspace for the modern freelancer.
      </p>
      <div
        class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
      >
        <a
          href="/login"
          class="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl shadow-primary/30 hover:scale-105 transition-all active:scale-95"
        >
          Get Started Free
        </a>
        <button
          class="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg border border-gray-800 hover:bg-white/5 transition-all"
          onclick={() => (window.location.href = "/login")}
        >
          View Dashboard Preview
        </button>
      </div>
      <div class="flex items-center justify-center lg:justify-start gap-6 pt-4">
        <div class="flex -space-x-3">
          {#each [1, 2, 3, 4] as i}
            <img
              src="https://picsum.photos/50/50?random={i + 20}"
              alt="user"
              class="size-10 rounded-full border-4 border-background-dark shadow-sm"
            />
          {/each}
        </div>
        <p class="text-sm font-medium text-gray-400">
          <span class="text-white font-bold">1,200+</span> freelancers joined this
          week
        </p>
      </div>
    </div>
    <div class="relative">
      <div
        class="absolute -inset-4 bg-primary/10 blur-3xl rounded-full -z-10 animate-pulse"
      ></div>
      <div
        class="bg-gray-900 rounded-3xl border-8 border-gray-800 shadow-2xl overflow-hidden transform lg:rotate-2 hover:rotate-0 transition-transform duration-700"
      >
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
          alt="Dashboard Preview"
          class="w-full h-auto opacity-90"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
        ></div>
      </div>
    </div>
  </section>

  <!-- Features Grid -->
  <section id="features" class="px-6 py-24 bg-gradient-linear-to-b">
    <div class="max-w-7xl mx-auto space-y-16">
      <div class="text-center space-y-4">
        <h2 class="text-3xl lg:text-4xl font-black text-white">
          Smart Tools for Solo Success
        </h2>
        <p class="text-text-dark max-w-2xl mx-auto font-medium">
          Everything you need to run your freelance business profitably without
          the headache of spreadsheets.
        </p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {#each landingFeatures as feature}
          <div
            class="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group"
          >
            <div
              class="rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors"
            >
              <span class="material-symbols-outlined text-3xl">
                {feature.icon}
              </span>
            </div>
            <h3 class="text-lg font-bold mb-3 text-white">
              {feature.title}
            </h3>
            <p class="text-gray-400 text-sm leading-relaxed">
              {feature.desc}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- How it Works -->
  <section id="how-it-works" class="px-6 py-24 max-w-7xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-3xl lg:text-4xl font-black text-white">
        Pricing Projects Made Easy
      </h2>
    </div>
    <div class="grid md:grid-cols-4 gap-12 relative">
      <div
        class="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gray-800 -z-10"
      ></div>
      {#each landingSteps as step}
        <div class="text-center space-y-4">
          <div
            class="size-10 bg-gray-900 border-4 border-gray-800 rounded-full flex items-center justify-center font-black text-primary mx-auto shadow-md"
          >
            {step.step}
          </div>
          <h4 class="font-bold text-lg text-white">{step.title}</h4>
          <p class="text-xs text-gray-400 font-medium leading-relaxed px-4">
            {step.desc}
          </p>
        </div>
      {/each}
    </div>
  </section>

  <!-- CTA Section -->
  <section class="px-6 py-24">
    <div
      class="max-w-5xl mx-auto bg-primary rounded-[3rem] p-12 lg:p-20 text-center space-y-8 relative overflow-hidden shadow-3xl shadow-primary/40"
    >
      <div
        class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 size-64 bg-white/10 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 size-64 bg-white/10 rounded-full blur-3xl"
      ></div>

      <h2
        class="text-4xl lg:text-6xl font-black text-white tracking-tight leading-tight"
      >
        Start Managing Your Freelance Business Smarter
      </h2>
      <p class="text-primary-100 text-lg opacity-80 max-w-xl mx-auto">
        Join thousands of freelancers who use SiFreelancer to optimize their
        pricing and track their global earnings.
      </p>
      <div class="pt-4 flex flex-col items-center gap-4">
        <a
          href="/login"
          class="bg-card-dark/60 text-text-dark px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl active:scale-95"
        >
          Create Free Account
        </a>
        <p class="text-white/60 text-sm font-medium">
          No credit card required • Instant access
        </p>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer
    class="px-6 py-12 border-t border-border max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8"
  >
    <div class="space-y-4">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-primary text-2xl font-bold"
          >psychology</span
        >
        <span class="text-xl font-black tracking-tight text-primary"
          >SiFreelancer</span
        >
      </div>
      <p class="text-sm text-text-dark">
        The definitive workspace for modern independent creators.
      </p>
    </div>
    <div
      class="flex flex-wrap justify-center gap-8 text-sm font-semibold text-text-dark"
    >
      <a href="#features" class="hover:text-primary transition-colors"
        >Features</a
      >
      <span class="hover:text-primary transition-colors cursor-pointer"
        >Pricing</span
      >
      <span class="hover:text-primary transition-colors cursor-pointer"
        >Documentation</span
      >
      <span class="hover:text-primary transition-colors cursor-pointer"
        >Privacy</span
      >
    </div>
    <p class="text-xs text-text-dark text-center">
      © 2026 SiFreelancer. All rights reserved.
    </p>
  </footer>
</div>