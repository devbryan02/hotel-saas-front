'use client'

import Link from 'next/link'
import type { DashboardStatsResponse } from '../type'
import { Card } from '@/components/ui/card'
import {
    BedDouble, BedSingle, Wrench, Sparkles,
    LogIn, LogOut, TrendingUp,
    Wallet, CalendarDays, ArrowRight,
    UserPlus, CalendarCheck, ChevronRight,
    PlusCircle, PercentCircle,
} from 'lucide-react'

function pct(part: number, total: number) {
    return total > 0 ? Math.round((part / total) * 100) : 0
}
function formatCurrency(v: number) {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2 }).format(v)
}

const P = {
    available: '#1D9E75',
    occupied: '#378ADD',
    maintenance: '#EF9F27',
    cleaning: '#7F77DD',
    checkin: '#1D9E75',
    checkout: '#E24B4A',
} as const

function SectionLabel({ title, sub }: { title: string; sub: string }) {
    return (
        <div className="flex flex-col gap-0.5">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">{title}</h3>
            <p className="text-[11px] text-muted-foreground/40">{sub}</p>
        </div>
    )
}

function Bar({ color, label, pctVal }: { color: string; label: string; pctVal: number }) {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground/50">{label}</span>
                <span className="text-[10px] font-semibold" style={{ color }}>{pctVal}%</span>
            </div>
            <div className="h-[3px] w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pctVal}%`, background: color }} />
            </div>
        </div>
    )
}

