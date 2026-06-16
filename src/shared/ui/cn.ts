export type ClassValue = string | false | null | undefined;

/** Concatena classes condicionais sem dependências externas. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
