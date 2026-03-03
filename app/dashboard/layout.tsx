'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  BedDouble,
  Users,
  CalendarCheck,
  FileText,
  HelpCircle,
  LogOut,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ModeToggle } from '@/components/shared/ModeToggle'
import { cn } from '@/lib/utils'

// ─── NAV CONFIG ───────────────────────────────────────────────
const mainNav = [
  { label: 'Dashboard',    href: '/dashboard',   icon: LayoutDashboard },
  { label: 'Habitaciones', href: '/dashboard/rooms',        icon: BedDouble },
  { label: 'Clientes',     href: '/dashboard/clients',      icon: Users },
  { label: 'Ocupaciones',     href: '/dashboard/occupations',     icon: CalendarCheck },
]

const secondaryNav = [
  { label: 'Reportes',  href: '/dashboard/reports', icon: FileText },
  { label: 'Soporte',   href: '/dashboard/support', icon: HelpCircle },
]

const routeLabels: Record<string, string> = {
  dashboard:  'Dashboard',
  rooms:      'Habitaciones',
  clients:    'Clientes',
  occupations:'Ocupaciones',
  reports:    'Reportes',
  support:    'Soporte',
}

// ─── NAV ITEM ─────────────────────────────────────────────────
function NavItem({ label, href, icon: Icon }: { label: string; href: string; icon: React.ElementType }) {
  const pathname = usePathname()
  const isActive = href === '/dashboard'
    ? pathname === href
    : pathname === href || pathname.startsWith(href + '/')

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className={cn(
          'group h-9 rounded-lg px-3 text-sm font-medium transition-all',
          'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent',
          isActive && 'bg-sidebar-accent text-sidebar-foreground font-semibold'
        )}
      >
        <Link href={href} className="flex items-center gap-3">
          <Icon className={cn(
            'size-4 shrink-0 transition-colors',
            isActive ? 'text-primary' : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground/80'
          )} />
          <span>{label}</span>
          {/* Indicador activo */}
          {isActive && (
            <span className="ml-auto size-1.5 rounded-full bg-primary" />
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

// ─── LAYOUT PRINCIPAL ─────────────────────────────────────────
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  return (
    <SidebarProvider>
      {/* ══ SIDEBAR ══════════════════════════════════════════ */}
      <Sidebar className="border-r border-sidebar-border bg-sidebar">

        {/* Logo */}
        <SidebarHeader className="px-5 py-5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary">
              <BedDouble className="size-4 text-primary-foreground" />
            </div>
            <span className="text-base font-bold tracking-tight text-sidebar-foreground">
              cat<span className="text-primary">.IN</span>
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-3 py-2">

          {/* Nav principal */}
          <SidebarGroup className="p-0">
            <SidebarGroupLabel className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
              General
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {mainNav.map((item) => (
                  <NavItem key={item.href} {...item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <Separator className="my-3 bg-sidebar-border/60" />

          {/* Nav secundaria */}
          <SidebarGroup className="p-0">
            <SidebarGroupLabel className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
              Sistema
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {secondaryNav.map((item) => (
                  <NavItem key={item.href} {...item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

        </SidebarContent>

        {/* Footer — usuario */}
        <SidebarFooter className="border-t border-sidebar-border px-3 py-3">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <Avatar className="size-8 shrink-0">
              <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                BC
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-xs font-semibold text-sidebar-foreground">
                Bryan Cardenas
              </span>
              <span className="truncate text-[11px] text-sidebar-foreground/50">
                bryan@gmail.com
              </span>
            </div>
            <button className="shrink-0 rounded-md p-1 text-sidebar-foreground/40 transition-colors hover:text-destructive">
              <LogOut className="size-4" />
            </button>
          </div>
        </SidebarFooter>

      </Sidebar>

      {/* ══ CONTENIDO ════════════════════════════════════════ */}
      <SidebarInset className="bg-background">

        {/* Topbar */}
        <header className="sticky top-0 z-10 flex h-13 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-sm">
          <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
          <Separator orientation="vertical" className="h-4" />

          {/* Breadcrumb */}
          <Breadcrumb className="flex-1">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Inicio
                </BreadcrumbLink>
              </BreadcrumbItem>
              {segments.map((seg, i) => {
                const isLast = i === segments.length - 1
                const label = routeLabels[seg] ?? seg
                const href = `/${segments.slice(0, i + 1).join('/')}`
                return (
                  <span key={seg} className="flex items-center gap-1.5">
                    <BreadcrumbSeparator className="text-muted-foreground/40" />
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage className="text-xs font-medium text-foreground">
                          {label}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          href={href}
                          className="text-xs text-muted-foreground hover:text-foreground"
                        >
                          {label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </span>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>

          {/* Acciones topbar */}
          <div className="flex items-center gap-2">
            <ModeToggle />
          </div>
        </header>

        {/* Main content */}
        <main className="flex flex-1 flex-col gap-6 p-6">
          {children}
        </main>

      </SidebarInset>
    </SidebarProvider>
  )
}