import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import LoadingSpinner from './LoadingSpinner';

interface AsyncBoundaryProps {
  children: React.ReactNode;
  loading?: boolean;
  error?: string | null;
  fallback?: React.ReactNode;
}

export default function AsyncBoundary({
  children,
  loading,
  error,
  fallback
}: AsyncBoundaryProps) {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <div className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Error</h3>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>;
}