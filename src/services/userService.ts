import api from './axios';
import { User, PaginatedResponse } from '../types';

interface UserResponse {
  status: string;
  message: string;
  data: {
    users?: User[];
    user?: User;
    pagination?: {
      total: number;
      totalPages: number;
      currentPage: number;
      limit: number;
    };
  };
}

export const userService = {
  async getAllUsers(page: number = 1, limit: number = 10): Promise<PaginatedResponse<User>> {
    try {
      const response = await api.get<UserResponse>(`/admin/users?page=${page}&limit=${limit}`);
      if (response.data.status !== 'success' || !response.data.data.users || !response.data.data.pagination) {
        throw new Error(response.data.message || 'Failed to fetch users');
      }
      return {
        data: response.data.data.users,
        pagination: response.data.data.pagination
      };
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  },

  async updateCompensationLink(uuid: string, compensationLink: string): Promise<User> {
    try {
      const response = await api.put<UserResponse>(`/admin/users/${uuid}/compensation-link`, {
        compensation_link: compensationLink
      });
      
      if (response.data.status !== 'success') {
        throw new Error(response.data.message || 'Failed to update compensation link');
      }

      // Return the updated user data
      return response.data.data.user || {
        uuid,
        full_name: '',
        email: '',
        role: 'user',
        compensation_link: compensationLink,
        created_at: new Date().toISOString()
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Failed to update compensation link');
    }
  }
};