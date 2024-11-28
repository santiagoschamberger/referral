export interface User {
  uuid: string;
  full_name: string;
  email: string;
  role: 'admin' | 'user';
  partner_id?: string;
  compensation_link: string | null;
  created_at?: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  video_link: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateTutorialInput {
  title: string;
  description: string;
  video_link: string;
  is_public: boolean;
}

export interface UpdateTutorialInput {
  title?: string;
  description?: string;
  video_link?: string;
  is_public?: boolean;
}

export interface PaginationMetadata {
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMetadata;
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

export interface AuthResponse {
  status: string;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface Deal {
  id: string;
  Deal_Name: string;
  Amount: number;
  Stage: string;
  Lead_Source: string;
  Created_Time: string;
}