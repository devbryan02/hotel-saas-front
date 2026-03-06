'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { UpdateRoomDialog } from './update-room-dialog'
import type { RoomListItemResponse, RoomStatus } from '../types'
import { Hash, BedDouble, DollarSign, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const STATUS_CONFIG: Record<RoomStatus, { label: string; dot: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  AVAILABLE:   { label: 'Disponible',   dot: 'bg-emerald-400',    variant: 'default' },
  OCCUPIED:    { label: 'Ocupado',      dot: 'bg-blue-400',       variant: 'secondary' },
  MAINTENANCE: { label: 'Mantenimiento',dot: 'bg-amber-400',      variant: 'outline' },
  CLEANING:    { label: 'Limpieza',     dot: 'bg-violet-400',     variant: 'secondary' },
}

const TYPE_LABELS: Record<string, string> = {
  SIMPLE:      'Simple',
  DOBLE:       'Doble',
  SUITE:       'Suite',
  MATRIMONIAL: 'Matrimonial',
}

export function getRoomColumns(tenantId: string): ColumnDef<RoomListItemResponse>[] {
  return [
    {
      accessorKey: 'roomNumber',
      header: 'Habitación',
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Hash className="size-3.5 text-primary" />
          </div>
          <span className="font-semibold">{row.original.roomNumber}</span>
        </div>
      ),
    },
    {
      accessorKey: 'roomType',
      header: 'Tipo',
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <BedDouble className="size-3.5 shrink-0" />
          <span>{TYPE_LABELS[row.original.roomType] ?? row.original.roomType}</span>
        </div>
      ),
    },
    {
      accessorKey: 'pricePerNight',
      header: 'Precio / noche',
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <DollarSign className="size-3.5 shrink-0" />
          <span>
            {new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' })
              .format(row.original.pricePerNight)}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: ({ row }) => {
        const cfg = STATUS_CONFIG[row.original.status]
        return (
          <Badge variant={cfg.variant} className="rounded-full px-2 py-0.5 text-[11px]">
            <span className={cn('mr-1.5 inline-block size-1.5 rounded-full', cfg.dot)} />
            {cfg.label}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'activeClient',
      header: 'Huésped activo',
      cell: ({ row }) => {
        const client = row.original.activeClient
        return client ? (
          <div className="flex items-center gap-1.5">
            <User className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="text-sm">{client.fullName}</span>
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">—</span>
        )
      },
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <UpdateRoomDialog tenantId={tenantId} room={row.original} />
      ),
    },
  ]
}