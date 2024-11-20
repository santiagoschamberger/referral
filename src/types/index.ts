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

export type ReferralStatus = 
  | 'None'
  | 'New'
  | 'Sent Pre-Vet'
  | 'Contact Attempt 1'
  | 'Contact Attempt 2'
  | 'Sent Pre-App'
  | 'Pre-App Received'
  | 'Sent Application for Signature'
  | 'Signed Application'
  | 'Convert'
  | 'Lost';

export interface Referral {
  id: string;
  name: string;
  company: string;
  status: ReferralStatus;
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