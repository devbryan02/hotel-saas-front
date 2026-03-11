'use client'

import { useState } from 'react'
import { useRooms } from '../hooks/use-rooms'
import { CreateRoomDialog } from './create-room-dialog'
import { RoomActionSheet } from './room-action-sheet'
import { BedDouble, AlertCircle, Loader2, User, Wrench, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { RoomListItemResponse, RoomStatus } from '../types'
import { CreateOccupationSheet } from './create-occupation-sheet'

// ── Config visual por estado ──
const STATUS_CONFIG: Record<RoomStatus, {
  label: string
  bg: string
  border: string
  dot: string
  textColor: string
  icon: React.ElementType | null
}> = {
  AVAILABLE: {
    label: 'Libre',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-200 dark:border-emerald-800/50',
    dot: 'bg-emerald-400',
    textColor: 'text-emerald-700 dark:text-emerald-400',
    icon: null
  },
  OCCUPIED: {
    label: 'Ocupada',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800/50',
    dot: 'bg-blue-400',
    textColor: 'text-blue-700 dark:text-blue-400',
    icon: User
  },
  MAINTENANCE: {
    label: 'Mantenimiento',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800/50',
    dot: 'bg-amber-400',
    textColor: 'text-amber-700 dark:text-amber-400',
    icon: Wrench
  },
  CLEANING: {
    label: 'Limpieza',
    bg: 'bg-violet-50 dark:bg-violet-950/30',
    border: 'border-violet-200 dark:border-violet-800/50',
    dot: 'bg-violet-400',
    textColor: 'text-violet-700 dark:text-violet-400',
    icon: Sparkles
  },
}

const TYPE_LABELS: Record<string, string> = {
    SIMPLE: 'Simple', DOBLE: 'Doble', SUITE: 'Suite', MATRIMONIAL: 'Matrimonial',
}

type StatusFilter = 'ALL' | RoomStatus

const FILTERS: { value: StatusFilter; label: string }[] = [
    { value: 'ALL', label: 'Todas' },
    { value: 'AVAILABLE', label: 'Libres' },
    { value: 'OCCUPIED', label: 'Ocupadas' },
    { value: 'CLEANING', label: 'Limpieza' },
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
            <div className="flex items-start justify-between">
                <span className="text-2xl font-bold tracking-tight dark:text-white">{room.roomNumber}</span>
                <span className={cn('mt-1 size-2.5 rounded-full', cfg.dot)} />
            </div>

            <span className="text-xs font-medium text-muted-foreground">
                {TYPE_LABELS[room.roomType] ?? room.roomType}
            </span>

            <span className="text-sm font-semibold dark:text-white">
                {new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(room.pricePerNight)}
                <span className="text-xs font-normal text-muted-foreground"> /noche</span>
            </span>

            <div className={cn('flex items-center gap-1.5 text-xs font-semibold', cfg.textColor)}>
                {StatusIcon && <StatusIcon className="size-3" />}
                {cfg.label}
            </div>

            {room.activeClient && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
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
    const [checkInRoom, setCheckInRoom] = useState<RoomListItemResponse | null>(null)

    const filtered = filter === 'ALL' ? rooms : rooms.filter(r => r.status === filter)

    const counts = rooms.reduce((acc, r) => {
        acc[r.status] = (acc[r.status] ?? 0) + 1
        return acc
    }, {} as Record<RoomStatus, number>)

    return (
        <div className="flex flex-col gap-6">

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

            {/* Filtros scrollables */}
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

            {/* Loading */}
            {isLoading && (
                <div className="flex justify-center py-16">
                    <Loader2 className="size-8 animate-spin text-muted-foreground" />
                </div>
            )}

            {/* Error */}
            {isError && (
                <div className="flex flex-col items-center gap-2 py-16 text-destructive">
                    <AlertCircle className="size-8" />
                    <p className="text-sm">Error al cargar habitaciones</p>
                </div>
            )}

            {/* Grid de cards */}
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

            {/* Action Sheet */}
            {selectedRoom && (
                <RoomActionSheet
                    room={selectedRoom}
                    tenantId={tenantId}
                    onClose={() => setSelectedRoom(null)}
                    onCheckInClick={(room) => {
                        setSelectedRoom(null)
                        setCheckInRoom(room)
                    }}
                />
            )}

            {checkInRoom && (
                <CreateOccupationSheet
                    room={checkInRoom}
                    tenantId={tenantId}
                    onClose={() => setCheckInRoom(null)}
                />
            )}

        </div>
    )
}