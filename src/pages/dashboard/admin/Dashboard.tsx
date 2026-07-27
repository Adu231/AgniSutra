import React, { useEffect, useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Building2, Users, Activity, CreditCard, TrendingUp, TrendingDown, Shield, AlertOctagon, CheckCircle, Clock } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const signupData = [
  { month: 'Feb', orgs: 8 }, { month: 'Mar', orgs: 12 }, { month: 'Apr', orgs: 15 },
  { month: 'May', orgs: 18 }, { month: 'Jun', orgs: 22 }, { month: 'Jul', orgs: 27 },
];

const revenueData = [
  { month: 'Feb', mrr: 28.4 }, { month: 'Mar', mrr: 31.2 }, { month: 'Apr', mrr: 34.8 },
  { month: 'May', mrr: 37.1 }, { month: 'Jun', mrr: 39.5 }, { month: 'Jul', mrr: 42.3 },
];

const systemHealth = [
  { service: 'API Gateway', status: 'operational', uptime: '99.98%', latency: '42ms' },
  { service: 'Database Cluster', status: 'operational', uptime: '99.99%', latency: '8ms' },
  { service: 'IoT Message Broker', status: 'operational', uptime: '99.95%', latency: '18ms' },
  { service: 'File Storage', status: 'operational', uptime: '99.97%', latency: '120ms' },
  { service: 'Email/SMS Service', status: 'degraded', uptime: '98.20%', latency: '890ms' },
  { service: 'AI Engine', status: 'operational', uptime: '99.92%', latency: '380ms' },
];

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening');
  }, []);

  return (
    <RoleDashboardLayout title="Administrator — Platform Overview">
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">{greeting}, {user?.name?.split(' ')[0]} </h2>
            <p className="text-sm text-muted-foreground">AgniSutra Platform Administration</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-green-700 dark:text-green-400">Platform Healthy</span>
          </div>
        </div>

        {/* Platform Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Organizations', value: '142', change: '+27 this month', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10', icon: Building2, up: true },
            { label: 'Active Users', value: '2,847', change: '+183 this week', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/10', icon: Users, up: true },
            { label: 'Platform Uptime', value: '99.98%', change: 'Last 30 days', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10', icon: Activity, up: null },
            { label: 'MRR', value: '$42.3K', change: '+7% vs Jun', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500/10', icon: CreditCard, up: true },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-card border border-border rounded-xl p-5">
                <div className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center mb-3`}><Icon className={`w-4 h-4 ${s.color}`} /></div>
                <div className={`text-2xl font-black ${s.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                <div className={`text-xs mt-1 flex items-center gap-0.5 ${s.up === true ? 'text-green-500' : s.up === false ? 'text-red-500' : 'text-muted-foreground'}`}>
                  {s.up === true && <TrendingUp className="w-3 h-3" />}
                  {s.change}
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-1">New Signups</h3>
            <p className="text-xs text-muted-foreground mb-4">New organization registrations (Feb–Jul 2025)</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={signupData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '11px', color: 'hsl(var(--foreground))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                  labelStyle={{ color: 'hsl(var(--muted-foreground))' }} />
                <Bar dataKey="orgs" fill="#334155" radius={[4, 4, 0, 0]} name="New Orgs" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-1">Monthly Recurring Revenue</h3>
            <p className="text-xs text-muted-foreground mb-4">MRR trend in USD (Feb–Jul 2025)</p>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#334155" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#334155" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}K`} />
                <Tooltip
                  contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '11px', color: 'hsl(var(--foreground))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                  labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                  formatter={(v: number) => [`$${v}K`, 'MRR']} />
                <Area type="monotone" dataKey="mrr" stroke="#334155" strokeWidth={2.5} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-sm flex items-center gap-2"><Activity className="w-4 h-4 text-green-500" />System Health</h3>
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">5/6 Operational</span>
          </div>
          <div className="divide-y divide-border">
            {systemHealth.map(svc => (
              <div key={svc.service} className="px-4 py-3 flex items-center gap-4">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${svc.status === 'operational' ? 'bg-green-500' : svc.status === 'degraded' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'}`} />
                <p className="text-sm font-medium flex-1">{svc.service}</p>
                <span className={`text-xs px-2 py-0.5 rounded hidden sm:inline ${svc.status === 'operational' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'}`}>{svc.status}</span>
                <span className="text-xs text-muted-foreground">{svc.uptime}</span>
                <span className="text-xs text-muted-foreground hidden md:block">{svc.latency}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Organizations', href: '/dashboard/admin/organizations', color: 'bg-slate-50 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700' },
            { label: 'Users', href: '/dashboard/admin/users', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800' },
            { label: 'Compliance', href: '/dashboard/admin/compliance', color: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' },
            { label: 'Audit Logs', href: '/dashboard/admin/audit', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800' },
            { label: 'Subscriptions', href: '/dashboard/admin/subscriptions', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800' },
            { label: 'Settings', href: '/dashboard/settings', color: 'bg-gray-50 dark:bg-gray-800/30 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-700' },
          ].map(a => (
            <button key={a.label} onClick={() => navigate(a.href)} className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all hover:scale-[1.02] ${a.color}`}>
              {a.label} →
            </button>
          ))}
        </div>
      </div>
    </RoleDashboardLayout>
  );
};

export default AdminDashboard;
