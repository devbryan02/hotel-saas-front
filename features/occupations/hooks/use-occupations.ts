import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { occupationService } from "../services/occupation.service";
import type { CreateOccupationRequest } from "../types";

export const occupationKeys = {
  all: (tenantId: string) => ["occupations", tenantId] as const,
  byId: (tenantId: string, occupationId: string) =>
    [...occupationKeys.all(tenantId), occupationId] as const,
};

export function useOccupations(tenantId: string) {
  return useQuery({
    queryKey: occupationKeys.all(tenantId),
    queryFn: () => occupationService.getAll(tenantId),
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
    // roomId y clientId van en el mutationFn porque cambian por llamada 
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
    // occupationId va en el mutationFn porque cambia por llamada 
    mutationFn: (occupationId: string) =>
      occupationService.checkOut(tenantId, occupationId),
    onSuccess: (_, occupationId) => {
      // invalida lista Y el detalle específico
      queryClient.invalidateQueries({ queryKey: occupationKeys.all(tenantId) });
      queryClient.invalidateQueries({
        queryKey: occupationKeys.byId(tenantId, occupationId),
      });
    },
  });
}