import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createThemeStore() {
    const initialValue = browser ? localStorage.getItem('theme') === 'dark' : false;
    const { subscribe, set, update } = writable<boolean>(initialValue);

    return {
        subscribe,
        toggle: () =>
            update((isDark) => {
                const newValue = !isDark;
                if (browser) {
                    localStorage.setItem('theme', newValue ? 'dark' : 'light');
                    if (newValue) {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }
                }
                return newValue;
            }),
        set: (value: boolean) => {
            if (browser) {
                localStorage.setItem('theme', value ? 'dark' : 'light');
                if (value) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
            set(value);
        }
    };
}

export const isDarkMode = createThemeStore();
