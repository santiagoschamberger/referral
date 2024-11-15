import React from 'react';
import { Users, Video, TrendingUp } from 'lucide-react';
import StatsCard from '../../components/StatsCard';

const mockStats = {
  totalUsers: 156,
  activeUsers: 89,
  totalTutorials: 12,
  monthlyGrowth: {
    users: 12,
    activity: 8.5,
    tutorials: 2
  }
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Overview of the referral program performance
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Users"
          value={mockStats.totalUsers}
          change={`+${mockStats.monthlyGrowth.users}% vs last month`}
          Icon={Users}
        />
        <StatsCard
          title="Active Users"
          value={mockStats.activeUsers}
          change={`+${mockStats.monthlyGrowth.activity}% vs last month`}
          Icon={TrendingUp}
        />
        <StatsCard
          title="Total Tutorials"
          value={mockStats.totalTutorials}
          change={`+${mockStats.monthlyGrowth.tutorials} this month`}
          Icon={Video}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { user: 'John Smith', action: 'Submitted a new referral', time: '2 hours ago' },
              { user: 'Sarah Johnson', action: 'Updated profile', time: '4 hours ago' },
              { user: 'Michael Brown', action: 'Watched tutorial', time: '5 hours ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                  <p className="text-sm text-gray-500">{activity.action}</p>
                </div>
                <span className="text-sm text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">System Status</h2>
          <div className="space-y-4">
            {[
              { service: 'Zoho CRM Integration', status: 'Operational' },
              { service: 'User Authentication', status: 'Operational' },
              { service: 'Payment Processing', status: 'Operational' },
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-900">{service.service}</span>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {service.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}