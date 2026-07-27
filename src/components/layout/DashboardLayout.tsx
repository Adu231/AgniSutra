import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Flame, ClipboardCheck, AlertTriangle, Siren,
  Wifi, GraduationCap, Shield, BarChart3, User, Settings, LogOut,
  ChevronLeft, ChevronRight, Bell, Moon, Sun, Menu, X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { DASHBOARD_NAV, DASHBOARD_ACCOUNT } from '@/constants';

const ICON_MAP: Record<string, React.FC<any>> = {
  LayoutDashboard, Flame, ClipboardCheck, AlertTriangle, Siren,
  Wifi, GraduationCap, Shield, BarChart3, User, Settings,
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (href: string) => location.pathname === href;

  const SidebarContent = () => (
    <div className="flex flex-col h-full sidebar-gradient">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-sidebar-border ${sidebarCollapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 rounded-lg gradient-fire flex items-center justify-center flex-shrink-0">
          <Flame className="w-4 h-4 text-white" />
        </div>
        {!sidebarCollapsed && (
          <span className="text-white font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            AgniSutra
          </span>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {DASHBOARD_NAV.map((item) => {
          const Icon = ICON_MAP[item.icon] || LayoutDashboard;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileSidebarOpen(false)}
              className={`sidebar-item ${
                active
                  ? 'bg-red-600 text-white'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-white'
              } ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
              title={sidebarCollapsed ? item.label : ''}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Account */}
      <div className="border-t border-sidebar-border px-3 py-3 space-y-1">
        {DASHBOARD_ACCOUNT.map((item) => {
          const Icon = ICON_MAP[item.icon] || User;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileSidebarOpen(false)}
              className={`sidebar-item ${
                active ? 'bg-red-600 text-white' : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-white'
              } ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
              title={sidebarCollapsed ? item.label : ''}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className={`sidebar-item w-full text-left text-sidebar-foreground hover:bg-red-900/40 hover:text-red-400 ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
          title={sidebarCollapsed ? 'Sign Out' : ''}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!sidebarCollapsed && <span>Sign Out</span>}
        </button>
      </div>

      {/* User Info */}
      {!sidebarCollapsed && (
        <div className="px-4 py-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full gradient-fire flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">{user?.name}</p>
              <p className="text-sidebar-foreground text-xs truncate">{user?.role?.replace(/_/g, ' ')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <div className={`hidden md:flex flex-col flex-shrink-0 transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <SidebarContent />
        {/* Collapse Toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute top-20 bg-sidebar-accent text-white rounded-full w-6 h-6 flex items-center justify-center border border-sidebar-border shadow-lg transition-all z-10"
          style={{ left: sidebarCollapsed ? '52px' : '252px' }}
        >
          {sidebarCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/60 z-40"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="md:hidden fixed left-0 top-0 bottom-0 w-64 z-50">
            <SidebarContent />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="bg-card border-b border-border px-4 sm:px-6 h-16 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            {title && (
              <h1 className="text-lg font-semibold truncate max-w-[120px] sm:max-w-[280px]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {title}
              </h1>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button className="relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-border">
              <Link
                to="/dashboard/profile"
                className="w-8 h-8 rounded-full gradient-fire flex items-center justify-center text-white text-xs font-bold hover:ring-2 hover:ring-rose-500/50 dark:hover:ring-rose-400/50 transition-all cursor-pointer"
                title="View Profile"
              >
                {user?.name?.charAt(0) || 'U'}
              </Link>
              <div className="hidden sm:block">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role?.replace(/_/g, ' ')}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
