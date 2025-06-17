"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"
import { MessageSquare, Plus, Search, Calendar, Users, Edit, Trash2, BarChart3, Clock } from "lucide-react"
import Link from "next/link"

const mockEnquetes = [
  {
    id: "1",
    titulo: "Horário de funcionamento da piscina",
    descricao: "Qual o melhor horário para funcionamento da piscina nos finais de semana?",
    opcoes: [
      { id: "1a", texto: "8h às 18h", votos: 45 },
      { id: "1b", texto: "9h às 19h", votos: 67 },
      { id: "1c", texto: "10h às 20h", votos: 23 },
    ],
    dataInicio: "2024-01-15",
    dataFim: "2024-01-30",
    status: "ativa",
    totalVotos: 135,
    autor: "Administração",
  },
  {
    id: "2",
    titulo: "Reforma da área de lazer",
    descricao: "Qual área de lazer deve ser priorizada para reforma?",
    opcoes: [
      { id: "2a", texto: "Playground", votos: 89 },
      { id: "2b", texto: "Quadra esportiva", votos: 56 },
      { id: "2c", texto: "Salão de festas", votos: 34 },
      { id: "2d", texto: "Academia", votos: 78 },
    ],
    dataInicio: "2024-01-10",
    dataFim: "2024-01-25",
    status: "encerrada",
    totalVotos: 257,
    autor: "Síndico",
  },
  {
    id: "3",
    titulo: "Implementação de sistema de delivery",
    descricao: "Você é favorável à implementação de um sistema de recebimento de delivery na portaria?",
    opcoes: [
      { id: "3a", texto: "Sim, totalmente favorável", votos: 98 },
      { id: "3b", texto: "Sim, mas com restrições", votos: 45 },
      { id: "3c", texto: "Não, prefiro receber diretamente", votos: 12 },
    ],
    dataInicio: "2024-01-20",
    dataFim: "2024-02-05",
    status: "ativa",
    totalVotos: 155,
    autor: "Administração",
  },
]

export default function EnquetesAdminPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("todas")

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas administradores podem acessar esta página.</p>
      </div>
    )
  }

  const condominioAtual = user.condominios.find((c) => c.id === user.activeCondominioId)

  const filteredEnquetes = mockEnquetes.filter((enquete) => {
    const matchesSearch =
      enquete.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquete.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "todas" || enquete.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalEnquetes = mockEnquetes.length
  const enquetesAtivas = mockEnquetes.filter((e) => e.status === "ativa").length
  const totalVotos = mockEnquetes.reduce((sum, e) => sum + e.totalVotos, 0)
  const participacaoMedia = (totalVotos / totalEnquetes / 156) * 100 // 156 = total de unidades

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enquetes</h1>
          <p className="text-gray-600">Gerencie enquetes para moradores - {condominioAtual?.name}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Relatórios
          </Button>
          <Button asChild>
            <Link href="/dashboard/comunicacao/enquetes/nova">
              <Plus className="mr-2 h-4 w-4" />
              Nova Enquete
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Enquetes</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEnquetes}</div>
            <p className="text-xs text-muted-foreground">Criadas no sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enquetes Ativas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{enquetesAtivas}</div>
            <p className="text-xs text-muted-foreground">Aguardando participação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Votos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalVotos}</div>
            <p className="text-xs text-muted-foreground">Votos computados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participação Média</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{participacaoMedia.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Dos moradores</p>
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
                placeholder="Buscar enquetes..."
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
                variant={filterStatus === "ativa" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("ativa")}
              >
                Ativas
              </Button>
              <Button
                variant={filterStatus === "encerrada" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("encerrada")}
              >
                Encerradas
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Enquetes */}
      <div className="space-y-6">
        {filteredEnquetes.map((enquete) => (
          <Card key={enquete.id}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold">{enquete.titulo}</h3>
                    <Badge variant={enquete.status === "ativa" ? "default" : "secondary"}>{enquete.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{enquete.descricao}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(enquete.dataInicio).toLocaleDateString()} -{" "}
                      {new Date(enquete.dataFim).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-3 w-3" />
                      {enquete.totalVotos} votos
                    </div>
                    <span>Por: {enquete.autor}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-1 h-3 w-3" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="mr-1 h-3 w-3" />
                    Resultados
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="mr-1 h-3 w-3" />
                    Excluir
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {enquete.opcoes.map((opcao) => {
                  const porcentagem = (opcao.votos / enquete.totalVotos) * 100
                  return (
                    <div key={opcao.id} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{opcao.texto}</span>
                        <span className="font-medium">
                          {opcao.votos} votos ({porcentagem.toFixed(1)}%)
                        </span>
                      </div>
                      <Progress value={porcentagem} className="h-2" />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
