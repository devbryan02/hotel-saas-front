import { StatsClient } from '@/features/stats/components/stats-client'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function DashboardPage() {

  const hasAuthCookie = (await cookies()).get("catin_auth")
  if (!hasAuthCookie) redirect('/login')

  return (
    <div className="flex flex-col gap-6">
      <StatsClient />
    </div>
  )
}
