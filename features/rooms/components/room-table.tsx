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
import { getRoomColumns } from './room-columns'
import { CreateRoomDialog } from './create-room-dialog'
import { useRooms } from '../hooks/use-rooms'
import { BedDouble, AlertCircle, Loader2 } from 'lucide-react'

interface RoomTableProps {
  tenantId: string
}

export function RoomTable({ tenantId }: RoomTableProps) {
  const { data: rooms = [], isLoading, isError } = useRooms(tenantId)
  const columns = getRoomColumns(tenantId)

  const table = useReactTable({
    data: rooms,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="flex flex-col gap-5">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
            <BedDouble className="size-5 text-primary" />
          </div>
          <div className="flex flex-col gap-0.5">
            <h2 className="text-xl font-semibold tracking-tight">Habitaciones</h2>
            <p className="text-xs text-muted-foreground">
              {isLoading
                ? 'Cargando...'
                : `${rooms.length} ${rooms.length === 1 ? 'habitación registrada' : 'habitaciones registradas'}`
              }
            </p>
          </div>
        </div>
        <CreateRoomDialog tenantId={tenantId} />
      </div>

      {/* ── Loading ── */}
      {isLoading && (
        <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed py-16 text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          <span className="text-sm">Cargando habitaciones...</span>
        </div>
      )}

      {/* ── Error ── */}
      {isError && (
        <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-destructive/40 py-16 text-destructive">
          <AlertCircle className="size-4" />
          <span className="text-sm">Error al cargar habitaciones</span>
        </div>
      )}

      {/* ── Tabla ── */}
      {!isLoading && !isError && (
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
              {table.getRowModel().rows.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={columns.length}>
                    <div className="flex flex-col items-center justify-center gap-2 py-16 text-muted-foreground">
                      <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                        <BedDouble className="size-5" />
                      </div>
                      <p className="text-sm font-medium">No hay habitaciones registradas</p>
                      <p className="text-xs">Crea la primera habitación con el botón de arriba</p>
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
                      <TableCell key={cell.id} className="px-4 py-3 text-sm">
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