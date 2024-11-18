import React, { useEffect, useState } from 'react';
import { Users, TrendingUp, Target } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import ReferralTable from '../components/ReferralTable';
import { Referral } from '../types';
import { zohoService } from '../services/zoho';

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

export default function Dashboard() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchReferrals = async () => {
      try {
        const leads = await zohoService.getLeads();
        if (mounted) {
          setReferrals(leads);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch referrals');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchReferrals();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Referrals"
          value={referrals.length || mockStats.totalReferrals}
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
          value={referrals.filter(r => r.status !== 'Closed').length || mockStats.activeLeads}
          change={`+${mockStats.monthlyGrowth.leads} vs last month`}
          Icon={Target}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
        </div>
      ) : (
        <ReferralTable referrals={referrals} />
      )}
    </div>
  );
}