import React, { useState, useRef } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, MapPin, Building2, Shield, Camera, Save, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    department: user?.department || '',
    location: user?.location || '',
    organization: user?.organization || '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updateProfile(form);
    setSaving(false);
    setSaved(true);
    toast.success('Profile updated successfully!');
    setTimeout(() => setSaved(false), 3000);
  };

  const [avatar, setAvatar] = useState<string | null>(localStorage.getItem('user_avatar'));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setAvatar(result);
      localStorage.setItem('user_avatar', result);
      toast.success('Profile picture updated successfully!');
      // Dispatch custom event to notify layout headers/sidebars
      window.dispatchEvent(new Event('profile-update'));
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const roleDisplay = user?.role?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';

  return (
    <RoleDashboardLayout title="My Profile">
      <div className="p-4 sm:p-6 max-w-4xl">
        {/* Header Card */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              className="hidden"
            />
            {avatar ? (
              <img
                src={avatar}
                alt="Profile Avatar"
                className="w-20 h-20 rounded-2xl object-cover border border-border cursor-pointer hover:opacity-90 transition-opacity"
                onClick={triggerFileInput}
              />
            ) : (
              <div
                onClick={triggerFileInput}
                className="w-20 h-20 rounded-2xl gradient-fire flex items-center justify-center text-white text-3xl font-black cursor-pointer hover:opacity-90 transition-opacity"
              >
                {form.name.charAt(0)}
              </div>
            )}
            <button
              onClick={triggerFileInput}
              type="button"
              className="absolute -bottom-2 -right-2 w-7 h-7 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-sm"
              title="Upload Photo"
            >
              <Camera className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{form.name}</h2>
            <p className="text-muted-foreground text-sm">{roleDisplay} · {form.organization}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-semibold rounded-full capitalize">
                {user?.plan} Plan
              </span>
              <span className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-semibold rounded-full">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-6 flex items-center gap-2">
              <User className="w-4 h-4 text-red-500" />
              Personal Information
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Full Name</label>
                  <input className="input-field" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email Address</label>
                  <input type="email" className="input-field" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Phone Number</label>
                  <input className="input-field" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Department</label>
                  <input className="input-field" value={form.department} onChange={e => setForm(p => ({ ...p, department: e.target.value }))} placeholder="Fire Safety & Compliance" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Organization</label>
                  <input className="input-field" value={form.organization} onChange={e => setForm(p => ({ ...p, organization: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Location</label>
                  <input className="input-field" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} placeholder="City, State" />
                </div>
              </div>
              <Button type="submit" className="gradient-fire text-white border-0 hover:opacity-90" disabled={saving}>
                {saving ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />Saving...</>
                ) : saved ? (
                  <><CheckCircle className="w-4 h-4 mr-2" />Saved!</>
                ) : (
                  <><Save className="w-4 h-4 mr-2" />Save Changes</>
                )}
              </Button>
            </form>
          </div>

          <div className="space-y-4">
            {/* Account Info */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold mb-4 text-sm">Account Details</h3>
              <div className="space-y-3">
                {[
                  { icon: Shield, label: 'Role', value: roleDisplay },
                  { icon: Building2, label: 'Organization', value: form.organization },
                  { icon: Mail, label: 'Email', value: form.email },
                  { icon: Phone, label: 'Phone', value: form.phone || 'Not set' },
                  { icon: MapPin, label: 'Location', value: form.location || 'Not set' },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-3">
                      <Icon className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-medium truncate">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Subscription */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold mb-3 text-sm">Subscription Plan</h3>
              <div className="flex items-center justify-between mb-3">
                <span className="capitalize font-bold text-red-600 dark:text-red-400">{user?.plan} Plan</span>
                <span className="text-xs text-muted-foreground">Active</span>
              </div>
              <Button variant="outline" className="w-full text-sm" size="sm" onClick={() => navigate('/pricing')}>
                Upgrade Plan
              </Button>
            </div>

            {/* Dates */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold mb-3 text-sm">Account Activity</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-xs">Member since</span>
                  <span className="text-xs font-medium">{user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-xs">Last active</span>
                  <span className="text-xs font-medium">Just now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleDashboardLayout>
  );
};

export default Profile;
