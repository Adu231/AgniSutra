import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { getRoleRedirect } from "@/constants";
import ScrollToTop from "@/components/layout/ScrollToTop";

// Public Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import NotFound from "./pages/NotFound";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Shared Dashboard Pages (legacy/shared)
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/dashboard/Profile";
import Settings from "./pages/dashboard/Settings";
import Equipment from "./pages/dashboard/Equipment";
import Inspections from "./pages/dashboard/Inspections";
import RiskAssessment from "./pages/dashboard/RiskAssessment";
import Emergency from "./pages/dashboard/Emergency";
import IoTMonitoring from "./pages/dashboard/IoTMonitoring";
import Training from "./pages/dashboard/Training";
import Analytics from "./pages/dashboard/Analytics";
import Compliance from "./pages/dashboard/Compliance";

// ── Safety Officer Dashboard ────────────────────────────────────────────────
import SafetyOfficerDashboard from "./pages/dashboard/safety-officer/Dashboard";
import SafetyEquipmentInspection from "./pages/dashboard/safety-officer/EquipmentInspection";
import SafetyIssueResolution from "./pages/dashboard/safety-officer/IssueResolution";
import SafetyComplianceReports from "./pages/dashboard/safety-officer/ComplianceReports";
import SafetyInspectionSchedule from "./pages/dashboard/safety-officer/InspectionSchedule";

// ── Fire Inspector Dashboard ─────────────────────────────────────────────────
import FireInspectorDashboard from "./pages/dashboard/fire-inspector/Dashboard";
import FireInspectorTaskList from "./pages/dashboard/fire-inspector/TaskList";
import FireInspectorConduct from "./pages/dashboard/fire-inspector/ConductInspection";
import FireInspectorEvidence from "./pages/dashboard/fire-inspector/EvidenceUpload";
import FireInspectorReports from "./pages/dashboard/fire-inspector/SubmitReports";

// ── Maintenance Technician Dashboard ─────────────────────────────────────────
import MaintenanceDashboard from "./pages/dashboard/maintenance/Dashboard";
import MaintenanceWorkOrders from "./pages/dashboard/maintenance/WorkOrders";
import MaintenanceServiceHistory from "./pages/dashboard/maintenance/ServiceHistory";
import MaintenanceEquipmentStatus from "./pages/dashboard/maintenance/EquipmentStatus";
import MaintenanceCloseTickets from "./pages/dashboard/maintenance/CloseTickets";

// ── Facility Manager Dashboard ────────────────────────────────────────────────
import FacilityManagerDashboard from "./pages/dashboard/facility-manager/Dashboard";
import FacilityComplianceMonitor from "./pages/dashboard/facility-manager/ComplianceMonitor";
import FacilityAnalytics from "./pages/dashboard/facility-manager/Analytics";
import FacilityAssetManagement from "./pages/dashboard/facility-manager/AssetManagement";
import FacilityTeamCoordination from "./pages/dashboard/facility-manager/TeamCoordination";

// ── Emergency Response Dashboard ──────────────────────────────────────────────
import EmergencyResponseDashboard from "./pages/dashboard/emergency-response/Dashboard";
import EmergencyAlertCenter from "./pages/dashboard/emergency-response/AlertCenter";
import EmergencyLiveNavigation from "./pages/dashboard/emergency-response/LiveNavigation";
import EmergencyResponsePlan from "./pages/dashboard/emergency-response/ResponsePlan";
import EmergencyIncidentClose from "./pages/dashboard/emergency-response/IncidentClose";

// ── Fire Department Dashboard ─────────────────────────────────────────────────
import FireDepartmentDashboard from "./pages/dashboard/fire-department/Dashboard";
import FireDeptIncomingIncidents from "./pages/dashboard/fire-department/IncomingIncidents";
import FireDeptBuildingDatabase from "./pages/dashboard/fire-department/BuildingDatabase";
import FireDeptResponseCoordination from "./pages/dashboard/fire-department/ResponseCoordination";

// ── Admin Dashboard ───────────────────────────────────────────────────────────
import AdminDashboard from "./pages/dashboard/admin/Dashboard";
import AdminOrganizations from "./pages/dashboard/admin/Organizations";
import AdminUserManagement from "./pages/dashboard/admin/UserManagement";
import AdminComplianceRules from "./pages/dashboard/admin/ComplianceRules";
import AdminAuditLogs from "./pages/dashboard/admin/AuditLogs";
import AdminSubscriptions from "./pages/dashboard/admin/Subscriptions";

const queryClient = new QueryClient();

