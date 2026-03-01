import React from 'react';
import { PlusCircle, ShoppingCart, Car, Wrench, AlertTriangle, CheckCircle, Clock, Package, RefreshCw, Zap } from 'lucide-react';

const bays = [
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

const avatarColors = [
    'from-blue-500 to-indigo-600', 'from-emerald-500 to-teal-600',
    'from-violet-500 to-purple-600', 'from-amber-500 to-orange-600',
];

const ProgressBar = ({ value, color }) => (
    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
        <div className={`h-2 rounded-full transition-all duration-500 ${color}`} style={{ width: `${value}%` }} />
    </div>
);

const progressColor = (p) => p >= 75 ? 'bg-emerald-500' : p >= 40 ? 'bg-blue-500' : 'bg-amber-400';

const Service = () => (
    <div className="space-y-6">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Service & Parts Operations</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Live workshop capacity, technician scheduling, and parts inventory.</p>
            </div>
            <div className="flex items-center gap-3">
                <button className="inline-flex items-center gap-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium px-4 py-2.5 rounded-xl shadow-sm transition-all whitespace-nowrap" style={{ cursor: 'pointer' }}>
                    <ShoppingCart className="w-4 h-4" /> Order Parts
                </button>
                <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all whitespace-nowrap" style={{ border: 'none', cursor: 'pointer' }}>
                    <PlusCircle className="w-4 h-4" /> Schedule Service
                </button>
            </div>
        </div>

        {/* ── Live Metrics ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 flex items-center justify-center shrink-0">
                    <Car className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">Active in Workshop</p>
                    <p className="text-3xl font-bold text-slate-800 dark:text-white">14</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                    </span>
                    <span className="text-xs font-semibold text-emerald-600">Live</span>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">Today's Appointments</p>
                    <p className="text-3xl font-bold text-slate-800 dark:text-white">28</p>
                </div>
            </div>

            <div className="bg-red-50 dark:bg-red-500/10 rounded-2xl p-5 border border-red-100 dark:border-red-500/20 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-500/20 border border-red-200 dark:border-red-500/30 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                    <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-0.5">Critical Parts Alerts</p>
                    <div className="flex items-baseline gap-1.5">
                        <p className="text-3xl font-bold text-red-700 dark:text-red-400">3</p>
                        <span className="text-sm font-semibold text-red-500">Low Stock</span>
                    </div>
                </div>
            </div>
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">

            {/* LEFT: Workshop Bays */}
            <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold text-slate-700 dark:text-slate-200">Live Workshop Bays</h2>
                    <span className="text-xs font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                        {bays.filter(b => b.status === 'occupied').length} / {bays.length} Occupied
                    </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {bays.map((bay) => {
                        if (bay.status === 'available') return (
                            <div key={bay.id} className="rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center p-8 gap-3 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/5 transition-all duration-200 cursor-pointer group">
                                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 flex items-center justify-center transition-colors">
                                    <Wrench className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-bold text-slate-400 group-hover:text-blue-500 transition-colors">Bay {bay.id}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">Available</p>
                                </div>
                            </div>
                        );

                        const ag = avatarColors[(bay.id - 1) % avatarColors.length];
                        return (
                            <div key={bay.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 hover:shadow-md transition-all duration-200">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-lg bg-slate-800 dark:bg-slate-700 flex items-center justify-center">
                                            <span className="text-white text-[10px] font-bold">{bay.id}</span>
                                        </div>
                                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Bay {bay.id}</span>
                                    </div>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${bay.bayStatusBg} ${bay.bayStatusText}`}>
                                        {bay.bayStatus}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Car className="w-4 h-4 text-slate-400 shrink-0" />
                                    <p className="text-sm font-bold text-slate-800 dark:text-white">{bay.vehicle}</p>
                                </div>
                                <p className="text-xs text-slate-400 mb-3 font-medium">{bay.service}</p>
                                <div className="mb-3">
                                    <div className="flex justify-between items-center mb-1.5">
                                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Progress</span>
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{bay.progress}%</span>
                                    </div>
                                    <ProgressBar value={bay.progress} color={progressColor(bay.progress)} />
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${ag} flex items-center justify-center shadow-sm`}>
                                            <span className="text-white text-[10px] font-bold">{bay.initials}</span>
                                        </div>
                                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{bay.technician}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-slate-400">
                                        <Clock className="w-3 h-3" />
                                        <span className="text-xs font-medium">{bay.eta} left</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* RIGHT: Parts Alerts */}
            <div className="lg:col-span-3 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold text-slate-700 dark:text-slate-200">Parts Inventory Alerts</h2>
                    <Package className="w-4 h-4 text-slate-400" />
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {partsAlerts.map((part) => {
                            const stockPct = Math.min((part.stock / part.threshold) * 100, 100);
                            const isCrit = part.urgency === 'critical';
                            return (
                                <div key={part.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <p className="text-xs font-bold text-slate-700 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{part.name}</p>
                                        {part.autoOrder ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold rounded-full shrink-0 whitespace-nowrap">
                                                <RefreshCw className="w-2.5 h-2.5" /> Auto-Order
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 text-[10px] font-bold rounded-full shrink-0 whitespace-nowrap">
                                                <AlertTriangle className="w-2.5 h-2.5" /> Review
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-mono mb-2">{part.sku}</p>
                                    <div className="mb-1.5">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[11px] text-slate-400">
                                                <span className={`font-bold ${isCrit ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'}`}>{part.stock}</span>
                                                {' / '}{part.threshold} {part.unit}
                                            </span>
                                            <span className={`text-[10px] font-bold ${isCrit ? 'text-red-500' : 'text-yellow-500'}`}>{isCrit ? 'Critical' : 'Low'}</span>
                                        </div>
                                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                                            <div className={`h-1.5 rounded-full ${isCrit ? 'bg-red-500' : 'bg-yellow-400'}`} style={{ width: `${stockPct}%` }} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
                        <button className="w-full text-center text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                            View Full Parts Inventory →
                        </button>
                    </div>
                </div>

                {/* Legend */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-2.5">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">System Legend</p>
                    {[
                        { dot: 'bg-emerald-500', label: 'Auto-Order Triggered' },
                        { dot: 'bg-yellow-400', label: 'Manual Review Needed' },
                        { dot: 'bg-red-500', label: 'Critical — Order Now' },
                    ].map(({ dot, label }) => (
                        <div key={label} className="flex items-center gap-2">
                            <div className={`w-2.5 h-2.5 rounded-full ${dot}`} />
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default Service;
