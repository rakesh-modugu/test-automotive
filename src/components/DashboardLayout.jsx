import React, { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
    LayoutDashboard,
    CarFront,
    Briefcase,
    Wrench,
    Settings,
    Bell,
    Search,
    Menu,
    X,
    Sun,
    Moon,
    LogOut,
    ChevronDown,
} from 'lucide-react';

const navItems = [
    { name: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Vehicle Inventory', path: '/app/inventory', icon: CarFront },
    { name: 'Sales & Deals', path: '/app/sales', icon: Briefcase },
    { name: 'Service & Parts', path: '/app/service', icon: Wrench },
    { name: 'Settings', path: '/app/settings', icon: Settings },
];

const DashboardLayout = () => {
    const navigate = useNavigate();
    const dropRef = useRef(null);

    // ── User data in state (re-syncs on 'user-updated' event) ─────────────
    const readUser = () => JSON.parse(localStorage.getItem('nexgile_user') || 'null');
    const [userData, setUserData] = useState(readUser);
    const displayName = userData?.fullName || '';
    const displayEmail = userData?.email || '';
    const initials = displayName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '??';

    useEffect(() => { if (!userData) handleLogout(); }, []); // eslint-disable-line

    // Re-sync when Settings page dispatches 'user-updated'
    useEffect(() => {
        const onUserUpdated = () => setUserData(readUser());
        window.addEventListener('user-updated', onUserUpdated);
        return () => window.removeEventListener('user-updated', onUserUpdated);
    }, []);

    // ── Theme ─────────────────────────────────────────────────────────
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('nexgile_theme');
        return saved ? saved === 'dark' : true; // default: dark
    });

    useEffect(() => {
        const html = document.documentElement;
        // Ensure ONLY one class exists at a time
        html.classList.remove('dark', 'light');
        html.classList.add(isDark ? 'dark' : 'light');
        localStorage.setItem('nexgile_theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(p => !p);
        toast('Theme updated!', { icon: '🌓', id: 'theme' });
    };

    // ── Mobile + Dropdown ─────────────────────────────────────────────
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const onOutsideClick = (e) => {
            if (dropRef.current && !dropRef.current.contains(e.target)) setIsDropdownOpen(false);
        };
        document.addEventListener('mousedown', onOutsideClick);
        return () => document.removeEventListener('mousedown', onOutsideClick);
    }, []);

    // ── Logout ────────────────────────────────────────────────────────
    const handleLogout = () => {
        toast.success('Logged out. See you soon! 👋', { id: 'logout' });
        localStorage.removeItem('nexgile_user');
        setTimeout(() => navigate('/'), 700);
    };

    return (
        <div className="h-screen w-full flex overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">

            {/* Mobile overlay */}
            {isMobileOpen && (
                <div className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileOpen(false)} />
            )}

            {/* ──────────────── SIDEBAR ──────────────── */}
            <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-300
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="h-full flex flex-col">

                    {/* Logo */}
                    <div className="h-16 flex items-center justify-between px-6 bg-slate-950 border-b border-slate-800 shrink-0">
                        <div className="flex items-center space-x-3">
                            <div className="p-1.5 bg-blue-600/20 rounded-lg border border-blue-500/20">
                                <CarFront className="w-6 h-6 text-blue-500" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-[0.1em]">NEXGILE</span>
                        </div>
                        <button className="lg:hidden text-slate-400 hover:text-white p-1"
                            onClick={() => setIsMobileOpen(false)}
                            style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Nav links */}
                    <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                        {navItems.map(({ name, path, icon: Icon }) => (
                            <NavLink key={name} to={path} onClick={() => setIsMobileOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive
                                        ? 'bg-blue-600/10 text-blue-400 shadow-[inset_4px_0_0_0_rgba(96,165,250,1)]'
                                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-blue-400' : ''} group-hover:scale-110 transition-transform`} />
                                        <span className="font-medium tracking-wide">{name}</span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Sidebar user panel */}
                    <div className="p-4 border-t border-slate-800 shrink-0">
                        <div className="flex items-center space-x-3 px-3 py-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
                                <span className="text-white text-xs font-bold">{initials}</span>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-semibold text-white truncate">{displayName}</p>
                                <p className="text-xs text-slate-400 truncate">{displayEmail}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* ──────────────── MAIN AREA ──────────────── */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">

                {/* ── TOPBAR ── */}
                <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 z-10 shrink-0 transition-colors duration-300">

                    {/* Left */}
                    <div className="flex items-center gap-3">
                        <button className="lg:hidden text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            onClick={() => setIsMobileOpen(true)}
                            style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="hidden sm:flex items-center relative w-64 md:w-80 group">
                            <Search className="w-4 h-4 absolute left-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors z-10 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search inventory, customers..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:bg-white dark:focus:bg-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                            />
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-2 sm:gap-3">

                        {/* Theme toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 focus:outline-none"
                            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                        >
                            {isDark
                                ? <Sun className="w-5 h-5 text-amber-400" />
                                : <Moon className="w-5 h-5 text-slate-600" />
                            }
                        </button>

                        {/* Notification bell */}
                        <button
                            className="relative p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all focus:outline-none"
                            style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
                        </button>

                        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 hidden sm:block" />

                        {/* Avatar + Dropdown */}
                        <div className="relative" ref={dropRef}>
                            <button
                                onClick={() => setIsDropdownOpen(p => !p)}
                                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all focus:outline-none"
                                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm shrink-0">
                                    <span className="text-white text-xs font-bold">{initials}</span>
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-tight truncate max-w-[100px]">{displayName}</p>
                                    <p className="text-[10px] text-slate-400 leading-tight">Administrator</p>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-64 rounded-2xl shadow-xl border z-50 overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                                    {/* User info */}
                                    <div className="px-4 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow shrink-0">
                                            <span className="text-white text-sm font-bold">{initials}</span>
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{displayName}</p>
                                            <p className="text-xs text-slate-400 truncate">{displayEmail}</p>
                                        </div>
                                    </div>

                                    {/* Settings link */}
                                    <div className="px-2 py-2 border-b border-slate-100 dark:border-slate-800">
                                        <button onClick={() => { setIsDropdownOpen(false); navigate('/app/settings'); }}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                                            style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                                            <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                                <Settings className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                            </div>
                                            Settings & Profile
                                        </button>
                                    </div>

                                    {/* Logout */}
                                    <div className="px-2 py-2">
                                        <button onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-left"
                                            style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                                            <div className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
                                                <LogOut className="w-4 h-4 text-red-500" />
                                            </div>
                                            Log out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* ── MAIN CONTENT ── */}
                <main className="h-[calc(100vh-64px)] overflow-y-auto p-4 sm:p-6 lg:p-8 transition-colors duration-300 bg-slate-100 dark:bg-slate-950">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>

        </div>
    );
};

export default DashboardLayout;
