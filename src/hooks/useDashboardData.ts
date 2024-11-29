import { useApi } from './useApi';
import { zohoService } from '../services/zoho';
import { Referral, Stats, Deal } from '../types';

const defaultData = {
  referrals: [] as Referral[],
  deals: [] as Deal[],
  stats: {
    totalReferrals: 0,
    conversionRate: 0,
    activeLeads: 0,
    monthlyGrowth: {
      referrals: 0,
      conversion: 0,
      leads: 0
    }
  } as Stats
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useDashboardData() {
  const { data: referrals, loading: referralsLoading, error: referralsError } = 
    useApi(signal => zohoService.getLeads(signal), { 
      defaultValue: [], 
      cacheKey: 'dashboard-referrals',
      cacheDuration: CACHE_DURATION
    });

  const { data: deals, loading: dealsLoading, error: dealsError } = 
    useApi(signal => zohoService.getDeals(signal), { 
      defaultValue: [], 
      cacheKey: 'dashboard-deals',
      cacheDuration: CACHE_DURATION
    });

  const { data: stats, loading: statsLoading, error: statsError } = 
    useApi(signal => zohoService.getStats(signal), { 
      defaultValue: defaultData.stats,
      cacheKey: 'dashboard-stats',
      cacheDuration: CACHE_DURATION
    });

  // Only show actual errors, not "no data" responses
  const error = [referralsError, dealsError, statsError]
    .filter(err => err && !err.includes('No deals found') && !err.includes('You didn\'t refer'))
    .join(' ');

  return {
    referrals,
    deals,
    stats,
    loading: referralsLoading || dealsLoading || statsLoading,
    error: error || null
  };
}