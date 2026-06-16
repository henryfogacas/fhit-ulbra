import { withAuth } from "next-auth/middleware";

/**
 * Proxy (antigo "middleware" no Next 16) que protege todas as rotas
 * autenticadas (RF18). Usuários não logados são redirecionados para a
 * página de login ("/").
 */
export default withAuth({
  pages: { signIn: "/" },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/treinos/:path*",
    "/modelos/:path*",
    "/habitos/:path*",
    "/peso/:path*",
    "/perfil/:path*",
  ],
};
