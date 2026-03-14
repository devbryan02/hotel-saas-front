'use client'

import type { DashboardStatsResponse } from '../type'
import { RoomsStatsCard } from './rooms-stats-card'
import { ActivityStatsCard } from './activity-stats-card'
import { RevenueStatsCard } from './revenue-stats-card'
import { RevenueChart } from './revenue-chart'

interface Props {
    stats: DashboardStatsResponse
}

export function StatsCards({ stats }: Props) {
    return (
        <div className="flex flex-col gap-6">
            <RoomsStatsCard stats={stats} />

            <div className="grid grid-cols-2 gap-6">
                <ActivityStatsCard stats={stats} />
                <RevenueStatsCard stats={stats} />
            </div>

            <RevenueChart stats={stats} />
        </div>
    )
}