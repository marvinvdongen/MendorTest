export const dashboardStats = {
  activeProjects: 8,
  pendingInvoices: 12,
  totalRevenue: '$47,250',
  hoursThisWeek: 38.5,
  upcomingTasks: 5,
  overdueInvoices: 2,
};

export const recentActivity = [
  { id: '1', type: 'invoice', text: 'Invoice #1042 paid by Johnson Residence', time: '2h ago', icon: 'checkmark-circle' as const },
  { id: '2', type: 'project', text: 'New project: Kitchen Remodel - Smith', time: '4h ago', icon: 'hammer' as const },
  { id: '3', type: 'schedule', text: 'Site visit scheduled for 234 Oak St', time: '6h ago', icon: 'calendar' as const },
  { id: '4', type: 'client', text: 'New client: Maria Rodriguez added', time: '1d ago', icon: 'person-add' as const },
  { id: '5', type: 'time', text: 'Time entry: 6.5h on Bathroom Renovation', time: '1d ago', icon: 'time' as const },
];

export type ProjectStatus = 'active' | 'completed' | 'on-hold' | 'pending';

export interface Project {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  progress: number;
  budget: string;
  spent: string;
  startDate: string;
  endDate: string;
  address: string;
}

export const projects: Project[] = [
  { id: '1', name: 'Kitchen Remodel', client: 'John Smith', status: 'active', progress: 65, budget: '$28,000', spent: '$18,200', startDate: 'Jan 15', endDate: 'Mar 30', address: '123 Main St' },
  { id: '2', name: 'Bathroom Renovation', client: 'Sarah Johnson', status: 'active', progress: 40, budget: '$15,000', spent: '$6,000', startDate: 'Feb 1', endDate: 'Apr 15', address: '456 Elm Ave' },
  { id: '3', name: 'Deck Construction', client: 'Mike Williams', status: 'pending', progress: 0, budget: '$12,500', spent: '$0', startDate: 'Mar 1', endDate: 'Apr 1', address: '789 Oak Dr' },
  { id: '4', name: 'Roof Repair', client: 'Emily Davis', status: 'active', progress: 85, budget: '$8,000', spent: '$6,800', startDate: 'Jan 20', endDate: 'Feb 28', address: '321 Pine Ln' },
  { id: '5', name: 'Basement Finishing', client: 'Robert Brown', status: 'on-hold', progress: 30, budget: '$35,000', spent: '$10,500', startDate: 'Dec 10', endDate: 'May 15', address: '654 Cedar Rd' },
  { id: '6', name: 'Window Replacement', client: 'Lisa Anderson', status: 'completed', progress: 100, budget: '$6,500', spent: '$6,200', startDate: 'Nov 1', endDate: 'Jan 10', address: '987 Birch Way' },
  { id: '7', name: 'Garage Addition', client: 'Tom Wilson', status: 'active', progress: 20, budget: '$45,000', spent: '$9,000', startDate: 'Feb 10', endDate: 'Jun 30', address: '147 Maple Ct' },
  { id: '8', name: 'Fence Installation', client: 'Nancy Taylor', status: 'completed', progress: 100, budget: '$4,200', spent: '$3,900', startDate: 'Jan 5', endDate: 'Jan 25', address: '258 Walnut Blvd' },
];

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  projectCount: number;
  totalSpent: string;
  avatar: string;
}

export const clients: Client[] = [
  { id: '1', name: 'John Smith', email: 'john.smith@email.com', phone: '(555) 123-4567', address: '123 Main St, Springfield', projectCount: 2, totalSpent: '$42,000', avatar: 'JS' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '(555) 234-5678', address: '456 Elm Ave, Riverside', projectCount: 1, totalSpent: '$15,000', avatar: 'SJ' },
  { id: '3', name: 'Mike Williams', email: 'mike.w@email.com', phone: '(555) 345-6789', address: '789 Oak Dr, Lakewood', projectCount: 3, totalSpent: '$67,500', avatar: 'MW' },
  { id: '4', name: 'Emily Davis', email: 'emily.d@email.com', phone: '(555) 456-7890', address: '321 Pine Ln, Greenville', projectCount: 1, totalSpent: '$8,000', avatar: 'ED' },
  { id: '5', name: 'Robert Brown', email: 'r.brown@email.com', phone: '(555) 567-8901', address: '654 Cedar Rd, Hillside', projectCount: 2, totalSpent: '$52,000', avatar: 'RB' },
  { id: '6', name: 'Lisa Anderson', email: 'lisa.a@email.com', phone: '(555) 678-9012', address: '987 Birch Way, Meadowbrook', projectCount: 1, totalSpent: '$6,500', avatar: 'LA' },
  { id: '7', name: 'Tom Wilson', email: 'tom.wilson@email.com', phone: '(555) 789-0123', address: '147 Maple Ct, Oakville', projectCount: 1, totalSpent: '$45,000', avatar: 'TW' },
  { id: '8', name: 'Maria Rodriguez', email: 'maria.r@email.com', phone: '(555) 890-1234', address: '369 Spruce St, Brookfield', projectCount: 0, totalSpent: '$0', avatar: 'MR' },
];

