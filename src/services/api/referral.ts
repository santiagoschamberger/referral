import api from '../axios';
import { ZohoResponse } from './types';

interface PublicReferralSubmission {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phoneNumber: string;
  description: string;
}

export async function submitPublicReferral(referral: PublicReferralSubmission): Promise<void> {
  try {
    const response = await api.post<ZohoResponse>('/leads/referral/by-uuid', {
      uuid: referral.uuid,
      First_Name: referral.firstName,
      Last_Name: referral.lastName,
      Email: referral.email,
      Company: referral.company,
      Title: referral.phoneNumber, // Using Title field for phone number as per API
      Description: referral.description
    });

    if (response.data?.data?.[0]?.code === 'DUPLICATE_DATA') {
      throw new Error('A referral with this email already exists');
    }

    if (response.data?.data?.[0]?.code !== 'SUCCESS') {
      throw new Error(response.data?.data?.[0]?.message || 'Failed to submit referral');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to submit referral');
  }
}