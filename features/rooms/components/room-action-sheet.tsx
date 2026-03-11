'use client'

import { useState } from 'react'
import { useCheckOut } from '@/features/occupations/hooks/use-occupations'
import { useRooms } from '../hooks/use-rooms'
import { UpdateRoomDialog } from './update-room-dialog'
import { useIsMobile } from '@/hooks/use-mobile'
import type { RoomListItemResponse } from '../types'
import {
  LogOut, CalendarCheck, CalendarX, User,
  Moon, BedDouble, Loader2, AlertTriangle,
  Wrench, Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface RoomActionSheetProps {
  room: RoomListItemResponse
  tenantId: string
  onClose: () => void
  onCheckInClick: (room: RoomListItemResponse) => void
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('es-PE', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

function calcNights(checkIn: string, checkOut: string) {
  const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime()
  return Math.round(diff / (1000 * 60 * 60 * 24))
}

// ── Contenido reutilizable para ambos modos ──
function SheetContent({
  room, tenantId, onClose, onCheckInClick
}: RoomActionSheetProps) {
  const [confirmCheckout, setConfirmCheckout] = useState(false)
  const { mutate: checkOut, isPending } = useCheckOut(tenantId)
  const { refetch } = useRooms(tenantId)

  const client = room.activeClient
  const isOccupied = room.status === 'OCCUPIED'
  const isAvailable = room.status === 'AVAILABLE'
  const nights = client ? calcNights(client.checkInDate, client.checkOutDate) : 0
  const total = nights * room.pricePerNight

  function handleCheckOut() {
    if (!client) return
    checkOut(client.occupationId, {
      onSuccess: () => { refetch(); onClose() },
    })
  }

  return (
    <div className="flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className={cn(
          'flex size-14 items-center justify-center rounded-2xl shrink-0',
          isOccupied            && 'bg-blue-100',
          isAvailable           && 'bg-emerald-100',
          room.status === 'CLEANING'    && 'bg-violet-100',
          room.status === 'MAINTENANCE' && 'bg-amber-100',
        )}>
          <BedDouble className={cn(
            'size-7',
            isOccupied            && 'text-blue-600',
            isAvailable           && 'text-emerald-600',
            room.status === 'CLEANING'    && 'text-violet-600',
            room.status === 'MAINTENANCE' && 'text-amber-600',
          )} />
        </div>
        <div>
          <h3 className="text-xl font-bold">Hab. {room.roomNumber}</h3>
          <p className="text-sm text-muted-foreground">
            {room.roomType} · S/ {room.pricePerNight}/noche
          </p>
        </div>
      </div>

      {/* OCUPADA */}
      {isOccupied && client && !confirmCheckout && (
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl bg-muted/50 p-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-blue-100 shrink-0">
                <User className="size-4 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold leading-tight">{client.fullName}</p>
                <p className="text-xs text-muted-foreground">DNI {client.document}</p>
              </div>
            </div>
            <div className="h-px bg-border" />
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <CalendarCheck className="mt-0.5 size-4 text-emerald-500 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Check-in</p>
                  <p className="text-sm font-medium">{formatDate(client.checkInDate)}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CalendarX className="mt-0.5 size-4 text-red-400 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Check-out</p>
                  <p className="text-sm font-medium">{formatDate(client.checkOutDate)}</p>
                </div>
              </div>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Moon className="size-3.5" />
                {nights} {nights === 1 ? 'noche' : 'noches'}
              </div>
              <p className="text-lg font-bold">
                {new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(total)}
              </p>
            </div>
          </div>
          <Button
            variant="destructive"
            className="w-full h-12 rounded-2xl text-base"
            onClick={() => setConfirmCheckout(true)}
          >
            <LogOut className="size-4 mr-2" />
            Realizar Check-out
          </Button>
        </div>
      )}

      {/* CONFIRMAR CHECKOUT */}
      {isOccupied && confirmCheckout && (
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl bg-destructive/10 border border-destructive/20 p-4 flex items-start gap-3">
            <AlertTriangle className="size-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-destructive">¿Confirmar check-out?</p>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="font-medium">{client?.fullName}</span> saldrá de Hab.{' '}
                {room.roomNumber} y la habitación quedará disponible.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline" className="h-12 rounded-2xl"
              onClick={() => setConfirmCheckout(false)} disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive" className="h-12 rounded-2xl"
              onClick={handleCheckOut} disabled={isPending}
            >
              {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Sí, check-out'}
            </Button>
          </div>
        </div>
      )}

      {/* DISPONIBLE */}
      {isAvailable && (
        <div className="flex flex-col gap-3">
          <Button
            className="w-full h-12 rounded-2xl text-base"
            onClick={() => onCheckInClick(room)}
          >
            <CalendarCheck className="size-4 mr-2" />
            Registrar ocupación
          </Button>
          <UpdateRoomDialog tenantId={tenantId} room={room} triggerFullWidth />
        </div>
      )}

      {/* LIMPIEZA / MANTENIMIENTO */}
      {!isOccupied && !isAvailable && (
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl bg-muted/50 p-4 flex items-center justify-center gap-2">
            {room.status === 'CLEANING'
              ? <><Sparkles className="size-4 text-violet-500" /><p className="text-sm font-medium text-violet-600">Habitación en limpieza</p></>
              : <><Wrench className="size-4 text-amber-500" /><p className="text-sm font-medium text-amber-600">Habitación en mantenimiento</p></>
            }
          </div>
          <UpdateRoomDialog tenantId={tenantId} room={room} triggerFullWidth />
        </div>
      )}
    </div>
  )
}

// ── Componente principal: mobile = sheet, desktop = dialog ──
export function RoomActionSheet(props: RoomActionSheetProps) {
  const isMobile = useIsMobile()

  // ── DESKTOP: Dialog centrado ──
  if (!isMobile) {
    return (
      <Dialog open onOpenChange={(open) => !open && props.onClose()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="sr-only">Habitación {props.room.roomNumber}</DialogTitle>
          </DialogHeader>
          <SheetContent {...props} />
        </DialogContent>
      </Dialog>
    )
  }

  // ── MOBILE: Bottom sheet ──
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      onClick={props.onClose}
    >
      <div
        className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
        </div>
        <div className="p-6 pb-8">
          <SheetContent {...props} />
        </div>
      </div>
    </div>
  )
}