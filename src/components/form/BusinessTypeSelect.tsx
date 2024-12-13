import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import SelectField from './SelectField';
import { BUSINESS_TYPES } from '../../constants/businessTypes';

interface BusinessTypeSelectProps {
  register: UseFormRegister<any>;
  disabled?: boolean;
  error?: string;
}

export default function BusinessTypeSelect({ register, disabled, error }: BusinessTypeSelectProps) {
  return (
    <SelectField
      id="businessType"
      label="Business Type"
      options={BUSINESS_TYPES}
      register={register}
      name="businessType"
      rules={{ required: 'Business type is required' }}
      disabled={disabled}
      error={error}
      placeholder="Select business type"
      required
    />
  );
}