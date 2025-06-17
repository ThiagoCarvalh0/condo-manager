"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { Bell, Calendar, AlertTriangle, Info, CheckCircle } from "lucide-react"

const mockAvisos = [
  {
    id: "1",
    titulo: "Manutenção do Elevador Social",
    conteudo:
      "Informamos que será realizada manutenção preventiva no elevador social no dia 05/07/2024, das 8h às 12h. Durante este período, o elevador ficará indisponível. Pedimos a compreensão de todos.",
    tipo: "manutencao",
    prioridade: "alta",
    dataPublicacao: "2024-07-03",
    dataEvento: "2024-07-05",
    lido: false,
    autor: "Síndico - Maria Silva",
  },
  {
    id: "2",
    titulo: "Assembleia Geral Ordinária",
    conteudo:
      "Convocamos todos os condôminos para a Assembleia Geral Ordinária que será realizada no dia 15/07/2024, às 19h, no Salão de Festas. Pauta: aprovação das contas, eleição do síndico e discussão sobre melhorias.",
    tipo: "assembleia",
    prioridade: "alta",
    dataPublicacao: "2024-07-01",
    dataEvento: "2024-07-15",
    lido: true,
    autor: "Administradora - Silva & Associados",
  },
  {
    id: "3",
    titulo: "Festa Junina do Condomínio",
    conteudo:
      "Venha participar da nossa Festa Junina! Será no dia 29/06/2024, a partir das 18h, no Salão de Festas. Haverá comidas típicas, quadrilha e muita diversão para toda a família.",
    tipo: "evento",
    prioridade: "baixa",
    dataPublicacao: "2024-06-20",
    dataEvento: "2024-06-29",
    lido: true,
    autor: "Comissão de Festas",
  },
  {
    id: "4",
    titulo: "Limpeza da Caixa D'água",
    conteudo:
      "Será realizada a limpeza semestral da caixa d'água no dia 12/07/2024, das 9h às 15h. Durante este período, poderá haver intermitência no fornecimento de água. Recomendamos armazenar água para uso.",
    tipo: "manutencao",
    prioridade: "media",
    dataPublicacao: "2024-07-08",
    dataEvento: "2024-07-12",
    lido: false,
    autor: "Zelador - João Santos",
  },
]

export default function AvisosPage() {
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
      case "manutencao":
        return <AlertTriangle className="h-5 w-5 text-orange-600" />
      case "assembleia":
        return <Calendar className="h-5 w-5 text-red-600" />
      case "evento":
        return <Calendar className="h-5 w-5 text-purple-600" />
      default:
        return <Info className="h-5 w-5 text-blue-600" />
    }
  }

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "manutencao":
        return <Badge className="bg-orange-100 text-orange-800">Manutenção</Badge>
      case "assembleia":
        return <Badge className="bg-red-100 text-red-800">Assembleia</Badge>
      case "evento":
        return <Badge className="bg-purple-100 text-purple-800">Evento</Badge>
      default:
        return <Badge className="bg-blue-100 text-blue-800">Informativo</Badge>
    }
  }

  const getPrioridadeBadge = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return <Badge variant="destructive">Alta</Badge>
      case "media":
        return <Badge className="bg-yellow-100 text-yellow-800">Média</Badge>
      case "baixa":
        return <Badge className="bg-green-100 text-green-800">Baixa</Badge>
      default:
        return <Badge variant="secondary">-</Badge>
    }
  }

  const avisosNaoLidos = mockAvisos.filter((a) => !a.lido).length
  const avisosHoje = mockAvisos.filter((a) => a.dataPublicacao === new Date().toISOString().split("T")[0]).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Avisos e Comunicados</h1>
        <p className="text-gray-600">Fique por dentro de todas as informações do condomínio</p>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Avisos</p>
                <p className="text-lg font-bold text-gray-900">{mockAvisos.length}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Não Lidos</p>
                <p className="text-lg font-bold text-gray-900">{avisosNaoLidos}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Publicados Hoje</p>
                <p className="text-lg font-bold text-gray-900">{avisosHoje}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Avisos */}
      <div className="space-y-4">
        {mockAvisos.map((aviso) => (
          <Card key={aviso.id} className={`${!aviso.lido ? "border-l-4 border-l-blue-500 bg-blue-50" : ""}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getTipoIcon(aviso.tipo)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-gray-900">{aviso.titulo}</h3>
                      {!aviso.lido && <Badge className="bg-blue-600">Novo</Badge>}
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTipoBadge(aviso.tipo)}
                      {getPrioridadeBadge(aviso.prioridade)}
                    </div>
                  </div>
                </div>
                {aviso.lido && <CheckCircle className="h-5 w-5 text-green-500" />}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{aviso.conteudo}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-500">
                <p>
                  <strong>Publicado em:</strong> {new Date(aviso.dataPublicacao).toLocaleDateString("pt-BR")}
                </p>
                {aviso.dataEvento && (
                  <p>
                    <strong>Data do evento:</strong> {new Date(aviso.dataEvento).toLocaleDateString("pt-BR")}
                  </p>
                )}
                <p>
                  <strong>Por:</strong> {aviso.autor}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filtros Rápidos */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros Rápidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100">
              <Bell className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="font-medium">Todos</p>
              <p className="text-sm text-gray-600">{mockAvisos.length} avisos</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100">
              <AlertTriangle className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <p className="font-medium">Manutenção</p>
              <p className="text-sm text-gray-600">{mockAvisos.filter((a) => a.tipo === "manutencao").length} avisos</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100">
              <Calendar className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <p className="font-medium">Assembleias</p>
              <p className="text-sm text-gray-600">{mockAvisos.filter((a) => a.tipo === "assembleia").length} avisos</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100">
              <Calendar className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="font-medium">Eventos</p>
              <p className="text-sm text-gray-600">{mockAvisos.filter((a) => a.tipo === "evento").length} avisos</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
