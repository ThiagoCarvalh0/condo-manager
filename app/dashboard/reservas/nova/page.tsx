"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-context"
import { ArrowLeft, Calendar, MapPin, Clock, DollarSign } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const areasDisponiveis = [
  { id: "salao", nome: "Salão de Festas", capacidade: 80, valor: 150.0 },
  { id: "churrasqueira", nome: "Churrasqueira", capacidade: 30, valor: 80.0 },
  { id: "quadra", nome: "Quadra Esportiva", capacidade: 20, valor: 0.0 },
  { id: "piscina", nome: "Área da Piscina", capacidade: 50, valor: 50.0 },
  { id: "playground", nome: "Playground", capacidade: 15, valor: 0.0 },
]

export default function NovaReservaPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    area: "",
    solicitante: "",
    unidade: "",
    data: "",
    horaInicio: "",
    horaFim: "",
    evento: "",
    observacoes: "",
    numeroConvidados: "",
  })

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado.</p>
      </div>
    )
  }

  const areaSelecionada = areasDisponiveis.find((area) => area.id === formData.area)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Reserva criada com sucesso!",
      description: `A reserva do ${areaSelecionada?.nome} foi registrada.`,
    })

    setIsLoading(false)
    router.push("/dashboard/reservas")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/reservas">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Nova Reserva</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações da Reserva */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Informações da Reserva
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="area">Área a Reservar *</Label>
              <Select value={formData.area} onValueChange={(value) => setFormData({ ...formData, area: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a área" />
                </SelectTrigger>
                <SelectContent>
                  {areasDisponiveis.map((area) => (
                    <SelectItem key={area.id} value={area.id}>
                      {area.nome} - Capacidade: {area.capacidade} pessoas
                      {area.valor > 0 ? ` - R$ ${area.valor.toFixed(2)}` : " - Gratuito"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {areaSelecionada && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">{areaSelecionada.nome}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-700">Capacidade:</span>
                      <span className="ml-2 font-medium">{areaSelecionada.capacidade} pessoas</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Valor:</span>
                      <span className="ml-2 font-medium">
                        {areaSelecionada.valor > 0 ? `R$ ${areaSelecionada.valor.toFixed(2)}` : "Gratuito"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="solicitante">Solicitante *</Label>
                <Input
                  id="solicitante"
                  value={formData.solicitante}
                  onChange={(e) => setFormData({ ...formData, solicitante: e.target.value })}
                  placeholder="Nome completo"
                  required
                />
              </div>
              <div>
                <Label htmlFor="unidade">Unidade *</Label>
                <Input
                  id="unidade"
                  value={formData.unidade}
                  onChange={(e) => setFormData({ ...formData, unidade: e.target.value })}
                  placeholder="Ex: Apto 101"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data e Horário */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Data e Horário
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="data">Data da Reserva *</Label>
              <Input
                id="data"
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="horaInicio">Hora de Início *</Label>
                <Input
                  id="horaInicio"
                  type="time"
                  value={formData.horaInicio}
                  onChange={(e) => setFormData({ ...formData, horaInicio: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="horaFim">Hora de Término *</Label>
                <Input
                  id="horaFim"
                  type="time"
                  value={formData.horaFim}
                  onChange={(e) => setFormData({ ...formData, horaFim: e.target.value })}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detalhes do Evento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Detalhes do Evento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="evento">Tipo de Evento *</Label>
              <Input
                id="evento"
                value={formData.evento}
                onChange={(e) => setFormData({ ...formData, evento: e.target.value })}
                placeholder="Ex: Aniversário, Confraternização, Reunião"
                required
              />
            </div>

            <div>
              <Label htmlFor="numeroConvidados">Número de Convidados</Label>
              <Input
                id="numeroConvidados"
                type="number"
                value={formData.numeroConvidados}
                onChange={(e) => setFormData({ ...formData, numeroConvidados: e.target.value })}
                placeholder="Quantidade estimada"
                max={areaSelecionada?.capacidade}
              />
              {areaSelecionada && formData.numeroConvidados && (
                <p className="text-sm text-gray-600 mt-1">Capacidade máxima: {areaSelecionada.capacidade} pessoas</p>
              )}
            </div>

            <div>
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                placeholder="Informações adicionais sobre o evento..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Resumo do Valor */}
        {areaSelecionada && areaSelecionada.valor > 0 && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-900">Valor da Reserva</span>
                </div>
                <span className="text-2xl font-bold text-green-600">R$ {areaSelecionada.valor.toFixed(2)}</span>
              </div>
              <p className="text-green-700 text-sm mt-2">O boleto será gerado após a confirmação da reserva.</p>
            </CardContent>
          </Card>
        )}

        {/* Botões */}
        <div className="flex space-x-4">
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? "Criando..." : "Criar Reserva"}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/dashboard/reservas">Cancelar</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
