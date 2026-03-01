import React, { useState, useMemo } from 'react';
import { PlusCircle, Filter, User, Car, DollarSign, MoreHorizontal, Calculator, X } from 'lucide-react';

// ─── Kanban Data ──────────────────────────────────────────────────────────────

const sourceConfig = {
    Web: { bg: 'bg-blue-100', text: 'text-blue-700' },
    'Walk-in': { bg: 'bg-green-100', text: 'text-green-700' },
    Phone: { bg: 'bg-purple-100', text: 'text-purple-700' },
    Referral: { bg: 'bg-orange-100', text: 'text-orange-700' },
};

const columns = [
    { id: 'new-leads', title: 'New Leads', color: 'bg-blue-500', headerBg: 'bg-blue-50 border-blue-100', titleColor: 'text-blue-700', badgeBg: 'bg-blue-100 text-blue-700' },
    { id: 'test-drive', title: 'Test Drive', color: 'bg-amber-500', headerBg: 'bg-amber-50 border-amber-100', titleColor: 'text-amber-700', badgeBg: 'bg-amber-100 text-amber-700' },
    { id: 'negotiation', title: 'Negotiation & Desking', color: 'bg-orange-500', headerBg: 'bg-orange-50 border-orange-100', titleColor: 'text-orange-700', badgeBg: 'bg-orange-100 text-orange-700' },
    { id: 'fi-credit', title: 'F&I / Credit', color: 'bg-violet-500', headerBg: 'bg-violet-50 border-violet-100', titleColor: 'text-violet-700', badgeBg: 'bg-violet-100 text-violet-700' },
    { id: 'closed-won', title: 'Closed Won', color: 'bg-emerald-500', headerBg: 'bg-emerald-50 border-emerald-100', titleColor: 'text-emerald-700', badgeBg: 'bg-emerald-100 text-emerald-700' },
];

const deals = [
    { id: 1, column: 'new-leads', customer: 'Michael Chen', initials: 'MC', vehicle: '2024 Toyota RAV4 Hybrid', value: 38995, source: 'Web', time: '1 hour ago' },
    { id: 2, column: 'new-leads', customer: 'Priya Sharma', initials: 'PS', vehicle: '2024 Honda Pilot Elite', value: 51200, source: 'Phone', time: '3 hours ago' },
    { id: 3, column: 'new-leads', customer: 'James Whitfield', initials: 'JW', vehicle: '2023 Ford Bronco Sport', value: 34750, source: 'Web', time: '5 hours ago' },
    { id: 4, column: 'test-drive', customer: 'Sarah Jenkins', initials: 'SJ', vehicle: '2024 BMW X5 xDrive40i', value: 72800, source: 'Referral', time: '1 day ago' },
    { id: 5, column: 'test-drive', customer: 'David Torres', initials: 'DT', vehicle: '2023 Tesla Model Y LR', value: 49900, source: 'Walk-in', time: '2 days ago' },
    { id: 6, column: 'negotiation', customer: 'Linda Hoffman', initials: 'LH', vehicle: '2024 Mercedes GLE 53 AMG', value: 88500, source: 'Referral', time: '2 days ago' },
    { id: 7, column: 'negotiation', customer: 'Ray Ortega', initials: 'RO', vehicle: '2024 Chevrolet Tahoe LTZ', value: 63200, source: 'Phone', time: '3 days ago' },
    { id: 8, column: 'fi-credit', customer: 'Amanda Willis', initials: 'AW', vehicle: '2024 Audi Q7 Premium Plus', value: 74990, source: 'Web', time: '4 days ago' },
    { id: 9, column: 'closed-won', customer: 'Tom Richardson', initials: 'TR', vehicle: '2022 Ford F-150 Lariat', value: 44800, source: 'Walk-in', time: '5 days ago' },
    { id: 10, column: 'closed-won', customer: 'Grace Lee', initials: 'GL', vehicle: '2023 Honda Civic Sport', value: 27500, source: 'Web', time: '6 days ago' },
    { id: 11, column: 'closed-won', customer: 'Marcus Brown', initials: 'MB', vehicle: '2023 Jeep Grand Cherokee', value: 52400, source: 'Referral', time: '1 week ago' },
    { id: 12, column: 'closed-won', customer: 'Natalie Park', initials: 'NP', vehicle: '2024 Hyundai Tucson Hybrid', value: 33700, source: 'Phone', time: '1 week ago' },
];

