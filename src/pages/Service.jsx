import React, { useState, useEffect } from 'react';
import { PlusCircle, ShoppingCart, Car, Wrench, AlertTriangle, CheckCircle, Clock, Package, RefreshCw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// ── Static data ────────────────────────────────────────────────────────────────
const DEFAULT_BAYS = [
    { id: 1, status: 'occupied', vehicle: '2023 Tesla Model 3', customer: 'Amit Sharma', technician: 'Mike T.', initials: 'MT', service: 'Annual Inspection & Brake Service', progress: 65, bayStatus: 'In Repair', bayStatusBg: 'bg-blue-100 dark:bg-blue-500/20', bayStatusText: 'text-blue-700 dark:text-blue-300', eta: '45 min' },
    { id: 2, status: 'occupied', vehicle: '2022 Ford F-150', customer: 'Laura Kim', technician: 'Dave R.', initials: 'DR', service: 'Transmission Fluid Change', progress: 30, bayStatus: 'Waiting Parts', bayStatusBg: 'bg-yellow-100 dark:bg-yellow-500/20', bayStatusText: 'text-yellow-700 dark:text-yellow-300', eta: '2 hrs' },
    { id: 3, status: 'occupied', vehicle: '2024 BMW X5', customer: 'Robert Nguyen', technician: 'Sarah L.', initials: 'SL', service: 'Engine Diagnostic & Oil Service', progress: 80, bayStatus: 'In Repair', bayStatusBg: 'bg-blue-100 dark:bg-blue-500/20', bayStatusText: 'text-blue-700 dark:text-blue-300', eta: '20 min' },
    { id: 4, status: 'occupied', vehicle: '2021 Honda CR-V', customer: 'Priya Desai', technician: 'Carlos M.', initials: 'CM', service: 'AC Compressor Replacement', progress: 50, bayStatus: 'In Repair', bayStatusBg: 'bg-blue-100 dark:bg-blue-500/20', bayStatusText: 'text-blue-700 dark:text-blue-300', eta: '1.5 hrs' },
    { id: 5, status: 'available' },
    { id: 6, status: 'available' },
];

const partsAlerts = [
    { id: 1, name: 'Synthetic Oil 5W-30', sku: 'OIL-5W30-5QT', stock: 4, threshold: 20, unit: 'quarts', autoOrder: true, urgency: 'critical' },
    { id: 2, name: 'Brake Pads – Front (Premium)', sku: 'BRK-FRT-P204', stock: 6, threshold: 15, unit: 'sets', autoOrder: true, urgency: 'critical' },
    { id: 3, name: 'Air Filter – Engine Type B', sku: 'FLT-ENG-B112', stock: 9, threshold: 12, unit: 'units', autoOrder: false, urgency: 'warning' },
    { id: 4, name: 'Cabin Air Filter – Universal', sku: 'FLT-CAB-U88', stock: 11, threshold: 15, unit: 'units', autoOrder: true, urgency: 'warning' },
    { id: 5, name: 'Wiper Blades – 24" Set', sku: 'WBL-24-STD', stock: 14, threshold: 20, unit: 'kits', autoOrder: false, urgency: 'low' },
];

const avatarColors = ['from-blue-500 to-indigo-600', 'from-emerald-500 to-teal-600', 'from-violet-500 to-purple-600', 'from-amber-500 to-orange-600'];

const SERVICE_TYPES = ['Oil Change', 'Brake Service', 'Tire Rotation', 'Engine Diagnostic', 'AC Service', 'Transmission Service', 'Battery Replacement', 'Annual Inspection', 'Suspension Repair', 'Body Work'];

const LS_KEY = 'nexgile_service';
const loadBays = () => { try { const s = localStorage.getItem(LS_KEY); return s ? JSON.parse(s) : DEFAULT_BAYS; } catch { return DEFAULT_BAYS; } };
const saveBays = (d) => localStorage.setItem(LS_KEY, JSON.stringify(d));
const redErr = (m) => toast.error(m, { id: 'svc-err', style: { background: '#ef4444', color: '#fff', fontWeight: 600 } });
const inputCls = 'w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all';

// ── Sub-components ─────────────────────────────────────────────────────────────
const ProgressBar = ({ value, color }) => (
    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
        <div className={`h-2 rounded-full transition-all duration-500 ${color}`} style={{ width: `${value}%` }} />
    </div>
);
const progressColor = p => p >= 75 ? 'bg-emerald-500' : p >= 40 ? 'bg-blue-500' : 'bg-amber-400';

// ── New Appointment Modal ──────────────────────────────────────────────────────
const BLANK = { customer: '', vehicle: '', serviceType: 'Oil Change', technician: '' };
const NewAppointmentModal = ({ onClose, onAdd, nextBayId }) => {
    const [form, setForm] = useState(BLANK);
    const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.customer.trim() || !form.vehicle.trim()) { redErr('Please fill all fields before saving!'); return; }
        const tech = form.technician.trim() || 'Unassigned';
        const ini = tech.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
        onAdd({
            id: Date.now(), status: 'occupied',
            vehicle: form.vehicle.trim(), customer: form.customer.trim(),
            technician: tech, initials: ini,
            service: form.serviceType, progress: 0,
            bayStatus: 'Scheduled', bayStatusBg: 'bg-slate-100 dark:bg-slate-700', bayStatusText: 'text-slate-600 dark:text-slate-300',
            eta: 'TBD',
        });
    };
    return (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 10 }} transition={{ type: 'spring', stiffness: 340, damping: 30 }}>
                <div className="h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500" />
                <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center"><Wrench className="w-5 h-5 text-emerald-600" /></div>
                        <div><h2 className="text-sm font-bold text-slate-800 dark:text-white">Schedule Appointment</h2><p className="text-xs text-slate-400 mt-0.5">Bay {nextBayId} will be assigned</p></div>
                    </div>
                    <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                    <div><label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Customer Name *</label><input value={form.customer} onChange={set('customer')} placeholder="e.g. Amit Sharma" className={inputCls} /></div>
                    <div><label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Car Model *</label><input value={form.vehicle} onChange={set('vehicle')} placeholder="e.g. 2024 Honda City" className={inputCls} /></div>
                    <div><label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Service Type</label>
                        <select value={form.serviceType} onChange={set('serviceType')} className={inputCls + ' cursor-pointer'}>
                            {SERVICE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                    <div><label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Technician (optional)</label><input value={form.technician} onChange={set('technician')} placeholder="e.g. Mike T." className={inputCls} /></div>
                    <div className="flex gap-3 pt-2">
                        <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-all" style={{ border: 'none', cursor: 'pointer' }}><CheckCircle className="w-4 h-4" />Schedule</button>
                        <button type="button" onClick={onClose} className="px-5 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all" style={{ border: 'none', cursor: 'pointer' }}>Cancel</button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

// ── Service Page ───────────────────────────────────────────────────────────────
const Service = () => {
    const [bays, setBays] = useState(loadBays);
    const [showModal, setShowModal] = useState(false);

    const persist = (d) => { setBays(d); saveBays(d); };

    const occupiedBays = bays.filter(b => b.status === 'occupied');
    const availableBays = bays.filter(b => b.status === 'available');
    const nextAvailableId = availableBays.length > 0 ? availableBays[0].id : bays.length + 1;

    const handleAdd = (appt) => {
        const updated = bays.map(b => {
            if (b.id === nextAvailableId) return { ...b, ...appt, id: b.id };
            return b;
        });
        // If no bay was available, push as a new entry
        const wasFilled = updated.some(b => b.id === nextAvailableId && b.status === 'occupied');
        const final = wasFilled ? updated : [...updated, { ...appt, id: Date.now() }];
        persist(final);
        setShowModal(false);
        toast.success('Service appointment scheduled! 🔧', { id: 'svc-ok' });
    };

    return (
        <>
            <AnimatePresence>{showModal && <NewAppointmentModal onClose={() => setShowModal(false)} onAdd={handleAdd} nextBayId={nextAvailableId} />}</AnimatePresence>

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Service & Parts Operations</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Live workshop capacity, technician scheduling, and parts inventory.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="inline-flex items-center gap-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium px-4 py-2.5 rounded-xl shadow-sm transition-all whitespace-nowrap" style={{ cursor: 'pointer' }}>
                            <ShoppingCart className="w-4 h-4" /> Order Parts
                        </button>
                        <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all whitespace-nowrap" style={{ border: 'none', cursor: 'pointer' }}>
                            <PlusCircle className="w-4 h-4" /> Schedule Service
                        </button>
                    </div>
                </div>

                {/* Live Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 flex items-center justify-center shrink-0"><Car className="w-6 h-6 text-emerald-600" /></div>
                        <div className="flex-1"><p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">Active in Workshop</p><p className="text-3xl font-bold text-slate-800 dark:text-white">{occupiedBays.length}</p></div>
                        <div className="flex items-center gap-1.5 shrink-0"><span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" /></span><span className="text-xs font-semibold text-emerald-600">Live</span></div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center shrink-0"><Clock className="w-6 h-6 text-blue-600" /></div>
                        <div><p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">Today's Appointments</p><p className="text-3xl font-bold text-slate-800 dark:text-white">{bays.length}</p></div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-500/10 rounded-2xl p-5 border border-red-100 dark:border-red-500/20 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-500/20 border border-red-200 dark:border-red-500/30 flex items-center justify-center shrink-0"><AlertTriangle className="w-6 h-6 text-red-600" /></div>
                        <div><p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-0.5">Critical Parts Alerts</p><div className="flex items-baseline gap-1.5"><p className="text-3xl font-bold text-red-700 dark:text-red-400">{partsAlerts.filter(p => p.urgency === 'critical').length}</p><span className="text-sm font-semibold text-red-500">Low Stock</span></div></div>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                    {/* Workshop Bays */}
                    <div className="lg:col-span-7 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-bold text-slate-700 dark:text-slate-200">Live Workshop Bays</h2>
                            <span className="text-xs font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">{occupiedBays.length} / {bays.length} Occupied</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {bays.map((bay) => {
                                if (bay.status === 'available') return (
                                    <div key={bay.id} onClick={() => setShowModal(true)} className="rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center p-8 gap-3 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/5 transition-all duration-200 cursor-pointer group">
                                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 flex items-center justify-center transition-colors"><Wrench className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" /></div>
                                        <div className="text-center"><p className="text-sm font-bold text-slate-400 group-hover:text-blue-500 transition-colors">Bay {bay.id}</p><p className="text-xs text-slate-400 mt-0.5">Available · Click to schedule</p></div>
                                    </div>
                                );
                                const ag = avatarColors[(bay.id - 1) % avatarColors.length];
                                return (
                                    <div key={bay.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 hover:shadow-md transition-all duration-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-lg bg-slate-800 dark:bg-slate-700 flex items-center justify-center"><span className="text-white text-[10px] font-bold">{bay.id}</span></div>
                                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Bay {bay.id}</span>
                                            </div>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${bay.bayStatusBg} ${bay.bayStatusText}`}>{bay.bayStatus}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-2"><Car className="w-4 h-4 text-slate-400 shrink-0" /><p className="text-sm font-bold text-slate-800 dark:text-white">{bay.vehicle}</p></div>
                                        <p className="text-xs text-slate-400 mb-3 font-medium">{bay.service}</p>
                                        <div className="mb-3">
                                            <div className="flex justify-between items-center mb-1.5"><span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Progress</span><span className="text-xs font-bold text-slate-700 dark:text-slate-200">{bay.progress}%</span></div>
                                            <ProgressBar value={bay.progress} color={progressColor(bay.progress)} />
                                        </div>
                                        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${ag} flex items-center justify-center shadow-sm`}><span className="text-white text-[10px] font-bold">{bay.initials}</span></div>
                                                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{bay.technician}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-slate-400"><Clock className="w-3 h-3" /><span className="text-xs font-medium">{bay.eta} left</span></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Parts Alerts */}
                    <div className="lg:col-span-3 space-y-4">
                        <div className="flex items-center justify-between"><h2 className="text-base font-bold text-slate-700 dark:text-slate-200">Parts Inventory Alerts</h2><Package className="w-4 h-4 text-slate-400" /></div>
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {partsAlerts.map(part => {
                                    const pct = Math.min((part.stock / part.threshold) * 100, 100);
                                    const isCrit = part.urgency === 'critical';
                                    return (
                                        <div key={part.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <p className="text-xs font-bold text-slate-700 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{part.name}</p>
                                                {part.autoOrder
                                                    ? <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold rounded-full shrink-0"><RefreshCw className="w-2.5 h-2.5" />Auto-Order</span>
                                                    : <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 text-[10px] font-bold rounded-full shrink-0"><AlertTriangle className="w-2.5 h-2.5" />Review</span>}
                                            </div>
                                            <p className="text-[10px] text-slate-400 font-mono mb-2">{part.sku}</p>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-[11px] text-slate-400"><span className={`font-bold ${isCrit ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'}`}>{part.stock}</span>{' / '}{part.threshold} {part.unit}</span>
                                                <span className={`text-[10px] font-bold ${isCrit ? 'text-red-500' : 'text-yellow-500'}`}>{isCrit ? 'Critical' : 'Low'}</span>
                                            </div>
                                            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden"><div className={`h-1.5 rounded-full ${isCrit ? 'bg-red-500' : 'bg-yellow-400'}`} style={{ width: `${pct}%` }} /></div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
                                <button className="w-full text-center text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>View Full Parts Inventory →</button>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-2.5">
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">System Legend</p>
                            {[{ dot: 'bg-emerald-500', label: 'Auto-Order Triggered' }, { dot: 'bg-yellow-400', label: 'Manual Review Needed' }, { dot: 'bg-red-500', label: 'Critical — Order Now' }].map(({ dot, label }) => (
                                <div key={label} className="flex items-center gap-2"><div className={`w-2.5 h-2.5 rounded-full ${dot}`} /><span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</span></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Service;
