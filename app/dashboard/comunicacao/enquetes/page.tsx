"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { MessageSquare, BarChart3, Clock, CheckCircle, Users } from "lucide-react"
import { useState } from "react"

const mockEnquetes = [
  {
    id: "1",
    titulo: "Horário de funcionamento da piscina",
    descricao: "Qual seria o melhor horário para funcionamento da piscina nos finais de semana?",
    opcoes: [
      { id: "a", texto: "8h às 18h", votos: 15 },
      { id: "b", texto: "9h às 19h", votos: 23 },
      { id: "c", texto: "10h às 20h", votos: 8 },
    ],
    status: "ativa",
    dataInicio: "2024-07-01",
    dataFim: "2024-07-15",
    totalVotos: 46,
    jaVotou: false,
    autor: "Síndico - Maria Silva",
  },
  {
    id: "2",
    titulo: "Reforma da área de lazer",
    descricao: "Qual área de lazer deveria ser priorizada para reforma?",
    opcoes: [
      { id: "a", texto: "Playground infantil", votos: 32 },
      { id: "b", texto: "Quadra esportiva", votos: 18 },
      { id: "c", texto: "Salão de festas", votos: 25 },
      { id: "d", texto: "Academia", votos: 12 },
    ],
    status: "finalizada",
    dataInicio: "2024-06-15",
    dataFim: "2024-06-30",
    totalVotos: 87,
    jaVotou: true,
    votoEscolhido: "a",
    autor: "Administradora - Silva & Associados",
  },
  {
    id: "3",
    titulo: "Implementação de sistema de delivery",
    descricao: "Você é favorável à implementação de um sistema de recebimento de delivery na portaria?",
    opcoes: [
      { id: "a", texto: "Sim, muito favorável", votos: 28 },
      { id: "b", texto: "Sim, mas com restrições", votos: 15 },
      { id: "c", texto: "Não, prefiro receber diretamente", votos: 7 },
    ],
    status: "ativa",
    dataInicio: "2024-07-05",
    dataFim: "2024-07-20",
    totalVotos: 50,
    jaVotou: true,
    votoEscolhido: "a",
    autor: "Comissão de Melhorias",
  },
]

export default function EnquetesPage() {
  const { user } = useAuth()
  const [votandoEm, setVotandoEm] = useState<string | null>(null)

  if (!user || user.role !== "morador") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas moradores podem acessar esta página.</p>
      </div>
    )
  }

  const handleVotar = async (enqueteId: string, opcaoId: string) => {
    setVotandoEm(enqueteId)
    // Simular voto
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setVotandoEm(null)
    // Aqui atualizaria o estado da enquete
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativa":
        return <Badge className="bg-green-100 text-green-800">Ativa</Badge>
      case "finalizada":
        return <Badge className="bg-gray-100 text-gray-800">Finalizada</Badge>
      case "rascunho":
        return <Badge className="bg-yellow-100 text-yellow-800">Rascunho</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  const enquetesAtivas = mockEnquetes.filter((e) => e.status === "ativa").length
  const enquetesParticipadas = mockEnquetes.filter((e) => e.jaVotou).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Enquetes</h1>
        <p className="text-gray-600">Participe das decisões do condomínio votando nas enquetes</p>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Enquetes</p>
                <p className="text-lg font-bold text-gray-900">{mockEnquetes.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Enquetes Ativas</p>
                <p className="text-lg font-bold text-gray-900">{enquetesAtivas}</p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Participei</p>
                <p className="text-lg font-bold text-gray-900">{enquetesParticipadas}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Enquetes */}
      <div className="space-y-6">
        {mockEnquetes.map((enquete) => (
          <Card key={enquete.id} className={enquete.status === "ativa" ? "border-green-200" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium text-gray-900">{enquete.titulo}</h3>
                    {getStatusBadge(enquete.status)}
                    {enquete.jaVotou && <Badge className="bg-blue-100 text-blue-800">Você votou</Badge>}
                  </div>
                  <p className="text-gray-600 mb-3">{enquete.descricao}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {enquete.totalVotos} votos
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Até {new Date(enquete.dataFim).toLocaleDateString("pt-BR")}
                    </span>
                    <span>Por: {enquete.autor}</span>
                  </div>
                </div>
                <BarChart3 className="h-6 w-6 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {enquete.opcoes.map((opcao) => {
                  const porcentagem = enquete.totalVotos > 0 ? (opcao.votos / enquete.totalVotos) * 100 : 0
                  const isEscolhida = enquete.votoEscolhido === opcao.id

                  return (
                    <div key={opcao.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {enquete.status === "ativa" && !enquete.jaVotou ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleVotar(enquete.id, opcao.id)}
                              disabled={votandoEm === enquete.id}
                            >
                              {votandoEm === enquete.id ? "Votando..." : "Votar"}
                            </Button>
                          ) : (
                            <div className="w-16" />
                          )}
                          <span className={`${isEscolhida ? "font-semibold text-blue-600" : ""}`}>
                            {opcao.texto}
                            {isEscolhida && " ✓"}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium">{opcao.votos} votos</span>
                          <span className="text-xs text-gray-500 ml-2">({porcentagem.toFixed(1)}%)</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${isEscolhida ? "bg-blue-600" : "bg-gray-400"}`}
                          style={{ width: `${porcentagem}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
