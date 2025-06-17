"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { UserCheck, Clock, Calendar, Phone } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function AutorizarVisitantePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    nomeVisitante: "",
    documentoVisitante: "",
    telefoneVisitante: "",
    dataVisita: "",
    horaInicio: "",
    horaFim: "",
    observacoes: "",
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
    setIsSubmitting(true)

    // Simular autorização
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Visitante autorizado com sucesso!",
      description: "A portaria foi notificada sobre a autorização.",
    })

    setIsSubmitting(false)
    // Limpar formulário
    setFormData({
      nomeVisitante: "",
      documentoVisitante: "",
      telefoneVisitante: "",
      dataVisita: "",
      horaInicio: "",
      horaFim: "",
      observacoes: "",
    })
  }

  // Data mínima é hoje
  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Autorizar Visitante</h1>
        <p className="text-gray-600">Autorize a entrada de visitantes em sua unidade</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserCheck className="mr-2 h-5 w-5" />
            Dados do Visitante
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="nomeVisitante">Nome Completo *</Label>
                <Input
                  id="nomeVisitante"
                  value={formData.nomeVisitante}
                  onChange={(e) => setFormData({ ...formData, nomeVisitante: e.target.value })}
                  placeholder="Nome completo do visitante"
                  required
                />
              </div>
              <div>
                <Label htmlFor="documentoVisitante">Documento (RG/CPF) *</Label>
                <Input
                  id="documentoVisitante"
                  value={formData.documentoVisitante}
                  onChange={(e) => setFormData({ ...formData, documentoVisitante: e.target.value })}
                  placeholder="RG ou CPF do visitante"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="telefoneVisitante">Telefone (Opcional)</Label>
              <Input
                id="telefoneVisitante"
                value={formData.telefoneVisitante}
                onChange={(e) => setFormData({ ...formData, telefoneVisitante: e.target.value })}
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="dataVisita">Data da Visita *</Label>
                <Input
                  id="dataVisita"
                  type="date"
                  value={formData.dataVisita}
                  onChange={(e) => setFormData({ ...formData, dataVisita: e.target.value })}
                  min={today}
                  required
                />
              </div>
              <div>
                <Label htmlFor="horaInicio">Hora de Entrada *</Label>
                <Input
                  id="horaInicio"
                  type="time"
                  value={formData.horaInicio}
                  onChange={(e) => setFormData({ ...formData, horaInicio: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="horaFim">Hora de Saída (Opcional)</Label>
                <Input
                  id="horaFim"
                  type="time"
                  value={formData.horaFim}
                  onChange={(e) => setFormData({ ...formData, horaFim: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="observacoes">Observações (Opcional)</Label>
              <textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                placeholder="Informações adicionais sobre a visita"
                rows={3}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Informações da Unidade */}
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <h4 className="font-medium text-gray-900 mb-2">Informações da Unidade</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Unidade:</p>
                    <p className="font-medium">
                      {user.condominios.find((c) => c.id === user.activeCondominioId)?.unidades?.[0]?.numero || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Responsável:</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Autorizando...
                </>
              ) : (
                <>
                  <UserCheck className="h-4 w-4 mr-2" />
                  Autorizar Visitante
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Autorizações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Autorizações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <Clock className="h-6 w-6" />
              <span>Visitante por 2 horas</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <Calendar className="h-6 w-6" />
              <span>Visitante o dia todo</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <Phone className="h-6 w-6" />
              <span>Delivery/Prestador</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Informações Importantes */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Informações Importantes</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• A autorização é válida apenas para a data e horário especificados</li>
            <li>• O visitante deve apresentar documento com foto na portaria</li>
            <li>• Você é responsável pelos atos do visitante durante a permanência</li>
            <li>• Para visitas recorrentes, considere cadastrar como visitante frequente</li>
            <li>• Em caso de emergência, a portaria pode negar a entrada</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
