import React from 'react';
import { Referral } from '../../types';
import ReferralStatusBadge from './ReferralStatusBadge';
import { formatDate } from '../../utils/dateUtils';

interface ReferralTableRowProps {
  referral: Referral;
}

export default function ReferralTableRow({ referral }: ReferralTableRowProps) {
  const getContactInfo = (referral: Referral) => {
    if (referral.Email) return referral.Email;
    if (referral.Phone) return referral.Phone;
    if (referral.Contact_Number) return referral.Contact_Number;
    return 'N/A';
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {referral.Full_Name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {referral.Company || 'N/A'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <ReferralStatusBadge status={referral.Lead_Status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(referral.Created_Time)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {getContactInfo(referral)}
      </td>
    </tr>
  );
}