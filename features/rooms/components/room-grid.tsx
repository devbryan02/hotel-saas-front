'use client'

import { useState } from 'react'
import { useRooms } from '../hooks/use-rooms'
import { CreateRoomDialog } from './create-room-dialog'
import { BedDouble, AlertCircle, Loader2, User, Wrench, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { RoomListItemResponse, RoomStatus } from '../types'

// ── Config visual por estado ──
const STATUS_CONFIG: Record<RoomStatus, {
  label: string
  bg: string
  border: string
  dot: string
  textColor: string
  icon: React.ElementType | null
}> = {
  AVAILABLE:   { label: 'Libre',         bg: 'bg-emerald-50',  border: 'border-emerald-200', dot: 'bg-emerald-400', textColor: 'text-emerald-700', icon: null },
  OCCUPIED:    { label: 'Ocupada',       bg: 'bg-blue-50',     border: 'border-blue-200',    dot: 'bg-blue-400',    textColor: 'text-blue-700',    icon: User },
  MAINTENANCE: { label: 'Mantenimiento', bg: 'bg-amber-50',    border: 'border-amber-200',   dot: 'bg-amber-400',   textColor: 'text-amber-700',   icon: Wrench },
  CLEANING:    { label: 'Limpieza',      bg: 'bg-violet-50',   border: 'border-violet-200',  dot: 'bg-violet-400',  textColor: 'text-violet-700',  icon: Sparkles },
}

const TYPE_LABELS: Record<string, string> = {
  SIMPLE: 'Simple', DOBLE: 'Doble', SUITE: 'Suite', MATRIMONIAL: 'Matrimonial',
}

// ── Filtros ──
type StatusFilter = 'ALL' | RoomStatus

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: 'ALL',         label: 'Todas' },
  { value: 'AVAILABLE',   label: 'Libres' },
  { value: 'OCCUPIED',    label: 'Ocupadas' },
  { value: 'CLEANING',    label: 'Limpieza' },
  { value: 'MAINTENANCE', label: 'Mantenimiento' },
]

// ── Room Card ──
function RoomCard({
  room,
  onClick,
}: {
  room: RoomListItemResponse
  onClick: (room: RoomListItemResponse) => void
}) {
  const cfg = STATUS_CONFIG[room.status]
  const StatusIcon = cfg.icon

  return (
    <button
      onClick={() => onClick(room)}
      className={cn(
        'flex flex-col gap-2 rounded-2xl border-2 p-4 text-left transition-all active:scale-95',
        'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/40',
        cfg.bg, cfg.border
      )}
    >
      {/* Número + status dot */}
      <div className="flex items-start justify-between">
        <span className="text-2xl font-bold tracking-tight">{room.roomNumber}</span>
        <span className={cn('mt-1 size-2.5 rounded-full', cfg.dot)} />
      </div>

      {/* Tipo */}
      <span className="text-xs font-medium text-muted-foreground">
        {TYPE_LABELS[room.roomType] ?? room.roomType}
      </span>

      {/* Precio */}
      <span className="text-sm font-semibold">
        {new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(room.pricePerNight)}
        <span className="text-xs font-normal text-muted-foreground"> /noche</span>
      </span>

      {/* Estado */}
      <div className={cn('flex items-center gap-1.5 text-xs font-semibold', cfg.textColor)}>
        {StatusIcon && <StatusIcon className="size-3" />}
        {cfg.label}
      </div>

      {/* Huésped activo */}
      {room.activeClient && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground truncate">
          <User className="size-3 shrink-0" />
          <span className="truncate">{room.activeClient.fullName}</span>
        </div>
      )}
    </button>
  )
}

// ── Main Component ──
interface RoomGridProps {
  tenantId: string
}

export function RoomGrid({ tenantId }: RoomGridProps) {
  const { data: rooms = [], isLoading, isError } = useRooms(tenantId)
  const [filter, setFilter] = useState<StatusFilter>('ALL')
  const [selectedRoom, setSelectedRoom] = useState<RoomListItemResponse | null>(null)

  const filtered = filter === 'ALL' ? rooms : rooms.filter(r => r.status === filter)

  // Conteos para los filtros
  const counts = rooms.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] ?? 0) + 1
    return acc
  }, {} as Record<RoomStatus, number>)

  return (
    <div className="flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
            <BedDouble className="size-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Habitaciones</h2>
            <p className="text-xs text-muted-foreground">
              {isLoading ? 'Cargando...' : `${rooms.length} habitaciones`}
            </p>
          </div>
        </div>
        <CreateRoomDialog tenantId={tenantId} />
      </div>

      {/* Filtros — scrollable horizontal en mobile */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              'shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
              filter === f.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            {f.label}
            {f.value !== 'ALL' && counts[f.value as RoomStatus] != null && (
              <span className="ml-1.5 opacity-70">({counts[f.value as RoomStatus]})</span>
            )}
          </button>
        ))}
      </div>

      {/* Estados de carga/error */}
      {isLoading && (
        <div className="flex justify-center py-16">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </div>
      )}
      {isError && (
        <div className="flex flex-col items-center gap-2 py-16 text-destructive">
          <AlertCircle className="size-8" />
          <p className="text-sm">Error al cargar habitaciones</p>
        </div>
      )}

      {/* Grid */}
      {!isLoading && !isError && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map(room => (
            <RoomCard key={room.id} room={room} onClick={setSelectedRoom} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-12 text-center text-sm text-muted-foreground">
              No hay habitaciones con este estado.
            </div>
          )}
        </div>
      )}

      {/* TODO: RoomActionSheet — lo hacemos en el siguiente paso */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setSelectedRoom(null)}>
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-background p-6 shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <p className="font-semibold">Hab. {selectedRoom.roomNumber} — {selectedRoom.status}</p>
            {/* Aquí va el RoomActionSheet con flujo de ocupación */}
            <p className="mt-2 text-sm text-muted-foreground">
              Próximo paso: flujo de check-in 🚀
            </p>
          </div>
        </div>
      )}
    </div>
  )
}