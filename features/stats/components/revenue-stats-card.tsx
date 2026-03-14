'use client'

import { CircleUserRound, DollarSign } from 'lucide-react'
import type { DashboardStatsResponse } from '../type'
import { Card, CardContent } from '@/components/ui/card'

function formatCurrency(v: number) {
    return new Intl.NumberFormat('es-PE', {
        style: 'currency', currency: 'PEN', minimumFractionDigits: 2,
    }).format(v)
}

interface Props {
    stats: DashboardStatsResponse
}

export function RevenueStatsCard({ stats }: Props) {
    const monthLabel = new Date().toLocaleDateString('es-PE', {
        month: 'long', year: 'numeric',
    })

    return (
        <section className="flex flex-col gap-4 h-full">
            <p className="text-[15px] text-foreground">
                Ingresos
            </p>

            <Card className="shadow-none flex flex-col flex-1 min-h-[196px]">
                <CardContent className="p-0 flex flex-col h-full">
                    {/* Hoy */}
                    <div className="p-6 flex items-start gap-5 flex-1 justify-center flex-col">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-muted flex items-center justify-center shrink-0 size-10">
                                <CircleUserRound className="size-5 text-muted-foreground stroke-[1.5]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[14px] text-muted-foreground">Hoy</span>
                                <div className="text-[20px] font-medium leading-none mt-1">
                                    {formatCurrency(stats.revenueToday)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-[1px] bg-border mx-6" />

                    {/* Mes */}
                    <div className="p-6 flex items-start gap-5 flex-1 justify-center flex-col">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full flex items-center justify-center shrink-0 size-10" style={{ background: '#1D9E75', color: 'hsl(var(--background))' }}>
                                <DollarSign className="size-5 stroke-[1.5]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[14px] text-muted-foreground capitalize">{monthLabel}</span>
                                <div className="text-[20px] font-medium leading-none mt-1" style={{ color: '#1D9E75' }}>
                                    {formatCurrency(stats.revenueThisMonth)}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}