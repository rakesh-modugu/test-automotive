import React, { useState } from 'react';
import { PlusCircle, Filter, User, Car, DollarSign, MoreHorizontal } from 'lucide-react';

const sourceConfig = {
    Web: { bg: 'bg-blue-100', text: 'text-blue-700' },
    'Walk-in': { bg: 'bg-green-100', text: 'text-green-700' },
    Phone: { bg: 'bg-purple-100', text: 'text-purple-700' },
    Referral: { bg: 'bg-orange-100', text: 'text-orange-700' },
};

const columns = [
    {
        id: 'new-leads',
        title: 'New Leads',
        color: 'bg-blue-500',
        headerBg: 'bg-blue-50 border-blue-100',
        titleColor: 'text-blue-700',
        badgeBg: 'bg-blue-100 text-blue-700',
    },
    {
        id: 'test-drive',
        title: 'Test Drive',
        color: 'bg-amber-500',
        headerBg: 'bg-amber-50 border-amber-100',
        titleColor: 'text-amber-700',
        badgeBg: 'bg-amber-100 text-amber-700',
    },
    {
        id: 'negotiation',
        title: 'Negotiation & Desking',
        color: 'bg-orange-500',
        headerBg: 'bg-orange-50 border-orange-100',
        titleColor: 'text-orange-700',
        badgeBg: 'bg-orange-100 text-orange-700',
    },
    {
        id: 'fi-credit',
        title: 'F&I / Credit',
        color: 'bg-violet-500',
        headerBg: 'bg-violet-50 border-violet-100',
        titleColor: 'text-violet-700',
        badgeBg: 'bg-violet-100 text-violet-700',
    },
    {
        id: 'closed-won',
        title: 'Closed Won',
        color: 'bg-emerald-500',
        headerBg: 'bg-emerald-50 border-emerald-100',
        titleColor: 'text-emerald-700',
        badgeBg: 'bg-emerald-100 text-emerald-700',
    },
];

const deals = [
    // New Leads
    {
        id: 1, column: 'new-leads',
        customer: 'Michael Chen', initials: 'MC',
        vehicle: '2024 Toyota RAV4 Hybrid',
        value: 38995, source: 'Web', time: '1 hour ago',
    },
    {
        id: 2, column: 'new-leads',
        customer: 'Priya Sharma', initials: 'PS',
        vehicle: '2024 Honda Pilot Elite',
        value: 51200, source: 'Phone', time: '3 hours ago',
    },
    {
        id: 3, column: 'new-leads',
        customer: 'James Whitfield', initials: 'JW',
        vehicle: '2023 Ford Bronco Sport',
        value: 34750, source: 'Web', time: '5 hours ago',
    },
    // Test Drive
    {
        id: 4, column: 'test-drive',
        customer: 'Sarah Jenkins', initials: 'SJ',
        vehicle: '2024 BMW X5 xDrive40i',
        value: 72800, source: 'Referral', time: '1 day ago',
    },
    {
        id: 5, column: 'test-drive',
        customer: 'David Torres', initials: 'DT',
        vehicle: '2023 Tesla Model Y LR',
        value: 49900, source: 'Walk-in', time: '2 days ago',
    },
    // Negotiation
    {
        id: 6, column: 'negotiation',
        customer: 'Linda Hoffman', initials: 'LH',
        vehicle: '2024 Mercedes GLE 53 AMG',
        value: 88500, source: 'Referral', time: '2 days ago',
    },
    {
        id: 7, column: 'negotiation',
        customer: 'Ray Ortega', initials: 'RO',
        vehicle: '2024 Chevrolet Tahoe LTZ',
        value: 63200, source: 'Phone', time: '3 days ago',
    },
    // F&I
    {
        id: 8, column: 'fi-credit',
        customer: 'Amanda Willis', initials: 'AW',
        vehicle: '2024 Audi Q7 Premium Plus',
        value: 74990, source: 'Web', time: '4 days ago',
    },
    // Closed Won
    {
        id: 9, column: 'closed-won',
        customer: 'Tom Richardson', initials: 'TR',
        vehicle: '2022 Ford F-150 Lariat',
        value: 44800, source: 'Walk-in', time: '5 days ago',
    },
    {
        id: 10, column: 'closed-won',
        customer: 'Grace Lee', initials: 'GL',
        vehicle: '2023 Honda Civic Sport',
        value: 27500, source: 'Web', time: '6 days ago',
    },
    {
        id: 11, column: 'closed-won',
        customer: 'Marcus Brown', initials: 'MB',
        vehicle: '2023 Jeep Grand Cherokee',
        value: 52400, source: 'Referral', time: '1 week ago',
    },
    {
        id: 12, column: 'closed-won',
        customer: 'Natalie Park', initials: 'NP',
        vehicle: '2024 Hyundai Tucson Hybrid',
        value: 33700, source: 'Phone', time: '1 week ago',
    },
];

