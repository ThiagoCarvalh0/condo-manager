"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { AlertTriangle, Search, Calendar, DollarSign, Download, Mail, Phone, MapPin, Clock } from "lucide-react"

const mockInadimplentes = [
  {
    id: "1",
    nome: "João Silva",
    unidade: "Apto 101",
    bloco: "A",
    telefone: "(11) 99999-9999",
    email: "joao.silva@email.com",
    valorDevido: 1350.75,
    mesesAtraso: 3,
    ultimoPagamento: "2023-10-15",
    status: "critico",
    observacoes: "Tentativas de contato sem sucesso",
  },
  {
    id: "2",
    nome: "Maria Santos",
    unidade: "Apto 205",
    bloco: "B",
    telefone: "(11) 88888-8888",
    email: "maria.santos@email.com",
    valorDevido: 450.75,
    mesesAtraso: 1,
    ultimoPagamento: "2023-12-15",
    status: "moderado",
    observacoes: "Prometeu pagamento até final do mês",
  },
  {
    id: "3",
    nome: "Pedro Costa",
    unidade: "Apto 302",
    bloco: "C",
    telefone: "(11) 77777-7777",
    email: "pedro.costa@email.com",
    valorDevido: 901.5,
    mesesAtraso: 2,
    ultimoPagamento: "2023-11-15",
    status: "alto",
    observacoes: "Negociação em andamento",
  },
]

export default function InadimplenciaPage() {
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

  const filteredInadimplentes = mockInadimplentes.filter((inadimplente) => {
    const matchesSearch =
      inadimplente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inadimplente.unidade.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "todos" || inadimplente.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalDevido = filteredInadimplentes.reduce((sum, item) => sum + item.valorDevido, 0)
  const totalUnidades = filteredInadimplentes.length
  const mediaAtraso = filteredInadimplentes.reduce((sum, item) => sum + item.mesesAtraso, 0) / totalUnidades || 0

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inadimplência</h1>
          <p className="text-gray-600">Controle de inadimplência - {condominioAtual?.name}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Relatório
          </Button>
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Enviar Cobrança
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total em Atraso</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">R$ {totalDevido.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Valor total devido</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unidades Inadimplentes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{totalUnidades}</div>
            <p className="text-xs text-muted-foreground">{((totalUnidades / 156) * 100).toFixed(1)}% do total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média de Atraso</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{mediaAtraso.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Meses em atraso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Inadimplência</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{((totalUnidades / 156) * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Do total de unidades</p>
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
                placeholder="Buscar por nome ou unidade..."
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
                variant={filterStatus === "moderado" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("moderado")}
              >
                Moderado
              </Button>
              <Button
                variant={filterStatus === "alto" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("alto")}
              >
                Alto
              </Button>
              <Button
                variant={filterStatus === "critico" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("critico")}
              >
                Crítico
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Inadimplentes */}
      <Card>
        <CardHeader>
          <CardTitle>Inadimplentes ({filteredInadimplentes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInadimplentes.map((inadimplente) => (
              <div
                key={inadimplente.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{inadimplente.nome}</h3>
                    <Badge
                      variant={
                        inadimplente.status === "critico"
                          ? "destructive"
                          : inadimplente.status === "alto"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {inadimplente.status === "critico"
                        ? "Crítico"
                        : inadimplente.status === "alto"
                          ? "Alto Risco"
                          : "Moderado"}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3" />
                      {inadimplente.unidade} - Bloco {inadimplente.bloco}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="mr-1 h-3 w-3" />
                      R$ {inadimplente.valorDevido.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {inadimplente.mesesAtraso} mês(es) em atraso
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      Último: {new Date(inadimplente.ultimoPagamento).toLocaleDateString()}
                    </div>
                  </div>
                  {inadimplente.observacoes && (
                    <p className="text-sm text-gray-500 italic">{inadimplente.observacoes}</p>
                  )}
                </div>
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <Button variant="outline" size="sm">
                    <Phone className="mr-1 h-3 w-3" />
                    Ligar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="mr-1 h-3 w-3" />
                    Email
                  </Button>
                  <Button size="sm">Negociar</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
