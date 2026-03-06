import { z } from 'zod'

export const createRoomSchema = z.object({
  roomNumber: z
    .string()
    .min(1, 'Requerido')
    .max(10, 'Máximo 10 caracteres'),
  roomType: z.enum(['SIMPLE', 'DOBLE', 'SUITE', 'MATRIMONIAL'], {
    message: 'Tipo de habitación inválido',
  }),
  pricePerNight: z
    .number()
    .positive('Debe ser mayor a 0'),
})

export const updateRoomSchema = z.object({
  roomNumber: z
    .string()
    .min(1, 'Requerido')
    .max(10, 'Máximo 10 caracteres'),
  roomType: z.enum(['SIMPLE', 'DOBLE', 'SUITE', 'MATRIMONIAL'], {
    message: 'Tipo de habitación inválido',
  }),
  pricePerNight: z
    .number()
    .positive('Debe ser mayor a 0'),
  status: z.enum(['AVAILABLE', 'OCCUPIED', 'MAINTENANCE', 'CLEANING'], {
    message: 'Estado inválido',
  }),
})

export type CreateRoomFormValues = z.infer<typeof createRoomSchema>
export type UpdateRoomFormValues = z.infer<typeof updateRoomSchema>