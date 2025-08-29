import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    role_id?: number;
    role?: Role;
    assigned_tickets_count?: number;
    resolved_tickets_count?: number;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Role {
    id: number;
    name: string;
    description?: string;
}

export interface Ticket {
    id: number;
    customer_id: string;
    customer_name: string;
    customer_address: string;
    problem_description: string;
    priority: 'Low' | 'Medium' | 'High' | 'Urgent';
    category: 'Broadband' | 'Dedicated' | 'Reseller';
    status: 'New' | 'In Progress' | 'Pending' | 'Cancel' | 'Solved' | 'Investigation';
    created_by: number;
    resolved_at?: string;
    created_at: string;
    updated_at: string;
    creator?: User;
    assignees?: User[];
    assignments?: TicketAssignment[];
}

export interface TicketAssignment {
    id: number;
    ticket_id: number;
    user_id: number;
    assigned_by: number;
    assigned_at: string;
    user?: User;
    assigned_by_user?: User;
}

export interface TicketStats {
    total: number;
    new: number;
    in_progress: number;
    resolved: number;
    urgent: number;
}

export interface ReportData {
    userPerformance: User[];
    avgResolutionTime: number;
    complaintTypes: Array<{ category: string; count: number }>;
    frequentCustomers: Array<{ customer_id: string; customer_name: string; ticket_count: number }>;
    monthlyTrends: Array<{ month: string; total_tickets: number; resolved_tickets: number }>;
    statusDistribution: Array<{ status: string; count: number }>;
    priorityDistribution: Array<{ priority: string; count: number }>;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url?: string;
        label: string;
        active: boolean;
    }>;
}
