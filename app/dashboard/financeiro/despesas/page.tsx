"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { DollarSign, Plus, Search, Calendar, TrendingDown, Download, Edit, Trash2, AlertTriangle } from "lucide-react"
import Link from "next/link"

const mockDespesas = [
  {
    id: "1",
    descricao: "Manutenção do Elevador - Bloco A",
    categoria: "Manutenção",
    valor: 2500,
    data: "2024-01-15",
    status: "pago",
    fornecedor: "Elevadores Tech Ltda",
    vencimento: "2024-01-20",
  },
  {
    id: "2",
    descricao: "Energia Elétrica - Janeiro/2024",
    categoria: "Utilidades",
    valor: 3200,
    data: "2024-01-10",
    status: "pago",
    fornecedor: "Companhia Elétrica",
    vencimento: "2024-01-15",
  },
  {
    id: "3",
    descricao: "Limpeza e Conservação",
    categoria: "Serviços",
    valor: 4500,
    data: "2024-01-25",
    status: "pendente",
    fornecedor: "Clean Service",
    vencimento: "2024-01-30",
  },
  {
    id: "4",
    descricao: "Segurança - Janeiro/2024",
    categoria: "Segurança",
    valor: 8900,
    data: "2024-01-05",
    status: "pago",
    fornecedor: "Segurança Total",
    vencimento: "2024-01-10",
  },
  {
    id: "5",
    descricao: "Material de Limpeza",
    categoria: "Materiais",
    valor: 650,
    data: "2024-01-28",
    status: "vencido",
    fornecedor: "Distribuidora ABC",
    vencimento: "2024-01-25",
  },
]

export default function DespesasPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("todos")

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas administradores podem acessar esta página.</p>
      </div>
    )
  }

  const condominioAtual = user.condominios.find((c) => c.id === user.activeCondominioId)

  const filteredDespesas = mockDespesas.filter((despesa) => {
    const matchesSearch =
      despesa.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      despesa.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
      despesa.fornecedor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "todos" || despesa.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalDespesas = filteredDespesas.reduce((sum, despesa) => sum + despesa.valor, 0)
  const despesasPagas = filteredDespesas
    .filter((d) => d.status === "pago")
    .reduce((sum, despesa) => sum + despesa.valor, 0)
  const despesasPendentes = filteredDespesas
    .filter((d) => d.status === "pendente")
    .reduce((sum, despesa) => sum + despesa.valor, 0)
  const despesasVencidas = filteredDespesas
    .filter((d) => d.status === "vencido")
    .reduce((sum, despesa) => sum + despesa.valor, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Despesas</h1>
          <p className="text-gray-600">Gestão de despesas - {condominioAtual?.name}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button asChild>
            <Link href="/dashboard/financeiro/despesas/nova">
              <Plus className="mr-2 h-4 w-4" />
              Nova Despesa
            </Link>
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Despesas</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">R$ {totalDespesas.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{filteredDespesas.length} lançamentos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas Pagas</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {despesasPagas.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((despesasPagas / totalDespesas) * 100)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas Pendentes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">R$ {despesasPendentes.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">A pagar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas Vencidas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">R$ {despesasVencidas.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Requer atenção</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar despesas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "todos" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("todos")}
              >
                Todos
              </Button>
              <Button
                variant={filterStatus === "pago" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("pago")}
              >
                Pagas
              </Button>
              <Button
                variant={filterStatus === "pendente" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("pendente")}
              >
                Pendentes
              </Button>
              <Button
                variant={filterStatus === "vencido" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("vencido")}
              >
                Vencidas
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Despesas */}
      <Card>
        <CardHeader>
          <CardTitle>Despesas ({filteredDespesas.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDespesas.map((despesa) => (
              <div
                key={despesa.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{despesa.descricao}</h3>
                    <Badge
                      variant={
                        despesa.status === "pago"
                          ? "default"
                          : despesa.status === "vencido"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {despesa.status === "pago" ? "Pago" : despesa.status === "vencido" ? "Vencido" : "Pendente"}
                    </Badge>
                    <Badge variant="outline">{despesa.categoria}</Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      Venc: {new Date(despesa.vencimento).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="mr-1 h-3 w-3" />
                      R$ {despesa.valor.toLocaleString()}
                    </div>
                    <span>• {despesa.fornecedor}</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-1 h-3 w-3" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="mr-1 h-3 w-3" />
                    Excluir
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
