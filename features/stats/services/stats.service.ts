import apiClient from '@/lib/api-client'
import type { DashboardStatsResponse } from '../type'

export const statsService = {
    getDashboard: (tenantId: string): Promise<DashboardStatsResponse> =>
        apiClient.get(`/tenants/${tenantId}/stats/dashboard`),
}