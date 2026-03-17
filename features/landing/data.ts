import type {
    NavLink,
    Feature,
    PricingPlan,
    Testimonial,
    TrustBadge,
    StatCard,
} from "./types";

// ─── NAV ──────────────────────────────────────────────────────
export const navLinks: NavLink[] = [
    { label: "Funcionalidades", href: "#funcionalidades" },
    { label: "Precios", href: "#precios" },
    { label: "Testimonios", href: "#testimonios" },
];

// ─── FEATURES ─────────────────────────────────────────────────
export const features: Feature[] = [
    {
        icon: "BedDouble",
        title: "Habitaciones en tiempo real",
        description:
            "Ve el estado de cada habitación de un vistazo: libre, ocupada, en limpieza o mantenimiento. Sin papeles, sin confusión.",
        color: "bg-blue-50",
        iconColor: "text-blue-600",
    },
    {
        icon: "CalendarCheck",
        title: "Reservas y check-in rápido",
        description:
            "Registra una ocupación en segundos. Pagos parciales, notas, check-out automático. Todo desde tu celular.",
        color: "bg-sky-50",
        iconColor: "text-sky-600",
    },
    {
        icon: "Users",
        title: "Historial de huéspedes",
        description:
            "Conoce a tus clientes frecuentes, sus preferencias y su historial completo. Atención personalizada sin esfuerzo.",
        color: "bg-indigo-50",
        iconColor: "text-indigo-600",
    },
    {
        icon: "BarChart3",
        title: "Reportes que importan",
        description:
            "Ocupación, ingresos, temporadas. Números claros para tomar mejores decisiones sin ser contador.",
        color: "bg-blue-50",
        iconColor: "text-blue-700",
    },
    {
        icon: "Smartphone",
        title: "100% desde el celular",
        description:
            "Diseñado primero para móvil. Tu recepcionista puede gestionar todo desde su smartphone, siempre.",
        color: "bg-cyan-50",
        iconColor: "text-cyan-600",
    },
    {
        icon: "Shield",
        title: "Tus datos, solo tuyos",
        description:
            "Multi-tenant seguro. Los datos de tu hotel son completamente privados e independientes de otros hoteles.",
        color: "bg-slate-50",
        iconColor: "text-slate-600",
    },
];

// ─── PRICING ──────────────────────────────────────────────────
export const pricingPlans: PricingPlan[] = [
    {
        name: "Básico",
        price: "S/ 39",
        period: "/ mes",
        description:
            "Ideal para hostales y hoteles pequeños que recién digitalizan.",
        features: [
            "Hasta 20 habitaciones",
            "Gestión de reservas ilimitada",
            "Registro de huéspedes",
            "1 usuario del sistema",
            "Soporte por WhatsApp",
        ],
        cta: "Empezar gratis 14 días",
        highlighted: false,
    },
    {
        name: "Pro",
        price: "S/ 49",
        period: "/ mes",
        description:
            "Para hoteles que quieren crecer con datos y eficiencia real.",
        features: [
            "Hasta 50 habitaciones",
            "Todo lo del plan Básico",
            "Reportes avanzados",
            "Hasta 5 usuarios",
            "Pagos parciales e historial",
            "Soporte prioritario",
        ],
        cta: "Empezar gratis 14 días",
        highlighted: true,
        badge: "Más popular",
    },
    {
        name: "Enterprise",
        price: "A convenir",
        period: "",
        description: "Para cadenas o propiedades con necesidades especiales.",
        features: [
            "Habitaciones ilimitadas",
            "Múltiples propiedades",
            "API access",
            "Usuarios ilimitados",
            "Onboarding personalizado",
            "SLA garantizado",
        ],
        cta: "Hablar con ventas",
        highlighted: false,
    },
];

// ─── TESTIMONIALS ─────────────────────────────────────────────
export const testimonials: Testimonial[] = [
    {
        name: "Rosa Quispe",
        role: "Administradora",
        hotel: "Hostal Los Andes",
        city: "Ayacucho",
        content:
            "Antes usaba un cuaderno y a veces perdía reservas. Ahora en segundos veo qué habitaciones están libres y mis ingresos subieron 20% porque no pierdo clientes.",
        rating: 5,
        initials: "RQ",
        avatarColor: "bg-blue-600",
    },
    {
        name: "Carlos Mendoza",
        role: "Recepcionista",
        hotel: "Hotel Plaza Wari",
        city: "Ayacucho",
        content:
            "Lo uso desde mi celular todo el día. El check-in me toma menos de un minuto. Los dueños del hotel quedaron sorprendidos con el cambio.",
        rating: 5,
        initials: "CM",
        avatarColor: "bg-indigo-600",
    },
    {
        name: "Milagros Torres",
        role: "Propietaria",
        hotel: "Hospedaje El Mirador",
        city: "Huancayo",
        content:
            "Pensé que sería difícil aprender pero fue muy sencillo. En un día ya tenía todo mi hotel registrado. El soporte responde rápido por WhatsApp.",
        rating: 5,
        initials: "MT",
        avatarColor: "bg-sky-600",
    },
];

// ─── TRUST BADGES ─────────────────────────────────────────────
export const trustBadges: TrustBadge[] = [
    { icon: "Check", text: "Sin tarjeta de crédito" },
    { icon: "Zap", text: "Configura en 5 minutos" },
    { icon: "Globe", text: "Soporte en español" },
    { icon: "Clock", text: "Disponible 24/7" },
];

// ─── MOCK DASHBOARD STATS ─────────────────────────────────────
export const mockStats: StatCard[] = [
    {
        label: "Habitaciones libres",
        value: "8",
        color: "text-emerald-600",
        bg: "bg-emerald-50 border-emerald-100",
    },
    {
        label: "Ocupadas hoy",
        value: "12",
        color: "text-blue-600",
        bg: "bg-blue-50 border-blue-100",
    },
    {
        label: "Check-out hoy",
        value: "3",
        color: "text-orange-600",
        bg: "bg-orange-50 border-orange-100",
    },
    {
        label: "Ingresos del mes",
        value: "S/4,280",
        color: "text-blue-700",
        bg: "bg-blue-50 border-blue-200",
    },
];

// ─── MOCK ROOM STATUSES ───────────────────────────────────────
export const mockRoomStatuses = [
    "free", "occupied", "cleaning", "occupied", "free",
    "occupied", "free", "maintenance", "occupied", "free",
] as const;

export type RoomStatus = (typeof mockRoomStatuses)[number];

export const roomStatusStyles: Record<RoomStatus, string> = {
    free: "bg-emerald-100 border-emerald-200 text-emerald-700",
    occupied: "bg-blue-100 border-blue-200 text-blue-700",
    cleaning: "bg-yellow-100 border-yellow-200 text-yellow-700",
    maintenance: "bg-red-100 border-red-200 text-red-700",
};