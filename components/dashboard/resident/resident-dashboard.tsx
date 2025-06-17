"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import {
  Home,
  MessageSquare,
  Calendar,
  Wrench,
  Bell,
  CreditCard,
  UserCheck,
  Phone,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock data para morador
const mockResidentData = {
  proximoVencimento: "10/07/2024",
  valorCondominio: 450.75,
  avisosNaoLidos: 2,
  eventosProximos: 1,
  solicitacoesAbertas: 1,
  visitantesHoje: 0,
  reservasAtivas: 1,
  statusBoleto: "pendente", // "pago", "pendente", "vencido"
}

export function ResidentDashboard() {
  const { user } = useAuth()

  if (!user || user.role !== "morador") return null

  const condominioAtual = user.condominios.find((c) => c.id === user.activeCondominioId)
  if (!condominioAtual) return <div>Erro ao carregar dados do condomínio</div>

  // Obter a primeira unidade do morador no condomínio atual
  const unidadeAtual =
    condominioAtual.unidades && condominioAtual.unidades.length > 0 ? condominioAtual.unidades[0] : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Olá, {user.name}!</h1>
        <p className="text-gray-600">
          Bem-vindo ao portal do morador do <span className="font-semibold">{condominioAtual.name}</span>.
        </p>
      </div>

      {/* Cards de Status Rápido */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Boleto Atual</p>
                <p className="text-lg font-bold text-gray-900">R$ {mockResidentData.valorCondominio.toFixed(2)}</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-2">
              {mockResidentData.statusBoleto === "pago" && <Badge className="bg-green-100 text-green-800">Pago</Badge>}
              {mockResidentData.statusBoleto === "pendente" && (
                <Badge className="bg-yellow-100 text-yellow-800">Vence em 3 dias</Badge>
              )}
              {mockResidentData.statusBoleto === "vencido" && (
                <Badge className="bg-red-100 text-red-800">Vencido</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avisos</p>
                <p className="text-lg font-bold text-gray-900">{mockResidentData.avisosNaoLidos}</p>
              </div>
              <Bell className="h-8 w-8 text-orange-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Não lidos</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Solicitações</p>
                <p className="text-lg font-bold text-gray-900">{mockResidentData.solicitacoesAbertas}</p>
              </div>
              <Wrench className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Em andamento</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reservas</p>
                <p className="text-lg font-bold text-gray-900">{mockResidentData.reservasAtivas}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Ativas</p>
          </CardContent>
        </Card>
      </div>

      {/* Informações da Unidade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Home className="mr-2 h-5 w-5" /> Minha Unidade
          </CardTitle>
          <CardDescription>
            {unidadeAtual
              ? `${unidadeAtual.tipo === "apartamento" ? "Apartamento" : unidadeAtual.tipo} ${unidadeAtual.bloco ? `${unidadeAtual.bloco} - ` : ""}${unidadeAtual.numero}`
              : "Unidade não especificada"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Proprietário</p>
              <p className="text-lg font-semibold">{user.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Condomínio</p>
              <p className="text-lg font-semibold">{condominioAtual.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Status</p>
              <Badge className="bg-green-100 text-green-800">Ativo</Badge>
            </div>
          </div>
          {user.condominios.length > 1 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                Você possui {user.condominios.length} unidades em diferentes condomínios. Use o seletor no topo para
                alternar entre elas.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ações Rápidas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <Link href="/dashboard/financeiro/boletos" className="block">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Meus Boletos</h3>
                  <p className="text-sm text-gray-600">Ver e baixar boletos</p>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <Link href="/dashboard/solicitacoes/nova" className="block">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Wrench className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Nova Solicitação</h3>
                  <p className="text-sm text-gray-600">Manutenção ou reparo</p>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <Link href="/dashboard/visitantes/autorizar" className="block">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <UserCheck className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Autorizar Visitante</h3>
                  <p className="text-sm text-gray-600">Liberar acesso</p>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <Link href="/dashboard/reservas/nova" className="block">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Reservar Espaço</h3>
                  <p className="text-sm text-gray-600">Salão, churrasqueira</p>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <Link href="/dashboard/comunicacao/sindico" className="block">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Falar com Síndico</h3>
                  <p className="text-sm text-gray-600">Enviar mensagem</p>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <Link href="/dashboard/emergencia" className="block">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <Phone className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Emergência</h3>
                  <p className="text-sm text-gray-600">Contatos importantes</p>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Avisos Recentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Avisos Recentes
            </span>
            <Link href="/dashboard/comunicacao/avisos">
              <Button variant="outline" size="sm">
                Ver Todos
              </Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-sm">Manutenção Elevador Social</p>
                <p className="text-xs text-gray-600">Agendada para 05/07/2024 das 8h às 12h</p>
                <Badge variant="outline" className="mt-1 text-xs">
                  Novo
                </Badge>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <Calendar className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-sm">Assembleia Geral Ordinária</p>
                <p className="text-xs text-gray-600">15/07/2024 às 19h no Salão de Festas</p>
                <Badge variant="outline" className="mt-1 text-xs">
                  Importante
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Atividades Recentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Minhas Atividades Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Boleto de junho pago</p>
                <p className="text-xs text-gray-500">Há 2 dias</p>
              </div>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Solicitação de reparo enviada</p>
                <p className="text-xs text-gray-500">Há 3 dias</p>
              </div>
              <Clock className="h-4 w-4 text-blue-500" />
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Reserva do salão confirmada</p>
                <p className="text-xs text-gray-500">Há 5 dias</p>
              </div>
              <CheckCircle className="h-4 w-4 text-purple-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
