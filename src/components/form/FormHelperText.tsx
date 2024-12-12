import React from 'react';

interface FormHelperTextProps {
  children: React.ReactNode;
}

export default function FormHelperText({ children }: FormHelperTextProps) {
  return (
    <p className="mt-1 text-sm text-gray-500">
      {children}
    </p>
  );
}