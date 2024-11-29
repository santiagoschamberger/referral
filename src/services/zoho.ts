import { getLeads, submitReferral } from './api/leads';
import { getDeals } from './api/deals';
import { getStats } from './api/stats';

export const zohoService = {
  getLeads,
  getDeals,
  getStats,
  submitReferral
};