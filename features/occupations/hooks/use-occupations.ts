import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { occupationService } from "../services/occupation.service";
import type { CreateOccupationRequest } from "../types";

export const occupationKeys = {
  all: (tenantId: string) => ["occupations", tenantId] as const,
  paginated: (tenantId: string, page: number, size: number) => ["occupations", tenantId, page, size] as const,
  byId: (tenantId: string, occupationId: string) => ["occupations", tenantId, occupationId] as const,
};

export function useOccupations(tenantId: string, page: number = 0, size: number = 20) {
  return useQuery({
    queryKey: occupationKeys.paginated(tenantId, page, size), 
    queryFn: () => occupationService.getAll(tenantId, page, size),
    enabled: !!tenantId,
  });
}

export function useOccupationById(tenantId: string, occupationId: string) {
  return useQuery({
    queryKey: occupationKeys.byId(tenantId, occupationId),
    queryFn: () => occupationService.getById(tenantId, occupationId),
    enabled: !!tenantId && !!occupationId,
  });
}

export function useCreateOccupation(tenantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      roomId,
      clientId,
      data,
    }: {
      roomId: string;
      clientId: string;
      data: CreateOccupationRequest;
    }) => occupationService.create(tenantId, roomId, clientId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: occupationKeys.all(tenantId) });
    },
  });
}

export function useCheckOut(tenantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (occupationId: string) =>
      occupationService.checkOut(tenantId, occupationId),
    onSuccess: (_, occupationId) => {
      queryClient.invalidateQueries({ queryKey: occupationKeys.all(tenantId) });
      queryClient.invalidateQueries({
        queryKey: occupationKeys.byId(tenantId, occupationId),
      });
    },
  });
}