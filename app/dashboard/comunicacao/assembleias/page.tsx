"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { Users, Plus, Search, Calendar, Clock, MapPin, Edit, Trash2, Download, UserCheck } from "lucide-react"
import Link from "next/link"

const mockAssembleias = [
  {
    id: "1",
    titulo: "Assembleia Geral Ordinária 2024",
    descricao: "Assembleia anual para aprovação de contas e eleição do síndico",
    tipo: "ordinaria",
    dataRealizacao: "2024-02-15",
    horario: "19:00",
    local: "Salão de Festas - Bloco A",
    status: "agendada",
    participantes: 89,
    totalUnidades: 156,
    pauta: ["Prestação de contas 2023", "Orçamento 2024", "Eleição do síndico", "Aprovação de obras"],
    ata: null,
    convocacao: "2024-01-15",
  },
  {
    id: "2",
    titulo: "Assembleia Extraordinária - Obras",
    descricao: "Discussão sobre obras de reforma da fachada",
    tipo: "extraordinaria",
    dataRealizacao: "2024-01-20",
    horario: "10:00",
    local: "Salão de Festas - Bloco A",
    status: "realizada",
    participantes: 67,
    totalUnidades: 156,
    pauta: [
      "Apresentação do projeto de reforma",
      "Orçamentos das empresas",
      "Votação para aprovação",
      "Definição de cronograma",
    ],
    ata: "ata-assembleia-extraordinaria-20240120.pdf",
    convocacao: "2024-01-05",
  },
  {
    id: "3",
    titulo: "Assembleia de Prestação de Contas",
    descricao: "Apresentação das contas do primeiro semestre",
    tipo: "prestacao-contas",
    dataRealizacao: "2024-07-15",
    horario: "19:30",
    local: "Salão de Festas - Bloco A",
    status: "agendada",
    participantes: 0,
    totalUnidades: 156,
    pauta: [
      "Balanço financeiro 1º semestre",
      "Relatório de despesas",
      "Situação da inadimplência",
      "Projetos para 2º semestre",
    ],
    ata: null,
    convocacao: "2024-06-30",
  },
]

export default function AssembleiasPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("todas")
  const [filterTipo, setFilterTipo] = useState("todos")

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas administradores podem acessar esta página.</p>
      </div>
    )
  }

  const condominioAtual = user.condominios.find((c) => c.id === user.activeCondominioId)

  const filteredAssembleias = mockAssembleias.filter((assembleia) => {
    const matchesSearch =
      assembleia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assembleia.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "todas" || assembleia.status === filterStatus
    const matchesTipo = filterTipo === "todos" || assembleia.tipo === filterTipo
    return matchesSearch && matchesStatus && matchesTipo
  })

  const totalAssembleias = mockAssembleias.length
  const assembleiasAgendadas = mockAssembleias.filter((a) => a.status === "agendada").length
  const assembleiasRealizadas = mockAssembleias.filter((a) => a.status === "realizada").length
  const mediaParticipacao =
    (mockAssembleias
      .filter((a) => a.status === "realizada")
      .reduce((sum, a) => sum + a.participantes / a.totalUnidades, 0) /
      assembleiasRealizadas) *
      100 || 0

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assembleias</h1>
          <p className="text-gray-600">Gerencie assembleias do condomínio - {condominioAtual?.name}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Relatórios
          </Button>
          <Button asChild>
            <Link href="/dashboard/comunicacao/assembleias/nova">
              <Plus className="mr-2 h-4 w-4" />
              Nova Assembleia
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Assembleias</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAssembleias}</div>
            <p className="text-xs text-muted-foreground">Registradas no sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assembleias Agendadas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{assembleiasAgendadas}</div>
            <p className="text-xs text-muted-foreground">Próximas assembleias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assembleias Realizadas</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{assembleiasRealizadas}</div>
            <p className="text-xs text-muted-foreground">Já concluídas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participação Média</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{mediaParticipacao.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Das unidades</p>
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
                placeholder="Buscar assembleias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "todas" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("todas")}
              >
                Todas
              </Button>
              <Button
                variant={filterStatus === "agendada" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("agendada")}
              >
                Agendadas
              </Button>
              <Button
                variant={filterStatus === "realizada" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("realizada")}
              >
                Realizadas
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterTipo === "todos" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterTipo("todos")}
              >
                Todos
              </Button>
              <Button
                variant={filterTipo === "ordinaria" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterTipo("ordinaria")}
              >
                Ordinária
              </Button>
              <Button
                variant={filterTipo === "extraordinaria" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterTipo("extraordinaria")}
              >
                Extraordinária
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Assembleias */}
      <div className="space-y-6">
        {filteredAssembleias.map((assembleia) => (
          <Card key={assembleia.id}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold">{assembleia.titulo}</h3>
                    <Badge variant={assembleia.status === "agendada" ? "default" : "secondary"}>
                      {assembleia.status === "agendada" ? "Agendada" : "Realizada"}
                    </Badge>
                    <Badge variant="outline">
                      {assembleia.tipo === "ordinaria"
                        ? "Ordinária"
                        : assembleia.tipo === "extraordinaria"
                          ? "Extraordinária"
                          : "Prestação de Contas"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{assembleia.descricao}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(assembleia.dataRealizacao).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {assembleia.horario}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3" />
                      {assembleia.local}
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-3 w-3" />
                      {assembleia.participantes}/{assembleia.totalUnidades} unidades
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-1 h-3 w-3" />
                    Editar
                  </Button>
                  {assembleia.ata && (
                    <Button variant="outline" size="sm">
                      <Download className="mr-1 h-3 w-3" />
                      Ata
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Trash2 className="mr-1 h-3 w-3" />
                    Excluir
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <h4 className="font-medium mb-2">Pauta da Assembleia:</h4>
                <ul className="space-y-1">
                  {assembleia.pauta.map((item, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-2">
                        {index + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
