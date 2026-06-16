import Link from "next/link";
import { ArrowLeft, Dumbbell, CircleCheck, Scale, Activity } from "lucide-react";
import { requireUserId } from "@/shared/utils/session";
import { getMonthlyDashboard } from "@/features/dashboard/service";
import { StatCard } from "@/features/dashboard/ui/stat-card";
import { WeightLineChart } from "@/features/dashboard/ui/weight-line-chart";
import { MonthWeekChart } from "@/features/dashboard/ui/month-week-chart";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  EmptyState,
  PageHeader,
} from "@/shared/ui";
import { monthName } from "@/shared/utils/date";

export const dynamic = "force-dynamic";

export default async function DashboardMensalPage() {
  const userId = await requireUserId();
  const data = await getMonthlyDashboard(userId);

  const title = `${monthName(data.monthStart.getMonth())} de ${data.monthStart.getFullYear()}`;

  const rateLabel =
    data.habitCompletionRate === null
      ? "—"
      : `${Math.round(data.habitCompletionRate * 100)}%`;

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Dashboard mensal"
        description={`Visão consolidada · ${title}`}
        action={
          <Link href="/dashboard">
            <Button variant="outline">
              <ArrowLeft size={16} /> Semana
            </Button>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Dumbbell size={18} />}
          label="Treinos no mês"
          value={data.workouts}
        />
        <StatCard
          icon={<CircleCheck size={18} />}
          label="Conclusão de hábitos"
          value={rateLabel}
          accent="#16a34a"
        />
        <StatCard
          icon={<Scale size={18} />}
          label="Variação de peso"
          value={
            data.weightDelta === null
              ? "—"
              : `${data.weightDelta > 0 ? "+" : ""}${data.weightDelta} kg`
          }
          accent="#2563eb"
        />
        <StatCard
          icon={<Activity size={18} />}
          label="IMC atual"
          value={
            data.imc ? (
              <span style={{ color: data.imc.color }}>{data.imc.value}</span>
            ) : (
              "—"
            )
          }
          sub={data.imc ? <Badge color={data.imc.color}>{data.imc.category}</Badge> : undefined}
          accent="#7c3aed"
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="Evolução do peso"
            description="Registros do mês"
          />
          {data.weightSeries.length >= 2 ? (
            <WeightLineChart data={data.weightSeries} />
          ) : (
            <EmptyState
              title="Dados insuficientes"
              description="Registre o peso em pelo menos dois dias para ver a curva de evolução."
            />
          )}
        </Card>

        <Card>
          <CardHeader
            title="Treinos e hábitos por semana"
            description="Frequência de treinos e taxa de conclusão"
          />
          <MonthWeekChart data={data.weekBars} />
        </Card>
      </div>
    </div>
  );
}
