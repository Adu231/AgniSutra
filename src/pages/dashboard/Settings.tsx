import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Bell, Shield, Moon, Sun, Globe, Key, Eye, EyeOff, CheckCircle, Save, Lock } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';

const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void }> = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${checked ? 'bg-red-600' : 'bg-muted'}`}
  >
    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
  </button>
);

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({ email: true, push: true, sms: false, alerts: true, reports: true, maintenance: false });
  const [security, setSecurity] = useState({ twoFactor: false, sessionTimeout: '8h', loginAlerts: true });
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSaveNotifications = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    toast.success('Notification settings saved!');
  };

  const handleSaveSecurity = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    toast.success('Security settings updated!');
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPass !== passwordForm.confirm) { toast.error('Passwords do not match'); return; }
    if (passwordForm.newPass.length < 8) { toast.error('Password must be at least 8 characters'); return; }
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
    setPasswordForm({ current: '', newPass: '', confirm: '' });
    toast.success('Password changed successfully!');
  };

  return (
    <DashboardLayout title="Settings">
      <div className="p-4 sm:p-6 max-w-3xl space-y-6">

        {/* Appearance */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-5 flex items-center gap-2"><Globe className="w-4 h-4 text-red-500" />Appearance</h3>
          <div>
            <p className="text-sm font-medium mb-3">Theme</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'light', label: 'Light', icon: Sun },
                { value: 'dark', label: 'Dark', icon: Moon },
                { value: 'system', label: 'System', icon: Globe },
              ].map(opt => {
                const Icon = opt.icon;
                const active = theme === opt.value || (opt.value === 'system' && theme === 'dark');
                return (
                  <button
                    key={opt.value}
                    onClick={() => opt.value !== 'system' && setTheme(opt.value as 'light' | 'dark')}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${active ? 'border-red-600 bg-red-50 dark:bg-red-900/20' : 'border-border hover:border-muted-foreground'}`}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground'}`} />
                    <span className={`text-xs font-medium ${active ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground'}`}>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-5 flex items-center gap-2"><Bell className="w-4 h-4 text-orange-500" />Notifications</h3>
          <div className="space-y-4">
            {[
              { key: 'email', label: 'Email Notifications', desc: 'Receive inspection reports and compliance updates via email' },
              { key: 'push', label: 'Push Notifications', desc: 'Real-time alerts for incidents and IoT anomalies' },
              { key: 'sms', label: 'SMS Alerts', desc: 'Critical emergency alerts via text message' },
              { key: 'alerts', label: 'Critical Alerts', desc: 'Immediate notification for fire emergencies and critical equipment failures' },
              { key: 'reports', label: 'Weekly Reports', desc: 'Automated weekly compliance and inspection summary reports' },
              { key: 'maintenance', label: 'Maintenance Reminders', desc: 'Upcoming scheduled maintenance and AMC renewal reminders' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Toggle
                  checked={notifications[item.key as keyof typeof notifications]}
                  onChange={v => setNotifications(p => ({ ...p, [item.key]: v }))}
                />
              </div>
            ))}
          </div>
          <Button className="mt-5 gradient-fire text-white border-0 hover:opacity-90" size="sm" onClick={handleSaveNotifications} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />Save Preferences
          </Button>
        </div>

        {/* Security */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-5 flex items-center gap-2"><Shield className="w-4 h-4 text-blue-500" />Security Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Add an extra layer of security with 2FA via authenticator app</p>
              </div>
              <Toggle checked={security.twoFactor} onChange={v => setSecurity(p => ({ ...p, twoFactor: v }))} />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium">Login Alerts</p>
                <p className="text-xs text-muted-foreground">Get notified when a new device logs into your account</p>
              </div>
              <Toggle checked={security.loginAlerts} onChange={v => setSecurity(p => ({ ...p, loginAlerts: v }))} />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium">Session Timeout</p>
                <p className="text-xs text-muted-foreground">Auto-logout after inactivity period</p>
              </div>
              <select className="input-field w-auto text-sm" value={security.sessionTimeout} onChange={e => setSecurity(p => ({ ...p, sessionTimeout: e.target.value }))}>
                <option value="1h">1 Hour</option>
                <option value="4h">4 Hours</option>
                <option value="8h">8 Hours</option>
                <option value="24h">24 Hours</option>
              </select>
            </div>
          </div>
          <Button className="mt-5" variant="outline" size="sm" onClick={handleSaveSecurity} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />Update Security
          </Button>
        </div>

        {/* Change Password */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-5 flex items-center gap-2"><Lock className="w-4 h-4 text-purple-500" />Change Password</h3>
          <form onSubmit={handleChangePassword} className="space-y-4">
            {[
              { label: 'Current Password', key: 'current' },
              { label: 'New Password', key: 'newPass' },
              { label: 'Confirm New Password', key: 'confirm' },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-sm font-medium mb-1.5">{field.label}</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    className="input-field pr-12"
                    placeholder="••••••••"
                    value={passwordForm[field.key as keyof typeof passwordForm]}
                    onChange={e => setPasswordForm(p => ({ ...p, [field.key]: e.target.value }))}
                  />
                  {field.key === 'current' && (
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            ))}
            <Button type="submit" className="gradient-fire text-white border-0 hover:opacity-90" size="sm" disabled={saving}>
              <Key className="w-4 h-4 mr-2" />Change Password
            </Button>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="bg-card border border-red-200 dark:border-red-900/40 rounded-2xl p-6">
          <h3 className="font-semibold mb-2 text-red-600 dark:text-red-400">Danger Zone</h3>
          <p className="text-sm text-muted-foreground mb-4">These actions are irreversible. Please proceed with caution.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" size="sm" className="border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
              Export All Data
            </Button>
            <Button variant="outline" size="sm" className="border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => toast.error('Account deletion requires contacting support.')}>
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
