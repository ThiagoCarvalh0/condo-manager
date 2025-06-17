"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { Users, Search, Plus, Mail, Phone, MapPin, Download, UserCheck, Edit, Clock } from "lucide-react"
import Link from "next/link"

const mockFuncionarios = [
  {
    id: "1",
    nome: "Carlos Silva",
    cargo: "Porteiro",
    email: "carlos.silva@email.com",
    telefone: "(11) 99999-1111",
    turno: "Manhã (06:00 - 14:00)",
    status: "ativo",
    dataAdmissao: "2023-01-15",
    salario: "R$ 2.500,00",
  },
  {
    id: "2",
    nome: "Ana Santos",
    cargo: "Faxineira",
    email: "ana.santos@email.com",
    telefone: "(11) 88888-2222",
    turno: "Integral (08:00 - 17:00)",
    status: "ativo",
    dataAdmissao: "2023-03-20",
    salario: "R$ 1.800,00",
  },
  {
    id: "3",
    nome: "José Costa",
    cargo: "Zelador",
    email: "jose.costa@email.com",
    telefone: "(11) 77777-3333",
    turno: "Tarde (14:00 - 22:00)",
    status: "inativo",
    dataAdmissao: "2022-11-10",
    salario: "R$ 2.200,00",
  },
  {
    id: "4",
    nome: "Maria Oliveira",
    cargo: "Administradora",
    email: "maria.oliveira@email.com",
    telefone: "(11) 66666-4444",
    turno: "Comercial (08:00 - 18:00)",
    status: "ativo",
    dataAdmissao: "2022-05-01",
    salario: "R$ 4.500,00",
  },
]

export default function FuncionariosPage() {
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

  const filteredFuncionarios = mockFuncionarios.filter((funcionario) => {
    const matchesSearch =
      funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      funcionario.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      funcionario.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "todos" || funcionario.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Funcionários</h1>
          <p className="text-gray-600">Gerencie funcionários do condomínio - {condominioAtual?.name}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button asChild>
            <Link href="/dashboard/pessoas/funcionarios/novo">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Funcionário
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Funcionários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Funcionários Ativos</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">83% do total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Folha de Pagamento</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 28.500</div>
            <p className="text-xs text-muted-foreground">Mensal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Turnos Cobertos</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24h</div>
            <p className="text-xs text-muted-foreground">Cobertura completa</p>
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
                placeholder="Buscar por nome, cargo ou email..."
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

      {/* Lista de Funcionários */}
      <Card>
        <CardHeader>
          <CardTitle>Funcionários ({filteredFuncionarios.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFuncionarios.map((funcionario) => (
              <div
                key={funcionario.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{funcionario.nome}</h3>
                    <Badge variant={funcionario.status === "ativo" ? "default" : "secondary"}>
                      {funcionario.status}
                    </Badge>
                    <Badge variant="outline">{funcionario.cargo}</Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Mail className="mr-1 h-3 w-3" />
                      {funcionario.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-1 h-3 w-3" />
                      {funcionario.telefone}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {funcionario.turno}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Admitido em {new Date(funcionario.dataAdmissao).toLocaleDateString()} • {funcionario.salario}
                  </div>
                </div>
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-1 h-3 w-3" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Distribuição por Cargo */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Cargo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">4</div>
              <p className="text-sm text-gray-600">Porteiros</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">3</div>
              <p className="text-sm text-gray-600">Faxineiros</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">2</div>
              <p className="text-sm text-gray-600">Zeladores</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <p className="text-sm text-gray-600">Administrativos</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
