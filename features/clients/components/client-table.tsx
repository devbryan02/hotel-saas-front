'use client'

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
import { CreateClientDialog } from './create-client-dialog'
import { useClients } from '../hooks/use-clients'
import { Users, AlertCircle, Loader2 } from 'lucide-react'

interface ClientTableProps {
  tenantId: string
}

export function ClientTable({ tenantId }: ClientTableProps) {
  const { data: clients = [], isLoading, isError } = useClients(tenantId)
  const columns = getClientColumns(tenantId)

  const table = useReactTable({
    data: clients,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="flex flex-col gap-5">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-xl font-semibold tracking-tight">Clientes</h2>
          <p className="text-xs text-muted-foreground">
            {isLoading ? '...' : `${clients.length} registrado${clients.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <CreateClientDialog tenantId={tenantId} />
      </div>

      {/* ── Loading ── */}
      {isLoading && (
        <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed py-16 text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          <span className="text-sm">Cargando clientes...</span>
        </div>
      )}

      {/* ── Error ── */}
      {isError && (
        <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-destructive/40 py-16 text-destructive">
          <AlertCircle className="size-4" />
          <span className="text-sm">Error al cargar clientes</span>
        </div>
      )}

      {/* ── Tabla ── */}
      {!isLoading && !isError && (
        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow
                  key={headerGroup.id}
                  className="bg-muted/40 hover:bg-muted/40"
                >
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
              {/* Empty state */}
              {table.getRowModel().rows.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={columns.length}>
                    <div className="flex flex-col items-center justify-center gap-2 py-16 text-muted-foreground">
                      <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                        <Users className="size-5" />
                      </div>
                      <p className="text-sm font-medium">No hay clientes registrados</p>
                      <p className="text-xs">Crea el primer cliente con el botón de arriba</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    className="group border-b border-border/60 transition-colors last:border-0"
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell
                        key={cell.id}
                        className="px-4 py-3 text-sm"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

    </div>
  )
}