import React, { useEffect, useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, AlertOctagon, Calendar, Zap, TrendingUp, TrendingDown, Clock, MapPin, ArrowRight } from 'lucide-react';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const complianceData = [
  { month: 'Jan', score: 72 }, { month: 'Feb', score: 76 }, { month: 'Mar', score: 80 },
  { month: 'Apr', score: 78 }, { month: 'May', score: 85 }, { month: 'Jun', score: 88 }, { month: 'Jul', score: 94 },
];

const facilities = [
  { name: 'Main Building', score: 96, color: 'bg-green-500' },
  { name: 'Warehouse B', score: 88, color: 'bg-green-500' },
  { name: 'Data Center', score: 82, color: 'bg-yellow-500' },
  { name: 'Office Block C', score: 71, color: 'bg-orange-500' },
  { name: 'Parking Complex', score: 65, color: 'bg-red-500' },
];

const recentInspections = [
  { id: 'INS-088', facility: 'Main Building', type: 'Monthly Fire Inspection', status: 'completed', score: 96, date: 'Jul 20' },
  { id: 'INS-087', facility: 'Warehouse B', type: 'Equipment Audit', status: 'completed', score: 88, date: 'Jul 18' },
  { id: 'INS-086', facility: 'Data Center', type: 'Sprinkler Check', status: 'pending', score: null, date: 'Jul 28' },
  { id: 'INS-085', facility: 'Office Block C', type: 'Exit Light Audit', status: 'overdue', score: null, date: 'Jul 15' },
];

const SafetyOfficerDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening');
  }, []);

  const stats = [
    { label: 'Compliance Score', value: '94%', change: '+6% this quarter', icon: Shield, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10', up: true },
    { label: 'Open Issues', value: '3', change: '1 critical pending', icon: AlertOctagon, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10', up: false },
    { label: 'Inspections Due', value: '8', change: 'Before month end', icon: Calendar, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500/10', up: null },
    { label: 'Equipment Critical', value: '2', change: 'Need immediate attention', icon: Zap, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-500/10', up: null },
  ];

  const statusStyle: Record<string, string> = {
    completed: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    pending: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
    overdue: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  };

  return (
    <RoleDashboardLayout title="Safety Officer — Command Center">
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {greeting}, {user?.name?.split(' ')[0]} 👋
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">{user?.organization} · Safety Officer</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-green-700 dark:text-green-400">Active</span>
          </div>
        </div>

        {/* Alert Banner */}
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl px-4 py-3 flex items-center gap-3">
          <AlertOctagon className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
          <div className="flex-1">
            <span className="text-sm font-semibold text-orange-700 dark:text-orange-400">Action Required: </span>
            <span className="text-sm text-orange-600 dark:text-orange-500">2 equipment items due for inspection. 1 critical issue (Office Block C Exit Light) pending resolution.</span>
          </div>
          <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/40 flex-shrink-0 text-xs" onClick={() => navigate('/dashboard/safety-officer/issues')}>
            Resolve
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-card border border-border rounded-xl p-5">
                <div className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <div className={`text-2xl font-black ${s.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5 font-medium">{s.label}</div>
                <div className={`text-xs mt-1 flex items-center gap-0.5 ${s.up === true ? 'text-green-500' : s.up === false ? 'text-red-500' : 'text-muted-foreground'}`}>
                  {s.up === true && <TrendingUp className="w-3 h-3" />}
                  {s.up === false && <TrendingDown className="w-3 h-3" />}
                  {s.change}
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">Compliance Score Trend</h3>
                <p className="text-xs text-muted-foreground">Jan–Jul 2025 • Overall score</p>
              </div>
              <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full font-semibold">↑ 22pts</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={complianceData}>
                <defs>
                  <linearGradient id="soGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="score" stroke="#dc2626" strokeWidth={2.5} fill="url(#soGrad)" name="Compliance %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Facility Compliance</h3>
            <div className="space-y-3">
              {facilities.map(f => (
                <div key={f.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{f.name}</span>
                    <span className="font-semibold">{f.score}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-2 rounded-full transition-all duration-500 ${f.color}`} style={{ width: `${f.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <Button size="sm" className="w-full mt-5 gradient-fire text-white border-0 text-xs" onClick={() => navigate('/dashboard/safety-officer/reports')}>
              View Full Report <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>

        {/* Recent Inspections */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold">Recent & Upcoming Inspections</h3>
            <button onClick={() => navigate('/dashboard/safety-officer/schedule')} className="text-xs text-red-600 dark:text-red-400 hover:underline">View Schedule →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border">
                  <th className="text-left pb-3 font-medium">ID</th>
                  <th className="text-left pb-3 font-medium">Facility</th>
                  <th className="text-left pb-3 font-medium hidden sm:table-cell">Type</th>
                  <th className="text-left pb-3 font-medium">Date</th>
                  <th className="text-left pb-3 font-medium">Status</th>
                  <th className="text-left pb-3 font-medium hidden md:table-cell">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentInspections.map(insp => (
                  <tr key={insp.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 font-mono text-xs text-muted-foreground">{insp.id}</td>
                    <td className="py-3 font-medium">{insp.facility}</td>
                    <td className="py-3 text-muted-foreground hidden sm:table-cell">{insp.type}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />{insp.date}
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusStyle[insp.status]}`}>{insp.status}</span>
                    </td>
                    <td className="py-3 hidden md:table-cell font-semibold">{insp.score ? `${insp.score}%` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Inspect Equipment', href: '/dashboard/safety-officer/equipment', color: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' },
            { label: 'Resolve Issue', href: '/dashboard/safety-officer/issues', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800' },
            { label: 'Generate Report', href: '/dashboard/safety-officer/reports', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800' },
            { label: 'Schedule Inspection', href: '/dashboard/safety-officer/schedule', color: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' },
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

export default SafetyOfficerDashboard;
