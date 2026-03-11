'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { UpdateRoomForm } from './room-form'
import { useUpdateRoom } from '../hooks/use-rooms'
import type { UpdateRoomFormValues } from '../schemas'
import type { RoomListItemResponse } from '../types'
import { Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UpdateRoomDialogProps {
  tenantId: string
  room: RoomListItemResponse
  triggerFullWidth?: boolean
}

export function UpdateRoomDialog({ tenantId, room, triggerFullWidth = false }: UpdateRoomDialogProps) {
  const [open, setOpen] = useState(false)
  const { mutate: updateRoom, isPending } = useUpdateRoom(tenantId)

  function handleSubmit(data: UpdateRoomFormValues) {
    updateRoom(
      { roomId: room.id, data },
      { onSuccess: () => setOpen(false) }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size={triggerFullWidth ? 'default' : 'sm'}
          className={cn(triggerFullWidth && 'w-full h-12 rounded-2xl')}
          title="Editar habitación"
        >
          <Settings className="size-4" />
          {triggerFullWidth && <span className="ml-2">Editar habitación</span>}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar habitación</DialogTitle>
        </DialogHeader>
        <UpdateRoomForm
          defaultValues={room}
          onSubmit={handleSubmit}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  )
}