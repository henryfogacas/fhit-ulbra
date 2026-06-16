export type ImcCategory =
  | "Abaixo do peso"
  | "Normal"
  | "Sobrepeso"
  | "Obesidade";

export interface ImcResult {
  value: number;
  category: ImcCategory;
  color: string;
}

/**
 * Calcula o Índice de Massa Corporal e classifica o resultado (UC13).
 * @param weightKg peso em quilogramas
 * @param heightCm altura em centímetros
 */
export function calculateImc(
  weightKg: number,
  heightCm: number,
): ImcResult | null {
  if (!weightKg || !heightCm) return null;

  const heightM = heightCm / 100;
  const value = weightKg / (heightM * heightM);
  const rounded = Math.round(value * 10) / 10;

  return {
    value: rounded,
    category: classifyImc(rounded),
    color: imcColor(rounded),
  };
}

export function classifyImc(imc: number): ImcCategory {
  if (imc < 18.5) return "Abaixo do peso";
  if (imc < 25) return "Normal";
  if (imc < 30) return "Sobrepeso";
  return "Obesidade";
}

function imcColor(imc: number): string {
  if (imc < 18.5) return "#3b82f6"; // azul
  if (imc < 25) return "#16a34a"; // verde
  if (imc < 30) return "#f59e0b"; // amarelo
  return "#dc2626"; // vermelho
}
