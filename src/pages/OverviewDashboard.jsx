import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import {
    DollarSign, CarFront, Calendar, Smile, TrendingUp, AlertCircle,
    CheckCircle2, Wrench, UserCheck, FileText, Car, Zap
} from 'lucide-react';
import { KpiCardSkeleton, ChartSkeleton, TableRowSkeleton, FeedItemSkeleton } from '../components/Skeleton';

// ── Static mock data ─────────────────────────────────────────────────────────
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

const kpiCards = [
    { label: 'Total Revenue', value: '$2.4M', sub: 'vs. last month ($2.14M)', icon: DollarSign, iconBg: 'bg-blue-50 dark:bg-blue-500/10', iconColor: 'text-blue-600', badge: '+12%', badgeBg: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600', hasBadge: true },
    { label: 'Vehicles in Stock', value: '142', sub: 'Optimal inventory levels maintained', icon: CarFront, iconBg: 'bg-indigo-50 dark:bg-indigo-500/10', iconColor: 'text-indigo-600', hasBadge: false },
    { label: 'Service Appointments', value: '28', sub: 'Scheduled for today', icon: Calendar, iconBg: 'bg-amber-50 dark:bg-amber-500/10', iconColor: 'text-amber-600', badge: 'High Volume', badgeBg: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600', hasBadge: true, badgeIcon: AlertCircle },
    { label: 'Customer Satisfaction', value: '94%', sub: 'Based on post-sale surveys', icon: Smile, iconBg: 'bg-emerald-50 dark:bg-emerald-500/10', iconColor: 'text-emerald-600', hasBadge: false },
];

const recentTransactions = [
    { id: 1, customer: 'Michael Chen', vehicle: '2024 Model X SUV', type: 'Sale', status: 'Completed', date: '2 Mins Ago' },
    { id: 2, customer: 'Sarah Jenkins', vehicle: 'Sedan 5000 Mile Service', type: 'Service', status: 'Pending', date: '15 Mins Ago' },
    { id: 3, customer: 'David Rodriguez', vehicle: '2023 Performance Truck', type: 'Sale', status: 'Completed', date: '1 Hour Ago' },
    { id: 4, customer: 'Emily Watson', vehicle: 'EV Battery Diagnostic', type: 'Service', status: 'Completed', date: '3 Hours Ago' },
    { id: 5, customer: 'James Smith', vehicle: '2024 Luxury Sedan', type: 'Sale', status: 'Pending', date: '5 Hours Ago' },
];

// ── Live feed seed data ──────────────────────────────────────────────────────
const SEED_FEED = [
    { id: 1, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10', label: 'BMW M4 Competition Sold', sub: 'to Rajesh Kumar · ₹89L deal closed', time: 'Just now' },
    { id: 2, icon: UserCheck, color: 'text-blue-400', bg: 'bg-blue-500/10', label: 'Priya Sharma logged in', sub: 'Sales floor · Workstation 3', time: '1 min ago' },
    { id: 3, icon: Wrench, color: 'text-amber-400', bg: 'bg-amber-500/10', label: 'Audi A4 Service confirmed', sub: '5,000 km service · Bay 2', time: '3 min ago' },
    { id: 4, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10', label: 'Toyota RAV4 Hybrid Sold', sub: 'to Ananya Patel · Finance approved', time: '7 min ago' },
    { id: 5, icon: Car, color: 'text-indigo-400', bg: 'bg-indigo-500/10', label: 'New stock arrived — 4 vehicles', sub: 'Honda, Ford, Kia, Hyundai', time: '12 min ago' },
    { id: 6, icon: FileText, color: 'text-violet-400', bg: 'bg-violet-500/10', label: 'Q1 Inventory report generated', sub: 'CSV export by Admin', time: '18 min ago' },
    { id: 7, icon: Wrench, color: 'text-amber-400', bg: 'bg-amber-500/10', label: 'Mercedes GLC — brake job done', sub: 'Technician: Vikram R.', time: '25 min ago' },
    { id: 8, icon: UserCheck, color: 'text-blue-400', bg: 'bg-blue-500/10', label: 'Karan Mehta logged in', sub: 'Finance desk · Portal access', time: '31 min ago' },
    { id: 9, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10', label: 'Tesla Model Y deal closed', sub: 'to Divya Nair · Full payment', time: '44 min ago' },
    { id: 10, icon: Zap, color: 'text-sky-400', bg: 'bg-sky-500/10', label: 'EV Fast-charger booking', sub: 'Slot 09:00 — Arjun Gupta', time: '1 hr ago' },
];

// Simulated new events that arrive over time
const INCOMING = [
    { id: 101, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10', label: 'Range Rover Sport Sold', sub: 'to Siddharth R. · ₹1.2Cr deal', time: 'Just now' },
    { id: 102, icon: Wrench, color: 'text-amber-400', bg: 'bg-amber-500/10', label: 'Ford F-150 — oil change done', sub: 'Technician: Suresh M.', time: 'Just now' },
    { id: 103, icon: UserCheck, color: 'text-blue-400', bg: 'bg-blue-500/10', label: 'Neha Singh logged in', sub: 'CRM desk · Lead management', time: 'Just now' },
    { id: 104, icon: Car, color: 'text-indigo-400', bg: 'bg-indigo-500/10', label: '2 vehicles moved to showroom', sub: 'BMW 3 Series & Honda City', time: 'Just now' },
];

// ── Components ───────────────────────────────────────────────────────────────
const FeedItem = ({ item, isNew }) => {
    const Icon = item.icon;
    return (
        <div className={`flex items-start gap-3 py-3 px-1 rounded-xl transition-all duration-500 ${isNew ? 'bg-blue-500/5 animate-pulse-once' : ''}`}>
            <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                <Icon className={`w-4 h-4 ${item.color}`} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 leading-snug truncate">{item.label}</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 truncate">{item.sub}</p>
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0 pt-0.5 whitespace-nowrap">{item.time}</span>
        </div>
    );
};

// ── Main Dashboard ───────────────────────────────────────────────────────────
const OverviewDashboard = () => {
    const [feed, setFeed] = useState(SEED_FEED);
    const [newIds, setNewIds] = useState(new Set());
    const [incomingIdx, setIncomingIdx] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Simulate data fetch
    useEffect(() => {
        const t = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(t);
    }, []);

    // Simulate new events every 8 seconds (only when loaded)
    useEffect(() => {
        if (isLoading) return;
        const timer = setInterval(() => {
            const next = INCOMING[incomingIdx % INCOMING.length];
            const entry = { ...next, id: Date.now() };
            setFeed(prev => [entry, ...prev.slice(0, 11)]);
            setNewIds(prev => new Set([...prev, entry.id]));
            setTimeout(() => setNewIds(prev => { const s = new Set(prev); s.delete(entry.id); return s; }), 3000);
            setIncomingIdx(i => i + 1);
        }, 8000);
        return () => clearInterval(timer);
    }, [isLoading, incomingIdx]);

    // ── SKELETON SCREEN ──
    if (isLoading) return (
        <div className="space-y-6">
            {/* Header skeleton */}
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg h-7 w-64" />
                    <div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg h-3.5 w-48" />
                </div>
                <div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg h-8 w-32" />
            </div>
            {/* KPI cards skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {Array.from({ length: 4 }).map((_, i) => <KpiCardSkeleton key={i} />)}
            </div>
            {/* Charts + feed skeleton */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                <div className="xl:col-span-3 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        <ChartSkeleton className="lg:col-span-3" />
                        <ChartSkeleton className="lg:col-span-2" />
                    </div>
                    {/* Table skeleton */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 space-y-2">
                            <div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded h-4 w-44" />
                            <div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded h-3 w-64" />
                        </div>
                        <table className="w-full">
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} cols={5} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Feed skeleton */}
                <div className="xl:col-span-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-5 space-y-1">
                    <div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded h-3.5 w-28 mb-4" />
                    {Array.from({ length: 6 }).map((_, i) => <FeedItemSkeleton key={i} />)}
                </div>
            </div>
        </div>
    );

    return (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {kpiCards.map(({ label, value, sub, icon: Icon, iconBg, iconColor, badge, badgeBg, hasBadge, badgeIcon: BadgeIcon }) => (
                    <div key={label} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform duration-500">
                            <Icon className={`w-14 h-14 ${iconColor}`} />
                        </div>
                        <div className="flex justify-between items-start mb-3 relative z-10">
                            <div className={`p-2 ${iconBg} rounded-lg shrink-0`}>
                                <Icon className={`w-5 h-5 ${iconColor}`} />
                            </div>
                            {hasBadge && (
                                <div className={`flex items-center space-x-1 ${badgeBg} px-2 py-0.5 rounded-full text-xs font-semibold`}>
                                    {BadgeIcon ? <BadgeIcon className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                                    <span>{badge}</span>
                                </div>
                            )}
                        </div>
                        <div className="relative z-10">
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">{label}</p>
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{value}</h3>
                            <p className="text-[11px] text-slate-400 mt-1">{sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Main grid: Charts (3 cols) + Live Feed (1 col) ── */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

                {/* ── Left 3 cols: Charts + Table ── */}
                <div className="xl:col-span-3 space-y-6">

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                        {/* Bar Chart */}
                        <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col">
                            <div className="mb-4">
                                <h3 className="text-base font-bold text-slate-800 dark:text-white tracking-tight">Monthly Revenue</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800 mt-0.5 flex justify-between">
                                    <span>Past 6 months</span><span className="font-semibold text-slate-700 dark:text-slate-300">in Thousands (USD)</span>
                                </p>
                            </div>
                            <div className="flex-1 min-h-[220px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={revenueData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.12)" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} dy={8} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                                        <Tooltip
                                            cursor={{ fill: 'rgba(148,163,184,0.08)' }}
                                            contentStyle={{ borderRadius: '12px', border: '1px solid rgba(148,163,184,0.2)', background: 'rgba(15,23,42,0.92)', color: '#e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}
                                            formatter={(v) => [`$${v}k`, 'Revenue']}
                                        />
                                        <Bar dataKey="revenue" fill="#3b82f6" radius={[5, 5, 0, 0]} maxBarSize={36} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Pie Chart */}
                        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col">
                            <div className="mb-4">
                                <h3 className="text-base font-bold text-slate-800 dark:text-white tracking-tight">Inventory Mix</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800 mt-0.5">Current stock breakdown</p>
                            </div>
                            <div className="flex-1 min-h-[220px] flex flex-col items-center justify-center">
                                <ResponsiveContainer width="100%" height="65%">
                                    <PieChart>
                                        <Pie data={inventoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                                            {inventoryData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                                        </Pie>
                                        <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid rgba(148,163,184,0.2)', background: 'rgba(15,23,42,0.92)', color: '#e2e8f0' }} formatter={(v, n) => [`${v}%`, n]} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="w-full grid grid-cols-2 gap-x-3 gap-y-2 mt-3">
                                    {inventoryData.map((e, i) => (
                                        <div key={e.name} className="flex items-center gap-1.5 text-xs justify-between px-1">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                                                <span className="text-slate-600 dark:text-slate-300 font-medium">{e.name}</span>
                                            </div>
                                            <span className="font-bold text-slate-800 dark:text-white">{e.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Activity Table */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="mb-4 flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                            <div>
                                <h3 className="text-base font-bold text-slate-800 dark:text-white tracking-tight">Recent Activity Tracker</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Latest transactions and service updates</p>
                            </div>
                            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                                View All
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/60">
                                        {['Customer Name', 'Vehicle', 'Type', 'Status', 'Time'].map((h, i) => (
                                            <th key={h} className={`py-2.5 px-4 font-semibold text-[11px] tracking-wider text-slate-500 dark:text-slate-400 uppercase ${i === 4 ? 'text-right' : ''}`}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {recentTransactions.map((tx) => (
                                        <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                            <td className="py-3 px-4">
                                                <span className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{tx.customer}</span>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-300 font-medium">{tx.vehicle}</td>
                                            <td className="py-3 px-4">
                                                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">{tx.type}</span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold
                                                    ${tx.status === 'Completed'
                                                        ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                                                        : 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400'
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${tx.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                                    {tx.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-xs text-slate-400 dark:text-slate-500 text-right">{tx.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ── Right 1 col: Live Feed ── */}
                <div className="xl:col-span-1">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm h-full flex flex-col overflow-hidden">

                        {/* Feed Header */}
                        <div className="px-5 pt-5 pb-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold text-slate-800 dark:text-white tracking-tight">Live Showroom</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                    </span>
                                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Live</span>
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Real-time activity feed</p>
                        </div>

                        {/* Feed Items — scrollable, no scrollbar */}
                        <div className="flex-1 overflow-y-auto px-4 py-2 divide-y divide-slate-100 dark:divide-slate-800/60">
                            {feed.map((item) => (
                                <FeedItem key={item.id} item={item} isNew={newIds.has(item.id)} />
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 shrink-0">
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center">
                                Updates every 8 seconds · {feed.length} events
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewDashboard;
