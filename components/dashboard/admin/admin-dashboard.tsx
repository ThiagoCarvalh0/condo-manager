"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { getMaxValue } from "@/lib/plans"
import {
  Building2,
  Users,
  DollarSign,
  AlertTriangle,
  Wrench,
  Crown,
  ArrowRight,
  PlusCircle,
  Settings,
  BarChart3,
} from "lucide-react"

// Mock data - idealmente viria de uma API filtrada pelo activeCondominioId
const getMockDataForCondominio = (condominioId?: string) => {
  if (!condominioId) return { moradores: 0, receita: 0, inadimplencia: 0, manutencoes: 0 }
  // Simula dados diferentes por condomínio
  const seed = Number.parseInt(condominioId.replace(/\D/g, "")) % 100 // Usa o ID para variar os dados
  return {
    moradores: 100 + seed,
    receita: (300 + seed) * 100,
    inadimplencia: (5 + seed / 20).toFixed(1),
    manutencoes: 5 + (seed % 5),
  }
}

export function AdminDashboard() {
  const { user, updateUserPlan } = useAuth()

  if (!user || user.role !== "admin") return null

  const currentCondoData = getMockDataForCondominio(user.activeCondominioId)
  const canAddMoreCondos = user.condominios.length < getMaxValue(user.plan, "maxCondominios")
  const needsProForMoreCondos = user.plan === "starter" && getMaxValue(user.plan, "maxCondominios") === 1

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrador</h1>
          <p className="text-gray-600">
            Visão geral do condomínio:{" "}
            <span className="font-semibold">
              {user.condominios.find((c) => c.id === user.activeCondominioId)?.name || "N/A"}
            </span>
          </p>
        </div>
        {user.condominios.length > 1 && (
          <p className="text-sm text-gray-500">Você está gerenciando {user.condominios.length} condomínios.</p>
        )}
      </div>

      {/* Plan Upgrade Banner - Mais contextual */}
      {user.plan === "starter" && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <Crown className="h-8 w-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900">Desbloqueie o poder do Plano Pro!</h3>
                  <p className="text-sm text-blue-700">Gerencie múltiplos condomínios, relatórios avançados e mais.</p>
                </div>
              </div>
              <Button onClick={() => updateUserPlan("pro")} className="bg-blue-600 hover:bg-blue-700 mt-2 sm:mt-0">
                Upgrade para Pro
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Condomínios</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.condominios.length}</div>
            <p className="text-xs text-muted-foreground">
              Plano {user.plan}: até {getMaxValue(user.plan, "maxCondominios")}
            </p>
            {needsProForMoreCondos && (
              <Button size="sm" variant="link" className="p-0 h-auto text-xs" onClick={() => updateUserPlan("pro")}>
                Upgrade para adicionar mais
              </Button>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moradores (Ativo)</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentCondoData.moradores}</div>
            <p className="text-xs text-muted-foreground">No condomínio atual</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal (Ativo)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {currentCondoData.receita.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Estimativa do condomínio atual</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inadimplência (Ativo)</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentCondoData.inadimplencia}%</div>
            <p className="text-xs text-muted-foreground">No condomínio atual</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions for Admin */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas do Administrador</CardTitle>
          <CardDescription>
            Gerencie o condomínio{" "}
            <span className="font-semibold">
              {user.condominios.find((c) => c.id === user.activeCondominioId)?.name}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button variant="outline" className="w-full justify-start text-left h-auto py-3">
            <Users className="mr-3 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-medium">Gerenciar Moradores</p>
              <p className="text-xs text-muted-foreground">Adicionar, editar, remover</p>
            </div>
          </Button>
          <Button variant="outline" className="w-full justify-start text-left h-auto py-3">
            <DollarSign className="mr-3 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-medium">Controle Financeiro</p>
              <p className="text-xs text-muted-foreground">Taxas, despesas, inadimplência</p>
            </div>
          </Button>
          <Button variant="outline" className="w-full justify-start text-left h-auto py-3">
            <Wrench className="mr-3 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-medium">Solicitações de Manutenção</p>
              <p className="text-xs text-muted-foreground">{currentCondoData.manutencoes} pendentes</p>
            </div>
          </Button>
          <Button variant="outline" className="w-full justify-start text-left h-auto py-3">
            <BarChart3 className="mr-3 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-medium">Relatórios Gerenciais</p>
              <p className="text-xs text-muted-foreground">Financeiro, ocupação, etc.</p>
            </div>
          </Button>
          <Button variant="outline" className="w-full justify-start text-left h-auto py-3">
            <Settings className="mr-3 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-medium">Configurações do Condomínio</p>
              <p className="text-xs text-muted-foreground">Regras, taxas, unidades</p>
            </div>
          </Button>
          {canAddMoreCondos && (
            <Button
              variant="default"
              className="w-full justify-start text-left h-auto py-3 bg-green-600 hover:bg-green-700"
            >
              <PlusCircle className="mr-3 h-5 w-5 flex-shrink-0" />
              <div>
                <p className="font-medium">Adicionar Novo Condomínio</p>
                <p className="text-xs text-green-100">Expanda sua administração</p>
              </div>
            </Button>
          )}
          {!canAddMoreCondos && user.plan !== "enterprise" && (
            <Button
              variant="secondary"
              className="w-full justify-start text-left h-auto py-3"
              onClick={() => updateUserPlan(user.plan === "starter" ? "pro" : "enterprise")}
            >
              <Crown className="mr-3 h-5 w-5 flex-shrink-0" />
              <div>
                <p className="font-medium">Upgrade para Adicionar Condomínios</p>
                <p className="text-xs text-muted-foreground">Seu plano atual: {user.plan}</p>
              </div>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
