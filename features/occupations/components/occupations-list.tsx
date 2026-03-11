'use client'

import { useState } from 'react'
import { useOccupations } from '../hooks/use-occupations'
import { OccupationCard } from './occupation-card'
import { useIsMobile } from '@/hooks/use-mobile'
import type { OccupationStatus } from '../types'
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  CalendarCheck, AlertCircle, Loader2,
  ChevronLeft, ChevronRight, BedDouble, User, Moon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Tipos ──
type StatusFilter = 'ALL' | OccupationStatus

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: 'ALL',       label: 'Todas' },
  { value: 'ACTIVE',    label: 'Activas' },
  { value: 'FINISHED',  label: 'Finalizadas' }
]

const STATUS_CONFIG: Record<OccupationStatus, { label: string; badge: string; dot: string }> = {
  ACTIVE:    { label: 'Activa',     badge: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',    dot: 'bg-blue-400' },
  FINISHED:  { label: 'Finalizada', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400', dot: 'bg-emerald-400' },
  CANCELLED: { label: 'Cancelada',  badge: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400',        dot: 'bg-red-400' },
}

const TYPE_LABELS: Record<string, string> = {
  SIMPLE: 'Simple', DOBLE: 'Doble', SUITE: 'Suite', MATRIMONIAL: 'Matrimonial',
}

function formatDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('es-PE', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

interface OccupationsListProps {
  tenantId: string
}

const PAGE_SIZE = 20

export function OccupationsList({ tenantId }: OccupationsListProps) {
  const [page, setPage] = useState(0)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL')
  const isMobile = useIsMobile()

  // ✅ status al backend — filtro real con paginación correcta
  const statusParam = statusFilter === 'ALL' ? undefined : statusFilter
  const { data, isLoading, isError } = useOccupations(tenantId, page, PAGE_SIZE, statusParam)

  // Sin filtro client-side — el backend ya lo maneja
  const occupations = data?.content ?? []
  const totalPages = data?.totalPages ?? 0
  const totalElements = data?.totalElements ?? 0
  const isEmpty = !isLoading && !isError && occupations.length === 0

  return (
    <div className="flex flex-col gap-5">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
            <CalendarCheck className="size-5 text-primary" />
          </div>
          <div className="flex flex-col gap-0.5">
            <h2 className="text-xl font-semibold tracking-tight">Ocupaciones</h2>
            <p className="text-xs text-muted-foreground">
              {isLoading
                ? 'Cargando...'
                : `${totalElements} ${totalElements === 1 ? 'registro' : 'registros'}`
              }
            </p>
          </div>
        </div>
      </div>

      {/* ── Filtros de estado ── */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => { setStatusFilter(f.value); setPage(0) }}
            className={cn(
              'shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all',
              statusFilter === f.value
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ── Loading ── */}
      {isLoading && (
        <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed py-16 text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          <span className="text-sm">Cargando ocupaciones...</span>
        </div>
      )}

      {/* ── Error ── */}
      {isError && (
        <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-destructive/40 py-16 text-destructive">
          <AlertCircle className="size-4" />
          <span className="text-sm">Error al cargar ocupaciones</span>
        </div>
      )}

      {/* ── Empty ── */}
      {isEmpty && (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-16 text-muted-foreground">
          <div className="flex size-10 items-center justify-center rounded-full bg-muted">
            <CalendarCheck className="size-5" />
          </div>
          <p className="text-sm font-medium">
            {statusFilter !== 'ALL' ? 'Sin ocupaciones con este estado' : 'No hay ocupaciones registradas'}
          </p>
          <p className="text-xs">Las ocupaciones se crean desde la vista de Habitaciones</p>
        </div>
      )}

      {/* ── MOBILE: Cards ── */}
      {!isLoading && !isError && !isEmpty && isMobile && (
        <div className="flex flex-col gap-2">
          {occupations.map(o => (
            <OccupationCard key={o.id} occupation={o} />
          ))}
        </div>
      )}

      {/* ── DESKTOP: Tabla ── */}
      {!isLoading && !isError && !isEmpty && !isMobile && (
        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                {['Habitación', 'Huésped', 'Check-in', 'Check-out', 'Noches', 'Total', 'Estado'].map(h => (
                  <TableHead
                    key={h}
                    className="h-10 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {occupations.map(o => {
                const cfg = STATUS_CONFIG[o.status]
                return (
                  <TableRow key={o.id} className="border-b border-border/60 last:border-0">
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <BedDouble className="size-4 shrink-0 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">Hab. {o.roomNumber}</p>
                          <p className="text-xs text-muted-foreground">
                            {TYPE_LABELS[o.roomType] ?? o.roomType}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <User className="size-4 shrink-0 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{o.clientFullName}</p>
                          <p className="text-xs text-muted-foreground">DNI {o.clientDocument}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-muted-foreground">
                      {formatDate(o.checkInDate)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-muted-foreground">
                      {formatDate(o.checkOutDate)}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Moon className="size-3.5" />
                        {o.nights}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 font-semibold text-sm">
                      {new Intl.NumberFormat('es-PE', {
                        style: 'currency', currency: 'PEN',
                      }).format(Number(o.totalPrice))}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <span className={cn(
                        'flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium',
                        cfg.badge
                      )}>
                        <span className={cn('size-1.5 rounded-full', cfg.dot)} />
                        {cfg.label}
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* ── Paginación ── */}
      {!isLoading && !isError && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Página {page + 1} de {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage(p => p - 1)}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages - 1}
              onClick={() => setPage(p => p + 1)}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}

    </div>
  )
}