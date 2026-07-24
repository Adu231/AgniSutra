import React, { useEffect, useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Siren, AlertOctagon, CheckCircle, Clock, Users, Shield, TrendingDown, PhoneCall } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const activeAlerts = [
  { id: 'INC-041', type: 'Smoke Detector Triggered', location: 'Warehouse B, Bay 3', severity: 'high', reportedAt: '2 minutes ago', respondingTeam: 'Team Alpha', status: 'responding' },
];

const recentIncidents = [
  { id: 'INC-040', type: 'Hydrant Pressure Low', location: 'Parking Complex, L1', severity: 'medium', time: '4h ago', status: 'resolved', responseTime: '8 min' },
  { id: 'INC-039', type: 'Exit Light Offline', location: 'Office Block C, 3F', severity: 'low', time: '1 day ago', status: 'resolved', responseTime: '12 min' },
  { id: 'INC-038', type: 'Gas Leak Alert', location: 'Canteen Kitchen', severity: 'critical', time: '3 days ago', status: 'resolved', responseTime: '4 min' },
];

const teamStatus = [
  { name: 'Team Alpha', members: 4, status: 'responding', location: 'Warehouse B', radio: 'CH-01' },
  { name: 'Team Beta', members: 3, status: 'standby', location: 'Base Station', radio: 'CH-02' },
  { name: 'Team Gamma', members: 4, status: 'available', location: 'Main Building', radio: 'CH-03' },
];

const EmergencyResponseDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [elapsed, setElapsed] = useState(127);

  useEffect(() => {
    const timer = setInterval(() => setElapsed(p => p + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <RoleDashboardLayout title="Emergency Response — Alert Center">
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">Alert Center</h2>
            <p className="text-sm text-muted-foreground">{user?.organization} · Emergency Responder</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-medium text-rose-700 dark:text-rose-400">1 Active Alert</span>
          </div>
        </div>

        {/* ACTIVE ALERT BANNER */}
        {activeAlerts.map(alert => (
          <div key={alert.id} className="bg-red-600 rounded-2xl p-5 text-white shadow-2xl shadow-red-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Siren className="w-5 h-5 animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-lg">ACTIVE INCIDENT — {alert.id}</p>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-medium">{alert.severity}</span>
                </div>
                <p className="text-white/80 text-sm">{alert.type} · {alert.location}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-2xl font-black">{formatTime(elapsed)}</p>
                <p className="text-white/70 text-xs">Response time</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="sm" className="bg-white text-red-700 hover:bg-white/90 font-semibold text-xs" onClick={() => navigate('/dashboard/emergency-response/navigation')}>
                Navigate to Location
              </Button>
              <Button size="sm" className="bg-white/20 text-white hover:text-white hover:bg-white/30 text-xs border-white/30" variant="outline" onClick={() => navigate('/dashboard/emergency-response/plans')}>
                View Response Plan
              </Button>
              <Button size="sm" className="bg-white/20 text-white hover:text-white hover:bg-white/30 text-xs border-white/30" variant="outline" onClick={() => navigate('/dashboard/emergency-response/close')}>
                Close Incident
              </Button>
            </div>
          </div>
        ))}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Incidents', value: '1', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10', icon: AlertOctagon },
            { label: 'Response Team', value: '8/10', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10', icon: Users },
            { label: 'Avg Response Time', value: '4.2m', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10', icon: Clock },
            { label: 'Resolved Today', value: '5', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/10', icon: CheckCircle },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-card border border-border rounded-xl p-5">
                <div className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <div className={`text-2xl font-black ${s.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Team Status + Recent Incidents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Response Team Status</h3>
            <div className="space-y-3">
              {teamStatus.map(team => (
                <div key={team.name} className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${team.status === 'responding' ? 'bg-red-500 animate-pulse' : team.status === 'standby' ? 'bg-yellow-500' : 'bg-green-500'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold">{team.name}</p>
                    <p className="text-xs text-muted-foreground">{team.members} members · {team.location} · Radio {team.radio}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${team.status === 'responding' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' : team.status === 'standby' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'}`}>
                    {team.status}
                  </span>
                </div>
              ))}
            </div>
            <Button size="sm" className="w-full mt-4 gradient-fire text-white border-0 text-xs" onClick={() => toast.success('Emergency broadcast sent to all teams!')}>
              <PhoneCall className="w-3.5 h-3.5 mr-2" />Broadcast All Teams
            </Button>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Recent Incidents</h3>
              <button onClick={() => navigate('/dashboard/emergency-response/alerts')} className="text-xs text-rose-600 dark:text-rose-400 hover:underline">View all →</button>
            </div>
            <div className="space-y-3">
              {recentIncidents.map(inc => (
                <div key={inc.id} className="flex items-start gap-3 p-3 bg-muted/40 rounded-xl">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${inc.severity === 'critical' ? 'bg-red-100 dark:bg-red-900/30' : inc.severity === 'medium' ? 'bg-orange-100 dark:bg-orange-900/30' : 'bg-yellow-100 dark:bg-yellow-900/30'}`}>
                    <AlertOctagon className={`w-4 h-4 ${inc.severity === 'critical' ? 'text-red-600' : inc.severity === 'medium' ? 'text-orange-600' : 'text-yellow-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{inc.type}</p>
                    <p className="text-xs text-muted-foreground">{inc.location}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-muted-foreground">{inc.time}</p>
                    <p className="text-xs text-green-600 mt-0.5">Response: {inc.responseTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Active Alerts', href: '/dashboard/emergency-response/alerts', color: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' },
            { label: 'Navigate', href: '/dashboard/emergency-response/navigation', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800' },
            { label: 'Response Plans', href: '/dashboard/emergency-response/plans', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800' },
            { label: 'Close Incident', href: '/dashboard/emergency-response/close', color: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' },
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

export default EmergencyResponseDashboard;
