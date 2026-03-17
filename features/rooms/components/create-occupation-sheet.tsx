'use client'

import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSearchClients } from '@/features/clients/hooks/use-clients'
import { useCreateOccupation } from '@/features/occupations/hooks/use-occupations'
import { useRooms } from '../hooks/use-rooms'
import { useIsMobile } from '@/hooks/use-mobile'
import type { RoomListItemResponse } from '../types'
import type { ClientListItemResponse } from '@/features/clients/types'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Search, User, BedDouble, CalendarCheck, CalendarX,
  Moon, ChevronRight, ChevronLeft, Loader2, Check, Pencil,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────
// SCHEMA fechas
// ─────────────────────────────────────────
const datesSchema = z.object({
  checkInDate: z.string().min(1, 'Requerido'),
  checkOutDate: z.string().min(1, 'Requerido'),
}).refine(d => new Date(d.checkOutDate) > new Date(d.checkInDate), {
  message: 'La salida debe ser posterior a la entrada',
  path: ['checkOutDate'],
})

type DatesFormValues = z.infer<typeof datesSchema>

function today() {
  return new Date().toISOString().split('T')[0]
}

function tomorrow() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

function calcNights(ci: string, co: string) {
  return Math.round((new Date(co).getTime() - new Date(ci).getTime()) / 86400000)
}

function formatDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('es-PE', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

// ─────────────────────────────────────────
// PASO 1 — Buscar y seleccionar cliente
// ─────────────────────────────────────────
function StepSelectClient({
  tenantId,
  selectedClient,
  onSelect,
  onNext,
}: {
  tenantId: string
  selectedClient: ClientListItemResponse | null
  onSelect: (c: ClientListItemResponse) => void
  onNext: () => void
}) {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    if (query.trim().length < 2) { setDebouncedQuery(''); return }
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 400)
    return () => clearTimeout(t)
  }, [query])

  const hasQuery = debouncedQuery.length >= 2
  const { data: searchResults = [], isLoading } = useSearchClients(tenantId, debouncedQuery)

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h4 className="font-semibold text-base">Seleccionar huésped</h4>
        <p className="text-xs text-muted-foreground mt-0.5">Escribe el nombre o DNI del huésped</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Nombre o DNI..."
          className="pl-9 rounded-xl"
        />
      </div>

      {/* Cliente seleccionado */}
      {selectedClient && !hasQuery && (
        <div className="flex items-center gap-3 rounded-xl border border-primary bg-primary/5 ring-1 ring-primary/30 p-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <User className="size-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{selectedClient.fullName}</p>
            <p className="text-xs text-muted-foreground">DNI {selectedClient.document}</p>
          </div>
          <Check className="size-4 text-primary shrink-0" />
        </div>
      )}

      {hasQuery && isLoading && (
        <div className="flex justify-center py-6">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {hasQuery && !isLoading && searchResults.length === 0 && (
        <div className="flex flex-col items-center gap-1 py-6 text-center">
          <p className="text-sm font-medium">Sin resultados</p>
          <p className="text-xs text-muted-foreground">No se encontró ningún huésped con "{debouncedQuery}"</p>
        </div>
      )}

      {hasQuery && !isLoading && searchResults.length > 0 && (
        <div className="flex flex-col gap-1.5 max-h-52 overflow-y-auto pr-1">
          {searchResults.map(client => (
            <button
              key={client.id}
              onClick={() => { onSelect(client); setQuery(''); setDebouncedQuery('') }}
              className={cn(
                'flex items-center gap-3 rounded-xl border p-3 text-left transition-all',
                selectedClient?.id === client.id
                  ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
                  : 'border-border hover:bg-muted/50'
              )}
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted">
                <User className="size-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{client.fullName}</p>
                <p className="text-xs text-muted-foreground">DNI {client.document}</p>
              </div>
              {selectedClient?.id === client.id && <Check className="size-4 text-primary shrink-0" />}
            </button>
          ))}
        </div>
      )}

      {!hasQuery && !selectedClient && (
        <div className="flex flex-col items-center gap-1 py-6 text-center text-muted-foreground">
          <Search className="size-8 opacity-30" />
          <p className="text-sm font-medium">Busca un huésped</p>
          <p className="text-xs">Escribe mínimo 2 caracteres para buscar</p>
        </div>
      )}

      <Button className="w-full h-11 rounded-xl" disabled={!selectedClient} onClick={onNext}>
        Continuar <ChevronRight className="size-4 ml-1" />
      </Button>
    </div>
  )
}

