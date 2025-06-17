"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth, type UserRole } from "@/lib/auth-context"
import { hasFeature, getMaxValue, type PlanFeatures } from "@/lib/plans"
import {
  Building2,
  LayoutDashboard,
  Users,
  DollarSign,
  Wrench,
  MessageSquare,
  Settings,
  Crown,
  Lock,
  FileText,
  Calendar,
  BarChart3,
  LifeBuoy,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Home,
  Bell,
  CreditCard,
  UserCheck,
  Phone,
  ClipboardList,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { toast } from "@/hooks/use-toast"

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
  roles: UserRole[]
  feature?: keyof PlanFeatures
  subItems?: NavItem[]
  adminOnly?: boolean
  moradorOnly?: boolean
}

// Navegação específica para ADMINISTRADORES
const adminNavigationItems: NavItem[] = [
  { name: "Visão Geral", href: "/dashboard", icon: LayoutDashboard, roles: ["admin"] },
  {
    name: "Condomínios",
    href: "/dashboard/condominios",
    icon: Building2,
    roles: ["admin"],
    feature: "maxCondominios",
    subItems: [
      { name: "Listar Todos", href: "/dashboard/condominios", icon: Building2, roles: ["admin"] },
      {
        name: "Adicionar Novo",
        href: "/dashboard/condominios/novo",
        icon: Building2,
        roles: ["admin"],
        feature: "maxCondominios",
      },
    ],
  },
  {
    name: "Financeiro",
    href: "/dashboard/financeiro",
    icon: DollarSign,
    roles: ["admin"],
    subItems: [
      { name: "Visão Geral", href: "/dashboard/financeiro", icon: BarChart3, roles: ["admin"] },
      { name: "Receitas", href: "/dashboard/financeiro/receitas", icon: DollarSign, roles: ["admin"] },
      { name: "Despesas", href: "/dashboard/financeiro/despesas", icon: DollarSign, roles: ["admin"] },
      { name: "Inadimplência", href: "/dashboard/financeiro/inadimplencia", icon: DollarSign, roles: ["admin"] },
      { name: "Relatórios", href: "/dashboard/financeiro/relatorios", icon: BarChart3, roles: ["admin"] },
    ],
  },
  {
    name: "Pessoas",
    href: "/dashboard/pessoas",
    icon: Users,
    roles: ["admin"],
    subItems: [
      { name: "Moradores", href: "/dashboard/pessoas/moradores", icon: Users, roles: ["admin"] },
      { name: "Funcionários", href: "/dashboard/pessoas/funcionarios", icon: Users, roles: ["admin"] },
      { name: "Prestadores", href: "/dashboard/pessoas/prestadores", icon: Users, roles: ["admin"] },
    ],
  },
  {
    name: "Comunicação",
    href: "/dashboard/comunicacao",
    icon: MessageSquare,
    roles: ["admin"],
    subItems: [
      { name: "Avisos", href: "/dashboard/comunicacao/avisos", icon: MessageSquare, roles: ["admin"] },
      { name: "Enquetes", href: "/dashboard/comunicacao/enquetes", icon: MessageSquare, roles: ["admin"] },
      { name: "Assembleias", href: "/dashboard/comunicacao/assembleias", icon: MessageSquare, roles: ["admin"] },
    ],
  },
  { name: "Manutenção", href: "/dashboard/manutencao", icon: Wrench, roles: ["admin"] },
  { name: "Reservas", href: "/dashboard/reservas", icon: Calendar, roles: ["admin"] },
  { name: "Documentos", href: "/dashboard/documentos", icon: FileText, roles: ["admin"] },
  {
    name: "Configurações",
    href: "/dashboard/configuracoes",
    icon: Settings,
    roles: ["admin"],
    subItems: [
      { name: "Geral do Condomínio", href: "/dashboard/configuracoes/geral", icon: Settings, roles: ["admin"] },
      { name: "Meu Plano", href: "/dashboard/configuracoes/plano", icon: Crown, roles: ["admin"] },
      { name: "Usuários Admin", href: "/dashboard/configuracoes/usuarios", icon: Users, roles: ["admin"] },
      { name: "Integrações", href: "/dashboard/configuracoes/integracoes", icon: Wrench, roles: ["admin"] },
    ],
  },
  { name: "Ajuda & Suporte", href: "/dashboard/suporte", icon: LifeBuoy, roles: ["admin"] },
]

