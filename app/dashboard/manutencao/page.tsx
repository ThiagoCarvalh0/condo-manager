"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import { Wrench, Clock, CheckCircle, AlertTriangle, Calendar, User, Search, Plus } from "lucide-react"
import Link from "next/link"

const mockSolicitacoes = [
  {
    id: "1",
    titulo: "Vazamento no banheiro",
    descricao: "Torneira da pia está vazando constantemente",
    solicitante: "João Silva - Apto 101",
    categoria: "hidraulica",
    prioridade: "alta",
    status: "pendente",
    dataAbertura: "2024-01-15",
    dataPrevisao: "2024-01-18",
  },
  {
    id: "2",
    titulo: "Lâmpada queimada no corredor",
    descricao: "Lâmpada do 3º andar está queimada",
    solicitante: "Maria Santos - Apto 205",
    categoria: "eletrica",
    prioridade: "media",
    status: "em_andamento",
    dataAbertura: "2024-01-14",
    dataPrevisao: "2024-01-16",
  },
  {
    id: "3",
    titulo: "Portão da garagem com defeito",
    descricao: "Portão não está abrindo com o controle remoto",
    solicitante: "Pedro Costa - Apto 302",
    categoria: "geral",
    prioridade: "baixa",
    status: "concluida",
    dataAbertura: "2024-01-10",
    dataConclusao: "2024-01-12",
  },
]

export default function ManutencaoPage() {
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

  const filteredSolicitacoes = mockSolicitacoes.filter((solicitacao) => {
    const matchesSearch =
      solicitacao.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solicitacao.solicitante.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "todos" || solicitacao.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-100 text-yellow-800"
      case "em_andamento":
        return "bg-blue-100 text-blue-800"
      case "concluida":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return "bg-red-100 text-red-800"
      case "media":
        return "bg-yellow-100 text-yellow-800"
      case "baixa":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manutenção</h1>
          <p className="text-gray-600">Gerencie solicitações de manutenção - {condominioAtual?.name}</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/manutencao/nova">
            <Plus className="mr-2 h-4 w-4" />
            Nova Solicitação
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">8</div>
            <p className="text-xs text-muted-foreground">Aguardando atendimento</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <Wrench className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">5</div>
            <p className="text-xs text-muted-foreground">Sendo executadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">23</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alta Prioridade</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground">Requer atenção urgente</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por título ou solicitante..."
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
                variant={filterStatus === "pendente" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("pendente")}
              >
                Pendentes
              </Button>
              <Button
                variant={filterStatus === "em_andamento" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("em_andamento")}
              >
                Em Andamento
              </Button>
              <Button
                variant={filterStatus === "concluida" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("concluida")}
              >
                Concluídas
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Solicitações */}
      <Card>
        <CardHeader>
          <CardTitle>Solicitações de Manutenção ({filteredSolicitacoes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSolicitacoes.map((solicitacao) => (
              <div
                key={solicitacao.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{solicitacao.titulo}</h3>
                    <Badge className={getStatusColor(solicitacao.status)}>{solicitacao.status.replace("_", " ")}</Badge>
                    <Badge className={getPriorityColor(solicitacao.prioridade)}>{solicitacao.prioridade}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{solicitacao.descricao}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="mr-1 h-3 w-3" />
                      {solicitacao.solicitante}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      Aberto em {new Date(solicitacao.dataAbertura).toLocaleDateString()}
                    </div>
                    {solicitacao.dataPrevisao && (
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        Previsão: {new Date(solicitacao.dataPrevisao).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                  {solicitacao.status !== "concluida" && <Button size="sm">Atualizar Status</Button>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
