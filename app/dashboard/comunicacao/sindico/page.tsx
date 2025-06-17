"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-context"
import { MessageSquare, Send, Phone, Mail, Clock, CheckCircle } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const mockMensagensAnteriores = [
  {
    id: "1",
    assunto: "Problema com vazamento",
    mensagem: "Olá, estou com um vazamento no banheiro que precisa de atenção urgente.",
    dataEnvio: "2024-07-05",
    resposta: "Olá! Já acionei o zelador para verificar. Ele entrará em contato hoje à tarde.",
    dataResposta: "2024-07-05",
    status: "respondida",
  },
  {
    id: "2",
    assunto: "Dúvida sobre taxa extra",
    mensagem: "Gostaria de entender melhor sobre a taxa extra que apareceu no boleto deste mês.",
    dataEnvio: "2024-07-02",
    resposta: "A taxa extra refere-se ao rateio da manutenção do elevador. Enviarei o detalhamento por email.",
    dataResposta: "2024-07-03",
    status: "respondida",
  },
  {
    id: "3",
    assunto: "Sugestão para área de lazer",
    mensagem: "Tenho uma sugestão para melhorar a área de lazer das crianças. Podemos conversar?",
    dataEnvio: "2024-06-28",
    resposta: null,
    dataResposta: null,
    status: "aguardando",
  },
]

export default function SindicoPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEnviando, setIsEnviando] = useState(false)
  const [formData, setFormData] = useState({
    assunto: "",
    mensagem: "",
    prioridade: "normal",
  })

  if (!user || user.role !== "morador") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas moradores podem acessar esta página.</p>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsEnviando(true)

    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Mensagem enviada com sucesso!",
      description: "O síndico receberá sua mensagem e responderá em breve.",
    })

    setIsEnviando(false)
    setFormData({ assunto: "", mensagem: "", prioridade: "normal" })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "respondida":
        return (
          <span className="inline-flex items-center text-green-600 text-sm">
            <CheckCircle className="h-4 w-4 mr-1" />
            Respondida
          </span>
        )
      case "aguardando":
        return (
          <span className="inline-flex items-center text-yellow-600 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            Aguardando
          </span>
        )
      default:
        return <span className="text-gray-600 text-sm">Desconhecido</span>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Falar com Síndico</h1>
        <p className="text-gray-600">Envie mensagens diretamente para o síndico do condomínio</p>
      </div>

      {/* Informações do Síndico */}
      <Card>
        <CardHeader>
          <CardTitle>Informações do Síndico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-xl">MS</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Maria Silva</h3>
                <p className="text-sm text-gray-600">Síndica - Mandato 2024-2026</p>
                <p className="text-sm text-gray-600">Apartamento 501 - Bloco A</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">sindico@residencialflores.com.br</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Horário de atendimento: 8h às 18h</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulário de Nova Mensagem */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Nova Mensagem
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="assunto">Assunto *</Label>
                <Input
                  id="assunto"
                  value={formData.assunto}
                  onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                  placeholder="Ex: Problema com vazamento"
                  required
                />
              </div>
              <div>
                <Label htmlFor="prioridade">Prioridade</Label>
                <select
                  id="prioridade"
                  value={formData.prioridade}
                  onChange={(e) => setFormData({ ...formData, prioridade: e.target.value })}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="baixa">Baixa</option>
                  <option value="normal">Normal</option>
                  <option value="alta">Alta</option>
                  <option value="urgente">Urgente</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="mensagem">Mensagem *</Label>
              <Textarea
                id="mensagem"
                value={formData.mensagem}
                onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                placeholder="Descreva sua dúvida, sugestão ou problema..."
                rows={5}
                required
              />
            </div>

            {/* Informações da Unidade */}
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <h4 className="font-medium text-gray-900 mb-2">Suas Informações</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Nome:</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Unidade:</p>
                    <p className="font-medium">
                      {user.condominios.find((c) => c.id === user.activeCondominioId)?.unidades?.[0]?.numero || "N/A"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" disabled={isEnviando} className="w-full">
              {isEnviando ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Mensagem
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Histórico de Mensagens */}
      <Card>
        <CardHeader>
          <CardTitle>Mensagens Anteriores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockMensagensAnteriores.map((msg) => (
              <div key={msg.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{msg.assunto}</h4>
                    <p className="text-sm text-gray-600">
                      Enviado em {new Date(msg.dataEnvio).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  {getStatusBadge(msg.status)}
                </div>

                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700">{msg.mensagem}</p>
                  </div>

                  {msg.resposta && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-green-800">Resposta do Síndico:</span>
                        <span className="text-xs text-green-600">
                          {new Date(msg.dataResposta!).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{msg.resposta}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dicas de Comunicação */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Dicas para uma boa comunicação</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Seja claro e objetivo na sua mensagem</li>
            <li>• Inclua detalhes relevantes como localização e horário</li>
            <li>• Para emergências, ligue diretamente para a portaria</li>
            <li>• Aguarde até 48h úteis para resposta</li>
            <li>• Mantenha sempre o respeito e cordialidade</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
