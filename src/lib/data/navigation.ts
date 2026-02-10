import type { NavItem } from '$lib/types';

export const navItems: NavItem[] = [
    { id: 'home', icon: 'home', label: 'Home', href: '/dashboard' },
    { id: 'projects', icon: 'folder', label: 'Projects', href: '/dashboard/projects' },
    { id: 'finance', icon: 'account_balance_wallet', label: 'Finance', href: '/dashboard/finance' },
    { id: 'schedule', icon: 'calendar_month', label: 'Schedule', href: '/dashboard/schedule' }
];

export const settingsNavItem: NavItem = {
    id: 'settings',
    icon: 'settings',
    label: 'Settings',
    href: '/dashboard/settings'
};
