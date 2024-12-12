import { Referral } from '../types';

export type TimePeriod = 'all' | 'ytd' | 'mtd' | 'last30' | 'last90';

export function filterReferralsByDate(referrals: Referral[], period: TimePeriod): Referral[] {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const last30Days = new Date(now.setDate(now.getDate() - 30));
  const last90Days = new Date(now.setDate(now.getDate() - 90));

  return referrals.filter(referral => {
    const referralDate = new Date(referral.Created_Time);
    switch (period) {
      case 'ytd':
        return referralDate >= startOfYear;
      case 'mtd':
        return referralDate >= startOfMonth;
      case 'last30':
        return referralDate >= last30Days;
      case 'last90':
        return referralDate >= last90Days;
      default:
        return true;
    }
  });
}