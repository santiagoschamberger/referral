import axios, { AxiosError } from 'axios';
import { ERROR_MESSAGES } from './errorMessages';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly isNotFound: boolean = false,
    public readonly isNetworkError: boolean = false
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleApiError(error: unknown): never {
  if (axios.isCancel(error)) {
    return [] as any; // Return empty array for cancelled requests
  }
  
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    
    // Handle network errors
    if (!axiosError.response) {
      throw new ApiError(
        ERROR_MESSAGES.NETWORK_ERROR,
        0,
        false,
        true
      );
    }

    // Handle 404 errors by returning empty data
    if (axiosError.response.status === 404) {
      return [] as any;
    }

    // Handle specific error messages
    const message = axiosError.response.data?.message;
    if (message?.includes('No deals found') || message?.includes('You didn\'t refer any lead')) {
      return [] as any;
    }

    // Handle other errors
    throw new ApiError(
      axiosError.response.data?.message || ERROR_MESSAGES.SERVER_ERROR,
      axiosError.response.status,
      axiosError.response.status === 404
    );
  }
  
  if (error instanceof Error) {
    throw new ApiError(error.message);
  }
  
  throw new ApiError(ERROR_MESSAGES.DEFAULT);
}