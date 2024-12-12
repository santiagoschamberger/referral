export interface CountryCode {
    name: string;
    dial_code: string;
    code: string;
    flag: string;
}

export const COUNTRY_CODES: CountryCode[] = [
    { name: 'United States', dial_code: '+1', code: 'US', flag: '🇺🇸' },
    { name: 'United Kingdom', dial_code: '+44', code: 'GB', flag: '🇬🇧' },
    { name: 'India', dial_code: '+91', code: 'IN', flag: '🇮🇳' },
    { name: 'Canada', dial_code: '+1', code: 'CA', flag: '🇨🇦' },
    { name: 'Australia', dial_code: '+61', code: 'AU', flag: '🇦🇺' },
    { name: 'Germany', dial_code: '+49', code: 'DE', flag: '🇩🇪' },
    { name: 'France', dial_code: '+33', code: 'FR', flag: '🇫🇷' },
    { name: 'Italy', dial_code: '+39', code: 'IT', flag: '🇮🇹' },
    { name: 'Spain', dial_code: '+34', code: 'ES', flag: '🇪🇸' },
    { name: 'Brazil', dial_code: '+55', code: 'BR', flag: '🇧🇷' },
    { name: 'Japan', dial_code: '+81', code: 'JP', flag: '🇯🇵' },
    { name: 'China', dial_code: '+86', code: 'CN', flag: '🇨🇳' },
    { name: 'Singapore', dial_code: '+65', code: 'SG', flag: '🇸🇬' },
    { name: 'Netherlands', dial_code: '+31', code: 'NL', flag: '🇳🇱' },
    { name: 'Sweden', dial_code: '+46', code: 'SE', flag: '🇸🇪' },
    { name: 'Norway', dial_code: '+47', code: 'NO', flag: '🇳🇴' },
    { name: 'Denmark', dial_code: '+45', code: 'DK', flag: '🇩🇰' },
    { name: 'Switzerland', dial_code: '+41', code: 'CH', flag: '🇨🇭' },
    { name: 'New Zealand', dial_code: '+64', code: 'NZ', flag: '🇳🇿' },
    { name: 'Ireland', dial_code: '+353', code: 'IE', flag: '🇮🇪' },
];

export function formatPhoneNumber(countryCode: string, phoneNumber: string): string {
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    return `${countryCode}${digitsOnly}`;
}