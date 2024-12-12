import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { Referral } from '../types';
import ReferralTableHeader from './referrals/ReferralTableHeader';
import ReferralTableRow from './referrals/ReferralTableRow';
import ReferralTablePagination from './referrals/ReferralTablePagination';
import EmptyState from './EmptyState';
import { TimePeriod, filterReferralsByDate } from '../utils/referralFilters';

interface ReferralTableProps {
  referrals: Referral[];
}

const ITEMS_PER_PAGE = 10;

export default function ReferralTable({ referrals }: ReferralTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('all');

  const filteredReferrals = filterReferralsByDate(referrals, timePeriod);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentReferrals = filteredReferrals.slice(startIndex, endIndex);

  const handleTimePeriodChange = (newPeriod: TimePeriod) => {
    setTimePeriod(newPeriod);
    setCurrentPage(1); // Reset to first page when changing time period
  };

  if (referrals.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Referrals</h3>
        </div>
        <EmptyState
          icon={Users}
          title="No referrals yet"
          description="Start referring leads to see them listed here."
        />
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <ReferralTableHeader
        totalReferrals={filteredReferrals.length}
        timePeriod={timePeriod}
        onTimePeriodChange={handleTimePeriodChange}
      />
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
              <ReferralTableRow key={referral.id} referral={referral} />
            ))}
          </tbody>
        </table>
      </div>

      {filteredReferrals.length > ITEMS_PER_PAGE && (
        <ReferralTablePagination
          currentPage={currentPage}
          totalItems={filteredReferrals.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}