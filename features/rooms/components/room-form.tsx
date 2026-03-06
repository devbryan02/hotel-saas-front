'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Loader2, Hash, BedDouble, DollarSign, Save, PlusSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  createRoomSchema,
  updateRoomSchema,
  type CreateRoomFormValues,
  type UpdateRoomFormValues,
} from '../schemas'
import type { RoomListItemResponse, RoomStatus, RoomType } from '../types'

// ============================================
// FIELD (texto/número)
// ============================================
interface FieldProps {
  id: string
  label: string
  placeholder: string
  error?: string
  icon: React.ElementType
  type?: string
  registration: object
}

function Field({ id, label, placeholder, error, icon: Icon, type = 'text', registration }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
      <div className="relative">
        <Icon className={cn(
          'absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/50',
          error && 'text-destructive/50'
        )} />
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          {...registration}
          className={cn('pl-8', error && 'border-destructive focus-visible:ring-destructive/30')}
        />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

// ============================================
// SELECT FIELD
// ============================================
interface SelectFieldProps {
  id: string
  label: string
  error?: string
  options: { label: string; value: string }[]
  registration: object
}

function SelectField({ id, label, error, options, registration }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
      <select
        id={id}
        {...registration}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          error && 'border-destructive focus-visible:ring-destructive/30'
        )}
      >
        <option value="">Seleccionar...</option>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

const ROOM_TYPE_OPTIONS: { label: string; value: RoomType }[] = [
  { label: 'Simple', value: 'SIMPLE' },
  { label: 'Doble', value: 'DOBLE' },
  { label: 'Suite', value: 'SUITE' },
  { label: 'Matrimonial', value: 'MATRIMONIAL' },
]

const ROOM_STATUS_OPTIONS: { label: string; value: RoomStatus }[] = [
  { label: 'Disponible', value: 'AVAILABLE' },
  { label: 'Ocupado', value: 'OCCUPIED' },
  { label: 'Mantenimiento', value: 'MAINTENANCE' },
  { label: 'Limpieza', value: 'CLEANING' },
]

// ============================================
// CREAR
// ============================================
export function CreateRoomForm({ onSubmit, isPending }: {
  onSubmit: (data: CreateRoomFormValues) => void
  isPending: boolean
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateRoomFormValues>({
    resolver: zodResolver(createRoomSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Field
        id="roomNumber" label="Número de habitación" placeholder="101"
        icon={Hash} error={errors.roomNumber?.message}
        registration={register('roomNumber')}
      />
      <SelectField
        id="roomType" label="Tipo de habitación"
        options={ROOM_TYPE_OPTIONS} error={errors.roomType?.message}
        registration={register('roomType')}
      />
      <Field
        id="pricePerNight" label="Precio por noche (S/.)" placeholder="150"
        icon={DollarSign} type="number" error={errors.pricePerNight?.message}
        registration={register('pricePerNight', { valueAsNumber: true })}
      />
      <Button type="submit" disabled={isPending} className="mt-1 w-full gap-2">
        {isPending
          ? <><Loader2 className="size-4 animate-spin" /> Creando...</>
          : <><PlusSquare className="size-4" /> Crear habitación</>
        }
      </Button>
    </form>
  )
}

// ============================================
// EDITAR
// ============================================
export function UpdateRoomForm({ defaultValues, onSubmit, isPending }: {
  defaultValues: RoomListItemResponse
  onSubmit: (data: UpdateRoomFormValues) => void
  isPending: boolean
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<UpdateRoomFormValues>({
    resolver: zodResolver(updateRoomSchema),
    defaultValues: {
      roomNumber: defaultValues.roomNumber,
      roomType: defaultValues.roomType as RoomType,
      pricePerNight: defaultValues.pricePerNight,
      status: defaultValues.status,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Field
        id="roomNumber" label="Número de habitación" placeholder="101"
        icon={Hash} error={errors.roomNumber?.message}
        registration={register('roomNumber')}
      />
      <div className="grid grid-cols-2 gap-3">
        <SelectField
          id="roomType" label="Tipo"
          options={ROOM_TYPE_OPTIONS} error={errors.roomType?.message}
          registration={register('roomType')}
        />
        <SelectField
          id="status" label="Estado"
          options={ROOM_STATUS_OPTIONS} error={errors.status?.message}
          registration={register('status')}
        />
      </div>
      <Field
        id="pricePerNight" label="Precio por noche (S/.)" placeholder="150"
        icon={DollarSign} type="number" error={errors.pricePerNight?.message}
        registration={register('pricePerNight', { valueAsNumber: true })}
      />
      <Button type="submit" disabled={isPending} className="mt-1 w-full gap-2">
        {isPending
          ? <><Loader2 className="size-4 animate-spin" /> Actualizando...</>
          : <><Save className="size-4" /> Guardar cambios</>
        }
      </Button>
    </form>
  )
}