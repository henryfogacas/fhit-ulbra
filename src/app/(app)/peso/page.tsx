import Link from "next/link";
import { Scale } from "lucide-react";
import { requireUserId } from "@/shared/utils/session";
import { getWeightPageData } from "@/features/weight/service";
import { WeightForm } from "@/features/weight/ui/weight-form";
import { WeightLogItem } from "@/features/weight/ui/weight-log-item";
import { WeightLineChart } from "@/features/dashboard/ui/weight-line-chart";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  EmptyState,
  PageHeader,
} from "@/shared/ui";

export const dynamic = "force-dynamic";

const IMC_RANGES = [
  { label: "Abaixo do peso", range: "< 18,5", color: "#3b82f6" },
  { label: "Normal", range: "18,5 – 24,9", color: "#16a34a" },
  { label: "Sobrepeso", range: "25 – 29,9", color: "#f59e0b" },
  { label: "Obesidade", range: "≥ 30", color: "#dc2626" },
];

export default async function PesoPage() {
  const userId = await requireUserId();
  const data = await getWeightPageData(userId);

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Peso & IMC"
        description="Registre seu peso e acompanhe a evolução ao longo do tempo."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Coluna principal */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <Card>
            <CardHeader title="Registrar peso" />
            <WeightForm />
          </Card>

          <Card>
            <CardHeader
              title="Evolução do peso"
              description="Histórico dos seus registros"
            />
            {data.series.length >= 2 ? (
              <WeightLineChart data={data.series} />
            ) : (
              <EmptyState
                icon={<Scale />}
                title="Sem dados suficientes"
                description="Registre o peso em pelo menos dois dias para visualizar a curva."
              />
            )}
          </Card>
        </div>

        {/* Coluna lateral — IMC */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader title="IMC atual" />
            {data.imc ? (
              <div className="flex flex-col items-center gap-2 py-2">
                <p
                  className="text-5xl font-bold"
                  style={{ color: data.imc.color }}
                >
                  {data.imc.value}
                </p>
                <Badge color={data.imc.color}>{data.imc.category}</Badge>
                <p className="mt-1 text-xs text-foreground/50">
                  {data.currentWeight} kg · {data.height} cm
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <p className="text-sm text-foreground/60">
                  {data.height
                    ? "Registre seu peso para calcular o IMC."
                    : "Informe sua altura no perfil para calcular o IMC."}
                </p>
                {!data.height && (
                  <Link href="/perfil">
                    <Button variant="secondary" size="sm">
                      Cadastrar altura
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </Card>

          <Card>
            <CardHeader title="Tabela de IMC" />
            <ul className="flex flex-col gap-2">
              {IMC_RANGES.map((r) => (
                <li
                  key={r.label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: r.color }}
                    />
                    {r.label}
                  </span>
                  <span className="text-foreground/50">{r.range}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {/* Histórico */}
      {data.logs.length > 0 && (
        <Card className="mt-4">
          <CardHeader title="Histórico de registros" />
          <div className="flex flex-col">
            {data.logs.map((log) => (
              <WeightLogItem key={log.publicId} log={log} />
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
