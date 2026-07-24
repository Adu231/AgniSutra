import React, { useEffect, useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Siren, Clock, Users, CheckCircle, AlertOctagon, Radio, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Dispatch queue definition is now managed via component state

const units = [
  { id: 'FT-01', name: 'Fire Tender Alpha', type: 'Heavy Tender', crew: 5, status: 'responding', location: 'Andheri Industrial Zone', eta: '3 min' },
  { id: 'FT-02', name: 'Fire Tender Beta', type: 'Medium Tender', crew: 4, status: 'available', location: 'Base Station', eta: null },
  { id: 'FT-03', name: 'Rescue Van', type: 'Rescue', crew: 3, status: 'available', location: 'Base Station', eta: null },
  { id: 'FT-04', name: 'Water Tanker', type: 'Tanker', crew: 2, status: 'returning', location: 'En route to base', eta: '8 min' },
  { id: 'FT-05', name: 'Ladder Truck', type: 'Aerial', crew: 4, status: 'maintenance', location: 'Workshop', eta: null },
];

const FireDepartmentDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');
  const [queue, setQueue] = useState([
    { id: 'CALL-201', type: 'Structure Fire', address: 'Warehouse B, Andheri Industrial Zone', reported: '2 min ago', priority: 'critical', caller: 'Automated — IoT Sensor', status: 'pending' },
    { id: 'CALL-200', type: 'Gas Leak', address: '14 Linking Road, Bandra', reported: '12 min ago', priority: 'high', caller: 'Residential — 101', status: 'dispatched' },
  ]);

  const handleDispatch = (id: string) => {
    setQueue(prev => prev.map(call => call.id === id ? { ...call, status: 'dispatched' } : call));
    toast.success(`Fire units dispatched to incident ${id}!`);
  };

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening');
  }, []);

  const statusConfig: Record<string, string> = {
    responding: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    available: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    returning: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    maintenance: 'bg-gray-100 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400',
  };

  return (
    <RoleDashboardLayout title="Fire Department — Dispatch Center">
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">{greeting}, {user?.name?.split(' ')[0]}</h2>
            <p className="text-sm text-muted-foreground">{user?.organization} · Fire Department Dispatch</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-medium text-amber-700 dark:text-amber-400">2 Incoming Calls</span>
          </div>
        </div>

        {/* Active Call Banner */}
        <div className="bg-amber-600 rounded-2xl p-5 text-white shadow-xl shadow-amber-500/20">
          <div className="flex items-center gap-3 mb-3">
            <Siren className="w-6 h-6 animate-pulse" />
            <div>
              <p className="font-bold">ACTIVE RESPONSE: CALL-201</p>
              <p className="text-white/80 text-sm">Structure Fire · Warehouse B, Andheri Industrial Zone</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button size="sm" className="bg-white text-amber-700 hover:bg-white/90 font-semibold text-xs" onClick={() => navigate('/dashboard/fire-department/incidents')}>View Full Details</Button>
            <Button size="sm" className="bg-white/20 text-white hover:text-white hover:bg-white/30 text-xs border-white/30" variant="outline" onClick={() => navigate('/dashboard/fire-department/buildings')}>Building Info</Button>
            <Button size="sm" className="bg-white/20 text-white hover:text-white hover:bg-white/30 text-xs border-white/30" variant="outline" onClick={() => navigate('/dashboard/fire-department/coordinate')}>Coordinate</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Incoming Calls', value: '2', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10', icon: Siren },
            { label: 'Units Available', value: `${units.filter(u => u.status === 'available').length}/${units.length}`, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10', icon: Users },
            { label: 'Avg Response', value: '6.8m', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10', icon: Clock },
            { label: 'Resolved Today', value: '12', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/10', icon: CheckCircle },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-card border border-border rounded-xl p-5">
                <div className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center mb-3`}><Icon className={`w-4 h-4 ${s.color}`} /></div>
                <div className={`text-2xl font-black ${s.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Dispatch Queue */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-sm flex items-center gap-2"><AlertOctagon className="w-4 h-4 text-amber-500" />Dispatch Queue</h3>
            <button onClick={() => navigate('/dashboard/fire-department/incidents')} className="text-xs text-amber-600 dark:text-amber-400 hover:underline">Manage →</button>
          </div>
          <div className="divide-y divide-border">
            {queue.map(call => (
              <div key={call.id} className="px-4 py-4 flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${call.priority === 'critical' ? 'bg-red-500 animate-pulse' : 'bg-orange-500'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{call.type}</p>
                    <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${call.priority === 'critical' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'}`}>{call.priority}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{call.address} · {call.reported}</p>
                  <p className="text-xs text-muted-foreground">Caller: {call.caller} · Status: <span className="font-semibold">{call.status}</span></p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {call.status === 'pending' ? (
                    <Button size="sm" className="text-xs gradient-fire text-white border-0 hover:opacity-90 font-semibold" onClick={() => handleDispatch(call.id)}>Dispatch</Button>
                  ) : (
                    <span className="text-xs text-muted-foreground font-medium bg-muted px-2.5 py-1 rounded">Dispatched</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unit Status */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="font-semibold text-sm flex items-center gap-2"><Radio className="w-4 h-4 text-amber-500" />Unit Status Board</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="text-xs text-muted-foreground">
                  <th className="text-left px-4 py-2 font-medium">Unit</th>
                  <th className="text-left px-4 py-2 font-medium">Type</th>
                  <th className="text-left px-4 py-2 font-medium">Crew</th>
                  <th className="text-left px-4 py-2 font-medium">Status</th>
                  <th className="text-left px-4 py-2 font-medium hidden sm:table-cell">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {units.map(unit => (
                  <tr key={unit.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium">{unit.name}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{unit.type}</td>
                    <td className="px-4 py-3 text-xs">{unit.crew} members</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusConfig[unit.status]}`}>{unit.status}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground hidden sm:table-cell">{unit.location}{unit.eta ? ` · ETA ${unit.eta}` : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Incoming Incidents', href: '/dashboard/fire-department/incidents', color: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' },
            { label: 'Building Database', href: '/dashboard/fire-department/buildings', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800' },
            { label: 'Response Coordination', href: '/dashboard/fire-department/coordinate', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800' },
            { label: 'Unit Management', href: '/dashboard/fire-department/coordinate', color: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' },
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

export default FireDepartmentDashboard;
