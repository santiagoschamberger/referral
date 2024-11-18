export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  compensationLink?: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
}

export interface Referral {
  id: string;
  name: string;
  company: string;
  status: 'In Progress' | 'Contacted' | 'Qualified' | 'Closed';
  date: string;
  email?: string;
  phone?: string;
}

export interface Stats {
  totalReferrals: number;
  conversionRate: number;
  activeLeads: number;
  monthlyGrowth: {
    referrals: number;
    conversion: number;
    leads: number;
  };
}