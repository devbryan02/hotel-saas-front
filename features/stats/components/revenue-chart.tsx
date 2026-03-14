'use client'

import type { DashboardStatsResponse } from '../type'
import { Card, CardContent } from "@/components/ui/card"
import {
    Bar, BarChart, XAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'

function formatCurrency(v: number) {
    return new Intl.NumberFormat('es-PE', {
        style: 'currency', currency: 'PEN', minimumFractionDigits: 2,
    }).format(v)
}

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

interface Props {
    stats: DashboardStatsResponse
}

export function RevenueChart({ stats }: Props) {
    const currentMonth = new Date().getMonth()
    const year = new Date().getFullYear()

    const data = MONTHS.map((month, i) => ({
        month,
        value: i === currentMonth ? stats.revenueThisMonth : 0,
        isCurrent: i === currentMonth,
    }))

    return (
        <section className="flex flex-col gap-4">
            <p className="text-[15px] text-foreground">
                Ganancias por mes — {year}
            </p>
            <Card className="shadow-none">
                <CardContent className="h-[260px] p-6 pt-8 pb-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} barSize={24} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 13, fill: 'hsl(var(--muted-foreground))' }}
                                dy={10}
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{
                                    background: 'hsl(var(--card))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: 8, fontSize: 12,
                                    boxShadow: 'none'
                                }}
                                formatter={(v: any) => [formatCurrency(Number(v) || 0), 'Ingresos']}
                            />
                            <Bar dataKey="value" radius={[2, 2, 0, 0] as any} background={{ fill: 'hsl(var(--muted))', radius: [2, 2, 0, 0] as any }}>
                                {data.map((entry, i) => (
                                    <Cell key={i} fill={entry.isCurrent ? '#1D9E75' : 'transparent'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </section>
    )
}