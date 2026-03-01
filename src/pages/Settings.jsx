import React, { useState } from 'react';
import { User, Mail, Lock, Bell, Shield, Palette, LogOut, Briefcase, Check, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const sections = [
    { id: 'profile', icon: User, label: 'Profile Information', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-500/10' },
    { id: 'security', icon: Shield, label: 'Security & Password', color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-500/10' },
    { id: 'notifications', icon: Bell, label: 'Notifications', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-500/10' },
    { id: 'appearance', icon: Palette, label: 'Appearance', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
];

const Field = ({ label, value, onChange, type = 'text', placeholder, icon: Icon }) => (
    <div>
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            {label}
        </label>
        <div className="relative">
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            />
        </div>
    </div>
);

const Settings = () => {
    const navigate = useNavigate();

    const getUser = () => JSON.parse(localStorage.getItem('nexgile_user') || '{}');

    const [activeSection, setActiveSection] = useState('profile');
    const [fullName, setFullName] = useState(() => getUser().fullName || '');
    const [email, setEmail] = useState(() => getUser().email || '');
    const [jobTitle, setJobTitle] = useState(() => getUser().jobTitle || '');
    const [saving, setSaving] = useState(false);

    const initials = fullName.trim()
        .split(' ')
        .map(w => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'NU';

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);

        // Simulate a brief loading effect
        await new Promise(r => setTimeout(r, 600));

        const updated = { ...getUser(), fullName, email, jobTitle };
        localStorage.setItem('nexgile_user', JSON.stringify(updated));

        // Broadcast to DashboardLayout so topbar/sidebar update instantly
        window.dispatchEvent(new Event('user-updated'));

        setSaving(false);
        toast.success('Profile updated successfully! ✨', { id: 'profile-save' });
    };

    const handleLogout = () => {
        toast.success('Logged out. See you soon! 👋', { id: 'logout' });
        localStorage.removeItem('nexgile_user');
        setTimeout(() => navigate('/'), 700);
    };

    return (
        <div className="space-y-6">

            {/* ── Header ── */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Settings & Profile</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your account preferences and portal configuration.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* ── Left Nav ── */}
                <div className="lg:col-span-1 space-y-1.5">
                    {sections.map(({ id, icon: Icon, label, color, bg }) => {
                        const active = activeSection === id;
                        return (
                            <button
                                key={id}
                                onClick={() => setActiveSection(id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left transition-all duration-200
                  ${active
                                        ? 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-slate-800 dark:text-white'
                                        : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800/60 hover:text-slate-700 dark:hover:text-slate-200'
                                    }`}
                                style={{ border: active ? undefined : 'none', background: active ? undefined : 'transparent', cursor: 'pointer' }}
                            >
                                <div className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                                    <Icon className={`w-4 h-4 ${color}`} />
                                </div>
                                {label}
                            </button>
                        );
                    })}

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

                {/* ── Right Content ── */}
                <div className="lg:col-span-3">

                    {/* ── Profile Section ── */}
                    {activeSection === 'profile' && (
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Account Settings</h2>

                            {/* Avatar card */}
                            <div className="flex items-center gap-5 mb-8 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shrink-0">
                                    <span className="text-white text-xl font-bold">{initials}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800 dark:text-white">{fullName || 'Nexgile User'}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">{email || 'No email set'}</p>
                                    {jobTitle && <p className="text-xs text-blue-500 font-medium mt-0.5">{jobTitle}</p>}
                                    <span className="inline-block mt-1.5 text-xs font-semibold bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 px-2.5 py-0.5 rounded-full">
                                        Administrator
                                    </span>
                                </div>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSave} className="space-y-5">
                                <Field
                                    label="Full Name"
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                    placeholder="Your full name"
                                    icon={User}
                                />
                                <Field
                                    label="Email Address"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    icon={Mail}
                                />
                                <Field
                                    label="Job Title"
                                    value={jobTitle}
                                    onChange={e => setJobTitle(e.target.value)}
                                    placeholder="e.g. Sales Manager, Fleet Director"
                                    icon={Briefcase}
                                />

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
                                        style={{ border: 'none', cursor: saving ? 'not-allowed' : 'pointer' }}
                                    >
                                        {saving
                                            ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
                                            : <><Check className="w-4 h-4" /> Save Profile</>
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* ── Other sections (Coming Soon) ── */}
                    {activeSection !== 'profile' && (
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 flex flex-col items-center justify-center min-h-[380px]">
                            {sections.filter(s => s.id === activeSection).map(({ icon: Icon, label, color, bg }) => (
                                <div key={label} className="text-center space-y-4">
                                    <div className={`w-16 h-16 rounded-2xl ${bg} flex items-center justify-center mx-auto`}>
                                        <Icon className={`w-8 h-8 ${color}`} />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">{label}</h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs">
                                        Configuration options for {label.toLowerCase()} will appear here in the next release.
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
