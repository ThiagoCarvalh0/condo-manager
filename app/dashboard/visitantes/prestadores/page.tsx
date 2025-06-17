"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { Wrench, Plus, Clock, CheckCircle, Phone } from "lucide-react"

const mockPrestadores = [
  {
    id: "1",
    nome: "João Silva - Eletricista",
    telefone: "(11) 99999-9999",
    categoria: "Elétrica",
    ultimaVisita: "2024-07-05",
    totalVisitas: 3,
    status: "ativo",
    observacoes: "Técnico de confiança, sempre pontual",
  },
  {
    id: "2",
    nome: "Maria Santos - Encanadora",
    telefone: "(11) 88888-8888",
    categoria: "Hidráulica",
    ultimaVisita: "2024-06-20",
    totalVisitas: 2,
    status: "ativo",
    observacoes: "Excelente trabalho, preço justo",
  },
  {
    id: "3",
    nome: "Carlos Oliveira - Pintor",
    telefone: "(11) 77777-7777",
    categoria: "Pintura",
    ultimaVisita: "2024-05-15",
    totalVisitas: 1,
    status: "inativo",
    observacoes: "Trabalho bem feito, mas demorou",
  },
]

export default function PrestadoresPage() {
  const { user } = useAuth()

  if (!user || user.role !== "morador") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas moradores podem acessar esta página.</p>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>
      case "inativo":
        return <Badge className="bg-gray-100 text-gray-800">Inativo</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  const prestadoresAtivos = mockPrestadores.filter((p) => p.status === "ativo").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prestadores de Serviço</h1>
          <p className="text-gray-600">Gerencie seus prestadores de serviço de confiança</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Prestador
        </Button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Prestadores</p>
                <p className="text-lg font-bold text-gray-900">{mockPrestadores.length}</p>
              </div>
              <Wrench className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Prestadores Ativos</p>
                <p className="text-lg font-bold text-gray-900">{prestadoresAtivos}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Última Visita</p>
                <p className="text-lg font-bold text-gray-900">05/07/2024</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Prestadores */}
      <Card>
        <CardHeader>
          <CardTitle>Meus Prestadores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPrestadores.map((prestador) => (
              <div key={prestador.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-gray-900">{prestador.nome}</h3>
                      {getStatusBadge(prestador.status)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm text-gray-600">
                      <p>
                        <strong>Categoria:</strong> {prestador.categoria}
                      </p>
                      <p>
                        <strong>Telefone:</strong> {prestador.telefone}
                      </p>
                      <p>
                        <strong>Última Visita:</strong> {new Date(prestador.ultimaVisita).toLocaleDateString("pt-BR")}
                      </p>
                      <p>
                        <strong>Total de Visitas:</strong> {prestador.totalVisitas}
                      </p>
                    </div>
                    {prestador.observacoes && (
                      <p className="text-sm text-gray-500 mt-2">
                        <strong>Observações:</strong> {prestador.observacoes}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-1" />
                      Ligar
                    </Button>
                    <Button variant="outline" size="sm">
                      Autorizar Visita
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Categorias Mais Utilizadas */}
      <Card>
        <CardHeader>
          <CardTitle>Categorias Mais Utilizadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Wrench className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-medium">Elétrica</p>
              <p className="text-sm text-gray-600">3 prestadores</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Wrench className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium">Hidráulica</p>
              <p className="text-sm text-gray-600">2 prestadores</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Wrench className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="font-medium">Pintura</p>
              <p className="text-sm text-gray-600">1 prestador</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Plus className="h-8 w-8 text-gray-600 mx-auto mb-2" />
              <p className="font-medium">Outros</p>
              <p className="text-sm text-gray-600">Adicionar</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
