'use client'

import { useAuth } from '@/features/auth/hooks/use-auth'
import { RoomGrid } from './room-grid'

export function RoomsClient() {
  const { user } = useAuth()
  const tenantId = user?.tenantId ?? ''

  return <RoomGrid tenantId={tenantId} />
}