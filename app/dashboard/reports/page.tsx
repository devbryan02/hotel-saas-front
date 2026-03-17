import { FileText, Clock, BarChart3, TrendingUp, CalendarRange, Download } from 'lucide-react'
import { Card } from '@/components/ui/card'

const UPCOMING_FEATURES = [
    {
        icon: BarChart3,
        title: 'Ocupación por período',
        description: 'Porcentaje de ocupación diario, semanal y mensual por habitación o tipo.',
    },
    {
        icon: TrendingUp,
        title: 'Ingresos y facturación',
        description: 'Resumen de ingresos totales, por huésped y por habitación en cualquier rango de fechas.',
    },
    {
        icon: CalendarRange,
        title: 'Historial de estancias',
        description: 'Listado completo de ocupaciones pasadas con filtros avanzados por fecha, estado y huésped.',
    },
    {
        icon: Download,
        title: 'Exportación a Excel / PDF',
        description: 'Descarga tus reportes listos para presentar o archivar con un solo clic.',
    },
]

export default function ReportsPage() {
    return (
        <div className="flex flex-col gap-8">

            {/* ── Header ── */}
            <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="size-5 text-primary" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold tracking-tight">Reportes</h2>
                    <p className="text-xs text-muted-foreground">Análisis y estadísticas de tu hotel</p>
                </div>
            </div>

            {/* ── Banner próximamente ── */}
            <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-card px-6 py-12 text-center">
                <div className="flex size-14 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="size-7 text-primary" />
                </div>
                <div className="flex flex-col gap-1.5">
                    <h3 className="text-lg font-semibold tracking-tight">Próximamente disponible</h3>
                    <p className="max-w-sm text-sm text-muted-foreground">
                        Estamos trabajando en los reportes para que puedas tomar mejores decisiones sobre tu hotel.
                        Pronto estará listo.
                    </p>
                </div>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
                    En desarrollo
                </span>
            </div>

            {/* ── Features que vienen ── */}
            <div className="flex flex-col gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                    Qué incluirá
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {UPCOMING_FEATURES.map(({ icon: Icon, title, description }) => (
                        <Card
                            key={title}
                            className="flex items-start gap-3 border border-border bg-card p-4 shadow-none opacity-60"
                        >
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                <Icon className="size-4 text-muted-foreground" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <p className="text-sm font-medium">{title}</p>
                                <p className="text-[12px] text-muted-foreground leading-relaxed">{description}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

        </div>
    )
}