const avatarColors = [
    'from-blue-500 to-indigo-600', 'from-violet-500 to-purple-600',
    'from-emerald-500 to-teal-600', 'from-rose-500 to-pink-600', 'from-amber-500 to-orange-600',
];

// ─── Deal Card ────────────────────────────────────────────────────────────────

const DealCard = ({ deal }) => {
    const sc = sourceConfig[deal.source] || { bg: 'bg-slate-100', text: 'text-slate-600' };
    const ag = avatarColors[deal.id % avatarColors.length];
    return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer group">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${ag} flex items-center justify-center shrink-0 shadow-sm`}>
                        <span className="text-white text-xs font-bold">{deal.initials}</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{deal.customer}</span>
                </div>
                <button className="p-1 rounded-lg text-slate-300 hover:text-slate-600 hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100" style={{ border: 'none', background: 'transparent' }}>
                    <MoreHorizontal className="w-4 h-4" />
                </button>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 mb-3">
                <Car className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                <span className="text-xs font-medium truncate">{deal.vehicle}</span>
            </div>
            <div className="flex items-center gap-1 mb-3">
                <DollarSign className="w-4 h-4 text-emerald-500" />
                <span className="text-base font-bold text-slate-800">{deal.value.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${sc.bg} ${sc.text}`}>{deal.source}</span>
                <span className="text-xs text-slate-400">{deal.time}</span>
            </div>
        </div>
    );
};

// ─── Slider Row ───────────────────────────────────────────────────────────────

const SliderRow = ({ label, value, min, max, step = 1, format, onChange }) => (
    <div>
        <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-slate-600">{label}</label>
            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                {format(value)}
            </span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-600 bg-slate-200"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>{format(min)}</span>
            <span>{format(max)}</span>
        </div>
    </div>
);

const fmtUSD = (v) => `$${v.toLocaleString()}`;
const fmtPct = (v) => `${v}%`;

// ─── EMI Calculator Modal ─────────────────────────────────────────────────────

const EMIModal = ({ onClose }) => {
    const [carPrice, setCarPrice] = useState(40000);
    const [downPayment, setDownPayment] = useState(5000);
    const [interest, setInterest] = useState(5.5);
    const [term, setTerm] = useState(60);

    const terms = [24, 36, 48, 60, 72];

    const { emi, principal, totalCost } = useMemo(() => {
        const principal = Math.max(carPrice - downPayment, 0);
        if (principal === 0) return { emi: 0, principal: 0, totalCost: downPayment };
        const r = (interest / 100) / 12;
        const n = term;
        const emiVal = r === 0
            ? principal / n
            : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        return {
            emi: emiVal,
            principal,
            totalCost: emiVal * n + downPayment,
        };
    }, [carPrice, downPayment, interest, term]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">

                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-blue-600 to-indigo-600">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                            <Calculator className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-white">Interactive Desking Calculator</h2>
                            <p className="text-xs text-blue-100">Real-time deal structuring & EMI estimate</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                        style={{ border: 'none', cursor: 'pointer' }}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Sliders */}
                <div className="px-6 py-5 space-y-5">
                    <SliderRow
                        label="Vehicle Price"
                        value={carPrice}
                        min={10000} max={150000} step={500}
                        format={fmtUSD}
                        onChange={setCarPrice}
                    />
                    <SliderRow
                        label="Down Payment"
                        value={downPayment}
                        min={0} max={Math.min(50000, carPrice - 1000)} step={500}
                        format={fmtUSD}
                        onChange={setDownPayment}
                    />
                    <SliderRow
                        label="Annual Interest Rate"
                        value={interest}
                        min={1} max={15} step={0.1}
                        format={fmtPct}
                        onChange={setInterest}
                    />

                    {/* Loan Term Buttons */}
                    <div>
                        <label className="text-sm font-semibold text-slate-600 block mb-2">Loan Term</label>
                        <div className="flex gap-2 flex-wrap">
                            {terms.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTerm(t)}
                                    className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${term === t
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                        }`}
                                    style={{ border: 'none', cursor: 'pointer' }}
                                >
                                    {t}mo
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Result Area */}
                <div className="mx-6 mb-6 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                    {/* Monthly Payment — Hero */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 text-center">
                        <p className="text-blue-100 text-xs font-semibold uppercase tracking-widest mb-1">
                            Estimated Monthly Payment
                        </p>
                        <p className="text-4xl font-black text-white tracking-tight">
                            ${emi.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                            <span className="text-xl font-medium text-blue-200"> / mo</span>
                        </p>
                    </div>

                    {/* Breakdown Row */}
                    <div className="grid grid-cols-3 divide-x divide-slate-100 bg-white">
                        {[
                            { label: 'Loan Principal', value: fmtUSD(principal) },
                            { label: 'Down Payment', value: fmtUSD(downPayment) },
                            { label: 'Total Cost', value: fmtUSD(Math.round(totalCost)) },
                        ].map(({ label, value }) => (
                            <div key={label} className="px-4 py-3 text-center">
                                <p className="text-xs text-slate-400 font-medium mb-1">{label}</p>
                                <p className="text-sm font-bold text-slate-700">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

// ─── Sales Page ───────────────────────────────────────────────────────────────

const Sales = () => {
    const [showCalc, setShowCalc] = useState(false);

    const totalPipeline = deals.filter(d => d.column !== 'closed-won').reduce((s, d) => s + d.value, 0);
    const closedValue = deals.filter(d => d.column === 'closed-won').reduce((s, d) => s + d.value, 0);

    return (
        <div className="flex flex-col h-full space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Sales & Deals Pipeline</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Track active leads, negotiations, and closed deals.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowCalc(true)}
                        className="inline-flex items-center gap-2 border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all duration-200 focus:outline-none whitespace-nowrap"
                        style={{ border: '1px solid #bfdbfe', cursor: 'pointer' }}
                    >
                        <Calculator className="w-4 h-4" />
                        Calculate EMI
                    </button>
                    <button className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-sm font-medium px-4 py-2.5 rounded-xl shadow-sm transition-all duration-200 focus:outline-none whitespace-nowrap" style={{ cursor: 'pointer' }}>
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none whitespace-nowrap" style={{ border: 'none', cursor: 'pointer' }}>
                        <PlusCircle className="w-4 h-4" />
                        New Lead
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 shrink-0">
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Active Deals</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">{deals.filter(d => d.column !== 'closed-won').length}</p>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Active Pipeline Value</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">${(totalPipeline / 1000).toFixed(0)}k</p>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Closed This Period</p>
                    <p className="text-2xl font-bold text-emerald-600">${(closedValue / 1000).toFixed(0)}k</p>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="overflow-x-auto pb-4 -mx-4 px-4">
                <div className="flex gap-4" style={{ minWidth: `${columns.length * 300}px` }}>
                    {columns.map((col) => {
                        const colDeals = deals.filter(d => d.column === col.id);
                        return (
                            <div key={col.id} className="flex flex-col w-72 shrink-0">
                                <div className={`flex items-center justify-between px-4 py-3 rounded-xl border mb-3 ${col.headerBg}`}>
                                    <div className="flex items-center gap-2.5">
                                        <div className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                                        <span className={`text-sm font-bold ${col.titleColor}`}>{col.title}</span>
                                    </div>
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${col.badgeBg}`}>{colDeals.length}</span>
                                </div>
                                <div className="flex flex-col gap-3 flex-1">
                                    {colDeals.map(deal => <DealCard key={deal.id} deal={deal} />)}
                                    {colDeals.length === 0 && (
                                        <div className="flex flex-col items-center justify-center py-10 rounded-xl border-2 border-dashed border-slate-200 text-slate-300">
                                            <User className="w-8 h-8 mb-2" />
                                            <p className="text-xs font-medium">No deals here</p>
                                        </div>
                                    )}
                                    <button
                                        className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200 text-sm font-medium mt-1"
                                        style={{ background: 'transparent', cursor: 'pointer' }}
                                    >
                                        <PlusCircle className="w-4 h-4" />
                                        Add Deal
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* EMI Calculator Modal */}
            {showCalc && <EMIModal onClose={() => setShowCalc(false)} />}
        </div>
    );
};

export default Sales;
