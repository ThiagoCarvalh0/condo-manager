"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { History, Calendar, DollarSign, Wrench, Users, FileText } from "lucide-react"

const mockHistorico = [
  {
    id: "1",
    tipo: "pagamento",
    titulo: "Pagamento de Condomínio",
    descricao: "Boleto de junho/2024 pago",
    data: "2024-06-08",
    valor: 450.75,
    status: "concluido",
  },
  {
    id: "2",
    tipo: "solicitacao",
    titulo: "Solicitação de Manutenção",
    descricao: "Reparo na torneira do banheiro",
    data: "2024-06-15",
    status: "concluido",
  },
  {
    id: "3",
    tipo: "visitante",
    titulo: "Visitante Autorizado",
    descricao: "Maria Silva - Visita familiar",
    data: "2024-06-20",
    status: "concluido",
  },
  {
    id: "4",
    tipo: "reserva",
    titulo: "Reserva do Salão de Festas",
    descricao: "Festa de aniversário - 30 pessoas",
    data: "2024-06-25",
    valor: 150.0,
    status: "concluido",
  },
  {
    id: "5",
    tipo: "pagamento",
    titulo: "Pagamento de Condomínio",
    descricao: "Boleto de julho/2024 pago",
    data: "2024-07-08",
    valor: 450.75,
    status: "concluido",
  },
  {
    id: "6",
    tipo: "comunicacao",
    titulo: "Mensagem para Síndico",
    descricao: "Dúvida sobre taxa extra no boleto",
    data: "2024-07-02",
    status: "respondido",
  },
]

export default function HistoricoUnidadePage() {
  const { user } = useAuth()

  if (!user || user.role !== "morador") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas moradores podem acessar esta página.</p>
      </div>
    )
  }

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "pagamento":
        return <DollarSign className="h-5 w-5 text-green-600" />
      case "solicitacao":
        return <Wrench className="h-5 w-5 text-blue-600" />
      case "visitante":
        return <Users className="h-5 w-5 text-purple-600" />
      case "reserva":
        return <Calendar className="h-5 w-5 text-orange-600" />
      case "comunicacao":
        return <FileText className="h-5 w-5 text-indigo-600" />
      default:
        return <History className="h-5 w-5 text-gray-600" />
    }
  }

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "pagamento":
        return <Badge className="bg-green-100 text-green-800">Pagamento</Badge>
      case "solicitacao":
        return <Badge className="bg-blue-100 text-blue-800">Solicitação</Badge>
      case "visitante":
        return <Badge className="bg-purple-100 text-purple-800">Visitante</Badge>
      case "reserva":
        return <Badge className="bg-orange-100 text-orange-800">Reserva</Badge>
      case "comunicacao":
        return <Badge className="bg-indigo-100 text-indigo-800">Comunicação</Badge>
      default:
        return <Badge variant="secondary">Outro</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "concluido":
        return <Badge className="bg-green-100 text-green-800">Concluído</Badge>
      case "respondido":
        return <Badge className="bg-blue-100 text-blue-800">Respondido</Badge>
      case "pendente":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>
      default:
        return <Badge variant="secondary">-</Badge>
    }
  }

  // Agrupar por mês
  const historicoAgrupado = mockHistorico.reduce(
    (acc, item) => {
      const data = new Date(item.data)
      const chave = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}`
      const nomeChave = data.toLocaleDateString("pt-BR", { year: "numeric", month: "long" })

      if (!acc[chave]) {
        acc[chave] = { nome: nomeChave, itens: [] }
      }
      acc[chave].itens.push(item)
      return acc
    },
    {} as Record<string, { nome: string; itens: typeof mockHistorico }>,
  )

  const mesesOrdenados = Object.keys(historicoAgrupado).sort().reverse()

  const totalPagamentos = mockHistorico.filter((h) => h.tipo === "pagamento").length
  const totalSolicitacoes = mockHistorico.filter((h) => h.tipo === "solicitacao").length
  const totalAtividades = mockHistorico.length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Histórico da Unidade</h1>
        <p className="text-gray-600">Acompanhe todas as atividades relacionadas à sua unidade</p>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Atividades</p>
                <p className="text-lg font-bold text-gray-900">{totalAtividades}</p>
              </div>
              <History className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pagamentos</p>
                <p className="text-lg font-bold text-gray-900">{totalPagamentos}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Solicitações</p>
                <p className="text-lg font-bold text-gray-900">{totalSolicitacoes}</p>
              </div>
              <Wrench className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Histórico Agrupado por Mês */}
      <div className="space-y-6">
        {mesesOrdenados.map((chave) => (
          <Card key={chave}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                {historicoAgrupado[chave].nome}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {historicoAgrupado[chave].itens
                  .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
                  .map((item) => (
                    <div key={item.id} className="flex items-start space-x-4 p-3 border rounded-lg">
                      {getTipoIcon(item.tipo)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900">{item.titulo}</h4>
                          {getTipoBadge(item.tipo)}
                          {getStatusBadge(item.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{item.descricao}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{new Date(item.data).toLocaleDateString("pt-BR")}</span>
                          {item.valor && <span>R$ {item.valor.toFixed(2)}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resumo por Tipo de Atividade */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo por Tipo de Atividade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="font-medium">Pagamentos</p>
              <p className="text-sm text-gray-600">{mockHistorico.filter((h) => h.tipo === "pagamento").length}</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Wrench className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="font-medium">Solicitações</p>
              <p className="text-sm text-gray-600">{mockHistorico.filter((h) => h.tipo === "solicitacao").length}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="font-medium">Visitantes</p>
              <p className="text-sm text-gray-600">{mockHistorico.filter((h) => h.tipo === "visitante").length}</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Calendar className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <p className="font-medium">Reservas</p>
              <p className="text-sm text-gray-600">{mockHistorico.filter((h) => h.tipo === "reserva").length}</p>
            </div>
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <FileText className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
              <p className="font-medium">Comunicação</p>
              <p className="text-sm text-gray-600">{mockHistorico.filter((h) => h.tipo === "comunicacao").length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
