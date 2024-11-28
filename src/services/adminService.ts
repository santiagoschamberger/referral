import api from './axios';
import { AdminStats } from '../types';

interface AdminStatsResponse {
  success: boolean;
  message: string;
  data: AdminStats;
}

export const adminService = {
  async getStats(): Promise<AdminStats> {
    try {
      const response = await api.get<AdminStatsResponse>('/admin/stats');
      
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      throw new Error('Failed to fetch dashboard stats');
    }
  }
};