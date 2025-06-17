"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-context"
import { Wrench, ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function NovaSolicitacaoPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    titulo: "",
    categoria: "",
    prioridade: "media",
    descricao: "",
    local: "",
  })

  if (!user || user.role !== "morador") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas moradores podem acessar esta página.</p>
      </div>
    )
  }

  const categorias = [
    "Hidráulica",
    "Elétrica",
    "Marcenaria",
    "Pintura",
    "Limpeza",
    "Jardinagem",
    "Segurança",
    "Elevador",
    "Portão/Interfone",
    "Outros",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Solicitação enviada com sucesso!",
      description: "Sua solicitação foi registrada e será analisada em breve.",
    })

    setIsSubmitting(false)
    router.push("/dashboard/solicitacoes")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/solicitacoes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nova Solicitação</h1>
          <p className="text-gray-600">Descreva o problema ou serviço necessário</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wrench className="mr-2 h-5 w-5" />
            Detalhes da Solicitação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="titulo">Título da Solicitação *</Label>
                <Input
                  id="titulo"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  placeholder="Ex: Vazamento na torneira"
                  required
                />
              </div>
              <div>
                <Label htmlFor="categoria">Categoria *</Label>
                <select
                  id="categoria"
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="local">Local do Problema *</Label>
                <Input
                  id="local"
                  value={formData.local}
                  onChange={(e) => setFormData({ ...formData, local: e.target.value })}
                  placeholder="Ex: Banheiro principal, Cozinha"
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
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="descricao">Descrição Detalhada *</Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                placeholder="Descreva o problema em detalhes, quando começou, frequência, etc."
                rows={4}
                required
              />
            </div>

            {/* Upload de Fotos */}
            <div>
              <Label>Fotos (Opcional)</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Clique para adicionar fotos ou arraste e solte aqui</p>
                <p className="text-xs text-gray-500">PNG, JPG até 10MB cada</p>
                <Button type="button" variant="outline" className="mt-2">
                  Selecionar Fotos
                </Button>
              </div>
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
                    <p className="text-gray-600">Morador:</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Enviando...
                  </>
                ) : (
                  "Enviar Solicitação"
                )}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/solicitacoes">Cancelar</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Informações Importantes */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Informações Importantes</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Solicitações são analisadas em até 24 horas úteis</li>
            <li>• Emergências devem ser comunicadas diretamente à portaria</li>
            <li>• Você receberá atualizações sobre o andamento por email</li>
            <li>• Fotos ajudam na avaliação e agilizam o atendimento</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
