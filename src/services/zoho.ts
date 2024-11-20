import axios from 'axios';
import type { Referral, Stats, ReferralStatus } from '../types';
import api from './axios';

interface ReferralSubmission {
	firstName: string;
	lastName: string;
	email: string;
	company: string;
	title: string;
	description: string;
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
	async getLeads(): Promise<Referral[]> {
		try {
			const response = await api.get('/leads/by-lead-source');

			if (!response.data?.leads) {
				return [];
			}

			return response.data.leads.map((lead: any) => ({
				id: lead.id,
				name: lead.Full_Name || `${lead.First_Name || ''} ${lead.Last_Name || ''}`.trim() || 'Unknown',
				company: lead.Company || 'N/A',
				status: (lead.Lead_Status || 'New') as ReferralStatus,
				date: new Date(lead.Created_Time).toISOString().split('T')[0],
				email: lead.Email || undefined,
				phone: lead.Phone || undefined,
			}));
		} catch (error) {
			console.error('Error fetching leads:', error);
			if (axios.isAxiosError(error)) {
				throw new Error(error.response?.data?.message || 'Failed to fetch leads');
			}
			throw new Error('Failed to fetch leads');
		}
	}

	async getStats(): Promise<Stats> {
		try {
			const leads = await this.getLeads();
			const now = new Date();
			const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

			// Current month leads
			const currentMonthLeads = leads.filter(lead =>
				new Date(lead.date) >= lastMonth && new Date(lead.date) <= now
			);

			// Last month leads
			const previousMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() - 1, lastMonth.getDate());
			const lastMonthLeads = leads.filter(lead =>
				new Date(lead.date) >= previousMonth && new Date(lead.date) < lastMonth
			);

			// Calculate conversion rates
			const isConverted = (status: ReferralStatus) =>
				['Convert', 'Signed Application'].includes(status);
			const isActive = (status: ReferralStatus) =>
				!['Convert', 'Lost'].includes(status);

			// Current period stats
			const totalReferrals = currentMonthLeads.length;
			const convertedLeads = currentMonthLeads.filter(lead => isConverted(lead.status)).length;
			const activeLeads = currentMonthLeads.filter(lead => isActive(lead.status)).length;
			const conversionRate = totalReferrals > 0 ? (convertedLeads / totalReferrals) * 100 : 0;

			// Last period stats
			const lastMonthTotal = lastMonthLeads.length;
			const lastMonthConverted = lastMonthLeads.filter(lead => isConverted(lead.status)).length;
			const lastMonthActive = lastMonthLeads.filter(lead => isActive(lead.status)).length;
			const lastMonthConversion = lastMonthTotal > 0 ? (lastMonthConverted / lastMonthTotal) * 100 : 0;

			// Calculate growth
			const referralGrowth = lastMonthTotal > 0
				? ((totalReferrals - lastMonthTotal) / lastMonthTotal) * 100
				: 100;
			const conversionGrowth = lastMonthConversion > 0
				? (conversionRate - lastMonthConversion)  // Direct difference for conversion rate
				: conversionRate;
			const leadsGrowth = activeLeads - lastMonthActive; // Direct difference for active leads

			return {
				totalReferrals,
				conversionRate: Math.round(conversionRate * 100) / 100,
				activeLeads,
				monthlyGrowth: {
					referrals: Math.round(referralGrowth * 10) / 10,
					conversion: Math.round(conversionGrowth * 100) / 100,
					leads: leadsGrowth
				}
			};
		} catch (error) {
			console.error('Error calculating stats:', error);
			throw new Error('Failed to calculate statistics');
		}
	}

	async submitReferral(referral: ReferralSubmission): Promise<void> {
		try {
			const payload = {
				Last_Name: referral.lastName,
				First_Name: referral.firstName,
				Email: referral.email,
				Company: referral.company,
				Title: referral.title,
				Description: referral.description,
			};

			const response = await api.post<ZohoResponse>('/leads/referral', payload);
			const result = response.data.data[0];

			if (result.code === 'DUPLICATE_DATA') {
				if (result.details?.api_name === 'Email') {
					throw new Error('A referral with this email address already exists in our system');
				}
				throw new Error('This referral appears to be a duplicate in our system');
			}

			if (result.code !== 'SUCCESS' || result.status === 'error') {
				throw new Error(result.message || 'Failed to create referral');
			}
		} catch (error) {
			console.error('Error submitting referral:', error);
			if (axios.isAxiosError(error)) {
				const zohoError = error.response?.data?.data?.[0];
				if (zohoError?.code === 'DUPLICATE_DATA') {
					if (zohoError.details?.api_name === 'Email') {
						throw new Error('A referral with this email address already exists in our system');
					}
					throw new Error('This referral appears to be a duplicate in our system');
				}
				throw new Error(zohoError?.message || 'Failed to submit referral');
			}
			throw error;
		}
	}
}

export const zohoService = new ZohoService();