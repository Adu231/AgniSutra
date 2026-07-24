import type { PricingPlan, Testimonial, FAQItem, BlogPost, DemoAccount, UserRole } from '@/types';

export const APP_NAME = 'AgniSutra';
export const APP_TAGLINE = 'AI-Powered Fire Safety & Emergency Management';
export const APP_DESCRIPTION = 'Next-generation platform for fire prevention, emergency response, and compliance management.';

export const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const DASHBOARD_NAV = [
  { label: 'Overview', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Equipment', href: '/dashboard/equipment', icon: 'Flame' },
  { label: 'Inspections', href: '/dashboard/inspections', icon: 'ClipboardCheck' },
  { label: 'Risk Assessment', href: '/dashboard/risk', icon: 'AlertTriangle' },
  { label: 'Emergency', href: '/dashboard/emergency', icon: 'Siren' },
  { label: 'IoT Monitoring', href: '/dashboard/iot', icon: 'Wifi' },
  { label: 'Training', href: '/dashboard/training', icon: 'GraduationCap' },
  { label: 'Compliance', href: '/dashboard/compliance', icon: 'Shield' },
  { label: 'Analytics', href: '/dashboard/analytics', icon: 'BarChart3' },
];

export const DASHBOARD_ACCOUNT = [
  { label: 'Profile', href: '/dashboard/profile', icon: 'User' },
  { label: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
];

// ─── Demo Accounts ────────────────────────────────────────────────────────────

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    email: 'officer@agnisutra.demo',
    password: 'demo123',
    role: 'safety_officer',
    name: 'Arjun Mehta',
    label: 'Safety Officer',
    org: 'DLF Commercial Properties',
    redirectTo: '/dashboard/safety-officer',
    color: 'bg-red-600',
    description: 'Inspect equipment, resolve issues & generate compliance reports',
  },
  {
    email: 'inspector@agnisutra.demo',
    password: 'demo123',
    role: 'fire_inspector',
    name: 'Suresh Kumar',
    label: 'Fire Inspector',
    org: 'Maharashtra Fire Services',
    redirectTo: '/dashboard/fire-inspector',
    color: 'bg-orange-600',
    description: 'Receive tasks, conduct inspections & upload field evidence',
  },
  {
    email: 'technician@agnisutra.demo',
    password: 'demo123',
    role: 'maintenance_technician',
    name: 'Rajesh Singh',
    label: 'Maintenance Tech',
    org: 'DLF Commercial Properties',
    redirectTo: '/dashboard/maintenance',
    color: 'bg-blue-600',
    description: 'View work orders, perform service & close maintenance tickets',
  },
  {
    email: 'manager@agnisutra.demo',
    password: 'demo123',
    role: 'facility_manager',
    name: 'Priya Sharma',
    label: 'Facility Manager',
    org: 'Apollo Hospitals Group',
    redirectTo: '/dashboard/facility-manager',
    color: 'bg-purple-600',
    description: 'Monitor compliance, review analytics & coordinate teams',
  },
  {
    email: 'emergency@agnisutra.demo',
    password: 'demo123',
    role: 'emergency_responder',
    name: 'Vikram Nair',
    label: 'Emergency Response',
    org: 'Tata Steel Manufacturing',
    redirectTo: '/dashboard/emergency-response',
    color: 'bg-rose-600',
    description: 'Receive alerts, navigate to incidents & execute response plans',
  },
  {
    email: 'firedept@agnisutra.demo',
    password: 'demo123',
    role: 'fire_department',
    name: 'Insp. Ramesh Patil',
    label: 'Fire Department',
    org: 'Mumbai Fire Brigade',
    redirectTo: '/dashboard/fire-department',
    color: 'bg-amber-600',
    description: 'Access building info, dispatch units & coordinate responses',
  },
  {
    email: 'admin@agnisutra.demo',
    password: 'demo123',
    role: 'admin',
    name: 'Kavitha Admin',
    label: 'Administrator',
    org: 'AgniSutra Technologies',
    redirectTo: '/dashboard/admin',
    color: 'bg-slate-700',
    description: 'Manage organizations, configure rules & monitor platform health',
  },
];

