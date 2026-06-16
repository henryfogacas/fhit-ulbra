import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/config/auth-options";
import { userRepository } from "@/entities/user/repository";

/**
 * Retorna o publicId do usuário autenticado a partir da sessão NextAuth.
 * Retorna null quando não há sessão.
 */
export async function getCurrentUserPublicId(): Promise<string | null> {
  const session = await getServerSession(authOptions);
  return session?.user?.id ?? null;
}

/**
 * Resolve o id interno (numérico) do usuário autenticado, usado nas
 * consultas do repositório. Lança erro quando não há usuário autenticado,
 * garantindo o isolamento de dados (RF19).
 */
export async function requireUserId(): Promise<number> {
  const publicId = await getCurrentUserPublicId();

  if (!publicId) {
    throw new Error("Não autenticado");
  }

  const user = await userRepository.getIdByPublicId(publicId);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return user.id;
}
