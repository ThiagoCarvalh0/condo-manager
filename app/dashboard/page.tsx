"use client"

import { useAuth } from "@/lib/auth-context"
import { AdminDashboard } from "@/components/dashboard/admin/admin-dashboard"
import { ResidentDashboard } from "@/components/dashboard/resident/resident-dashboard"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-theme(space.16)-theme(space.6))]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-600">Carregando dados do usuário...</p>
      </div>
    )
  }

  if (!user) {
    // Isso não deveria acontecer se o layout e middleware estiverem corretos,
    // mas é uma salvaguarda.
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Erro: Usuário não autenticado.</p>
        <p className="text-sm text-gray-500">Você será redirecionado para o login.</p>
      </div>
    )
  }

  if (user.role === "admin") {
    return <AdminDashboard />
  }

  if (user.role === "morador") {
    return <ResidentDashboard />
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">Tipo de usuário desconhecido</h1>
      <p>Não foi possível carregar o dashboard apropriado.</p>
    </div>
  )
}
