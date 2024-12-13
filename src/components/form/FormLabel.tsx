import React from 'react';

interface FormLabelProps {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}

export default function FormLabel({ htmlFor, children, required }: FormLabelProps) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}