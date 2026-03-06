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
import { Edit } from 'lucide-react'

interface UpdateRoomDialogProps {
  tenantId: string
  room: RoomListItemResponse
}

export function UpdateRoomDialog({ tenantId, room }: UpdateRoomDialogProps) {
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
        <Button variant="outline" size="sm" title="Editar habitación">
          <Edit />
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