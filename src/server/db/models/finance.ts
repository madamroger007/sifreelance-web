// Finance types from Prisma schema
import type { Finance } from '@prisma/client';

export type { Finance };

// Re-export enum
export { FinanceType } from '@prisma/client';

// Finance creation input (without auto-generated fields)
export interface CreateFinanceInput {
    type: 'INCOME' | 'EXPENSE';
    amount: number;
    description?: string;
    date?: Date;
    category?: string;
    userId: string;
    projectId?: string;
}

// Finance update input
export interface UpdateFinanceInput {
    type?: 'INCOME' | 'EXPENSE';
    amount?: number;
    description?: string;
    date?: Date;
    category?: string;
    projectId?: string;
}

// Finance with relations (use Prisma's generated types for full relations)
export type FinanceWithRelations = Finance & {
    user?: User;
    project?: Project | null;
};

// Import Prisma types for relations
import type { User, Project } from '@prisma/client';

// Finance type labels for UI
export const FINANCE_TYPE_LABELS: Record<string, string> = {
    INCOME: 'Income',
    EXPENSE: 'Expense',
};

// Common finance categories
export const FINANCE_CATEGORIES = {
    INCOME: [
        'Project Payment',
        'Milestone Payment',
        'Bonus',
        'Retainer',
        'Consulting',
        'Other Income',
    ],
    EXPENSE: [
        'Software & Tools',
        'Hardware',
        'Marketing',
        'Education',
        'Office Supplies',
        'Travel',
        'Taxes',
        'Other Expense',
    ],
} as const;
