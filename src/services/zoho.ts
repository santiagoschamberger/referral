import axios from 'axios';
import type { Referral } from '../types';

const ZOHO_CLIENT_ID = '1000.UOXBUB0B4LK17X5FB7BXUM26MR3UBP';
const ZOHO_CLIENT_SECRET = '5cf7b7a0596f8fb96148be1e957ead1d2496093ce8';
const ZOHO_REFRESH_TOKEN = '1000.2b31dc091b0d44443da685247d746cd2.e7755b6487ae60adc6871b9d506d32c4';

interface ZohoLead {
  id: string;
  Full_Name: string;
  Company: string;
  Lead_Status: string;
  Created_Time: string;
  Email: string;
  Phone: string;
}

interface ReferralSubmission {
  name: string;
  email: string;
  company: string;
  position: string;
  notes: string;
}

class ZohoService {
  private accessToken: string | null = null;

  private async getAccessToken(): Promise<string> {
    try {
      const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
        params: {
          refresh_token: ZOHO_REFRESH_TOKEN,
          client_id: ZOHO_CLIENT_ID,
          client_secret: ZOHO_CLIENT_SECRET,
          grant_type: 'refresh_token',
        },
      });

      if (!response.data?.access_token) {
        throw new Error('No access token received');
      }

      this.accessToken = response.data.access_token;
      return this.accessToken;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Authentication failed: ${error.message}`);
      }
      throw new Error('Authentication failed');
    }
  }

  async getLeads(): Promise<Referral[]> {
    try {
      const accessToken = await this.getAccessToken();
      const response = await axios.get('https://www.zohoapis.com/crm/v2/Leads', {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
      });

      if (!response.data?.data) {
        return [];
      }

      return response.data.data.map((lead: ZohoLead) => ({
        id: lead.id,
        name: lead.Full_Name || 'Unknown',
        company: lead.Company || 'N/A',
        status: this.mapLeadStatus(lead.Lead_Status),
        date: new Date(lead.Created_Time).toISOString().split('T')[0],
        email: lead.Email || undefined,
        phone: lead.Phone || undefined,
      }));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch leads: ${error.message}`);
      }
      throw new Error('Failed to fetch leads');
    }
  }

  async submitReferral(referral: ReferralSubmission): Promise<void> {
    try {
      const accessToken = await this.getAccessToken();
      const response = await axios.post(
        'https://www.zohoapis.com/crm/v2/Leads',
        {
          data: [
            {
              Last_Name: referral.name.split(' ').slice(-1)[0], // Extract last name
              First_Name: referral.name.split(' ').slice(0, -1).join(' '), // Extract first name(s)
              Email: referral.email,
              Company: referral.company,
              Title: referral.position,
              Description: referral.notes,
            },
          ],
        },
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.data?.data?.[0]?.status === 'success') {
        throw new Error('Failed to create lead in Zoho CRM');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to submit referral: ${error.message}`);
      }
      throw new Error('Failed to submit referral');
    }
  }

  private mapLeadStatus(status: string): Referral['status'] {
    switch (status) {
      case 'New':
        return 'In Progress';
      case 'Contacted':
        return 'Contacted';
      case 'Qualified':
        return 'Qualified';
      case 'Closed':
        return 'Closed';
      default:
        return 'In Progress';
    }
  }
}

export const zohoService = new ZohoService();