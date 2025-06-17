"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { LifeBuoy, Phone, Mail, MessageSquare, FileText, Video, Search } from "lucide-react"

const faqItems = [
  {
    pergunta: "Como faço para baixar meu boleto?",
    resposta: "Acesse a seção 'Financeiro > Meus Boletos' e clique no botão 'Baixar' ao lado do boleto desejado.",
  },
  {
    pergunta: "Como autorizar um visitante?",
    resposta: "Vá em 'Visitantes > Autorizar Visitante', preencha os dados e clique em 'Autorizar Visitante'.",
  },
  {
    pergunta: "Como abrir uma solicitação de manutenção?",
    resposta:
      "Acesse 'Solicitações > Nova Solicitação', descreva o problema e envie. Você receberá atualizações por email.",
  },
  {
    pergunta: "Como reservar o salão de festas?",
    resposta: "Vá em 'Reservas > Nova Reserva', escolha a data e horário disponível e confirme a reserva.",
  },
  {
    pergunta: "Onde vejo os avisos do condomínio?",
    resposta: "Todos os avisos estão em 'Comunicação > Avisos'. Avisos não lidos aparecem destacados.",
  },
]

export default function AjudaPage() {
  const { user } = useAuth()

  if (!user || user.role !== "morador") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas moradores podem acessar esta página.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center">
          <LifeBuoy className="mr-2 h-6 w-6" />
          Central de Ajuda
        </h1>
        <p className="text-gray-600 mt-2">Encontre respostas para suas dúvidas ou entre em contato conosco</p>
      </div>

      {/* Busca */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Busque por uma dúvida..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Phone className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-medium text-gray-900">Ligar para Portaria</h3>
            <p className="text-sm text-gray-600 mb-3">Atendimento 24 horas</p>
            <Button variant="outline" size="sm" className="w-full">
              (11) 2222-2222
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-medium text-gray-900">Falar com Síndico</h3>
            <p className="text-sm text-gray-600 mb-3">Envie uma mensagem</p>
            <Button variant="outline" size="sm" className="w-full">
              Enviar Mensagem
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-medium text-gray-900">Email Administradora</h3>
            <p className="text-sm text-gray-600 mb-3">Suporte técnico</p>
            <Button variant="outline" size="sm" className="w-full">
              Enviar Email
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Video className="h-8 w-8 text-red-600 mx-auto mb-3" />
            <h3 className="font-medium text-gray-900">Tutorial em Vídeo</h3>
            <p className="text-sm text-gray-600 mb-3">Como usar o sistema</p>
            <Button variant="outline" size="sm" className="w-full">
              Assistir
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Perguntas Frequentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">{item.pergunta}</h4>
                <p className="text-sm text-gray-600">{item.resposta}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Guias Rápidos */}
      <Card>
        <CardHeader>
          <CardTitle>Guias Rápidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Primeiro Acesso</h4>
              <p className="text-sm text-gray-600 mb-3">Aprenda a navegar pelo sistema e configurar sua conta.</p>
              <Button variant="outline" size="sm">
                Ver Guia
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Pagamentos</h4>
              <p className="text-sm text-gray-600 mb-3">
                Como baixar boletos, gerar segunda via e acompanhar pagamentos.
              </p>
              <Button variant="outline" size="sm">
                Ver Guia
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Solicitações</h4>
              <p className="text-sm text-gray-600 mb-3">Como abrir e acompanhar solicitações de manutenção.</p>
              <Button variant="outline" size="sm">
                Ver Guia
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Visitantes</h4>
              <p className="text-sm text-gray-600 mb-3">Como autorizar visitantes e gerenciar prestadores.</p>
              <Button variant="outline" size="sm">
                Ver Guia
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contatos de Emergência */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900">Contatos de Emergência</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <Phone className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <p className="font-medium text-red-900">Bombeiros</p>
              <p className="text-red-700">193</p>
            </div>
            <div className="text-center">
              <Phone className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <p className="font-medium text-red-900">Polícia</p>
              <p className="text-red-700">190</p>
            </div>
            <div className="text-center">
              <Phone className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <p className="font-medium text-red-900">SAMU</p>
              <p className="text-red-700">192</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
