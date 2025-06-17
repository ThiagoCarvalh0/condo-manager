"use client"

import { Bell, Search, User, LogOut, ChevronsUpDown, Building, Check, Crown, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export function DashboardHeader() {
  const { user, logout, switchCondominio } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
  }

  if (!user) return null

  const currentCondominioName =
    user.condominios.find((c) => c.id === user.activeCondominioId)?.name || "Selecionar Condomínio"

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        {/* Condominio Selector - Agora para TODOS os usuários com múltiplos condomínios */}
        {user.condominios.length > 1 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {user.role === "admin" ? (
                  <Building className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Home className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="max-w-[150px] truncate sm:max-w-xs">{currentCondominioName}</span>
                <ChevronsUpDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>
                {user.role === "admin" ? "Selecionar Condomínio" : "Minhas Unidades"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user.condominios.map((condo) => (
                <DropdownMenuItem
                  key={condo.id}
                  onClick={() => switchCondominio(condo.id)}
                  className={cn("flex justify-between", user.activeCondominioId === condo.id && "bg-accent")}
                >
                  <div>
                    {condo.name}
                    {user.role === "morador" && condo.unidades && condo.unidades.length > 0 && (
                      <span className="text-xs text-muted-foreground ml-2">
                        ({condo.unidades.map((u) => `${u.bloco ? `${u.bloco}-` : ""}${u.numero}`).join(", ")})
                      </span>
                    )}
                  </div>
                  {user.activeCondominioId === condo.id && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              ))}
              {user.role === "admin" && user.condominios.length < getMaxValue(user.plan, "maxCondominios") && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/dashboard/condominios/novo")}>
                    Adicionar Novo Condomínio
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Search */}
        <div className="flex-1 max-w-lg ml-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Buscar no condomínio..." className="pl-10 bg-gray-50 border-0" />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-sm font-medium">{user.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/dashboard/perfil")}>
                <User className="mr-2 h-4 w-4" />
                Perfil
              </DropdownMenuItem>
              {user.role === "admin" && (
                <DropdownMenuItem onClick={() => router.push("/dashboard/configuracoes/planos")}>
                  <Crown className="mr-2 h-4 w-4" />
                  Gerenciar Plano
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

// Função auxiliar para obter o máximo de condomínios (simulada, idealmente do lib/plans)
function getMaxValue(plan: string | null, feature: string): number {
  if (!plan) return 0

  if (feature === "maxCondominios") {
    if (plan === "starter") return 1
    if (plan === "pro") return 5
    if (plan === "enterprise") return Number.POSITIVE_INFINITY
  }
  return 0
}
