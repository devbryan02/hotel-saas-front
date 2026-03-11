'use client'

import { useAuth } from '@/features/auth/hooks/use-auth'
import { OccupationsList } from './occupations-list'

export function OccupationsClient() {
  const { user } = useAuth()
  const tenantId = user?.tenantId ?? ''

  return <OccupationsList tenantId={tenantId} />
}