'use client'

import { Badge } from '@/components/ui/badge'
import type { OccupationListItemResponse, OccupationStatus } from '../types'
import { BedDouble, User, CalendarCheck, CalendarX, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Config visual por estado ──
const STATUS_CONFIG: Record<OccupationStatus, {
  label: string
  badge: string
  dot: string
}> = {
  ACTIVE:    { label: 'Activa',    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',    dot: 'bg-blue-400' },
  FINISHED:  { label: 'Finalizada', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400', dot: 'bg-emerald-400' },
  CANCELLED: { label: 'Cancelada', badge: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400',       dot: 'bg-red-400' },
}

const TYPE_LABELS: Record<string, string> = {
  SIMPLE: 'Simple', DOBLE: 'Doble', SUITE: 'Suite', MATRIMONIAL: 'Matrimonial',
}

function formatDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('es-PE', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

interface OccupationCardProps {
  occupation: OccupationListItemResponse
}

export function OccupationCard({ occupation }: OccupationCardProps) {
  const cfg = STATUS_CONFIG[occupation.status]

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-3.5">

      {/* Header: hab + estado */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <BedDouble className="size-4 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-sm leading-tight">
              Hab. {occupation.roomNumber}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {TYPE_LABELS[occupation.roomType] ?? occupation.roomType}
            </p>
          </div>
        </div>
        <span className={cn(
          'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium shrink-0',
          cfg.badge
        )}>
          <span className={cn('size-1.5 rounded-full', cfg.dot)} />
          {cfg.label}
        </span>
      </div>

      <div className="h-px bg-border" />

      {/* Cliente */}
      <div className="flex items-center gap-2">
        <User className="size-3.5 shrink-0 text-muted-foreground" />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{occupation.clientFullName}</p>
          <p className="text-[11px] text-muted-foreground">DNI {occupation.clientDocument}</p>
        </div>
      </div>

      {/* Fechas + noches */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <CalendarCheck className="size-3.5 text-emerald-500 shrink-0" />
            <span className="text-xs text-muted-foreground">{formatDate(occupation.checkInDate)}</span>
          </div>
          <span className="text-muted-foreground/40 text-xs">→</span>
          <div className="flex items-center gap-1.5">
            <CalendarX className="size-3.5 text-red-400 shrink-0" />
            <span className="text-xs text-muted-foreground">{formatDate(occupation.checkOutDate)}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Moon className="size-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{occupation.nights}n</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
        <span className="text-xs text-muted-foreground">
          S/ {Number(occupation.pricePerNight).toFixed(2)} × {occupation.nights} noches
        </span>
        <span className="font-bold text-sm">
          {new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(Number(occupation.totalPrice))}
        </span>
      </div>

    </div>
  )
}