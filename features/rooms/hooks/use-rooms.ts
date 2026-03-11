import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { roomService } from '../services/room.service'
import type { CreateRoomRequest, UpdateRoomRequest } from '../types'
import { toast } from 'sonner'

export const roomKeys = {
  all: (tenantId: string) => ['rooms', tenantId] as const,
  byId: (tenantId: string, roomId: string) =>
    [...roomKeys.all(tenantId), roomId] as const,
}

export function useRooms(tenantId: string) {
  return useQuery({
    queryKey: roomKeys.all(tenantId),
    queryFn: () => roomService.getAll(tenantId),
    enabled: !!tenantId,
  })
}

export function useCreateRoom(tenantId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateRoomRequest) =>
      roomService.create(tenantId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomKeys.all(tenantId) })
     toast.success('Habitación creada exitosamente',{
      description: 'La habitación ha sido creada exitosamente',
     })    
    },
  })
}

export function useUpdateRoom(tenantId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ roomId, data }: { roomId: string; data: UpdateRoomRequest }) =>
      roomService.update(tenantId, roomId, data),
    onSuccess: (_, { roomId }) => {
      queryClient.invalidateQueries({ queryKey: roomKeys.all(tenantId) })
      queryClient.invalidateQueries({ queryKey: roomKeys.byId(tenantId, roomId) })
      toast.success('Habitación actualizada', {
        description: 'La habitación ha sido actualizada exitosamente',
      })
    },
  })
}