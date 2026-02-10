import { writable } from 'svelte/store';
import type { User } from '$lib/types';

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

function createAuthStore() {
    const { subscribe, set, update } = writable<AuthState>({
        isAuthenticated: false,
        user: null
    });

    return {
        subscribe,
        login: (user: User) => {
            set({ isAuthenticated: true, user });
        },
        logout: () => {
            set({ isAuthenticated: false, user: null });
        }
    };
}

export const auth = createAuthStore();

// Mock user for demo purposes
export const mockUser: User = {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@sifreelancer.com',
    avatar: 'https://picsum.photos/100/100?random=12'
};
