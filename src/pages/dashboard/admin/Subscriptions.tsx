import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { CreditCard, TrendingUp, DollarSign, Users, Package, CheckCircle, Clock, AlertTriangle, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Initial subscriptions data is now managed via component state

const revenueByPlan = [
  { plan: 'Enterprise', count: 3, mrr: 1197 },
  { plan: 'Professional', count: 2, mrr: 298 },
  { plan: 'Starter', count: 0, mrr: 0 },
];

const statusConfig: Record<string, string> = {
  active: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  trial_expired: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  cancelled: 'bg-gray-100 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400',
  past_due: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
};

const planConfig: Record<string, string> = {
  enterprise: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  professional: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  free: 'bg-gray-100 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400',
};

const Subscriptions: React.FC = () => {
  const navigate = useNavigate();
  const [subs, setSubs] = useState([
    { id: 'SUB-001', org: 'DLF Commercial Properties', plan: 'enterprise', amount: 399, billing: 'annual', status: 'active', startDate: 'Jan 1, 2024', renewalDate: 'Jan 1, 2026', facilities: 12, users: 34 },
    { id: 'SUB-002', org: 'Apollo Hospitals Group', plan: 'enterprise', amount: 399, billing: 'annual', status: 'active', startDate: 'Feb 1, 2024', renewalDate: 'Feb 1, 2026', facilities: 23, users: 51 },
    { id: 'SUB-003', org: 'Tata Steel Manufacturing', plan: 'professional', amount: 149, billing: 'monthly', status: 'active', startDate: 'Mar 15, 2024', renewalDate: 'Aug 15, 2025', facilities: 6, users: 18 },
    { id: 'SUB-004', org: 'Maharashtra Fire Services', plan: 'professional', amount: 149, billing: 'annual', status: 'active', startDate: 'Jan 20, 2024', renewalDate: 'Jan 20, 2026', facilities: 8, users: 22 },
    { id: 'SUB-005', org: 'GMR Airports Ltd', plan: 'enterprise', amount: 399, billing: 'annual', status: 'active', startDate: 'Apr 5, 2024', renewalDate: 'Apr 5, 2026', facilities: 4, users: 41 },
    { id: 'SUB-006', org: 'Small Factory Ltd', plan: 'free', amount: 0, billing: 'N/A', status: 'trial_expired', startDate: 'Jun 1, 2024', renewalDate: 'Jul 1, 2024', facilities: 1, users: 2 },
  ]);
  const [editingSub, setEditingSub] = useState<typeof subs[0] | null>(null);

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSub) return;
    setSubs(prev => prev.map(s => s.id === editingSub.id ? editingSub : s));
    setEditingSub(null);
    toast.success('Subscription details updated successfully!');
  };

  const totalMRR = subs.filter(s => s.status === 'active').reduce((sum, s) => sum + s.amount, 0);
  const annualRevenue = subs.filter(s => s.status === 'active').reduce((sum, s) => sum + (s.amount * 12), 0);

  return (
    <RoleDashboardLayout title="Subscriptions">
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold">Subscription Management</h2>
          <p className="text-sm text-muted-foreground">Manage organization subscriptions, billing, and revenue tracking</p>
        </div>

        {/* Revenue Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'MRR', value: `$${(totalMRR / 1000).toFixed(1)}K`, change: '+7% vs Jun', color: 'text-green-500', bg: 'bg-green-500/10', icon: DollarSign },
            { label: 'ARR (Projected)', value: `$${(annualRevenue / 1000).toFixed(0)}K`, change: 'Based on current plans', color: 'text-blue-500', bg: 'bg-blue-500/10', icon: TrendingUp },
            { label: 'Paid Subscribers', value: subs.filter(s => s.status === 'active' && s.amount > 0).length, change: `of ${subs.length} total`, color: 'text-purple-500', bg: 'bg-purple-500/10', icon: Users },
            { label: 'Expiring (30d)', value: 1, change: 'Tata Steel — Aug 15', color: 'text-orange-500', bg: 'bg-orange-500/10', icon: Clock },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-card border border-border rounded-xl p-5">
                <div className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center mb-3`}><Icon className={`w-4 h-4 ${s.color}`} /></div>
                <div className={`text-2xl font-black ${s.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.change}</div>
              </div>
            );
          })}
        </div>

        {/* Revenue by Plan Chart */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-1">Revenue by Plan</h3>
          <p className="text-xs text-muted-foreground mb-4">Monthly contribution per plan tier</p>
          <div className="grid grid-cols-3 gap-4">
            {revenueByPlan.map(p => (
              <div key={p.plan} className="text-center p-4 bg-muted/40 rounded-xl">
                <div className="text-xl font-black gradient-fire-text" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>${p.mrr.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">{p.plan}</div>
                <div className="text-xs text-muted-foreground">{p.count} orgs</div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-sm">All Subscriptions ({subs.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr className="text-xs text-muted-foreground">
                  <th className="text-left px-4 py-3 font-medium">Organization</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Plan</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Amount</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Renewal</th>
                  <th className="text-left px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                 {subs.map(sub => (
                  <tr key={sub.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-sm">{sub.org}</p>
                      <p className="text-xs text-muted-foreground">{sub.users} users · {sub.facilities} facilities</p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${planConfig[sub.plan]}`}>{sub.plan}</span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {sub.amount > 0 ? <span className="font-semibold">${sub.amount}<span className="text-muted-foreground font-normal">/{sub.billing === 'annual' ? 'yr' : 'mo'}</span></span> : <span className="text-muted-foreground">Free</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusConfig[sub.status]}`}>{sub.status.replace('_', ' ')}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell">{sub.renewalDate}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="text-xs font-semibold hover:opacity-90" onClick={() => setEditingSub(sub)}>Edit</Button>
                        {sub.status === 'trial_expired' && (
                          <Button size="sm" className="text-xs gradient-fire text-white border-0 hover:opacity-90 font-semibold" onClick={() => navigate(`/dashboard/admin/subscriptions/payment?org=${encodeURIComponent(sub.org)}&plan=professional`)}>Upgrade</Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Subscription Modal */}
      {editingSub && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 text-left">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/20">
              <h3 className="font-bold text-base">Edit Billing details</h3>
              <button
                onClick={() => setEditingSub(null)}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleEditSave}>
              <div className="p-6 space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold mb-1">Organization</label>
                  <input
                    type="text"
                    disabled
                    className="input-field text-sm opacity-60 bg-muted/20"
                    value={editingSub.org}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Billing Tier</label>
                    <select
                      className="input-field text-sm"
                      value={editingSub.plan}
                      onChange={e => setEditingSub(p => p ? ({ ...p, plan: e.target.value }) : null)}
                    >
                      <option value="free">Free Trial</option>
                      <option value="professional">Professional</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Billing Cycle</label>
                    <select
                      className="input-field text-sm"
                      value={editingSub.billing}
                      onChange={e => setEditingSub(p => p ? ({ ...p, billing: e.target.value }) : null)}
                    >
                      <option value="monthly">Monthly</option>
                      <option value="annual">Annual</option>
                      <option value="N/A">N/A</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Billing Amount ($)</label>
                    <input
                      type="number"
                      required
                      className="input-field text-sm font-mono"
                      value={editingSub.amount}
                      onChange={e => setEditingSub(p => p ? ({ ...p, amount: Number(e.target.value) }) : null)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Renewal Date</label>
                    <input
                      type="text"
                      required
                      className="input-field text-sm font-mono"
                      value={editingSub.renewalDate}
                      onChange={e => setEditingSub(p => p ? ({ ...p, renewalDate: e.target.value }) : null)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Subscription Status</label>
                  <select
                    className="input-field text-sm"
                    value={editingSub.status}
                    onChange={e => setEditingSub(p => p ? ({ ...p, status: e.target.value }) : null)}
                  >
                    <option value="active">Active</option>
                    <option value="trial_expired">Trial Expired</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="past_due">Past Due</option>
                  </select>
                </div>
              </div>
              <div className="px-6 py-3 border-t border-border flex justify-end gap-2 bg-muted/20">
                <Button type="button" size="sm" variant="outline" onClick={() => setEditingSub(null)}>Cancel</Button>
                <Button type="submit" size="sm" className="gradient-fire text-white border-0">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </RoleDashboardLayout>
  );
};

export default Subscriptions;
