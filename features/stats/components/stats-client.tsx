'use client'

import { useAuth } from '@/features/auth/hooks/use-auth'
import { useDashboardStats } from '../hooks/use-stats'
import { StatsCards } from './stats-card'
import { Loader2, AlertCircle } from 'lucide-react'

export function StatsClient() {

    const { user } = useAuth()
    const tenantId = user?.tenantId ?? ''

    const { data, isLoading, isError } = useDashboardStats(tenantId)

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
        )
    }

    if (isError || !data) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 py-20 text-muted-foreground">
                <AlertCircle className="size-6" />
                <p className="text-sm">No se pudo cargar el dashboard</p>
            </div>
        )
    }

    return <StatsCards stats={data} />
}