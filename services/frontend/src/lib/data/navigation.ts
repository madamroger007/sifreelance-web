import type { NavItem } from '$lib/types';

export const navItems: NavItem[] = [
    { id: 'home', icon: 'home', label: 'Home', href: '/dashboard' },
    { id: 'projects', icon: 'folder', label: 'Projects', href: '/projects' },
    { id: 'finance', icon: 'account_balance_wallet', label: 'Finance', href: '/finance' },
    { id: 'schedule', icon: 'calendar_month', label: 'Schedule', href: '/schedule' }
];

export const settingsNavItem: NavItem = {
    id: 'settings',
    icon: 'settings',
    label: 'Settings',
    href: '/settings'
};
