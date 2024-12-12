export const phoneNumberValidation = {
    required: 'Phone number is required',
    pattern: {
      value: /^[0-9]{6,15}$/,
      message: 'Please enter a valid phone number (6-15 digits)',
    },
    validate: (value: string) => {
      // Remove any non-digit characters
      const digitsOnly = value.replace(/\D/g, '');
      
      // Check if the number starts with zeros
      if (value.startsWith('0')) {
        return 'Please enter the number without leading zeros';
      }
      
      // Check if it contains only digits
      if (!/^\d+$/.test(value)) {
        return 'Please enter only numbers';
      }
      
      // Check length
      if (digitsOnly.length < 6) {
        return 'Phone number is too short (minimum 6 digits)';
      }
      
      if (digitsOnly.length > 15) {
        return 'Phone number is too long (maximum 15 digits)';
      }
      
      return true;
    }
  };