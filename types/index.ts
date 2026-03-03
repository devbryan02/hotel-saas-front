
export interface ApiErrorResponse {
  message: string
  status: number
  error: string
  timestamp: string
  path: string
  fieldErrors?: FieldError[]
}

export interface FieldError {
  field: string
  message: string
  rejectedValue: unknown
}

export interface Tenant {
  id: string
  name: string
  businessName: string
  plan: TenantPlan
  status: TenantStatus
}

export type TenantPlan = 'FREE' | 'PREMIUM' | 'PROFESIONAL'
export type TenantStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'