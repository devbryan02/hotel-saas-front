import apiClient from "@/lib/api-client";
import type {
    CreateOccupationRequest,
    OccupationDetailResponse,
    OccupationListItemResponse,
    PageResponse
} from "../types";

export const occupationService = {

    getAll: (tenantId: string, page: number, size: number, status?: string ): Promise<PageResponse<OccupationListItemResponse>> =>
        apiClient.get(`/tenants/${tenantId}/occupations`, { params: { page, size, ...(status && { status }) } }),

    create: (tenantId: string, roomId: string, clientId: string, data: CreateOccupationRequest): Promise<OccupationDetailResponse> =>
        apiClient.post(`/tenants/${tenantId}/occupations/rooms/${roomId}/clients/${clientId}`, data),
    
    getById: (tenantId: string, occupationId: string): Promise<OccupationDetailResponse> =>
        apiClient.get(`/tenants/${tenantId}/occupations/${occupationId}`),

    checkOut: (tenantId: string, occupationId: string): Promise<OccupationDetailResponse> =>
        apiClient.post(`/tenants/${tenantId}/occupations/${occupationId}/check-out`),

}