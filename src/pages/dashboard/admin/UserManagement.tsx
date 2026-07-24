import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { Search, Users, Shield, Key, Trash2, UserCheck, UserX, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const users = [
  { id: 'USR-001', name: 'Arjun Mehta', email: 'officer@agnisutra.demo', role: 'safety_officer', org: 'DLF Commercial Properties', lastLogin: 'Today 14:32', status: 'active', plan: 'enterprise' },
  { id: 'USR-002', name: 'Suresh Kumar', email: 'inspector@agnisutra.demo', role: 'fire_inspector', org: 'Maharashtra Fire Services', lastLogin: 'Today 11:15', status: 'active', plan: 'professional' },
  { id: 'USR-003', name: 'Rajesh Singh', email: 'technician@agnisutra.demo', role: 'maintenance_technician', org: 'DLF Commercial Properties', lastLogin: 'Today 09:45', status: 'active', plan: 'enterprise' },
  { id: 'USR-004', name: 'Priya Sharma', email: 'manager@agnisutra.demo', role: 'facility_manager', org: 'Apollo Hospitals Group', lastLogin: 'Today 13:20', status: 'active', plan: 'enterprise' },
  { id: 'USR-005', name: 'Vikram Nair', email: 'emergency@agnisutra.demo', role: 'emergency_responder', org: 'Tata Steel Manufacturing', lastLogin: 'Today 10:00', status: 'active', plan: 'professional' },
  { id: 'USR-006', name: 'Insp. Ramesh Patil', email: 'firedept@agnisutra.demo', role: 'fire_department', org: 'Mumbai Fire Brigade', lastLogin: 'Today 08:30', status: 'active', plan: 'professional' },
  { id: 'USR-007', name: 'Kavitha Admin', email: 'admin@agnisutra.demo', role: 'admin', org: 'AgniSutra Technologies', lastLogin: 'Today 15:00', status: 'active', plan: 'enterprise' },
  { id: 'USR-008', name: 'Deactivated User', email: 'old@example.com', role: 'safety_officer', org: 'Test Org', lastLogin: '2 months ago', status: 'inactive', plan: 'free' },
];

const roleConfig: Record<string, string> = {
  admin: 'bg-slate-100 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300',
  safety_officer: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  fire_inspector: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  maintenance_technician: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  facility_manager: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  emergency_responder: 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400',
  fire_department: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
};

const UserManagement: React.FC = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [userList, setUserList] = useState([
    { id: 'USR-001', name: 'Arjun Mehta', email: 'officer@agnisutra.demo', role: 'safety_officer', org: 'DLF Commercial Properties', lastLogin: 'Today 14:32', status: 'active', plan: 'enterprise' },
    { id: 'USR-002', name: 'Suresh Kumar', email: 'inspector@agnisutra.demo', role: 'fire_inspector', org: 'Maharashtra Fire Services', lastLogin: 'Today 11:15', status: 'active', plan: 'professional' },
    { id: 'USR-003', name: 'Rajesh Singh', email: 'technician@agnisutra.demo', role: 'maintenance_technician', org: 'DLF Commercial Properties', lastLogin: 'Today 09:45', status: 'active', plan: 'enterprise' },
    { id: 'USR-004', name: 'Priya Sharma', email: 'manager@agnisutra.demo', role: 'facility_manager', org: 'Apollo Hospitals Group', lastLogin: 'Today 13:20', status: 'active', plan: 'enterprise' },
    { id: 'USR-005', name: 'Vikram Nair', email: 'emergency@agnisutra.demo', role: 'emergency_responder', org: 'Tata Steel Manufacturing', lastLogin: 'Today 10:00', status: 'active', plan: 'professional' },
    { id: 'USR-006', name: 'Insp. Ramesh Patil', email: 'firedept@agnisutra.demo', role: 'fire_department', org: 'Mumbai Fire Brigade', lastLogin: 'Today 08:30', status: 'active', plan: 'professional' },
    { id: 'USR-007', name: 'Kavitha Admin', email: 'admin@agnisutra.demo', role: 'admin', org: 'AgniSutra Technologies', lastLogin: 'Today 15:00', status: 'active', plan: 'enterprise' },
    { id: 'USR-008', name: 'Deactivated User', email: 'old@example.com', role: 'safety_officer', org: 'Test Org', lastLogin: '2 months ago', status: 'inactive', plan: 'free' },
  ]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [editingUser, setEditingUser] = useState<typeof userList[0] | null>(null);
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', role: 'safety_officer', org: '' });

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteForm.name || !inviteForm.email) {
      toast.error('Name and Email are required.');
      return;
    }
    const invited = {
      id: `USR-0${userList.length + 1}`,
      name: inviteForm.name,
      email: inviteForm.email,
      role: inviteForm.role,
      org: inviteForm.org || 'DLF Commercial Properties',
      lastLogin: 'Never',
      status: 'active',
      plan: 'professional'
    };
    setUserList(prev => [...prev, invited]);
    setShowInviteModal(false);
    setInviteForm({ name: '', email: '', role: 'safety_officer', org: '' });
    toast.success(`User "${invited.name}" invited successfully!`);
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setUserList(prev => prev.map(u => u.id === editingUser.id ? editingUser : u));
    setEditingUser(null);
    toast.success('User updated successfully!');
  };

  const filtered = userList.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleToggle = (id: string, currentStatus: string) => {
    setUserList(prev => prev.map(u => u.id === id ? { ...u, status: currentStatus === 'active' ? 'inactive' : 'active' } : u));
    toast.success(`User ${currentStatus === 'active' ? 'deactivated' : 'activated'}`);
  };

  return (
    <RoleDashboardLayout title="User Management">
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">User Management</h2>
            <p className="text-sm text-muted-foreground">Manage all platform users, roles, and access permissions</p>
          </div>
          <Button size="sm" className="gradient-fire text-white border-0 hover:opacity-90" onClick={() => setShowInviteModal(true)}>+ Invite User</Button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Users', value: userList.length, color: 'text-slate-700 dark:text-slate-300' },
            { label: 'Active', value: userList.filter(u => u.status === 'active').length, color: 'text-green-600 dark:text-green-400' },
            { label: 'Admins', value: userList.filter(u => u.role === 'admin').length, color: 'text-red-600 dark:text-red-400' },
            { label: 'New This Week', value: 12, color: 'text-blue-600 dark:text-blue-400' },
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
            <input className="input-field pl-10" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="input-field w-auto" value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="safety_officer">Safety Officer</option>
            <option value="fire_inspector">Fire Inspector</option>
            <option value="maintenance_technician">Maintenance Tech</option>
            <option value="facility_manager">Facility Manager</option>
            <option value="emergency_responder">Emergency Response</option>
            <option value="fire_department">Fire Department</option>
          </select>
        </div>

        {/* Users Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr className="text-xs text-muted-foreground">
                  <th className="text-left px-4 py-3 font-medium">User</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Role</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Organization</th>
                  <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Last Login</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(user => (
                  <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 font-bold text-sm flex-shrink-0">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${roleConfig[user.role]}`}>
                        {user.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell">{user.org}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell">{user.lastLogin}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${user.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="text-xs font-semibold hover:opacity-90" onClick={() => setEditingUser(user)}>Edit</Button>
                        <Button size="sm" variant="outline" className="text-xs font-semibold hover:opacity-90" onClick={() => toast.success(`Password reset link dispatched to ${user.email}`)}><Key className="w-3 h-3" /></Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className={`text-xs ${user.status === 'active' ? 'text-red-600 dark:text-red-400 border-red-200 dark:border-red-800' : 'text-green-600 dark:text-green-400 border-green-200 dark:border-green-800'}`}
                          onClick={() => handleToggle(user.id, user.status)}
                        >
                          {user.status === 'active' ? <UserX className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-border text-xs text-muted-foreground">
            Showing {filtered.length} of {userList.length} users
          </div>
        </div>
      </div>

      {/* Invite User Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 text-left">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/20">
              <h3 className="font-bold text-base">Invite New Platform User</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleInvite}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Arjun Mehta"
                    className="input-field text-sm"
                    value={inviteForm.name}
                    onChange={e => setInviteForm(p => ({ ...p, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@organization.com"
                    className="input-field text-sm"
                    value={inviteForm.email}
                    onChange={e => setInviteForm(p => ({ ...p, email: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Platform Role</label>
                    <select
                      className="input-field text-sm"
                      value={inviteForm.role}
                      onChange={e => setInviteForm(p => ({ ...p, role: e.target.value }))}
                    >
                      <option value="safety_officer">Safety Officer</option>
                      <option value="fire_inspector">Fire Inspector</option>
                      <option value="maintenance_technician">Maintenance Tech</option>
                      <option value="facility_manager">Facility Manager</option>
                      <option value="emergency_responder">Emergency Responder</option>
                      <option value="fire_department">Fire Dept Officer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. DLF Properties"
                      className="input-field text-sm"
                      value={inviteForm.org}
                      onChange={e => setInviteForm(p => ({ ...p, org: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
              <div className="px-6 py-3 border-t border-border flex justify-end gap-2 bg-muted/20">
                <Button type="button" size="sm" variant="outline" onClick={() => setShowInviteModal(false)}>Cancel</Button>
                <Button type="submit" size="sm" className="gradient-fire text-white border-0">Send Invitation</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 text-left">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/20">
              <h3 className="font-bold text-base">Edit User Details</h3>
              <button
                onClick={() => setEditingUser(null)}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleEditSave}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    className="input-field text-sm"
                    value={editingUser.name}
                    onChange={e => setEditingUser(p => p ? ({ ...p, name: e.target.value }) : null)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    className="input-field text-sm"
                    value={editingUser.email}
                    onChange={e => setEditingUser(p => p ? ({ ...p, email: e.target.value }) : null)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Platform Role</label>
                    <select
                      className="input-field text-sm"
                      value={editingUser.role}
                      onChange={e => setEditingUser(p => p ? ({ ...p, role: e.target.value }) : null)}
                    >
                      <option value="admin">Admin</option>
                      <option value="safety_officer">Safety Officer</option>
                      <option value="fire_inspector">Fire Inspector</option>
                      <option value="maintenance_technician">Maintenance Tech</option>
                      <option value="facility_manager">Facility Manager</option>
                      <option value="emergency_responder">Emergency Responder</option>
                      <option value="fire_department">Fire Dept Officer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Organization</label>
                    <input
                      type="text"
                      className="input-field text-sm"
                      value={editingUser.org}
                      onChange={e => setEditingUser(p => p ? ({ ...p, org: e.target.value }) : null)}
                    />
                  </div>
                </div>
              </div>
              <div className="px-6 py-3 border-t border-border flex justify-end gap-2 bg-muted/20">
                <Button type="button" size="sm" variant="outline" onClick={() => setEditingUser(null)}>Cancel</Button>
                <Button type="submit" size="sm" className="gradient-fire text-white border-0">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </RoleDashboardLayout>
  );
};

export default UserManagement;
