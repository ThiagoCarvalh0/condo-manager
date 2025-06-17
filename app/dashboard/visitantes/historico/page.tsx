"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { UserCheck, Clock, Calendar, Eye } from "lucide-react"

const mockHistorico = [
  {
    id: "1",
    nomeVisitante: "Maria Silva",
    documento: "123.456.789-00",
    dataVisita: "2024-07-06",
    horaEntrada: "14:30",
    horaSaida: "16:45",
    status: "concluida",
    observacoes: "Visita familiar",
  },
  {
    id: "2",
    nomeVisitante: "João Santos",
    documento: "987.654.321-00",
    dataVisita: "2024-07-05",
    horaEntrada: "10:00",
    horaSaida: "12:30",
    status: "concluida",
    observacoes: "Técnico de internet",
  },
  {
    id: "3",
    nomeVisitante: "Ana Costa",
    documento: "456.789.123-00",
    dataVisita: "2024-07-08",
    horaEntrada: "19:00",
    horaSaida: null,
    status: "agendada",
    observacoes: "Jantar em família",
  },
  {
    id: "4",
    nomeVisitante: "Carlos Oliveira",
    documento: "789.123.456-00",
    dataVisita: "2024-07-03",
    horaEntrada: "15:00",
    horaSaida: "15:30",
    status: "concluida",
    observacoes: "Entrega de encomenda",
  },
]

export default function HistoricoVisitantesPage() {
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
      case "agendada":
        return <Badge className="bg-blue-100 text-blue-800">Agendada</Badge>
      case "em_andamento":
        return <Badge className="bg-yellow-100 text-yellow-800">Em Andamento</Badge>
      case "concluida":
        return <Badge className="bg-green-100 text-green-800">Concluída</Badge>
      case "cancelada":
        return <Badge className="bg-red-100 text-red-800">Cancelada</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  const visitasHoje = mockHistorico.filter((v) => v.dataVisita === new Date().toISOString().split("T")[0]).length
  const visitasAgendadas = mockHistorico.filter((v) => v.status === "agendada").length
  const totalVisitas = mockHistorico.length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Histórico de Visitantes</h1>
        <p className="text-gray-600">Acompanhe todas as visitas autorizadas em sua unidade</p>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Visitas</p>
                <p className="text-lg font-bold text-gray-900">{totalVisitas}</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Visitas Hoje</p>
                <p className="text-lg font-bold text-gray-900">{visitasHoje}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Agendadas</p>
                <p className="text-lg font-bold text-gray-900">{visitasAgendadas}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Visitantes */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico Completo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockHistorico.map((visita) => (
              <div key={visita.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-gray-900">{visita.nomeVisitante}</h3>
                      {getStatusBadge(visita.status)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm text-gray-600">
                      <p>
                        <strong>Documento:</strong> {visita.documento}
                      </p>
                      <p>
                        <strong>Data:</strong> {new Date(visita.dataVisita).toLocaleDateString("pt-BR")}
                      </p>
                      <p>
                        <strong>Entrada:</strong> {visita.horaEntrada}
                      </p>
                      <p>
                        <strong>Saída:</strong> {visita.horaSaida || "Não registrada"}
                      </p>
                    </div>
                    {visita.observacoes && (
                      <p className="text-sm text-gray-500 mt-2">
                        <strong>Observações:</strong> {visita.observacoes}
                      </p>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Visitantes Frequentes */}
      <Card>
        <CardHeader>
          <CardTitle>Visitantes Frequentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Maria Silva</p>
                  <p className="text-sm text-gray-600">Familiar - 5 visitas</p>
                </div>
                <Button variant="outline" size="sm">
                  Autorizar Novamente
                </Button>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">João Santos</p>
                  <p className="text-sm text-gray-600">Prestador - 3 visitas</p>
                </div>
                <Button variant="outline" size="sm">
                  Autorizar Novamente
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
