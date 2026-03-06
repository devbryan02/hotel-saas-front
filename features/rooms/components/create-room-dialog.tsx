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
import { CreateRoomForm } from './room-form'
import { useCreateRoom } from '../hooks/use-rooms'
import type { CreateRoomFormValues } from '../schemas'

interface CreateRoomDialogProps {
  tenantId: string
}

export function CreateRoomDialog({ tenantId }: CreateRoomDialogProps) {
  const [open, setOpen] = useState(false)
  const { mutate: createRoom, isPending } = useCreateRoom(tenantId)

  function handleSubmit(data: CreateRoomFormValues) {
    createRoom(data, {
      onSuccess: () => setOpen(false),
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Nueva habitación</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear habitación</DialogTitle>
        </DialogHeader>
        <CreateRoomForm onSubmit={handleSubmit} isPending={isPending} />
      </DialogContent>
    </Dialog>
  )
}