"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth-context"
import { BarChart3, Download, Calendar, DollarSign, TrendingUp, TrendingDown, PieChart, FileText } from "lucide-react"

const mockRelatorios = [
  {
    id: "1",
    nome: "Relatório Financeiro Mensal",
    descricao: "Resumo completo das receitas e despesas do mês",
    tipo: "financeiro",
    periodo: "Janeiro 2024",
    status: "disponivel",
  },
  {
    id: "2",
    nome: "Relatório de Inadimplência",
    descricao: "Lista detalhada de unidades em atraso",
    tipo: "inadimplencia",
    periodo: "Janeiro 2024",
    status: "disponivel",
  },
  {
    id: "3",
    nome: "Fluxo de Caixa",
    descricao: "Análise do fluxo de entrada e saída de recursos",
    tipo: "fluxo",
    periodo: "Últimos 6 meses",
    status: "disponivel",
  },
  {
    id: "4",
    nome: "Relatório de Despesas por Categoria",
    descricao: "Breakdown das despesas organizadas por categoria",
    tipo: "despesas",
    periodo: "Janeiro 2024",
    status: "processando",
  },
]

export default function RelatoriosPage() {
  const { user } = useAuth()
  const [periodoSelecionado, setPeriodoSelecionado] = useState("mes-atual")
  const [tipoRelatorio, setTipoRelatorio] = useState("todos")

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas administradores podem acessar esta página.</p>
      </div>
    )
  }

  const condominioAtual = user.condominios.find((c) => c.id === user.activeCondominioId)

  const filteredRelatorios = mockRelatorios.filter((relatorio) => {
    return tipoRelatorio === "todos" || relatorio.tipo === tipoRelatorio
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Relatórios Financeiros</h1>
          <p className="text-gray-600">Relatórios e análises - {condominioAtual?.name}</p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Gerar Novo Relatório
        </Button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ 45.600</div>
            <p className="text-xs text-muted-foreground">+5.2% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas Mensais</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">R$ 32.400</div>
            <p className="text-xs text-muted-foreground">-2.1% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">R$ 13.200</div>
            <p className="text-xs text-muted-foreground">Resultado do mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa Inadimplência</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">8.5%</div>
            <p className="text-xs text-muted-foreground">13 unidades em atraso</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Período</label>
              <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mes-atual">Mês Atual</SelectItem>
                  <SelectItem value="mes-anterior">Mês Anterior</SelectItem>
                  <SelectItem value="trimestre">Último Trimestre</SelectItem>
                  <SelectItem value="semestre">Último Semestre</SelectItem>
                  <SelectItem value="ano">Ano Atual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Tipo de Relatório</label>
              <Select value={tipoRelatorio} onValueChange={setTipoRelatorio}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Tipos</SelectItem>
                  <SelectItem value="financeiro">Financeiro</SelectItem>
                  <SelectItem value="inadimplencia">Inadimplência</SelectItem>
                  <SelectItem value="fluxo">Fluxo de Caixa</SelectItem>
                  <SelectItem value="despesas">Despesas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Relatórios Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button variant="outline" className="h-20 flex-col">
          <BarChart3 className="h-6 w-6 mb-2" />
          <span>Relatório Mensal</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col">
          <PieChart className="h-6 w-6 mb-2" />
          <span>Análise de Despesas</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col">
          <TrendingUp className="h-6 w-6 mb-2" />
          <span>Fluxo de Caixa</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col">
          <FileText className="h-6 w-6 mb-2" />
          <span>Inadimplência</span>
        </Button>
      </div>

      {/* Lista de Relatórios */}
      <Card>
        <CardHeader>
          <CardTitle>Relatórios Disponíveis ({filteredRelatorios.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRelatorios.map((relatorio) => (
              <div
                key={relatorio.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{relatorio.nome}</h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        relatorio.status === "disponivel"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {relatorio.status === "disponivel" ? "Disponível" : "Processando"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{relatorio.descricao}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="mr-1 h-3 w-3" />
                    {relatorio.periodo}
                  </div>
                </div>
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <Button variant="outline" size="sm" disabled={relatorio.status !== "disponivel"}>
                    <Download className="mr-1 h-3 w-3" />
                    Download
                  </Button>
                  <Button size="sm" disabled={relatorio.status !== "disponivel"}>
                    Visualizar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
