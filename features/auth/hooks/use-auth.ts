"use client";

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { authService } from '../services/auth.service'
import { useAuthContext } from '../context/auth-contex'
import type { LoginRequest } from '../types'
import { useCallback } from 'react'

export function useLogin() {
  const { login } = useAuthContext()
  const router = useRouter()

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (data) => {
      login(data)
      toast.success('Bienvenido 👋', { description: data.email })
      router.replace('/dashboard')
    },
  })
}

export function useLogout() {
  const { logout } = useAuthContext()
  const router = useRouter()

  return useCallback(() => {
    logout()
    router.replace('/login')
  }, [logout, router])
}

// Re-exporta useAuthContext como useAuth para uso cotidiano en componentes
export { useAuthContext as useAuth }