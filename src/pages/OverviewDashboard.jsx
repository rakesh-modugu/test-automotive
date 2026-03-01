import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { DollarSign, CarFront, Calendar, Smile, TrendingUp, AlertCircle } from 'lucide-react';

const OverviewDashboard = () => {
    // Dummy Data for Bar Chart
    const revenueData = [
        { name: 'Sep', revenue: 320 },
        { name: 'Oct', revenue: 380 },
        { name: 'Nov', revenue: 410 },
        { name: 'Dec', revenue: 480 },
        { name: 'Jan', revenue: 520 },
        { name: 'Feb', revenue: 580 },
    ];

    // Dummy Data for Pie Chart
    const inventoryData = [
        { name: 'SUVs', value: 45 },
        { name: 'Sedans', value: 30 },
        { name: 'Trucks', value: 15 },
        { name: 'EVs', value: 10 },
    ];
    const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

    // Dummy Data for Recent Activity Table
    const recentTransactions = [
        { id: 1, customer: 'Michael Chen', vehicle: '2024 Model X SUV', type: 'Sale', status: 'Completed', date: '2 Mins Ago' },
        { id: 2, customer: 'Sarah Jenkins', vehicle: 'Sedan 5000 Mile Service', type: 'Service', status: 'Pending', date: '15 Mins Ago' },
        { id: 3, customer: 'David Rodriguez', vehicle: '2023 Performance Truck', type: 'Sale', status: 'Completed', date: '1 Hour Ago' },
        { id: 4, customer: 'Emily Watson', vehicle: 'EV Battery Diagnostic', type: 'Service', status: 'Completed', date: '3 Hours Ago' },
        { id: 5, customer: 'James Smith', vehicle: '2024 Luxury Sedan', type: 'Sale', status: 'Pending', date: '5 Hours Ago' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Header section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Business Intelligence Overview</h1>
                    <p className="text-slate-500 text-sm mt-1">Real-time metrics and performance indicators.</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Live Data Sync</span>
                </div>
            </div>

            {/* TOP ROW: KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

                {/* Card 1: Total Revenue */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <DollarSign className="w-16 h-16 text-blue-600" />
                    </div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-2 bg-blue-50 rounded-lg shrink-0">
                            <DollarSign className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex items-center space-x-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-semibold">
                            <TrendingUp className="w-3 h-3" />
                            <span>+12%</span>
                        </div>
                    </div>
                    <div className="relative z-10">
                        <p className="text-sm font-medium text-slate-500 mb-1">Total Revenue</p>
                        <h3 className="text-3xl font-bold text-slate-800">$2.4M</h3>
                        <p className="text-xs text-slate-400 mt-2">vs. last month ($2.14M)</p>
                    </div>
                </div>

                {/* Card 2: Vehicles in Stock */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <CarFront className="w-16 h-16 text-indigo-600" />
                    </div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-2 bg-indigo-50 rounded-lg shrink-0">
                            <CarFront className="w-6 h-6 text-indigo-600" />
                        </div>
                    </div>
                    <div className="relative z-10">
                        <p className="text-sm font-medium text-slate-500 mb-1">Vehicles in Stock</p>
                        <h3 className="text-3xl font-bold text-slate-800">142</h3>
                        <p className="text-xs text-slate-400 mt-2">Optimal inventory levels maintained</p>
                    </div>
                </div>

                {/* Card 3: Service Appointments */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <Calendar className="w-16 h-16 text-amber-500" />
                    </div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-2 bg-amber-50 rounded-lg shrink-0">
                            <Calendar className="w-6 h-6 text-amber-600" />
                        </div>
                        <div className="flex items-center space-x-1 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full text-xs font-semibold">
                            <AlertCircle className="w-3 h-3" />
                            <span>High Volume</span>
                        </div>
                    </div>
                    <div className="relative z-10">
                        <p className="text-sm font-medium text-slate-500 mb-1">Service Appointments</p>
                        <h3 className="text-3xl font-bold text-slate-800">28</h3>
                        <p className="text-xs text-slate-400 mt-2">Scheduled for today</p>
                    </div>
                </div>

                {/* Card 4: Customer Satisfaction */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <Smile className="w-16 h-16 text-emerald-500" />
                    </div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-2 bg-emerald-50 rounded-lg shrink-0">
                            <Smile className="w-6 h-6 text-emerald-600" />
                        </div>
                    </div>
                    <div className="relative z-10">
                        <p className="text-sm font-medium text-slate-500 mb-1">Customer Satisfaction</p>
                        <h3 className="text-3xl font-bold text-slate-800">94%</h3>
                        <p className="text-xs text-slate-400 mt-2">Based on post-sale surveys</p>
                    </div>
                </div>

            </div>

            {/* MIDDLE ROW: Data Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                {/* Monthly Revenue Growth (Bar Chart) - 60% Width */}
                <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-slate-800 tracking-tight">Monthly Revenue Growth</h3>
                        <p className="text-sm text-slate-500 pb-2 border-b border-slate-100 mt-1 flex justify-between">
                            <span>Past 6 months comparison</span>
                            <span className="font-semibold text-slate-800">In Thousands (USD)</span>
                        </p>
                    </div>
                    <div className="flex-1 w-full min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => [`$${value}k`, 'Revenue']}
                                />
                                <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Inventory Mix (Pie Chart) - 40% Width */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-slate-800 tracking-tight">Inventory Mix</h3>
                        <p className="text-sm text-slate-500 pb-2 border-b border-slate-100 mt-1">Current stock breakdown</p>
                    </div>
                    <div className="flex-1 w-full min-h-[300px] flex flex-col items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={inventoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {inventoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value, name) => [`${value}%`, name]}
                                />
                            </PieChart>
                        </ResponsiveContainer>

                        {/* Custom Legend */}
                        <div className="w-full grid grid-cols-2 gap-x-4 gap-y-3 mt-4">
                            {inventoryData.map((entry, index) => (
                                <div key={entry.name} className="flex items-center space-x-2 text-sm justify-between px-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[index] }}></div>
                                        <span className="text-slate-600 font-medium">{entry.name}</span>
                                    </div>
                                    <span className="font-bold text-slate-800">{entry.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* BOTTOM ROW: Recent Activity Table */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                <div className="mb-6 flex justify-between items-center pb-2 border-b border-slate-100">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 tracking-tight">Recent Activity Tracker</h3>
                        <p className="text-sm text-slate-500 mt-1">Latest transactions and service updates</p>
                    </div>
                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                        View All Reports
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="py-3 px-4 font-semibold text-xs tracking-wider text-slate-500 uppercase rounded-tl-lg">Customer Name</th>
                                <th className="py-3 px-4 font-semibold text-xs tracking-wider text-slate-500 uppercase">Vehicle</th>
                                <th className="py-3 px-4 font-semibold text-xs tracking-wider text-slate-500 uppercase">Type</th>
                                <th className="py-3 px-4 font-semibold text-xs tracking-wider text-slate-500 uppercase">Status</th>
                                <th className="py-3 px-4 font-semibold text-xs tracking-wider text-slate-500 uppercase text-right rounded-tr-lg">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {recentTransactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="py-4 px-4">
                                        <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{tx.customer}</span>
                                    </td>
                                    <td className="py-4 px-4 text-slate-600 font-medium">{tx.vehicle}</td>
                                    <td className="py-4 px-4">
                                        <span className="text-sm font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                                            {tx.type}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold
                      ${tx.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}
                    `}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${tx.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                            <span>{tx.status}</span>
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-slate-400 text-sm text-right align-middle">{tx.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default OverviewDashboard;
