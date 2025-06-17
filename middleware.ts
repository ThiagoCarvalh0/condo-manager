import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Rotas públicas que não requerem autenticação
  const publicRoutes = ["/", "/auth/login", "/auth/register", "/pricing", "/about", "/contact"]

  // Rotas de autenticação
  const authRoutes = ["/auth/login", "/auth/register"]

  // Se é uma rota pública, permitir acesso
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Obter cookie do usuário
  const userCookie = request.cookies.get("user")

  // Se não há usuário e está tentando acessar área protegida
  if (!userCookie && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // Se há usuário e está tentando acessar páginas de auth, redirecionar para dashboard
  if (userCookie && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Se há usuário, verificar permissões baseadas em role
  if (userCookie) {
    try {
      const user = JSON.parse(userCookie.value)

      // Admin pode acessar tudo
      if (user.role === "admin") {
        return NextResponse.next()
      }

      // Restrições para moradores
      if (user.role === "morador") {
        const restrictedPaths = [
          "/dashboard/condominios",
          "/dashboard/configuracoes",
          "/dashboard/financeiro/despesas",
          "/dashboard/financeiro/inadimplencia",
          "/dashboard/pessoas/funcionarios",
          "/dashboard/pessoas/prestadores",
          "/dashboard/manutencao",
        ]

        const isRestricted = restrictedPaths.some((path) => pathname.startsWith(path))

        if (isRestricted) {
          return NextResponse.redirect(new URL("/dashboard?error=access-denied", request.url))
        }
      }
    } catch (error) {
      // Cookie inválido, limpar e redirecionar
      const response = NextResponse.redirect(new URL("/auth/login", request.url))
      response.cookies.delete("user")
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
