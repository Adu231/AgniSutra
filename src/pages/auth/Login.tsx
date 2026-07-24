import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flame, Eye, EyeOff, AlertCircle, Shield, Wrench, BarChart3,
  Siren, Building, Settings, ArrowRight, ChevronRight, Search,
  ClipboardList
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { DEMO_ACCOUNTS, getRoleRedirect } from '@/constants';
import { toast } from 'sonner';

const roleIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  safety_officer: Shield,
  fire_inspector: ClipboardList,
  maintenance_technician: Wrench,
  facility_manager: BarChart3,
  emergency_responder: Siren,
  fire_department: Building,
  admin: Settings,
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');

  const handleDemoSelect = (account: typeof DEMO_ACCOUNTS[0]) => {
    setForm({ email: account.email, password: account.password });
    setActiveDemo(account.role);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Please enter your email and password.');
      return;
    }
    if (captchaInput.trim().toUpperCase() !== captchaCode) {
      setError('Invalid CAPTCHA code. Please refresh or try again.');
      setCaptchaCode(generateCaptcha());
      setCaptchaInput('');
      return;
    }
    setLoading(true);
    const result = await login(form.email, form.password);
    setLoading(false);
    if (result.success) {
      toast.success('Welcome to AgniSutra!');
      // Determine redirect based on demo account or default
      const demoAccount = DEMO_ACCOUNTS.find(a => a.email === form.email);
      if (demoAccount) {
        navigate(demoAccount.redirectTo, { replace: true });
      } else {
        navigate('/dashboard/safety-officer', { replace: true });
      }
    } else {
      setError(result.error || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-fire relative overflow-hidden flex-col justify-between p-12">
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 mb-16 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-2xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>AgniSutra</span>
          </Link>
          <h2 className="text-4xl font-black text-white leading-tight mb-4">
            India's Leading<br />Fire Safety Platform
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-12">
            AI-powered fire safety management for 2,500+ facilities across India.
          </p>
          <div className="space-y-4">
            {[
              '✓ AI-powered risk assessment & predictions',
              '✓ Real-time IoT device monitoring',
              '✓ Automated compliance tracking',
              '✓ Emergency response coordination',
            ].map(item => (
              <p key={item} className="text-white/90 text-sm">{item}</p>
            ))}
          </div>
        </div>
        <div className="relative z-10">
          <p className="text-white/60 text-sm">Trusted by 2,500+ facilities across 18 states</p>
        </div>
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-24 -translate-x-24" />
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex flex-col items-center justify-start lg:justify-center px-4 sm:px-8 py-8 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link to="/" className="flex items-center justify-center gap-2 mb-8 lg:hidden hover:opacity-90 transition-opacity">
            <div className="w-9 h-9 rounded-xl gradient-fire flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              <span className="gradient-fire-text">Agni</span>Sutra
            </span>
          </Link>

          <h1 className="text-2xl font-black mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Sign In</h1>
          <p className="text-muted-foreground text-sm mb-6">Access your role-based dashboard</p>

          {/* Demo Account Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground font-medium bg-background px-2">Try a Demo Account</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-1 gap-2">
              {DEMO_ACCOUNTS.map((account) => {
                const Icon = roleIconMap[account.role] || Shield;
                const isSelected = activeDemo === account.role;
                return (
                  <button
                    key={account.role}
                    onClick={() => handleDemoSelect(account)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-150 ${
                      isSelected
                        ? 'border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-900/20'
                        : 'border-border hover:border-muted-foreground hover:bg-muted/50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0 ${account.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{account.label}</span>
                        {isSelected && <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded font-medium">Selected</span>}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{account.org}</p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Click any role above to auto-fill credentials, then click Sign In
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or sign in manually</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-sm mb-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Email Address</label>
              <input
                type="email"
                className="input-field"
                placeholder="you@company.com"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                autoComplete="email"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium">Password</label>
                <Link to="/forgot-password" className="text-xs text-red-600 dark:text-red-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  className="input-field pr-12"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {activeDemo && (
                <p className="text-xs text-muted-foreground mt-1">Demo password: <code className="font-mono bg-muted px-1 py-0.5 rounded">demo123</code></p>
              )}
            </div>

            {/* CAPTCHA Challenge */}
            <div className="space-y-2 p-3 bg-muted/20 border border-border rounded-xl">
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Security Verification</label>
              <div className="flex gap-2 items-center">
                <div 
                  className="flex-grow h-10 bg-muted/50 border border-border rounded-lg flex items-center justify-center font-mono font-black tracking-widest text-base select-none relative overflow-hidden bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] bg-[size:8px_8px]"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.15)' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-500/5 to-transparent skew-y-12 scale-y-50" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-500/5 to-transparent -skew-y-12 scale-y-50" />
                  {captchaCode.split('').map((char, index) => (
                    <span 
                      key={index} 
                      className="inline-block transform"
                      style={{ 
                        transform: `rotate(${Math.sin(index * 2) * 15}deg) translateY(${Math.cos(index) * 2}px)`,
                        color: index % 2 === 0 ? 'rgb(239, 68, 68)' : 'rgb(245, 158, 11)'
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCaptchaCode(generateCaptcha());
                    setCaptchaInput('');
                  }}
                  className="px-3 h-10 rounded-lg border border-border hover:bg-muted text-[10px] font-bold uppercase transition-colors shrink-0"
                >
                  Refresh
                </button>
              </div>
              <input
                type="text"
                required
                className="input-field text-center font-mono font-bold uppercase tracking-widest text-xs h-9"
                placeholder="Enter CAPTCHA Code"
                value={captchaInput}
                onChange={e => setCaptchaInput(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full gradient-fire text-white border-0 hover:opacity-90 h-11 text-sm font-semibold group"
              disabled={loading}
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />Signing In...</>
              ) : (
                <>Sign In to Dashboard <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" /></>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-5">
            Don't have an account?{' '}
            <Link to="/register" className="text-red-600 dark:text-red-400 font-medium hover:underline">
              Create free account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
