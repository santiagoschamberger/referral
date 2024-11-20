import React, { useEffect, useState } from 'react';
import { Users, TrendingUp, Target } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import ReferralTable from '../components/ReferralTable';
import { Referral, Stats } from '../types';
import { zohoService } from '../services/zoho';

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

export default function Dashboard() {
	const [referrals, setReferrals] = useState<Referral[]>([]);
	const [stats, setStats] = useState<Stats>(defaultStats);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let mounted = true;

		const fetchData = async () => {
			try {
				const [leadsData, statsData] = await Promise.all([
					zohoService.getLeads(),
					zohoService.getStats()
				]);

				if (mounted) {
					setReferrals(leadsData);
					setStats(statsData);
					setError(null);
				}
			} catch (err) {
				if (mounted) {
					setError(err instanceof Error ? err.message : 'Failed to fetch data');
					// Reset stats to default on error
					setStats(defaultStats);
				}
			} finally {
				if (mounted) {
					setLoading(false);
				}
			}
		};

		fetchData();

		return () => {
			mounted = false;
		};
	}, []);

	const formatChange = (value: number, isPercentage: boolean = false) => {
		if (value === 0) return 'No change vs last month';
		const prefix = value > 0 ? '+' : '';
		return `${prefix}${value}${isPercentage ? '%' : ''} vs last month`;
	};

	return (
		<div className="space-y-6">
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

			{error && (
				<div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-center">
					<svg className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
					</svg>
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