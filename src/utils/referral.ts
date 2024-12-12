import { User } from '../types';

export function getReferralLink(user: User): string {
  const baseUrl = window.location.origin;
  return `${baseUrl}/referral/${user.uuid}`;
}