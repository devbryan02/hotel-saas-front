import { StatsClient } from '@/features/stats/components/stats-client'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <StatsClient />
    </div>
  )
}
