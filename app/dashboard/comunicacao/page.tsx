"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { MessageSquare, Users, Bell, Send, Eye, Calendar, Plus, BarChart3 } from "lucide-react"
import Link from "next/link"

const mockComunicacoes = [
  {
    id: "1",
    titulo: "Manutenção do elevador",
    tipo: "aviso",
    data: "2024-01-15",
    visualizacoes: 89,
    status: "ativo",
  },
  {
    id: "2",
    titulo: "Assembleia Geral Ordinária",
    tipo: "assembleia",
    data: "2024-01-10",
    visualizacoes: 156,
    status: "ativo",
  },
  {
    id: "3",
    titulo: "Enquete sobre horário da piscina",
    tipo: "enquete",
    data: "2024-01-08",
    visualizacoes: 67,
    status: "encerrado",
  },
]

export default function ComunicacaoAdminPage() {
  const { user } = useAuth()

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas administradores podem acessar esta página.</p>
      </div>
    )
  }

  const condominioAtual = user.condominios.find((c) => c.id === user.activeCondominioId)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Comunicação</h1>
          <p className="text-gray-600">Gerencie comunicações com moradores - {condominioAtual?.name}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Relatórios
          </Button>
          <Button asChild>
            <Link href="/dashboard/comunicacao/novo-aviso">
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
            <CardTitle className="text-sm font-medium">Avisos Ativos</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Publicados este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Visualização</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Média dos últimos avisos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enquetes Ativas</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Aguardando participação</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensagens Recebidas</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Esta semana</p>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button asChild variant="outline" className="h-20 flex-col">
          <Link href="/dashboard/comunicacao/avisos">
            <Bell className="h-6 w-6 mb-2" />
            <span>Gerenciar Avisos</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-20 flex-col">
          <Link href="/dashboard/comunicacao/enquetes">
            <MessageSquare className="h-6 w-6 mb-2" />
            <span>Enquetes</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-20 flex-col">
          <Link href="/dashboard/comunicacao/mensagens">
            <Send className="h-6 w-6 mb-2" />
            <span>Mensagens</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-20 flex-col">
          <Link href="/dashboard/comunicacao/assembleia">
            <Users className="h-6 w-6 mb-2" />
            <span>Assembleias</span>
          </Link>
        </Button>
      </div>

      {/* Comunicações Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Comunicações Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockComunicacoes.map((comunicacao) => (
              <div
                key={comunicacao.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold">{comunicacao.titulo}</h3>
                    <Badge variant="outline">{comunicacao.tipo}</Badge>
                    <Badge variant={comunicacao.status === "ativo" ? "default" : "secondary"}>
                      {comunicacao.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(comunicacao.data).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Eye className="mr-1 h-3 w-3" />
                      {comunicacao.visualizacoes} visualizações
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
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
    </div>
  )
}
