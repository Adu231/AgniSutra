import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Flame, AlertTriangle, CheckCircle, Wifi, TrendingUp, TrendingDown, AlertOctagon, Clock, MapPin, Zap, Shield, Activity } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const complianceData = [
  { month: 'Jan', score: 72, inspections: 14 }, { month: 'Feb', score: 76, inspections: 18 },
  { month: 'Mar', score: 80, inspections: 22 }, { month: 'Apr', score: 78, inspections: 19 },
  { month: 'May', score: 85, inspections: 25 }, { month: 'Jun', score: 88, inspections: 28 },
  { month: 'Jul', score: 94, inspections: 31 },
];

const equipmentStatus = [
  { name: 'Operational', value: 142, color: '#22c55e' },
  { name: 'Maintenance', value: 18, color: '#f97316' },
  { name: 'Critical', value: 5, color: '#dc2626' },
  { name: 'Offline', value: 3, color: '#6b7280' },
];

const recentIncidents = [
  { id: '1', type: 'Smoke Detector', location: 'B2 Floor, Zone A', time: '2 hours ago', severity: 'high', status: 'responding' },
  { id: '2', type: 'Hydrant Pressure Low', location: 'Parking Level 1', time: '4 hours ago', severity: 'medium', status: 'resolved' },
  { id: '3', type: 'Exit Light Failure', location: 'Stairwell C, 3F', time: '1 day ago', severity: 'low', status: 'resolved' },
  { id: '4', type: 'Fire Panel Fault', location: 'Control Room', time: '2 days ago', severity: 'high', status: 'resolved' },
];

const upcomingInspections = [
  { facility: 'Main Building', type: 'Monthly Fire Inspection', date: 'Jul 28, 2025', inspector: 'Vikram N.' },
  { facility: 'Warehouse B', type: 'Equipment Audit', date: 'Jul 30, 2025', inspector: 'Priya S.' },
  { facility: 'Data Center', type: 'Compliance Review', date: 'Aug 2, 2025', inspector: 'Arjun M.' },
];

const metrics = [
  { label: 'Compliance Score', value: '94%', change: '+6%', up: true, icon: Shield, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10' },
  { label: 'Equipment Healthy', value: '168/186', change: '90%', up: true, icon: Zap, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10' },
  { label: 'Open Incidents', value: '3', change: '-2 this week', up: false, icon: AlertOctagon, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10' },
  { label: 'IoT Alerts Today', value: '7', change: '+2 vs yesterday', up: null, icon: Activity, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500/10' },
  { label: 'Inspections Done', value: '31', change: 'This month', up: true, icon: CheckCircle, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/10' },
  { label: 'Risk Score', value: 'Medium', change: 'Down from High', up: true, icon: AlertTriangle, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-500/10' },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening');
  }, []);

  const severityConfig = {
    high: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    medium: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
    low: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  };
  const statusConfig = {
    responding: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    resolved: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    open: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  };

  return (
    <DashboardLayout title="Command Center">
      <div className="p-4 sm:p-6 space-y-6">
        {/* Greeting */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {greeting}, {user?.name?.split(' ')[0]} 👋
            </h2>
            <p className="text-sm text-muted-foreground mt-1">{user?.organization} · {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="relative"><div className="w-2 h-2 bg-green-500 rounded-full" /><div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" /></div>
            <span className="text-xs font-medium text-green-700 dark:text-green-400 hidden sm:block">All Systems Active</span>
          </div>
        </div>

        {/* Alert Banner */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 flex items-center gap-3">
          <AlertOctagon className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="text-sm font-semibold text-red-700 dark:text-red-400">Active Alert: </span>
            <span className="text-sm text-red-600 dark:text-red-500">Smoke detector offline in B2 Floor Zone A — Technician dispatched</span>
          </div>
          <span className="text-xs text-red-500 flex-shrink-0">2h ago</span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="metric-card">
                <div className={`w-9 h-9 ${m.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`w-4 h-4 ${m.color}`} />
                </div>
                <div className={`text-xl font-black ${m.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{m.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{m.label}</div>
                {m.change && (
                  <div className={`text-xs mt-1 flex items-center gap-0.5 ${m.up === true ? 'text-green-500' : m.up === false ? 'text-red-500' : 'text-muted-foreground'}`}>
                    {m.up === true && <TrendingUp className="w-3 h-3" />}
                    {m.up === false && <TrendingDown className="w-3 h-3" />}
                    {m.change}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Compliance Trend */}
          <div className="lg:col-span-2 dashboard-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold">Compliance Trend</h3>
                <p className="text-xs text-muted-foreground">Monthly compliance score & inspection count</p>
              </div>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full">↑ 22pts in 7 months</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={complianceData}>
                <defs>
                  <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="score" stroke="#dc2626" strokeWidth={2.5} fill="url(#compGrad)" name="Compliance %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Equipment Status */}
          <div className="dashboard-card">
            <h3 className="font-semibold mb-1">Equipment Status</h3>
            <p className="text-xs text-muted-foreground mb-4">168 of 186 items operational</p>
            <div className="flex justify-center mb-4">
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie data={equipmentStatus} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" strokeWidth={0}>
                    {equipmentStatus.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {equipmentStatus.map(e => (
                <div key={e.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} />
                    <span className="text-muted-foreground">{e.name}</span>
                  </div>
                  <span className="font-semibold">{e.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Incidents */}
          <div className="dashboard-card">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold">Recent Incidents</h3>
              <a href="/dashboard/emergency" className="text-xs text-red-600 dark:text-red-400 hover:underline">View all →</a>
            </div>
            <div className="space-y-3">
              {recentIncidents.map(inc => (
                <div key={inc.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors">
                  <div className={`mt-0.5 px-2 py-0.5 rounded text-xs font-semibold ${severityConfig[inc.severity as keyof typeof severityConfig]}`}>
                    {inc.severity}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{inc.type}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <MapPin className="w-3 h-3" />{inc.location}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusConfig[inc.status as keyof typeof statusConfig]}`}>{inc.status}</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1 justify-end"><Clock className="w-3 h-3" />{inc.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Inspections */}
          <div className="dashboard-card">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold">Upcoming Inspections</h3>
              <a href="/dashboard/inspections" className="text-xs text-red-600 dark:text-red-400 hover:underline">View all →</a>
            </div>
            <div className="space-y-3">
              {upcomingInspections.map((insp, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors">
                  <div className="w-10 h-10 gradient-fire rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {insp.date.split(' ')[1].replace(',', '')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{insp.facility}</p>
                    <p className="text-xs text-muted-foreground">{insp.type}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-medium">{insp.date}</p>
                    <p className="text-xs text-muted-foreground">{insp.inspector}</p>
                  </div>
                </div>
              ))}
              <button
                onClick={() => window.location.href = '/dashboard/inspections'}
                className="w-full mt-2 py-2.5 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:bg-muted/40 transition-colors"
              >
                + Schedule New Inspection
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
