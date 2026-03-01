import React, { useState } from 'react';
import { Search, PlusCircle, ChevronDown, MoreHorizontal, Car, FileSpreadsheet } from 'lucide-react';
import toast from 'react-hot-toast';

const vehicles = [
    { id: 1, year: 2024, make: 'Toyota', model: 'RAV4 Hybrid', vin: '2T3BWRFV8RW123456', condition: 'New', price: 38995, status: 'In Stock' },
    { id: 2, year: 2023, make: 'Honda', model: 'Civic Sport', vin: '19XFC2F82PE987654', condition: 'New', price: 27500, status: 'In Transit' },
    { id: 3, year: 2022, make: 'Ford', model: 'F-150 Lariat', vin: '1FTFW1E88NFB55321', condition: 'Used', price: 44800, status: 'In Stock' },
    { id: 4, year: 2024, make: 'BMW', model: '5 Series 530i', vin: 'WBA13BJ01PCL77102', condition: 'New', price: 62450, status: 'In Recon' },
    { id: 5, year: 2021, make: 'Chevrolet', model: 'Traverse LT', vin: '1GNERGKW7MJ212209', condition: 'Used', price: 31200, status: 'In Stock' },
    { id: 6, year: 2023, make: 'Tesla', model: 'Model Y Long Range', vin: '5YJ3E1EA5PF310087', condition: 'Used', price: 49900, status: 'In Transit' },
];

const statusConfig = {
    'In Stock': { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
    'In Transit': { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
    'In Recon': { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
};

const conditionConfig = {
    'New': { bg: 'bg-slate-100', text: 'text-slate-600' },
    'Used': { bg: 'bg-orange-50', text: 'text-orange-600' },
};

const Inventory = () => {
    const [search, setSearch] = useState('');
    const [conditionFilter, setCondition] = useState('All');
    const [statusFilter, setStatus] = useState('All');
    const [openMenuId, setOpenMenuId] = useState(null);

    const filtered = vehicles.filter((v) => {
        const term = search.toLowerCase();
        const matchSearch =
            !term ||
            v.make.toLowerCase().includes(term) ||
            v.model.toLowerCase().includes(term) ||
            v.vin.toLowerCase().includes(term);
        const matchCondition = conditionFilter === 'All' || v.condition === conditionFilter;
        const matchStatus = statusFilter === 'All' || v.status === statusFilter;
        return matchSearch && matchCondition && matchStatus;
    });

    // ── CSV Export ──────────────────────────────────────────────────────────────
    const exportToCSV = () => {
        const headers = ['Year', 'Make', 'Model', 'VIN', 'Condition', 'Price (USD)', 'Status'];
        const rows = vehicles.map(v => [
            v.year,
            v.make,
            v.model,
            v.vin,
            v.condition,
            v.price,
            v.status,
        ]);

        const csvContent = [headers, ...rows]
            .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'nexgile_inventory_export.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast.success('Report generated! Download starting... 📊', { id: 'csv' });
    };

    return (
        <div className="space-y-6">

            {/* ── Page Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
                        Vehicle Inventory Management
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        Real-time tracking of new, used, and in-transit vehicles.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Export CSV Button */}
                    <button
                        onClick={exportToCSV}
                        className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all duration-200 focus:outline-none whitespace-nowrap"
                        style={{ cursor: 'pointer' }}
                    >
                        <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                        Export CSV
                    </button>

                    {/* Add New Vehicle Button */}
                    <button
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none whitespace-nowrap"
                        style={{ border: 'none', cursor: 'pointer' }}
                    >
                        <PlusCircle className="w-4 h-4" />
                        Add New Vehicle
                    </button>
                </div>
            </div>

            {/* ── Filter & Search Bar ── */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by Make, Model, or VIN..."
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200"
                    />
                </div>

                {/* Condition Filter */}
                <div className="relative">
                    <select
                        value={conditionFilter}
                        onChange={(e) => setCondition(e.target.value)}
                        className="appearance-none w-full sm:w-44 pl-4 pr-9 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 cursor-pointer"
                    >
                        <option value="All">Condition: All</option>
                        <option value="New">New</option>
                        <option value="Used">Used</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                {/* Status Filter */}
                <div className="relative">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatus(e.target.value)}
                        className="appearance-none w-full sm:w-44 pl-4 pr-9 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 cursor-pointer"
                    >
                        <option value="All">Status: All</option>
                        <option value="In Stock">In Stock</option>
                        <option value="In Transit">In Transit</option>
                        <option value="In Recon">In Recon</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
            </div>

            {/* ── Data Table ── */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
                                {['Vehicle', 'VIN', 'Condition', 'Price', 'Status', 'Actions'].map((h, i) => (
                                    <th key={h} className={`py-3.5 px-5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ${i === 5 ? 'text-right' : ''}`}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-16 text-center">
                                        <div className="flex flex-col items-center gap-3 text-slate-400">
                                            <Car className="w-10 h-10 opacity-30" />
                                            <p className="text-sm font-medium">No vehicles match your filters.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((v) => {
                                    const sc = statusConfig[v.status];
                                    const cc = conditionConfig[v.condition];
                                    return (
                                        <tr key={v.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors group">
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
                                                        <p className="text-xs text-slate-400 mt-0.5 font-medium">{v.make}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* VIN */}
                                            <td className="py-4 px-5">
                                                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded-md">
                                                    {v.vin}
                                                </span>
                                            </td>

                                            {/* Condition */}
                                            <td className="py-4 px-5">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${cc.bg} ${cc.text}`}>
                                                    {v.condition}
                                                </span>
                                            </td>

                                            {/* Price */}
                                            <td className="py-4 px-5">
                                                <span className="text-sm font-bold text-slate-800 dark:text-white">
                                                    ${v.price.toLocaleString()}
                                                </span>
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
                                                <div className="relative inline-block">
                                                    <button
                                                        onClick={() => setOpenMenuId(openMenuId === v.id ? null : v.id)}
                                                        className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
                                                        style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                                                    >
                                                        <MoreHorizontal className="w-5 h-5" />
                                                    </button>
                                                    {openMenuId === v.id && (
                                                        <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 z-20 py-1 text-sm">
                                                            <button className="w-full text-left px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => setOpenMenuId(null)}>Edit Vehicle</button>
                                                            <button className="w-full text-left px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => setOpenMenuId(null)}>View Details</button>
                                                            <div className="border-t border-slate-100 dark:border-slate-700 mt-1 pt-1">
                                                                <button className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => setOpenMenuId(null)}>Remove</button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer */}
                <div className="px-5 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
                    <p className="text-xs text-slate-500 font-medium">
                        Showing <span className="text-slate-700 dark:text-slate-300 font-semibold">{filtered.length}</span> of{' '}
                        <span className="text-slate-700 dark:text-slate-300 font-semibold">{vehicles.length}</span> vehicles
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="text-xs text-slate-500 font-medium px-3 py-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-40" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} disabled>Previous</button>
                        <span className="text-xs font-semibold bg-blue-600 text-white px-3 py-1.5 rounded-lg">1</span>
                        <button className="text-xs text-slate-500 font-medium px-3 py-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inventory;
