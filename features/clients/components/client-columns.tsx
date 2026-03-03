'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { UpdateClientDialog } from './update-client-dialog'
import type { ClientListItemResponse } from '../types'

export function getClientColumns(tenantId: string): ColumnDef<ClientListItemResponse>[] {
  return [
    {
      accessorKey: 'fullName',
      header: 'Nombre',
    },
    {
      accessorKey: 'document',
      header: 'Documento',
    },
    {
      accessorKey: 'phone',
      header: 'Teléfono',
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => row.original.email ?? '—',
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: ({ row }) => (
        <Badge variant={row.original.status === 'ACTIVE' ? 'default' : 'secondary'}>
          {row.original.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => (
        <UpdateClientDialog tenantId={tenantId} client={row.original} />
      ),
    },
  ]
}