import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Ticket } from '@/types';
import { ArrowLeft, Save, Ticket as TicketIcon } from 'lucide-react';

interface Props {
    ticket: Ticket;
    [key: string]: unknown;
}

type TicketFormData = {
    customer_id: string;
    customer_name: string;
    customer_address: string;
    problem_description: string;
    priority: 'Low' | 'Medium' | 'High' | 'Urgent';
    category: 'Broadband' | 'Dedicated' | 'Reseller';
    status: 'New' | 'In Progress' | 'Pending' | 'Cancel' | 'Solved' | 'Investigation';
}

export default function EditTicket({ ticket }: Props) {
    const { data, setData, patch, processing, errors } = useForm<TicketFormData>({
        customer_id: ticket.customer_id,
        customer_name: ticket.customer_name,
        customer_address: ticket.customer_address,
        problem_description: ticket.problem_description,
        priority: ticket.priority,
        category: ticket.category,
        status: ticket.status,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/tickets/${ticket.id}`);
    };

    return (
        <AppShell>
            <Head title={`Edit Ticket #${ticket.id}`} />
            
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm" onClick={() => window.history.back()}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Ticket #{ticket.id}</h1>
                        <p className="text-gray-600">Update ticket information</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <TicketIcon className="h-5 w-5 mr-2 text-blue-600" />
                            Ticket Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="customer_id">Customer ID *</Label>
                                    <Input
                                        id="customer_id"
                                        value={data.customer_id}
                                        onChange={(e) => setData('customer_id', e.target.value)}
                                        placeholder="e.g., CUST-12345"
                                        className={errors.customer_id ? 'border-red-500' : ''}
                                    />
                                    {errors.customer_id && (
                                        <p className="text-sm text-red-600">{errors.customer_id}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="customer_name">Customer Name *</Label>
                                    <Input
                                        id="customer_name"
                                        value={data.customer_name}
                                        onChange={(e) => setData('customer_name', e.target.value)}
                                        placeholder="Full customer name"
                                        className={errors.customer_name ? 'border-red-500' : ''}
                                    />
                                    {errors.customer_name && (
                                        <p className="text-sm text-red-600">{errors.customer_name}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="customer_address">Customer Address *</Label>
                                <Textarea
                                    id="customer_address"
                                    value={data.customer_address}
                                    onChange={(e) => setData('customer_address', e.target.value)}
                                    placeholder="Complete customer address"
                                    rows={3}
                                    className={errors.customer_address ? 'border-red-500' : ''}
                                />
                                {errors.customer_address && (
                                    <p className="text-sm text-red-600">{errors.customer_address}</p>
                                )}
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label>Priority *</Label>
                                    <Select 
                                        value={data.priority} 
                                        onValueChange={(value: TicketFormData['priority']) => setData('priority', value)}
                                    >
                                        <SelectTrigger className={errors.priority ? 'border-red-500' : ''}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Low">🟢 Low</SelectItem>
                                            <SelectItem value="Medium">🟡 Medium</SelectItem>
                                            <SelectItem value="High">🟠 High</SelectItem>
                                            <SelectItem value="Urgent">🔴 Urgent</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.priority && (
                                        <p className="text-sm text-red-600">{errors.priority}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Category *</Label>
                                    <Select 
                                        value={data.category} 
                                        onValueChange={(value: TicketFormData['category']) => setData('category', value)}
                                    >
                                        <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Broadband">📡 Broadband</SelectItem>
                                            <SelectItem value="Dedicated">🔗 Dedicated</SelectItem>
                                            <SelectItem value="Reseller">🏢 Reseller</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.category && (
                                        <p className="text-sm text-red-600">{errors.category}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Status *</Label>
                                    <Select 
                                        value={data.status} 
                                        onValueChange={(value: TicketFormData['status']) => setData('status', value)}
                                    >
                                        <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
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
                                    {errors.status && (
                                        <p className="text-sm text-red-600">{errors.status}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="problem_description">Problem Description *</Label>
                                <Textarea
                                    id="problem_description"
                                    value={data.problem_description}
                                    onChange={(e) => setData('problem_description', e.target.value)}
                                    placeholder="Detailed description of the customer's issue or problem..."
                                    rows={6}
                                    className={errors.problem_description ? 'border-red-500' : ''}
                                />
                                {errors.problem_description && (
                                    <p className="text-sm text-red-600">{errors.problem_description}</p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-3">
                                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4 mr-2" />
                                            Update Ticket
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}