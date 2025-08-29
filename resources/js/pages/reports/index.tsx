import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ReportData } from '@/types';
import { 
    BarChart3, 
    Users, 
    Clock, 
    AlertTriangle,
    FileSpreadsheet,
    Calendar
} from 'lucide-react';

interface Props {
    userPerformance: ReportData['userPerformance'];
    avgResolutionTime: ReportData['avgResolutionTime'];
    complaintTypes: ReportData['complaintTypes'];
    frequentCustomers: ReportData['frequentCustomers'];
    monthlyTrends: ReportData['monthlyTrends'];
    statusDistribution: ReportData['statusDistribution'];
    [key: string]: unknown;
}

export default function ReportsIndex({ 
    userPerformance, 
    avgResolutionTime, 
    complaintTypes, 
    frequentCustomers,
    monthlyTrends,
    statusDistribution
}: Props) {
    const handleExport = () => {
        window.open('/reports/export', '_blank');
    };

    const formatMonth = (monthString: string) => {
        return new Date(monthString).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short' 
        });
    };

    return (
        <AppShell>
            <Head title="Reports & Analytics" />
            
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📊 Reports & Analytics</h1>
                        <p className="text-gray-600">Performance insights and data export</p>
                    </div>
                    
                    <div className="flex space-x-3">
                        <Button onClick={handleExport} className="bg-green-600 hover:bg-green-700">
                            <FileSpreadsheet className="mr-2 h-4 w-4" />
                            Export to Excel
                        </Button>
                        <Link href="/">
                            <Button variant="outline">
                                <BarChart3 className="mr-2 h-4 w-4" />
                                View Tickets
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid md:grid-cols-4 gap-6">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-600 text-sm font-medium">Avg Resolution Time</p>
                                    <p className="text-2xl font-bold text-blue-900">
                                        {avgResolutionTime}h
                                    </p>
                                </div>
                                <Clock className="h-8 w-8 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-600 text-sm font-medium">Active Users</p>
                                    <p className="text-2xl font-bold text-green-900">
                                        {userPerformance?.length || 0}
                                    </p>
                                </div>
                                <Users className="h-8 w-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-600 text-sm font-medium">Top Category</p>
                                    <p className="text-xl font-bold text-purple-900">
                                        {complaintTypes?.[0]?.category || 'N/A'}
                                    </p>
                                </div>
                                <BarChart3 className="h-8 w-8 text-purple-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-orange-600 text-sm font-medium">Frequent Issues</p>
                                    <p className="text-2xl font-bold text-orange-900">
                                        {frequentCustomers?.length || 0}
                                    </p>
                                </div>
                                <AlertTriangle className="h-8 w-8 text-orange-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* User Performance */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Users className="h-5 w-5 mr-2" />
                                User Performance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {userPerformance && userPerformance.length > 0 ? (
                                <div className="space-y-4">
                                    {userPerformance.slice(0, 10).map((user, index) => (
                                        <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-bold">
                                                    #{index + 1}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{user.name}</p>
                                                    <p className="text-sm text-gray-600">{user.role?.name}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-blue-600">
                                                    {user.assigned_tickets_count} tickets
                                                </p>
                                                <p className="text-sm text-green-600">
                                                    {user.resolved_tickets_count} resolved
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">No performance data available</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Complaint Types */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <BarChart3 className="h-5 w-5 mr-2" />
                                Complaint Categories
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {complaintTypes && complaintTypes.length > 0 ? (
                                <div className="space-y-4">
                                    {complaintTypes.map((type, index) => {
                                        const total = complaintTypes.reduce((sum, t) => sum + t.count, 0);
                                        const percentage = total > 0 ? Math.round((type.count / total) * 100) : 0;
                                        
                                        return (
                                            <div key={type.category} className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="font-medium">{type.category}</span>
                                                        <Badge variant="secondary">{type.count} tickets</Badge>
                                                    </div>
                                                    <span className="text-sm text-gray-600">{percentage}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div 
                                                        className={`h-2 rounded-full ${
                                                            index === 0 ? 'bg-blue-600' : 
                                                            index === 1 ? 'bg-green-600' : 'bg-purple-600'
                                                        }`}
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">No complaint data available</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Status Distribution */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Status Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {statusDistribution && statusDistribution.length > 0 ? (
                                <div className="space-y-3">
                                    {statusDistribution.map((status) => {
                                        const total = statusDistribution.reduce((sum, s) => sum + s.count, 0);
                                        const percentage = total > 0 ? Math.round((status.count / total) * 100) : 0;
                                        
                                        const getStatusColor = (statusName: string) => {
                                            switch (statusName) {
                                                case 'New': return 'bg-blue-600';
                                                case 'In Progress': return 'bg-yellow-600';
                                                case 'Solved': return 'bg-green-600';
                                                case 'Pending': return 'bg-orange-600';
                                                default: return 'bg-gray-600';
                                            }
                                        };

                                        return (
                                            <div key={status.status} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-3 h-3 rounded-full ${getStatusColor(status.status)}`} />
                                                    <span className="font-medium">{status.status}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm text-gray-600">{status.count}</span>
                                                    <span className="text-xs text-gray-500">({percentage}%)</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">No status data available</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Frequent Customers */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <AlertTriangle className="h-5 w-5 mr-2" />
                                Frequent Issues
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {frequentCustomers && frequentCustomers.length > 0 ? (
                                <div className="space-y-3">
                                    {frequentCustomers.slice(0, 8).map((customer) => (
                                        <div key={customer.customer_id} className="flex items-center justify-between p-2 bg-orange-50 border border-orange-200 rounded">
                                            <div>
                                                <p className="font-medium text-sm">{customer.customer_name}</p>
                                                <p className="text-xs text-gray-600">ID: {customer.customer_id}</p>
                                            </div>
                                            <Badge className="bg-orange-100 text-orange-800">
                                                {customer.ticket_count} tickets
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">No frequent customers found</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Monthly Trends */}
                {monthlyTrends && monthlyTrends.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Calendar className="h-5 w-5 mr-2" />
                                Monthly Trends (Last 12 Months)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-6 lg:grid-cols-12 gap-4">
                                {monthlyTrends.map((trend) => {
                                    const resolutionRate = trend.total_tickets > 0 
                                        ? Math.round((trend.resolved_tickets / trend.total_tickets) * 100) 
                                        : 0;
                                    
                                    return (
                                        <div key={trend.month} className="text-center p-3 bg-gray-50 rounded-lg">
                                            <p className="text-xs text-gray-600 mb-1">
                                                {formatMonth(trend.month)}
                                            </p>
                                            <p className="text-lg font-bold text-blue-600">
                                                {trend.total_tickets}
                                            </p>
                                            <p className="text-xs text-green-600">
                                                {trend.resolved_tickets} resolved
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {resolutionRate}% rate
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppShell>
    );
}