import axios from 'axios';
import type { Referral, Stats, Deal, ReferralStatus } from '../types';
import api from './axios';

interface ReferralSubmission {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  title: string;
  description: string;
}

interface ZohoLeadResponse {
  message: string;
  leads: Array<{
    id: string;
    Full_Name: string;
    Company: string;
    Lead_Status: string | null;
    Created_Time: string;
    Email: string | null;
    Phone: string | null;
    Contact_Number: string | null;
  }>;
}

interface ZohoResponse {
  data: Array<{
    code: string;
    details?: {
      api_name?: string;
      id?: string;
    };
    message: string;
    status: string;
  }>;
}

class ZohoService {
  async getLeads(signal?: AbortSignal): Promise<Referral[]> {
    try {
      const response = await api.get<ZohoLeadResponse>('/leads/by-lead-source', { signal });

      if (!response.data?.leads) {
        return [];
      }

      return response.data.leads.map((lead) => ({
        id: lead.id,
        Full_Name: lead.Full_Name || 'Unknown',
        Company: lead.Company || 'N/A',
        Lead_Status: lead.Lead_Status as ReferralStatus,
        Created_Time: lead.Created_Time,
        Email: lead.Email,
        Phone: lead.Phone,
        Contact_Number: lead.Contact_Number
      }));
    } catch (error) {
      console.error('Error fetching leads:', error);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch leads');
      }
      throw new Error('Failed to fetch leads');
    }
  }

  async getDeals(signal?: AbortSignal): Promise<Deal[]> {
    try {
      const response = await api.get('/leads/deals/by-referrer', { signal });

      if (!response.data?.deals) {
        return [];
      }

      return response.data.deals.map((deal: any) => ({
        id: deal.id,
        Deal_Name: deal.Deal_Name || 'Unnamed Deal',
        Amount: parseFloat(deal.Amount) || 0,
        Stage: deal.Stage || 'Unknown',
        Lead_Source: deal.Lead_Source,
        Created_Time: deal.Created_Time
      }));
    } catch (error) {
      console.error('Error fetching deals:', error);
      throw new Error('Failed to fetch deals');
    }
  }

  async getStats(signal?: AbortSignal): Promise<Stats> {
    try {
      const leads = await this.getLeads(signal);
      const now = new Date();
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

      // Current month leads
      const currentMonthLeads = leads.filter(lead =>
        new Date(lead.Created_Time) >= lastMonth && new Date(lead.Created_Time) <= now
      );

      // Last month leads
      const previousMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() - 1, lastMonth.getDate());
      const lastMonthLeads = leads.filter(lead =>
        new Date(lead.Created_Time) >= previousMonth && new Date(lead.Created_Time) < lastMonth
      );

      // Calculate conversion rates
      const isConverted = (status: ReferralStatus) => 
        ['Convert', 'Signed Application'].includes(status || '');
      const isActive = (status: ReferralStatus) => 
        !['Convert', 'Lost'].includes(status || '');

      // Current period stats
      const totalReferrals = currentMonthLeads.length;
      const convertedLeads = currentMonthLeads.filter(lead => isConverted(lead.Lead_Status)).length;
      const activeLeads = currentMonthLeads.filter(lead => isActive(lead.Lead_Status)).length;
      const conversionRate = totalReferrals > 0 ? (convertedLeads / totalReferrals) * 100 : 0;

      // Last period stats
      const lastMonthTotal = lastMonthLeads.length;
      const lastMonthConverted = lastMonthLeads.filter(lead => isConverted(lead.Lead_Status)).length;
      const lastMonthActive = lastMonthLeads.filter(lead => isActive(lead.Lead_Status)).length;
      const lastMonthConversion = lastMonthTotal > 0 ? (lastMonthConverted / lastMonthTotal) * 100 : 0;

      // Calculate growth
      const referralGrowth = lastMonthTotal > 0
        ? ((totalReferrals - lastMonthTotal) / lastMonthTotal) * 100
        : totalReferrals > 0 ? 100 : 0;

      const conversionGrowth = lastMonthConversion > 0
        ? conversionRate - lastMonthConversion
        : conversionRate;

      const leadsGrowth = lastMonthActive > 0
        ? activeLeads - lastMonthActive
        : activeLeads;

      return {
        totalReferrals,
        conversionRate: Math.round(conversionRate * 10) / 10,
        activeLeads,
        monthlyGrowth: {
          referrals: Math.round(referralGrowth * 10) / 10,
          conversion: Math.round(conversionGrowth * 10) / 10,
          leads: leadsGrowth
        }
      };
    } catch (error) {
      console.error('Error calculating stats:', error);
      return {
        totalReferrals: 0,
        conversionRate: 0,
        activeLeads: 0,
        monthlyGrowth: {
          referrals: 0,
          conversion: 0,
          leads: 0
        }
      };
    }
  }

  async submitReferral(referral: ReferralSubmission): Promise<void> {
    try {
      const response = await api.post<ZohoResponse>('/leads/referral', {
        Last_Name: referral.lastName,
        First_Name: referral.firstName,
        Email: referral.email,
        Company: referral.company,
        Title: referral.title,
        Description: referral.description
      });

      if (response.data?.data?.[0]?.code === 'DUPLICATE_DATA') {
        throw new Error('A referral with this email already exists');
      }

      if (response.data?.data?.[0]?.code !== 'SUCCESS') {
        throw new Error(response.data?.data?.[0]?.message || 'Failed to submit referral');
      }
    } catch (error) {
      console.error('Error submitting referral:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.data?.[0]?.code === 'DUPLICATE_DATA') {
          throw new Error('A referral with this email already exists');
        }
        throw new Error(error.response?.data?.message || 'Failed to submit referral');
      }
      throw error;
    }
  }
}

export const zohoService = new ZohoService();