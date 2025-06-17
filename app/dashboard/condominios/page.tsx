"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { getMaxValue } from "@/lib/plans"
import { Building2, Users, DollarSign, Settings, Plus, Crown } from "lucide-react"
import Link from "next/link"

export default function CondominiosPage() {
  const { user, switchCondominio, updateUserPlan } = useAuth()

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas administradores podem acessar esta página.</p>
      </div>
    )
  }

  const maxCondominios = getMaxValue(user.plan, "maxCondominios")
  const canAddMore = user.condominios.length < maxCondominios

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meus Condomínios</h1>
          <p className="text-gray-600">
            Gerencie todos os seus condomínios ({user.condominios.length}/
            {maxCondominios === Number.POSITIVE_INFINITY ? "∞" : maxCondominios})
          </p>
        </div>
        {canAddMore ? (
          <Button asChild>
            <Link href="/dashboard/condominios/novo">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Condomínio
            </Link>
          </Button>
        ) : (
          <Button onClick={() => updateUserPlan(user.plan === "starter" ? "pro" : "enterprise")}>
            <Crown className="mr-2 h-4 w-4" />
            Upgrade para Adicionar Mais
          </Button>
        )}
      </div>

      {user.plan === "starter" && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">Plano Starter - Limitado a 1 Condomínio</h3>
                <p className="text-blue-700">Faça upgrade para o Pro e gerencie até 5 condomínios!</p>
              </div>
              <Button onClick={() => updateUserPlan("pro")} className="bg-blue-600 hover:bg-blue-700">
                Upgrade para Pro
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user.condominios.map((condominio) => (
          <Card
            key={condominio.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              user.activeCondominioId === condominio.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
            }`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Building2 className="mr-2 h-5 w-5" />
                  {condominio.name}
                </CardTitle>
                {user.activeCondominioId === condominio.id && <Badge className="bg-blue-600">Ativo</Badge>}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-gray-500" />
                  <span>156 moradores</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4 text-gray-500" />
                  <span>R$ 45.600</span>
                </div>
              </div>

              <div className="flex space-x-2">
                {user.activeCondominioId !== condominio.id && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => switchCondominio(condominio.id)}
                    className="flex-1"
                  >
                    Ativar
                  </Button>
                )}
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="mr-2 h-4 w-4" />
                  Configurar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
