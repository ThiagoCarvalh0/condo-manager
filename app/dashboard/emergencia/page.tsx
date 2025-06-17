"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { Phone, AlertTriangle, Shield, Heart, Wrench } from "lucide-react"

const emergencyContacts = [
  {
    category: "Emergências Gerais",
    icon: AlertTriangle,
    color: "text-red-600 bg-red-100",
    contacts: [
      { name: "Bombeiros", number: "193", description: "Incêndios, acidentes, resgates" },
      { name: "Polícia Militar", number: "190", description: "Ocorrências policiais" },
      { name: "SAMU", number: "192", description: "Emergências médicas" },
      { name: "Polícia Civil", number: "197", description: "Denúncias e investigações" },
    ],
  },
  {
    category: "Condomínio",
    icon: Shield,
    color: "text-blue-600 bg-blue-100",
    contacts: [
      { name: "Portaria", number: "(11) 2222-2222", description: "Atendimento 24h" },
      { name: "Síndico", number: "(11) 99999-9999", description: "Maria Silva" },
      { name: "Administradora", number: "(11) 3333-3333", description: "Silva & Associados" },
      { name: "Zelador", number: "(11) 88888-8888", description: "João Santos" },
    ],
  },
  {
    category: "Serviços Públicos",
    icon: Wrench,
    color: "text-green-600 bg-green-100",
    contacts: [
      { name: "Eletropaulo", number: "0800-727-0196", description: "Falta de energia" },
      { name: "Sabesp", number: "0800-055-0195", description: "Problemas de água" },
      { name: "Comgás", number: "0800-011-4000", description: "Vazamento de gás" },
      { name: "Defesa Civil", number: "199", description: "Emergências climáticas" },
    ],
  },
  {
    category: "Saúde",
    icon: Heart,
    color: "text-pink-600 bg-pink-100",
    contacts: [
      { name: "Hospital São Paulo", number: "(11) 5555-5555", description: "Pronto Socorro 24h" },
      { name: "UBS Jardim Primavera", number: "(11) 4444-4444", description: "Unidade Básica de Saúde" },
      { name: "Farmácia 24h", number: "(11) 6666-6666", description: "Drogaria São Paulo" },
      { name: "Centro de Intoxicações", number: "0800-771-3733", description: "Intoxicações e envenenamentos" },
    ],
  },
]

export default function EmergenciaPage() {
  const { user } = useAuth()

  if (!user || user.role !== "morador") {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Acesso negado. Apenas moradores podem acessar esta página.</p>
      </div>
    )
  }

  const handleCall = (number: string) => {
    window.open(`tel:${number}`, "_self")
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center">
          <AlertTriangle className="mr-2 h-6 w-6 text-red-600" />
          Contatos de Emergência
        </h1>
        <p className="text-gray-600 mt-2">Tenha sempre à mão os números importantes para situações de emergência</p>
      </div>

      {/* Alerta de Emergência */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-900">Em caso de emergência grave</h3>
              <p className="text-red-700">
                Ligue imediatamente para 193 (Bombeiros), 190 (Polícia) ou 192 (SAMU) dependendo da situação.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Contatos por Categoria */}
      <div className="grid gap-6">
        {emergencyContacts.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className={`p-2 rounded-lg mr-3 ${category.color}`}>
                  <category.icon className="h-5 w-5" />
                </div>
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.contacts.map((contact, contactIndex) => (
                  <div key={contactIndex} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.description}</p>
                      <p className="text-lg font-bold text-blue-600 mt-1">{contact.number}</p>
                    </div>
                    <Button
                      onClick={() => handleCall(contact.number)}
                      className="ml-4 bg-green-600 hover:bg-green-700"
                      size="sm"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Ligar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Instruções Gerais */}
      <Card>
        <CardHeader>
          <CardTitle>Instruções Importantes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-red-600 text-sm font-bold">1</span>
              </div>
              <div>
                <p className="font-medium">Mantenha a calma</p>
                <p className="text-sm text-gray-600">
                  Em situações de emergência, manter a calma é fundamental para tomar as decisões corretas.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-red-600 text-sm font-bold">2</span>
              </div>
              <div>
                <p className="font-medium">Avalie a situação</p>
                <p className="text-sm text-gray-600">
                  Identifique o tipo de emergência e escolha o contato mais apropriado.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-red-600 text-sm font-bold">3</span>
              </div>
              <div>
                <p className="font-medium">Forneça informações claras</p>
                <p className="text-sm text-gray-600">
                  Ao ligar, informe claramente sua localização, o tipo de emergência e quantas pessoas estão envolvidas.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-red-600 text-sm font-bold">4</span>
              </div>
              <div>
                <p className="font-medium">Aguarde orientações</p>
                <p className="text-sm text-gray-600">
                  Siga as instruções dos profissionais e não desligue até ser orientado a fazê-lo.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
