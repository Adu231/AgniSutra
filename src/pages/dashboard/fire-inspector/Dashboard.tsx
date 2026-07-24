import React, { useEffect, useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { ClipboardList, CheckCircle, AlertTriangle, Clock, TrendingUp, MapPin, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const weeklyData = [
  { day: 'Mon', completed: 4, total: 5 }, { day: 'Tue', completed: 6, total: 6 },
  { day: 'Wed', completed: 3, total: 4 }, { day: 'Thu', completed: 5, total: 7 },
  { day: 'Fri', completed: 7, total: 8 }, { day: 'Sat', completed: 2, total: 3 }, { day: 'Sun', completed: 0, total: 1 },
];

const todayTasks = [
  { id: 'TSK-091', facility: 'Main Building', floor: 'G Floor, Zone A', type: 'Extinguisher Check', priority: 'high', due: '10:00 AM', status: 'pending' },
  { id: 'TSK-092', facility: 'Warehouse B', floor: '1st Floor, Bay 2', type: 'Smoke Detector Test', priority: 'critical', due: '11:30 AM', status: 'pending' },
  { id: 'TSK-093', facility: 'Data Center', floor: 'Server Room A', type: 'Suppression System', priority: 'medium', due: '02:00 PM', status: 'in_progress' },
  { id: 'TSK-094', facility: 'Office Block C', floor: 'All Floors', type: 'Exit Light Inspection', priority: 'high', due: '04:00 PM', status: 'pending' },
];

const priorityConfig: Record<string, string> = {
  critical: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  high: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
};

const FireInspectorDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening');
  }, []);

  return (
    <RoleDashboardLayout title="Fire Inspector — My Dashboard">
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">{greeting}, {user?.name?.split(' ')[0]} 👋</h2>
            <p className="text-sm text-muted-foreground">{user?.organization} · Fire Inspector</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-xs font-medium text-orange-700 dark:text-orange-400">4 Tasks Today</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Today's Tasks", value: '4', change: '1 critical', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500/10', icon: ClipboardList },
            { label: 'Completed This Week', value: '27', change: '↑ from 22 last week', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10', icon: CheckCircle },
            { label: 'Overdue Tasks', value: '1', change: 'From yesterday', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10', icon: AlertTriangle },
            { label: 'Avg Completion Time', value: '47m', change: '↓ 8min vs last month', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10', icon: Clock },
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

        {/* Week Chart + Today's Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-1">Weekly Completion</h3>
            <p className="text-xs text-muted-foreground mb-4">Tasks completed vs assigned (This week)</p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={weeklyData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '11px' }} />
                <Bar dataKey="total" fill="hsl(var(--muted))" radius={[3, 3, 0, 0]} name="Assigned" />
                <Bar dataKey="completed" fill="#f97316" radius={[3, 3, 0, 0]} name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Today's Tasks</h3>
              <button onClick={() => navigate('/dashboard/fire-inspector/tasks')} className="text-xs text-orange-600 dark:text-orange-400 hover:underline">View all →</button>
            </div>
            <div className="space-y-3">
              {todayTasks.map(task => (
                <div key={task.id} className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl hover:bg-muted/60 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <p className="text-sm font-medium">{task.type}</p>
                      <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${priorityConfig[task.priority]}`}>{task.priority}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />{task.facility} · {task.floor}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground justify-end mb-1">
                      <Clock className="w-3 h-3" />{task.due}
                    </div>
                    <Button size="sm" className="text-xs gradient-fire text-white border-0 hover:opacity-90 h-7 px-3" onClick={() => navigate('/dashboard/fire-inspector/inspect')}>
                      Start
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'View All Tasks', href: '/dashboard/fire-inspector/tasks', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800' },
            { label: 'Start Inspection', href: '/dashboard/fire-inspector/inspect', color: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' },
            { label: 'Upload Evidence', href: '/dashboard/fire-inspector/evidence', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800' },
            { label: 'Submit Report', href: '/dashboard/fire-inspector/reports', color: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' },
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

export default FireInspectorDashboard;
