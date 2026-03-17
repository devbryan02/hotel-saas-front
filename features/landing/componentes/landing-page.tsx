"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    BedDouble,
    Users,
    CalendarCheck,
    BarChart3,
    Smartphone,
    Shield,
    ChevronRight,
    Star,
    Check,
    ArrowRight,
    Zap,
    Globe,
    Clock,
    Menu,
    X,
} from "lucide-react";

import {
    navLinks,
    features,
    pricingPlans,
    testimonials,
    trustBadges,
    mockStats,
    mockRoomStatuses,
    roomStatusStyles,
} from "../data";

// ─── ICON MAP ─────────────────────────────────────────────────
const iconMap: Record<string, React.ElementType> = {
    BedDouble,
    Users,
    CalendarCheck,
    BarChart3,
    Smartphone,
    Shield,
    Check,
    Zap,
    Globe,
    Clock,
};

const WHATSAPP_LINK_WITH_MESSAGE = "https://wa.me/51992450988?text=Hola,%20quiero%20más%20información%20sobre%20zowy.app";

// ─── NAVBAR ───────────────────────────────────────────────────
function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                {/* Logo — matches sidebar logo */}
                <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-xl bg-blue-600 shadow-md shadow-blue-200">
                        <BedDouble className="size-4 text-white" />
                    </div>
                    <span className="text-lg font-black tracking-tight text-slate-900">
                        zowy<span className="text-blue-600">.app</span>
                    </span>
                </div>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* CTAs */}
                <div className="hidden md:flex items-center gap-3">
                    <Link href="/dashboard">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-600 font-medium hover:text-blue-600 hover:bg-blue-50"
                        >
                            Iniciar sesión
                        </Button>
                    </Link>
                    <Link href={WHATSAPP_LINK_WITH_MESSAGE} target="_blank">
                        <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-100 rounded-xl px-5"
                        >
                            Probar gratis
                        </Button>
                    </Link>
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
                >
                    {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 flex flex-col gap-3">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-sm font-medium text-slate-700 py-1.5 border-b border-slate-50"
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="flex flex-col gap-2 pt-2">
                        <Link href="/dashboard">
                            <Button variant="outline" size="sm" className="w-full font-medium">
                                Iniciar sesión
                            </Button>
                        </Link>
                        <Link href={WHATSAPP_LINK_WITH_MESSAGE} target="_blank">
                            <Button
                                size="sm"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
                            >
                                Probar gratis 14 días
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}

