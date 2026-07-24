export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization: string;
  avatar?: string;
  phone?: string;
  department?: string;
  location?: string;
  joinedAt: string;
  lastActive: string;
  plan: 'free' | 'professional' | 'enterprise';
}

export type UserRole =
  | 'admin'
  | 'safety_officer'
  | 'fire_inspector'
  | 'maintenance_technician'
  | 'facility_manager'
  | 'emergency_responder'
  | 'fire_department';

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  location: string;
  floor: string;
  building: string;
  status: 'operational' | 'maintenance' | 'critical' | 'offline';
  lastInspected: string;
  nextInspection: string;
  serialNumber: string;
  qrCode: string;
  installDate: string;
}

export type EquipmentType =
  | 'extinguisher'
  | 'hydrant'
  | 'alarm_panel'
  | 'smoke_detector'
  | 'sprinkler'
  | 'exit_light'
  | 'hose_reel'
  | 'heat_detector';

export interface Inspection {
  id: string;
  title: string;
  type: string;
  facility: string;
  inspector: string;
  scheduledDate: string;
  completedDate?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'overdue';
  score?: number;
  violations: number;
  notes?: string;
}

export interface Incident {
  id: string;
  title: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  reportedBy: string;
  reportedAt: string;
  status: 'open' | 'responding' | 'contained' | 'resolved';
  description: string;
}

export interface WorkOrder {
  id: string;
  equipment: string;
  type: string;
  location: string;
  floor: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'parts_awaited' | 'completed' | 'closed';
  assignedTo: string;
  dueDate: string;
  createdAt: string;
  description: string;
  estimatedHours: number;
}

export interface RiskAssessment {
  id: string;
  facility: string;
  score: number;
  level: 'low' | 'medium' | 'high' | 'critical';
  factors: RiskFactor[];
  lastAssessed: string;
  nextAssessment: string;
}

export interface RiskFactor {
  category: string;
  score: number;
  description: string;
}

export interface Notification {
  id: string;
  type: 'alert' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: { monthly: number; annual: number };
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface DashboardMetric {
  label: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
  color: string;
}

export interface IoTDevice {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'online' | 'offline' | 'alert';
  lastReading: string;
  value: number;
  unit: string;
  battery?: number;
  signal: number;
}

export interface TrainingCourse {
  id: string;
  title: string;
  category: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  enrolled: number;
  completed: number;
  rating: number;
  instructor: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress?: number;
}

export interface DemoAccount {
  email: string;
  password: string;
  role: UserRole;
  name: string;
  label: string;
  org: string;
  redirectTo: string;
  color: string;
  description: string;
}
