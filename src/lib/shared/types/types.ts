export interface Project {
    budget: number | null;
    price: number | null;
    currency: string;
    clientName: string | null;
    clientEmail: string | null;
    status: string;
    description: string | null;
    complexity: string;
    deadline: string;
    id: string;
    title: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}