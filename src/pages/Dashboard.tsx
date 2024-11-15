import React from 'react';
import { Users, TrendingUp, Target } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import ReferralTable from '../components/ReferralTable';
import { Referral } from '../types';

const mockStats = {
  totalReferrals: 12,
  conversionRate: 24,
  activeLeads: 7,
  monthlyGrowth: {
    referrals: 20,
    conversion: 4.75,
    leads: 2
  }
};

const mockReferrals: Referral[] = [
  {
    id: '1',
    name: 'John Smith',
    company: 'Tech Corp',
    status: 'In Progress',
    date: '2024-03-15'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    company: 'Digital Solutions',
    status: 'Contacted',
    date: '2024-03-14'
  },
  {
    id: '3',
    name: 'Michael Brown',
    company: 'Innovation Labs',
    status: 'Qualified',
    date: '2024-03-13'
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Referrals"
          value={mockStats.totalReferrals}
          change={`+${mockStats.monthlyGrowth.referrals}% vs last month`}
          Icon={Users}
        />
        <StatsCard
          title="Conversion Rate"
          value={`${mockStats.conversionRate}%`}
          change={`+${mockStats.monthlyGrowth.conversion}% vs last month`}
          Icon={TrendingUp}
        />
        <StatsCard
          title="Active Leads"
          value={mockStats.activeLeads}
          change={`+${mockStats.monthlyGrowth.leads} vs last month`}
          Icon={Target}
        />
      </div>

      <ReferralTable referrals={mockReferrals} />
    </div>
  );
}