import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

function getSystemTheme(): boolean {
	return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(isDark: boolean) {
	if (!browser) return;
	const root = document.documentElement;
	root.classList.toggle('dark', isDark);
	localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function createThemeStore() {
	let mediaQuery: MediaQueryList | null = null;

	const initialValue = browser
		? localStorage.getItem('theme')
			? localStorage.getItem('theme') === 'dark'
			: getSystemTheme()
		: false;

	const { subscribe, set } = writable<boolean>(initialValue);

	function init() {
		if (!browser) return;
		applyTheme(initialValue);
		mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		const handler = (e: MediaQueryListEvent) => {
			if (!localStorage.getItem('theme')) {
				set(e.matches);
				applyTheme(e.matches);
			}
		};

		mediaQuery.addEventListener('change', handler);
	}

	return {
		subscribe,
		init,
		set(value: boolean) {
			applyTheme(value);
			set(value);
		}
	};
}

export const isDarkMode = createThemeStore();
