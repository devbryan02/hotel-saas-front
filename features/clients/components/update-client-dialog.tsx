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
import { UpdateClientForm } from './client-form'
import { useUpdateClient } from '../hooks/use-clients'
import type { UpdateClientFormValues } from '../schemas'
import type { ClientListItemResponse } from '../types'
import { Edit } from 'lucide-react'

interface UpdateClientDialogProps {
  tenantId: string
  client: ClientListItemResponse
}

export function UpdateClientDialog({ tenantId, client }: UpdateClientDialogProps) {
  const [open, setOpen] = useState(false)
  const { mutate: updateClient, isPending } = useUpdateClient(tenantId)

  function handleSubmit(data: UpdateClientFormValues) {
    updateClient(
      { clientId: client.id, data },
      { onSuccess: () => setOpen(false) }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size="sm" title='Editar cliente'>
          <Edit /> 
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar cliente</DialogTitle>
        </DialogHeader>
        <UpdateClientForm
          defaultValues={client}
          onSubmit={handleSubmit}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  )
}