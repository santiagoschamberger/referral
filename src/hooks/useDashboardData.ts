import { useState, useEffect } from 'react';
import { Referral, Stats, Deal } from '../types';
import { zohoService } from '../services/zoho';

interface DashboardData {
  referrals: Referral[];
  deals: Deal[];
  stats: Stats;
  loading: boolean;
  error: string | null;
}

const defaultStats: Stats = {
  totalReferrals: 0,
  conversionRate: 0,
  activeLeads: 0,
  monthlyGrowth: {
    referrals: 0,
    conversion: 0,
    leads: 0
  }
};

export function useDashboardData(): DashboardData {
  const [data, setData] = useState<DashboardData>({
    referrals: [],
    deals: [],
    stats: defaultStats,
    loading: true,
    error: null
  });

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const [leadsData, statsData, dealsData] = await Promise.all([
          zohoService.getLeads(controller.signal),
          zohoService.getStats(controller.signal),
          zohoService.getDeals(controller.signal)
        ]);
        
        if (mounted) {
          setData({
            referrals: leadsData,
            deals: dealsData,
            stats: statsData,
            loading: false,
            error: null
          });
        }
      } catch (err) {
        if (mounted && err instanceof Error && err.name !== 'AbortError') {
          setData(prev => ({
            ...prev,
            stats: defaultStats,
            loading: false,
            error: err instanceof Error ? err.message : 'Failed to fetch data'
          }));
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  return data;
}