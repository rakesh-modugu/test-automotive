import React from 'react';

const Dashboard = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 min-h-[500px] h-full">
            <div className="mb-6 border-b border-slate-100 pb-4">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Platform Overview</h1>
                <p className="text-slate-500 font-medium">Welcome to Nexgile Automotive Retail Portal.</p>
            </div>

            {/* Placeholder content grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center p-6 shadow-inner">
                        <span className="text-slate-400 font-medium">Metric Placeholder {i}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
