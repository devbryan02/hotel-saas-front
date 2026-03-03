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
import { CreateClientForm } from './client-form'
import { useCreateClient } from '../hooks/use-clients'
import type { CreateClientFormValues } from '../schemas'

interface CreateClientDialogProps {
  tenantId: string
}

export function CreateClientDialog({ tenantId }: CreateClientDialogProps) {
  const [open, setOpen] = useState(false)
  const { mutate: createClient, isPending } = useCreateClient(tenantId)

  function handleSubmit(data: CreateClientFormValues) {
    createClient(data, {
      onSuccess: () => setOpen(false), 
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Nuevo cliente</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear cliente</DialogTitle>
        </DialogHeader>
        <CreateClientForm
          onSubmit={handleSubmit}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  )
}