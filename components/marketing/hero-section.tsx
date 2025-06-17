"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, CheckCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient opacity-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mais de 1.000 condomínios confiam em nós
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Gestão de Condomínios
              <span className="text-blue-600 block">Sem Complicação</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Simplifique a administração do seu condomínio com nossa plataforma completa. Controle financeiro,
              comunicação eficiente e muito mais em um só lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="text-lg px-8 py-4" asChild>
                <Link href="/auth/register">
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <Play className="mr-2 h-5 w-5" />
                Ver Demonstração
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Teste grátis por 30 dias
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Sem cartão de crédito
              </div>
            </div>
          </motion.div>

          {/* Right column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main dashboard mockup */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-12 rounded-lg mb-4 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  </div>
                  <div className="ml-4 text-white font-medium">Dashboard - CondoManager</div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg mb-2"></div>
                      <div className="h-2 bg-blue-200 rounded mb-1"></div>
                      <div className="h-2 bg-blue-100 rounded w-2/3"></div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="w-8 h-8 bg-green-500 rounded-lg mb-2"></div>
                      <div className="h-2 bg-green-200 rounded mb-1"></div>
                      <div className="h-2 bg-green-100 rounded w-2/3"></div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg mb-2"></div>
                      <div className="h-2 bg-purple-200 rounded mb-1"></div>
                      <div className="h-2 bg-purple-100 rounded w-2/3"></div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-200 rounded"></div>
                      <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                      <div className="h-2 bg-gray-200 rounded w-3/5"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full animate-float">
                <CheckCircle className="w-6 h-6" />
              </div>

              <div
                className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full animate-float"
                style={{ animationDelay: "2s" }}
              >
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
