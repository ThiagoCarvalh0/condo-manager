"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-context"
import { Building2, DollarSign, Clock, Shield, Bell, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ConfiguracoesPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [config, setConfig] = useState({
    // Informações Básicas
    nomeCondominio: "Residencial Jardim das Flores",
    endereco: "Rua das Flores, 123 - Jardim Primavera",
    cnpj: "12.345.678/0001-90",
    telefone: "(11) 3456-7890",
    email: "contato@residencialjardim.com.br",

    // Configurações Financeiras
    diaVencimento: "10",
    taxaJuros: "2.0",
    multaAtraso: "10.0",
    valorCondominio: "450.75",

    // Configurações de Funcionamento
    horarioPortaria: "06:00 às 22:00",
    horarioPiscina: "06:00 às 22:00",
    horarioSalaoFestas: "08:00 às 02:00",

    // Notificações
    notificarVencimentos: true,
    notificarReservas: true,
    notificarManutencao: true,
    notificarAssembleias: true,

    // Regras
    permitirAnimais: true,
    limitePessoas: "4",
    antecedenciaReserva: "7",

    // Observações
    observacoes: "Condomínio residencial com 156 unidades distribuídas em 3 blocos.",
  })

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas administradores podem acessar esta página.</p>
      </div>
    )
  }

  const condominioAtual = user.condominios.find((c) => c.id === user.activeCondominioId)

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Configurações salvas!",
      description: "As configurações do condomínio foram atualizadas com sucesso.",
    })

    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600">Configure as informações e regras do condomínio - {condominioAtual?.name}</p>
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="mr-2 h-5 w-5" />
              Informações Básicas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="nomeCondominio">Nome do Condomínio</Label>
              <Input
                id="nomeCondominio"
                value={config.nomeCondominio}
                onChange={(e) => setConfig({ ...config, nomeCondominio: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="endereco">Endereço</Label>
              <Input
                id="endereco"
                value={config.endereco}
                onChange={(e) => setConfig({ ...config, endereco: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input id="cnpj" value={config.cnpj} onChange={(e) => setConfig({ ...config, cnpj: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={config.telefone}
                  onChange={(e) => setConfig({ ...config, telefone: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={config.email}
                onChange={(e) => setConfig({ ...config, email: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configurações Financeiras */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5" />
              Configurações Financeiras
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="diaVencimento">Dia do Vencimento</Label>
                <Input
                  id="diaVencimento"
                  value={config.diaVencimento}
                  onChange={(e) => setConfig({ ...config, diaVencimento: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="valorCondominio">Valor Base (R$)</Label>
                <Input
                  id="valorCondominio"
                  value={config.valorCondominio}
                  onChange={(e) => setConfig({ ...config, valorCondominio: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="taxaJuros">Taxa de Juros (%)</Label>
                <Input
                  id="taxaJuros"
                  value={config.taxaJuros}
                  onChange={(e) => setConfig({ ...config, taxaJuros: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="multaAtraso">Multa por Atraso (%)</Label>
                <Input
                  id="multaAtraso"
                  value={config.multaAtraso}
                  onChange={(e) => setConfig({ ...config, multaAtraso: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Horários de Funcionamento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Horários de Funcionamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="horarioPortaria">Portaria</Label>
              <Input
                id="horarioPortaria"
                value={config.horarioPortaria}
                onChange={(e) => setConfig({ ...config, horarioPortaria: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="horarioPiscina">Piscina</Label>
              <Input
                id="horarioPiscina"
                value={config.horarioPiscina}
                onChange={(e) => setConfig({ ...config, horarioPiscina: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="horarioSalaoFestas">Salão de Festas</Label>
              <Input
                id="horarioSalaoFestas"
                value={config.horarioSalaoFestas}
                onChange={(e) => setConfig({ ...config, horarioSalaoFestas: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Regras do Condomínio */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Regras do Condomínio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="permitirAnimais">Permitir Animais de Estimação</Label>
              <Switch
                id="permitirAnimais"
                checked={config.permitirAnimais}
                onCheckedChange={(checked) => setConfig({ ...config, permitirAnimais: checked })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="limitePessoas">Limite de Pessoas por Unidade</Label>
                <Input
                  id="limitePessoas"
                  value={config.limitePessoas}
                  onChange={(e) => setConfig({ ...config, limitePessoas: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="antecedenciaReserva">Antecedência para Reservas (dias)</Label>
                <Input
                  id="antecedenciaReserva"
                  value={config.antecedenciaReserva}
                  onChange={(e) => setConfig({ ...config, antecedenciaReserva: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Configurações de Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notificarVencimentos">Notificar Vencimentos</Label>
              <Switch
                id="notificarVencimentos"
                checked={config.notificarVencimentos}
                onCheckedChange={(checked) => setConfig({ ...config, notificarVencimentos: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notificarReservas">Notificar Novas Reservas</Label>
              <Switch
                id="notificarReservas"
                checked={config.notificarReservas}
                onCheckedChange={(checked) => setConfig({ ...config, notificarReservas: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notificarManutencao">Notificar Solicitações de Manutenção</Label>
              <Switch
                id="notificarManutencao"
                checked={config.notificarManutencao}
                onCheckedChange={(checked) => setConfig({ ...config, notificarManutencao: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notificarAssembleias">Notificar Assembleias</Label>
              <Switch
                id="notificarAssembleias"
                checked={config.notificarAssembleias}
                onCheckedChange={(checked) => setConfig({ ...config, notificarAssembleias: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Observações */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Observações Gerais</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={config.observacoes}
              onChange={(e) => setConfig({ ...config, observacoes: e.target.value })}
              placeholder="Informações adicionais sobre o condomínio..."
              rows={4}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
