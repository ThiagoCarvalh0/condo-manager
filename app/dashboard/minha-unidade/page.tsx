"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { Home, Users, Calendar, FileText, Settings, Phone, Building } from "lucide-react"

export default function MinhaUnidadePage() {
  const { user } = useAuth()

  if (!user || user.role !== "morador") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas moradores podem acessar esta página.</p>
      </div>
    )
  }

  const condominioAtual = user.condominios.find((c) => c.id === user.activeCondominioId)
  const unidadeAtual =
    condominioAtual?.unidades && condominioAtual.unidades.length > 0 ? condominioAtual.unidades[0] : null

  if (!condominioAtual || !unidadeAtual) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Erro ao carregar informações da unidade.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Minha Unidade</h1>
        <p className="text-gray-600">Informações detalhadas da sua unidade no condomínio</p>
      </div>

      {/* Informações Principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Home className="mr-2 h-5 w-5" />
              Dados da Unidade
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Número</p>
                <p className="text-lg font-semibold">{unidadeAtual.numero}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Bloco</p>
                <p className="text-lg font-semibold">{unidadeAtual.bloco || "Único"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Tipo</p>
                <p className="text-lg font-semibold capitalize">{unidadeAtual.tipo}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Proprietário</p>
              <p className="text-lg font-semibold">{user.name}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="mr-2 h-5 w-5" />
              Dados do Condomínio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Nome</p>
              <p className="text-lg font-semibold">{condominioAtual.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Endereço</p>
              <p className="text-sm text-gray-700">Rua das Flores, 123 - Jardim Primavera</p>
              <p className="text-sm text-gray-700">São Paulo, SP - 01234-567</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">CNPJ</p>
              <p className="text-sm text-gray-700">12.345.678/0001-90</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informações Financeiras */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Financeiras</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-gray-600">Taxa de Condomínio</p>
              <p className="text-2xl font-bold text-blue-600">R$ 380,00</p>
              <p className="text-xs text-gray-500">Mensal</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-gray-600">Fundo de Reserva</p>
              <p className="text-2xl font-bold text-green-600">R$ 45,00</p>
              <p className="text-xs text-gray-500">Mensal</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-gray-600">Taxa de Limpeza</p>
              <p className="text-2xl font-bold text-purple-600">R$ 25,75</p>
              <p className="text-xs text-gray-500">Mensal</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Mensal:</span>
              <span className="text-xl font-bold">R$ 450,75</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contatos Importantes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Phone className="mr-2 h-5 w-5" />
            Contatos Importantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="font-medium">Síndico</p>
              <p className="text-sm text-gray-600">Maria Silva</p>
              <p className="text-sm text-gray-600">(11) 99999-9999</p>
              <p className="text-sm text-gray-600">sindico@residencialflores.com.br</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="font-medium">Administradora</p>
              <p className="text-sm text-gray-600">Silva & Associados</p>
              <p className="text-sm text-gray-600">(11) 3333-3333</p>
              <p className="text-sm text-gray-600">contato@silvaassociados.com.br</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="font-medium">Portaria</p>
              <p className="text-sm text-gray-600">24 horas</p>
              <p className="text-sm text-gray-600">(11) 2222-2222</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="font-medium">Emergência</p>
              <p className="text-sm text-gray-600">Bombeiros: 193</p>
              <p className="text-sm text-gray-600">Polícia: 190</p>
              <p className="text-sm text-gray-600">SAMU: 192</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <FileText className="h-6 w-6" />
              <span>Documentos</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <Calendar className="h-6 w-6" />
              <span>Reservas</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <Users className="h-6 w-6" />
              <span>Visitantes</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2">
              <Settings className="h-6 w-6" />
              <span>Configurações</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
