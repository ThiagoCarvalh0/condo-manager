"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { Calendar, Clock, Users, MapPin } from "lucide-react"

const mockEventosAgenda = [
  {
    id: "1",
    titulo: "Festa de Aniversário - Apt 301",
    espaco: "Salão de Festas",
    data: "2024-07-20",
    horaInicio: "19:00",
    horaFim: "23:00",
    tipo: "festa",
    responsavel: "Maria Silva",
  },
  {
    id: "2",
    titulo: "Reunião do Conselho",
    espaco: "Salão de Festas",
    data: "2024-07-18",
    horaInicio: "19:30",
    horaFim: "21:00",
    tipo: "reuniao",
    responsavel: "Administração",
  },
  {
    id: "3",
    titulo: "Churrasco Família Santos - Apt 205",
    espaco: "Churrasqueira",
    data: "2024-07-21",
    horaInicio: "12:00",
    horaFim: "18:00",
    tipo: "confraternizacao",
    responsavel: "João Santos",
  },
  {
    id: "4",
    titulo: "Treino de Futebol",
    espaco: "Quadra Esportiva",
    data: "2024-07-22",
    horaInicio: "16:00",
    horaFim: "18:00",
    tipo: "esporte",
    responsavel: "Grupo de Moradores",
  },
  {
    id: "5",
    titulo: "Assembleia Geral Ordinária",
    espaco: "Salão de Festas",
    data: "2024-07-25",
    horaInicio: "19:00",
    horaFim: "21:00",
    tipo: "assembleia",
    responsavel: "Síndico",
  },
  {
    id: "6",
    titulo: "Festa Infantil - Apt 102",
    espaco: "Área da Piscina",
    data: "2024-07-27",
    horaInicio: "14:00",
    horaFim: "18:00",
    tipo: "festa",
    responsavel: "Ana Costa",
  },
]

export default function AgendaEventosPage() {
  const { user } = useAuth()

  if (!user || user.role !== "morador") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas moradores podem acessar esta página.</p>
      </div>
    )
  }

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "festa":
        return <Badge className="bg-purple-100 text-purple-800">Festa</Badge>
      case "reuniao":
        return <Badge className="bg-blue-100 text-blue-800">Reunião</Badge>
      case "assembleia":
        return <Badge className="bg-red-100 text-red-800">Assembleia</Badge>
      case "confraternizacao":
        return <Badge className="bg-green-100 text-green-800">Confraternização</Badge>
      case "esporte":
        return <Badge className="bg-orange-100 text-orange-800">Esporte</Badge>
      default:
        return <Badge variant="secondary">Outro</Badge>
    }
  }

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "festa":
      case "confraternizacao":
        return <Users className="h-5 w-5 text-purple-600" />
      case "reuniao":
      case "assembleia":
        return <Users className="h-5 w-5 text-blue-600" />
      case "esporte":
        return <Users className="h-5 w-5 text-orange-600" />
      default:
        return <Calendar className="h-5 w-5 text-gray-600" />
    }
  }

  // Agrupar eventos por data
  const eventosPorData = mockEventosAgenda.reduce(
    (acc, evento) => {
      const data = evento.data
      if (!acc[data]) {
        acc[data] = []
      }
      acc[data].push(evento)
      return acc
    },
    {} as Record<string, typeof mockEventosAgenda>,
  )

  // Ordenar datas
  const datasOrdenadas = Object.keys(eventosPorData).sort()

  const eventosHoje = mockEventosAgenda.filter((e) => e.data === new Date().toISOString().split("T")[0]).length
  const eventosProximosSete = mockEventosAgenda.filter((e) => {
    const dataEvento = new Date(e.data)
    const hoje = new Date()
    const seteDias = new Date()
    seteDias.setDate(hoje.getDate() + 7)
    return dataEvento >= hoje && dataEvento <= seteDias
  }).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Agenda de Eventos</h1>
        <p className="text-gray-600">Veja todos os eventos e reservas programados no condomínio</p>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Eventos</p>
                <p className="text-lg font-bold text-gray-900">{mockEventosAgenda.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Eventos Hoje</p>
                <p className="text-lg font-bold text-gray-900">{eventosHoje}</p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Próximos 7 dias</p>
                <p className="text-lg font-bold text-gray-900">{eventosProximosSete}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agenda por Data */}
      <div className="space-y-6">
        {datasOrdenadas.map((data) => (
          <Card key={data}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                {new Date(data).toLocaleDateString("pt-BR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eventosPorData[data]
                  .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio))
                  .map((evento) => (
                    <div key={evento.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                      {getTipoIcon(evento.tipo)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-900">{evento.titulo}</h4>
                          {getTipoBadge(evento.tipo)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {evento.espaco}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {evento.horaInicio} às {evento.horaFim}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {evento.responsavel}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Espaços e Disponibilidade */}
      <Card>
        <CardHeader>
          <CardTitle>Disponibilidade dos Espaços</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <MapPin className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="font-medium">Salão de Festas</p>
              <p className="text-sm text-gray-600">3 eventos agendados</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <MapPin className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="font-medium">Churrasqueira</p>
              <p className="text-sm text-gray-600">1 evento agendado</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <MapPin className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <p className="font-medium">Quadra Esportiva</p>
              <p className="text-sm text-gray-600">1 evento agendado</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <MapPin className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="font-medium">Área da Piscina</p>
              <p className="text-sm text-gray-600">1 evento agendado</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
