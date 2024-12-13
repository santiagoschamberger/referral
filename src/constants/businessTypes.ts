export const BUSINESS_TYPES = [
    { value: 'LLC', text: 'LLC' },
    { value: 'C CORP', text: 'C CORP' },
    { value: 'S CORP', text: 'S CORP' },
    { value: 'SOLE PROP', text: 'SOLE PROP' },
    { value: 'OTHER', text: 'OTHER' }
  ] as const;
  
  export type BusinessType = typeof BUSINESS_TYPES[number]['value'];