import React from 'react';
import { PlusCircle, ShoppingCart, Car, Wrench, AlertTriangle, CheckCircle, Clock, Package, RefreshCw, Zap } from 'lucide-react';

const bays = [
    {
        id: 1, status: 'occupied',
        vehicle: '2023 Tesla Model 3',
        customer: 'Amit Sharma',
        technician: 'Mike T.',
        initials: 'MT',
        service: 'Annual Inspection & Brake Service',
        progress: 65,
        bayStatus: 'In Repair',
        bayStatusColor: 'bg-blue-100 text-blue-700',
        eta: '45 min',
    },
    {
        id: 2, status: 'occupied',
        vehicle: '2022 Ford F-150',
        customer: 'Laura Kim',
        technician: 'Dave R.',
        initials: 'DR',
        service: 'Transmission Fluid Change',
        progress: 30,
        bayStatus: 'Waiting for Parts',
        bayStatusColor: 'bg-yellow-100 text-yellow-700',
        eta: '2 hrs',
    },
    {
        id: 3, status: 'occupied',
        vehicle: '2024 BMW X5',
        customer: 'Robert Nguyen',
        technician: 'Sarah L.',
        initials: 'SL',
        service: 'Engine Diagnostic & Oil Service',
        progress: 80,
        bayStatus: 'In Repair',
        bayStatusColor: 'bg-blue-100 text-blue-700',
        eta: '20 min',
    },
    {
        id: 4, status: 'occupied',
        vehicle: '2021 Honda CR-V',
        customer: 'Priya Desai',
        technician: 'Carlos M.',
        initials: 'CM',
        service: 'AC Compressor Replacement',
        progress: 50,
        bayStatus: 'In Repair',
        bayStatusColor: 'bg-blue-100 text-blue-700',
        eta: '1.5 hrs',
    },
    {
        id: 5, status: 'available'
    },
    {
        id: 6, status: 'available'
    },
];

const partsAlerts = [
    {
        id: 1,
        name: 'Synthetic Oil 5W-30',
        sku: 'OIL-5W30-5QT',
        stock: 4, threshold: 20,
        unit: 'quarts',
        autoOrder: true,
        orderStatus: 'Auto-Order Triggered',
        icon: Zap,
        urgency: 'critical',
    },
    {
        id: 2,
        name: 'Brake Pads – Front (Premium)',
        sku: 'BRK-FRT-P204',
        stock: 6, threshold: 15,
        unit: 'sets',
        autoOrder: true,
        orderStatus: 'Auto-Order Triggered',
        icon: Zap,
        urgency: 'critical',
    },
    {
        id: 3,
        name: 'Air Filter – Engine Type B',
        sku: 'FLT-ENG-B112',
        stock: 9, threshold: 12,
        unit: 'units',
        autoOrder: false,
        orderStatus: 'Manual Review Needed',
        icon: AlertTriangle,
        urgency: 'warning',
    },
    {
        id: 4,
        name: 'Cabin Air Filter – Universal',
        sku: 'FLT-CAB-U88',
        stock: 11, threshold: 15,
        unit: 'units',
        autoOrder: true,
        orderStatus: 'Auto-Order Triggered',
        icon: Zap,
        urgency: 'warning',
    },
    {
        id: 5,
        name: 'Wiper Blades – 24" Set',
        sku: 'WBL-24-STD',
        stock: 14, threshold: 20,
        unit: 'kits',
        autoOrder: false,
        orderStatus: 'In Review',
        icon: Clock,
        urgency: 'low',
    },
];

const avatarColors = [
    'from-blue-500 to-indigo-600',
    'from-emerald-500 to-teal-600',
    'from-violet-500 to-purple-600',
    'from-amber-500 to-orange-600',
];

const ProgressBar = ({ value, color = 'bg-blue-500' }) => (
    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
            className={`h-2 rounded-full transition-all duration-500 ${color}`}
            style={{ width: `${value}%` }}
        />
    </div>
);

const progressColor = (p) => {
    if (p >= 75) return 'bg-emerald-500';
    if (p >= 40) return 'bg-blue-500';
    return 'bg-amber-400';
};