// Redirects to role-specific dashboard after login
const RoleBasedRedirect: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        navigate(getRoleRedirect(user.role), { replace: true });
      } else if (!isAuthenticated) {
        navigate('/login', { replace: true });
      }
    }
  }, [user, isAuthenticated, isLoading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading your dashboard...</p>
      </div>
    </div>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground text-sm">Loading AgniSutra...</p>
      </div>
    </div>
  );
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  if (isAuthenticated && user) return <Navigate to={getRoleRedirect(user.role)} replace />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-right" />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* ── Public Routes ─────────────────────────────────────── */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsAndConditions />} />

              {/* ── Auth Routes ───────────────────────────────────────── */}
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* ── Role-Based Entry Point ────────────────────────────── */}
              <Route path="/dashboard" element={<ProtectedRoute><RoleBasedRedirect /></ProtectedRoute>} />

              {/* ── Safety Officer ────────────────────────────────────── */}
              <Route path="/dashboard/safety-officer" element={<ProtectedRoute><SafetyOfficerDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/safety-officer/equipment" element={<ProtectedRoute><SafetyEquipmentInspection /></ProtectedRoute>} />
              <Route path="/dashboard/safety-officer/issues" element={<ProtectedRoute><SafetyIssueResolution /></ProtectedRoute>} />
              <Route path="/dashboard/safety-officer/reports" element={<ProtectedRoute><SafetyComplianceReports /></ProtectedRoute>} />
              <Route path="/dashboard/safety-officer/schedule" element={<ProtectedRoute><SafetyInspectionSchedule /></ProtectedRoute>} />

              {/* ── Fire Inspector ────────────────────────────────────── */}
              <Route path="/dashboard/fire-inspector" element={<ProtectedRoute><FireInspectorDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/fire-inspector/tasks" element={<ProtectedRoute><FireInspectorTaskList /></ProtectedRoute>} />
              <Route path="/dashboard/fire-inspector/inspect" element={<ProtectedRoute><FireInspectorConduct /></ProtectedRoute>} />
              <Route path="/dashboard/fire-inspector/evidence" element={<ProtectedRoute><FireInspectorEvidence /></ProtectedRoute>} />
              <Route path="/dashboard/fire-inspector/reports" element={<ProtectedRoute><FireInspectorReports /></ProtectedRoute>} />

              {/* ── Maintenance Technician ────────────────────────────── */}
              <Route path="/dashboard/maintenance" element={<ProtectedRoute><MaintenanceDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/maintenance/work-orders" element={<ProtectedRoute><MaintenanceWorkOrders /></ProtectedRoute>} />
              <Route path="/dashboard/maintenance/history" element={<ProtectedRoute><MaintenanceServiceHistory /></ProtectedRoute>} />
              <Route path="/dashboard/maintenance/status" element={<ProtectedRoute><MaintenanceEquipmentStatus /></ProtectedRoute>} />
              <Route path="/dashboard/maintenance/tickets" element={<ProtectedRoute><MaintenanceCloseTickets /></ProtectedRoute>} />

              {/* ── Facility Manager ──────────────────────────────────── */}
              <Route path="/dashboard/facility-manager" element={<ProtectedRoute><FacilityManagerDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/facility-manager/compliance" element={<ProtectedRoute><FacilityComplianceMonitor /></ProtectedRoute>} />
              <Route path="/dashboard/facility-manager/analytics" element={<ProtectedRoute><FacilityAnalytics /></ProtectedRoute>} />
              <Route path="/dashboard/facility-manager/assets" element={<ProtectedRoute><FacilityAssetManagement /></ProtectedRoute>} />
              <Route path="/dashboard/facility-manager/teams" element={<ProtectedRoute><FacilityTeamCoordination /></ProtectedRoute>} />

              {/* ── Emergency Response ────────────────────────────────── */}
              <Route path="/dashboard/emergency-response" element={<ProtectedRoute><EmergencyResponseDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/emergency-response/alerts" element={<ProtectedRoute><EmergencyAlertCenter /></ProtectedRoute>} />
              <Route path="/dashboard/emergency-response/navigation" element={<ProtectedRoute><EmergencyLiveNavigation /></ProtectedRoute>} />
              <Route path="/dashboard/emergency-response/plans" element={<ProtectedRoute><EmergencyResponsePlan /></ProtectedRoute>} />
              <Route path="/dashboard/emergency-response/close" element={<ProtectedRoute><EmergencyIncidentClose /></ProtectedRoute>} />

              {/* ── Fire Department ───────────────────────────────────── */}
              <Route path="/dashboard/fire-department" element={<ProtectedRoute><FireDepartmentDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/fire-department/incidents" element={<ProtectedRoute><FireDeptIncomingIncidents /></ProtectedRoute>} />
              <Route path="/dashboard/fire-department/buildings" element={<ProtectedRoute><FireDeptBuildingDatabase /></ProtectedRoute>} />
              <Route path="/dashboard/fire-department/coordinate" element={<ProtectedRoute><FireDeptResponseCoordination /></ProtectedRoute>} />

              {/* ── Admin ─────────────────────────────────────────────── */}
              <Route path="/dashboard/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/admin/organizations" element={<ProtectedRoute><AdminOrganizations /></ProtectedRoute>} />
              <Route path="/dashboard/admin/users" element={<ProtectedRoute><AdminUserManagement /></ProtectedRoute>} />
              <Route path="/dashboard/admin/compliance" element={<ProtectedRoute><AdminComplianceRules /></ProtectedRoute>} />
              <Route path="/dashboard/admin/audit" element={<ProtectedRoute><AdminAuditLogs /></ProtectedRoute>} />
              <Route path="/dashboard/admin/subscriptions" element={<ProtectedRoute><AdminSubscriptions /></ProtectedRoute>} />

              {/* ── Shared Pages ──────────────────────────────────────── */}
              <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

              {/* ── Legacy Generic Dashboard ──────────────────────────── */}
              <Route path="/dashboard/equipment" element={<ProtectedRoute><Equipment /></ProtectedRoute>} />
              <Route path="/dashboard/inspections" element={<ProtectedRoute><Inspections /></ProtectedRoute>} />
              <Route path="/dashboard/risk" element={<ProtectedRoute><RiskAssessment /></ProtectedRoute>} />
              <Route path="/dashboard/emergency" element={<ProtectedRoute><Emergency /></ProtectedRoute>} />
              <Route path="/dashboard/iot" element={<ProtectedRoute><IoTMonitoring /></ProtectedRoute>} />
              <Route path="/dashboard/training" element={<ProtectedRoute><Training /></ProtectedRoute>} />
              <Route path="/dashboard/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
              <Route path="/dashboard/compliance" element={<ProtectedRoute><Compliance /></ProtectedRoute>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
