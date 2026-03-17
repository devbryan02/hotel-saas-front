import { HelpCircle, MessageCircle, Mail, Clock, CheckCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'

// ── Cambia estos datos por los tuyos ──
const CONTACT = {
    whatsapp: {
        number: '+51 992450988',
        link: 'https://wa.me/51992450988',
    },
    email: 'brayan7br7@gmail.com',
}

const FAQS = [
    {
        q: '¿Cómo registro una nueva ocupación?',
        a: 'Ve a Habitaciones, selecciona una habitación disponible y pulsa "Nueva ocupación".',
    },
    {
        q: '¿Puedo tener el mismo huésped en varias habitaciones?',
        a: 'Sí, un mismo cliente puede tener ocupaciones activas en distintas habitaciones al mismo tiempo.',
    },
    {
        q: '¿Qué pasa si marco una habitación en mantenimiento?',
        a: 'La habitación queda bloqueada y no aparece disponible para nuevas ocupaciones hasta que cambies su estado.',
    },
    {
        q: '¿Cómo hago el checkout de un huésped?',
        a: 'En la lista de ocupaciones activas, entra al detalle y pulsa el botón "Check-out".',
    },
]

export default function SupportPage() {
    return (
        <div className="flex flex-col gap-8">

            {/* ── Header ── */}
            <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <HelpCircle className="size-5 text-primary" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold tracking-tight">Soporte</h2>
                    <p className="text-xs text-muted-foreground">Estamos aquí para ayudarte</p>
                </div>
            </div>

            {/* ── Canales de contacto ── */}
            <div className="flex flex-col gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                    Contáctanos directamente
                </p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                    {/* WhatsApp */}
                    <a
                        href={CONTACT.whatsapp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:bg-primary/5"
                    >
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#25D36611] group-hover:bg-[#25D36622] transition-colors">
                            <MessageCircle className="size-5 text-[#25D366]" />
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <p className="text-sm font-semibold">WhatsApp</p>
                            <p className="text-[12px] text-muted-foreground">{CONTACT.whatsapp.number}</p>
                            <div className="flex items-center gap-1 mt-1">
                                <Clock className="size-3 text-muted-foreground/50" />
                                <span className="text-[11px] text-muted-foreground/60">Respuesta en menos de 24h</span>
                            </div>
                        </div>
                    </a>

                    {/* Correo */}
                    <a
                        href={`mailto:${CONTACT.email}`}
                        className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:bg-primary/5"
                    >
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <Mail className="size-5 text-primary" />
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <p className="text-sm font-semibold">Correo electrónico</p>
                            <p className="text-[12px] text-muted-foreground truncate">{CONTACT.email}</p>
                            <div className="flex items-center gap-1 mt-1">
                                <Clock className="size-3 text-muted-foreground/50" />
                                <span className="text-[11px] text-muted-foreground/60">Respuesta en menos de 48h</span>
                            </div>
                        </div>
                    </a>

                </div>
            </div>

            {/* ── Preguntas frecuentes ── */}
            <div className="flex flex-col gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                    Preguntas frecuentes
                </p>

                <div className="flex flex-col gap-2">
                    {FAQS.map(({ q, a }) => (
                        <Card key={q} className="flex items-start gap-3 border border-border bg-card p-4 shadow-none">
                            <CheckCircle className="size-4 shrink-0 text-primary mt-0.5" />
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium">{q}</p>
                                <p className="text-[12px] text-muted-foreground leading-relaxed">{a}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

        </div>
    )
}