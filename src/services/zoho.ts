import axios from 'axios';

const ZOHO_CLIENT_ID = '1000.J5VR4DJN7PGUYUQ2OZWMTWJBR4D25S';
const ZOHO_CLIENT_SECRET = '84d185dcb58180d936d8d32eda936aafacee8ddb4a';
const ZOHO_REFRESH_TOKEN = ''; // TODO: Add refresh token
const ZOHO_BASE_URL = 'https://www.zohoapis.com/crm/v3';

class ZohoService {
  private accessToken: string | null = null;

  private async getAccessToken() {
    if (this.accessToken) return this.accessToken;

    try {
      const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
        params: {
          refresh_token: ZOHO_REFRESH_TOKEN,
          client_id: ZOHO_CLIENT_ID,
          client_secret: ZOHO_CLIENT_SECRET,
          grant_type: 'refresh_token',
        },
      });

      this.accessToken = response.data.access_token;
      return this.accessToken;
    } catch (error) {
      console.error('Failed to get Zoho access token:', error);
      throw error;
    }
  }

  async createLead(data: {
    name: string;
    email: string;
    company: string;
    position: string;
    notes: string;
  }) {
    try {
      const accessToken = await this.getAccessToken();
      const response = await axios.post(
        `${ZOHO_BASE_URL}/Leads`,
        {
          data: [
            {
              Last_Name: data.name,
              Email: data.email,
              Company: data.company,
              Title: data.position,
              Description: data.notes,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to create Zoho lead:', error);
      throw error;
    }
  }

  async updateLead(leadId: string, status: string) {
    try {
      const accessToken = await this.getAccessToken();
      const response = await axios.put(
        `${ZOHO_BASE_URL}/Leads/${leadId}`,
        {
          data: [
            {
              Status: status,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to update Zoho lead:', error);
      throw error;
    }
  }
}

export const zohoService = new ZohoService();