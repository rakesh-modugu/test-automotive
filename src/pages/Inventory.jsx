import React, { useState, useEffect, useRef } from 'react';
import { Search, PlusCircle, ChevronDown, MoreHorizontal, Car, FileSpreadsheet, X, Trash2, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Skeleton, TableRowSkeleton } from '../components/Skeleton';

// ── Default seed data ────────────────────────────────────────────────────────
const DEFAULT_VEHICLES = [
    { id: 1, year: 2024, make: 'Toyota', model: 'RAV4 Hybrid', vin: '2T3BWRFV8RW123456', condition: 'New', price: 38995, status: 'In Stock' },
    { id: 2, year: 2023, make: 'Honda', model: 'Civic Sport', vin: '19XFC2F82PE987654', condition: 'New', price: 27500, status: 'In Transit' },
    { id: 3, year: 2022, make: 'Ford', model: 'F-150 Lariat', vin: '1FTFW1E88NFB55321', condition: 'Used', price: 44800, status: 'In Stock' },
    { id: 4, year: 2024, make: 'BMW', model: '5 Series 530i', vin: 'WBA13BJ01PCL77102', condition: 'New', price: 62450, status: 'In Recon' },
    { id: 5, year: 2021, make: 'Chevrolet', model: 'Traverse LT', vin: '1GNERGKW7MJ212209', condition: 'Used', price: 31200, status: 'In Stock' },
    { id: 6, year: 2023, make: 'Tesla', model: 'Model Y Long Range', vin: '5YJ3E1EA5PF310087', condition: 'Used', price: 49900, status: 'In Transit' },
];

const statusConfig = {
    'In Stock': { bg: 'bg-green-100 dark:bg-green-500/20', text: 'text-green-700 dark:text-green-400', dot: 'bg-green-500' },
    'In Transit': { bg: 'bg-blue-100 dark:bg-blue-500/20', text: 'text-blue-700 dark:text-blue-400', dot: 'bg-blue-500' },
    'In Recon': { bg: 'bg-yellow-100 dark:bg-yellow-500/20', text: 'text-yellow-700 dark:text-yellow-400', dot: 'bg-yellow-500' },
};
const conditionConfig = {
    'New': { bg: 'bg-slate-100 dark:bg-slate-700', text: 'text-slate-600 dark:text-slate-300' },
    'Used': { bg: 'bg-orange-50 dark:bg-orange-500/10', text: 'text-orange-600 dark:text-orange-400' },
};

// ── localStorage helpers ─────────────────────────────────────────────────────
const LS_KEY = 'nexgile_inventory';
const loadInventory = () => { try { const s = localStorage.getItem(LS_KEY); return s ? JSON.parse(s) : DEFAULT_VEHICLES; } catch { return DEFAULT_VEHICLES; } };
const saveInventory = (data) => localStorage.setItem(LS_KEY, JSON.stringify(data));

// ── Form field helper ────────────────────────────────────────────────────────
const inputCls = 'w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all';
const BLANK_FORM = { make: '', model: '', year: new Date().getFullYear(), vin: '', condition: 'New', price: '', status: 'In Stock' };

