import api from './axios';
import { User } from '../types';

interface ProfileResponse {
  status: string;
  message: string;
  data: {
    user: User;
  };
}

export const userProfileService = {
  async getProfile(): Promise<User> {
    try {
      const response = await api.get<ProfileResponse>('/users/me');
      if (response.data.status !== 'success' || !response.data.data.user) {
        throw new Error(response.data.message || 'Failed to fetch user profile');
      }
      return response.data.data.user;
    } catch (error) {
      throw new Error('Failed to fetch user profile');
    }
  }
};