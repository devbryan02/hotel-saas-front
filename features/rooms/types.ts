import type { Tenant } from '@/types'

export type RoomStatus = 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'CLEANING'
export type RoomType = 'SIMPLE' | 'DOBLE' | 'SUITE' | 'MATRIMONIAL'

export interface RoomListItemResponse {
  id: string
  roomNumber: string
  roomType: string
  pricePerNight: number
  status: RoomStatus
  activeClient: ActiveClientResponse | null
}

export interface RoomDetailResponse {
  id: string
  roomNumber: string
  roomType: string
  pricePerNight: number
  status: RoomStatus
}

export interface CreateRoomRequest {
  roomNumber: string
  roomType: string
  pricePerNight: number
}

export interface UpdateRoomRequest {
  roomNumber: string
  roomType: string
  pricePerNight: number
  status: RoomStatus
}

export interface ActiveClientResponse {
  clientId: string
  fullName: string
  document: string
  checkInDate: string
  checkOutDate: string
}