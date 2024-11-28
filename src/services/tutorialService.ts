import api from './axios';
import { Tutorial, CreateTutorialInput, UpdateTutorialInput } from '../types';

interface TutorialResponse {
  status: string;
  message: string;
  data: {
    tutorials?: Tutorial[];
    tutorial?: Tutorial;
  };
}

export const tutorialService = {
  async getAllTutorials(): Promise<Tutorial[]> {
    try {
      const response = await api.get<TutorialResponse>('/admin/tutorials');
      if (response.data.status !== 'success' || !response.data.data.tutorials) {
        throw new Error(response.data.message || 'Failed to fetch tutorials');
      }
      return response.data.data.tutorials;
    } catch (error) {
      throw new Error('Failed to fetch tutorials');
    }
  },

  async getPublicTutorials(): Promise<Tutorial[]> {
    try {
      const response = await api.get<TutorialResponse>('/tutorials');
      if (response.data.status !== 'success' || !response.data.data.tutorials) {
        throw new Error(response.data.message || 'No public tutorials available');
      }
      return response.data.data.tutorials;
    } catch (error) {
      throw new Error('Failed to fetch tutorials');
    }
  },

  async createTutorial(input: CreateTutorialInput): Promise<Tutorial> {
    try {
      const response = await api.post<TutorialResponse>('/admin/tutorials', input);
      if (response.data.status !== 'success' || !response.data.data.tutorial) {
        throw new Error(response.data.message || 'Failed to create tutorial');
      }
      return response.data.data.tutorial;
    } catch (error) {
      throw new Error('Failed to create tutorial');
    }
  },

  async updateTutorial(id: number, input: UpdateTutorialInput): Promise<Tutorial> {
    try {
      const response = await api.put<TutorialResponse>(`/admin/tutorials/${id}`, input);
      if (response.data.status !== 'success' || !response.data.data.tutorial) {
        throw new Error(response.data.message || 'Failed to update tutorial');
      }
      return response.data.data.tutorial;
    } catch (error) {
      throw new Error('Failed to update tutorial');
    }
  },

  async deleteTutorial(id: number): Promise<void> {
    try {
      const response = await api.delete<TutorialResponse>(`/admin/tutorials/${id}`);
      if (response.data.status !== 'success') {
        throw new Error(response.data.message || 'Failed to delete tutorial');
      }
    } catch (error) {
      throw new Error('Failed to delete tutorial');
    }
  }
};