const avatarColors = [
    'from-blue-500 to-indigo-600',
    'from-violet-500 to-purple-600',
    'from-emerald-500 to-teal-600',
    'from-rose-500 to-pink-600',
    'from-amber-500 to-orange-600',
];

const DealCard = ({ deal }) => {
    const sc = sourceConfig[deal.source] || { bg: 'bg-slate-100', text: 'text-slate-600' };
    const avatarGradient = avatarColors[deal.id % avatarColors.length];

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer group">
            {/* Top: Avatar + Name + Menu */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarGradient} flex items-center justify-center shrink-0 shadow-sm`}>
                        <span className="text-white text-xs font-bold">{deal.initials}</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {deal.customer}
                    </span>
                </div>
                <button className="p-1 rounded-lg text-slate-300 hover:text-slate-600 hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="w-4 h-4" />
                </button>
            </div>

            {/* Vehicle */}
            <div className="flex items-center gap-1.5 text-slate-500 mb-3">
                <Car className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                <span className="text-xs font-medium truncate">{deal.vehicle}</span>
            </div>

            {/* Deal Value */}
            <div className="flex items-center gap-1 mb-3">
                <DollarSign className="w-4 h-4 text-emerald-500" />
                <span className="text-base font-bold text-slate-800">
                    {deal.value.toLocaleString()}
                </span>
            </div>

            {/* Footer: Source Badge + Timestamp */}
            <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${sc.bg} ${sc.text}`}>
                    {deal.source}
                </span>
                <span className="text-xs text-slate-400">{deal.time}</span>
            </div>
        </div>
    );
};

const Sales = () => {
    const totalPipeline = deals
        .filter((d) => d.column !== 'closed-won')
        .reduce((sum, d) => sum + d.value, 0);
    const closedValue = deals
        .filter((d) => d.column === 'closed-won')
        .reduce((sum, d) => sum + d.value, 0);

    return (
        <div className="flex flex-col h-full space-y-6">
            {/* ── Page Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                        Sales & Deals Pipeline
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Track active leads, negotiations, and closed deals.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-sm font-medium px-4 py-2.5 rounded-xl shadow-sm transition-all duration-200 focus:outline-none">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none">
                        <PlusCircle className="w-4 h-4" />
                        New Lead
                    </button>
                </div>
            </div>

            {/* ── Pipeline Summary Stats ── */}
            <div className="grid grid-cols-3 gap-4 shrink-0">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Active Deals</p>
                    <p className="text-2xl font-bold text-slate-800">{deals.filter(d => d.column !== 'closed-won').length}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Active Pipeline Value</p>
                    <p className="text-2xl font-bold text-slate-800">${(totalPipeline / 1000).toFixed(0)}k</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Closed This Period</p>
                    <p className="text-2xl font-bold text-emerald-600">${(closedValue / 1000).toFixed(0)}k</p>
                </div>
            </div>

            {/* ── Kanban Board ── */}
            <div className="overflow-x-auto pb-4 -mx-4 px-4">
                <div className="flex gap-4" style={{ minWidth: `${columns.length * 300}px` }}>
                    {columns.map((col) => {
                        const colDeals = deals.filter((d) => d.column === col.id);
                        return (
                            <div key={col.id} className="flex flex-col w-72 shrink-0">
                                {/* Column Header */}
                                <div className={`flex items-center justify-between px-4 py-3 rounded-xl border mb-3 ${col.headerBg}`}>
                                    <div className="flex items-center gap-2.5">
                                        <div className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                                        <span className={`text-sm font-bold ${col.titleColor}`}>{col.title}</span>
                                    </div>
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${col.badgeBg}`}>
                                        {colDeals.length}
                                    </span>
                                </div>

                                {/* Cards */}
                                <div className="flex flex-col gap-3 flex-1">
                                    {colDeals.map((deal) => (
                                        <DealCard key={deal.id} deal={deal} />
                                    ))}

                                    {/* Empty state */}
                                    {colDeals.length === 0 && (
                                        <div className="flex flex-col items-center justify-center py-10 rounded-xl border-2 border-dashed border-slate-200 text-slate-300">
                                            <User className="w-8 h-8 mb-2" />
                                            <p className="text-xs font-medium">No deals here</p>
                                        </div>
                                    )}

                                    {/* Add deal button at bottom of column */}
                                    <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200 text-sm font-medium mt-1">
                                        <PlusCircle className="w-4 h-4" />
                                        Add Deal
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Sales;
