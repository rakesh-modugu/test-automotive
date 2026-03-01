import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Zap, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [mode, setMode] = useState('login'); // 'login' | 'register'
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const switchMode = (next) => {
        setMode(next);
        setError('');
        setFullName('');
        setEmail('');
        setPassword('');
        setShowPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (mode === 'register') {
            const userData = { fullName, email, password };
            localStorage.setItem('nexgile_user', JSON.stringify(userData));
            navigate('/app/dashboard');
        } else {
            const stored = localStorage.getItem('nexgile_user');
            if (!stored) {
                setError('No account found. Please create an account first.');
                return;
            }
            const userData = JSON.parse(stored);
            if (userData.email === email && userData.password === password) {
                navigate('/app/dashboard');
            } else {
                setError('Invalid credentials. Please check your email and password.');
            }
        }
    };

    return (
        <div
            className="min-h-screen w-full bg-slate-950 flex items-center justify-center relative overflow-hidden p-4"
            style={{ fontFamily: 'system-ui, sans-serif' }}
        >
            {/* ── Cinematic Background Glows ── */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] -translate-x-1/4 -translate-y-1/4 rounded-full bg-blue-600 opacity-[0.15] blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] translate-x-1/4 translate-y-1/4 rounded-full bg-violet-700 opacity-[0.15] blur-[140px] pointer-events-none" />

            {/* ── Dot Texture ── */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            />

            {/* ── Centered Glass Card ── */}
            <div className="relative z-10 w-full max-w-md mx-auto">
                <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_0_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)]">

                    {/* ── Logo ── */}
                    <div className="flex flex-col items-center mb-7">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/25 mb-4">
                            <Zap className="w-7 h-7 text-white" fill="white" />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-white">Nexgile Portal</h1>
                        <p className="text-slate-400 text-xs mt-1 tracking-wide">Nexgile Automotive Retail Platform</p>
                    </div>

                    {/* ── Toggle Pill ── */}
                    <div
                        className="relative flex rounded-xl p-1 mb-7"
                        style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                        {/* Sliding blue indicator */}
                        <div
                            className="absolute top-1 bottom-1 rounded-lg bg-blue-600 shadow-lg shadow-blue-500/20 transition-all duration-300 ease-in-out"
                            style={{
                                width: 'calc(50% - 4px)',
                                left: mode === 'login' ? '4px' : 'calc(50%)',
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => switchMode('login')}
                            className="relative z-10 flex-1 py-2 text-sm font-semibold rounded-lg transition-colors duration-300"
                            style={{
                                border: 'none',
                                background: 'transparent',
                                color: mode === 'login' ? '#ffffff' : '#94a3b8',
                                cursor: 'pointer',
                            }}
                        >
                            Sign In
                        </button>
                        <button
                            type="button"
                            onClick={() => switchMode('register')}
                            className="relative z-10 flex-1 py-2 text-sm font-semibold rounded-lg transition-colors duration-300"
                            style={{
                                border: 'none',
                                background: 'transparent',
                                color: mode === 'register' ? '#ffffff' : '#94a3b8',
                                cursor: 'pointer',
                            }}
                        >
                            Create Account
                        </button>
                    </div>

                    {/* ── Form ── */}
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Full Name — Register only */}
                        {mode === 'register' && (
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors duration-300 pointer-events-none" />
                                <input
                                    type="text"
                                    id="login-name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Full Name"
                                    required
                                    className="w-full pl-12 pr-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/60 transition-all duration-300"
                                />
                            </div>
                        )}

                        {/* Email */}
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors duration-300 pointer-events-none" />
                            <input
                                type="email"
                                id="login-email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                                required
                                className="w-full pl-12 pr-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/60 transition-all duration-300"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors duration-300 pointer-events-none" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="login-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                className="w-full pl-12 pr-12 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/60 transition-all duration-300"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors focus:outline-none"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>

                        {/* Forgot Password — Login only */}
                        {mode === 'login' && (
                            <div className="flex justify-end">
                                <a
                                    href="#"
                                    className="text-sm font-medium text-blue-500 hover:text-blue-300 transition-colors"
                                    style={{ textDecoration: 'none' }}
                                >
                                    Forgot password?
                                </a>
                            </div>
                        )}

                        {/* Error Banner */}
                        {error && (
                            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm text-red-400"
                                style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="group relative w-full flex items-center justify-center mt-2 py-3.5 px-6 rounded-xl text-sm font-semibold text-white tracking-wide shadow-lg hover:scale-[1.02] transition-all duration-300 focus:outline-none overflow-hidden"
                            style={{
                                border: 'none',
                                borderRadius: '0.75rem',
                                background: 'linear-gradient(to right, #2563eb, #4f46e5)',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(to right, #3b82f6, #6366f1)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(to right, #2563eb, #4f46e5)'; }}
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                            <span className="relative flex items-center gap-2">
                                {mode === 'login' ? 'Sign In' : 'Create Account'}
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                        </button>

                    </form>

                    {/* ── Footer Link ── */}
                    <div className="mt-7 pt-5 border-t border-white/10 text-center">
                        {mode === 'login' ? (
                            <p className="text-sm text-slate-500">
                                No account yet?{' '}
                                <button
                                    type="button"
                                    onClick={() => switchMode('register')}
                                    className="text-blue-400 font-semibold hover:text-blue-300 transition-colors"
                                    style={{ border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}
                                >
                                    Create one free
                                </button>
                            </p>
                        ) : (
                            <p className="text-sm text-slate-500">
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => switchMode('login')}
                                    className="text-blue-400 font-semibold hover:text-blue-300 transition-colors"
                                    style={{ border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}
                                >
                                    Sign in instead
                                </button>
                            </p>
                        )}
                    </div>

                </div>

                <p className="mt-5 text-center text-xs text-slate-700 tracking-widest uppercase font-medium">
                    Nexgile Automotive · Secured Connection
                </p>
            </div>

        </div>
    );
};

export default Login;
