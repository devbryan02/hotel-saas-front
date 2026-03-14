import { StatsClient } from '@/features/stats/components/stats-client'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Resumen en tiempo real de tu hotel
        </p>
      </div>
      <StatsClient />
    </div>
  )
}
