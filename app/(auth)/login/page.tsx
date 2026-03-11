'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BedDouble, Mail, Lock, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useLogin } from '@/features/auth/hooks/use-auth'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Requerido'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const { mutate: login, isPending } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormValues) => login(data)

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary">
            <BedDouble className="size-6 text-primary-foreground" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              cat<span className="text-primary">.IN</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Inicia sesión en tu hotel
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50" />
                <Input
                  id="email"
                  type="email"
                  placeholder="recepcion@hotel.com"
                  autoComplete="email"
                  className={cn('pl-9', errors.email && 'border-destructive')}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={cn('pl-9', errors.password && 'border-destructive')}
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button
              className="mt-2 h-11 w-full rounded-xl"
              disabled={isPending}
              onClick={handleSubmit(onSubmit)}
            >
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                'Ingresar'
              )}
            </Button>

          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          cat.IN · Sistema de gestión hotelera
        </p>

      </div>
    </div>
  )
}