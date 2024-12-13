import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import FormLabel from './FormLabel';
import FormError from './FormError';

interface Option {
  value: string;
  text: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  options: Option[];
  register: UseFormRegister<any>;
  name: string;
  rules?: object;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

export default function SelectField({
  id,
  label,
  options,
  register,
  name,
  rules,
  disabled,
  error,
  placeholder = 'Select an option',
  required
}: SelectFieldProps) {
  return (
    <div className="relative">
      <FormLabel htmlFor={id} required={required}>
        {label}
      </FormLabel>
      <div className="mt-1 relative">
        <select
          id={id}
          {...register(name, rules)}
          className={`
            block w-full rounded-md shadow-sm 
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            appearance-none
            ${error
              ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-red-500 focus:border-red-500'
            }
          `}
          disabled={disabled}
        >
          <option value="">{placeholder}</option>
          {options.map(({ value, text }) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <FormError error={error} />
    </div>
  );
}