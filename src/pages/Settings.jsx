import React, { useState } from 'react';
import { User, Mail, Lock, Bell, Shield, Palette, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const settingsSections = [
    {
        id: 'profile',
        icon: User,
        label: 'Profile Information',
        color: 'text-blue-600',
        bg: 'bg-blue-50 dark:bg-blue-500/10',
    },
    {
        id: 'security',
        icon: Shield,
        label: 'Security & Password',
        color: 'text-violet-600',
        bg: 'bg-violet-50 dark:bg-violet-500/10',
    },
    {
        id: 'notifications',
        icon: Bell,
        label: 'Notifications',
        color: 'text-amber-600',
        bg: 'bg-amber-50 dark:bg-amber-500/10',
    },
    {
        id: 'appearance',
        icon: Palette,
        label: 'Appearance',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    },
];

const Settings = () => {
    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem('nexgile_user') || '{}');
    const [activeSection, setActiveSection] = useState('profile');

    const [fullName, setFullName] = useState(storedUser.fullName || '');
    const [email, setEmail] = useState(storedUser.email || '');
    const [saved, setSaved] = useState(false);

    const initials = (storedUser.fullName || 'GU')
        .split(' ')
        .map(w => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    const handleSave = (e) => {
        e.preventDefault();
        const updated = { ...storedUser, fullName, email };
        localStorage.setItem('nexgile_user', JSON.stringify(updated));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleLogout = () => {
        localStorage.removeItem('nexgile_user');
        navigate('/');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Settings & Profile</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your account preferences and portal configuration.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* ── Left: Section Nav ── */}
                <div className="lg:col-span-1 space-y-2">
                    {settingsSections.map(({ id, icon: Icon, label, color, bg }) => (
                        <button
                            key={id}
                            onClick={() => setActiveSection(id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left transition-all duration-200 ${activeSection === id
                                    ? 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm'
                                    : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800/60 hover:text-slate-700 dark:hover:text-slate-200'
                                }`}
                            style={{ border: activeSection !== id ? 'none' : undefined, background: activeSection !== id ? 'transparent' : undefined, cursor: 'pointer' }}
                        >
                            <div className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                                <Icon className={`w-4 h-4 ${color}`} />
                            </div>
                            <span className={activeSection === id ? 'text-slate-800 dark:text-white' : ''}>{label}</span>
                        </button>
                    ))}

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all text-left"
                            style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                        >
                            <div className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-500/10 flex items-center justify-center shrink-0">
                                <LogOut className="w-4 h-4 text-red-500" />
                            </div>
                            Log Out
                        </button>
                    </div>
                </div>

                {/* ── Right: Active Section Content ── */}
                <div className="lg:col-span-3">

                    {/* Profile Section */}
                    {activeSection === 'profile' && (
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8">
                            <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Profile Information</h2>

                            {/* Avatar */}
                            <div className="flex items-center gap-5 mb-8 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shrink-0">
                                    <span className="text-white text-xl font-bold">{initials}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800 dark:text-white">{storedUser.fullName || 'Guest User'}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">{storedUser.email || 'No email set'}</p>
                                    <span className="inline-block mt-2 text-xs font-semibold bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 px-2.5 py-0.5 rounded-full">Administrator</span>
                                </div>
                            </div>

                            {/* Edit Form */}
                            <form onSubmit={handleSave} className="space-y-5">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                        <input
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Your full name"
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 pt-2">
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow transition-all"
                                        style={{ border: 'none', cursor: 'pointer' }}
                                    >
                                        Save Changes
                                    </button>
                                    {saved && (
                                        <span className="text-sm text-emerald-600 font-semibold animate-in fade-in">
                                            ✓ Saved successfully!
                                        </span>
                                    )}
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Other Sections - Premium Placeholder */}
                    {activeSection !== 'profile' && (
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 flex flex-col items-center justify-center min-h-[400px]">
                            {settingsSections.filter(s => s.id === activeSection).map(({ icon: Icon, label, color, bg }) => (
                                <div key={label} className="text-center space-y-4">
                                    <div className={`w-16 h-16 rounded-2xl ${bg} flex items-center justify-center mx-auto`}>
                                        <Icon className={`w-8 h-8 ${color}`} />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">{label}</h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs">
                                        This section is coming soon. Configuration options for {label.toLowerCase()} will appear here.
                                    </p>
                                    <span className="inline-block text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-3 py-1.5 rounded-full">
                                        Coming Soon
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Settings;
