import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Star, Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

// ── Floating label input ─────────────────────────────────────────────────────
const GlassInput = ({ icon: Icon, type = 'text', placeholder, value, onChange, right }) => {
    const [focused, setFocused] = useState(false);
    return (
        <div className="relative">
            <div className="absolute left-0 bottom-0 top-0 flex items-center pointer-events-none transition-colors duration-200"
                style={{ color: focused ? 'rgba(99,179,237,0.85)' : 'rgba(255,255,255,0.22)' }}>
                <Icon className="w-4 h-4" />
            </div>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                autoComplete="off"
                style={{
                    display: 'block', width: '100%', paddingLeft: '1.5rem', paddingRight: right ? '2.5rem' : '0.25rem',
                    paddingTop: '0.75rem', paddingBottom: '0.75rem',
                    background: 'transparent', outline: 'none',
                    fontSize: '0.875rem', fontWeight: 500, color: '#fff',
                    borderBottom: focused ? '1px solid rgba(99,179,237,0.65)' : '1px solid rgba(255,255,255,0.12)',
                    boxShadow: focused ? '0 3px 14px -4px rgba(99,179,237,0.22)' : 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                className="placeholder-white/20"
            />
            {right && (
                <div className="absolute right-0 top-0 bottom-0 flex items-center">{right}</div>
            )}
        </div>
    );
};

// ── Main Login component ─────────────────────────────────────────────────────
const Login = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('login'); // 'login' | 'register'
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [switching, setSwitching] = useState(false);

    const clear = () => { setName(''); setEmail(''); setPassword(''); setShowPass(false); };

    const switchMode = (next) => {
        setSwitching(true);
        setTimeout(() => { setMode(next); clear(); setSwitching(false); }, 220);
    };

    // ── Error helper ─────────────────────────────────────────────────────────
    const redError = (msg) => toast.error(msg, {
        id: 'auth-err',
        style: { background: '#ef4444', color: '#fff', fontWeight: 600 },
    });

    // ── Submit logic ─────────────────────────────────────────────────────────
    const handleSubmit = (e) => {
        e.preventDefault();

        if (mode === 'register') {
            if (!name.trim() || !email.trim() || !password.trim()) {
                redError('Please fill all fields before saving!'); return;
            }
            if (password.length < 6) {
                redError('Password must be at least 6 characters.'); return;
            }
            localStorage.setItem('nexgile_user', JSON.stringify({ fullName: name.trim(), email: email.trim(), password }));
            toast.success('Welcome to Nexgile! Your account is ready. ✨', { id: 'reg-ok' });
            switchMode('login');
        } else {
            if (!email.trim() || !password.trim()) {
                redError('Please fill all fields before saving!'); return;
            }
            const raw = localStorage.getItem('nexgile_user');
            if (!raw) { redError('No account found. Please register first.'); return; }
            const user = JSON.parse(raw);
            if (user.email === email.trim() && user.password === password) {
                toast.success('Signed in successfully. Ready to roll! �️', { id: 'login-ok' });
                setTimeout(() => navigate('/app/dashboard'), 550);
            } else {
                toast.error('Invalid credentials. Please try again.', {
                    id: 'login-bad',
                    style: { background: '#ef4444', color: '#fff', fontWeight: 600 },
                });
            }
        }
    };

    return (
        <div
            style={{ minHeight: '100vh', width: '100%', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', fontFamily: 'system-ui, sans-serif', overflow: 'hidden', position: 'relative' }}
        >
            {/* ── Background orbs ── */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
                {/* Blue orb — top left */}
                <div style={{
                    position: 'absolute', top: '-18%', left: '-12%',
                    width: '55vw', height: '55vw', maxWidth: 780, maxHeight: 780, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 68%)',
                    filter: 'blur(90px)',
                }} />
                {/* Purple orb — bottom right */}
                <div style={{
                    position: 'absolute', bottom: '-18%', right: '-12%',
                    width: '50vw', height: '50vw', maxWidth: 720, maxHeight: 720, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(79,70,229,0.16) 0%, rgba(124,58,237,0.1) 45%, transparent 70%)',
                    filter: 'blur(90px)',
                }} />
            </div>

            {/* Dot grid */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.032) 1px, transparent 1px)',
                backgroundSize: '26px 26px',
            }} />

            {/* ── Glass card ── */}
            <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '520px' }}>

                {/* Outer glow halo */}
                <div style={{
                    position: 'absolute', inset: '-1px', borderRadius: '2.5rem', pointerEvents: 'none',
                    background: 'linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(79,70,229,0.06) 60%, transparent 100%)',
                    filter: 'blur(1px)',
                }} />

                <div
                    style={{
                        position: 'relative',
                        borderRadius: '2.5rem',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(60px)',
                        WebkitBackdropFilter: 'blur(60px)',
                        boxShadow: '0 48px 96px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.02) inset, 0 1px 0 rgba(255,255,255,0.1) inset',
                        padding: 'clamp(1.75rem, 5vw, 3rem)',
                        opacity: switching ? 0 : 1,
                        transform: switching ? 'scale(0.97)' : 'scale(1)',
                        transition: 'opacity 0.22s ease, transform 0.22s ease',
                    }}
                >
                    {/* Top inner highlight */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                        background: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.14) 50%, transparent 95%)',
                        borderRadius: '2.5rem 2.5rem 0 0',
                        pointerEvents: 'none',
                    }} />

                    {/* ── Branding ── */}
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            width: 52, height: 52, borderRadius: '1rem', marginBottom: '1rem',
                            background: 'linear-gradient(135deg, #1d4ed8, #6d28d9)',
                            boxShadow: '0 8px 28px rgba(37,99,235,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                        }}>
                            <Star className="w-6 h-6 text-white" fill="white" />
                        </div>
                        <h1 style={{ margin: 0, fontSize: '1.375rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                            Nexgile Automotive Suite
                        </h1>
                        <p style={{ margin: '0.625rem 0 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.32)', lineHeight: 1.6, maxWidth: '340px', marginLeft: 'auto', marginRight: 'auto' }}>
                            The future of automotive retail. Streamline inventory, manage leads, and close deals seamlessly with AI-powered analytics.
                        </p>
                    </div>

                    {/* ── Mode toggle pill ── */}
                    <div style={{ display: 'flex', borderRadius: '1.25rem', padding: '5px', marginBottom: '2rem', marginLeft: 'auto', marginRight: 'auto', width: 230, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', position: 'relative' }}>
                        {/* Sliding pill */}
                        <div style={{
                            position: 'absolute', top: 5, bottom: 5, borderRadius: '0.875rem',
                            width: 'calc(50% - 5px)',
                            left: mode === 'login' ? '5px' : 'calc(50%)',
                            background: 'linear-gradient(135deg, #2563eb, #6d28d9)',
                            boxShadow: '0 4px 12px rgba(37,99,235,0.4)',
                            transition: 'left 0.28s cubic-bezier(0.34,1.56,0.64,1)',
                        }} />
                        {[['login', 'Sign In'], ['register', 'Register']].map(([m, label]) => (
                            <button key={m} type="button" onClick={() => mode !== m && switchMode(m)} style={{
                                flex: 1, position: 'relative', zIndex: 1, border: 'none', background: 'transparent', cursor: 'pointer',
                                padding: '0.5rem', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                                color: mode === m ? '#fff' : 'rgba(255,255,255,0.3)',
                                transition: 'color 0.2s',
                            }}>{label}</button>
                        ))}
                    </div>

                    {/* ── Form heading ── */}
                    <div style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
                        <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>
                            {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
                        </h2>
                        <p style={{ margin: '0.35rem 0 0', fontSize: '0.75rem', color: 'rgba(255,255,255,0.28)' }}>
                            {mode === 'login' ? 'Enter your credentials to continue' : 'Join the Nexgile platform today'}
                        </p>
                    </div>

                    {/* ── Form ── */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                        {mode === 'register' && (
                            <GlassInput icon={User} placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
                        )}

                        <GlassInput icon={Mail} type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />

                        <GlassInput
                            icon={Lock}
                            type={showPass ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            right={
                                <button type="button" onClick={() => setShowPass(p => !p)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'rgba(255,255,255,0.22)', padding: '0 2px' }}>
                                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            }
                        />

                        {mode === 'login' && (
                            <div style={{ textAlign: 'right', marginTop: '-0.5rem' }}>
                                <a href="#" style={{ fontSize: '0.72rem', fontWeight: 500, color: 'rgba(99,179,237,0.55)', textDecoration: 'none' }}
                                    onMouseEnter={e => { e.currentTarget.style.color = 'rgba(99,179,237,0.9)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(99,179,237,0.55)'; }}>
                                    Forgot password?
                                </a>
                            </div>
                        )}

                        {/* ── CTA Button ── */}
                        <button type="submit" style={{
                            marginTop: '0.5rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
                            padding: '0.95rem 1.5rem', border: 'none', cursor: 'pointer', borderRadius: '0.875rem',
                            background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
                            boxShadow: '0 6px 28px rgba(37,99,235,0.38), inset 0 1px 0 rgba(255,255,255,0.15)',
                            color: '#fff', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.015em',
                            transition: 'opacity 0.18s, transform 0.18s, box-shadow 0.18s',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(37,99,235,0.52), inset 0 1px 0 rgba(255,255,255,0.2)'; }}
                            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(37,99,235,0.38), inset 0 1px 0 rgba(255,255,255,0.15)'; }}>
                            <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    {/* ── Footer switch ── */}
                    <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: 'rgba(255,255,255,0.22)' }}>
                        {mode === 'login' ? "Don't have an account? " : 'Already registered? '}
                        <button type="button" onClick={() => switchMode(mode === 'login' ? 'register' : 'login')} style={{
                            border: 'none', background: 'transparent', cursor: 'pointer', padding: 0,
                            fontSize: '0.75rem', fontWeight: 600, color: 'rgba(99,179,237,0.65)',
                            transition: 'color 0.2s',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.color = 'rgba(99,179,237,1)'; }}
                            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(99,179,237,0.65)'; }}>
                            {mode === 'login' ? 'Create one free →' : 'Sign in instead →'}
                        </button>
                    </p>
                </div>

                {/* Bottom credit */}
                <p style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.6rem', color: 'rgba(255,255,255,0.1)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                    Nexgile Automotive · Enterprise Portal · Secured
                </p>
            </div>
        </div>
    );
};

export default Login;
