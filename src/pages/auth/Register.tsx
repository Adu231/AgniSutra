import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame, Eye, EyeOff, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', org: '', role: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState(false);

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

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email is required';
    if (!form.org.trim()) errs.org = 'Organization name is required';
    if (form.password.length < 8) errs.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    if (!agreed) errs.terms = 'You must agree to the terms';
    if (captchaInput.trim().toUpperCase() !== captchaCode) {
      errs.captcha = 'Invalid CAPTCHA code. Please refresh or try again.';
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      if (errs.captcha) {
        setCaptchaCode(generateCaptcha());
        setCaptchaInput('');
      }
      return;
    }

    setLoading(true);
    const result = await register({ name: form.name, email: form.email, password: form.password, organization: form.org });
    setLoading(false);

    if (result.success) {
      toast.success('Account created! Welcome to AgniSutra.');
      navigate('/dashboard');
    } else {
      setErrors({ general: result.error || 'Registration failed. Please try again.' });
    }
  };

  const strength = (() => {
    const p = form.password;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  })();

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'][strength];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 flex-col justify-between p-12">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-red-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-orange-500/15 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-fire flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>AgniSutra</span>
          </Link>
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl font-black text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Start protecting your<br />
            <span className="gradient-fire-text">facilities today</span>
          </h2>
          <p className="text-white/60 mb-8">Free 14-day trial. No credit card required. Full access to all Professional features.</p>
          {['Digital inspections & AI checklists', 'Real-time IoT monitoring dashboard', 'AI-powered risk assessment', 'Emergency response coordination', 'Compliance tracking & reports'].map(feat => (
            <div key={feat} className="flex items-center gap-2 text-white/80 text-sm mb-3">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              {feat}
            </div>
          ))}
        </div>
        <div className="relative z-10 text-white/40 text-xs">© 2025 AgniSutra Technologies Pvt. Ltd.</div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-lg py-8">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-8 h-8 rounded-lg gradient-fire flex items-center justify-center">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              <span className="gradient-fire-text">Agni</span>Sutra
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-black mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Create your account</h1>
            <p className="text-muted-foreground">Start your 14-day free trial — no credit card required</p>
          </div>

          {errors.general && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-sm mb-6">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Full Name *</label>
                <input className="input-field" placeholder="Arjun Mehta" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Work Email *</label>
                <input type="email" className="input-field" placeholder="you@company.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Organization *</label>
                <input className="input-field" placeholder="Your Company Name" value={form.org} onChange={e => setForm(p => ({ ...p, org: e.target.value }))} />
                {errors.org && <p className="text-red-500 text-xs mt-1">{errors.org}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Your Role</label>
                <select className="input-field" value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))}>
                  <option value="">Select role</option>
                  <option>Safety Officer</option>
                  <option>Fire Inspector</option>
                  <option>Facility Manager</option>
                  <option>Maintenance Technician</option>
                  <option>Administrator</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password *</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  className="input-field pr-12"
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor : 'bg-muted'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{strengthLabel}</p>
                </div>
              )}
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Confirm Password *</label>
              <input
                type="password"
                className="input-field"
                placeholder="Repeat password"
                value={form.confirm}
                onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))}
              />
              {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
            </div>
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1 rounded" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
                <span className="text-sm text-muted-foreground">
                  I agree to AgniSutra's{' '}
                  <Link to="/terms" className="text-red-600 dark:text-red-400 hover:underline">Terms of Service</Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-red-600 dark:text-red-400 hover:underline">Privacy Policy</Link>
                </span>
              </label>
              {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
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
              {errors.captcha && <p className="text-red-500 text-xs mt-1">{errors.captcha}</p>}
            </div>
            <Button type="submit" className="w-full gradient-fire text-white border-0 hover:opacity-90 group h-11" disabled={loading}>
              {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" /> : <ArrowRight className="w-4 h-4 mr-2" />}
              {loading ? 'Creating Account...' : 'Create Free Account'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-red-600 dark:text-red-400 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
