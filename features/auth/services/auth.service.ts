import apiClient from '@/lib/api-client'
import type { AuthResponse, LoginRequest } from '../types'

export const authService = {
  login: (data: LoginRequest): Promise<AuthResponse> =>
    apiClient.post('/auth/login', data),
}