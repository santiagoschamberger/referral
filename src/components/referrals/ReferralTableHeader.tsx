import React from 'react';
import { Calendar } from 'lucide-react';
import { TimePeriod } from '../../utils/referralFilters';

interface ReferralTableHeaderProps {
  totalReferrals: number;
  timePeriod: TimePeriod;
  onTimePeriodChange: (period: TimePeriod) => void;
}

export default function ReferralTableHeader({
  totalReferrals,
  timePeriod,
  onTimePeriodChange
}: ReferralTableHeaderProps) {
  return (
    <div className="px-6 py-5 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Referrals</h3>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-400" />
          <select
            value={timePeriod}
            onChange={(e) => onTimePeriodChange(e.target.value as TimePeriod)}
            className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
          >
            <option value="all">All Time</option>
            <option value="ytd">Year to Date</option>
            <option value="mtd">Month to Date</option>
            <option value="last30">Last 30 Days</option>
            <option value="last90">Last 90 Days</option>
          </select>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Showing {totalReferrals} referrals {timePeriod !== 'all' ? `for selected period` : 'for all time'}
      </p>
    </div>
  );
}