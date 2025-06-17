"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-context"
import { getMaxValue } from "@/lib/plans"
import { Building2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function NovoCondominioPage() {
  const { user, updateUserPlan } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    cep: "",
    city: "",
    state: "",
    totalUnits: "",
    description: "",
  })

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado.</p>
      </div>
    )
  }

  const maxCondominios = getMaxValue(user.plan, "maxCondominios")
  const canAddMore = user.condominios.length < maxCondominios

  if (!canAddMore) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/condominios">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Limite de Condomínios Atingido</h1>
        </div>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6 text-center">
            <Building2 className="mx-auto h-12 w-12 text-orange-600 mb-4" />
            <h3 className="text-lg font-semibold text-orange-900 mb-2">
              Seu plano {user.plan} permite até {maxCondominios} condomínio{maxCondominios > 1 ? "s" : ""}
            </h3>
            <p className="text-orange-700 mb-4">Faça upgrade para adicionar mais condomínios à sua administração.</p>
            <Button
              onClick={() => updateUserPlan(user.plan === "starter" ? "pro" : "enterprise")}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Fazer Upgrade Agora
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular criação do condomínio
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Condomínio criado com sucesso!",
      description: `${formData.name} foi adicionado à sua administração.`,
    })

    setIsLoading(false)
    router.push("/dashboard/condominios")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/condominios">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Adicionar Novo Condomínio</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="mr-2 h-5 w-5" />
            Informações do Condomínio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Nome do Condomínio *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Residencial Jardim das Flores"
                  required
                />
              </div>
              <div>
                <Label htmlFor="totalUnits">Total de Unidades *</Label>
                <Input
                  id="totalUnits"
                  type="number"
                  value={formData.totalUnits}
                  onChange={(e) => setFormData({ ...formData, totalUnits: e.target.value })}
                  placeholder="Ex: 120"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Endereço Completo *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Rua, número, bairro"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="cep">CEP *</Label>
                <Input
                  id="cep"
                  value={formData.cep}
                  onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                  placeholder="00000-000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="city">Cidade *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="São Paulo"
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">Estado *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="SP"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Descrição (Opcional)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Informações adicionais sobre o condomínio..."
                rows={3}
              />
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? "Criando..." : "Criar Condomínio"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/condominios">Cancelar</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
