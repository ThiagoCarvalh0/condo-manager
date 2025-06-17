"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { CreditCard, Download, AlertTriangle } from "lucide-react"
import { useState } from "react"

export default function SegundaViaPage() {
  const { user } = useAuth()
  const [selectedMonth, setSelectedMonth] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  if (!user || user.role !== "morador") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas moradores podem acessar esta página.</p>
      </div>
    )
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simular geração
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
    // Aqui seria feito o download do boleto
  }

  const availableMonths = [
    { value: "2024-07", label: "Julho 2024" },
    { value: "2024-06", label: "Junho 2024" },
    { value: "2024-05", label: "Maio 2024" },
    { value: "2024-04", label: "Abril 2024" },
    { value: "2024-03", label: "Março 2024" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Segunda Via de Boleto</h1>
        <p className="text-gray-600">Gere a segunda via do seu boleto com valores atualizados</p>
      </div>

      {/* Alerta Importante */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900">Importante</h3>
              <p className="text-yellow-700 text-sm mt-1">
                A segunda via será gerada com valores atualizados, incluindo multa e juros se aplicável. Para boletos em
                dia, use a opção "Baixar" na página de boletos.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulário de Geração */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Gerar Segunda Via
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="month">Selecione o mês de referência</Label>
            <select
              id="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selecione um mês</option>
              {availableMonths.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>

          {selectedMonth && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Detalhes do Boleto</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Mês de referência:</p>
                  <p className="font-medium">{availableMonths.find((m) => m.value === selectedMonth)?.label}</p>
                </div>
                <div>
                  <p className="text-gray-600">Valor original:</p>
                  <p className="font-medium">R$ 450,75</p>
                </div>
                <div>
                  <p className="text-gray-600">Vencimento original:</p>
                  <p className="font-medium">
                    10/{selectedMonth.split("-")[1]}/{selectedMonth.split("-")[0]}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Status:</p>
                  <p className="font-medium text-red-600">Em atraso</p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-red-50 rounded border border-red-200">
                <p className="text-sm text-red-800">
                  <strong>Valor atualizado:</strong> R$ 459,77
                  <br />
                  <span className="text-xs">Inclui multa de 2% (R$ 9,02) + juros</span>
                </p>
              </div>
            </div>
          )}

          <Button onClick={handleGenerate} disabled={!selectedMonth || isGenerating} className="w-full">
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Gerando Segunda Via...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Gerar e Baixar Segunda Via
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Informações sobre Multa e Juros */}
      <Card>
        <CardHeader>
          <CardTitle>Informações sobre Multa e Juros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-bold">1</span>
              </div>
              <div>
                <p className="font-medium">Multa por Atraso</p>
                <p className="text-sm text-gray-600">
                  2% sobre o valor do boleto, aplicada no primeiro dia após o vencimento.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-bold">2</span>
              </div>
              <div>
                <p className="font-medium">Juros de Mora</p>
                <p className="text-sm text-gray-600">
                  1% ao mês sobre o valor do boleto, calculado proporcionalmente aos dias de atraso.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-bold">3</span>
              </div>
              <div>
                <p className="font-medium">Atualização Monetária</p>
                <p className="text-sm text-gray-600">
                  Valores são atualizados conforme índices oficiais quando aplicável.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