// ─── Role Redirect Utility ────────────────────────────────────────────────────

export const getRoleRedirect = (role: string): string => {
  const map: Record<string, string> = {
    admin: '/dashboard/admin',
    safety_officer: '/dashboard/safety-officer',
    fire_inspector: '/dashboard/fire-inspector',
    maintenance_technician: '/dashboard/maintenance',
    facility_manager: '/dashboard/facility-manager',
    emergency_responder: '/dashboard/emergency-response',
    fire_department: '/dashboard/fire-department',
  };
  return map[role] || '/dashboard/safety-officer';
};

// ─── Pricing Plans ────────────────────────────────────────────────────────────

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Starter',
    price: { monthly: 0, annual: 0 },
    description: 'Perfect for small facilities and getting started with fire safety management.',
    features: [
      'Up to 1 facility',
      '25 equipment items',
      'Basic inspection checklists',
      'Digital reports',
      'Email notifications',
      'Mobile app access',
      'Community support',
    ],
    highlighted: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    price: { monthly: 149, annual: 119 },
    description: 'Ideal for growing organizations with multiple facilities and teams.',
    features: [
      'Up to 10 facilities',
      'Unlimited equipment',
      'AI inspection assistant',
      'Risk heat maps',
      'IoT device integration (50)',
      'Advanced analytics',
      'Compliance calendar',
      'Emergency response console',
      'Priority support',
    ],
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: { monthly: 399, annual: 319 },
    description: 'For large enterprises, government, and multi-city operations.',
    features: [
      'Unlimited facilities',
      'Unlimited equipment',
      'Full AI Safety Suite',
      'GIS emergency mapping',
      'Unlimited IoT devices',
      'Custom compliance templates',
      'API integrations',
      'Digital twin support',
      'Dedicated account manager',
      'SLA guarantee',
      'Custom training programs',
    ],
    highlighted: false,
    badge: 'Best Value',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    role: 'Chief Safety Officer',
    organization: 'Tata Steel Manufacturing',
    content: 'AgniSutra transformed our fire safety operations. We reduced compliance gaps by 78% within the first quarter. The AI risk assessment has been a game-changer for our 12 facilities.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
  },
  {
    id: '2',
    name: 'Dr. Priya Sharma',
    role: 'Hospital Safety Director',
    organization: 'Apollo Hospitals Group',
    content: 'Managing fire safety across 23 hospital campuses was incredibly complex. AgniSutra gives us real-time visibility and automated compliance tracking. Our inspection time dropped by 60%.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
  },
  {
    id: '3',
    name: 'Michael Chen',
    role: 'Facilities Manager',
    organization: 'DLF Commercial Properties',
    content: 'The IoT monitoring and emergency response features are exceptional. We received an alert about a faulty smoke detector before it became an issue. Literally saved lives.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
  },
  {
    id: '4',
    name: 'Suresh Patel',
    role: 'Fire Safety Inspector',
    organization: 'Maharashtra Fire Services',
    content: 'The mobile field operations module is brilliant. QR scanning, geo-tagged inspections, and instant report generation have tripled our inspector efficiency.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh',
  },
  {
    id: '5',
    name: 'Anita Desai',
    role: 'EHS Manager',
    organization: 'Reliance Industries',
    content: 'Comprehensive platform that covers everything from equipment tracking to emergency coordination. The analytics dashboard provides insights that help us stay proactively safe.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anita',
  },
  {
    id: '6',
    name: 'James Williams',
    role: 'Airport Safety Director',
    organization: 'GMR Airports',
    content: "For a critical infrastructure like an airport, reliability is everything. AgniSutra's real-time monitoring and GIS mapping gives us the situational awareness we need 24/7.",
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: '1',
    question: 'What types of organizations can use AgniSutra?',
    answer: 'AgniSutra is designed for commercial buildings, manufacturing plants, hospitals, educational institutions, warehouses, hotels, malls, airports, government organizations, residential societies, and fire departments.',
    category: 'General',
  },
  {
    id: '2',
    question: 'How does the AI risk assessment work?',
    answer: 'Our AI engine analyzes multiple data points including equipment health, inspection history, incident records, occupancy data, building characteristics, and IoT sensor readings to generate comprehensive risk scores with specific mitigation recommendations.',
    category: 'Technology',
  },
  {
    id: '3',
    question: 'Does AgniSutra integrate with existing IoT fire safety devices?',
    answer: 'Yes! AgniSutra supports integration with major IoT fire safety device manufacturers including smoke detectors, heat sensors, gas leak detectors, water level monitors, and pump status sensors via REST APIs and MQTT protocol.',
    category: 'Technology',
  },
  {
    id: '4',
    question: 'Is the platform compliant with Indian fire safety regulations?',
    answer: 'AgniSutra includes built-in compliance templates for NBC (National Building Code), TAC (Tariff Advisory Committee), NFPA standards, local fire department requirements, and ISO standards.',
    category: 'Compliance',
  },
  {
    id: '5',
    question: 'How does the mobile app work for field inspectors?',
    answer: 'Our mobile app enables field inspectors to scan equipment QR codes, conduct inspections with digital checklists, capture geo-tagged photos, record voice notes, collect digital signatures, and generate instant PDF reports. Works offline and syncs automatically.',
    category: 'Features',
  },
  {
    id: '6',
    question: 'What happens during an emergency?',
    answer: 'When an incident is reported or IoT sensors detect an anomaly, AgniSutra immediately triggers SOS alerts to the emergency response team, notifies relevant contacts, activates the live incident dashboard, and provides digital evacuation plans.',
    category: 'Emergency',
  },
  {
    id: '7',
    question: 'How is our data secured?',
    answer: 'AgniSutra uses enterprise-grade security including AES-256 encryption at rest, TLS 1.3 in transit, role-based access control, multi-factor authentication, comprehensive audit logs, and SOC 2 Type II compliance.',
    category: 'Security',
  },
  {
    id: '8',
    question: 'Can I migrate data from my existing system?',
    answer: 'Yes, we provide data migration support for CSV imports, API-based migrations, and can work with your existing fire safety software. Our onboarding team guides the entire migration process.',
    category: 'General',
  },
  {
    id: '9',
    question: 'Is training provided for new users?',
    answer: 'We offer comprehensive onboarding including live training sessions, video tutorials, in-app guided walkthroughs, and 24/7 documentation access. Enterprise clients receive dedicated onboarding specialists.',
    category: 'Support',
  },
  {
    id: '10',
    question: 'What is the pricing model?',
    answer: 'AgniSutra offers flexible monthly and annual subscription plans. Annual plans save up to 20%. There are no long-term lock-in contracts — upgrade, downgrade, or cancel at any time.',
    category: 'Pricing',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'How AI is Revolutionizing Fire Safety Inspections in 2025',
    excerpt: 'Explore how artificial intelligence and machine learning are transforming traditional fire safety inspections into predictive, proactive safety systems.',
    category: 'Technology',
    author: 'Arjun Mehta',
    authorRole: 'Head of AI Research',
    publishedAt: '2025-07-15',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop',
    tags: ['AI', 'Fire Safety', 'Technology', 'Inspection'],
  },
  {
    id: '2',
    title: 'IoT Smart Monitoring: The Future of Fire Prevention',
    excerpt: 'Connected devices and real-time sensor networks are creating unprecedented situational awareness for fire safety professionals.',
    category: 'IoT',
    author: 'Neha Singh',
    authorRole: 'IoT Solutions Architect',
    publishedAt: '2025-07-08',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
    tags: ['IoT', 'Smart Building', 'Sensors', 'Prevention'],
  },
  {
    id: '3',
    title: 'NBC 2016 Compliance: A Complete Guide for Facility Managers',
    excerpt: 'Navigate the complex requirements of the National Building Code 2016 fire safety provisions with this comprehensive compliance guide.',
    category: 'Compliance',
    author: 'Vivek Sharma',
    authorRole: 'Compliance Expert',
    publishedAt: '2025-06-28',
    readTime: '12 min read',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
    tags: ['Compliance', 'NBC', 'Regulations', 'Safety'],
  },
  {
    id: '4',
    title: 'Emergency Evacuation Planning: Best Practices for Large Buildings',
    excerpt: 'Designing effective evacuation plans for high-rise buildings, hospitals, and other complex facilities requires careful planning and regular drills.',
    category: 'Emergency',
    author: 'Priya Nair',
    authorRole: 'Emergency Response Consultant',
    publishedAt: '2025-06-20',
    readTime: '10 min read',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop',
    tags: ['Emergency', 'Evacuation', 'Best Practices', 'Safety'],
  },
  {
    id: '5',
    title: 'Fire Risk Assessment Methodology: A Systematic Approach',
    excerpt: 'A detailed walkthrough of conducting comprehensive fire risk assessments that identify hazards and prioritize mitigation strategies.',
    category: 'Risk Management',
    author: 'Ravi Kumar',
    authorRole: 'Risk Assessment Specialist',
    publishedAt: '2025-06-12',
    readTime: '9 min read',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop',
    tags: ['Risk', 'Assessment', 'Methodology', 'Safety'],
  },
  {
    id: '6',
    title: 'Digital Transformation in Fire Safety: Case Studies from India',
    excerpt: 'How leading Indian organizations are leveraging technology to modernize their fire safety programs and achieve better outcomes.',
    category: 'Case Studies',
    author: 'Kavitha Rao',
    authorRole: 'Customer Success Manager',
    publishedAt: '2025-06-05',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop',
    tags: ['Digital', 'Transformation', 'India', 'Case Study'],
  },
];