export function StatsCards({ stats }: { stats: DashboardStatsResponse }) {
    const monthLabel = new Date().toLocaleDateString('es-PE', { month: 'long', year: 'numeric' })
    const occPct = pct(stats.occupiedRooms, stats.totalRooms)
    const occStatus = occPct >= 80 ? 'Alta demanda 🔥' : occPct >= 50 ? 'Demanda media' : 'Baja demanda'
    const avgRev = stats.activeOccupations > 0 ? stats.revenueThisMonth / stats.activeOccupations : 0

    return (
        <div className="flex flex-col gap-4">

            {/* ══ FILA 1: Revenue + Check-ins/outs ══ */}
            <SectionLabel title="Resumen financiero" sub="Ingresos y movimientos de hoy" />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                {/* Revenue: Hoy | Mes */}
                <Card className="shadow-none border border-border bg-card overflow-hidden">
                    <div className="grid grid-cols-2 divide-x divide-border h-full">
                        {/* Hoy */}
                        <div className="p-4 flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <Wallet className="size-3.5 text-muted-foreground" />
                                    <span className="text-[11px] font-medium text-muted-foreground">Ingresos hoy</span>
                                </div>
                                <span className="size-2 rounded-full bg-muted-foreground/30" />
                            </div>
                            <span className="text-[28px] font-bold leading-none tracking-tight mt-1">
                                {formatCurrency(stats.revenueToday)}
                            </span>
                            <span className="text-[11px] text-muted-foreground/60">
                                {stats.revenueToday > 0
                                    ? `${stats.checkOutsToday} salida${stats.checkOutsToday > 1 ? 's' : ''} facturada${stats.checkOutsToday > 1 ? 's' : ''} hoy`
                                    : 'Ninguna salida facturada aún'}
                            </span>
                            {avgRev > 0 && (
                                <div className="flex items-center gap-1 mt-auto pt-2">
                                    <TrendingUp className="size-3 text-muted-foreground/40" />
                                    <span className="text-[10px] text-muted-foreground/50">
                                        {formatCurrency(avgRev)} promedio por estancia
                                    </span>
                                </div>
                            )}
                        </div>
                        {/* Mes */}
                        <div className="p-4 flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <CalendarDays className="size-3.5" style={{ color: P.available }} />
                                    <span className="text-[11px] font-medium text-muted-foreground capitalize">{monthLabel}</span>
                                </div>
                                <span className="size-2 rounded-full" style={{ background: P.available }} />
                            </div>
                            <span className="text-[28px] font-bold leading-none tracking-tight mt-1"
                                style={{ color: P.available }}>
                                {formatCurrency(stats.revenueThisMonth)}
                            </span>
                            <span className="text-[11px] text-muted-foreground/60">
                                Total cobrado en {new Date().toLocaleDateString('es-PE', { month: 'long' })}
                            </span>
                            <Link href="/dashboard/reports"
                                className="flex items-center gap-1 mt-auto pt-2 text-[10px] text-muted-foreground/40 hover:text-primary transition-colors w-fit">
                                <ArrowRight className="size-3" />
                                Ver reporte completo
                            </Link>
                        </div>
                    </div>
                </Card>

                {/* Check-ins | Check-outs — mismo patrón que Revenue */}
                <Card className="shadow-none border border-border bg-card overflow-hidden">
                    <div className="grid grid-cols-2 divide-x divide-border h-full">
                        {/* Check-in */}
                        <div className="p-4 flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <LogIn className="size-3.5" style={{ color: P.checkin }} />
                                    <span className="text-[11px] font-medium text-muted-foreground">Entradas hoy</span>
                                </div>
                                <span className="size-2 rounded-full"
                                    style={{ background: stats.checkInsToday > 0 ? P.checkin : 'hsl(var(--muted-foreground))' }} />
                            </div>
                            <div className="flex items-end justify-between mt-1">
                                <span className="text-[28px] font-bold leading-none tracking-tight"
                                    style={{ color: stats.checkInsToday > 0 ? P.checkin : undefined }}>
                                    {stats.checkInsToday}
                                </span>
                                {stats.checkInsToday > 0 && (
                                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md"
                                        style={{ background: `${P.checkin}22`, color: P.checkin }}>
                                        Activo
                                    </span>
                                )}
                            </div>
                            <span className="text-[11px] text-muted-foreground/60">
                                {stats.checkInsToday === 0
                                    ? 'Nadie ingresó todavía'
                                    : `${stats.checkInsToday} huésped${stats.checkInsToday > 1 ? 'es' : ''} llegó hoy`}
                            </span>
                            <div className="flex items-center gap-1 mt-auto pt-2">
                                <span className="text-[10px] text-muted-foreground/40">
                                    {stats.activeOccupations} estancia{stats.activeOccupations !== 1 ? 's' : ''} en curso
                                </span>
                            </div>
                        </div>
                        {/* Check-out */}
                        <div className="p-4 flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <LogOut className="size-3.5" style={{ color: P.checkout }} />
                                    <span className="text-[11px] font-medium text-muted-foreground">Salidas hoy</span>
                                </div>
                                <span className="size-2 rounded-full"
                                    style={{ background: stats.checkOutsToday > 0 ? P.checkout : 'hsl(var(--muted-foreground))' }} />
                            </div>
                            <div className="flex items-end justify-between mt-1">
                                <span className="text-[28px] font-bold leading-none tracking-tight"
                                    style={{ color: stats.checkOutsToday > 0 ? P.checkout : undefined }}>
                                    {stats.checkOutsToday}
                                </span>
                                {stats.checkOutsToday > 0 && (
                                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md"
                                        style={{ background: `${P.checkout}22`, color: P.checkout }}>
                                        Salidas
                                    </span>
                                )}
                            </div>
                            <span className="text-[11px] text-muted-foreground/60">
                                {stats.checkOutsToday === 0
                                    ? 'Nadie salió todavía'
                                    : `${stats.checkOutsToday} hab. quedó libre hoy`}
                            </span>
                            <div className="flex items-center gap-1 mt-auto pt-2">
                                <span className="text-[10px] text-muted-foreground/40">
                                    {stats.availableRooms} hab. disponible{stats.availableRooms !== 1 ? 's' : ''} ahora
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

            </div>

            {/* ══ FILA 2: Ocupación + 3 estados ══ */}
            <SectionLabel title="Estado de habitaciones" sub={`${stats.totalRooms} habitaciones · tiempo real`} />

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 items-start">

                {/* Ocupación */}
                <Card className="shadow-none border border-border bg-card p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <PercentCircle className="size-3.5" style={{ color: P.occupied }} />
                            <span className="text-[11px] font-medium text-muted-foreground">Ocupación</span>
                        </div>
                        <span className="size-2 rounded-full" style={{ background: P.occupied }} />
                    </div>
                    <div className="flex items-end gap-1">
                        <span className="text-[42px] font-bold leading-none tracking-tight"
                            style={{ color: P.occupied }}>{occPct}</span>
                        <span className="text-[20px] font-bold text-muted-foreground/40 mb-0.5">%</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[12px] font-medium text-foreground/80">{occStatus}</span>
                        <span className="text-[11px] text-muted-foreground/60">
                            {stats.occupiedRooms} ocupadas · {stats.availableRooms} libres
                        </span>
                    </div>
                    <Bar color={P.occupied} label="del total" pctVal={occPct} />
                </Card>

                {/* Disponibles */}
                <Card className="shadow-none border border-border bg-card p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <BedDouble className="size-3.5" style={{ color: P.available }} />
                            <span className="text-[11px] font-medium text-muted-foreground">Disponibles</span>
                        </div>
                        <span className="size-2 rounded-full" style={{ background: P.available }} />
                    </div>
                    <div className="flex items-end justify-between">
                        <span className="text-[34px] font-bold leading-none tracking-tight">{stats.availableRooms}</span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md mb-1"
                            style={{ background: `${P.available}22`, color: P.available }}>
                            {stats.availableRooms > 0 ? 'Listas' : 'Lleno'}
                        </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[12px] font-medium text-foreground/80">
                            {stats.availableRooms > 0 ? 'Listas para recibir huéspedes' : 'Sin disponibilidad ahora'}
                        </span>
                        <span className="text-[11px] text-muted-foreground/60">de {stats.totalRooms} habitaciones total</span>
                    </div>
                    <Bar color={P.available} label="del total" pctVal={pct(stats.availableRooms, stats.totalRooms)} />
                </Card>

                {/* Limpieza */}
                <Card className="shadow-none border border-border bg-card p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <Sparkles className="size-3.5" style={{ color: P.cleaning }} />
                            <span className="text-[11px] font-medium text-muted-foreground">En limpieza</span>
                        </div>
                        <span className="size-2 rounded-full" style={{ background: P.cleaning }} />
                    </div>
                    <div className="flex items-end justify-between">
                        <span className="text-[34px] font-bold leading-none tracking-tight">{stats.cleaningRooms}</span>
                        {stats.cleaningRooms > 0 && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md mb-1"
                                style={{ background: `${P.cleaning}22`, color: P.cleaning }}>En curso</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[12px] font-medium text-foreground/80">
                            {stats.cleaningRooms > 0 ? 'Se están preparando' : 'Todo limpio y en orden'}
                        </span>
                        <span className="text-[11px] text-muted-foreground/60">
                            {stats.cleaningRooms > 0 ? `${stats.cleaningRooms} hab. aún no disponibles` : 'Sin pendientes de limpieza'}
                        </span>
                    </div>
                    <Bar color={P.cleaning} label="del total" pctVal={pct(stats.cleaningRooms, stats.totalRooms)} />
                </Card>

                {/* Mantenimiento */}
                <Card className="shadow-none border border-border bg-card p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <Wrench className="size-3.5" style={{ color: P.maintenance }} />
                            <span className="text-[11px] font-medium text-muted-foreground">Mantenimiento</span>
                        </div>
                        <span className="size-2 rounded-full" style={{ background: P.maintenance }} />
                    </div>
                    <div className="flex items-end justify-between">
                        <span className="text-[34px] font-bold leading-none tracking-tight">{stats.maintenanceRooms}</span>
                        {stats.maintenanceRooms > 0 && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md mb-1"
                                style={{ background: `${P.maintenance}22`, color: P.maintenance }}>Atención</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[12px] font-medium text-foreground/80">
                            {stats.maintenanceRooms > 0 ? 'Necesitan reparación' : 'Todo funcionando bien'}
                        </span>
                        <span className="text-[11px] text-muted-foreground/60">
                            {stats.maintenanceRooms > 0 ? `${stats.maintenanceRooms} hab. fuera de servicio` : 'Sin incidencias reportadas'}
                        </span>
                    </div>
                    <Bar color={P.maintenance} label="del total" pctVal={pct(stats.maintenanceRooms, stats.totalRooms)} />
                </Card>

            </div>

            {/* ══ FILA 3: Acciones rápidas ══ */}
            <SectionLabel title="Acciones rápidas" sub="Lo que más usas en el día a día" />

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                    { href: '/dashboard/clients', icon: UserPlus, label: 'Nuevo huésped', sub: 'Registrar cliente nuevo' },
                    { href: '/dashboard/rooms', icon: PlusCircle, label: 'Nueva habitación', sub: 'Agregar al inventario' },
                    {
                        href: '/dashboard/occupations', icon: CalendarCheck, label: 'Ver ocupaciones',
                        sub: `${stats.activeOccupations} activa${stats.activeOccupations !== 1 ? 's' : ''} en este momento`
                    },
                    {
                        href: '/dashboard/rooms', icon: BedDouble, label: 'Ver habitaciones',
                        sub: `${stats.availableRooms} libre${stats.availableRooms !== 1 ? 's' : ''} para check-in`
                    },
                ].map(({ href, icon: Icon, label, sub }) => (
                    <Link key={label} href={href}
                        className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 hover:border-primary/40 hover:bg-primary/5 transition-all">
                        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                            <Icon className="size-4 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-[13px] font-semibold leading-tight">{label}</p>
                            <p className="text-[11px] text-muted-foreground/60 leading-tight mt-0.5">{sub}</p>
                        </div>
                        <ChevronRight className="size-4 text-muted-foreground/30 group-hover:text-primary/50 transition-colors shrink-0" />
                    </Link>
                ))}
            </div>

        </div>
    )
}