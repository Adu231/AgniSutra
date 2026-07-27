import React, { useEffect, useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, BarChart3, Users, Package, TrendingUp, AlertTriangle, Building2, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useNavigate } from 'react-router-dom';

const facilityCompliance = [
  { name: 'Apollo Hospital Main', score: 96, issues: 1, equipment: 142 },
  { name: 'Apollo Diagnostics Center', score: 88, issues: 3, equipment: 68 },
  { name: 'Apollo Childrens Wing', score: 82, issues: 5, equipment: 95 },
  { name: 'Apollo Research Block', score: 71, issues: 8, equipment: 54 },
  { name: 'Apollo Admin Building', score: 91, issues: 2, equipment: 38 },
];

const complianceTrend = [
  { month: 'Mar', score: 84 }, { month: 'Apr', score: 86 }, { month: 'May', score: 88 },
  { month: 'Jun', score: 89 }, { month: 'Jul', score: 91 },
];

const FacilityManagerDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening');
  }, []);

  return (
    <RoleDashboardLayout title="Facility Manager — Overview">
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">{greeting}, {user?.name?.split(' ')[0]} </h2>
            <p className="text-sm text-muted-foreground">{user?.organization} · Facility Manager</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-xs font-medium text-purple-700 dark:text-purple-400">5 Facilities</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Overall Compliance', value: '91%', change: '+3% this month', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10', icon: Shield },
            { label: 'Active Team', value: '24', change: '6 inspectors, 8 techs', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10', icon: Users },
            { label: 'Total Assets', value: '397', change: '12 critical status', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500/10', icon: Package },
            { label: 'Budget Utilized', value: '68%', change: '₹4.2L of ₹6.2L', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/10', icon: DollarSign },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-card border border-border rounded-xl p-5">
                <div className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <div className={`text-2xl font-black ${s.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.change}</div>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-1">Compliance by Facility</h3>
            <p className="text-xs text-muted-foreground mb-4">Current compliance score per facility (Jul 2025)</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={facilityCompliance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} width={130} />
                <Tooltip
                  contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '11px', color: 'hsl(var(--foreground))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                  labelStyle={{ color: 'hsl(var(--muted-foreground))' }} />
                <Bar dataKey="score" fill="#7c3aed" radius={[0, 4, 4, 0]} name="Compliance %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-1">Compliance Trend</h3>
            <p className="text-xs text-muted-foreground mb-4">5-month overall trend</p>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={complianceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis domain={[75, 100]} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '11px', color: 'hsl(var(--foreground))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                  labelStyle={{ color: 'hsl(var(--muted-foreground))' }} />
                <Line type="monotone" dataKey="score" stroke="#7c3aed" strokeWidth={2.5} dot={{ fill: '#7c3aed', r: 3 }} name="Score %" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-3 space-y-2">
              {facilityCompliance.slice(0, 3).map(f => (
                <div key={f.name} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground truncate max-w-[120px]">{f.name.split(' ').slice(-2).join(' ')}</span>
                  <div className="flex items-center gap-1">
                    {f.issues > 0 && <span className="text-red-500">{f.issues} issues</span>}
                    <span className={`font-bold ${f.score >= 90 ? 'text-green-600' : f.score >= 75 ? 'text-orange-600' : 'text-red-600'}`}>{f.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Facility Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {facilityCompliance.map(f => (
            <div key={f.name} className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate('/dashboard/facility-manager/compliance')}>
              <div className="flex items-start justify-between mb-3">
                <Building2 className="w-5 h-5 text-purple-500" />
                <span className={`text-lg font-black ${f.score >= 90 ? 'text-green-600' : f.score >= 75 ? 'text-orange-600' : 'text-red-600'}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{f.score}%</span>
              </div>
              <p className="text-sm font-semibold mb-1">{f.name}</p>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{f.equipment} assets</span>
                <span className={f.issues > 0 ? 'text-red-500' : 'text-green-500'}>{f.issues > 0 ? `${f.issues} open issues` : 'All clear'}</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full mt-3">
                <div className={`h-1.5 rounded-full ${f.score >= 90 ? 'bg-green-500' : f.score >= 75 ? 'bg-orange-500' : 'bg-red-500'}`} style={{ width: `${f.score}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Compliance Monitor', href: '/dashboard/facility-manager/compliance', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800' },
            { label: 'Analytics', href: '/dashboard/facility-manager/analytics', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800' },
            { label: 'Asset Management', href: '/dashboard/facility-manager/assets', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800' },
            { label: 'Team Coordination', href: '/dashboard/facility-manager/teams', color: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' },
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

export default FacilityManagerDashboard;
