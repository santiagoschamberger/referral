import axios from 'axios';
import type { Referral } from '../types';

interface ReferralSubmission {
  name: string;
  email: string;
  company: string;
  position: string;
  notes: string;
}

class ZohoService {
  private backendUrl: string;

  constructor(backendUrl: string) {
    this.backendUrl = backendUrl;
  }

  async getLeads(): Promise<Referral[]> {
    try {
      const response = await axios.get(`${this.backendUrl}/api/leads`);
      console.log('Response Data:', response.data);

      if (!response.data?.data) {
        return [];
      }

      return response.data.data.map((lead: any) => ({
        id: lead.id,
        name: lead.Full_Name || 'Unknown',
        company: lead.Company || 'N/A',
        status: lead.Lead_Status || 'In Progress',
        date: new Date(lead.Created_Time).toISOString().split('T')[0],
        email: lead.Email || undefined,
        phone: lead.Phone || undefined,
      }));
    } catch (error) {
      console.error('Error fetching leads:', error.response?.data || error.message);
      throw new Error('Failed to fetch leads');
    }
  }

  async submitReferral(referral: ReferralSubmission): Promise<void> {
    try {
      const payload = {
        Last_Name: referral.name.split(' ').slice(-1)[0], // Extract last name
        First_Name: referral.name.split(' ').slice(0, -1).join(' '), // Extract first name(s)
        Email: referral.email,
        Company: referral.company,
        Title: referral.position,
        Description: referral.notes,
      };

      const response = await axios.post(`${this.backendUrl}/api/leads`, payload);
      console.log('Referral Submission Response:', response.data);

      if (!response.data?.data?.[0]?.status === 'success') {
        throw new Error('Failed to create lead in Zoho CRM');
      }
    } catch (error) {
      console.error('Error submitting referral:', error.response?.data || error.message);
      throw new Error('Failed to submit referral');
    }
  }
}

export const zohoService = new ZohoService('https://cors-anywhere-x0cc.onrender.com/https://zoho-backend-z4ef.onrender.com');