// ─────────────────────────────────────────
// PASO 2 — Fechas
// ─────────────────────────────────────────
function StepDates({
  room,
  onBack,
  onNext,
  defaultValues,
}: {
  room: RoomListItemResponse
  onBack: () => void
  onNext: (data: DatesFormValues) => void
  defaultValues?: DatesFormValues
}) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<DatesFormValues>({
    resolver: zodResolver(datesSchema),
    defaultValues: defaultValues ?? { checkInDate: today(), checkOutDate: tomorrow() },
  })

  const ci = watch('checkInDate')
  const co = watch('checkOutDate')
  const nights = ci && co && co > ci ? calcNights(ci, co) : 0
  const total = nights * room.pricePerNight

  return (
    <form onSubmit={handleSubmit(onNext)} className="flex flex-col gap-4">
      <div>
        <h4 className="font-semibold text-base">Fechas de estancia</h4>
        <p className="text-xs text-muted-foreground mt-0.5">Selecciona el período de la ocupación</p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-medium flex items-center gap-1.5">
            <CalendarCheck className="size-3.5 text-muted-foreground" /> Check-in
          </Label>
          <Input type="date" {...register('checkInDate')} className="rounded-xl" />
          {errors.checkInDate && <p className="text-xs text-destructive">{errors.checkInDate.message}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-medium flex items-center gap-1.5">
            <CalendarX className="size-3.5 text-muted-foreground" /> Check-out
          </Label>
          <Input type="date" {...register('checkOutDate')} className="rounded-xl" />
          {errors.checkOutDate && <p className="text-xs text-destructive">{errors.checkOutDate.message}</p>}
        </div>
      </div>

      {nights > 0 && (
        <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Moon className="size-4" />
            <span>{nights} {nights === 1 ? 'noche' : 'noches'}</span>
          </div>
          <p className="font-bold text-base">
            {new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(total)}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Button type="button" variant="outline" className="h-11 rounded-xl" onClick={onBack}>
          <ChevronLeft className="size-4 mr-1" /> Atrás
        </Button>
        <Button type="submit" className="h-11 rounded-xl">
          Continuar <ChevronRight className="size-4 ml-1" />
        </Button>
      </div>
    </form>
  )
}

// ─────────────────────────────────────────
// PASO 3 — Confirmar (con total editable)
// ─────────────────────────────────────────
function StepConfirm({
  room,
  client,
  dates,
  onBack,
  onConfirm,
  isPending,
}: {
  room: RoomListItemResponse
  client: ClientListItemResponse
  dates: DatesFormValues
  onBack: () => void
  onConfirm: (customTotal: number) => void
  isPending: boolean
}) {
  const nights = calcNights(dates.checkInDate, dates.checkOutDate)
  const calculatedTotal = nights * room.pricePerNight

  const [editingTotal, setEditingTotal] = useState(false)
  const [totalInput, setTotalInput] = useState(calculatedTotal.toFixed(2))
  const [totalError, setTotalError] = useState('')

  const displayTotal = parseFloat(totalInput) || 0
  const isCustom = Math.abs(displayTotal - calculatedTotal) > 0.01

  function handleTotalChange(val: string) {
    setTotalInput(val)
    const num = parseFloat(val)
    if (!val || isNaN(num) || num <= 0) {
      setTotalError('Ingresa un monto válido mayor a 0')
    } else {
      setTotalError('')
    }
  }

  function handleConfirm() {
    const num = parseFloat(totalInput)
    if (!num || num <= 0) {
      setTotalError('Ingresa un monto válido mayor a 0')
      return
    }
    onConfirm(num)
  }

  const formatPEN = (n: number) =>
    new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(n)

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h4 className="font-semibold text-base">Confirmar ocupación</h4>
        <p className="text-xs text-muted-foreground mt-0.5">Revisa los datos antes de registrar</p>
      </div>

      <div className="rounded-xl border border-border p-4 flex flex-col gap-3">

        {/* Habitación */}
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/40 shrink-0">
            <BedDouble className="size-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Habitación</p>
            <p className="font-semibold">Hab. {room.roomNumber} — {room.roomType}</p>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Cliente */}
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950/40 shrink-0">
            <User className="size-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Huésped</p>
            <p className="font-semibold">{client.fullName}</p>
            <p className="text-xs text-muted-foreground">DNI {client.document}</p>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Fechas */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <CalendarCheck className="size-3" /> Check-in
            </p>
            <p className="text-sm font-medium">{formatDate(dates.checkInDate)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <CalendarX className="size-3" /> Check-out
            </p>
            <p className="text-sm font-medium">{formatDate(dates.checkOutDate)}</p>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Total — editable */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Moon className="size-3.5 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">{nights} {nights === 1 ? 'noche' : 'noches'} × {formatPEN(room.pricePerNight)}</p>
            </div>
            {!editingTotal && (
              <button
                onClick={() => setEditingTotal(true)}
                className="flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <Pencil className="size-3" /> Editar
              </button>
            )}
          </div>

          {editingTotal ? (
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground shrink-0">S/</span>
                <Input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={totalInput}
                  onChange={e => handleTotalChange(e.target.value)}
                  className="rounded-lg h-9 text-base font-bold"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setTotalInput(calculatedTotal.toFixed(2))
                    setTotalError('')
                    setEditingTotal(false)
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground shrink-0 whitespace-nowrap"
                >
                  Restablecer
                </button>
              </div>
              {totalError && <p className="text-xs text-destructive">{totalError}</p>}
              {isCustom && !totalError && (
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  ⚠ Total personalizado — calculado: {formatPEN(calculatedTotal)}
                </p>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-lg bg-primary/5 px-3 py-2">
              <span className="text-xs text-muted-foreground">Total a cobrar</span>
              <div className="flex items-center gap-2">
                {isCustom && (
                  <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/40 px-1.5 py-0.5 rounded-md">
                    Personalizado
                  </span>
                )}
                <span className="text-lg font-bold text-primary">{formatPEN(displayTotal)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button type="button" variant="outline" className="h-11 rounded-xl" onClick={onBack} disabled={isPending}>
          <ChevronLeft className="size-4 mr-1" /> Atrás
        </Button>
        <Button className="h-11 rounded-xl" onClick={handleConfirm} disabled={isPending || !!totalError}>
          {isPending
            ? <Loader2 className="size-4 animate-spin" />
            : <><Check className="size-4 mr-1.5" />Registrar</>
          }
        </Button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// INDICADOR DE PASOS
// ─────────────────────────────────────────
function StepIndicator({ current }: { current: number }) {
  const steps = ['Huésped', 'Fechas', 'Confirmar']
  return (
    <div className="flex items-center gap-2 mb-1">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className={cn(
              'flex size-5 items-center justify-center rounded-full text-[10px] font-bold transition-colors',
              i + 1 <= current ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            )}>
              {i + 1 < current ? <Check className="size-3" /> : i + 1}
            </div>
            <span className={cn(
              'text-xs font-medium transition-colors',
              i + 1 === current ? 'text-foreground' : 'text-muted-foreground'
            )}>
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={cn('h-px w-6 transition-colors', i + 1 < current ? 'bg-primary' : 'bg-muted')} />
          )}
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────
// WIZARD PRINCIPAL
// ─────────────────────────────────────────
interface CreateOccupationSheetProps {
  room: RoomListItemResponse
  tenantId: string
  onClose: () => void
}

function OccupationWizard({ room, tenantId, onClose }: CreateOccupationSheetProps) {
  const [step, setStep] = useState(1)
  const [selectedClient, setSelectedClient] = useState<ClientListItemResponse | null>(null)
  const [dates, setDates] = useState<DatesFormValues | null>(null)

  const { mutate: createOccupation, isPending } = useCreateOccupation(tenantId)
  const { refetch } = useRooms(tenantId)

  function handleConfirm(customTotal: number) {
    if (!selectedClient || !dates) return
    createOccupation(
      {
        roomId: room.id,
        clientId: selectedClient.id,
        data: { ...dates, totalPrice: customTotal },
      },
      {
        onSuccess: () => { refetch(); onClose() },
      }
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <StepIndicator current={step} />

      {step === 1 && (
        <StepSelectClient
          tenantId={tenantId}
          selectedClient={selectedClient}
          onSelect={setSelectedClient}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <StepDates
          room={room}
          defaultValues={dates ?? undefined}
          onBack={() => setStep(1)}
          onNext={(data) => { setDates(data); setStep(3) }}
        />
      )}

      {step === 3 && selectedClient && dates && (
        <StepConfirm
          room={room}
          client={selectedClient}
          dates={dates}
          onBack={() => setStep(2)}
          onConfirm={handleConfirm}
          isPending={isPending}
        />
      )}
    </div>
  )
}

// ─────────────────────────────────────────
// EXPORT PRINCIPAL
// ─────────────────────────────────────────
export function CreateOccupationSheet({ room, tenantId, onClose }: CreateOccupationSheetProps) {
  const isMobile = useIsMobile()

  if (!isMobile) {
    return (
      <Dialog open onOpenChange={open => !open && onClose()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="sr-only">Registrar ocupación</DialogTitle>
          </DialogHeader>
          <OccupationWizard room={room} tenantId={tenantId} onClose={onClose} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md" onClick={onClose}>
      <div
        className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-background shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
        </div>
        <div className="p-6 pb-8">
          <OccupationWizard room={room} tenantId={tenantId} onClose={onClose} />
        </div>
      </div>
    </div>
  )
}