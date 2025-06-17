"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-context"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const espacosDisponiveis = [
  {
    id: "salao",
    nome: "Salão de Festas",
    capacidade: 80,
    valor: 150.0,
    descricao: "Salão completo com som, iluminação e cozinha de apoio",
    horarios: ["14:00-18:00", "19:00-23:00"],
  },
  {
    id: "churrasqueira",
    nome: "Churrasqueira",
    capacidade: 30,
    valor: 80.0,
    descricao: "Área gourmet com churrasqueira e pia",
    horarios: ["12:00-18:00", "19:00-23:00"],
  },
  {
    id: "quadra",
    nome: "Quadra Esportiva",
    capacidade: 20,
    valor: 0.0,
    descricao: "Quadra poliesportiva para futebol, vôlei e basquete",
    horarios: ["08:00-12:00", "14:00-18:00", "19:00-22:00"],
  },
  {
    id: "piscina",
    nome: "Área da Piscina",
    capacidade: 50,
    valor: 100.0,
    descricao: "Área da piscina com deck e vestiários",
    horarios: ["10:00-18:00"],
  },
]

export default function NovaReservaPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    espaco: "",
    data: "",
    horario: "",
    evento: "",
    observacoes: "",
    numeroConvidados: "",
  })

  if (!user || user.role !== "morador") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas moradores podem acessar esta página.</p>
      </div>
    )
  }

  const espacoSelecionado = espacosDisponiveis.find((e) => e.id === formData.espaco)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular criação da reserva
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Reserva solicitada com sucesso!",
      description: "Sua solicitação será analisada e você receberá uma confirmação em breve.",
    })

    setIsSubmitting(false)
    router.push("/dashboard/reservas")
  }

  // Data mínima é amanhã
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split("T")[0]

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/reservas">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nova Reserva</h1>
          <p className="text-gray-600">Reserve um espaço do condomínio para seu evento</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Dados da Reserva
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="espaco">Espaço *</Label>
              <select
                id="espaco"
                value={formData.espaco}
                onChange={(e) => setFormData({ ...formData, espaco: e.target.value, horario: "" })}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Selecione um espaço</option>
                {espacosDisponiveis.map((espaco) => (
                  <option key={espaco.id} value={espaco.id}>
                    {espaco.nome} - {espaco.valor > 0 ? `R$ ${espaco.valor.toFixed(2)}` : "Gratuito"}
                  </option>
                ))}
              </select>
            </div>

            {espacoSelecionado && (
              <Card className="bg-blue-50">
                <CardContent className="p-4">
                  <h4 className="font-medium text-blue-900 mb-2">{espacoSelecionado.nome}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-blue-700">
                        <strong>Capacidade:</strong> {espacoSelecionado.capacidade} pessoas
                      </p>
                    </div>
                    <div>
                      <p className="text-blue-700">
                        <strong>Valor:</strong>{" "}
                        {espacoSelecionado.valor > 0 ? `R$ ${espacoSelecionado.valor.toFixed(2)}` : "Gratuito"}
                      </p>
                    </div>
                    <div>
                      <p className="text-blue-700">
                        <strong>Horários disponíveis:</strong> {espacoSelecionado.horarios.join(", ")}
                      </p>
                    </div>
                  </div>
                  <p className="text-blue-600 text-sm mt-2">{espacoSelecionado.descricao}</p>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="data">Data do Evento *</Label>
                <Input
                  id="data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  min={minDate}
                  required
                />
              </div>
              <div>
                <Label htmlFor="horario">Horário *</Label>
                <select
                  id="horario"
                  value={formData.horario}
                  onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={!espacoSelecionado}
                >
                  <option value="">Selecione um horário</option>
                  {espacoSelecionado?.horarios.map((horario) => (
                    <option key={horario} value={horario}>
                      {horario}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="evento">Tipo de Evento *</Label>
                <Input
                  id="evento"
                  value={formData.evento}
                  onChange={(e) => setFormData({ ...formData, evento: e.target.value })}
                  placeholder="Ex: Aniversário, Reunião familiar"
                  required
                />
              </div>
              <div>
                <Label htmlFor="numeroConvidados">Número de Convidados *</Label>
                <Input
                  id="numeroConvidados"
                  type="number"
                  value={formData.numeroConvidados}
                  onChange={(e) => setFormData({ ...formData, numeroConvidados: e.target.value })}
                  placeholder="Ex: 30"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="observacoes">Observações (Opcional)</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                placeholder="Informações adicionais sobre o evento"
                rows={3}
              />
            </div>

            {/* Resumo da Reserva */}
            {espacoSelecionado && formData.data && formData.horario && (
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Resumo da Reserva</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p>
                        <strong>Espaço:</strong> {espacoSelecionado.nome}
                      </p>
                      <p>
                        <strong>Data:</strong> {new Date(formData.data).toLocaleDateString("pt-BR")}
                      </p>
                      <p>
                        <strong>Horário:</strong> {formData.horario}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Evento:</strong> {formData.evento || "Não informado"}
                      </p>
                      <p>
                        <strong>Convidados:</strong> {formData.numeroConvidados || "Não informado"}
                      </p>
                      <p>
                        <strong>Valor:</strong>{" "}
                        {espacoSelecionado.valor > 0 ? `R$ ${espacoSelecionado.valor.toFixed(2)}` : "Gratuito"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex space-x-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Enviando Solicitação...
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4 mr-2" />
                    Solicitar Reserva
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/reservas">Cancelar</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Regras de Reserva */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Regras para Reservas</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Reservas devem ser feitas com pelo menos 24h de antecedência</li>
            <li>• Máximo de 2 reservas por mês por unidade</li>
            <li>• Pagamento deve ser feito até 48h antes do evento</li>
            <li>• Cancelamentos com menos de 24h não têm reembolso</li>
            <li>• É obrigatório deixar o espaço limpo após o uso</li>
            <li>• Música alta permitida apenas até 22h</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
