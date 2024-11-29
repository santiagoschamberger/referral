import { AxiosError, InternalAxiosRequestConfig } from 'axios';

export interface RetryConfig extends InternalAxiosRequestConfig {
  retryCount?: number;
  maxRetries?: number;
  retryDelay?: number;
}

export function shouldRetry(error: AxiosError, config: RetryConfig): boolean {
  const { response, config: errorConfig } = error;
  
  // Don't retry if we've hit our max retries
  if (errorConfig?.retryCount && errorConfig.retryCount >= (config.maxRetries || 3)) {
    return false;
  }

  // Only retry on network errors or 5xx server errors
  if (!response || (response.status >= 500 && response.status <= 599)) {
    return true;
  }

  return false;
}

export function getRetryDelay(retryCount: number): number {
  // Exponential backoff with jitter
  const baseDelay = 1000; // 1 second
  const maxDelay = 10000; // 10 seconds
  const exponentialDelay = Math.min(baseDelay * Math.pow(2, retryCount), maxDelay);
  const jitter = Math.random() * 1000; // Add up to 1 second of random jitter
  
  return exponentialDelay + jitter;
}