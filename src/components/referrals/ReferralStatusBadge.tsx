import React from 'react';
import { ReferralStatus } from '../../types';

interface ReferralStatusBadgeProps {
  status: ReferralStatus;
}

export default function ReferralStatusBadge({ status }: ReferralStatusBadgeProps) {
  const getStatusColor = (status: ReferralStatus) => {
    const colors: Record<string, string> = {
      'None': 'bg-gray-100 text-gray-800',
      'New': 'bg-blue-100 text-blue-800',
      'Sent Pre-Vet': 'bg-purple-100 text-purple-800',
      'Contact Attempt 1': 'bg-yellow-100 text-yellow-800',
      'Contact Attempt 2': 'bg-orange-100 text-orange-800',
      'Sent Pre-App': 'bg-indigo-100 text-indigo-800',
      'Pre-App Received': 'bg-cyan-100 text-cyan-800',
      'Sent Application for Signature': 'bg-teal-100 text-teal-800',
      'Signed Application': 'bg-emerald-100 text-emerald-800',
      'Convert': 'bg-green-100 text-green-800',
      'Lost': 'bg-red-100 text-red-800'
    };
    return colors[status || 'None'] || colors['None'];
  };

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(status)}`}>
      {status || 'New'}
    </span>
  );
}