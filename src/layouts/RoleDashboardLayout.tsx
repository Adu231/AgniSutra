import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Flame, LogOut, User, Settings, Menu, X, Moon, Sun, ChevronRight,
  LayoutDashboard, Wrench, FileText, AlertOctagon, ClipboardList,
  ClipboardCheck, Camera, Send, History, Activity, CheckSquare,
  Shield, BarChart3, Package, Users, Siren, Navigation, Map,
  CheckCircle, Building2, Radio, CreditCard, Building, FileSearch,
  Home, CalendarCheck, Search, Bell
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

interface NavItem {
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface RoleConfig {
  label: string;
  colorClass: string;
  textColorClass: string;
  bgLightClass: string;
  borderColorClass: string;
  nav: NavItem[];
}

const ROLE_CONFIGS: Record<string, RoleConfig> = {
  safety_officer: {
    label: 'Safety Officer',
    colorClass: 'bg-red-600',
    textColorClass: 'text-red-600 dark:text-red-400',
    bgLightClass: 'bg-red-50 dark:bg-red-900/20',
    borderColorClass: 'border-red-200 dark:border-red-800',
    nav: [
      { label: 'Overview', href: '/dashboard/safety-officer', Icon: LayoutDashboard },
      { label: 'Equipment Inspection', href: '/dashboard/safety-officer/equipment', Icon: Search },
      { label: 'Issue Resolution', href: '/dashboard/safety-officer/issues', Icon: AlertOctagon },
      { label: 'Compliance Reports', href: '/dashboard/safety-officer/reports', Icon: FileText },
      { label: 'Inspection Schedule', href: '/dashboard/safety-officer/schedule', Icon: CalendarCheck },
    ],
  },
  fire_inspector: {
    label: 'Fire Inspector',
    colorClass: 'bg-orange-600',
    textColorClass: 'text-orange-600 dark:text-orange-400',
    bgLightClass: 'bg-orange-50 dark:bg-orange-900/20',
    borderColorClass: 'border-orange-200 dark:border-orange-800',
    nav: [
      { label: 'Overview', href: '/dashboard/fire-inspector', Icon: LayoutDashboard },
      { label: 'My Tasks', href: '/dashboard/fire-inspector/tasks', Icon: ClipboardList },
      { label: 'Conduct Inspection', href: '/dashboard/fire-inspector/inspect', Icon: ClipboardCheck },
      { label: 'Upload Evidence', href: '/dashboard/fire-inspector/evidence', Icon: Camera },
      { label: 'Submit Reports', href: '/dashboard/fire-inspector/reports', Icon: Send },
    ],
  },
  maintenance_technician: {
    label: 'Maintenance Tech',
    colorClass: 'bg-blue-600',
    textColorClass: 'text-blue-600 dark:text-blue-400',
    bgLightClass: 'bg-blue-50 dark:bg-blue-900/20',
    borderColorClass: 'border-blue-200 dark:border-blue-800',
    nav: [
      { label: 'Overview', href: '/dashboard/maintenance', Icon: LayoutDashboard },
      { label: 'Work Orders', href: '/dashboard/maintenance/work-orders', Icon: Wrench },
      { label: 'Service History', href: '/dashboard/maintenance/history', Icon: History },
      { label: 'Equipment Status', href: '/dashboard/maintenance/status', Icon: Activity },
      { label: 'Close Tickets', href: '/dashboard/maintenance/tickets', Icon: CheckSquare },
    ],
  },
  facility_manager: {
    label: 'Facility Manager',
    colorClass: 'bg-purple-600',
    textColorClass: 'text-purple-600 dark:text-purple-400',
    bgLightClass: 'bg-purple-50 dark:bg-purple-900/20',
    borderColorClass: 'border-purple-200 dark:border-purple-800',
    nav: [
      { label: 'Overview', href: '/dashboard/facility-manager', Icon: LayoutDashboard },
      { label: 'Compliance Monitor', href: '/dashboard/facility-manager/compliance', Icon: Shield },
      { label: 'Analytics', href: '/dashboard/facility-manager/analytics', Icon: BarChart3 },
      { label: 'Asset Management', href: '/dashboard/facility-manager/assets', Icon: Package },
      { label: 'Team Coordination', href: '/dashboard/facility-manager/teams', Icon: Users },
    ],
  },
  emergency_responder: {
    label: 'Emergency Response',
    colorClass: 'bg-rose-600',
    textColorClass: 'text-rose-600 dark:text-rose-400',
    bgLightClass: 'bg-rose-50 dark:bg-rose-900/20',
    borderColorClass: 'border-rose-200 dark:border-rose-800',
    nav: [
      { label: 'Alert Center', href: '/dashboard/emergency-response', Icon: Siren },
      { label: 'Active Alerts', href: '/dashboard/emergency-response/alerts', Icon: AlertOctagon },
      { label: 'Navigate to Location', href: '/dashboard/emergency-response/navigation', Icon: Navigation },
      { label: 'Response Plans', href: '/dashboard/emergency-response/plans', Icon: Map },
      { label: 'Close Incidents', href: '/dashboard/emergency-response/close', Icon: CheckCircle },
    ],
  },
  fire_department: {
    label: 'Fire Department',
    colorClass: 'bg-amber-600',
    textColorClass: 'text-amber-600 dark:text-amber-400',
    bgLightClass: 'bg-amber-50 dark:bg-amber-900/20',
    borderColorClass: 'border-amber-200 dark:border-amber-800',
    nav: [
      { label: 'Dispatch Center', href: '/dashboard/fire-department', Icon: LayoutDashboard },
      { label: 'Incoming Incidents', href: '/dashboard/fire-department/incidents', Icon: Bell },
      { label: 'Building Database', href: '/dashboard/fire-department/buildings', Icon: Building },
      { label: 'Response Coordination', href: '/dashboard/fire-department/coordinate', Icon: Radio },
    ],
  },
  admin: {
    label: 'Administrator',
    colorClass: 'bg-slate-700',
    textColorClass: 'text-slate-700 dark:text-slate-300',
    bgLightClass: 'bg-slate-50 dark:bg-slate-800/30',
    borderColorClass: 'border-slate-200 dark:border-slate-700',
    nav: [
      { label: 'Platform Overview', href: '/dashboard/admin', Icon: LayoutDashboard },
      { label: 'Organizations', href: '/dashboard/admin/organizations', Icon: Building2 },
      { label: 'User Management', href: '/dashboard/admin/users', Icon: Users },
      { label: 'Compliance Rules', href: '/dashboard/admin/compliance', Icon: Shield },
      { label: 'Audit Logs', href: '/dashboard/admin/audit', Icon: FileSearch },
      { label: 'Subscriptions', href: '/dashboard/admin/subscriptions', Icon: CreditCard },
    ],
  },
};

interface RoleDashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const RoleDashboardLayout: React.FC<RoleDashboardLayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      setAvatar(localStorage.getItem(`user_avatar_${user.id}`));
    } else {
      setAvatar(null);
    }
  }, [user?.id]);

  useEffect(() => {
    const handleProfileUpdate = () => {
      if (user?.id) {
        setAvatar(localStorage.getItem(`user_avatar_${user.id}`));
      }
    };
    window.addEventListener('profile-update', handleProfileUpdate);
    return () => window.removeEventListener('profile-update', handleProfileUpdate);
  }, [user?.id]);

  const roleKey = user?.role || 'safety_officer';
  const config = ROLE_CONFIGS[roleKey] || ROLE_CONFIGS.safety_officer;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-border flex-shrink-0">
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setSidebarOpen(false)}>
            <div className="w-8 h-8 rounded-lg gradient-fire flex items-center justify-center group-hover:scale-110 transition-transform">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              <span className="gradient-fire-text">Agni</span>
              <span className="text-foreground">Sutra</span>
            </span>
          </Link>
        </div>

        {/* Role Badge */}
        <div className="px-4 py-3 border-b border-border flex-shrink-0">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-white ${config.colorClass}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
            {config.label}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="text-xs text-muted-foreground uppercase tracking-wider px-3 mb-2 font-medium">Navigation</p>
          {config.nav.map(({ label, href, Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                to={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                  active
                    ? `${config.bgLightClass} ${config.textColorClass} font-semibold`
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
              </Link>
            );
          })}

          {/* Account Section */}
          <div className="pt-4 mt-4 border-t border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wider px-3 mb-2 font-medium">Account</p>
            <Link
              to="/dashboard/profile"
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive('/dashboard/profile')
                  ? `${config.bgLightClass} ${config.textColorClass}`
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <User className="w-4 h-4" />
              Profile
            </Link>
            <Link
              to="/dashboard/settings"
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive('/dashboard/settings')
                  ? `${config.bgLightClass} ${config.textColorClass}`
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
          </div>
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-border flex-shrink-0">
          <div className="flex items-center gap-3 mb-3 p-2 rounded-lg bg-muted/50">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${config.colorClass}`}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.organization}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-150"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-card/95 backdrop-blur-sm border-b border-border h-14 flex items-center px-4 sm:px-6 justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="w-4 h-4" />
            </button>
            {title && (
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm font-semibold text-foreground truncate max-w-[120px] sm:max-w-[280px]">{title}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link
              to="/"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              title="Go to homepage"
            >
              <Home className="w-4 h-4" />
            </Link>
            <Link
              to="/dashboard/profile"
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold hover:ring-2 hover:ring-rose-500/50 dark:hover:ring-rose-400/50 transition-all cursor-pointer overflow-hidden ${config.colorClass}`}
              title="View Profile"
            >
              {avatar ? (
                <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                user?.name?.charAt(0) || 'U'
              )}
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default RoleDashboardLayout;
