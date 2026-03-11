"use client";

import { ClientTable } from '@/features/clients/components/client-table'
import { useAuth } from '@/features/auth/hooks/use-auth'

export default function ClientsClient() {

  const { user } = useAuth()
  const TENANT_ID = user?.tenantId || ''

  return (
    <div className="p-6">
      <ClientTable tenantId={TENANT_ID} />
    </div>
  )
}