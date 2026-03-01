import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    CarFront,
    Briefcase,
    Wrench,
    Bell,
    Search,
    Menu,
    X
} from 'lucide-react';

const DashboardLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
        { name: 'Vehicle Inventory', path: '/app/inventory', icon: CarFront },
        { name: 'Sales & Deals', path: '/app/sales', icon: Briefcase },
        { name: 'Service & Parts', path: '/app/service', icon: Wrench },
    ];

    return (
        <div className="h-screen w-full bg-slate-50 flex overflow-hidden font-sans">

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="h-full flex flex-col">
                    {/* Sidebar Header / Logo */}
                    <div className="h-16 flex items-center justify-between px-6 bg-slate-950 border-b border-slate-800 shrink-0">
                        <div className="flex items-center space-x-3">
                            <div className="p-1.5 bg-blue-600/20 rounded-lg border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                                <CarFront className="w-6 h-6 text-blue-500" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-[0.1em]">NEXGILE</span>
                        </div>
                        <button
                            className="lg:hidden text-slate-400 hover:text-white transition-colors p-1"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) => `
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden
                    ${isActive
                                            ? 'bg-blue-600/10 text-blue-500 shadow-[inset_4px_0_0_0_rgba(59,130,246,1)]'
                                            : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                                        }
                  `}
                                >
                                    <Icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${location.pathname.startsWith(item.path) ? 'scale-110' : 'group-hover:scale-110'}`} />
                                    <span className="font-medium tracking-wide">{item.name}</span>
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">

                {/* Topbar */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-10 shrink-0">

                    <div className="flex items-center">
                        <button
                            className="mr-4 lg:hidden text-slate-500 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-lg p-1.5 transition-colors bg-slate-100/50"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Search Bar */}
                        <div className="hidden sm:flex items-center relative w-64 md:w-96 group">
                            <Search className="w-4 h-4 absolute left-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors z-10" />
                            <input
                                type="text"
                                placeholder="Search inventory, customers, deals..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-transparent rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none"
                            />
                        </div>
                    </div>

                    {/* Topbar Right Actions */}
                    <div className="flex items-center space-x-4">
                        <button className="relative p-2 text-slate-400 hover:text-slate-700 transition-colors rounded-full hover:bg-slate-100 focus:outline-none">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>

                        <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>

                        {/* User Avatar */}
                        <div className="flex items-center space-x-2.5 cursor-pointer hover:bg-slate-50 p-1 rounded-full transition-colors">
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="User avatar"
                                className="w-9 h-9 rounded-full border border-slate-200 object-cover"
                            />
                        </div>
                    </div>
                </header>

                {/* Main Scrolling Content Area */}
                <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto h-full">
                        <Outlet />
                    </div>
                </main>
            </div>

        </div>
    );
};

export default DashboardLayout;
