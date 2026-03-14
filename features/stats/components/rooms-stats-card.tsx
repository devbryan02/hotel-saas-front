'use client'

import type { DashboardStatsResponse } from '../type'
import { Card, CardContent } from '@/components/ui/card'

function pct(part: number, total: number) {
    return total > 0 ? Math.round((part / total) * 100) : 0
}

interface RoomCardProps {
    label: string
    value: number
    sub?: string
    pctVal: number
    accentClass: string
    bgAccentClass: string
}

function RoomCard({ label, value, sub, pctVal, accentClass, bgAccentClass }: RoomCardProps) {
    return (
        <Card className="shadow-none">
            <CardContent className="p-4 flex flex-col gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[15px] font-medium text-muted-foreground">{label}</span>
                        <span className={`text-xl font-medium ${accentClass}`}>{value}</span>
                    </div>
                    {sub && <div className="text-[13px] text-muted-foreground">{sub}</div>}
                </div>
                
                <div className="flex items-center gap-2">
                    <div className="flex-1 h-[2px] rounded-full bg-muted overflow-hidden">
                        <div 
                            className={`h-full rounded-full transition-all duration-500 ${bgAccentClass}`} 
                            style={{ width: `${pctVal}%` }} 
                        />
                    </div>
                    <span className={`text-[11px] tabular-nums ${accentClass}`}>{pctVal}%</span>
                </div>
            </CardContent>
        </Card>
    )
}

interface Props {
    stats: DashboardStatsResponse
}

export function RoomsStatsCard({ stats }: Props) {
    return (
        <section className="flex flex-col gap-4">
            <p className="text-[15px] text-muted-foreground">
                Resumen en tiempo real de tu hotel
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RoomCard
                    label="Disponibles" value={stats.availableRooms}
                    sub={`${stats.totalRooms} Total`}
                    pctVal={pct(stats.availableRooms, stats.totalRooms)}
                    accentClass="text-[#1D9E75]"
                    bgAccentClass="bg-[#1D9E75]"
                />
                <RoomCard
                    label="Ocupadas" value={stats.occupiedRooms}
                    sub={`${pct(stats.occupiedRooms, stats.totalRooms)}%`}
                    pctVal={pct(stats.occupiedRooms, stats.totalRooms)}
                    accentClass="text-[#378ADD]"
                    bgAccentClass="bg-[#378ADD]"
                />
                <RoomCard
                    label="Mantenimiento" value={stats.maintenanceRooms}
                    sub={`${pct(stats.maintenanceRooms, stats.totalRooms)}%`}
                    pctVal={pct(stats.maintenanceRooms, stats.totalRooms)}
                    accentClass="text-[#EF9F27]"
                    bgAccentClass="bg-[#EF9F27]"
                />
                <RoomCard
                    label="Limpieza" value={stats.cleaningRooms}
                    sub={`${pct(stats.cleaningRooms, stats.totalRooms)}%`}
                    pctVal={pct(stats.cleaningRooms, stats.totalRooms)}
                    accentClass="text-[#7F77DD]"
                    bgAccentClass="bg-[#7F77DD]"
                />
            </div>
        </section>
    )
}