import { z } from 'zod'

export const createClientSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Mínimo 3 caracteres')
    .max(150, 'Máximo 150 caracteres'),
  document: z
    .string()
    .min(8, 'Mínimo 8 caracteres')
    .max(20, 'Máximo 20 caracteres')
    .regex(/^[0-9]{8}$|^[A-Za-z0-9]{6,20}$/, 'DNI: 8 dígitos. Pasaporte: 6-20 caracteres'),
  email: z
    .string()
    .email('Email inválido')
    .max(150, 'Máximo 150 caracteres')
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .regex(/^(\+51\s?)?9[0-9]{8}$/, 'Formato: 999999999 o +51 999999999'),
})

export const updateClientSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Mínimo 3 caracteres')
    .max(150, 'Máximo 150 caracteres'),
  email: z
    .string()
    .email('Email inválido')
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .regex(/^(\+51\s?)?9[0-9]{8}$/, 'Formato: 999999999 o +51 999999999')
    .optional(),
})

export type CreateClientFormValues = z.infer<typeof createClientSchema>
export type UpdateClientFormValues = z.infer<typeof updateClientSchema>