"use client";

import { ClientTable } from '@/features/clients/components/client-table'
import { useAuth } from '@/features/auth/hooks/use-auth'

export default function ClientsClient() {

  const { user } = useAuth()
  const TENANT_ID = user?.tenantId || ''

  return <ClientTable tenantId={TENANT_ID} />

}