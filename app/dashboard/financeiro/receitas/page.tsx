"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { DollarSign, Plus, Search, Calendar, TrendingUp, Download, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

const mockReceitas = [
  {
    id: "1",
    descricao: "Taxa de Condomínio - Janeiro/2024",
    categoria: "Taxa Condominial",
    valor: 45600,
    data: "2024-01-10",
    status: "recebido",
    origem: "Boletos",
  },
  {
    id: "2",
    descricao: "Multa por Atraso - Diversos",
    categoria: "Multas",
    valor: 1250,
    data: "2024-01-15",
    status: "recebido",
    origem: "Cobrança",
  },
  {
    id: "3",
    descricao: "Taxa de Reserva - Salão de Festas",
    categoria: "Taxas Extras",
    valor: 800,
    data: "2024-01-20",
    status: "pendente",
    origem: "Reservas",
  },
  {
    id: "4",
    descricao: "Fundo de Reserva - Janeiro/2024",
    categoria: "Fundo de Reserva",
    valor: 5600,
    data: "2024-01-10",
    status: "recebido",
    origem: "Boletos",
  },
]

export default function ReceitasPage() {
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

  const filteredReceitas = mockReceitas.filter((receita) => {
    const matchesSearch =
      receita.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receita.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "todos" || receita.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalReceitas = filteredReceitas.reduce((sum, receita) => sum + receita.valor, 0)
  const receitasRecebidas = filteredReceitas
    .filter((r) => r.status === "recebido")
    .reduce((sum, receita) => sum + receita.valor, 0)
  const receitasPendentes = filteredReceitas
    .filter((r) => r.status === "pendente")
    .reduce((sum, receita) => sum + receita.valor, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Receitas</h1>
          <p className="text-gray-600">Gestão de receitas - {condominioAtual?.name}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button asChild>
            <Link href="/dashboard/financeiro/receitas/nova">
              <Plus className="mr-2 h-4 w-4" />
              Nova Receita
            </Link>
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Receitas</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {totalReceitas.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{filteredReceitas.length} lançamentos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas Recebidas</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">R$ {receitasRecebidas.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((receitasRecebidas / totalReceitas) * 100)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas Pendentes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">R$ {receitasPendentes.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">A receber</p>
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
                placeholder="Buscar receitas..."
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
                variant={filterStatus === "recebido" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("recebido")}
              >
                Recebidas
              </Button>
              <Button
                variant={filterStatus === "pendente" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("pendente")}
              >
                Pendentes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Receitas */}
      <Card>
        <CardHeader>
          <CardTitle>Receitas ({filteredReceitas.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReceitas.map((receita) => (
              <div
                key={receita.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{receita.descricao}</h3>
                    <Badge variant={receita.status === "recebido" ? "default" : "secondary"}>
                      {receita.status === "recebido" ? "Recebido" : "Pendente"}
                    </Badge>
                    <Badge variant="outline">{receita.categoria}</Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(receita.data).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="mr-1 h-3 w-3" />
                      R$ {receita.valor.toLocaleString()}
                    </div>
                    <span>• {receita.origem}</span>
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
