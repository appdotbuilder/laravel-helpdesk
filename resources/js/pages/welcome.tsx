import React from 'react';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { TicketStats, User } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    BarChart3,
    Headphones,
    Settings,
    Ticket,
    Users,
    Zap,
} from 'lucide-react';

interface Props {
    stats: TicketStats;
    [key: string]: unknown;
}

export default function Welcome({ stats }: Props) {
    const { auth } = usePage<{ auth: { user: User | null } }>().props;

    const features = [
        {
            icon: <Ticket className="h-8 w-8 text-blue-600" />,
            title: 'Ticket Management',
            description: 'Create, track, and manage customer support tickets efficiently',
            color: 'bg-blue-50 border-blue-200',
        },
        {
            icon: <Users className="h-8 w-8 text-green-600" />,
            title: 'Multi-Role Support',
            description: 'CS, TSO Agent, and NOC teams with role-based permissions',
            color: 'bg-green-50 border-green-200',
        },
        {
            icon: <Settings className="h-8 w-8 text-purple-600" />,
            title: 'Smart Assignment',
            description: 'Assign tickets to team members and handle escalations seamlessly',
            color: 'bg-purple-50 border-purple-200',
        },
        {
            icon: <BarChart3 className="h-8 w-8 text-orange-600" />,
            title: 'Analytics & Reports',
            description: 'Performance metrics, resolution times, and Excel export',
            color: 'bg-orange-50 border-orange-200',
        },
    ];

    const roleDescriptions = [
        {
            role: 'CS (Customer Service)',
            icon: <Headphones className="h-6 w-6 text-blue-600" />,
            description: 'Create and manage customer complaint tickets',
            responsibilities: ['Create tickets', 'Update customer information', 'Track ticket progress'],
        },
        {
            role: 'TSO Agent',
            icon: <Zap className="h-6 w-6 text-yellow-600" />,
            description: 'Technical support and issue resolution',
            responsibilities: ['Assign tickets', 'Resolve technical issues', 'Handle escalations'],
        },
        {
            role: 'NOC',
            icon: <Settings className="h-6 w-6 text-red-600" />,
            description: 'Network operations and critical incident management',
            responsibilities: ['Monitor network issues', 'Assign to TSO agents', 'Handle urgent tickets'],
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <Ticket className="h-5 w-5 text-white" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-900">Helpdesk Pro</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        {auth?.user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-600">
                                    Welcome, {auth.user.name}
                                    {auth.user.role && (
                                        <Badge variant="secondary" className="ml-2">
                                            {auth.user.role.name}
                                        </Badge>
                                    )}
                                </span>
                                <Link href="/dashboard">
                                    <Button>Dashboard</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link href="/login">
                                    <Button variant="outline">Login</Button>
                                </Link>
                                <Link href="/register">
                                    <Button>Get Started</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <div className="h-20 w-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                            <Ticket className="h-10 w-10 text-white" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        🎧 Professional Helpdesk System
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Streamline your customer support operations with our comprehensive helpdesk solution. 
                        Manage tickets, track performance, and deliver exceptional customer service.
                    </p>

                    {/* Live Stats */}
                    {stats && (
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto mb-12">
                            <Card className="bg-white/60 backdrop-blur-sm border-blue-200">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                                    <div className="text-sm text-gray-600">Total Tickets</div>
                                </CardContent>
                            </Card>
                            <Card className="bg-white/60 backdrop-blur-sm border-orange-200">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-orange-600">{stats.new}</div>
                                    <div className="text-sm text-gray-600">New</div>
                                </CardContent>
                            </Card>
                            <Card className="bg-white/60 backdrop-blur-sm border-yellow-200">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-yellow-600">{stats.in_progress}</div>
                                    <div className="text-sm text-gray-600">In Progress</div>
                                </CardContent>
                            </Card>
                            <Card className="bg-white/60 backdrop-blur-sm border-green-200">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
                                    <div className="text-sm text-gray-600">Resolved</div>
                                </CardContent>
                            </Card>
                            <Card className="bg-white/60 backdrop-blur-sm border-red-200">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-red-600">{stats.urgent}</div>
                                    <div className="text-sm text-gray-600">Urgent</div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    <div className="flex justify-center space-x-4">
                        {auth?.user ? (
                            <>
                                <Link href="/">
                                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                        <Ticket className="mr-2 h-5 w-5" />
                                        View All Tickets
                                    </Button>
                                </Link>
                                <Link href="/reports">
                                    <Button size="lg" variant="outline">
                                        <BarChart3 className="mr-2 h-5 w-5" />
                                        View Reports
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/register">
                                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                        Start Free Trial
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button size="lg" variant="outline">
                                        Login
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 px-4 bg-white/60 backdrop-blur-sm">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            ⚡ Powerful Features
                        </h2>
                        <p className="text-lg text-gray-600">
                            Everything you need to manage customer support efficiently
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <Card key={index} className={`${feature.color} border-2 hover:shadow-lg transition-all`}>
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-center mb-4">
                                        {feature.icon}
                                    </div>
                                    <CardTitle className="text-center text-lg">
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600 text-center">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Role-based Access */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            👥 Multi-Role Support
                        </h2>
                        <p className="text-lg text-gray-600">
                            Designed for different teams with specific responsibilities
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {roleDescriptions.map((roleInfo, index) => (
                            <Card key={index} className="border-2 hover:shadow-lg transition-all">
                                <CardHeader>
                                    <div className="flex items-center space-x-3 mb-2">
                                        {roleInfo.icon}
                                        <CardTitle className="text-lg">
                                            {roleInfo.role}
                                        </CardTitle>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        {roleInfo.description}
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {roleInfo.responsibilities.map((responsibility, idx) => (
                                            <li key={idx} className="flex items-center text-sm text-gray-600">
                                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                                                {responsibility}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        🚀 Ready to Transform Your Support?
                    </h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Join thousands of teams already using our helpdesk system
                    </p>
                    <div className="flex justify-center space-x-4">
                        {!auth?.user && (
                            <>
                                <Link href="/register">
                                    <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                                        Get Started Free
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                                        Sign In
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 bg-white border-t">
                <div className="container mx-auto text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="h-6 w-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
                            <Ticket className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-semibold text-gray-900">Helpdesk Pro</span>
                    </div>
                    <p className="text-sm text-gray-600">
                        Professional customer support management system
                    </p>
                </div>
            </footer>
        </div>
    );
}