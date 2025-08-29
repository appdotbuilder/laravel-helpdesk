import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Ticket, TicketStats, PaginatedData, User } from '@/types';
import { 
    AlertCircle, 
    Plus, 
    Filter,
    Users,
    BarChart3,
    CheckCircle2,
    Eye
} from 'lucide-react';

interface Props {
    tickets: PaginatedData<Ticket>;
    stats: TicketStats;
    filters: {
        status?: string;
        priority?: string;
        category?: string;
        my_tickets?: boolean;
    };
    [key: string]: unknown;
}

export default function TicketsIndex({ tickets, stats, filters }: Props) {
    const { auth } = usePage<{ auth: { user: User } }>().props;
    const userRole = auth.user.role?.name;

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Urgent': return 'bg-red-100 text-red-800';
            case 'High': return 'bg-orange-100 text-orange-800';
            case 'Medium': return 'bg-yellow-100 text-yellow-800';
            case 'Low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'New': return 'bg-blue-100 text-blue-800';
            case 'In Progress': return 'bg-yellow-100 text-yellow-800';
            case 'Pending': return 'bg-orange-100 text-orange-800';
            case 'Solved': return 'bg-green-100 text-green-800';
            case 'Cancel': return 'bg-red-100 text-red-800';
            case 'Investigation': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleFilterChange = (key: string, value: string) => {
        router.get('/', { ...filters, [key]: value || undefined }, { preserveState: true });
    };

    const toggleMyTickets = () => {
        router.get('/', { ...filters, my_tickets: !filters.my_tickets }, { preserveState: true });
    };

    return (
        <AppShell>
            <Head title="Helpdesk - Ticket Management" />
            
            <div className="space-y-6">
                {/* Header with Stats */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🎧 Helpdesk System</h1>
                        <p className="text-gray-600">Manage customer support tickets efficiently</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/reports">
                            <Button variant="outline">
                                <BarChart3 className="mr-2 h-4 w-4" />
                                Reports
                            </Button>
                        </Link>
                        {(userRole === 'CS' || userRole === 'NOC') && (
                            <Link href="/tickets/create">
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    New Ticket
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Total Tickets</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">New</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-2xl font-bold text-orange-600">{stats.new}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">In Progress</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-2xl font-bold text-yellow-600">{stats.in_progress}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Resolved</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Urgent</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-2xl font-bold text-red-600">{stats.urgent}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="flex items-center space-x-2">
                                <Filter className="h-4 w-4 text-gray-500" />
                                <span className="text-sm font-medium">Filters:</span>
                            </div>
                            
                            <Select value={filters.status || ''} onValueChange={(value) => handleFilterChange('status', value)}>
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Status</SelectItem>
                                    <SelectItem value="New">New</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Solved">Solved</SelectItem>
                                    <SelectItem value="Investigation">Investigation</SelectItem>
                                    <SelectItem value="Cancel">Cancel</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={filters.priority || ''} onValueChange={(value) => handleFilterChange('priority', value)}>
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Priority</SelectItem>
                                    <SelectItem value="Urgent">Urgent</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="Low">Low</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={filters.category || ''} onValueChange={(value) => handleFilterChange('category', value)}>
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Categories</SelectItem>
                                    <SelectItem value="Broadband">Broadband</SelectItem>
                                    <SelectItem value="Dedicated">Dedicated</SelectItem>
                                    <SelectItem value="Reseller">Reseller</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button 
                                variant={filters.my_tickets ? "default" : "outline"} 
                                size="sm"
                                onClick={toggleMyTickets}
                            >
                                <Users className="mr-2 h-4 w-4" />
                                My Tickets
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Tickets List */}
                <div className="space-y-4">
                    {tickets.data.length === 0 ? (
                        <Card>
                            <CardContent className="p-8 text-center">
                                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
                                <p className="text-gray-600 mb-4">
                                    {filters.my_tickets 
                                        ? "You don't have any tickets assigned yet." 
                                        : "No tickets match your current filters."
                                    }
                                </p>
                                {(userRole === 'CS' || userRole === 'NOC') && !filters.my_tickets && (
                                    <Link href="/tickets/create">
                                        <Button>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Create First Ticket
                                        </Button>
                                    </Link>
                                )}
                            </CardContent>
                        </Card>
                    ) : (
                        tickets.data.map((ticket) => (
                            <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900 truncate">
                                                    #{ticket.id} - {ticket.customer_name}
                                                </h3>
                                                <Badge className={getPriorityColor(ticket.priority)}>
                                                    {ticket.priority}
                                                </Badge>
                                                <Badge className={getStatusColor(ticket.status)}>
                                                    {ticket.status}
                                                </Badge>
                                            </div>
                                            
                                            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                                                <div>
                                                    <strong>Customer ID:</strong> {ticket.customer_id}
                                                </div>
                                                <div>
                                                    <strong>Category:</strong> {ticket.category}
                                                </div>
                                                <div>
                                                    <strong>Created by:</strong> {ticket.creator?.name}
                                                </div>
                                                <div>
                                                    <strong>Created:</strong> {new Date(ticket.created_at).toLocaleDateString()}
                                                </div>
                                            </div>

                                            <p className="text-gray-700 mb-3 line-clamp-2">
                                                {ticket.problem_description}
                                            </p>

                                            {ticket.assignees && ticket.assignees.length > 0 && (
                                                <div className="flex items-center space-x-2 mb-3">
                                                    <Users className="h-4 w-4 text-gray-500" />
                                                    <span className="text-sm text-gray-600">Assigned to:</span>
                                                    <div className="flex flex-wrap gap-1">
                                                        {ticket.assignees.map((assignee) => (
                                                            <Badge key={assignee.id} variant="secondary" className="text-xs">
                                                                {assignee.name} ({assignee.role?.name})
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col space-y-2 ml-4">
                                            <Link href={`/tickets/${ticket.id}`}>
                                                <Button size="sm">
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View
                                                </Button>
                                            </Link>
                                            
                                            {ticket.status === 'Solved' && (
                                                <div className="flex items-center text-green-600 text-xs">
                                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                                    Resolved
                                                    {ticket.resolved_at && (
                                                        <div className="ml-1">
                                                            {new Date(ticket.resolved_at).toLocaleDateString()}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {tickets.links && tickets.links.length > 3 && (
                    <div className="flex justify-center space-x-2">
                        {tickets.links.map((link, index) => (
                            <Button
                                key={index}
                                variant={link.active ? "default" : "outline"}
                                size="sm"
                                disabled={!link.url}
                                onClick={() => link.url && router.visit(link.url)}
                            >
                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}