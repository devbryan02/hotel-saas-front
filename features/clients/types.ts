import type { Tenant } from '@/types'

export type ClientStatus = 'ACTIVE' | 'INACTIVE'

export interface ClientListItemResponse {
  id: string
  fullName: string
  document: string
  phone: string
  email: string
  status: ClientStatus
}

export interface ClientDetailResponse {
  id: string
  fullName: string
  document: string
  email: string
  phone: string
  status: ClientStatus
  createdAt: string  
}

export interface ClientListItemResponse {
  id: string
  fullName: string
  document: string
  phone: string
  email: string
  status: ClientStatus
}

export interface CreateClientRequest {
  fullName: string
  document: string
  email?: string
  phone: string
}

export interface UpdateClientRequest {
  fullName: string
  email?: string
  phone?: string
}