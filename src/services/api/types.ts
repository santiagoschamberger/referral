export interface ZohoLeadResponse {
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

export interface ZohoResponse {
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

export interface ReferralSubmission {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  title: string;
  description: string;
}