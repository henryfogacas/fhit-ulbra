export type ActionResult<T = undefined> =
  | { success: true; data?: T }
  | { success: false; error: string };

/** Mensagem genérica para o usuário, sem expor detalhes técnicos (RNF11). */
export const GENERIC_ERROR =
  "Ocorreu um erro ao processar sua solicitação. Tente novamente.";
