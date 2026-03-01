import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { DollarSign, CarFront, Calendar, Smile, TrendingUp, AlertCircle } from 'lucide-react';

const revenueData = [
    { name: 'Sep', revenue: 320 },
    { name: 'Oct', revenue: 380 },
    { name: 'Nov', revenue: 410 },
    { name: 'Dec', revenue: 480 },
    { name: 'Jan', revenue: 520 },
    { name: 'Feb', revenue: 580 },
];

const inventoryData = [
    { name: 'SUVs', value: 45 },
    { name: 'Sedans', value: 30 },
    { name: 'Trucks', value: 15 },
    { name: 'EVs', value: 10 },
];
const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

const recentTransactions = [
    { id: 1, customer: 'Michael Chen', vehicle: '2024 Model X SUV', type: 'Sale', status: 'Completed', date: '2 Mins Ago' },
    { id: 2, customer: 'Sarah Jenkins', vehicle: 'Sedan 5000 Mile Service', type: 'Service', status: 'Pending', date: '15 Mins Ago' },
    { id: 3, customer: 'David Rodriguez', vehicle: '2023 Performance Truck', type: 'Sale', status: 'Completed', date: '1 Hour Ago' },
    { id: 4, customer: 'Emily Watson', vehicle: 'EV Battery Diagnostic', type: 'Service', status: 'Completed', date: '3 Hours Ago' },
    { id: 5, customer: 'James Smith', vehicle: '2024 Luxury Sedan', type: 'Sale', status: 'Pending', date: '5 Hours Ago' },
];

const kpiCards = [
    {
        label: 'Total Revenue', value: '$2.4M', sub: 'vs. last month ($2.14M)',
        icon: DollarSign, iconBg: 'bg-blue-50 dark:bg-blue-500/10', iconColor: 'text-blue-600',
        badge: '+12%', badgeBg: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600', hasBadge: true,
    },
    {
        label: 'Vehicles in Stock', value: '142', sub: 'Optimal inventory levels maintained',
        icon: CarFront, iconBg: 'bg-indigo-50 dark:bg-indigo-500/10', iconColor: 'text-indigo-600',
        hasBadge: false,
    },
    {
        label: 'Service Appointments', value: '28', sub: 'Scheduled for today',
        icon: Calendar, iconBg: 'bg-amber-50 dark:bg-amber-500/10', iconColor: 'text-amber-600',
        badge: 'High Volume', badgeBg: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600', hasBadge: true, badgeIcon: AlertCircle,
    },
    {
        label: 'Customer Satisfaction', value: '94%', sub: 'Based on post-sale surveys',
        icon: Smile, iconBg: 'bg-emerald-50 dark:bg-emerald-500/10', iconColor: 'text-emerald-600',
        hasBadge: false,
    },
];

const OverviewDashboard = () => (
    <div className="space-y-6">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Business Intelligence Overview</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Real-time metrics and performance indicators.</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Data Sync</span>
            </div>
        </div>

        {/* ── KPI Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {kpiCards.map(({ label, value, sub, icon: Icon, iconBg, iconColor, badge, badgeBg, hasBadge, badgeIcon: BadgeIcon }) => (
                <div key={label} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <Icon className={`w-16 h-16 ${iconColor}`} />
                    </div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className={`p-2 ${iconBg} rounded-lg shrink-0`}>
                            <Icon className={`w-6 h-6 ${iconColor}`} />
                        </div>
                        {hasBadge && (
                            <div className={`flex items-center space-x-1 ${badgeBg} px-2.5 py-1 rounded-full text-xs font-semibold`}>
                                {BadgeIcon ? <BadgeIcon className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                                <span>{badge}</span>
                            </div>
                        )}
                    </div>
                    <div className="relative z-10">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{label}</p>
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{value}</h3>
                        <p className="text-xs text-slate-400 mt-2">{sub}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* Bar Chart */}
            <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col">
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight">Monthly Revenue Growth</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800 mt-1 flex justify-between">
                        <span>Past 6 months comparison</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">In Thousands (USD)</span>
                    </p>
                </div>
                <div className="flex-1 w-full min-h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.15)" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                            <Tooltip
                                cursor={{ fill: 'rgba(148,163,184,0.08)' }}
                                contentStyle={{ borderRadius: '12px', border: '1px solid rgba(148,163,184,0.2)', background: 'rgba(15,23,42,0.9)', color: '#e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}
                                formatter={(value) => [`$${value}k`, 'Revenue']}
                            />
                            <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Pie Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col">
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight">Inventory Mix</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800 mt-1">Current stock breakdown</p>
                </div>
                <div className="flex-1 w-full min-h-[300px] flex flex-col items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={inventoryData} cx="50%" cy="50%"
                                innerRadius={70} outerRadius={100} paddingAngle={5}
                                dataKey="value" stroke="none">
                                {inventoryData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: '1px solid rgba(148,163,184,0.2)', background: 'rgba(15,23,42,0.9)', color: '#e2e8f0' }}
                                formatter={(value, name) => [`${value}%`, name]}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="w-full grid grid-cols-2 gap-x-4 gap-y-3 mt-4">
                        {inventoryData.map((entry, index) => (
                            <div key={entry.name} className="flex items-center space-x-2 text-sm justify-between px-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[index] }} />
                                    <span className="text-slate-600 dark:text-slate-300 font-medium">{entry.name}</span>
                                </div>
                                <span className="font-bold text-slate-800 dark:text-white">{entry.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* ── Recent Activity Table ── */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
            <div className="mb-6 flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight">Recent Activity Tracker</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Latest transactions and service updates</p>
                </div>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                    View All Reports
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/60">
                            {['Customer Name', 'Vehicle', 'Type', 'Status', 'Time'].map((h, i) => (
                                <th key={h} className={`py-3 px-4 font-semibold text-xs tracking-wider text-slate-500 dark:text-slate-400 uppercase ${i === 4 ? 'text-right' : ''}`}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {recentTransactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                <td className="py-4 px-4">
                                    <span className="font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{tx.customer}</span>
                                </td>
                                <td className="py-4 px-4 text-slate-600 dark:text-slate-300 font-medium">{tx.vehicle}</td>
                                <td className="py-4 px-4">
                                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                                        {tx.type}
                                    </span>
                                </td>
                                <td className="py-4 px-4">
                                    <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold
                                        ${tx.status === 'Completed'
                                            ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                                            : 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400'
                                        }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${tx.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                        <span>{tx.status}</span>
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-slate-400 dark:text-slate-500 text-sm text-right">{tx.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

export default OverviewDashboard;
