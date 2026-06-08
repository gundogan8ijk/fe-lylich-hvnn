'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    BarChart3,
    ShoppingBag,
    Users,
    TrendingUp,
    LayoutDashboard,
    Settings,
    LogOut,
    Menu,
    ArrowUp,
    ArrowDown,
    Edit2,
    Trash2,
} from 'lucide-react'

const fakeUsers = [
    {
        id: '#001',
        name: 'John Doe',
        email: 'john@example.com',
        status: 'Active',
        date: '2024-06-01',
    },
    {
        id: '#002',
        name: 'Jane Smith',
        email: 'jane@example.com',
        status: 'Active',
        date: '2024-06-02',
    },
    {
        id: '#003',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        status: 'Inactive',
        date: '2024-05-28',
    },
    {
        id: '#004',
        name: 'Sarah Williams',
        email: 'sarah@example.com',
        status: 'Active',
        date: '2024-06-03',
    },
    {
        id: '#005',
        name: 'Tom Brown',
        email: 'tom@example.com',
        status: 'Active',
        date: '2024-06-04',
    },
]

const fakeOrders = [
    {
        id: '#ORD-001',
        customer: 'John Doe',
        product: 'Premium Package',
        amount: '$299.99',
        status: 'Completed',
    },
    {
        id: '#ORD-002',
        customer: 'Jane Smith',
        product: 'Basic Package',
        amount: '$99.99',
        status: 'Pending',
    },
    {
        id: '#ORD-003',
        customer: 'Mike Johnson',
        product: 'Pro Package',
        amount: '$199.99',
        status: 'Completed',
    },
    {
        id: '#ORD-004',
        customer: 'Sarah Williams',
        product: 'Enterprise Package',
        amount: '$499.99',
        status: 'Processing',
    },
    {
        id: '#ORD-005',
        customer: 'Tom Brown',
        product: 'Premium Package',
        amount: '$299.99',
        status: 'Completed',
    },
]

function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '#' },
        { icon: Users, label: 'Users', href: '#' },
        { icon: ShoppingBag, label: 'Orders', href: '#' },
        { icon: Settings, label: 'Settings', href: '#' },
    ]

    return (
        <div >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-sidebar text-sidebar-foreground"
            >
                <Menu size={20} />
            </button>

            <aside
                className={`fixed top-0 left-0 h-screen bg-sidebar text-sidebar-foreground w-64 transform transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0`}
            >
                <div className="p-6 border-b border-sidebar-border">
                    <h1 className="text-2xl font-bold text-sidebar-primary">Admin</h1>
                </div>

                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
                            >
                                <Icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="absolute bottom-6 left-4 right-4 pt-4 border-t border-sidebar-border">
                    <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground w-full">
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    )
}

function StatsCard({
    title,
    value,
    change,
    icon,
}: {
    title: string
    value: string | number
    change: number
    icon: React.ReactNode
}) {
    const isPositive = change >= 0

    return (
        <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-muted-foreground text-sm font-medium mb-2">{title}</p>
                    <p className="text-3xl font-bold text-foreground">{value}</p>
                    <div className="flex items-center gap-1 mt-2">
                        {isPositive ? (
                            <ArrowUp size={16} className="text-emerald-500" />
                        ) : (
                            <ArrowDown size={16} className="text-red-500" />
                        )}
                        <span
                            className={`text-sm font-medium ${isPositive ? 'text-emerald-500' : 'text-red-500'
                                }`}
                        >
                            {Math.abs(change)}% vs last month
                        </span>
                    </div>
                </div>
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-primary">
                    {icon}
                </div>
            </div>
        </div>
    )
}

function DataTable({
    title,
    columns,
    data,
}: {
    title: string
    columns: Array<{ key: string; label: string }>
    data: Array<Record<string, string>>
}) {
    return (
        <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border bg-secondary">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground"
                                >
                                    {col.label}
                                </th>
                            ))}
                            <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, idx) => (
                            <tr
                                key={idx}
                                className="border-b border-border hover:bg-secondary transition-colors"
                            >
                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className="px-6 py-4 text-sm text-foreground"
                                    >
                                        {typeof row[col.key] === 'string' ||
                                            typeof row[col.key] === 'number'
                                            ? row[col.key]
                                            : JSON.stringify(row[col.key])}
                                    </td>
                                ))}
                                <td className="px-6 py-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-primary">
                                            <Edit2 size={16} />
                                        </button>
                                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-red-500">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default function AdminDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <div className="flex h-screen bg-background">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <main className="flex-1 md:ml-0 overflow-auto">
                <div className="p-4 md:p-8 pt-16 md:pt-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
                        <p className="text-muted-foreground">
                            Welcome back! Here&apos;s your business overview.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <StatsCard
                            title="Total Revenue"
                            value="$45,231"
                            change={12}
                            icon={<TrendingUp size={24} />}
                        />
                        <StatsCard
                            title="Total Users"
                            value="2,543"
                            change={8}
                            icon={<Users size={24} />}
                        />
                        <StatsCard
                            title="Total Orders"
                            value="1,234"
                            change={-3}
                            icon={<ShoppingBag size={24} />}
                        />
                        <StatsCard
                            title="Growth Rate"
                            value="24.5%"
                            change={5}
                            icon={<BarChart3 size={24} />}
                        />
                    </div>

                    <div className="space-y-6">
                        <DataTable
                            title="Recent Users"
                            columns={[
                                { key: 'id', label: 'ID' },
                                { key: 'name', label: 'Name' },
                                { key: 'email', label: 'Email' },
                                { key: 'status', label: 'Status' },
                                { key: 'date', label: 'Join Date' },
                            ]}
                            data={fakeUsers}
                        />

                        <DataTable
                            title="Recent Orders"
                            columns={[
                                { key: 'id', label: 'Order ID' },
                                { key: 'customer', label: 'Customer' },
                                { key: 'product', label: 'Product' },
                                { key: 'amount', label: 'Amount' },
                                { key: 'status', label: 'Status' },
                            ]}
                            data={fakeOrders}
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}
