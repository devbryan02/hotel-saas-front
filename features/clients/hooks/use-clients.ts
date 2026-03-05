import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { clientService } from '../services/client.service'
import type { CreateClientRequest, UpdateClientRequest } from '../types'

export const clientKeys = {
  all: (tenantId: string) => ['clients', tenantId] as const,
  byId: (tenantId: string, clientId: string) =>
    [...clientKeys.all(tenantId), clientId] as const,
  search: (tenantId: string, query: string, status?: string) =>
    [...clientKeys.all(tenantId), 'search', query, ...(status ? [status] : [])] as const,
}

export function useClients(tenantId: string) {
  return useQuery({
    queryKey: clientKeys.all(tenantId),
    queryFn: () => clientService.getAll(tenantId),
    enabled: !!tenantId,
  })
}

export function useClientById(tenantId: string, clientId: string) {
  return useQuery({
    queryKey: clientKeys.byId(tenantId, clientId),
    queryFn: () => clientService.getById(tenantId, clientId),
    enabled: !!tenantId && !!clientId,
  })
}

export function useCreateClient(tenantId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateClientRequest) =>
      clientService.create(tenantId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.all(tenantId) })
    },
  })
}

export function useUpdateClient(tenantId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ clientId, data }: { clientId: string; data: UpdateClientRequest }) =>
      clientService.update(tenantId, clientId, data),
    onSuccess: (_, { clientId }) => {
      queryClient.invalidateQueries({ queryKey: clientKeys.all(tenantId) })
      queryClient.invalidateQueries({ queryKey: clientKeys.byId(tenantId, clientId) })
    },
  })
}

export function useSearchClients(tenantId: string, query: string) {
  return useQuery({
    queryKey: clientKeys.search(tenantId, query),
    queryFn: () => clientService.searchByQuery(tenantId, query),
    enabled: !!tenantId && !!query,
  })
}

export function useSearchClientsByStatus(
  tenantId: string,
  query: string,
  status: string
) {
  return useQuery({
    queryKey: clientKeys.search(tenantId, query, status),
    queryFn: () => clientService.searchByQueryAndStatus(tenantId, query, status),
    enabled: !!tenantId && !!query && !!status,
  })
}