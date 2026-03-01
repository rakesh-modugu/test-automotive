import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/app');
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

                    {/* Logo & Heading */}
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/25 mb-5">
                            <Zap className="w-7 h-7 text-white" fill="white" />
                        </div>
                        <h1 className="text-[1.6rem] font-semibold tracking-tight text-white mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-slate-400 text-sm">
                            Secure access to Nexgile Dealership Portal
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-4">

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
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-0 m-0 bg-transparent border-0 text-slate-500 hover:text-white transition-colors focus:outline-none"
                                style={{ borderRadius: 0, padding: 0 }}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2.5 cursor-pointer group">
                                <div className="relative flex items-center justify-center shrink-0">
                                    <input type="checkbox" className="peer sr-only" defaultChecked />
                                    <div className="w-4 h-4 rounded border border-white/20 bg-white/5 peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-200" />
                                    <ShieldCheck className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" strokeWidth={3} />
                                </div>
                                <span className="text-sm text-slate-400 group-hover:text-white transition-colors select-none">
                                    Remember me
                                </span>
                            </label>
                            <a
                                href="#"
                                className="text-sm font-medium text-blue-500 hover:text-blue-300 transition-colors"
                                style={{ textDecoration: 'none' }}
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            className="group relative w-full flex items-center justify-center mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-sm font-semibold text-white tracking-wide shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:ring-offset-2 focus:ring-offset-slate-950 overflow-hidden"
                            style={{ border: 'none', borderRadius: '0.75rem' }}
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                            <span className="relative flex items-center gap-2">
                                Sign In
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                        </button>

                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-white/10 text-center">
                        <p className="text-sm text-slate-500">
                            Need access?{' '}
                            <a
                                href="#"
                                className="text-slate-300 font-medium hover:text-blue-400 transition-colors"
                                style={{ textDecoration: 'underline', textUnderlineOffset: '4px' }}
                            >
                                Contact System Admin
                            </a>
                        </p>
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