export const STATS = [
  { value: '50,000+', label: 'Equipment Tracked', suffix: '' },
  { value: '2,500+', label: 'Facilities Protected', suffix: '' },
  { value: '99.9%', label: 'Platform Uptime', suffix: '' },
  { value: '78%', label: 'Compliance Improvement', suffix: '' },
];

export const FEATURES_LIST = [
  { icon: 'Flame', title: 'Fire Equipment Management', description: 'Track all fire protection equipment with QR codes, maintenance history, and real-time status monitoring.', color: 'text-red-500', bg: 'bg-red-500/10' },
  { icon: 'ClipboardCheck', title: 'AI Inspection & Compliance', description: 'Automate inspections with AI-powered checklists, violation tracking, and regulatory compliance management.', color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { icon: 'AlertTriangle', title: 'AI Risk Assessment', description: 'Analyze fire hazards with AI-driven risk scoring, heat map visualization, and predictive incident forecasting.', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  { icon: 'Siren', title: 'Emergency Response', description: 'Coordinate emergency actions with SOS alerts, live incident dashboards, and evacuation plan management.', color: 'text-red-600', bg: 'bg-red-600/10' },
  { icon: 'Wifi', title: 'IoT Smart Monitoring', description: 'Real-time monitoring of connected fire safety devices with anomaly detection and instant alerts.', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { icon: 'MapPin', title: 'GIS Emergency Mapping', description: 'Location-aware emergency intelligence with fire zone mapping, escape routes, and assembly points.', color: 'text-green-500', bg: 'bg-green-500/10' },
  { icon: 'GraduationCap', title: 'Employee Training', description: 'Improve preparedness with fire safety courses, mock drill scheduling, and certification tracking.', color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { icon: 'BarChart3', title: 'Analytics & Reporting', description: 'Executive dashboards, compliance analytics, equipment health reports, and operational insights.', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { icon: 'Shield', title: 'Preventive Maintenance', description: 'Manage AMC, schedule maintenance, assign technicians, and track service history for all equipment.', color: 'text-teal-500', bg: 'bg-teal-500/10' },
];
