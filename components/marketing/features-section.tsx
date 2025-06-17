"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Users, MessageSquare, Wrench, FileText, Shield, BarChart3, Calendar, Bell } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: DollarSign,
    title: "Gestão Financeira Completa",
    description: "Controle de receitas, despesas, inadimplência e relatórios financeiros detalhados.",
    color: "text-green-600 bg-green-100",
  },
  {
    icon: Users,
    title: "Cadastro de Moradores",
    description: "Gerencie informações dos moradores, proprietários e inquilinos de forma organizada.",
    color: "text-blue-600 bg-blue-100",
  },
  {
    icon: MessageSquare,
    title: "Comunicação Eficiente",
    description: "Avisos, assembleias e comunicados diretos para todos os moradores.",
    color: "text-purple-600 bg-purple-100",
  },
  {
    icon: Wrench,
    title: "Manutenção Preventiva",
    description: "Agende e acompanhe manutenções, reparos e melhorias do condomínio.",
    color: "text-orange-600 bg-orange-100",
  },
  {
    icon: FileText,
    title: "Documentos Digitais",
    description: "Armazene e organize todos os documentos importantes do condomínio.",
    color: "text-indigo-600 bg-indigo-100",
  },
  {
    icon: Shield,
    title: "Controle de Acesso",
    description: "Gerencie visitantes, prestadores de serviço e segurança do condomínio.",
    color: "text-red-600 bg-red-100",
  },
  {
    icon: BarChart3,
    title: "Relatórios Inteligentes",
    description: "Dashboards e relatórios automáticos para tomada de decisões estratégicas.",
    color: "text-teal-600 bg-teal-100",
  },
  {
    icon: Calendar,
    title: "Agenda de Eventos",
    description: "Organize assembleias, eventos e reservas de espaços comuns.",
    color: "text-pink-600 bg-pink-100",
  },
  {
    icon: Bell,
    title: "Notificações Inteligentes",
    description: "Receba alertas importantes sobre vencimentos, manutenções e eventos.",
    color: "text-yellow-600 bg-yellow-100",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tudo que você precisa para gerenciar seu condomínio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nossa plataforma oferece todas as ferramentas necessárias para uma gestão eficiente e transparente
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full feature-card-hover border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
