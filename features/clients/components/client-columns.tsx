'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { UpdateClientDialog } from './update-client-dialog'
import type { ClientListItemResponse } from '../types'
import { CreditCard, Mail, Phone } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'

export function getClientColumns(tenantId: string): ColumnDef<ClientListItemResponse>[] {
  return [
    {
      accessorKey: 'fullName',
      header: 'Cliente',
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          {/* Avatar con iniciales */}
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
            {row.original.fullName.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>
          <span className="font-medium">{row.original.fullName}</span>
        </div>
      ),
    },
    {
      accessorKey: 'document',
      header: 'Documento',
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <CreditCard className="size-3.5 shrink-0" />
          <span>{row.original.document}</span>
        </div>
      ),
    },
    {
      accessorKey: 'phone',
      header: 'Teléfono',
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Phone className="size-3.5 shrink-0" />
          <span>{row.original.phone}</span>
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Mail className="size-3.5 shrink-0" />
          <span>{row.original.email ?? '—'}</span>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: ({ row }) => (
        <Badge
          variant={row.original.status === 'ACTIVE' ? 'default' : 'secondary'}
          className="rounded-full px-2 py-0.5 text-[11px]"
        >
          <span className={cn(
            'mr-1.5 inline-block size-1.5 rounded-full',
            row.original.status === 'ACTIVE' ? 'bg-primary-foreground' : 'bg-muted-foreground'
          )} />
          {row.original.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
        </Badge>
      ),
    },
    {
      accessorKey: 'lastStayAt',
      header: 'Última estadía',
      cell: ({ row }) => {
        return (
          <span className="text-sm text-muted-foreground">
            {row.original.lastStayAt ? formatDate(row.original.lastStayAt) : '—'}
          </span>
        )
      }
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <UpdateClientDialog tenantId={tenantId} client={row.original} />
      ),
    },
  ]
}