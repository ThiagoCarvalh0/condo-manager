"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { Users, Search, Plus, Mail, Phone, Download, UserCheck, Edit, Wrench, Calendar } from "lucide-react"
import Link from "next/link"

const mockPrestadores = [
  {
    id: "1",
    nome: "João Silva - Eletricista",
    empresa: "Elétrica Silva Ltda",
    categoria: "Elétrica",
    telefone: "(11) 99999-9999",
    email: "joao@eletricasilva.com.br",
    status: "ativo",
    avaliacoes: 4.8,
    servicosRealizados: 15,
    ultimoServico: "2024-01-20",
    observacoes: "Especialista em instalações residenciais",
  },
  {
    id: "2",
    nome: "Maria Santos - Encanadora",
    empresa: "Hidráulica Santos",
    categoria: "Hidráulica",
    telefone: "(11) 88888-8888",
    email: "maria@hidraulicasantos.com.br",
    status: "ativo",
    avaliacoes: 4.9,
    servicosRealizados: 23,
    ultimoServico: "2024-01-18",
    observacoes: "Atendimento 24h para emergências",
  },
  {
    id: "3",
    nome: "Pedro Costa - Pintor",
    empresa: "Pinturas Costa",
    categoria: "Pintura",
    telefone: "(11) 77777-7777",
    email: "pedro@pinturascosta.com.br",
    status: "inativo",
    avaliacoes: 4.2,
    servicosRealizados: 8,
    ultimoServico: "2023-11-15",
    observacoes: "Especializado em pintura externa",
  },
  {
    id: "4",
    nome: "Ana Oliveira - Jardineira",
    empresa: "Jardins & Cia",
    categoria: "Jardinagem",
    telefone: "(11) 66666-6666",
    email: "ana@jardinsecia.com.br",
    status: "ativo",
    avaliacoes: 5.0,
    servicosRealizados: 12,
    ultimoServico: "2024-01-22",
    observacoes: "Manutenção mensal das áreas verdes",
  },
]

export default function PrestadoresPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("todos")
  const [filterCategoria, setFilterCategoria] = useState("todas")

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas administradores podem acessar esta página.</p>
      </div>
    )
  }

  const condominioAtual = user.condominios.find((c) => c.id === user.activeCondominioId)

  const filteredPrestadores = mockPrestadores.filter((prestador) => {
    const matchesSearch =
      prestador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prestador.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prestador.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "todos" || prestador.status === filterStatus
    const matchesCategoria = filterCategoria === "todas" || prestador.categoria.toLowerCase() === filterCategoria
    return matchesSearch && matchesStatus && matchesCategoria
  })

  const totalPrestadores = mockPrestadores.length
  const prestadoresAtivos = mockPrestadores.filter((p) => p.status === "ativo").length
  const mediaAvaliacoes = mockPrestadores.reduce((sum, p) => sum + p.avaliacoes, 0) / totalPrestadores
  const totalServicos = mockPrestadores.reduce((sum, p) => sum + p.servicosRealizados, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prestadores de Serviços</h1>
          <p className="text-gray-600">Gerencie prestadores de serviços - {condominioAtual?.name}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button asChild>
            <Link href="/dashboard/pessoas/prestadores/novo">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Prestador
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Prestadores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPrestadores}</div>
            <p className="text-xs text-muted-foreground">Cadastrados no sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prestadores Ativos</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{prestadoresAtivos}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((prestadoresAtivos / totalPrestadores) * 100)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{mediaAvaliacoes.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">⭐ Nota média geral</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Serviços Realizados</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalServicos}</div>
            <p className="text-xs text-muted-foreground">Total de serviços</p>
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
                placeholder="Buscar por nome, empresa ou categoria..."
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
                variant={filterStatus === "inativo" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("inativo")}
              >
                Inativos
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterCategoria === "todas" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterCategoria("todas")}
              >
                Todas
              </Button>
              <Button
                variant={filterCategoria === "elétrica" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterCategoria("elétrica")}
              >
                Elétrica
              </Button>
              <Button
                variant={filterCategoria === "hidráulica" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterCategoria("hidráulica")}
              >
                Hidráulica
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Prestadores */}
      <Card>
        <CardHeader>
          <CardTitle>Prestadores ({filteredPrestadores.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPrestadores.map((prestador) => (
              <div
                key={prestador.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{prestador.nome}</h3>
                    <Badge variant={prestador.status === "ativo" ? "default" : "secondary"}>{prestador.status}</Badge>
                    <Badge variant="outline">{prestador.categoria}</Badge>
                    <span className="text-sm text-yellow-600">⭐ {prestador.avaliacoes}</span>
                  </div>
                  <p className="text-sm text-gray-600">{prestador.empresa}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Mail className="mr-1 h-3 w-3" />
                      {prestador.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-1 h-3 w-3" />
                      {prestador.telefone}
                    </div>
                    <div className="flex items-center">
                      <Wrench className="mr-1 h-3 w-3" />
                      {prestador.servicosRealizados} serviços
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      Último: {new Date(prestador.ultimoServico).toLocaleDateString()}
                    </div>
                  </div>
                  {prestador.observacoes && <p className="text-sm text-gray-500 italic">{prestador.observacoes}</p>}
                </div>
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-1 h-3 w-3" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="mr-1 h-3 w-3" />
                    Contatar
                  </Button>
                  <Button size="sm">Ver Histórico</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