// ─── HERO ─────────────────────────────────────────────────────
function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/30 to-white pt-16">
            {/* Background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 size-[600px] rounded-full bg-blue-100/60 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 size-[500px] rounded-full bg-sky-100/50 blur-3xl" />
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 lg:py-32">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Pill */}
                    <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 mb-8">
                        <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-xs font-semibold text-blue-700 tracking-wide uppercase">
                            Hecho para hoteles del Perú 🇵🇪
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6">
                        Gestiona tu hotel{" "}
                        <span className="relative">
                            <span className="relative z-10 text-blue-600">
                                desde tu celular
                            </span>
                            <svg
                                className="absolute -bottom-1 left-0 w-full"
                                viewBox="0 0 300 8"
                                fill="none"
                            >
                                <path
                                    d="M2 6C50 2 100 1 150 2C200 3 250 5 298 2"
                                    stroke="#2563eb"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    opacity="0.35"
                                />
                            </svg>
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                        El sistema de gestión hotelera más sencillo para hoteles y hostales
                        de provincias. Sin complicaciones, sin Excel, sin papeles.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
                        <Link href={WHATSAPP_LINK_WITH_MESSAGE} target="_blank">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200 rounded-2xl px-8 h-14 text-base gap-2 transition-transform hover:scale-[1.02]"
                            >
                                Empezar gratis 14 días
                                <ArrowRight className="size-4" />
                            </Button>
                        </Link>
                        <Link href={WHATSAPP_LINK_WITH_MESSAGE} target="_blank">
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto border-slate-200 text-slate-700 font-semibold rounded-2xl px-8 h-14 text-base hover:bg-slate-50 hover:border-blue-200"
                            >
                                Ver demo en vivo
                            </Button>
                        </Link>
                    </div>

                    {/* Trust badges */}
                    <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-500">
                        {trustBadges.map(({ icon, text }) => {
                            const Icon = iconMap[icon];
                            return (
                                <div key={text} className="flex items-center gap-1.5 font-medium">
                                    {Icon && <Icon className="size-3.5 text-blue-500" />}
                                    {text}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Dashboard mockup */}
                <div className="mt-16 relative max-w-4xl mx-auto">
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-200/80 bg-white">
                        {/* Browser chrome */}
                        <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100">
                            <div className="flex gap-1.5">
                                <div className="size-3 rounded-full bg-red-400" />
                                <div className="size-3 rounded-full bg-yellow-400" />
                                <div className="size-3 rounded-full bg-green-400" />
                            </div>
                            <div className="flex-1 mx-4 h-6 rounded-md bg-slate-200 flex items-center px-3">
                                <span className="text-[10px] text-slate-400 font-mono">
                                    app.zowy.app/dashboard
                                </span>
                            </div>
                        </div>

                        {/* Mock content */}
                        <div className="p-5 bg-slate-50 min-h-[260px]">
                            {/* Stats row */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                                {mockStats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className={`rounded-xl p-3 border ${stat.bg} flex flex-col gap-1`}
                                    >
                                        <span className="text-[10px] text-slate-500 font-medium leading-tight">
                                            {stat.label}
                                        </span>
                                        <span className={`text-xl font-black ${stat.color}`}>
                                            {stat.value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Room grid */}
                            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                                {Array.from({ length: 20 }, (_, i) => {
                                    const status = mockRoomStatuses[i % mockRoomStatuses.length];
                                    return (
                                        <div
                                            key={i}
                                            className={`aspect-square rounded-lg border flex items-center justify-center text-[10px] font-bold ${roomStatusStyles[status]}`}
                                        >
                                            {i + 101}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Floating notification badges */}
                    <div className="absolute -left-4 top-1/3 bg-white rounded-2xl shadow-lg border border-slate-100 px-4 py-3 hidden sm:flex items-center gap-3">
                        <div className="size-9 rounded-xl bg-blue-100 flex items-center justify-center">
                            <CalendarCheck className="size-4 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-800">Check-in registrado</p>
                            <p className="text-[11px] text-slate-400">Hab. 204 · Carlos R.</p>
                        </div>
                    </div>

                    <div className="absolute -right-4 bottom-1/3 bg-white rounded-2xl shadow-lg border border-slate-100 px-4 py-3 hidden sm:flex items-center gap-3">
                        <div className="size-9 rounded-xl bg-blue-50 flex items-center justify-center">
                            <BarChart3 className="size-4 text-blue-700" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-800">+23% este mes</p>
                            <p className="text-[11px] text-slate-400">vs mes anterior</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── FEATURES ─────────────────────────────────────────────────
function Features() {
    return (
        <section id="funcionalidades" className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <Badge
                        variant="outline"
                        className="mb-4 border-blue-200 text-blue-700 font-semibold px-4 py-1 bg-blue-50"
                    >
                        Funcionalidades
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
                        Todo lo que necesitas,{" "}
                        <span className="text-blue-600">nada de lo que no</span>
                    </h2>
                    <p className="text-lg text-slate-500 max-w-xl mx-auto">
                        Sin funciones raras ni curva de aprendizaje. Entras y en minutos ya
                        estás gestionando tu hotel.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((feature) => {
                        const Icon = iconMap[feature.icon];
                        return (
                            <Card
                                key={feature.title}
                                className="group border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 rounded-2xl overflow-hidden"
                            >
                                <CardContent className="p-6">
                                    <div
                                        className={`size-11 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        {Icon && <Icon className={`size-5 ${feature.iconColor}`} />}
                                    </div>
                                    <h3 className="text-sm font-bold text-slate-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// ─── PRICING ──────────────────────────────────────────────────
function Pricing() {
    return (
        <section id="precios" className="py-24 bg-slate-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <Badge
                        variant="outline"
                        className="mb-4 border-blue-200 text-blue-700 font-semibold px-4 py-1 bg-blue-50"
                    >
                        Precios
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
                        Precios justos para{" "}
                        <span className="text-blue-600">el mercado peruano</span>
                    </h2>
                    <p className="text-lg text-slate-500 max-w-xl mx-auto">
                        Sin contratos anuales obligatorios. Sin sorpresas. Cancela cuando
                        quieras.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {pricingPlans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-2xl p-6 flex flex-col gap-5 transition-all duration-300 ${plan.highlighted
                                ? "bg-blue-600 text-white shadow-2xl shadow-blue-200 scale-[1.02]"
                                : "bg-white border border-slate-200 hover:border-blue-200 hover:shadow-lg"
                                }`}
                        >
                            {plan.badge && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                    <span className="bg-amber-400 text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                                        {plan.badge}
                                    </span>
                                </div>
                            )}

                            <div>
                                <p
                                    className={`text-xs font-bold uppercase tracking-widest mb-2 ${plan.highlighted ? "text-blue-200" : "text-slate-400"
                                        }`}
                                >
                                    {plan.name}
                                </p>
                                <div className="flex items-end gap-1">
                                    <span
                                        className={`text-4xl font-black ${plan.highlighted ? "text-white" : "text-slate-900"
                                            }`}
                                    >
                                        {plan.price}
                                    </span>
                                    {plan.period && (
                                        <span
                                            className={`text-sm mb-1 ${plan.highlighted ? "text-blue-200" : "text-slate-400"
                                                }`}
                                        >
                                            {plan.period}
                                        </span>
                                    )}
                                </div>
                                <p
                                    className={`text-sm mt-2 leading-relaxed ${plan.highlighted ? "text-blue-100" : "text-slate-500"
                                        }`}
                                >
                                    {plan.description}
                                </p>
                            </div>

                            <ul className="flex flex-col gap-2.5 flex-1">
                                {plan.features.map((feat) => (
                                    <li key={feat} className="flex items-start gap-2.5">
                                        <div
                                            className={`size-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.highlighted ? "bg-white/20" : "bg-blue-50"
                                                }`}
                                        >
                                            <Check
                                                className={`size-3 ${plan.highlighted ? "text-white" : "text-blue-600"
                                                    }`}
                                            />
                                        </div>
                                        <span
                                            className={`text-sm ${plan.highlighted ? "text-blue-50" : "text-slate-600"
                                                }`}
                                        >
                                            {feat}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Link href={WHATSAPP_LINK_WITH_MESSAGE} target="_blank">
                                <Button
                                    size="lg"
                                    className={`w-full rounded-xl font-bold h-12 ${plan.highlighted
                                        ? "bg-white text-blue-700 hover:bg-blue-50"
                                        : "bg-blue-600 hover:bg-blue-700 text-white"
                                        }`}
                                >
                                    {plan.cta}
                                    <ChevronRight className="size-4 ml-1" />
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>

                <p className="text-center text-sm text-slate-400 mt-8">
                    ¿Tienes dudas? Escríbenos por WhatsApp y te ayudamos a elegir el plan
                    correcto.
                </p>
            </div>
        </section>
    );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────
function Testimonials() {
    return (
        <section id="testimonios" className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <Badge
                        variant="outline"
                        className="mb-4 border-blue-200 text-blue-700 font-semibold px-4 py-1 bg-blue-50"
                    >
                        Testimonios
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
                        Lo que dicen los{" "}
                        <span className="text-blue-600">hoteleros peruanos</span>
                    </h2>
                    <p className="text-lg text-slate-500 max-w-xl mx-auto">
                        Hoteles reales de provincias que ya dejaron el cuaderno atrás.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t) => (
                        <Card
                            key={t.name}
                            className="border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 rounded-2xl"
                        >
                            <CardContent className="p-6 flex flex-col gap-4">
                                <div className="flex gap-1">
                                    {Array.from({ length: t.rating }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className="size-4 fill-amber-400 text-amber-400"
                                        />
                                    ))}
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed italic">
                                    &ldquo;{t.content}&rdquo;
                                </p>
                                <div className="flex items-center gap-3 pt-2 border-t border-slate-50">
                                    <div
                                        className={`size-10 rounded-full ${t.avatarColor} flex items-center justify-center text-white text-xs font-black shrink-0`}
                                    >
                                        {t.initials}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">{t.name}</p>
                                        <p className="text-xs text-slate-400">
                                            {t.role} · {t.hotel}, {t.city}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── FINAL CTA ────────────────────────────────────────────────
function FinalCTA() {
    return (
        <section className="py-24 bg-blue-600 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-32 -right-32 size-96 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-white/5 blur-3xl" />
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                    }}
                />
            </div>

            <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                    Tu hotel merece una herramienta moderna
                </h2>
                <p className="text-lg text-blue-100 mb-10 leading-relaxed">
                    Únete a los hoteles peruanos que ya digitalizaron su gestión. 14 días
                    gratis, sin tarjeta, sin compromisos.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/dashboard">
                        <Button
                            size="lg"
                            className="w-full sm:w-auto bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-2xl px-10 h-14 text-base shadow-xl gap-2 transition-transform hover:scale-[1.02]"
                        >
                            Empezar gratis ahora
                            <ArrowRight className="size-4" />
                        </Button>
                    </Link>
                    <p className="text-sm text-blue-200 font-medium">
                        ✓ Sin tarjeta &nbsp;·&nbsp; ✓ Setup en 5 min &nbsp;·&nbsp; ✓ Cancela cuando quieras
                    </p>
                </div>
            </div>
        </section>
    );
}

// ─── FOOTER ───────────────────────────────────────────────────
function Footer() {
    return (
        <footer className="bg-slate-900 py-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-xl bg-blue-600">
                        <BedDouble className="size-3.5 text-white" />
                    </div>
                    <span className="text-sm font-black text-white">
                        zowy<span className="text-blue-400">.app</span>
                    </span>
                </div>
                <p className="text-xs text-slate-500">
                    © {new Date().getFullYear()} zowy.app · Hecho con ❤️ para los hoteleros del Perú
                </p>
                <div className="flex gap-4 text-xs text-slate-500">
                    <a href="#" className="hover:text-slate-300 transition-colors">Privacidad</a>
                    <a href="#" className="hover:text-slate-300 transition-colors">Términos</a>
                    <a href="#" className="hover:text-slate-300 transition-colors">Contacto</a>
                </div>
            </div>
        </footer>
    );
}

// ─── LANDING PAGE (export principal) ─────────────────────────
export default function LandingPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero />
            <Features />
            <Pricing />
            <Testimonials />
            <FinalCTA />
            <Footer />
        </main>
    );
}