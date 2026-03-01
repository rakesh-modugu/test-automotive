import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

// ── Reusable Input ────────────────────────────────────────────────────────────
const Input = ({ id, type = 'text', placeholder, value, onChange, icon: Icon, right }) => {
    const [focused, setFocused] = useState(false);
    return (
        <div className="relative group">
            {/* Icon */}
            <div
                className="absolute left-0 top-0 bottom-0 flex items-center pl-1 pointer-events-none transition-colors duration-200"
                style={{ color: focused ? 'rgba(96,165,250,0.8)' : 'rgba(255,255,255,0.2)' }}
            >
                <Icon className="w-4 h-4" />
            </div>

            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                autoComplete="off"
                className="w-full pl-7 pr-10 py-3 text-sm font-medium text-white placeholder-white/20 bg-transparent outline-none transition-all duration-200"
                style={{
                    borderBottom: focused
                        ? '1px solid rgba(96,165,250,0.6)'
                        : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: focused ? '0 4px 16px -4px rgba(96,165,250,0.2)' : 'none',
                }}
            />

            {/* Right slot */}
            {right && (
                <div className="absolute right-0 top-0 bottom-0 flex items-center">
                    {right}
                </div>
            )}
        </div>
    );
};

// ── Login Page ────────────────────────────────────────────────────────────────
const Login = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('login');     // 'login' | 'register'
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);

    const clearFields = () => { setName(''); setEmail(''); setPassword(''); setShowPass(false); };

    const switchMode = (next) => { setMode(next); clearFields(); };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (mode === 'register') {
            if (password.length < 6) {
                toast.error('Password must be at least 6 characters.', { id: 'pw' });
                return;
            }
            localStorage.setItem('nexgile_user', JSON.stringify({ fullName: name, email, password }));
            toast.success('Account created! Time to sign in. ✨', { id: 'reg' });
            clearFields();
            setMode('login');
        } else {
            const raw = localStorage.getItem('nexgile_user');
            if (!raw) { toast.error('No account found. Please register first.', { id: 'na' }); return; }
            const user = JSON.parse(raw);
            if (user.email === email && user.password === password) {
                toast.success('Welcome back! 🚀', { id: 'ok' });
                setTimeout(() => navigate('/app/dashboard'), 600);
            } else {
                toast.error('Oops! Invalid credentials.', { id: 'bad' });
            }
        }
    };

    return (
        <>
            {/* ── Toaster ── */}
            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        background: 'rgba(2,6,23,0.95)',
                        color: '#e2e8f0',
                        border: '1px solid rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '0.875rem',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                    },
                    success: { iconTheme: { primary: '#34d399', secondary: 'transparent' } },
                    error: { iconTheme: { primary: '#f87171', secondary: 'transparent' } },
                }}
            />

            {/* ── Full-screen wrapper ── */}
            <div
                className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden"
                style={{ background: '#050505', fontFamily: 'system-ui, sans-serif' }}
            >
                {/* Background orbs */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-[20%] -left-[10%] rounded-full"
                        style={{
                            width: '60vw', height: '60vw', maxWidth: 800, maxHeight: 800,
                            background: 'radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 65%)',
                            filter: 'blur(80px)'
                        }} />
                    <div className="absolute -bottom-[20%] -right-[10%] rounded-full"
                        style={{
                            width: '60vw', height: '60vw', maxWidth: 800, maxHeight: 800,
                            background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, rgba(220,38,38,0.10) 50%, transparent 70%)',
                            filter: 'blur(80px)'
                        }} />
                </div>

                {/* Dot grid */}
                <div className="pointer-events-none absolute inset-0"
                    style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

                {/* ── Glass Card ── */}
                <div className="relative z-10 w-full" style={{ maxWidth: '520px' }}>

                    {/* Outer ambient glow ring */}
                    <div className="absolute -inset-[1px] rounded-[2.5rem] pointer-events-none"
                        style={{
                            background: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.08) 50%, rgba(220,38,38,0.06) 100%)',
                            filter: 'blur(1px)',
                        }} />

                    <form
                        onSubmit={handleSubmit}
                        className="relative overflow-hidden"
                        style={{
                            borderRadius: '2.5rem',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            backdropFilter: 'blur(60px)',
                            WebkitBackdropFilter: 'blur(60px)',
                            boxShadow: '0 50px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.02) inset, 0 1px 0 rgba(255,255,255,0.1) inset',
                            padding: 'clamp(2rem, 5vw, 3rem)',
                        }}
                    >
                        {/* Top inner glow strip */}
                        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                            style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.15) 50%, transparent 95%)' }} />

                        {/* ── Branding ── */}
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-2xl shrink-0"
                                style={{
                                    background: 'linear-gradient(135deg, #1d4ed8, #7c3aed)',
                                    boxShadow: '0 8px 32px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
                                }}>
                                <Zap className="w-7 h-7 text-white" fill="white" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-white">Welcome to Nexgile</h1>
                            <p className="text-xs mt-1 font-medium tracking-[0.12em]"
                                style={{ color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>
                                Automotive Retail Portal
                            </p>
                        </div>

                        {/* ── Mode Toggle Pill ── */}
                        <div className="relative flex rounded-2xl p-1 mb-8 mx-auto" style={{
                            width: 240,
                            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)'
                        }}>
                            {/* Sliding indicator */}
                            <div className="absolute top-1 bottom-1 rounded-xl transition-all duration-300 ease-in-out"
                                style={{
                                    width: 'calc(50% - 4px)',
                                    left: mode === 'login' ? '4px' : 'calc(50%)',
                                    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                                    boxShadow: '0 4px 14px rgba(37,99,235,0.4)',
                                }} />
                            {[['login', 'Sign In'], ['register', 'Register']].map(([m, label]) => (
                                <button
                                    key={m}
                                    type="button"
                                    onClick={() => switchMode(m)}
                                    className="relative z-10 flex-1 py-2 text-xs font-bold tracking-wide rounded-xl transition-colors duration-300"
                                    style={{
                                        border: 'none', background: 'transparent', cursor: 'pointer',
                                        textTransform: 'uppercase',
                                        color: mode === m ? '#ffffff' : 'rgba(255,255,255,0.3)',
                                        letterSpacing: '0.06em',
                                    }}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        {/* ── Heading ── */}
                        <div className="mb-7 text-center">
                            <h2 className="text-lg font-bold tracking-tight text-white">
                                {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
                            </h2>
                            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.28)' }}>
                                {mode === 'login'
                                    ? 'Enter your credentials to access the dashboard'
                                    : 'Fill in details below to join the platform'}
                            </p>
                        </div>

                        {/* ── Fields ── */}
                        <div className="space-y-5">

                            {mode === 'register' && (
                                <Input
                                    id="reg-name"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    icon={User}
                                />
                            )}

                            <Input
                                id="auth-email"
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                icon={Mail}
                            />

                            <Input
                                id="auth-password"
                                type={showPass ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                icon={Lock}
                                right={
                                    <button
                                        type="button"
                                        onClick={() => setShowPass(p => !p)}
                                        style={{
                                            border: 'none', background: 'transparent', cursor: 'pointer',
                                            color: 'rgba(255,255,255,0.2)', padding: '0 2px'
                                        }}
                                    >
                                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                }
                            />
                        </div>

                        {/* Forgot password (login only) */}
                        {mode === 'login' && (
                            <div className="flex justify-end mt-3">
                                <a href="#" style={{
                                    textDecoration: 'none', fontSize: '0.75rem', fontWeight: 500,
                                    color: 'rgba(96,165,250,0.55)', letterSpacing: '0.01em'
                                }}
                                    onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(96,165,250,0.9)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(96,165,250,0.55)'; }}>
                                    Forgot password?
                                </a>
                            </div>
                        )}

                        {/* ── Submit Button ── */}
                        <button
                            type="submit"
                            className="group relative w-full flex items-center justify-center gap-2.5 overflow-hidden mt-8"
                            style={{
                                border: 'none', cursor: 'pointer', borderRadius: '0.875rem',
                                padding: '1rem 1.5rem',
                                background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
                                boxShadow: '0 8px 32px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
                                color: '#fff', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.02em',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = '0.92';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                                e.currentTarget.style.boxShadow = '0 14px 40px rgba(37,99,235,0.5), inset 0 1px 0 rgba(255,255,255,0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = '1';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 32px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.15)';
                            }}
                        >
                            {/* Shimmer sweep */}
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
                            <span className="relative">{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                            <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>

                        {/* ── Footer Switch ── */}
                        <p className="mt-6 text-center text-xs" style={{ color: 'rgba(255,255,255,0.22)' }}>
                            {mode === 'login' ? "Don't have an account? " : 'Already registered? '}
                            <button
                                type="button"
                                onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
                                style={{
                                    border: 'none', background: 'transparent', padding: 0, cursor: 'pointer',
                                    color: 'rgba(96,165,250,0.65)', fontWeight: 600, fontSize: 'inherit',
                                    transition: 'color 0.2s',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(96,165,250,1)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(96,165,250,0.65)'; }}
                            >
                                {mode === 'login' ? 'Create one free' : 'Sign in instead'}
                            </button>
                        </p>

                    </form>

                    {/* Bottom credit */}
                    <p className="mt-5 text-center" style={{
                        fontSize: '0.6rem', letterSpacing: '0.18em',
                        color: 'rgba(255,255,255,0.1)', textTransform: 'uppercase'
                    }}>
                        Nexgile Automotive · Enterprise Platform · Secured
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
