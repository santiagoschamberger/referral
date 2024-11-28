import { useState, useEffect } from 'react';
import { AdminStats } from '../types';
import { adminService } from '../services/adminService';

interface UseAdminStatsReturn {
  stats: AdminStats | null;
  loading: boolean;
  error: string | null;
}

const defaultStats: AdminStats = {
  totalUsers: 0,
  activeUsers: 0,
  totalTutorials: 0,
  recentActivity: []
};

export function useAdminStats(): UseAdminStatsReturn {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchStats = async () => {
      try {
        const data = await adminService.getStats();
        if (mounted) {
          setStats(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setStats(defaultStats);
          setError(err instanceof Error ? err.message : 'Failed to fetch stats');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  return { stats, loading, error };
}