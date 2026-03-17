'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, Loader2, MessageCircle, ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useLogin } from '@/features/auth/hooks/use-auth'

// ─── SCHEMA ───────────────────────────────────────────────────
const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(1, 'La contraseña es requerida'),
})

export type LoginFormValues = z.infer<typeof loginSchema>

// ─── WHATSAPP SUPPORT LINK ────────────────────────────────────
const WHATSAPP_NUMBER = '+51992450988' // ← cambia por tu número real
const WHATSAPP_MESSAGE = encodeURIComponent(
    'Hola, no puedo iniciar sesión en zowy.app. ¿Me pueden ayudar?'
)
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

// ─── COMPONENT ────────────────────────────────────────────────
export function LoginForm() {
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
        <div className="flex flex-col gap-6">

            {/* ── Form card ── */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex flex-col gap-4">

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="email" className="text-sm font-medium">
                            Correo electrónico
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="recepcion@mihotel.com"
                                autoComplete="email"
                                className={cn('pl-9', errors.email && 'border-destructive focus-visible:ring-destructive')}
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
                                className={cn('pl-9', errors.password && 'border-destructive focus-visible:ring-destructive')}
                                {...register('password')}
                            />
                        </div>
                        {errors.password && (
                            <p className="text-xs text-destructive">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <Button
                        className="mt-1 h-11 w-full rounded-xl gap-2"
                        disabled={isPending}
                        onClick={handleSubmit(onSubmit)}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="size-4 animate-spin" />
                                Ingresando...
                            </>
                        ) : (
                            <>
                                Ingresar
                                <ArrowRight className="size-4" />
                            </>
                        )}
                    </Button>

                </div>
            </div>

            {/* ── Soporte ── */}
            <div className="rounded-2xl border border-dashed border-muted-foreground/20 bg-muted/30 p-4">
                <div className="flex items-start gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-green-100">
                        <MessageCircle className="size-4 text-green-600" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                            ¿No puedes ingresar?
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Escríbenos por WhatsApp y te ayudamos a recuperar el acceso en minutos.
                        </p>
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-green-600 hover:text-green-700 transition-colors"
                        >
                            <MessageCircle className="size-3.5" />
                            Contactar soporte
                        </a>
                    </div>
                </div>
            </div>

        </div>
    )
}