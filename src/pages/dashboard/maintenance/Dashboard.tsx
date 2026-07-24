import React, { useEffect, useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Wrench, CheckCircle, Clock, AlertTriangle, TrendingUp, MapPin, ArrowRight } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const workOrderStatus = [
  { name: 'Open', value: 7, color: '#f97316' },
  { name: 'In Progress', value: 4, color: '#3b82f6' },
  { name: 'Parts Awaited', value: 3, color: '#eab308' },
  { name: 'Completed', value: 12, color: '#22c55e' },
];

const weeklyWork = [
  { day: 'Mon', completed: 3 }, { day: 'Tue', completed: 2 }, { day: 'Wed', completed: 4 },
  { day: 'Thu', completed: 2 }, { day: 'Fri', completed: 5 }, { day: 'Sat', completed: 1 }, { day: 'Sun', completed: 0 },
];

const urgentWorkOrders = [
  { id: 'WO-088', equipment: 'Smoke Detector SMK-014', location: 'Warehouse B, Bay 2', issue: 'Device Offline', priority: 'urgent', dueBy: 'Today 5:00 PM' },
  { id: 'WO-089', equipment: 'Exit Light EL-3B', location: 'Office Block C, 3F', issue: 'LED & Battery Replacement', priority: 'high', dueBy: 'Tomorrow' },
  { id: 'WO-090', equipment: 'Hydrant H-05', location: 'Parking Complex L1', issue: 'Low Pressure — Valve Check', priority: 'high', dueBy: 'Jul 30' },
];

const MaintenanceDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening');
  }, []);

  return (
    <RoleDashboardLayout title="Maintenance — Command Center">
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">{greeting}, {user?.name?.split(' ')[0]} 👋</h2>
            <p className="text-sm text-muted-foreground">{user?.organization} · Maintenance Technician</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-medium text-blue-700 dark:text-blue-400">14 Open WOs</span>
          </div>
        </div>

        {/* Urgent Banner */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div className="flex-1">
            <span className="text-sm font-semibold text-red-700 dark:text-red-400">Urgent: </span>
            <span className="text-sm text-red-600 dark:text-red-500">WO-088 — Smoke detector SMK-014 offline in Warehouse B. Action required today.</span>
          </div>
          <Button size="sm" className="gradient-fire text-white border-0 flex-shrink-0 text-xs" onClick={() => navigate('/dashboard/maintenance/work-orders')}>View WO</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Open Work Orders', value: '14', change: '3 urgent', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500/10', icon: Wrench },
            { label: 'Completed Today', value: '7', change: '↑ vs avg 5', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10', icon: CheckCircle },
            { label: 'Parts Low Stock', value: '2', change: 'CO2 cartridge, Battery', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-500/10', icon: AlertTriangle },
            { label: 'Avg Fix Time', value: '2.4h', change: '↓ from 3.1h last week', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10', icon: Clock },
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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-1">Work Order Status</h3>
            <p className="text-xs text-muted-foreground mb-3">Distribution of all active work orders</p>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={workOrderStatus} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" strokeWidth={0}>
                  {workOrderStatus.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {workOrderStatus.map(e => (
                <div key={e.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} /><span className="text-muted-foreground">{e.name}</span></div>
                  <span className="font-semibold">{e.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-1">Weekly Completions</h3>
            <p className="text-xs text-muted-foreground mb-3">Work orders completed per day this week</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weeklyWork}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '11px' }} />
                <Bar dataKey="completed" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Urgent Work Orders */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Urgent Work Orders</h3>
            <button onClick={() => navigate('/dashboard/maintenance/work-orders')} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">View all →</button>
          </div>
          <div className="space-y-3">
            {urgentWorkOrders.map(wo => (
              <div key={wo.id} className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl hover:bg-muted/60 transition-colors">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${wo.priority === 'urgent' ? 'bg-red-500' : 'bg-orange-500'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{wo.equipment}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />{wo.location}
                  </div>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">{wo.issue}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${wo.priority === 'urgent' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'}`}>{wo.priority}</span>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-0.5 justify-end"><Clock className="w-3 h-3" />{wo.dueBy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Work Orders', href: '/dashboard/maintenance/work-orders', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800' },
            { label: 'Service History', href: '/dashboard/maintenance/history', color: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' },
            { label: 'Update Status', href: '/dashboard/maintenance/status', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800' },
            { label: 'Close Tickets', href: '/dashboard/maintenance/tickets', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800' },
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

export default MaintenanceDashboard;
