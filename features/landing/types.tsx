// ─── LANDING TYPES ────────────────────────────────────────────

export interface NavLink {
    label: string;
    href: string;
}

export interface Feature {
    icon: string; // lucide icon name, resolved in component
    title: string;
    description: string;
    color: string; // tailwind bg color class
    iconColor: string; // tailwind text color class
}

export interface PricingPlan {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    cta: string;
    highlighted: boolean;
    badge?: string;
}

export interface Testimonial {
    name: string;
    role: string;
    hotel: string;
    city: string;
    content: string;
    rating: number;
    initials: string;
    avatarColor: string; // tailwind bg color class
}

export interface TrustBadge {
    icon: string;
    text: string;
}

export interface StatCard {
    label: string;
    value: string;
    color: string;    // text color
    bg: string;       // bg + border
}