const Service = () => {
    return (
        <div className="space-y-6">
            {/* ── Page Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                        Service & Parts Operations
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Live workshop capacity, technician scheduling, and parts inventory.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-sm font-medium px-4 py-2.5 rounded-xl shadow-sm transition-all duration-200 focus:outline-none whitespace-nowrap">
                        <ShoppingCart className="w-4 h-4" />
                        Order Parts
                    </button>
                    <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none whitespace-nowrap">
                        <PlusCircle className="w-4 h-4" />
                        Schedule Service
                    </button>
                </div>
            </div>

            {/* ── Top Live Metrics ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Active Vehicles */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                        <Car className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Active in Workshop</p>
                        <p className="text-3xl font-bold text-slate-800">14</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-semibold text-emerald-600">Live</span>
                    </div>
                </div>

                {/* Today's Appointments */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                        <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Today's Appointments</p>
                        <p className="text-3xl font-bold text-slate-800">28</p>
                    </div>
                </div>

                {/* Critical Parts Alerts */}
                <div className="bg-red-50 rounded-2xl p-5 border border-red-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-0.5">Critical Parts Alerts</p>
                        <div className="flex items-baseline gap-1.5">
                            <p className="text-3xl font-bold text-red-700">3</p>
                            <span className="text-sm font-semibold text-red-500">Low Stock</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Main Grid: 70% / 30% ── */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">

                {/* LEFT: Workshop Bays (70%) */}
                <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-bold text-slate-700">Live Workshop Bays</h2>
                        <span className="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                            {bays.filter(b => b.status === 'occupied').length} / {bays.length} Occupied
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {bays.map((bay) => {
                            if (bay.status === 'available') {
                                return (
                                    <div
                                        key={bay.id}
                                        className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center p-8 gap-3 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer group"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-slate-200 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                                            <Wrench className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-bold text-slate-400 group-hover:text-blue-500 transition-colors">Bay {bay.id}</p>
                                            <p className="text-xs text-slate-400 mt-0.5">Available</p>
                                        </div>
                                    </div>
                                );
                            }

                            const avatarGrad = avatarColors[(bay.id - 1) % avatarColors.length];
                            return (
                                <div
                                    key={bay.id}
                                    className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-all duration-200"
                                >
                                    {/* Bay Header */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center">
                                                <span className="text-white text-[10px] font-bold">{bay.id}</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bay {bay.id}</span>
                                        </div>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${bay.bayStatusColor}`}>
                                            {bay.bayStatus}
                                        </span>
                                    </div>

                                    {/* Vehicle */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <Car className="w-4 h-4 text-slate-400 shrink-0" />
                                        <p className="text-sm font-bold text-slate-800">{bay.vehicle}</p>
                                    </div>
                                    <p className="text-xs text-slate-400 mb-3 font-medium">{bay.service}</p>

                                    {/* Progress */}
                                    <div className="mb-3">
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-xs text-slate-500 font-medium">Progress</span>
                                            <span className="text-xs font-bold text-slate-700">{bay.progress}%</span>
                                        </div>
                                        <ProgressBar value={bay.progress} color={progressColor(bay.progress)} />
                                    </div>

                                    {/* Footer: Technician + ETA */}
                                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${avatarGrad} flex items-center justify-center shadow-sm`}>
                                                <span className="text-white text-[10px] font-bold">{bay.initials}</span>
                                            </div>
                                            <span className="text-xs font-semibold text-slate-600">{bay.technician}</span>
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

                {/* RIGHT: Parts Inventory Alerts (30%) */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-bold text-slate-700">Parts Inventory Alerts</h2>
                        <Package className="w-4 h-4 text-slate-400" />
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="divide-y divide-slate-100">
                            {partsAlerts.map((part) => {
                                const stockPct = Math.min((part.stock / part.threshold) * 100, 100);
                                const isAuto = part.autoOrder;
                                const isCritical = part.urgency === 'critical';

                                return (
                                    <div key={part.id} className="p-4 hover:bg-slate-50 transition-colors group">
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <p className="text-xs font-bold text-slate-700 leading-tight group-hover:text-blue-600 transition-colors">
                                                {part.name}
                                            </p>
                                            {isAuto ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full shrink-0 whitespace-nowrap">
                                                    <RefreshCw className="w-2.5 h-2.5" />
                                                    Auto-Order
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded-full shrink-0 whitespace-nowrap">
                                                    <AlertTriangle className="w-2.5 h-2.5" />
                                                    Review
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-[10px] text-slate-400 font-mono mb-2">{part.sku}</p>

                                        {/* Stock bar */}
                                        <div className="mb-1.5">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-[11px] text-slate-400">
                                                    <span className={`font-bold ${isCritical ? 'text-red-600' : 'text-yellow-600'}`}>
                                                        {part.stock}
                                                    </span>
                                                    {' / '}{part.threshold} {part.unit}
                                                </span>
                                                <span className={`text-[10px] font-bold ${isCritical ? 'text-red-500' : 'text-yellow-500'}`}>
                                                    {isCritical ? 'Critical' : 'Low'}
                                                </span>
                                            </div>
                                            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                                <div
                                                    className={`h-1.5 rounded-full ${isCritical ? 'bg-red-500' : 'bg-yellow-400'}`}
                                                    style={{ width: `${stockPct}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100">
                            <button className="w-full text-center text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                                View Full Parts Inventory →
                            </button>
                        </div>
                    </div>

                    {/* Quick Legend */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-2.5">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">System Legend</p>
                        {[
                            { dot: 'bg-emerald-500', label: 'Auto-Order Triggered' },
                            { dot: 'bg-yellow-400', label: 'Manual Review Needed' },
                            { dot: 'bg-red-500', label: 'Critical — Order Now' },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center gap-2">
                                <div className={`w-2.5 h-2.5 rounded-full ${item.dot}`} />
                                <span className="text-xs text-slate-500 font-medium">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Service;
