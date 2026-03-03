'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  createClientSchema,
  updateClientSchema,
  type CreateClientFormValues,
  type UpdateClientFormValues,
} from '../schemas'
import type { ClientListItemResponse } from '../types'

// ============================================
// FIELD — componente reutilizable interno
// ============================================
interface FieldProps {
  id: string
  label: string
  placeholder: string
  error?: string
  optional?: boolean
  registration: object
}

function Field({ id, label, placeholder, error, optional, registration }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
        </Label>
        {optional && (
          <span className="text-[11px] text-muted-foreground">Opcional</span>
        )}
      </div>
      <Input
        id={id}
        placeholder={placeholder}
        className={cn(error && 'border-destructive focus-visible:ring-destructive/30')}
        {...registration}
      />
      {error && (
        <p className="flex items-center gap-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

// ============================================
// CREAR
// ============================================
interface CreateClientFormProps {
  onSubmit: (data: CreateClientFormValues) => void
  isPending: boolean
}

export function CreateClientForm({ onSubmit, isPending }: CreateClientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClientFormValues>({
    resolver: zodResolver(createClientSchema),
    defaultValues: { fullName: '', document: '', email: '', phone: '' },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

      <Field
        id="fullName"
        label="Nombre completo"
        placeholder="Bryan Cardenas"
        error={errors.fullName?.message}
        registration={register('fullName')}
      />
      <Field
        id="document"
        label="Documento"
        placeholder="77296138"
        error={errors.document?.message}
        registration={register('document')}
      />

      {/* Fila de 2 columnas — email y teléfono */}
      <div className="grid grid-cols-2 gap-3">
        <Field
          id="email"
          label="Email"
          placeholder="bryan@gmail.com"
          error={errors.email?.message}
          optional
          registration={register('email')}
        />
        <Field
          id="phone"
          label="Teléfono"
          placeholder="999888777"
          error={errors.phone?.message}
          registration={register('phone')}
        />
      </div>

      <Button type="submit" disabled={isPending} className="mt-1 w-full">
        {isPending ? (
          <span className="flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" />
            Creando...
          </span>
        ) : (
          'Crear cliente'
        )}
      </Button>

    </form>
  )
}

// ============================================
// EDITAR
// ============================================
interface UpdateClientFormProps {
  defaultValues: ClientListItemResponse
  onSubmit: (data: UpdateClientFormValues) => void
  isPending: boolean
}

export function UpdateClientForm({ defaultValues, onSubmit, isPending }: UpdateClientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateClientFormValues>({
    resolver: zodResolver(updateClientSchema),
    defaultValues: {
      fullName: defaultValues.fullName,
      email: defaultValues.email ?? '',
      phone: defaultValues.phone,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

      <Field
        id="fullName"
        label="Nombre completo"
        placeholder="Bryan Cardenas"
        error={errors.fullName?.message}
        registration={register('fullName')}
      />

      <div className="grid grid-cols-2 gap-3">
        <Field
          id="email"
          label="Email"
          placeholder="bryan@gmail.com"
          error={errors.email?.message}
          optional
          registration={register('email')}
        />
        <Field
          id="phone"
          label="Teléfono"
          placeholder="999888777"
          error={errors.phone?.message}
          registration={register('phone')}
        />
      </div>

      {/* Info documento — solo lectura */}
      <div className="rounded-lg bg-muted/50 px-3 py-2.5">
        <p className="text-[11px] text-muted-foreground">Documento</p>
        <p className="text-sm font-medium">{defaultValues.document}</p>
      </div>

      <Button type="submit" disabled={isPending} className="mt-1 w-full">
        {isPending ? (
          <span className="flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" />
            Actualizando...
          </span>
        ) : (
          'Actualizar cliente'
        )}
      </Button>

    </form>
  )
}