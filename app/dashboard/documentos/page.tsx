"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { FileText, Upload, Download, Search, Eye, Trash2, Folder } from "lucide-react"
import Link from "next/link"

const mockDocumentos = [
  {
    id: "1",
    nome: "Ata da Assembleia - Janeiro 2024",
    categoria: "assembleia",
    tipo: "PDF",
    tamanho: "2.5 MB",
    dataUpload: "2024-01-15",
    downloads: 45,
    publico: true,
  },
  {
    id: "2",
    nome: "Regulamento Interno",
    categoria: "regulamento",
    tipo: "PDF",
    tamanho: "1.8 MB",
    dataUpload: "2024-01-10",
    downloads: 89,
    publico: true,
  },
  {
    id: "3",
    nome: "Orçamento Anual 2024",
    categoria: "financeiro",
    tipo: "XLSX",
    tamanho: "856 KB",
    dataUpload: "2024-01-08",
    downloads: 23,
    publico: false,
  },
]

export default function DocumentosAdminPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategoria, setFilterCategoria] = useState("todos")

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas administradores podem acessar esta página.</p>
      </div>
    )
  }

  const condominioAtual = user.condominios.find((c) => c.id === user.activeCondominioId)

  const filteredDocumentos = mockDocumentos.filter((documento) => {
    const matchesSearch = documento.nome.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCategoria === "todos" || documento.categoria === filterCategoria
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Documentos</h1>
          <p className="text-gray-600">Gerencie documentos do condomínio - {condominioAtual?.name}</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/documentos/upload">
            <Upload className="mr-2 h-4 w-4" />
            Upload Documento
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Documentos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">Todos os documentos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documentos Públicos</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">Visíveis aos moradores</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads Este Mês</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">+18% vs mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Espaço Utilizado</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.8 GB</div>
            <p className="text-xs text-muted-foreground">de 10 GB disponíveis</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar documentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterCategoria === "todos" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterCategoria("todos")}
              >
                Todos
              </Button>
              <Button
                variant={filterCategoria === "assembleia" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterCategoria("assembleia")}
              >
                Assembleias
              </Button>
              <Button
                variant={filterCategoria === "regulamento" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterCategoria("regulamento")}
              >
                Regulamentos
              </Button>
              <Button
                variant={filterCategoria === "financeiro" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterCategoria("financeiro")}
              >
                Financeiro
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Documentos */}
      <Card>
        <CardHeader>
          <CardTitle>Documentos ({filteredDocumentos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocumentos.map((documento) => (
              <div
                key={documento.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <h3 className="font-semibold">{documento.nome}</h3>
                    <Badge variant="outline">{documento.categoria}</Badge>
                    <Badge variant={documento.publico ? "default" : "secondary"}>
                      {documento.publico ? "Público" : "Privado"}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{documento.tipo}</span>
                    <span>{documento.tamanho}</span>
                    <span>Enviado em {new Date(documento.dataUpload).toLocaleDateString()}</span>
                    <span>{documento.downloads} downloads</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-1 h-3 w-3" />
                    Visualizar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-1 h-3 w-3" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-1 h-3 w-3" />
                    Excluir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
