<div
  class="flex flex-col min-h-full bg-background-light dark:bg-background-dark"
>
  <header
    class="sticky top-0 z-40 bg-white/80 dark:bg-background-dark/80 backdrop-blur-lg border-b border-slate-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between"
  >
    <div class="flex items-center gap-4">
      <a
        href="/schedule"
        class="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </a>
      <h1 class="text-xl font-bold tracking-tight dark:text-white">
        Event Details
      </h1>
    </div>
    <a
      href="/schedule"
      class="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 transition-all active:scale-95"
    >
      Save Event
    </a>
  </header>

  <main
    class="p-6 max-w-2xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-top-4 duration-500"
  >
    <div
      class="bg-white dark:bg-gray-900 p-8 rounded-[3rem] shadow-xl border border-slate-100 dark:border-gray-800 space-y-8"
    >
      <div class="text-center space-y-2">
        <div
          class="size-20 rounded-[2rem] bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-primary mx-auto mb-4"
        >
          <span class="material-symbols-outlined text-4xl">calendar_add_on</span
          >
        </div>
        <h2 class="text-2xl font-black dark:text-white">Schedule New Task</h2>
      </div>

      <div class="space-y-6">
        <div class="space-y-2">
          <label
            for="event-title"
            class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
            >Event Title</label
          >
          <input
            id="event-title"
            type="text"
            placeholder="e.g. Client Kickoff Meeting"
            class="w-full px-5 py-4 rounded-2xl border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-950 dark:text-white text-lg font-bold focus:ring-primary"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label
              for="event-type"
              class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
              >Event Type</label
            >
            <select
              id="event-type"
              class="w-full px-5 py-4 rounded-2xl border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary"
            >
              <option>Meeting</option>
              <option>Project Deadline</option>
              <option>Invoice Due</option>
              <option>Personal Work</option>
            </select>
          </div>
          <div class="space-y-2">
            <label
              for="event-date"
              class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
              >Date</label
            >
            <input
              id="event-date"
              type="date"
              class="w-full px-5 py-4 rounded-2xl border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-6">
          <div class="space-y-2">
            <label
              for="start-time"
              class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
              >Start Time</label
            >
            <input
              id="start-time"
              type="time"
              class="w-full px-5 py-4 rounded-2xl border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label
              for="end-time"
              class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
              >End Time</label
            >
            <input
              id="end-time"
              type="time"
              class="w-full px-5 py-4 rounded-2xl border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label
            for="event-notes"
            class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
            >Notes</label
          >
          <textarea
            id="event-notes"
            placeholder="Add meeting links, agenda, etc..."
            rows="4"
            class="w-full px-5 py-4 rounded-2xl border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-950 dark:text-white focus:ring-primary"
          ></textarea>
        </div>
      </div>

      <div class="pt-4 flex gap-4">
        <a
          href="/schedule"
          class="flex-1 py-4 bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300 rounded-2xl font-black active:scale-95 transition-all text-center"
          >Cancel</a
        >
        <a
          href="/schedule"
          class="flex-[2] py-4 bg-primary text-white rounded-2xl font-black shadow-2xl shadow-primary/30 active:scale-95 transition-all text-center"
          >Create Event</a
        >
      </div>
    </div>
  </main>
</div>
