"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { FileText, Download, Calendar, DollarSign } from "lucide-react"

const mockExtrato = [
  {
    id: "1",
    data: "2024-07-01",
    descricao: "Taxa de Condomínio - Julho/2024",
    valor: 380.0,
    tipo: "debito",
  },
  {
    id: "2",
    data: "2024-07-01",
    descricao: "Fundo de Reserva - Julho/2024",
    valor: 45.0,
    tipo: "debito",
  },
  {
    id: "3",
    data: "2024-07-01",
    descricao: "Taxa de Limpeza - Julho/2024",
    valor: 25.75,
    tipo: "debito",
  },
  {
    id: "4",
    data: "2024-06-08",
    descricao: "Pagamento Boleto Junho/2024",
    valor: 450.75,
    tipo: "credito",
  },
  {
    id: "5",
    data: "2024-06-01",
    descricao: "Taxa de Condomínio - Junho/2024",
    valor: 380.0,
    tipo: "debito",
  },
  {
    id: "6",
    data: "2024-06-01",
    descricao: "Fundo de Reserva - Junho/2024",
    valor: 45.0,
    tipo: "debito",
  },
]

export default function ExtratoPage() {
  const { user } = useAuth()

  if (!user || user.role !== "morador") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas moradores podem acessar esta página.</p>
      </div>
    )
  }

  const saldoAtual = mockExtrato.reduce((acc, item) => {
    return item.tipo === "credito" ? acc + item.valor : acc - item.valor
  }, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Extrato Financeiro</h1>
          <p className="text-gray-600">Acompanhe suas movimentações financeiras</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Baixar Extrato
        </Button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Saldo Atual</p>
                <p className={`text-lg font-bold ${saldoAtual >= 0 ? "text-green-600" : "text-red-600"}`}>
                  R$ {Math.abs(saldoAtual).toFixed(2)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-xs text-gray-500 mt-1">{saldoAtual >= 0 ? "Crédito" : "Débito"}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Último Pagamento</p>
                <p className="text-lg font-bold text-gray-900">08/06/2024</p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-xs text-gray-500 mt-1">R$ 450,75</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Próximo Vencimento</p>
                <p className="text-lg font-bold text-gray-900">10/07/2024</p>
              </div>
              <FileText className="h-8 w-8 text-purple-500" />
            </div>
            <p className="text-xs text-gray-500 mt-1">R$ 450,75</p>
          </CardContent>
        </Card>
      </div>

      {/* Extrato Detalhado */}
      <Card>
        <CardHeader>
          <CardTitle>Movimentações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockExtrato.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${item.tipo === "credito" ? "bg-green-100" : "bg-red-100"}`}>
                    <DollarSign className={`h-5 w-5 ${item.tipo === "credito" ? "text-green-600" : "text-red-600"}`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.descricao}</p>
                    <p className="text-sm text-gray-600">{new Date(item.data).toLocaleDateString("pt-BR")}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`font-bold text-lg ${item.tipo === "credito" ? "text-green-600" : "text-red-600"}`}>
                    {item.tipo === "credito" ? "+" : "-"}R$ {item.valor.toFixed(2)}
                  </p>
                  <Badge variant={item.tipo === "credito" ? "default" : "secondary"}>
                    {item.tipo === "credito" ? "Crédito" : "Débito"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Composição da Taxa */}
      <Card>
        <CardHeader>
          <CardTitle>Composição da Taxa Mensal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-gray-600">Taxa de Condomínio</p>
              <p className="text-2xl font-bold text-blue-600">R$ 380,00</p>
              <p className="text-xs text-gray-500">84.3% do total</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-gray-600">Fundo de Reserva</p>
              <p className="text-2xl font-bold text-green-600">R$ 45,00</p>
              <p className="text-xs text-gray-500">10.0% do total</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-gray-600">Taxa de Limpeza</p>
              <p className="text-2xl font-bold text-purple-600">R$ 25,75</p>
              <p className="text-xs text-gray-500">5.7% do total</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Mensal:</span>
              <span className="text-xl font-bold">R$ 450,75</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
