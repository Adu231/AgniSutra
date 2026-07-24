import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { Search, Building2, CheckCircle, XCircle, Clock, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const organizations = [
  { id: 'ORG-001', name: 'DLF Commercial Properties', plan: 'enterprise', users: 34, facilities: 12, lastActive: 'Today', joined: 'Jan 2024', status: 'active', mrr: 399 },
  { id: 'ORG-002', name: 'Apollo Hospitals Group', plan: 'enterprise', users: 51, facilities: 23, lastActive: 'Today', joined: 'Feb 2024', status: 'active', mrr: 399 },
  { id: 'ORG-003', name: 'Tata Steel Manufacturing', plan: 'professional', users: 18, facilities: 6, lastActive: 'Yesterday', joined: 'Mar 2024', status: 'active', mrr: 149 },
  { id: 'ORG-004', name: 'Maharashtra Fire Services', plan: 'professional', users: 22, facilities: 8, lastActive: 'Today', joined: 'Jan 2024', status: 'active', mrr: 149 },
  { id: 'ORG-005', name: 'GMR Airports Ltd', plan: 'enterprise', users: 41, facilities: 4, lastActive: '3 days ago', joined: 'Apr 2024', status: 'active', mrr: 399 },
  { id: 'ORG-006', name: 'Reliance Retail Chain', plan: 'professional', users: 15, facilities: 9, lastActive: 'Today', joined: 'May 2024', status: 'active', mrr: 149 },
  { id: 'ORG-007', name: 'Small Factory Ltd', plan: 'free', users: 2, facilities: 1, lastActive: '2 weeks ago', joined: 'Jun 2024', status: 'trial_expired', mrr: 0 },
  { id: 'ORG-008', name: 'Test Organization', plan: 'free', users: 1, facilities: 0, lastActive: '1 month ago', joined: 'Jul 2024', status: 'inactive', mrr: 0 },
];

const planConfig: Record<string, string> = {
  enterprise: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  professional: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  free: 'bg-gray-100 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400',
};

const statusConfig: Record<string, string> = {
  active: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  trial_expired: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  inactive: 'bg-gray-100 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400',
  suspended: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
};

const Organizations: React.FC = () => {
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('all');
  const [orgs, setOrgs] = useState(organizations);

  const filtered = orgs.filter(o => {
    const matchSearch = o.name.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    const matchPlan = planFilter === 'all' || o.plan === planFilter;
    return matchSearch && matchPlan;
  });

  const totalMRR = orgs.filter(o => o.status === 'active').reduce((s, o) => s + o.mrr, 0);

  return (
    <RoleDashboardLayout title="Organizations">
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Organizations</h2>
            <p className="text-sm text-muted-foreground">Manage all registered organizations and their subscriptions</p>
          </div>
          <Button size="sm" className="gradient-fire text-white border-0 hover:opacity-90 flex-shrink-0" onClick={() => toast.success('Add org form opened')}>+ Add Organization</Button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total', value: orgs.length, color: 'text-slate-700 dark:text-slate-300' },
            { label: 'Active', value: orgs.filter(o => o.status === 'active').length, color: 'text-green-600 dark:text-green-400' },
            { label: 'Enterprise', value: orgs.filter(o => o.plan === 'enterprise').length, color: 'text-purple-600 dark:text-purple-400' },
            { label: 'MRR', value: `$${(totalMRR/1000).toFixed(1)}K`, color: 'text-blue-600 dark:text-blue-400' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-4">
              <div className={`text-2xl font-black ${s.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input className="input-field pl-10" placeholder="Search organizations..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="input-field w-auto" value={planFilter} onChange={e => setPlanFilter(e.target.value)}>
            <option value="all">All Plans</option>
            <option value="enterprise">Enterprise</option>
            <option value="professional">Professional</option>
            <option value="free">Free</option>
          </select>
        </div>

        {/* Organizations Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr className="text-xs text-muted-foreground">
                  <th className="text-left px-4 py-3 font-medium">Organization</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Plan</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Users</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Facilities</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Last Active</th>
                  <th className="text-left px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(org => (
                  <tr key={org.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{org.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">{org.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${planConfig[org.plan]}`}>{org.plan}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{org.users}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{org.facilities}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusConfig[org.status]}`}>{org.status.replace('_', ' ')}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell">{org.lastActive}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="text-xs" onClick={() => toast.success(`${org.name} details opened`)}>View</Button>
                        {org.status === 'active' && (
                          <Button size="sm" variant="outline" className="text-xs text-red-600 dark:text-red-400 border-red-200 dark:border-red-800" onClick={() => toast.success(`${org.name} suspended`)}>Suspend</Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-border text-xs text-muted-foreground">
            Showing {filtered.length} of {orgs.length} organizations
          </div>
        </div>
      </div>
    </RoleDashboardLayout>
  );
};

export default Organizations;
