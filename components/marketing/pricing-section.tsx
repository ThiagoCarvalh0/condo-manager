"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const plans = [
  {
    name: "Starter",
    price: "R$ 99",
    period: "/mês",
    description: "Perfeito para condomínios pequenos",
    features: [
      "Até 50 unidades",
      "Gestão financeira básica",
      "Cadastro de moradores",
      "Comunicação por email",
      "Suporte por email",
      "1 condomínio",
    ],
    popular: false,
    cta: "Começar Grátis",
  },
  {
    name: "Pro",
    price: "R$ 199",
    period: "/mês",
    description: "Ideal para a maioria dos condomínios",
    features: [
      "Até 200 unidades",
      "Gestão financeira completa",
      "Múltiplos condomínios",
      "App mobile para moradores",
      "Relatórios avançados",
      "Controle de acesso",
      "Suporte prioritário",
      "Integração com bancos",
    ],
    popular: true,
    cta: "Teste Grátis por 30 dias",
  },
  {
    name: "Enterprise",
    price: "R$ 399",
    period: "/mês",
    description: "Para grandes administradoras",
    features: [
      "Unidades ilimitadas",
      "Condomínios ilimitados",
      "API personalizada",
      "Integração com ERP",
      "Suporte 24/7",
      "Treinamento personalizado",
      "Gerente de conta dedicado",
      "Customizações avançadas",
    ],
    popular: false,
    cta: "Falar com Vendas",
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Planos que crescem com seu negócio</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolha o plano ideal para o seu condomínio. Todos incluem teste grátis de 30 dias.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card
                className={`h-full ${plan.popular ? "border-blue-500 border-2 shadow-xl scale-105" : "border-gray-200"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1 flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Mais Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                    asChild
                  >
                    <Link href="/auth/register">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">Precisa de algo personalizado? Entre em contato conosco.</p>
          <Button variant="outline" size="lg">
            Falar com Especialista
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
