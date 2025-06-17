"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { Crown, Check, X, Zap, Building2, Users, BarChart3 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const planos = [
  {
    id: "starter",
    nome: "Starter",
    preco: "R$ 99",
    periodo: "/mês",
    descricao: "Ideal para condomínios pequenos",
    recursos: [
      "Até 1 condomínio",
      "Até 50 unidades",
      "Gestão financeira básica",
      "Comunicação com moradores",
      "Suporte por email",
    ],
    limitacoes: ["Relatórios limitados", "Sem integração com bancos", "Sem app mobile"],
    popular: false,
  },
  {
    id: "pro",
    nome: "Professional",
    preco: "R$ 199",
    periodo: "/mês",
    descricao: "Para condomínios em crescimento",
    recursos: [
      "Até 3 condomínios",
      "Até 200 unidades",
      "Gestão financeira completa",
      "Relatórios avançados",
      "Integração bancária",
      "App mobile",
      "Suporte prioritário",
    ],
    limitacoes: ["Funcionalidades premium limitadas"],
    popular: true,
  },
  {
    id: "enterprise",
    nome: "Enterprise",
    preco: "R$ 399",
    periodo: "/mês",
    descricao: "Para grandes condomínios e administradoras",
    recursos: [
      "Condomínios ilimitados",
      "Unidades ilimitadas",
      "Todas as funcionalidades",
      "Relatórios personalizados",
      "API completa",
      "Suporte 24/7",
      "Gerente de conta dedicado",
      "Treinamento personalizado",
    ],
    limitacoes: [],
    popular: false,
  },
]

export default function PlanoPage() {
  const { user, updateUserPlan } = useAuth()
  const { toast } = useToast()

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas administradores podem acessar esta página.</p>
      </div>
    )
  }

  const planoAtual = user.plan || "starter"

  const handleUpgrade = (novoPlano: string) => {
    updateUserPlan(novoPlano as "starter" | "pro" | "enterprise")
    toast({
      title: "Plano atualizado!",
      description: `Você agora está no plano ${novoPlano}. Aproveite os novos recursos!`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Escolha seu Plano</h1>
        <p className="text-gray-600 mt-2">
          Selecione o plano ideal para o seu condomínio. Você pode alterar a qualquer momento.
        </p>
      </div>

      {/* Plano Atual */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Crown className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-blue-900">Seu Plano Atual</CardTitle>
            </div>
            <Badge className="bg-blue-600">{planos.find((p) => p.id === planoAtual)?.nome}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <p className="font-semibold">Condomínios</p>
                <p className="text-sm text-gray-600">
                  {user.condominios.length} de {planoAtual === "starter" ? "1" : planoAtual === "pro" ? "3" : "∞"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="font-semibold">Unidades</p>
                <p className="text-sm text-gray-600">
                  156 de {planoAtual === "starter" ? "50" : planoAtual === "pro" ? "200" : "∞"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <div>
                <p className="font-semibold">Recursos</p>
                <p className="text-sm text-gray-600">
                  {planoAtual === "starter" ? "Básicos" : planoAtual === "pro" ? "Avançados" : "Completos"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparação de Planos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {planos.map((plano) => (
          <Card
            key={plano.id}
            className={`relative ${
              plano.popular ? "border-blue-500 shadow-lg" : ""
            } ${plano.id === planoAtual ? "ring-2 ring-blue-500" : ""}`}
          >
            {plano.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600">Mais Popular</Badge>
              </div>
            )}
            {plano.id === planoAtual && (
              <div className="absolute -top-3 right-4">
                <Badge className="bg-green-600">Plano Atual</Badge>
              </div>
            )}

            <CardHeader className="text-center">
              <CardTitle className="text-xl">{plano.nome}</CardTitle>
              <div className="flex items-baseline justify-center space-x-1">
                <span className="text-3xl font-bold">{plano.preco}</span>
                <span className="text-gray-500">{plano.periodo}</span>
              </div>
              <p className="text-sm text-gray-600">{plano.descricao}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">Incluído:</h4>
                <ul className="space-y-2">
                  {plano.recursos.map((recurso, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {recurso}
                    </li>
                  ))}
                </ul>
              </div>

              {plano.limitacoes.length > 0 && (
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">Limitações:</h4>
                  <ul className="space-y-2">
                    {plano.limitacoes.map((limitacao, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <X className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                        {limitacao}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4">
                {plano.id === planoAtual ? (
                  <Button disabled className="w-full">
                    Plano Atual
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleUpgrade(plano.id)}
                    className="w-full"
                    variant={plano.popular ? "default" : "outline"}
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    {plano.id === "starter" ? "Fazer Downgrade" : "Fazer Upgrade"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Informações Adicionais */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Importantes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">💳 Faturamento</h4>
              <p className="text-sm text-gray-600">
                Todos os planos são cobrados mensalmente. Você pode cancelar ou alterar seu plano a qualquer momento.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🔄 Alterações</h4>
              <p className="text-sm text-gray-600">
                Upgrades são aplicados imediatamente. Downgrades entram em vigor no próximo ciclo de faturamento.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📞 Suporte</h4>
              <p className="text-sm text-gray-600">
                Todos os planos incluem suporte técnico. Planos superiores têm prioridade e canais exclusivos.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📊 Dados</h4>
              <p className="text-sm text-gray-600">
                Seus dados são sempre preservados, independente do plano. Apenas o acesso a recursos é limitado.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
