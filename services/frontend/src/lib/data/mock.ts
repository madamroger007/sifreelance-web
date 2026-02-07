import type { Project, Transaction, ScheduleEvent } from '$lib/types';

export const projects = [
    {
        name: 'Aurora Design System',
        client: 'Aurora Inc.',
        type: 'Fixed',
        scope: '12 Components',
        price: '$4,200',
        status: 'In Progress'
    },
    {
        name: 'E-comm Dashboard',
        client: 'RetailFlow',
        type: 'Hourly',
        scope: '80 Hours',
        price: '$85/hr',
        status: 'Review'
    },
    {
        name: 'Mobile App Revamp',
        client: 'WealthWise',
        type: 'Fixed',
        scope: '5 Screens',
        price: '$2,800',
        status: 'Completed'
    },
    {
        name: 'Brand Identity',
        client: 'Nebula Co.',
        type: 'Fixed',
        scope: 'Full Suite',
        price: '$5,500',
        status: 'In Progress'
    }
];

export const transactions: Transaction[] = [
    {
        id: '1',
        name: 'Project: Aurora Landing',
        description: 'Milestone Payment #1',
        amount: '+$2,450.00',
        date: 'May 12, 2024',
        type: 'income',
        icon: 'payments',
        category: 'Project Payment'
    },
    {
        id: '2',
        name: 'Project: Aurora Landing',
        description: 'Milestone Payment #2',
        amount: '+$2,450.00',
        date: 'May 15, 2024',
        type: 'income',
        icon: 'payments',
        category: 'Project Payment'
    },
    {
        id: '3',
        name: 'Project: Aurora Landing',
        description: 'Final Payment',
        amount: '+$2,450.00',
        date: 'May 20, 2024',
        type: 'income',
        icon: 'payments',
        category: 'Project Payment'
    }
];

export const scheduleEvents: ScheduleEvent[] = [
    {
        id: '1',
        time: '09:30',
        title: 'Aurora UI Review',
        description: 'Design System Deliverable',
        type: 'Meeting',
        date: '2024-05-12'
    },
    {
        id: '2',
        time: '14:00',
        title: 'Client Sync Call',
        description: 'Weekly Progress Update',
        type: 'Meeting',
        date: '2024-05-12'
    }
];

export const landingFeatures = [
    {
        icon: 'account_balance_wallet',
        title: 'Smart Finance Tracking',
        desc: 'Monitor income, expenses, and profit in a clear dashboard.'
    },
    {
        icon: 'psychology',
        title: 'AI Price Analysis',
        desc: 'Describe your project and let AI suggest a fair price instantly.'
    },
    {
        icon: 'folder_open',
        title: 'Project Management',
        desc: 'Organize projects, clients, and pricing in one workspace.'
    },
    {
        icon: 'event_available',
        title: 'Stay Productive',
        desc: 'Plan your work and deadlines with a built-in schedule.'
    }
];

export const landingSteps = [
    { step: '1', title: 'Create Project', desc: 'Set up your project details and client information.' },
    { step: '2', title: 'Describe Scope', desc: 'Detail the deliverables and expected complexity.' },
    {
        step: '3',
        title: 'AI Suggests Price',
        desc: 'Get a data-backed price range based on current market.'
    },
    { step: '4', title: 'Track Success', desc: 'Monitor payments and project progress in real-time.' }
];
