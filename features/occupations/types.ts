export type OccupationStatus = 'ACTIVE' | 'FINISHED'

export interface PageResponse<T> {
  content: T[]
  currentPage: number
  totalPages: number
  totalElements: number
  first: boolean
  last: boolean
}

export interface OccupationListItemResponse {
  id: string
  roomNumber: string
  roomType: string
  clientFullName: string
  clientDocument: string
  checkInDate: string   // yyyy-MM-dd
  checkOutDate: string  // yyyy-MM-dd
  nights: number
  pricePerNight: number
  totalPrice: number
  status: OccupationStatus
}

export interface OccupationDetailResponse {
  id: string
  roomNumber: string
  roomType: string
  clientFullName: string
  clientDocument: string
  checkInDate: string   // yyyy-MM-dd
  checkOutDate: string  // yyyy-MM-dd
  pricePerNight: number
  nights: number
  totalPrice: number
  status: OccupationStatus
  createdAt: string
}

export interface CreateOccupationRequest {
  checkInDate: string   // yyyy-MM-dd
  checkOutDate: string  // yyyy-MM-dd
  totalPrice?: number
}