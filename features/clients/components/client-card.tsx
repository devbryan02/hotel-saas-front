'use client'

import { Badge } from '@/components/ui/badge'
import { UpdateClientDialog } from './update-client-dialog'
import type { ClientListItemResponse } from '../types'
import { CreditCard, Mail, Phone, Clock } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'

interface ClientCardProps {
  client: ClientListItemResponse
  tenantId: string
}

export function ClientCard({ client, tenantId }: ClientCardProps) {
  const initials = client.fullName
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3.5 transition-colors active:bg-muted/50">

      {/* Avatar */}
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
        {initials}
      </div>

      {/* Info */}
      <div className="flex flex-1 min-w-0 flex-col gap-1">

        <div className="flex items-center justify-between gap-2">
          <p className="truncate font-semibold text-sm">{client.fullName}</p>
          <Badge
            variant={client.status === 'ACTIVE' ? 'default' : 'secondary'}
            className="shrink-0 rounded-full px-2 py-0.5 text-[10px]"
          >
            <span className={cn(
              'mr-1 inline-block size-1.5 rounded-full',
              client.status === 'ACTIVE' ? 'bg-primary-foreground' : 'bg-muted-foreground'
            )} />
            {client.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <CreditCard className="size-3 shrink-0" />
            {client.document}
          </span>
          {client.phone && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Phone className="size-3 shrink-0" />
              {client.phone}
            </span>
          )}
          {client.email && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground truncate">
              <Mail className="size-3 shrink-0" />
              <span className="truncate">{client.email}</span>
            </span>
          )}
        </div>

        {client.lastStayAt && (
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground/70">
            <Clock className="size-3 shrink-0" />
            Última estadía: {formatDate(client.lastStayAt)}
          </span>
        )}

      </div>

      {/* Acción */}
      <div className="shrink-0">
        <UpdateClientDialog tenantId={tenantId} client={client} />
      </div>

    </div>
  )
}