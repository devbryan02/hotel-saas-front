'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

type StatusFilter = 'ALL' | 'ACTIVE' | 'INACTIVE'

const STATUS_PILLS: { label: string; value: StatusFilter }[] = [
  { label: 'Todos', value: 'ALL' },
  { label: 'Activo', value: 'ACTIVE' },
  { label: 'Inactivo', value: 'INACTIVE' },
]

interface ClientSearchProps {
  query: string
  status: StatusFilter
  onQueryChange: (value: string) => void
  onStatusChange: (value: StatusFilter) => void
}

export function ClientSearch({ query, status, onQueryChange, onStatusChange }: ClientSearchProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

      {/* Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/50" />
        <Input
          placeholder="Buscar por nombre, documento..."
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          className="pl-8"
        />
      </div>

      {/* Status pills */}
      <div className="flex items-center gap-1.5">
        {STATUS_PILLS.map(pill => (
          <button
            key={pill.value}
            onClick={() => onStatusChange(pill.value)}
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors',
              status === pill.value
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-transparent text-muted-foreground hover:bg-muted'
            )}
          >
            {pill.value !== 'ALL' && (
              <span className={cn(
                'inline-block size-1.5 rounded-full',
                pill.value === 'ACTIVE' ? 'bg-emerald-400' : 'bg-muted-foreground/60',
                status === pill.value && 'bg-primary-foreground'
              )} />
            )}
            {pill.label}
          </button>
        ))}
      </div>

    </div>
  )
}