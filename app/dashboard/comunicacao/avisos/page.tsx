"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { Bell, Plus, Search, Calendar, Eye, Edit, Trash2, Send, Users, AlertTriangle } from "lucide-react"
import Link from "next/link"

const mockAvisos = [
  {
    id: "1",
    titulo: "Manutenção do Elevador - Bloco A",
    conteudo: "Informamos que o elevador do Bloco A passará por manutenção preventiva no dia 25/01/2024...",
    categoria: "Manutenção",
    prioridade: "alta",
    dataPublicacao: "2024-01-20",
    dataExpiracao: "2024-01-30",
    status: "ativo",
    visualizacoes: 89,
    autor: "Administração",
  },
  {
    id: "2",
    titulo: "Assembleia Geral Ordinária",
    conteudo: "Convocamos todos os condôminos para a Assembleia Geral Ordinária que será realizada...",
    categoria: "Assembleia",
    prioridade: "alta",
    dataPublicacao: "2024-01-15",
    dataExpiracao: "2024-02-15",
    status: "ativo",
    visualizacoes: 156,
    autor: "Síndico",
  },
  {
    id: "3",
    titulo: "Horário de Funcionamento da Piscina",
    conteudo: "Informamos que o horário de funcionamento da piscina foi alterado para...",
    categoria: "Informativo",
    prioridade: "media",
    dataPublicacao: "2024-01-10",
    dataExpiracao: "2024-03-10",
    status: "ativo",
    visualizacoes: 67,
    autor: "Administração",
  },
  {
    id: "4",
    titulo: "Obras no Estacionamento",
    conteudo: "Comunicamos que serão realizadas obras de reparo no estacionamento...",
    categoria: "Obras",
    prioridade: "baixa",
    dataPublicacao: "2024-01-05",
    dataExpiracao: "2024-01-25",
    status: "expirado",
    visualizacoes: 45,
    autor: "Administração",
  },
]

export default function AvisosAdminPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("todos")
  const [filterPrioridade, setFilterPrioridade] = useState("todas")

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas administradores podem acessar esta página.</p>
      </div>
    )
  }

  const condominioAtual = user.condominios.find((c) => c.id === user.activeCondominioId)

  const filteredAvisos = mockAvisos.filter((aviso) => {
    const matchesSearch =
      aviso.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aviso.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "todos" || aviso.status === filterStatus
    const matchesPrioridade = filterPrioridade === "todas" || aviso.prioridade === filterPrioridade
    return matchesSearch && matchesStatus && matchesPrioridade
  })

  const totalAvisos = mockAvisos.length
  const avisosAtivos = mockAvisos.filter((a) => a.status === "ativo").length
  const totalVisualizacoes = mockAvisos.reduce((sum, a) => sum + a.visualizacoes, 0)
  const avisosAlta = mockAvisos.filter((a) => a.prioridade === "alta").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Avisos</h1>
          <p className="text-gray-600">Gerencie avisos para moradores - {condominioAtual?.name}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Send className="mr-2 h-4 w-4" />
            Enviar por Email
          </Button>
          <Button asChild>
            <Link href="/dashboard/comunicacao/avisos/novo">
              <Plus className="mr-2 h-4 w-4" />
              Novo Aviso
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Avisos</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAvisos}</div>
            <p className="text-xs text-muted-foreground">Publicados no sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avisos Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{avisosAtivos}</div>
            <p className="text-xs text-muted-foreground">Visíveis para moradores</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Visualizações</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalVisualizacoes}</div>
            <p className="text-xs text-muted-foreground">Visualizações totais</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avisos Urgentes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{avisosAlta}</div>
            <p className="text-xs text-muted-foreground">Prioridade alta</p>
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
                placeholder="Buscar avisos..."
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
                variant={filterStatus === "ativo" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("ativo")}
              >
                Ativos
              </Button>
              <Button
                variant={filterStatus === "expirado" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("expirado")}
              >
                Expirados
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterPrioridade === "todas" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterPrioridade("todas")}
              >
                Todas
              </Button>
              <Button
                variant={filterPrioridade === "alta" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterPrioridade("alta")}
              >
                Alta
              </Button>
              <Button
                variant={filterPrioridade === "media" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterPrioridade("media")}
              >
                Média
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Avisos */}
      <Card>
        <CardHeader>
          <CardTitle>Avisos ({filteredAvisos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAvisos.map((aviso) => (
              <div
                key={aviso.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{aviso.titulo}</h3>
                    <Badge variant={aviso.status === "ativo" ? "default" : "secondary"}>{aviso.status}</Badge>
                    <Badge
                      variant={
                        aviso.prioridade === "alta"
                          ? "destructive"
                          : aviso.prioridade === "media"
                            ? "default"
                            : "outline"
                      }
                    >
                      {aviso.prioridade}
                    </Badge>
                    <Badge variant="outline">{aviso.categoria}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{aviso.conteudo}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      Publicado: {new Date(aviso.dataPublicacao).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      Expira: {new Date(aviso.dataExpiracao).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Eye className="mr-1 h-3 w-3" />
                      {aviso.visualizacoes} visualizações
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-3 w-3" />
                      Por: {aviso.autor}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-1 h-3 w-3" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-1 h-3 w-3" />
                    Ver
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
