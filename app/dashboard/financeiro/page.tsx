"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Calendar,
  FileText,
  CreditCard,
  PieChart,
} from "lucide-react"

const mockFinancialData = {
  receita: 45600,
  despesas: 32400,
  saldo: 13200,
  inadimplencia: 8.5,
  proximosVencimentos: 15,
  boletosEmitidos: 156,
  receitaVariacao: 5.2,
  despesasVariacao: -2.1,
}

export default function FinanceiroPage() {
  const { user } = useAuth()

  if (!user) return null

  const isAdmin = user.role === "admin"
  const condominioAtual = user.condominios.find((c) => c.id === user.activeCondominioId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financeiro</h1>
          <p className="text-gray-600">
            {isAdmin ? `Gestão financeira - ${condominioAtual?.name}` : "Suas informações financeiras"}
          </p>
        </div>
        {isAdmin && (
          <div className="flex space-x-2">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Relatórios
            </Button>
            <Button>
              <CreditCard className="mr-2 h-4 w-4" />
              Emitir Boletos
            </Button>
          </div>
        )}
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {mockFinancialData.receita.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />+{mockFinancialData.receitaVariacao}% vs mês
              anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas Mensais</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">R$ {mockFinancialData.despesas.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="mr-1 h-3 w-3 text-green-500" />
              {mockFinancialData.despesasVariacao}% vs mês anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">R$ {mockFinancialData.saldo.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Receitas - Despesas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inadimplência</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{mockFinancialData.inadimplencia}%</div>
            <p className="text-xs text-muted-foreground">
              {Math.round(mockFinancialData.inadimplencia * 1.56)} unidades em atraso
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Seções específicas por role */}
      {isAdmin ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Próximos Vencimentos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Próximos Vencimentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium">Hoje - 10 boletos</p>
                    <p className="text-sm text-gray-600">R$ 4.500,00</p>
                  </div>
                  <Badge variant="secondary">Hoje</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium">Próximos 7 dias - 25 boletos</p>
                    <p className="text-sm text-gray-600">R$ 11.250,00</p>
                  </div>
                  <Badge variant="outline">7 dias</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Próximos 30 dias - 121 boletos</p>
                    <p className="text-sm text-gray-600">R$ 54.450,00</p>
                  </div>
                  <Badge variant="outline">30 dias</Badge>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                Ver Todos os Vencimentos
              </Button>
            </CardContent>
          </Card>

          {/* Ações Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Emitir Boletos do Mês
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Relatório de Inadimplência
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="mr-2 h-4 w-4" />
                Lançar Despesa
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <PieChart className="mr-2 h-4 w-4" />
                Dashboard Financeiro
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Visão do Morador */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Meus Boletos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium">Junho/2024 - Pago</p>
                    <p className="text-sm text-gray-600">R$ 450,75</p>
                  </div>
                  <Badge className="bg-green-600">Pago</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium">Julho/2024 - Vence em 3 dias</p>
                    <p className="text-sm text-gray-600">R$ 450,75</p>
                  </div>
                  <Badge variant="secondary">Pendente</Badge>
                </div>
              </div>
              <Button className="w-full mt-4">Ver Todos os Boletos</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Extrato de Taxas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Taxa de Condomínio</span>
                  <span>R$ 380,00</span>
                </div>
                <div className="flex justify-between">
                  <span>Fundo de Reserva</span>
                  <span>R$ 45,00</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa de Limpeza</span>
                  <span>R$ 25,75</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>R$ 450,75</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
