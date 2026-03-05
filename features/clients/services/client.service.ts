import apiClient from "@/lib/api-client";
import type { 
    ClientDetailResponse, 
    CreateClientRequest,
    ClientListItemResponse,
    UpdateClientRequest
} from "../types";

export const clientService = {

    getAll: (tenantId: string): Promise<ClientListItemResponse[]> => 
        apiClient.get(`/tenants/${tenantId}/clients`),

    create: (tenantId: string, data: CreateClientRequest): Promise<ClientDetailResponse> => 
        apiClient.post(`/tenants/${tenantId}/clients`, data),

    update: (tenantId: string, clientId: string, data: UpdateClientRequest): Promise<ClientDetailResponse> => 
        apiClient.put(`/tenants/${tenantId}/clients/${clientId}`, data),

    getById: (tenantId: string, clientId: string): Promise<ClientDetailResponse> => 
        apiClient.get(`/tenants/${tenantId}/clients/${clientId}`),

    searchByQuery: (tenantId: string, query: string): Promise<ClientListItemResponse[]> => 
        apiClient.get(`/tenants/${tenantId}/clients/search`, { params: { query: query } }),

    searchByQueryAndStatus: (tenantId: string, query: string, status: string): Promise<ClientListItemResponse[]> => 
        apiClient.get(`/tenants/${tenantId}/clients/search/status`, { params: { query: query, status: status } }),

}