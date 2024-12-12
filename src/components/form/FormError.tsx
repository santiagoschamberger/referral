import React from 'react';

interface FormErrorProps {
  error?: string;
}

export default function FormError({ error }: FormErrorProps) {
  if (!error) return null;
  
  return (
    <p className="mt-1 text-sm text-red-600">
      {error}
    </p>
  );
}