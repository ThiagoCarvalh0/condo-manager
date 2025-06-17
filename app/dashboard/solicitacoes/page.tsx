"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { Wrench, Plus, Clock, CheckCircle, AlertCircle, Eye } from "lucide-react"
import Link from "next/link"

const mockSolicitacoes = [
  {
    id: "1",
    titulo: "Vazamento no banheiro",
    categoria: "Hidráulica",
    status: "em_andamento",
    prioridade: "alta",
    dataAbertura: "2024-07-05",
    descricao: "Vazamento na torneira do banheiro principal",
    responsavel: "João Silva - Zelador",
  },
  {
    id: "2",
    titulo: "Lâmpada queimada no corredor",
    categoria: "Elétrica",
    status: "concluida",
    prioridade: "baixa",
    dataAbertura: "2024-07-01",
    dataConclusao: "2024-07-02",
    descricao: "Lâmpada do corredor do 5º andar queimada",
    responsavel: "Pedro Santos - Eletricista",
  },
  {
    id: "3",
    titulo: "Porta do apartamento com problema",
    categoria: "Marcenaria",
    status: "aguardando",
    prioridade: "media",
    dataAbertura: "2024-06-28",
    descricao: "Fechadura da porta principal com defeito",
    responsavel: "Aguardando atribuição",
  },
]

export default function SolicitacoesPage() {
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
      case "aguardando":
        return <Badge className="bg-yellow-100 text-yellow-800">Aguardando</Badge>
      case "em_andamento":
        return <Badge className="bg-blue-100 text-blue-800">Em Andamento</Badge>
      case "concluida":
        return <Badge className="bg-green-100 text-green-800">Concluída</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  const getPrioridadeBadge = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return <Badge variant="destructive">Alta</Badge>
      case "media":
        return <Badge className="bg-orange-100 text-orange-800">Média</Badge>
      case "baixa":
        return <Badge className="bg-gray-100 text-gray-800">Baixa</Badge>
      default:
        return <Badge variant="secondary">-</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "aguardando":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "em_andamento":
        return <AlertCircle className="h-5 w-5 text-blue-600" />
      case "concluida":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  const solicitacoesAbertas = mockSolicitacoes.filter((s) => s.status !== "concluida").length
  const solicitacoesConcluidas = mockSolicitacoes.filter((s) => s.status === "concluida").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Minhas Solicitações</h1>
          <p className="text-gray-600">Acompanhe suas solicitações de manutenção e reparo</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/solicitacoes/nova">
            <Plus className="h-4 w-4 mr-2" />
            Nova Solicitação
          </Link>
        </Button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Solicitações</p>
                <p className="text-lg font-bold text-gray-900">{mockSolicitacoes.length}</p>
              </div>
              <Wrench className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Em Aberto</p>
                <p className="text-lg font-bold text-gray-900">{solicitacoesAbertas}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Concluídas</p>
                <p className="text-lg font-bold text-gray-900">{solicitacoesConcluidas}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Solicitações */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Solicitações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockSolicitacoes.map((solicitacao) => (
              <div key={solicitacao.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(solicitacao.status)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium text-gray-900">{solicitacao.titulo}</h3>
                        {getStatusBadge(solicitacao.status)}
                        {getPrioridadeBadge(solicitacao.prioridade)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{solicitacao.descricao}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-500">
                        <p>
                          <strong>Categoria:</strong> {solicitacao.categoria}
                        </p>
                        <p>
                          <strong>Abertura:</strong> {new Date(solicitacao.dataAbertura).toLocaleDateString("pt-BR")}
                        </p>
                        {solicitacao.dataConclusao && (
                          <p>
                            <strong>Conclusão:</strong>{" "}
                            {new Date(solicitacao.dataConclusao).toLocaleDateString("pt-BR")}
                          </p>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        <strong>Responsável:</strong> {solicitacao.responsavel}
                      </p>
                    </div>
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
    </div>
  )
}
