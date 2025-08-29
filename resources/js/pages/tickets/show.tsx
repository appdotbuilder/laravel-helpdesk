import React from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Ticket, User } from '@/types';
import { 
    ArrowLeft, 
    Edit, 
    UserPlus, 
    Users, 
    Clock, 
    Calendar,
    MapPin,
    User as UserIcon,
    Trash2,
    CheckCircle
} from 'lucide-react';

interface Props {
    ticket: Ticket;
    users: User[];
    [key: string]: unknown;
}

export default function ShowTicket({ ticket, users }: Props) {
    const { data, setData, post, processing } = useForm({
        user_ids: [] as number[],
        status: ticket.status,
    });

    const handleAssignment = (e: React.FormEvent) => {
        e.preventDefault();
        if (data.user_ids.length > 0) {
            post(`/tickets/${ticket.id}/assignments`, {
                onSuccess: () => setData('user_ids', []),
            });
        }
    };

    const handleStatusUpdate = (status: string) => {
        router.patch(`/tickets/${ticket.id}`, { status }, {
            preserveState: true,
        });
    };

    const handleUnassign = (userId: number) => {
        router.delete(`/tickets/${ticket.id}/assignments/${userId}`, {
            preserveState: true,
        });
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Urgent': return 'bg-red-100 text-red-800 border-red-300';
            case 'High': return 'bg-orange-100 text-orange-800 border-orange-300';
            case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'Low': return 'bg-green-100 text-green-800 border-green-300';
            default: return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'New': return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'In Progress': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'Pending': return 'bg-orange-100 text-orange-800 border-orange-300';
            case 'Solved': return 'bg-green-100 text-green-800 border-green-300';
            case 'Cancel': return 'bg-red-100 text-red-800 border-red-300';
            case 'Investigation': return 'bg-purple-100 text-purple-800 border-purple-300';
            default: return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const availableUsers = users.filter(user => 
        !ticket.assignees?.some(assignee => assignee.id === user.id)
    );

    return (
        <AppShell>
            <Head title={`Ticket #${ticket.id} - ${ticket.customer_name}`} />
            
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                        <Button variant="outline" size="sm" onClick={() => window.history.back()}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Ticket #{ticket.id}
                            </h1>
                            <p className="text-gray-600">{ticket.customer_name}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                        </Badge>
                        <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status}
                        </Badge>
                        <Button variant="outline" size="sm" asChild>
                            <a href={`/tickets/${ticket.id}/edit`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </a>
                        </Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Problem Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Problem Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                    {ticket.problem_description}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Customer Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <UserIcon className="h-5 w-5 mr-2" />
                                    Customer Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Customer ID</label>
                                        <p className="text-gray-900 font-mono">{ticket.customer_id}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Name</label>
                                        <p className="text-gray-900">{ticket.customer_name}</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500 flex items-center">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        Address
                                    </label>
                                    <p className="text-gray-900 whitespace-pre-wrap">{ticket.customer_address}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Category</label>
                                    <p className="text-gray-900">{ticket.category}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Status Management */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 mb-2 block">
                                        Update Status
                                    </label>
                                    <Select value={ticket.status} onValueChange={handleStatusUpdate}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="New">🆕 New</SelectItem>
                                            <SelectItem value="In Progress">⚡ In Progress</SelectItem>
                                            <SelectItem value="Pending">⏸️ Pending</SelectItem>
                                            <SelectItem value="Investigation">🔍 Investigation</SelectItem>
                                            <SelectItem value="Solved">✅ Solved</SelectItem>
                                            <SelectItem value="Cancel">❌ Cancel</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {ticket.status === 'Solved' && (
                                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                        <div className="flex items-center text-green-800">
                                            <CheckCircle className="h-5 w-5 mr-2" />
                                            <span className="font-medium">Resolved</span>
                                        </div>
                                        {ticket.resolved_at && (
                                            <p className="text-sm text-green-600 mt-1">
                                                {new Date(ticket.resolved_at).toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Assignment Management */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Users className="h-5 w-5 mr-2" />
                                    Assignments
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Current Assignments */}
                                {ticket.assignees && ticket.assignees.length > 0 ? (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500">
                                            Currently Assigned
                                        </label>
                                        {ticket.assignees.map((assignee) => (
                                            <div key={assignee.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                                <div>
                                                    <p className="text-sm font-medium">{assignee.name}</p>
                                                    <p className="text-xs text-gray-500">{assignee.role?.name}</p>
                                                </div>
                                                <Button 
                                                    size="sm" 
                                                    variant="outline"
                                                    onClick={() => handleUnassign(assignee.id)}
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">No users assigned</p>
                                )}

                                {/* Add Assignment */}
                                {availableUsers.length > 0 && (
                                    <form onSubmit={handleAssignment} className="space-y-3">
                                        <label className="text-sm font-medium text-gray-500">
                                            Assign to Users
                                        </label>
                                        <Select 
                                            value={data.user_ids.join(',')} 
                                            onValueChange={(value) => setData('user_ids', value ? [parseInt(value)] : [])}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select user..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {availableUsers.map((user) => (
                                                    <SelectItem key={user.id} value={user.id.toString()}>
                                                        {user.name} ({user.role?.name})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Button 
                                            type="submit" 
                                            size="sm" 
                                            disabled={processing || data.user_ids.length === 0}
                                            className="w-full"
                                        >
                                            <UserPlus className="h-4 w-4 mr-2" />
                                            Assign
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>

                        {/* Ticket Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Clock className="h-5 w-5 mr-2" />
                                    Ticket Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Created by</label>
                                    <p className="text-sm">{ticket.creator?.name}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Created at</label>
                                    <p className="text-sm flex items-center">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        {new Date(ticket.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Last updated</label>
                                    <p className="text-sm">{new Date(ticket.updated_at).toLocaleString()}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}