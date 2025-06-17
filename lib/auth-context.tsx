"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import Cookies from "js-cookie"

export type UserRole = "admin" | "morador"
export type Plan = "starter" | "pro" | "enterprise" | "trial"

// Interface para representar uma unidade (apartamento/casa)
export interface Unidade {
  id: string
  numero: string
  bloco?: string
  tipo: "apartamento" | "casa" | "sala" | "outro"
}

export interface Condominio {
  id: string
  name: string
  // Para moradores, incluímos suas unidades neste condomínio
  unidades?: Unidade[]
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  // Plan só é relevante para admins
  plan: Plan | null
  activeCondominioId?: string
  condominios: Condominio[]
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (data: RegisterData) => Promise<void>
  isLoading: boolean
  switchCondominio: (condominioId: string) => void
  updateUserPlan: (newPlan: Plan) => void
}

interface RegisterData {
  name: string
  email: string
  password: string
  role: UserRole
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Mock de condomínios para simulação
const mockCondominiosDb = [
  { id: "1", name: "Residencial Flores" },
  { id: "2", name: "Edifício Central" },
  { id: "3", name: "Vila Verde Condomínio Clube" },
]

// Mock de unidades para moradores
const mockUnidadesDb = {
  "1": [
    { id: "101", numero: "101", bloco: "A", tipo: "apartamento" as const },
    { id: "102", numero: "102", bloco: "A", tipo: "apartamento" as const },
  ],
  "2": [{ id: "201", numero: "201", bloco: "Único", tipo: "apartamento" as const }],
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let savedUser = Cookies.get("user")
    if (!savedUser) {
      savedUser = localStorage.getItem("user")
    }

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser) as User

        // Garantir que a estrutura do usuário está correta
        if (!parsedUser.condominios) {
          if (parsedUser.role === "admin") {
            parsedUser.condominios = mockCondominiosDb.slice(0, 1)
          } else {
            // Para moradores, incluir suas unidades
            parsedUser.condominios = [
              {
                ...mockCondominiosDb[0],
                unidades: mockUnidadesDb["1"],
              },
            ]
          }
        }

        // Garantir que activeCondominioId está definido
        if (!parsedUser.activeCondominioId && parsedUser.condominios.length > 0) {
          parsedUser.activeCondominioId = parsedUser.condominios[0].id
        }

        // Garantir que plan é null para moradores
        if (parsedUser.role === "morador") {
          parsedUser.plan = null
        }

        setUser(parsedUser)
        Cookies.set("user", JSON.stringify(parsedUser), { expires: 7 })
        localStorage.setItem("user", JSON.stringify(parsedUser))
      } catch (e) {
        console.error("Failed to parse user", e)
        Cookies.remove("user")
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    let mockUser: User

    if (email.includes("admin")) {
      mockUser = {
        id: "1",
        name: "Admin Silva",
        email,
        role: "admin",
        plan: "pro", // Admin tem plano
        condominios: mockCondominiosDb,
        activeCondominioId: mockCondominiosDb[0].id,
      }
    } else if (email.includes("morador")) {
      // Morador com múltiplos condomínios
      mockUser = {
        id: "2",
        name: "João Morador",
        email,
        role: "morador",
        plan: null, // Morador não tem plano
        condominios: [
          { ...mockCondominiosDb[0], unidades: mockUnidadesDb["1"] },
          { ...mockCondominiosDb[1], unidades: mockUnidadesDb["2"] },
        ],
        activeCondominioId: mockCondominiosDb[0].id,
      }
    } else {
      setIsLoading(false)
      throw new Error("Usuário não encontrado")
    }

    setUser(mockUser)
    Cookies.set("user", JSON.stringify(mockUser), { expires: 7 })
    localStorage.setItem("user", JSON.stringify(mockUser))
    setIsLoading(false)
  }

  const register = async (data: RegisterData) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    let newUser: User

    if (data.role === "admin") {
      // Administrador com um condomínio inicial
      const firstCondominio = {
        id: Date.now().toString() + "_condo",
        name: "Meu Primeiro Condomínio",
      }

      newUser = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        role: "admin",
        plan: "starter", // Admin começa com plano Starter
        condominios: [firstCondominio],
        activeCondominioId: firstCondominio.id,
      }
    } else {
      // Morador - precisa ser associado a um condomínio existente
      // Na prática, isso seria feito por um admin que enviaria um convite
      newUser = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        role: "morador",
        plan: null, // Morador não tem plano
        condominios: [
          {
            ...mockCondominiosDb[0],
            unidades: [mockUnidadesDb["1"][0]], // Associado a uma unidade
          },
        ],
        activeCondominioId: mockCondominiosDb[0].id,
      }
    }

    setUser(newUser)
    Cookies.set("user", JSON.stringify(newUser), { expires: 7 })
    localStorage.setItem("user", JSON.stringify(newUser))
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    Cookies.remove("user")
    localStorage.removeItem("user")
  }

  const switchCondominio = (condominioId: string) => {
    setUser((currentUser) => {
      if (currentUser && currentUser.condominios.find((c) => c.id === condominioId)) {
        const updatedUser = { ...currentUser, activeCondominioId: condominioId }
        Cookies.set("user", JSON.stringify(updatedUser), { expires: 7 })
        localStorage.setItem("user", JSON.stringify(updatedUser))
        return updatedUser
      }
      return currentUser
    })
  }

  const updateUserPlan = (newPlan: Plan) => {
    setUser((currentUser) => {
      if (currentUser && currentUser.role === "admin") {
        // Lógica para adicionar mais condomínios se o plano permitir
        let updatedCondominios = [...currentUser.condominios]
        if (newPlan === "pro" && currentUser.plan !== "pro" && currentUser.plan !== "enterprise") {
          // Adiciona mais condomínios mock se não existirem
          if (updatedCondominios.length < 2) {
            updatedCondominios.push({ id: "new_condo_1", name: "Condomínio Pro 1" })
          }
          if (updatedCondominios.length < 3 && mockCondominiosDb.length >= 2) {
            updatedCondominios.push(mockCondominiosDb[1])
          }
        } else if (newPlan === "starter") {
          updatedCondominios = updatedCondominios.slice(0, 1) // Limita a 1 condomínio
        }

        const updatedUser = { ...currentUser, plan: newPlan, condominios: updatedCondominios }
        if (
          updatedUser.condominios.length > 0 &&
          !updatedUser.condominios.find((c) => c.id === updatedUser.activeCondominioId)
        ) {
          updatedUser.activeCondominioId = updatedUser.condominios[0].id
        }

        Cookies.set("user", JSON.stringify(updatedUser), { expires: 7 })
        localStorage.setItem("user", JSON.stringify(updatedUser))
        return updatedUser
      }
      return currentUser
    })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading, switchCondominio, updateUserPlan }}>
      {children}
    </AuthContext.Provider>
  )
}
