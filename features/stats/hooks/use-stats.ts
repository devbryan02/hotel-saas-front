import { useQuery } from '@tanstack/react-query'
import { statsService } from '../services/stats.service'

export const statsKeys = {
    dashboard: (tenantId: string) => ['stats', 'dashboard', tenantId] as const,
}

export function useDashboardStats(tenantId: string) {
    return useQuery({
        queryKey: statsKeys.dashboard(tenantId),
        queryFn: () => statsService.getDashboard(tenantId),
        enabled: !!tenantId,
        refetchInterval: 60_000, // refreshes every 60 seconds automatically
    })
}