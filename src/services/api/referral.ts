import api from '../axios';
import { ZohoResponse } from './types';

interface PublicReferralSubmission {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  businessType: string; // Added business type
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
      Business_Type: referral.businessType, // Added business type to payload
      Title: referral.phoneNumber,
      Description: referral.description
    });


    const leadData = response.data?.leadData?.data?.[0];
    const noteData = response.data?.noteData?.data?.[0];


    if (leadData?.code === 'DUPLICATE_DATA') {
      throw new Error(
        `A referral with this email already exists (Lead ID: ${leadData.details.id})`
      );
    }

    if (leadData?.code !== 'SUCCESS') {
      throw new Error(
        leadData?.message || 'Failed to create lead. Please try again later.'
      );
    }

    if (noteData?.code !== 'SUCCESS') {
      throw new Error(
        noteData?.message || 'Failed to create note. Please try again later.'
      );
    }

    console.log('Referral submitted successfully:', {
      leadId: leadData.details.id,
      noteId: noteData.details.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to submit referral');
  }
}