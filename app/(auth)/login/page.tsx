import { BedDouble, BedSingle, CalendarCheck, Users, Shield } from 'lucide-react'
import { LoginForm } from '@/features/auth/components/login-form'

// ─── INFO BULLETS ─────────────────────────────────────────────
const highlights = [
  {
    icon: BedSingle,
    text: 'Gestión de habitaciones en tiempo real',
  },
  {
    icon: CalendarCheck,
    text: 'Check-in y check-out desde el celular',
  },
  {
    icon: Users,
    text: 'Historial completo de huéspedes',
  },
  {
    icon: Shield,
    text: 'Tus datos seguros y privados',
  },
]

// ─── PAGE ─────────────────────────────────────────────────────
export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-background">

      {/* ── Panel izquierdo (solo desktop) ── */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-primary p-12 text-primary-foreground relative overflow-hidden">

        {/* Fondo decorativo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 size-72 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-96 rounded-full bg-white/5 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
            <BedDouble className="size-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight">
            <a href="/">
              zowy<span className="opacity-70">.app</span>
            </a>
          </span>
        </div>

        {/* Copy central */}
        <div className="relative space-y-8">
          <div>
            <h2 className="text-3xl font-black leading-tight mb-3">
              Tu hotel, siempre bajo control
            </h2>
            <p className="text-base text-primary-foreground/70 leading-relaxed max-w-sm">
              Diseñado para hoteles y hostales del Perú. Simple, rápido y desde cualquier celular.
            </p>
          </div>

          {/* Feature bullets */}
          <ul className="flex flex-col gap-3">
            {highlights.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/15">
                  <Icon className="size-3.5 text-white" />
                </div>
                <span className="text-sm text-primary-foreground/80 font-medium">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer del panel */}
        <p className="relative text-xs text-primary-foreground/40 font-medium">
          © {new Date().getFullYear()} zowy.app · Hecho para hoteleros peruanos 🇵🇪
        </p>
      </div>

      {/* ── Panel derecho — Login ── */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-sm">

          {/* Logo mobile (solo se ve en móvil) */}
          <div className="lg:hidden mb-8 flex flex-col items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary">
              <BedDouble className="size-6 text-primary-foreground" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-black tracking-tight">
                zowy<span className="text-primary">.app</span>
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Sistema de gestión hotelera
              </p>
            </div>
          </div>

          {/* Headline desktop */}
          <div className="hidden lg:block mb-8">
            <h1 className="text-2xl font-black text-foreground tracking-tight">
              Bienvenido de vuelta 👋
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Ingresa con tu cuenta para continuar
            </p>
          </div>

          {/* Form + soporte */}
          <LoginForm />

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-muted-foreground">
            zowy.app · Sistema de gestión hotelera
          </p>

        </div>
      </div>

    </div>
  )
}