"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { Calendar, Plus, Clock, CheckCircle, X, Eye } from "lucide-react"
import Link from "next/link"

const mockReservas = [
  {
    id: "1",
    espaco: "Salão de Festas",
    data: "2024-07-20",
    horaInicio: "19:00",
    horaFim: "23:00",
    status: "confirmada",
    evento: "Aniversário de 15 anos",
    observacoes: "Festa para 50 pessoas",
    valor: 150.0,
    dataSolicitacao: "2024-07-01",
  },
  {
    id: "2",
    espaco: "Churrasqueira",
    data: "2024-07-15",
    horaInicio: "12:00",
    horaFim: "18:00",
    status: "confirmada",
    evento: "Almoço em família",
    observacoes: "Reunião familiar",
    valor: 80.0,
    dataSolicitacao: "2024-06-28",
  },
  {
    id: "3",
    espaco: "Quadra Esportiva",
    data: "2024-07-25",
    horaInicio: "16:00",
    horaFim: "18:00",
    status: "pendente",
    evento: "Jogo de futebol",
    observacoes: "Partida entre amigos",
    valor: 0.0,
    dataSolicitacao: "2024-07-05",
  },
  {
    id: "4",
    espaco: "Salão de Festas",
    data: "2024-06-30",
    horaInicio: "14:00",
    horaFim: "18:00",
    status: "realizada",
    evento: "Festa Junina",
    observacoes: "Festa temática",
    valor: 150.0,
    dataSolicitacao: "2024-06-15",
  },
]

export default function ReservasPage() {
  const { user } = useAuth()

  if (!user || user.role !== "morador") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas moradores podem acessar esta página.</p>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmada":
        return <Badge className="bg-green-100 text-green-800">Confirmada</Badge>
      case "pendente":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>
      case "cancelada":
        return <Badge className="bg-red-100 text-red-800">Cancelada</Badge>
      case "realizada":
        return <Badge className="bg-blue-100 text-blue-800">Realizada</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmada":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "pendente":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "cancelada":
        return <X className="h-5 w-5 text-red-600" />
      case "realizada":
        return <CheckCircle className="h-5 w-5 text-blue-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  const reservasAtivas = mockReservas.filter((r) => r.status === "confirmada" || r.status === "pendente").length
  const proximaReserva = mockReservas
    .filter((r) => new Date(r.data) >= new Date() && (r.status === "confirmada" || r.status === "pendente"))
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())[0]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Minhas Reservas</h1>
          <p className="text-gray-600">Gerencie suas reservas de espaços do condomínio</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/reservas/nova">
            <Plus className="h-4 w-4 mr-2" />
            Nova Reserva
          </Link>
        </Button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Reservas</p>
                <p className="text-lg font-bold text-gray-900">{mockReservas.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reservas Ativas</p>
                <p className="text-lg font-bold text-gray-900">{reservasAtivas}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Próxima Reserva</p>
                <p className="text-lg font-bold text-gray-900">
                  {proximaReserva ? new Date(proximaReserva.data).toLocaleDateString("pt-BR") : "Nenhuma"}
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
            {proximaReserva && <p className="text-xs text-gray-500 mt-1">{proximaReserva.espaco}</p>}
          </CardContent>
        </Card>
      </div>

      {/* Próxima Reserva Destacada */}
      {proximaReserva && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-900">Próxima Reserva</h3>
                <p className="text-green-700">
                  <strong>{proximaReserva.espaco}</strong> - {new Date(proximaReserva.data).toLocaleDateString("pt-BR")}{" "}
                  das {proximaReserva.horaInicio} às {proximaReserva.horaFim}
                </p>
                <p className="text-green-600 text-sm">{proximaReserva.evento}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Reservas */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Reservas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReservas.map((reserva) => (
              <div key={reserva.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(reserva.status)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium text-gray-900">{reserva.espaco}</h3>
                        {getStatusBadge(reserva.status)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{reserva.evento}</p>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs text-gray-500">
                        <p>
                          <strong>Data:</strong> {new Date(reserva.data).toLocaleDateString("pt-BR")}
                        </p>
                        <p>
                          <strong>Horário:</strong> {reserva.horaInicio} às {reserva.horaFim}
                        </p>
                        <p>
                          <strong>Valor:</strong> {reserva.valor > 0 ? `R$ ${reserva.valor.toFixed(2)}` : "Gratuito"}
                        </p>
                        <p>
                          <strong>Solicitado em:</strong>{" "}
                          {new Date(reserva.dataSolicitacao).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      {reserva.observacoes && (
                        <p className="text-xs text-gray-500 mt-1">
                          <strong>Observações:</strong> {reserva.observacoes}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Detalhes
                    </Button>
                    {reserva.status === "pendente" && (
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        Cancelar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Espaços Disponíveis */}
      <Card>
        <CardHeader>
          <CardTitle>Espaços Disponíveis para Reserva</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900">Salão de Festas</h4>
              <p className="text-sm text-gray-600 mb-2">Capacidade: 80 pessoas</p>
              <p className="text-sm font-medium text-green-600">R$ 150,00 / evento</p>
              <Button variant="outline" size="sm" className="mt-2 w-full">
                Reservar
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900">Churrasqueira</h4>
              <p className="text-sm text-gray-600 mb-2">Capacidade: 30 pessoas</p>
              <p className="text-sm font-medium text-green-600">R$ 80,00 / evento</p>
              <Button variant="outline" size="sm" className="mt-2 w-full">
                Reservar
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900">Quadra Esportiva</h4>
              <p className="text-sm text-gray-600 mb-2">Futebol, vôlei, basquete</p>
              <p className="text-sm font-medium text-green-600">Gratuito</p>
              <Button variant="outline" size="sm" className="mt-2 w-full">
                Reservar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
