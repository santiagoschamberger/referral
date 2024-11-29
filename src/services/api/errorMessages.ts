export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Unable to connect to the server. Please check your internet connection.',
  NO_REFERRALS: 'You have not submitted any referrals yet.',
  NO_DEALS: 'No deals have been created from your referrals yet.',
  REQUEST_CANCELLED: 'Request was cancelled.',
  UNAUTHORIZED: 'Your session has expired. Please log in again.',
  SERVER_ERROR: 'An unexpected server error occurred. Please try again later.',
  DEFAULT: 'An unexpected error occurred. Please try again.'
} as const;

export function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error instanceof Error) {
    // Check for specific error messages we want to show to users
    if (error.message.includes('No deals found')) {
      return ERROR_MESSAGES.NO_DEALS;
    }
    if (error.message.includes('You didn\'t refer any lead')) {
      return ERROR_MESSAGES.NO_REFERRALS;
    }
    return error.message;
  }
  
  return ERROR_MESSAGES.DEFAULT;
}