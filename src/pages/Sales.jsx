import React, { useState, useMemo } from 'react';
import { PlusCircle, User, Car, DollarSign, MoreHorizontal, Calculator, X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const sourceConfig = {
    Web: { bg: 'bg-blue-100 dark:bg-blue-500/20', text: 'text-blue-700 dark:text-blue-300' },
    'Walk-in': { bg: 'bg-green-100 dark:bg-green-500/20', text: 'text-green-700 dark:text-green-300' },
    Phone: { bg: 'bg-purple-100 dark:bg-purple-500/20', text: 'text-purple-700 dark:text-purple-300' },
    Referral: { bg: 'bg-orange-100 dark:bg-orange-500/20', text: 'text-orange-700 dark:text-orange-300' },
};

const columns = [
    { id: 'new-leads', title: 'New Leads', color: 'bg-blue-500', headerBg: 'bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20', titleColor: 'text-blue-700 dark:text-blue-300', badgeBg: 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300' },
    { id: 'test-drive', title: 'Test Drive', color: 'bg-amber-500', headerBg: 'bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20', titleColor: 'text-amber-700 dark:text-amber-300', badgeBg: 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300' },
    { id: 'negotiation', title: 'Negotiation & Desking', color: 'bg-orange-500', headerBg: 'bg-orange-50 dark:bg-orange-500/10 border-orange-100 dark:border-orange-500/20', titleColor: 'text-orange-700 dark:text-orange-300', badgeBg: 'bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300' },
    { id: 'fi-credit', title: 'F&I / Credit', color: 'bg-violet-500', headerBg: 'bg-violet-50 dark:bg-violet-500/10 border-violet-100 dark:border-violet-500/20', titleColor: 'text-violet-700 dark:text-violet-300', badgeBg: 'bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300' },
    { id: 'closed-won', title: 'Closed Won', color: 'bg-emerald-500', headerBg: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20', titleColor: 'text-emerald-700 dark:text-emerald-300', badgeBg: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' },
];

const DEFAULT_DEALS = [
    { id: 1, column: 'new-leads', customer: 'Michael Chen', vehicle: '2024 Toyota RAV4 Hybrid', value: 38995, source: 'Web', time: '1 hour ago' },
    { id: 2, column: 'new-leads', customer: 'Priya Sharma', vehicle: '2024 Honda Pilot Elite', value: 51200, source: 'Phone', time: '3 hours ago' },
    { id: 3, column: 'new-leads', customer: 'James Whitfield', vehicle: '2023 Ford Bronco Sport', value: 34750, source: 'Web', time: '5 hours ago' },
    { id: 4, column: 'test-drive', customer: 'Sarah Jenkins', vehicle: '2024 BMW X5 xDrive40i', value: 72800, source: 'Referral', time: '1 day ago' },
    { id: 5, column: 'test-drive', customer: 'David Torres', vehicle: '2023 Tesla Model Y LR', value: 49900, source: 'Walk-in', time: '2 days ago' },
    { id: 6, column: 'negotiation', customer: 'Linda Hoffman', vehicle: '2024 Mercedes GLE 53 AMG', value: 88500, source: 'Referral', time: '2 days ago' },
    { id: 7, column: 'negotiation', customer: 'Ray Ortega', vehicle: '2024 Chevrolet Tahoe LTZ', value: 63200, source: 'Phone', time: '3 days ago' },
    { id: 8, column: 'fi-credit', customer: 'Amanda Willis', vehicle: '2024 Audi Q7 Premium Plus', value: 74990, source: 'Web', time: '4 days ago' },
    { id: 9, column: 'closed-won', customer: 'Tom Richardson', vehicle: '2022 Ford F-150 Lariat', value: 44800, source: 'Walk-in', time: '5 days ago' },
    { id: 10, column: 'closed-won', customer: 'Grace Lee', vehicle: '2023 Honda Civic Sport', value: 27500, source: 'Web', time: '6 days ago' },
    { id: 11, column: 'closed-won', customer: 'Marcus Brown', vehicle: '2023 Jeep Grand Cherokee', value: 52400, source: 'Referral', time: '1 week ago' },
    { id: 12, column: 'closed-won', customer: 'Natalie Park', vehicle: '2024 Hyundai Tucson Hybrid', value: 33700, source: 'Phone', time: '1 week ago' },
];

const avatarColors = ['from-blue-500 to-indigo-600', 'from-violet-500 to-purple-600', 'from-emerald-500 to-teal-600', 'from-rose-500 to-pink-600', 'from-amber-500 to-orange-600'];
const LS_KEY = 'nexgile_leads';
const loadLeads = () => { try { const s = localStorage.getItem(LS_KEY); return s ? JSON.parse(s) : DEFAULT_DEALS; } catch { return DEFAULT_DEALS; } };
const saveLeads = (d) => localStorage.setItem(LS_KEY, JSON.stringify(d));
const redErr = (m) => toast.error(m, { id: 'deal-err', style: { background: '#ef4444', color: '#fff', fontWeight: 600 } });
const inputCls = 'w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all';

// ── Deal Card ──────────────────────────────────────────────────────────────────
const DealCard = ({ deal }) => {
    const sc = sourceConfig[deal.source] || { bg: 'bg-slate-100', text: 'text-slate-600' };
    const ag = avatarColors[deal.id % avatarColors.length];
    const ini = deal.customer.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer group">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${ag} flex items-center justify-center shrink-0 shadow-sm`}>
                        <span className="text-white text-xs font-bold">{ini}</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{deal.customer}</span>
                </div>
                <button className="p-1 rounded-lg text-slate-300 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors opacity-0 group-hover:opacity-100" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}><MoreHorizontal className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-3"><Car className="w-3.5 h-3.5 shrink-0 text-slate-400" /><span className="text-xs font-medium truncate">{deal.vehicle}</span></div>
            <div className="flex items-center gap-1 mb-3"><DollarSign className="w-4 h-4 text-emerald-500" /><span className="text-base font-bold text-slate-800 dark:text-white">{Number(deal.value).toLocaleString()}</span></div>
            <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${sc.bg} ${sc.text}`}>{deal.source}</span>
                <span className="text-xs text-slate-400">{deal.time}</span>
            </div>
        </div>
    );
};

// ── New Lead Modal ─────────────────────────────────────────────────────────────
const BLANK = { customer: '', vehicle: '', value: '', source: 'Web', column: 'new-leads' };
const NewLeadModal = ({ onClose, onAdd }) => {
    const [form, setForm] = useState(BLANK);
    const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.customer.trim() || !form.vehicle.trim() || !form.value) { redErr('Please fill all fields before saving!'); return; }
        onAdd({ id: Date.now(), column: form.column, customer: form.customer.trim(), vehicle: form.vehicle.trim(), value: parseFloat(form.value) || 0, source: form.source, time: 'Just now' });
    };
    return (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 10 }} transition={{ type: 'spring', stiffness: 340, damping: 30 }}>
                <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
                <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center"><User className="w-5 h-5 text-blue-600" /></div>
                        <div><h2 className="text-sm font-bold text-slate-800 dark:text-white">Add New Lead</h2><p className="text-xs text-slate-400 mt-0.5">All fields required</p></div>
                    </div>
                    <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                    <div><label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Customer Name *</label><input value={form.customer} onChange={set('customer')} placeholder="e.g. Rajesh Kumar" className={inputCls} /></div>
                    <div><label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Vehicle of Interest *</label><input value={form.vehicle} onChange={set('vehicle')} placeholder="e.g. 2024 BMW X5" className={inputCls} /></div>
                    <div className="grid grid-cols-2 gap-3">
                        <div><label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Deal Value (USD) *</label><input type="number" value={form.value} onChange={set('value')} placeholder="55000" min="0" className={inputCls} /></div>
                        <div><label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Source</label><select value={form.source} onChange={set('source')} className={inputCls + ' cursor-pointer'}>
                            {['Web', 'Walk-in', 'Phone', 'Referral'].map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                    </div>
                    <div><label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Pipeline Stage</label>
                        <select value={form.column} onChange={set('column')} className={inputCls + ' cursor-pointer'}>
                            {columns.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}</select></div>
                    <div className="flex gap-3 pt-2">
                        <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all" style={{ border: 'none', cursor: 'pointer' }}><CheckCircle className="w-4 h-4" />Add Lead</button>
                        <button type="button" onClick={onClose} className="px-5 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all" style={{ border: 'none', cursor: 'pointer' }}>Cancel</button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

// ── EMI Modal ──────────────────────────────────────────────────────────────────
const SliderRow = ({ label, value, min, max, step = 1, format, onChange }) => (
    <div>
        <div className="flex items-center justify-between mb-2"><label className="text-sm font-semibold text-slate-600 dark:text-slate-300">{label}</label><span className="text-sm font-bold text-blue-600 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400 px-2.5 py-0.5 rounded-full">{format(value)}</span></div>
        <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-600 bg-slate-200 dark:bg-slate-700" />
        <div className="flex justify-between text-xs text-slate-400 mt-1"><span>{format(min)}</span><span>{format(max)}</span></div>
    </div>
);
const fmtUSD = v => `$${v.toLocaleString()}`;
const fmtPct = v => `${v}%`;
const EMIModal = ({ onClose }) => {
    const [carPrice, setCarPrice] = useState(40000); const [down, setDown] = useState(5000); const [rate, setRate] = useState(5.5); const [term, setTerm] = useState(60);
    const { emi, principal, total } = useMemo(() => { const p = Math.max(carPrice - down, 0); if (!p) return { emi: 0, principal: 0, total: down }; const r = (rate / 100) / 12; const e = r === 0 ? p / term : (p * r * Math.pow(1 + r, term)) / (Math.pow(1 + r, term) - 1); return { emi: e, principal: p, total: e * term + down }; }, [carPrice, down, rate, term]);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(4px)' }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-600">
                    <div className="flex items-center gap-3"><div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center"><Calculator className="w-5 h-5 text-white" /></div><div><h2 className="text-base font-bold text-white">Interactive Desking Calculator</h2><p className="text-xs text-blue-100">Real-time deal structuring & EMI estimate</p></div></div>
                    <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white" style={{ border: 'none', cursor: 'pointer' }}><X className="w-5 h-5" /></button>
                </div>
                <div className="px-6 py-5 space-y-5">
                    <SliderRow label="Vehicle Price" value={carPrice} min={10000} max={150000} step={500} format={fmtUSD} onChange={setCarPrice} />
                    <SliderRow label="Down Payment" value={down} min={0} max={Math.min(50000, carPrice - 1000)} step={500} format={fmtUSD} onChange={setDown} />
                    <SliderRow label="Annual Interest Rate" value={rate} min={1} max={15} step={0.1} format={fmtPct} onChange={setRate} />
                    <div><label className="text-sm font-semibold text-slate-600 dark:text-slate-300 block mb-2">Loan Term</label>
                        <div className="flex gap-2">{[24, 36, 48, 60, 72].map(t => <button key={t} onClick={() => setTerm(t)} className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${term === t ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`} style={{ border: 'none', cursor: 'pointer' }}>{t}mo</button>)}</div></div>
                </div>
                <div className="mx-6 mb-6 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 text-center">
                        <p className="text-blue-100 text-xs font-semibold uppercase tracking-widest mb-1">Estimated Monthly Payment</p>
                        <p className="text-4xl font-black text-white">${emi.toLocaleString('en-US', { maximumFractionDigits: 0 })}<span className="text-xl font-medium text-blue-200"> / mo</span></p>
                    </div>
                    <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-slate-700 bg-white dark:bg-slate-800">
                        {[{ label: 'Principal', value: fmtUSD(principal) }, { label: 'Down Payment', value: fmtUSD(down) }, { label: 'Total Cost', value: fmtUSD(Math.round(total)) }].map(({ label, value }) => (
                            <div key={label} className="px-4 py-3 text-center"><p className="text-xs text-slate-400 mb-1">{label}</p><p className="text-sm font-bold text-slate-700 dark:text-white">{value}</p></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ── Sales Page ─────────────────────────────────────────────────────────────────
const Sales = () => {
    const [deals, setDeals] = useState(loadLeads);
    const [showCalc, setShowCalc] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const persist = d => { setDeals(d); saveLeads(d); };
    const handleAdd = lead => { persist([lead, ...deals]); setShowModal(false); toast.success('New lead added to pipeline! 🚀', { id: 'lead-ok' }); };
    const pipeline = deals.filter(d => d.column !== 'closed-won').reduce((s, d) => s + Number(d.value), 0);
    const closed = deals.filter(d => d.column === 'closed-won').reduce((s, d) => s + Number(d.value), 0);
    return (
        <>
            <AnimatePresence>{showModal && <NewLeadModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}</AnimatePresence>
            {showCalc && <EMIModal onClose={() => setShowCalc(false)} />}
            <div className="flex flex-col h-full space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                    <div><h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Sales & Deals Pipeline</h1><p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{deals.length} active leads</p></div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setShowCalc(true)} className="inline-flex items-center gap-2 border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all" style={{ cursor: 'pointer' }}><Calculator className="w-4 h-4" />Calculate EMI</button>
                        <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all" style={{ border: 'none', cursor: 'pointer' }}><PlusCircle className="w-4 h-4" />New Lead</button>
                    </div>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 shrink-0">
                    {[{ label: 'Total Active Deals', value: deals.filter(d => d.column !== 'closed-won').length, color: 'text-slate-800 dark:text-white' }, { label: 'Active Pipeline Value', value: `$${(pipeline / 1000).toFixed(0)}k`, color: 'text-slate-800 dark:text-white' }, { label: 'Closed This Period', value: `$${(closed / 1000).toFixed(0)}k`, color: 'text-emerald-600' }].map(({ label, value, color }) => (
                        <div key={label} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4"><p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{label}</p><p className={`text-2xl font-bold ${color}`}>{value}</p></div>
                    ))}
                </div>
                {/* Kanban */}
                <div className="overflow-x-auto pb-4 -mx-4 px-4">
                    <div className="flex gap-4" style={{ minWidth: `${columns.length * 300}px` }}>
                        {columns.map(col => {
                            const colDeals = deals.filter(d => d.column === col.id);
                            return (
                                <div key={col.id} className="flex flex-col w-72 shrink-0">
                                    <div className={`flex items-center justify-between px-4 py-3 rounded-xl border mb-3 ${col.headerBg}`}>
                                        <div className="flex items-center gap-2.5"><div className={`w-2.5 h-2.5 rounded-full ${col.color}`} /><span className={`text-sm font-bold ${col.titleColor}`}>{col.title}</span></div>
                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${col.badgeBg}`}>{colDeals.length}</span>
                                    </div>
                                    <div className="flex flex-col gap-3 flex-1">
                                        {colDeals.map(deal => <DealCard key={deal.id} deal={deal} />)}
                                        {colDeals.length === 0 && <div className="flex flex-col items-center justify-center py-10 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600"><User className="w-8 h-8 mb-2" /><p className="text-xs font-medium">No deals here</p></div>}
                                        <button onClick={() => setShowModal(true)} className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/5 transition-all text-sm font-medium mt-1" style={{ background: 'transparent', cursor: 'pointer' }}><PlusCircle className="w-4 h-4" />Add Deal</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};
export default Sales;
