'use client'

import { useState, useEffect } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getClientColumns } from './client-columns'
import { ClientCard } from './client-card'
import { CreateClientDialog } from './create-client-dialog'
import { ClientSearch } from './client-search'
import { useClients, useSearchClients, useSearchClientsByStatus } from '../hooks/use-clients'
import { useIsMobile } from '@/hooks/use-mobile'
import { Users, AlertCircle, Loader2 } from 'lucide-react'

type StatusFilter = 'ALL' | 'ACTIVE' | 'INACTIVE'

interface ClientTableProps {
  tenantId: string
}

export function ClientTable({ tenantId }: ClientTableProps) {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [status, setStatus] = useState<StatusFilter>('ALL')
  const isMobile = useIsMobile()

  useEffect(() => {
    if (query.trim().length === 0) { setDebouncedQuery(''); return }
    if (query.trim().length < 3) return
    const timer = setTimeout(() => setDebouncedQuery(query.trim()), 400)
    return () => clearTimeout(timer)
  }, [query])

  const hasQuery = debouncedQuery.length > 0
  const hasStatus = status !== 'ALL'

  const allClients        = useClients(tenantId)
  const byQuery           = useSearchClients(tenantId, debouncedQuery)
  const byQueryAndStatus  = useSearchClientsByStatus(tenantId, debouncedQuery, status)

  const active = hasQuery && hasStatus
    ? byQueryAndStatus
    : hasQuery
    ? byQuery
    : allClients

  const { data: clients = [], isLoading, isError } = active

  const columns = getClientColumns(tenantId)
  const table = useReactTable({
    data: clients,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  // ── Estados compartidos ──
  const isEmpty = !isLoading && !isError && clients.length === 0

  return (
    <div className="flex flex-col gap-5">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
            <Users className="size-5 text-primary" />
          </div>
          <div className="flex flex-col gap-0.5">
            <h2 className="text-xl font-semibold tracking-tight">Huéspedes</h2>
            <p className="text-xs text-muted-foreground">
              {isLoading
                ? 'Cargando...'
                : `${clients.length} ${clients.length === 1 ? 'huésped registrado' : 'huéspedes registrados'}`
              }
            </p>
          </div>
        </div>
        <CreateClientDialog tenantId={tenantId} />
      </div>

      {/* ── Search ── */}
      <ClientSearch
        query={query}
        status={status}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
      />

      {/* ── Loading ── */}
      {isLoading && (
        <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed py-16 text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          <span className="text-sm">Cargando huéspedes...</span>
        </div>
      )}

      {/* ── Error ── */}
      {isError && (
        <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-destructive/40 py-16 text-destructive">
          <AlertCircle className="size-4" />
          <span className="text-sm">Error al cargar huéspedes</span>
        </div>
      )}

      {/* ── Empty ── */}
      {isEmpty && (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-16 text-muted-foreground">
          <div className="flex size-10 items-center justify-center rounded-full bg-muted">
            <Users className="size-5" />
          </div>
          <p className="text-sm font-medium">
            {hasQuery ? 'Sin resultados para tu búsqueda' : 'No hay huéspedes registrados'}
          </p>
          <p className="text-xs">
            {hasQuery ? 'Intenta con otro término o filtro' : 'Crea el primer huésped con el botón de arriba'}
          </p>
        </div>
      )}

      {/* ── MOBILE: Cards ── */}
      {!isLoading && !isError && !isEmpty && isMobile && (
        <div className="flex flex-col gap-2">
          {clients.map(client => (
            <ClientCard key={client.id} client={client} tenantId={tenantId} />
          ))}
        </div>
      )}

      {/* ── DESKTOP: Tabla ── */}
      {!isLoading && !isError && !isEmpty && !isMobile && (
        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} className="bg-muted/40 hover:bg-muted/40">
                  {headerGroup.headers.map(header => (
                    <TableHead
                      key={header.id}
                      className="h-10 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  className="group border-b border-border/60 transition-colors last:border-0"
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="px-4 py-3 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

    </div>
  )
}