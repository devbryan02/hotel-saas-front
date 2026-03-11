export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  email: string
  role: string
  tenantId: string
}

export interface AuthUser {
  token: string
  email: string
  role: string
  tenantId: string
}