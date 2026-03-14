import apiClient from "@/lib/api-client";
import type {
  RoomDetailResponse,
  CreateRoomRequest,
  UpdateRoomRequest,
  RoomListItemResponse,
} from "../types";

export const roomService = {
  getAll: (tenantId: string): Promise<RoomListItemResponse[]> =>
    apiClient.get(`/tenants/${tenantId}/rooms`),

  create: (tenantId: string, data: CreateRoomRequest): Promise<RoomDetailResponse> =>
    apiClient.post(`/tenants/${tenantId}/rooms`, data),

  update: (tenantId: string, roomId: string, data: UpdateRoomRequest): Promise<RoomDetailResponse> =>
    apiClient.put(`/tenants/${tenantId}/rooms/${roomId}`, data),
};
