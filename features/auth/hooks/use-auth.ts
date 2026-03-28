"use client";

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { authService } from '../services/auth.service'
import { useAuthContext } from '../context/auth-context'
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
      router.push("/dashboard")
      router.refresh()
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : (error as { message?: string })?.message ?? 'Email o contraseña incorrectos'
      toast.error('Error al iniciar sesión', { description: message })
    },
  })
}

export function useLogout() {
  const { logout } = useAuthContext()
  const router = useRouter()

  return useCallback(() => {
    logout()
    router.push('/login')
  }, [logout, router])
}

export { useAuthContext as useAuth }
