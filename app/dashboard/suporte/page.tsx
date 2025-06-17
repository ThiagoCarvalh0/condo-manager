"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { HelpCircle, MessageSquare, Phone, Mail, Book, Video, ExternalLink, Clock } from "lucide-react"

const mockTickets = [
  {
    id: "1",
    titulo: "Dúvida sobre emissão de boletos",
    status: "aberto",
    prioridade: "media",
    dataAbertura: "2024-01-15",
    ultimaResposta: "2024-01-16",
  },
  {
    id: "2",
    titulo: "Problema com login de morador",
    status: "em_andamento",
    prioridade: "alta",
    dataAbertura: "2024-01-14",
    ultimaResposta: "2024-01-15",
  },
  {
    id: "3",
    titulo: "Solicitação de nova funcionalidade",
    status: "resolvido",
    prioridade: "baixa",
    dataAbertura: "2024-01-10",
    ultimaResposta: "2024-01-12",
  },
]

const faqItems = [
  {
    pergunta: "Como adicionar um novo morador?",
    resposta: "Acesse Pessoas > Adicionar Nova Pessoa e preencha os dados necessários.",
  },
  {
    pergunta: "Como emitir boletos em lote?",
    resposta: "Vá para Financeiro > Emitir Boletos e selecione o período desejado.",
  },
  {
    pergunta: "Como configurar as taxas do condomínio?",
    resposta: "Acesse Configurações > Configurações Financeiras para definir valores e taxas.",
  },
]

export default function SuportePage() {
  const { user } = useAuth()

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas administradores podem acessar esta página.</p>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aberto":
        return "bg-yellow-100 text-yellow-800"
      case "em_andamento":
        return "bg-blue-100 text-blue-800"
      case "resolvido":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return "bg-red-100 text-red-800"
      case "media":
        return "bg-yellow-100 text-yellow-800"
      case "baixa":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Central de Suporte</h1>
          <p className="text-gray-600">Encontre ajuda e suporte para o sistema de gestão</p>
        </div>
        <Button>
          <MessageSquare className="mr-2 h-4 w-4" />
          Abrir Ticket
        </Button>
      </div>

      {/* Canais de Contato */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="text-center">
            <Phone className="mx-auto h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Suporte por Telefone</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-2xl font-bold text-blue-600">(11) 3456-7890</p>
            <p className="text-sm text-gray-600 mt-2">
              Segunda a Sexta: 8h às 18h
              <br />
              Sábado: 8h às 12h
            </p>
            <Button className="w-full mt-4" variant="outline">
              <Phone className="mr-2 h-4 w-4" />
              Ligar Agora
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Mail className="mx-auto h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Suporte por Email</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg font-semibold text-green-600">suporte@condominios.com</p>
            <p className="text-sm text-gray-600 mt-2">
              Resposta em até 24 horas
              <br />
              Disponível 24/7
            </p>
            <Button className="w-full mt-4" variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Enviar Email
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <MessageSquare className="mx-auto h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>Chat Online</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg font-semibold text-purple-600">Chat ao Vivo</p>
            <p className="text-sm text-gray-600 mt-2">
              Segunda a Sexta: 8h às 18h
              <br />
              Resposta imediata
            </p>
            <Button className="w-full mt-4" variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Iniciar Chat
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recursos de Ajuda */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="mr-2 h-5 w-5" />
              Base de Conhecimento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <ExternalLink className="mr-2 h-4 w-4" />
              Guia de Primeiros Passos
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ExternalLink className="mr-2 h-4 w-4" />
              Manual do Administrador
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ExternalLink className="mr-2 h-4 w-4" />
              Perguntas Frequentes
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ExternalLink className="mr-2 h-4 w-4" />
              Tutoriais em Vídeo
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Video className="mr-2 h-5 w-5" />
              Treinamentos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Video className="mr-2 h-4 w-4" />
              Como Gerenciar Moradores
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Video className="mr-2 h-4 w-4" />
              Controle Financeiro
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Video className="mr-2 h-4 w-4" />
              Sistema de Reservas
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Video className="mr-2 h-4 w-4" />
              Relatórios e Análises
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="mr-2 h-5 w-5" />
            Perguntas Frequentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <h3 className="font-semibold text-gray-900 mb-2">{item.pergunta}</h3>
                <p className="text-gray-600">{item.resposta}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Meus Tickets */}
      <Card>
        <CardHeader>
          <CardTitle>Meus Tickets de Suporte</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold">{ticket.titulo}</h3>
                    <Badge className={getStatusColor(ticket.status)}>{ticket.status.replace("_", " ")}</Badge>
                    <Badge className={getPriorityColor(ticket.prioridade)}>{ticket.prioridade}</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      Aberto em {new Date(ticket.dataAbertura).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="mr-1 h-3 w-3" />
                      Última resposta: {new Date(ticket.ultimaResposta).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Ver Detalhes
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
