'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Loader2, User, CreditCard, Mail, Phone, UserPlus, Save } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  createClientSchema,
  updateClientSchema,
  type CreateClientFormValues,
  type UpdateClientFormValues,
} from '../schemas'
import type { ClientListItemResponse } from '../types'

// ============================================
// FIELD
// ============================================
interface FieldProps {
  id: string
  label: string
  placeholder: string
  error?: string
  optional?: boolean
  icon: React.ElementType
  registration: object
}

function Field({ id, label, placeholder, error, optional, icon: Icon, registration }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
        {optional && <span className="text-[11px] text-muted-foreground">Opcional</span>}
      </div>
      <div className="relative">
        <Icon className={cn(
          'absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/50',
          error && 'text-destructive/50'
        )} />
        <Input
          id={id}
          placeholder={placeholder}
          {...registration}
          className={cn(
            'pl-8',
            error && 'border-destructive focus-visible:ring-destructive/30'
          )}
        />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

// ============================================
// CREAR
// ============================================
export function CreateClientForm({ onSubmit, isPending }: {
  onSubmit: (data: CreateClientFormValues) => void
  isPending: boolean
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateClientFormValues>({
    resolver: zodResolver(createClientSchema),
    defaultValues: { fullName: '', document: '', email: '', phone: '' },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Field id="fullName" label="Nombre completo" placeholder="Juan Perez"
        icon={User} error={errors.fullName?.message} registration={register('fullName')} />
      <Field id="document" label="Documento" placeholder="78625389"
        icon={CreditCard} error={errors.document?.message} registration={register('document')} />
      <div className="grid grid-cols-2 gap-3">
        <Field id="email" label="Email" placeholder="juan@gmail.com"
          icon={Mail} error={errors.email?.message} optional registration={register('email')} />
        <Field id="phone" label="Teléfono" placeholder="999888777"
          icon={Phone} error={errors.phone?.message} registration={register('phone')} />
      </div>
      <Button type="submit" disabled={isPending} className="mt-1 w-full gap-2">
        {isPending
          ? <><Loader2 className="size-4 animate-spin" /> Creando...</>
          : <><UserPlus className="size-4" /> Crear cliente</>
        }
      </Button>
    </form>
  )
}

// ============================================
// EDITAR
// ============================================
export function UpdateClientForm({ defaultValues, onSubmit, isPending }: {
  defaultValues: ClientListItemResponse
  onSubmit: (data: UpdateClientFormValues) => void
  isPending: boolean
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<UpdateClientFormValues>({
    resolver: zodResolver(updateClientSchema),
    defaultValues: {
      fullName: defaultValues.fullName,
      email: defaultValues.email ?? '',
      phone: defaultValues.phone,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Field id="fullName" label="Nombre completo" placeholder="Bryan Cardenas"
        icon={User} error={errors.fullName?.message} registration={register('fullName')} />
      <div className="grid grid-cols-2 gap-3">
        <Field id="email" label="Email" placeholder="bryan@gmail.com"
          icon={Mail} error={errors.email?.message} optional registration={register('email')} />
        <Field id="phone" label="Teléfono" placeholder="999888777"
          icon={Phone} error={errors.phone?.message} registration={register('phone')} />
      </div>

      {/* Documento solo lectura */}
      <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2.5">
        <CreditCard className="size-4 shrink-0 text-muted-foreground/40" />
        <div className="flex flex-1 flex-col">
          <p className="text-[11px] text-muted-foreground">Documento</p>
          <p className="text-sm font-medium">{defaultValues.document}</p>
        </div>
        <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground/60">
          No editable
        </span>
      </div>

      <Button type="submit" disabled={isPending} className="mt-1 w-full gap-2">
        {isPending
          ? <><Loader2 className="size-4 animate-spin" /> Actualizando...</>
          : <><Save className="size-4" /> Guardar cambios</>
        }
      </Button>
    </form>
  )
}