// ── Add Vehicle Modal ────────────────────────────────────────────────────────
const AddVehicleModal = ({ onClose, onAdd }) => {
    const [form, setForm] = useState(BLANK_FORM);
    const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.make.trim() || !form.model.trim() || !form.vin.trim() || !form.price) {
            toast.error('Please fill all fields before saving!', {
                id: 'form-err',
                style: { background: '#ef4444', color: '#fff' },
            });
            return;
        }
        const newVehicle = {
            id: Date.now(),
            year: parseInt(form.year) || new Date().getFullYear(),
            make: form.make.trim(),
            model: form.model.trim(),
            vin: form.vin.trim().toUpperCase(),
            condition: form.condition,
            price: parseFloat(form.price),
            status: form.status,
        };
        onAdd(newVehicle);
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
                onClick={onClose}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            />

            {/* Modal card */}
            <motion.div
                className="relative z-10 w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 10 }}
                transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            >
                {/* Top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                            <Car className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-slate-800 dark:text-white leading-tight">Add New Vehicle</h2>
                            <p className="text-xs text-slate-400 mt-0.5">All fields marked * are required</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                    {/* Make / Model row */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Make *</label>
                            <input value={form.make} onChange={set('make')} placeholder="e.g. Toyota" className={inputCls} />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Model *</label>
                            <input value={form.model} onChange={set('model')} placeholder="e.g. RAV4 Hybrid" className={inputCls} />
                        </div>
                    </div>

                    {/* Year / Condition */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Year</label>
                            <input type="number" value={form.year} onChange={set('year')} min="1990" max="2030" className={inputCls} />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Condition</label>
                            <select value={form.condition} onChange={set('condition')} className={inputCls + ' cursor-pointer'}>
                                <option value="New">New</option>
                                <option value="Used">Used</option>
                            </select>
                        </div>
                    </div>

                    {/* VIN */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">VIN *</label>
                        <input value={form.vin} onChange={set('vin')} placeholder="17-character VIN number" className={inputCls} />
                    </div>

                    {/* Price / Status */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Price (USD) *</label>
                            <input type="number" value={form.price} onChange={set('price')} placeholder="e.g. 42000" min="0" className={inputCls} />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Status</label>
                            <select value={form.status} onChange={set('status')} className={inputCls + ' cursor-pointer'}>
                                <option value="In Stock">In Stock</option>
                                <option value="In Transit">In Transit</option>
                                <option value="In Recon">In Recon</option>
                            </select>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2">
                        <button type="submit"
                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-sm"
                            style={{ border: 'none', cursor: 'pointer' }}>
                            <CheckCircle className="w-4 h-4" />
                            Add to Inventory
                        </button>
                        <button type="button" onClick={onClose}
                            className="px-5 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all"
                            style={{ border: 'none', cursor: 'pointer' }}>
                            Cancel
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

// ── Main Inventory Page ──────────────────────────────────────────────────────
const Inventory = () => {
    const [vehicles, setVehicles] = useState(loadInventory);
    const [search, setSearch] = useState('');
    const [condFilter, setCondFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [openMenuId, setOpenMenuId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const menuRef = useRef(null);

    // Skeleton
    useEffect(() => {
        const t = setTimeout(() => setIsLoading(false), 700);
        return () => clearTimeout(t);
    }, []);

    // Close action menu on outside click
    useEffect(() => {
        const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenuId(null); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const persist = (data) => { setVehicles(data); saveInventory(data); };

    const handleAdd = (vehicle) => {
        const updated = [vehicle, ...vehicles];
        persist(updated);
        setShowModal(false);
        toast.success('New vehicle added to inventory! 🏎️✨', { id: 'add-vehicle' });
    };

    const handleDelete = (id) => {
        const updated = vehicles.filter(v => v.id !== id);
        persist(updated);
        setOpenMenuId(null);
        toast.success('Vehicle removed from inventory.', { id: `del-${id}` });
    };

    const filtered = vehicles.filter((v) => {
        const term = search.toLowerCase();
        const matchSearch = !term || v.make.toLowerCase().includes(term) || v.model.toLowerCase().includes(term) || v.vin.toLowerCase().includes(term);
        const matchCond = condFilter === 'All' || v.condition === condFilter;
        const matchStatus = statusFilter === 'All' || v.status === statusFilter;
        return matchSearch && matchCond && matchStatus;
    });

    // ── CSV Export ───────────────────────────────────────────────────────────
    const exportToCSV = () => {
        const headers = ['Year', 'Make', 'Model', 'VIN', 'Condition', 'Price (USD)', 'Status'];
        const rows = vehicles.map(v => [v.year, v.make, v.model, v.vin, v.condition, v.price, v.status]);
        const csv = [headers, ...rows].map(row => row.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url; link.download = 'nexgile_inventory_export.csv';
        document.body.appendChild(link); link.click();
        document.body.removeChild(link); URL.revokeObjectURL(url);
        toast.success('Report generated! Download starting... 📊', { id: 'csv' });
    };

    // ── Skeleton screen ──────────────────────────────────────────────────────
    if (isLoading) return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                    <div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg h-7 w-72" />
                    <div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg h-3.5 w-52" />
                </div>
                <div className="flex gap-3">
                    <div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-xl h-10 w-28" />
                    <div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-xl h-10 w-36" />
                </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 flex gap-3">
                <div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg flex-1 h-10" />
                <div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg w-44 h-10" />
                <div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg w-44 h-10" />
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="animate-pulse bg-slate-100 dark:bg-slate-800/60 h-11 w-full" />
                <table className="w-full"><tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {Array.from({ length: 6 }).map((_, i) => <TableRowSkeleton key={i} cols={6} />)}
                </tbody></table>
            </div>
        </div>
    );

    return (
        <>
            {/* ── Add Modal ── */}
            <AnimatePresence>
                {showModal && <AddVehicleModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}
            </AnimatePresence>

            <div className="space-y-6">
                {/* ── Header ── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Vehicle Inventory Management</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{vehicles.length} vehicles · Real-time tracking</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={exportToCSV}
                            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all"
                            style={{ cursor: 'pointer' }}>
                            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                            Export CSV
                        </button>
                        <button onClick={() => setShowModal(true)}
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all"
                            style={{ border: 'none', cursor: 'pointer' }}>
                            <PlusCircle className="w-4 h-4" />
                            Add New Vehicle
                        </button>
                    </div>
                </div>

                {/* ── Filters ── */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by Make, Model, or VIN..."
                            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all" />
                    </div>
                    {[
                        { val: condFilter, set: setCondFilter, opts: ['All', 'New', 'Used'], label: 'Condition' },
                        { val: statusFilter, set: setStatusFilter, opts: ['All', 'In Stock', 'In Transit', 'In Recon'], label: 'Status' },
                    ].map(({ val, set, opts, label }) => (
                        <div key={label} className="relative">
                            <select value={val} onChange={e => set(e.target.value)}
                                className="appearance-none w-full sm:w-44 pl-4 pr-9 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all cursor-pointer">
                                {opts.map(o => <option key={o} value={o}>{o === 'All' ? `${label}: All` : o}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                    ))}
                </div>

                {/* ── Table ── */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[800px]">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
                                    {['Vehicle', 'VIN', 'Condition', 'Price', 'Status', 'Actions'].map((h, i) => (
                                        <th key={h} className={`py-3.5 px-5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ${i === 5 ? 'text-right' : ''}`}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {filtered.length === 0 ? (
                                    <tr><td colSpan={6} className="py-16 text-center">
                                        <div className="flex flex-col items-center gap-3 text-slate-400">
                                            <Car className="w-10 h-10 opacity-30" />
                                            <p className="text-sm font-medium">No vehicles match your filters.</p>
                                            <button onClick={() => { setSearch(''); setCondFilter('All'); setStatusFilter('All'); }}
                                                className="text-xs text-blue-500 hover:text-blue-700 font-semibold"
                                                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                                                Clear filters
                                            </button>
                                        </div>
                                    </td></tr>
                                ) : (
                                    filtered.map((v) => {
                                        const sc = statusConfig[v.status] || statusConfig['In Stock'];
                                        const cc = conditionConfig[v.condition] || conditionConfig['New'];
                                        return (
                                            <motion.tr key={v.id}
                                                initial={{ opacity: 0, y: -6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{ duration: 0.2 }}
                                                className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors group">
                                                {/* Vehicle */}
                                                <td className="py-4 px-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                                            <Car className="w-5 h-5 text-slate-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 transition-colors">
                                                                {v.year} {v.make} {v.model}
                                                            </p>
                                                            <p className="text-xs text-slate-400 mt-0.5">{v.make}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                {/* VIN */}
                                                <td className="py-4 px-5">
                                                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded-md">{v.vin}</span>
                                                </td>
                                                {/* Condition */}
                                                <td className="py-4 px-5">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${cc.bg} ${cc.text}`}>{v.condition}</span>
                                                </td>
                                                {/* Price */}
                                                <td className="py-4 px-5">
                                                    <span className="text-sm font-bold text-slate-800 dark:text-white">${Number(v.price).toLocaleString()}</span>
                                                </td>
                                                {/* Status */}
                                                <td className="py-4 px-5">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${sc.bg} ${sc.text}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                                                        {v.status}
                                                    </span>
                                                </td>
                                                {/* Actions */}
                                                <td className="py-4 px-5 text-right">
                                                    <div className="relative inline-block" ref={openMenuId === v.id ? menuRef : null}>
                                                        <button onClick={() => setOpenMenuId(openMenuId === v.id ? null : v.id)}
                                                            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                                            style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                                                            <MoreHorizontal className="w-5 h-5" />
                                                        </button>
                                                        <AnimatePresence>
                                                            {openMenuId === v.id && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, scale: 0.92, y: -4 }}
                                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                    exit={{ opacity: 0, scale: 0.92, y: -4 }}
                                                                    transition={{ duration: 0.15 }}
                                                                    className="absolute right-0 mt-1 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 z-20 py-1 text-sm overflow-hidden">
                                                                    <button className="w-full text-left px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                                                        style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => setOpenMenuId(null)}>
                                                                        Edit Vehicle
                                                                    </button>
                                                                    <button className="w-full text-left px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                                                        style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => setOpenMenuId(null)}>
                                                                        View Details
                                                                    </button>
                                                                    <div className="border-t border-slate-100 dark:border-slate-700 mt-1 pt-1">
                                                                        <button
                                                                            className="w-full text-left px-4 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center gap-2"
                                                                            style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                                                                            onClick={() => handleDelete(v.id)}>
                                                                            <Trash2 className="w-3.5 h-3.5" />
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="px-5 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
                        <p className="text-xs text-slate-500 font-medium">
                            Showing <span className="text-slate-700 dark:text-slate-300 font-semibold">{filtered.length}</span> of{' '}
                            <span className="text-slate-700 dark:text-slate-300 font-semibold">{vehicles.length}</span> vehicles
                        </p>
                        <div className="flex items-center gap-2">
                            <button className="text-xs text-slate-500 font-medium px-3 py-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-40"
                                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} disabled>Previous</button>
                            <span className="text-xs font-semibold bg-blue-600 text-white px-3 py-1.5 rounded-lg">1</span>
                            <button className="text-xs text-slate-500 font-medium px-3 py-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Inventory;