// Navegação específica para MORADORES
const moradorNavigationItems: NavItem[] = [
  { name: "Início", href: "/dashboard", icon: Home, roles: ["morador"] },
  {
    name: "Minha Unidade",
    href: "/dashboard/minha-unidade",
    icon: Home,
    roles: ["morador"],
    subItems: [
      { name: "Informações", href: "/dashboard/minha-unidade", icon: Home, roles: ["morador"] },
      { name: "Histórico", href: "/dashboard/minha-unidade/historico", icon: ClipboardList, roles: ["morador"] },
    ],
  },
  {
    name: "Financeiro",
    href: "/dashboard/financeiro",
    icon: CreditCard,
    roles: ["morador"],
    subItems: [
      { name: "Meus Boletos", href: "/dashboard/financeiro/boletos", icon: CreditCard, roles: ["morador"] },
      { name: "Extrato", href: "/dashboard/financeiro/extrato", icon: FileText, roles: ["morador"] },
      { name: "2ª Via", href: "/dashboard/financeiro/segunda-via", icon: CreditCard, roles: ["morador"] },
    ],
  },
  {
    name: "Solicitações",
    href: "/dashboard/solicitacoes",
    icon: Wrench,
    roles: ["morador"],
    subItems: [
      { name: "Minhas Solicitações", href: "/dashboard/solicitacoes", icon: Wrench, roles: ["morador"] },
      { name: "Nova Solicitação", href: "/dashboard/solicitacoes/nova", icon: Wrench, roles: ["morador"] },
    ],
  },
  {
    name: "Comunicação",
    href: "/dashboard/comunicacao",
    icon: Bell,
    roles: ["morador"],
    subItems: [
      { name: "Avisos", href: "/dashboard/comunicacao/avisos", icon: Bell, roles: ["morador"] },
      { name: "Enquetes", href: "/dashboard/comunicacao/enquetes", icon: MessageSquare, roles: ["morador"] },
      { name: "Falar com Síndico", href: "/dashboard/comunicacao/sindico", icon: MessageSquare, roles: ["morador"] },
    ],
  },
  {
    name: "Visitantes",
    href: "/dashboard/visitantes",
    icon: UserCheck,
    roles: ["morador"],
    subItems: [
      { name: "Autorizar Visitante", href: "/dashboard/visitantes/autorizar", icon: UserCheck, roles: ["morador"] },
      { name: "Histórico", href: "/dashboard/visitantes/historico", icon: ClipboardList, roles: ["morador"] },
      { name: "Prestadores", href: "/dashboard/visitantes/prestadores", icon: Wrench, roles: ["morador"] },
    ],
  },
  {
    name: "Reservas",
    href: "/dashboard/reservas",
    icon: Calendar,
    roles: ["morador"],
    subItems: [
      { name: "Minhas Reservas", href: "/dashboard/reservas", icon: Calendar, roles: ["morador"] },
      { name: "Nova Reserva", href: "/dashboard/reservas/nova", icon: Calendar, roles: ["morador"] },
      { name: "Agenda de Eventos", href: "/dashboard/reservas/agenda", icon: Calendar, roles: ["morador"] },
    ],
  },
  { name: "Documentos", href: "/dashboard/documentos", icon: FileText, roles: ["morador"] },
  { name: "Emergência", href: "/dashboard/emergencia", icon: Phone, roles: ["morador"] },
  { name: "Ajuda", href: "/dashboard/ajuda", icon: LifeBuoy, roles: ["morador"] },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user, updateUserPlan } = useAuth()
  const router = useRouter()
  const [openCollapsibles, setOpenCollapsibles] = useState<Record<string, boolean>>({})
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (!user) return null

  // Escolher a navegação baseada no role
  const navigationItems = user.role === "admin" ? adminNavigationItems : moradorNavigationItems

  const toggleCollapsible = (name: string) => {
    setOpenCollapsibles((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const canAccessItem = (item: NavItem): boolean => {
    if (!item.roles.includes(user.role)) return false

    // Para admins, verificar features do plano
    if (item.feature && user.role === "admin" && user.plan) {
      const planFeatureValue = getMaxValue(user.plan, item.feature as "maxUnits" | "maxCondominios")

      if (!hasFeature(user.plan, item.feature)) {
        if (
          item.feature === "maxCondominios" &&
          item.name === "Adicionar Novo" &&
          user.condominios.length >= planFeatureValue
        ) {
          return false
        }
        if (item.feature !== "maxCondominios") return false
      }
    }
    return true
  }

  const renderNavItem = (item: NavItem, isSubItem = false) => {
    const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href + "/"))
    const canAccess = canAccessItem(item)
    const hasSubItems = item.subItems && item.subItems.length > 0
    const isOpen = openCollapsibles[item.name] || false

    const linkContent = (
      <>
        <item.icon className={cn("h-5 w-5 flex-shrink-0", isSubItem && "ml-4 h-4 w-4")} />
        {!isCollapsed && <span className={cn("ml-3", isSubItem && "text-sm")}>{item.name}</span>}
        {!canAccess && !isCollapsed && <Lock className="ml-auto h-4 w-4 text-gray-400" />}
        {hasSubItems &&
          !isCollapsed &&
          (isOpen ? <ChevronUp className="ml-auto h-4 w-4" /> : <ChevronDown className="ml-auto h-4 w-4" />)}
      </>
    )

    if (hasSubItems) {
      return (
        <Collapsible key={item.name} open={isOpen} onOpenChange={() => toggleCollapsible(item.name)}>
          <CollapsibleTrigger
            className={cn(
              "flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left",
              isActive && !isSubItem
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
              !canAccess && "opacity-60 cursor-not-allowed",
            )}
            disabled={!canAccess}
            onClick={(e) => {
              if (!canAccess) e.preventDefault()
              else if (isCollapsed) router.push(item.href)
            }}
          >
            {linkContent}
          </CollapsibleTrigger>
          {canAccess && !isCollapsed && (
            <CollapsibleContent className="pl-4 border-l border-gray-200 ml-5 py-1 space-y-1">
              {item.subItems?.map((subItem) => renderNavItem(subItem, true))}
            </CollapsibleContent>
          )}
        </Collapsible>
      )
    }

    return (
      <Link
        key={item.name}
        href={canAccess ? item.href : "#"}
        className={cn(
          "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
          isActive && !isSubItem
            ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
          !canAccess && "opacity-60 cursor-not-allowed",
          isSubItem && (isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"),
        )}
        onClick={(e) => {
          if (!canAccess) e.preventDefault()
        }}
        aria-disabled={!canAccess}
        tabIndex={!canAccess ? -1 : undefined}
      >
        {linkContent}
      </Link>
    )
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16 hover:w-64 group" : "w-64",
        "flex flex-col",
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 flex-shrink-0">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Building2 className="h-8 w-8 text-blue-600" />
          <span className={cn("text-xl font-bold text-gray-900", isCollapsed && "hidden group-hover:inline")}>
            CondoManager
          </span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(isCollapsed && "opacity-0 group-hover:opacity-100")}
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <div className="flex items-center space-x-1 mt-1">
                <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                  {user.role === "admin" ? "Administrador" : "Morador"}
                </Badge>
                {user.role === "admin" && user.plan && (
                  <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                    {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isCollapsed && (
        <div className="p-2 border-b border-gray-200 flex-shrink-0 hidden group-hover:block">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <div className="flex items-center space-x-1 mt-1">
                <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                  {user.role === "admin" ? "Administrador" : "Morador"}
                </Badge>
                {user.role === "admin" && user.plan && (
                  <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                    {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => renderNavItem(item))}
      </nav>

      {/* Mostrar upgrade de plano APENAS para admins */}
      {(!isCollapsed || (isCollapsed && "group-hover:block")) &&
        user.role === "admin" &&
        user.plan &&
        user.plan !== "enterprise" && (
          <div className={cn("p-4 border-t border-gray-200 flex-shrink-0", isCollapsed && "hidden group-hover:block")}>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
              <div className="flex items-center mb-2">
                <Crown className="h-5 w-5 mr-2" />
                <span className="font-semibold">Upgrade de Plano</span>
              </div>
              <p className="text-sm mb-3 opacity-90">Desbloqueie mais recursos!</p>
              <Button
                size="sm"
                variant="secondary"
                className="w-full bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => {
                  const newPlan = user.plan === "starter" ? "pro" : "enterprise"
                  updateUserPlan(newPlan)
                  toast({ title: "Plano Atualizado!", description: `Você agora está no plano ${newPlan}.` })
                }}
              >
                {user.plan === "starter" ? "Ir para Pro" : "Ir para Enterprise"}
              </Button>
            </div>
          </div>
        )}
    </div>
  )
}
