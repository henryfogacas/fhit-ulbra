import { userRepository } from "@/entities/user/repository";
import { weightLogRepository } from "@/entities/weight-log/repository";
import { IWeightLog } from "@/entities/weight-log/model";
import { calculateImc, ImcResult } from "@/shared/utils/imc";

export interface WeightPageData {
  logs: IWeightLog[];
  series: { label: string; weight: number }[];
  currentWeight: number | null;
  height: number | null;
  imc: ImcResult | null;
}

export async function getWeightPageData(
  userId: number,
): Promise<WeightPageData> {
  const [logs, heightRow] = await Promise.all([
    weightLogRepository.listByUser(userId),
    userRepository.getHeightById(userId),
  ]);

  const height = heightRow?.heightCm ?? null;
  const currentWeight = logs[0]?.weightKg ?? null; // logs vêm em ordem decrescente
  const imc =
    height && currentWeight ? calculateImc(currentWeight, height) : null;

  // Série em ordem crescente para o gráfico de evolução.
  const series = [...logs]
    .reverse()
    .map((log) => ({
      label: new Date(log.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        timeZone: "UTC",
      }),
      weight: log.weightKg,
    }));

  return { logs: logs as IWeightLog[], series, currentWeight, height, imc };
}