export type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'draft';

export interface Invoice {
  id: string;
  number: string;
  client: string;
  project: string;
  amount: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
}

export const invoices: Invoice[] = [
  { id: '1', number: 'INV-1042', client: 'Sarah Johnson', project: 'Bathroom Renovation', amount: '$3,500', status: 'paid', issueDate: 'Feb 1', dueDate: 'Feb 15' },
  { id: '2', number: 'INV-1041', client: 'John Smith', project: 'Kitchen Remodel', amount: '$7,200', status: 'paid', issueDate: 'Jan 28', dueDate: 'Feb 12' },
  { id: '3', number: 'INV-1040', client: 'Emily Davis', project: 'Roof Repair', amount: '$4,000', status: 'pending', issueDate: 'Feb 5', dueDate: 'Feb 20' },
  { id: '4', number: 'INV-1039', client: 'Robert Brown', project: 'Basement Finishing', amount: '$10,500', status: 'overdue', issueDate: 'Jan 10', dueDate: 'Jan 25' },
  { id: '5', number: 'INV-1038', client: 'Tom Wilson', project: 'Garage Addition', amount: '$9,000', status: 'pending', issueDate: 'Feb 8', dueDate: 'Feb 22' },
  { id: '6', number: 'INV-1037', client: 'Lisa Anderson', project: 'Window Replacement', amount: '$6,200', status: 'paid', issueDate: 'Jan 5', dueDate: 'Jan 20' },
  { id: '7', number: 'INV-1036', client: 'Mike Williams', project: 'Deck Construction', amount: '$5,000', status: 'draft', issueDate: '', dueDate: '' },
  { id: '8', number: 'INV-1035', client: 'John Smith', project: 'Kitchen Remodel', amount: '$5,600', status: 'overdue', issueDate: 'Dec 20', dueDate: 'Jan 5' },
];

export interface TimeEntry {
  id: string;
  project: string;
  date: string;
  hours: number;
  description: string;
  billable: boolean;
}

export const timeEntries: TimeEntry[] = [
  { id: '1', project: 'Kitchen Remodel', date: 'Today', hours: 6.5, description: 'Cabinet installation', billable: true },
  { id: '2', project: 'Roof Repair', date: 'Today', hours: 3.0, description: 'Shingle replacement', billable: true },
  { id: '3', project: 'Bathroom Renovation', date: 'Yesterday', hours: 7.0, description: 'Tile work', billable: true },
  { id: '4', project: 'Garage Addition', date: 'Yesterday', hours: 2.0, description: 'Site preparation', billable: true },
  { id: '5', project: 'Kitchen Remodel', date: 'Feb 4', hours: 8.0, description: 'Countertop templating', billable: true },
  { id: '6', project: 'Basement Finishing', date: 'Feb 4', hours: 1.5, description: 'Material ordering', billable: false },
  { id: '7', project: 'Roof Repair', date: 'Feb 3', hours: 5.5, description: 'Underlayment install', billable: true },
  { id: '8', project: 'Bathroom Renovation', date: 'Feb 3', hours: 6.0, description: 'Plumbing rough-in', billable: true },
];

export interface ScheduleEvent {
  id: string;
  title: string;
  project: string;
  date: string;
  time: string;
  type: 'site-visit' | 'meeting' | 'deadline' | 'delivery' | 'inspection';
  location: string;
}

export const scheduleEvents: ScheduleEvent[] = [
  { id: '1', title: 'Cabinet delivery', project: 'Kitchen Remodel', date: 'Today', time: '9:00 AM', type: 'delivery', location: '123 Main St' },
  { id: '2', title: 'Client meeting', project: 'Deck Construction', date: 'Today', time: '2:00 PM', type: 'meeting', location: '789 Oak Dr' },
  { id: '3', title: 'Building inspection', project: 'Garage Addition', date: 'Tomorrow', time: '10:00 AM', type: 'inspection', location: '147 Maple Ct' },
  { id: '4', title: 'Site visit', project: 'Basement Finishing', date: 'Tomorrow', time: '3:00 PM', type: 'site-visit', location: '654 Cedar Rd' },
  { id: '5', title: 'Tile delivery', project: 'Bathroom Renovation', date: 'Feb 10', time: '8:00 AM', type: 'delivery', location: '456 Elm Ave' },
  { id: '6', title: 'Final walkthrough', project: 'Roof Repair', date: 'Feb 12', time: '11:00 AM', type: 'site-visit', location: '321 Pine Ln' },
  { id: '7', title: 'Permit deadline', project: 'Deck Construction', date: 'Feb 15', time: '', type: 'deadline', location: 'City Hall' },
  { id: '8', title: 'Client presentation', project: 'Basement Finishing', date: 'Feb 18', time: '1:00 PM', type: 'meeting', location: '654 Cedar Rd' },
];
