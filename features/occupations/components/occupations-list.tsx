'use client'

import { useState } from 'react'
import { useOccupations, useCheckOut } from '../hooks/use-occupations'
import { OccupationCard } from './occupation-card'
import { useIsMobile } from '@/hooks/use-mobile'
import type { OccupationStatus, OccupationListItemResponse } from '../types'
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  CalendarCheck, AlertCircle, Loader2,
  ChevronLeft, ChevronRight, BedDouble, User, Moon,
  LogOut, AlertTriangle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Tipos ──
type StatusFilter = 'ALL' | OccupationStatus

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: 'ALL', label: 'Todas' },
  { value: 'ACTIVE', label: 'Activas' },
  { value: 'FINISHED', label: 'Finalizadas' },
]

const STATUS_CONFIG: Record<OccupationStatus, { label: string; badge: string; dot: string }> = {
  ACTIVE: { label: 'Activa', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400', dot: 'bg-blue-400' },
  FINISHED: { label: 'Finalizada', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400', dot: 'bg-emerald-400' },
}

const TYPE_LABELS: Record<string, string> = {
  SIMPLE: 'Simple', DOBLE: 'Doble', SUITE: 'Suite', MATRIMONIAL: 'Matrimonial',
}

function formatDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('es-PE', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

function formatCurrency(n: number) {
  return `S/ ${n.toFixed(2)}`
}

// ── Botón checkout con confirmación inline ──
function CheckOutButton({ occupation, tenantId }: { occupation: OccupationListItemResponse; tenantId: string }) {
  const [confirming, setConfirming] = useState(false)
  const { mutate: checkOut, isPending } = useCheckOut(tenantId)

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] text-muted-foreground whitespace-nowrap">¿Confirmar?</span>
        <Button
          size="sm"
          variant="destructive"
          className="h-7 px-2.5 text-xs rounded-md"
          disabled={isPending}
          onClick={() => checkOut(occupation.id, { onSuccess: () => setConfirming(false) })}
        >
          {isPending ? <Loader2 className="size-3 animate-spin" /> : 'Sí'}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="h-7 px-2.5 text-xs rounded-md"
          disabled={isPending}
          onClick={() => setConfirming(false)}
        >
          No
        </Button>
      </div>
    )
  }

  return (
    <Button
      size="sm"
      variant="outline"
      className="h-7 px-2.5 text-xs rounded-md gap-1.5 text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-colors"
      onClick={() => setConfirming(true)}
    >
      <LogOut className="size-3" />
      Checkout
    </Button>
  )
}

interface OccupationsListProps {
  tenantId: string
}

const PAGE_SIZE = 20

export function OccupationsList({ tenantId }: OccupationsListProps) {
  const [page, setPage] = useState(0)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL')
  const isMobile = useIsMobile()

  const statusParam = statusFilter === 'ALL' ? undefined : statusFilter
  const { data, isLoading, isError } = useOccupations(tenantId, page, PAGE_SIZE, statusParam)

  const occupations = data?.content ?? []
  const totalPages = data?.totalPages ?? 0
  const totalElements = data?.totalElements ?? 0
  const isEmpty = !isLoading && !isError && occupations.length === 0

  return (
    <div className="flex flex-col gap-5">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
            <CalendarCheck className="size-5 text-primary" />
          </div>
          <div className="flex flex-col gap-0.5">
            <h2 className="text-xl font-semibold tracking-tight">Ocupaciones</h2>
            <p className="text-xs text-muted-foreground">
              {isLoading
                ? 'Cargando...'
                : `${totalElements} ${totalElements === 1 ? 'registro' : 'registros'}`}
            </p>
          </div>
        </div>
      </div>

      {/* ── Filtros ── */}
      <div className="flex gap-2">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => { setStatusFilter(f.value); setPage(0) }}
            className={cn(
              'rounded-full px-3.5 py-1 text-sm font-medium transition-all',
              statusFilter === f.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/70',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ── Loading ── */}
      {isLoading && (
        <div className="flex justify-center py-16">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* ── Error ── */}
      {isError && (
        <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
          <AlertCircle className="size-6" />
          <p className="text-sm">Error al cargar las ocupaciones</p>
        </div>
      )}

      {/* ── Empty ── */}
      {isEmpty && (
        <div className="flex flex-col items-center gap-2 py-16 text-center text-muted-foreground">
          <CalendarCheck className="size-8 opacity-30" />
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
            <div key={o.id} className="flex flex-col gap-2">
              <OccupationCard occupation={o} />
              {o.status === 'ACTIVE' && (
                <div className="px-1">
                  <CheckOutButton occupation={o} tenantId={tenantId} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── DESKTOP: Tabla ── */}
      {!isLoading && !isError && !isEmpty && !isMobile && (
        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                {['Habitación', 'Huésped', 'Check-in', 'Check-out', 'Noches', 'Total', 'Estado', ''].map(h => (
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

                    {/* Habitación */}
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <BedDouble className="size-4 shrink-0 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">Hab. {o.roomNumber}</p>
                          <p className="text-xs text-muted-foreground">{TYPE_LABELS[o.roomType] ?? o.roomType}</p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Huésped */}
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <User className="size-4 shrink-0 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{o.clientFullName}</p>
                          <p className="text-xs text-muted-foreground">DNI {o.clientDocument}</p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Fechas */}
                    <TableCell className="px-4 py-3 text-sm text-muted-foreground">
                      {formatDate(o.checkInDate)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-muted-foreground">
                      {formatDate(o.checkOutDate)}
                    </TableCell>

                    {/* Noches */}
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Moon className="size-3.5" />
                        {o.nights}
                      </div>
                    </TableCell>

                    {/* Total */}
                    <TableCell className="px-4 py-3">
                      <span className="text-sm font-semibold">{formatCurrency(o.totalPrice)}</span>
                    </TableCell>

                    {/* Estado */}
                    <TableCell className="px-4 py-3">
                      <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium', cfg.badge)}>
                        <span className={cn('size-1.5 rounded-full', cfg.dot)} />
                        {cfg.label}
                      </span>
                    </TableCell>

                    {/* Acción checkout */}
                    <TableCell className="px-4 py-3">
                      {o.status === 'ACTIVE' && (
                        <CheckOutButton occupation={o} tenantId={tenantId} />
                      )}
                    </TableCell>

                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* ── Paginación ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Página {page + 1} de {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => p - 1)}
              disabled={page === 0}
              className="h-8 w-8 p-0 rounded-lg"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => p + 1)}
              disabled={page >= totalPages - 1}
              className="h-8 w-8 p-0 rounded-lg"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}

    </div>
  )
}