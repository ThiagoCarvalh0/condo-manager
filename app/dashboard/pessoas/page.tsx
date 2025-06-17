"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { Users, Search, Plus, Mail, Phone, MapPin, Download, UserCheck, UserX, Edit } from "lucide-react"
import Link from "next/link"

const mockMoradores = [
  {
    id: "1",
    nome: "João Silva",
    email: "joao.silva@email.com",
    telefone: "(11) 99999-9999",
    unidade: "Apto 101",
    bloco: "A",
    status: "ativo",
    tipo: "proprietario",
    dataIngresso: "2023-01-15",
  },
  {
    id: "2",
    nome: "Maria Santos",
    email: "maria.santos@email.com",
    telefone: "(11) 88888-8888",
    unidade: "Apto 205",
    bloco: "B",
    status: "ativo",
    tipo: "inquilino",
    dataIngresso: "2023-03-20",
  },
  {
    id: "3",
    nome: "Pedro Costa",
    email: "pedro.costa@email.com",
    telefone: "(11) 77777-7777",
    unidade: "Apto 302",
    bloco: "C",
    status: "inativo",
    tipo: "proprietario",
    dataIngresso: "2022-11-10",
  },
]

export default function PessoasPage() {
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

  const filteredMoradores = mockMoradores.filter((morador) => {
    const matchesSearch =
      morador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      morador.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      morador.unidade.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "todos" || morador.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Pessoas</h1>
          <p className="text-gray-600">Gerencie moradores e proprietários - {condominioAtual?.name}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button asChild>
            <Link href="/dashboard/pessoas/novo">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Pessoa
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Moradores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+12 este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proprietários</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">57% do total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inquilinos</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67</div>
            <p className="text-xs text-muted-foreground">43% do total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unidades Ocupadas</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">91% ocupação</p>
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
                placeholder="Buscar por nome, email ou unidade..."
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
          </div>
        </CardContent>
      </Card>

      {/* Lista de Moradores */}
      <Card>
        <CardHeader>
          <CardTitle>Moradores ({filteredMoradores.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMoradores.map((morador) => (
              <div
                key={morador.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{morador.nome}</h3>
                    <Badge variant={morador.status === "ativo" ? "default" : "secondary"}>{morador.status}</Badge>
                    <Badge variant="outline">{morador.tipo}</Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Mail className="mr-1 h-3 w-3" />
                      {morador.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-1 h-3 w-3" />
                      {morador.telefone}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3" />
                      {morador.unidade} - Bloco {morador.bloco}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-1 h-3 w-3" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="mr-1 h-3 w-3" />
                    Contatar
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
