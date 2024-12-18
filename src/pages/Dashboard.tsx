import React from 'react';
import { Users, TrendingUp, Target } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import ReferralTable from '../components/ReferralTable';
import DealsTable from '../components/DealsTable';
import AsyncBoundary from '../components/AsyncBoundary';
import { useDashboardData } from '../hooks/useDashboardData';
import { useAuthStore } from '../store/authStore';
import ReferralLink from '../components/referrals/ReferralLink';
import { getReferralLink } from '../utils/referral';

export default function Dashboard() {
  const { 
    referrals, 
    deals, 
    stats, 
    loading, 
    error,
    timePeriod,
    onTimePeriodChange 
  } = useDashboardData();
  
  const { user } = useAuthStore();

  const formatChange = (value: number, isPercentage: boolean = false) => {
    if (value === 0) return 'No change vs last month';
    const prefix = value > 0 ? '+' : '';
    return `${prefix}${value}${isPercentage ? '%' : ''} vs last month`;
  };

  return (
    <AsyncBoundary loading={loading} error={error}>
      <div className="space-y-6">
        {/* {user && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <ReferralLink link={getReferralLink(user)} />
          </div>
        )} */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Referrals"
            value={stats.totalReferrals}
            change={formatChange(stats.monthlyGrowth.referrals, true)}
            Icon={Users}
          />
          <StatsCard
            title="Conversion Rate"
            value={`${stats.conversionRate.toFixed(1)}%`}
            change={formatChange(stats.monthlyGrowth.conversion, true)}
            Icon={TrendingUp}
          />
          <StatsCard
            title="Active Leads"
            value={stats.activeLeads}
            change={formatChange(stats.monthlyGrowth.leads)}
            Icon={Target}
          />
        </div>
        <ReferralTable 
          referrals={referrals}
          timePeriod={timePeriod}
          onTimePeriodChange={onTimePeriodChange}
        />
        <DealsTable deals={deals} />
      </div>
    </AsyncBoundary>
  );
}