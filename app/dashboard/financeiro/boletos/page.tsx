"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { CreditCard, Download, Eye, Calendar, DollarSign, AlertCircle } from "lucide-react"

const mockBoletos = [
  {
    id: "1",
    mes: "Julho/2024",
    vencimento: "2024-07-10",
    valor: 450.75,
    status: "pendente",
    diasParaVencimento: 3,
  },
  {
    id: "2",
    mes: "Junho/2024",
    vencimento: "2024-06-10",
    valor: 450.75,
    status: "pago",
    dataPagamento: "2024-06-08",
  },
  {
    id: "3",
    mes: "Maio/2024",
    vencimento: "2024-05-10",
    valor: 450.75,
    status: "pago",
    dataPagamento: "2024-05-09",
  },
  {
    id: "4",
    mes: "Abril/2024",
    vencimento: "2024-04-10",
    valor: 450.75,
    status: "pago",
    dataPagamento: "2024-04-08",
  },
]

export default function BoletosPage() {
  const { user } = useAuth()

  if (!user || user.role !== "morador") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas moradores podem acessar esta página.</p>
      </div>
    )
  }

  const getStatusBadge = (status: string, diasParaVencimento?: number) => {
    if (status === "pago") {
      return <Badge className="bg-green-100 text-green-800">Pago</Badge>
    }
    if (status === "vencido") {
      return <Badge className="bg-red-100 text-red-800">Vencido</Badge>
    }
    if (diasParaVencimento && diasParaVencimento <= 3) {
      return <Badge className="bg-yellow-100 text-yellow-800">Vence em {diasParaVencimento} dias</Badge>
    }
    return <Badge className="bg-blue-100 text-blue-800">Pendente</Badge>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Meus Boletos</h1>
        <p className="text-gray-600">Visualize e baixe seus boletos de condomínio</p>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Próximo Vencimento</p>
                <p className="text-lg font-bold text-gray-900">10/07/2024</p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Atual</p>
                <p className="text-lg font-bold text-gray-900">R$ 450,75</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <p className="text-lg font-bold text-gray-900">Em dia</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Boletos */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Boletos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockBoletos.map((boleto) => (
              <div key={boleto.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{boleto.mes}</p>
                    <p className="text-sm text-gray-600">
                      Vencimento: {new Date(boleto.vencimento).toLocaleDateString("pt-BR")}
                    </p>
                    {boleto.dataPagamento && (
                      <p className="text-sm text-green-600">
                        Pago em: {new Date(boleto.dataPagamento).toLocaleDateString("pt-BR")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-bold text-lg">R$ {boleto.valor.toFixed(2)}</p>
                    {getStatusBadge(boleto.status, boleto.diasParaVencimento)}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Baixar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Informações Importantes */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900">Informações Importantes</h3>
              <ul className="text-blue-700 text-sm mt-2 space-y-1">
                <li>• Os boletos são gerados todo dia 1º de cada mês</li>
                <li>• Vencimento sempre no dia 10 do mês</li>
                <li>• Após o vencimento, será cobrada multa de 2% + juros de 1% ao mês</li>
                <li>• Para pagamentos em atraso, solicite a 2ª via atualizada</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
