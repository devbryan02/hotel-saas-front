'use client'

import type { DashboardStatsResponse } from '../type'
import { Card, CardContent } from '@/components/ui/card'

interface Props {
    stats: DashboardStatsResponse
}

export function ActivityStatsCard({ stats }: Props) {
    return (
        <section className="flex flex-col gap-4 h-full">
            <p className="text-[15px] text-foreground">
                Actividad de hoy
            </p>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <Card className="shadow-none">
                        <CardContent className="p-4 flex flex-col justify-center">
                            <p className="text-[14px] text-muted-foreground mb-1">Check-ins</p>
                            <p className="text-[20px] font-medium leading-none">{stats.checkInsToday}</p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-none">
                        <CardContent className="p-4 flex flex-col justify-center">
                            <p className="text-[14px] text-muted-foreground mb-1">Check-outs</p>
                            <p className="text-[20px] font-medium leading-none">{stats.checkOutsToday}</p>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card className="shadow-none inline-flex rounded-full px-4 py-2 border-border">
                        <p className="text-[14px] text-[#378ADD]">
                            Ocupaciones activas {stats.activeOccupations}
                        </p>
                    </Card>
                </div>
            </div>
        </section>
    )
}