"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { FileText, Download, Eye, Calendar, Search, Filter } from "lucide-react"

const mockDocumentos = [
  {
    id: "1",
    nome: "Ata da Assembleia - Junho 2024",
    tipo: "ata",
    categoria: "Assembleia",
    dataPublicacao: "2024-06-15",
    tamanho: "2.3 MB",
    formato: "PDF",
    descricao: "Ata da assembleia geral ordinária de junho de 2024",
  },
  {
    id: "2",
    nome: "Regulamento Interno do Condomínio",
    tipo: "regulamento",
    categoria: "Regulamento",
    dataPublicacao: "2024-01-10",
    tamanho: "1.8 MB",
    formato: "PDF",
    descricao: "Regulamento interno atualizado com as novas regras",
  },
  {
    id: "3",
    nome: "Demonstrativo Financeiro - Junho 2024",
    tipo: "financeiro",
    categoria: "Financeiro",
    dataPublicacao: "2024-07-01",
    tamanho: "856 KB",
    formato: "PDF",
    descricao: "Demonstrativo das receitas e despesas do mês de junho",
  },
  {
    id: "4",
    nome: "Manual do Morador",
    tipo: "manual",
    categoria: "Informativo",
    dataPublicacao: "2024-01-15",
    tamanho: "3.2 MB",
    formato: "PDF",
    descricao: "Manual completo com informações para novos moradores",
  },
  {
    id: "5",
    nome: "Convenção do Condomínio",
    tipo: "convencao",
    categoria: "Legal",
    dataPublicacao: "2023-12-01",
    tamanho: "2.1 MB",
    formato: "PDF",
    descricao: "Convenção registrada em cartório",
  },
  {
    id: "6",
    nome: "Relatório de Manutenção - 1º Semestre 2024",
    tipo: "relatorio",
    categoria: "Manutenção",
    dataPublicacao: "2024-07-05",
    tamanho: "1.4 MB",
    formato: "PDF",
    descricao: "Relatório das manutenções realizadas no primeiro semestre",
  },
]

export default function DocumentosPage() {
  const { user } = useAuth()

  if (!user || user.role !== "morador") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas moradores podem acessar esta página.</p>
      </div>
    )
  }

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "ata":
        return <Badge className="bg-blue-100 text-blue-800">Ata</Badge>
      case "regulamento":
        return <Badge className="bg-purple-100 text-purple-800">Regulamento</Badge>
      case "financeiro":
        return <Badge className="bg-green-100 text-green-800">Financeiro</Badge>
      case "manual":
        return <Badge className="bg-orange-100 text-orange-800">Manual</Badge>
      case "convencao":
        return <Badge className="bg-red-100 text-red-800">Convenção</Badge>
      case "relatorio":
        return <Badge className="bg-gray-100 text-gray-800">Relatório</Badge>
      default:
        return <Badge variant="secondary">Outro</Badge>
    }
  }

  const documentosRecentes = mockDocumentos.filter((doc) => {
    const dataDoc = new Date(doc.dataPublicacao)
    const trintaDiasAtras = new Date()
    trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30)
    return dataDoc >= trintaDiasAtras
  }).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documentos</h1>
          <p className="text-gray-600">Acesse todos os documentos importantes do condomínio</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
        </div>
      </div>

      {/* Busca */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar documentos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Documentos</p>
                <p className="text-lg font-bold text-gray-900">{mockDocumentos.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Adicionados Recentemente</p>
                <p className="text-lg font-bold text-gray-900">{documentosRecentes}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-xs text-gray-500 mt-1">Últimos 30 dias</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categorias</p>
                <p className="text-lg font-bold text-gray-900">6</p>
              </div>
              <Filter className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Documentos */}
      <Card>
        <CardHeader>
          <CardTitle>Todos os Documentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDocumentos.map((documento) => (
              <div key={documento.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-gray-900">{documento.nome}</h3>
                      {getTipoBadge(documento.tipo)}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{documento.descricao}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Publicado em {new Date(documento.dataPublicacao).toLocaleDateString("pt-BR")}</span>
                      <span>{documento.formato}</span>
                      <span>{documento.tamanho}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Visualizar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Baixar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Categorias */}
      <Card>
        <CardHeader>
          <CardTitle>Documentos por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100">
              <FileText className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="font-medium">Atas</p>
              <p className="text-sm text-gray-600">{mockDocumentos.filter((d) => d.tipo === "ata").length} docs</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100">
              <FileText className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="font-medium">Financeiro</p>
              <p className="text-sm text-gray-600">
                {mockDocumentos.filter((d) => d.tipo === "financeiro").length} docs
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100">
              <FileText className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="font-medium">Regulamentos</p>
              <p className="text-sm text-gray-600">
                {mockDocumentos.filter((d) => d.tipo === "regulamento").length} docs
              </p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100">
              <FileText className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <p className="font-medium">Manuais</p>
              <p className="text-sm text-gray-600">{mockDocumentos.filter((d) => d.tipo === "manual").length} docs</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100">
              <FileText className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <p className="font-medium">Legal</p>
              <p className="text-sm text-gray-600">
                {mockDocumentos.filter((d) => d.tipo === "convencao").length} docs
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
              <FileText className="h-6 w-6 text-gray-600 mx-auto mb-2" />
              <p className="font-medium">Relatórios</p>
              <p className="text-sm text-gray-600">
                {mockDocumentos.filter((d) => d.tipo === "relatorio").length} docs
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações Importantes */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Informações sobre Documentos</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Todos os documentos estão em formato PDF</li>
            <li>• Documentos são atualizados regularmente pela administração</li>
            <li>• Para dúvidas sobre documentos, entre em contato com o síndico</li>
            <li>• Mantenha sempre a versão mais recente dos regulamentos</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
