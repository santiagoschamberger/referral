import React, { useState } from 'react';
import { Referral } from '../types';
import ReferralStatusBadge from './referrals/ReferralStatusBadge';
import ReferralTablePagination from './referrals/ReferralTablePagination';

interface ReferralTableProps {
  referrals: Referral[];
}

const ITEMS_PER_PAGE = 10;

export default function ReferralTable({ referrals }: ReferralTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination values
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentReferrals = referrals.slice(startIndex, endIndex);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getContactInfo = (referral: Referral) => {
    if (referral.Email) return referral.Email;
    if (referral.Phone) return referral.Phone;
    if (referral.Contact_Number) return referral.Contact_Number;
    return 'N/A';
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Referrals</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentReferrals.map((referral) => (
              <tr key={referral.id}>
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
            ))}
            {currentReferrals.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  No referrals found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {referrals.length > ITEMS_PER_PAGE && (
        <ReferralTablePagination
          currentPage={currentPage}
          totalItems={referrals.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}