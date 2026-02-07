export type Tab =
    | 'landing'
    | 'login'
    | 'register'
    | 'forgot-password'
    | 'home'
    | 'projects'
    | 'project-detail'
    | 'finance'
    | 'finance-detail'
    | 'schedule'
    | 'schedule-detail'
    | 'settings';

export interface Project {
    id: string;
    name: string;
    client: string;
    category: string;
    status: 'In Progress' | 'Completed' | 'Review';
    progress: number;
    deadline: string;
    budget: string;
    team: string[];
}

export interface Transaction {
    id: string;
    name: string;
    description: string;
    amount: string;
    date: string;
    type: 'income' | 'expense';
    icon: string;
    category: string;
}

export interface ScheduleEvent {
    id: string;
    time: string;
    title: string;
    description: string;
    type: 'Meeting' | 'Invoice Due' | 'Deadline';
    date: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

export interface NavItem {
    id: string;
    icon: string;
    label: string;
    href: string;
}
