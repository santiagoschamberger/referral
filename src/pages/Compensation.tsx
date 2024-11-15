import React from 'react';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import StatsCard from '../components/StatsCard';

const mockCompensation = {
  totalEarnings: 5000,
  pendingPayouts: 1200,
  lastPayout: '2024-03-01',
  monthlyGrowth: {
    earnings: 15,
    referrals: 20,
    conversion: 5
  }
};

export default function Compensation() {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">My Compensation</h1>
          <p className="mt-2 text-sm text-gray-700">
            Track your earnings and payouts from successful referrals
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Earnings"
          value={`$${mockCompensation.totalEarnings}`}
          change={`+${mockCompensation.monthlyGrowth.earnings}% vs last month`}
          Icon={DollarSign}
        />
        <StatsCard
          title="Pending Payouts"
          value={`$${mockCompensation.pendingPayouts}`}
          change={`+${mockCompensation.monthlyGrowth.referrals}% vs last month`}
          Icon={TrendingUp}
        />
        <StatsCard
          title="Last Payout Date"
          value={mockCompensation.lastPayout}
          change={`+${mockCompensation.monthlyGrowth.conversion}% payout increase`}
          Icon={Calendar}
        />
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Payout History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  2024-03-01
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  $1,500
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Paid
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  2024-02-01
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  $1,200
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Paid
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}