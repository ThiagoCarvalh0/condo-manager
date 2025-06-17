"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Maria Silva",
    role: "Síndica - Residencial Jardim das Flores",
    content:
      "O CondoManager revolucionou a gestão do nosso condomínio. A comunicação com os moradores ficou muito mais eficiente e o controle financeiro é impecável.",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
  {
    name: "João Santos",
    role: "Administrador Predial - Santos & Associados",
    content:
      "Gerencio 15 condomínios com a plataforma. A automação dos processos me economiza horas de trabalho por semana. Recomendo para todos os colegas.",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
  {
    name: "Ana Costa",
    role: "Moradora - Condomínio Vila Verde",
    content:
      "Como moradora, adoro receber as informações de forma organizada pelo app. Posso acompanhar as finanças do condomínio de forma transparente.",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
  {
    name: "Carlos Oliveira",
    role: "Síndico - Edifício Central Park",
    content:
      "A gestão de manutenção preventiva é fantástica. Conseguimos reduzir custos e melhorar a qualidade de vida dos moradores significativamente.",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
  {
    name: "Lucia Ferreira",
    role: "Administradora - Ferreira Administração",
    content:
      "Os relatórios automáticos facilitaram muito meu trabalho. Posso apresentar dados precisos para os condôminos com apenas alguns cliques.",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
  {
    name: "Roberto Lima",
    role: "Síndico - Residencial Boa Vista",
    content:
      "O suporte é excepcional e a plataforma é muito intuitiva. Mesmo sem conhecimento técnico, consegui implementar rapidamente.",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">O que nossos clientes dizem</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mais de 1.000 condomínios já transformaram sua gestão com o CondoManager
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>

                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
