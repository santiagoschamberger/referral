import api from '../axios';
import { Referral, ReferralStatus } from '../../types';
import { ZohoLeadResponse, ReferralSubmission, ZohoResponse } from './types';
import { handleApiError } from './errorHandler';

export async function getLeads(signal?: AbortSignal): Promise<Referral[]> {
  try {
    const response = await api.get<ZohoLeadResponse>('/leads/by-lead-source', { signal });
    return (response.data?.leads || []).map((lead) => ({
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
    return handleApiError(error);
  }
}

export async function submitReferral(referral: ReferralSubmission): Promise<void> {
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
    handleApiError(error);
  }
}