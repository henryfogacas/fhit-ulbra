import Link from "next/link";
import { Dumbbell, CircleCheck, Flame, Scale, ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { requireUserId } from "@/shared/utils/session";
import { getWeeklyDashboard } from "@/features/dashboard/service";
import { StatCard } from "@/features/dashboard/ui/stat-card";
import { HabitWeekChart } from "@/features/dashboard/ui/habit-week-chart";
import { Badge, Button, Card, CardHeader, PageHeader } from "@/shared/ui";
import { formatDateShort } from "@/shared/utils/date";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const userId = await requireUserId();
  const data = await getWeeklyDashboard(userId);

  const rateLabel =
    data.habitCompletionRate === null
      ? "—"
      : `${Math.round(data.habitCompletionRate * 100)}%`;

  const weightSub =
    data.weightDelta === null ? (
      "Sem variação na semana"
    ) : (
      <span
        className={`inline-flex items-center gap-1 ${
          data.weightDelta > 0 ? "text-amber-600" : "text-green-600"
        }`}
      >
        {data.weightDelta > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {data.weightDelta > 0 ? "+" : ""}
        {data.weightDelta} kg na semana
      </span>
    );

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Dashboard"
        description={`Resumo da semana · ${formatDateShort(data.weekStart)} a ${formatDateShort(data.weekEnd)}`}
        action={
          <Link href="/dashboard/mensal">
            <Button variant="outline">
              Ver mês <ArrowRight size={16} />
            </Button>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Dumbbell size={18} />}
          label="Treinos na semana"
          value={data.workouts}
          sub={data.workouts === 1 ? "sessão registrada" : "sessões registradas"}
        />
        <StatCard
          icon={<CircleCheck size={18} />}
          label="Conclusão de hábitos"
          value={rateLabel}
          sub={
            data.habitCompletionRate === null
              ? "Cadastre hábitos"
              : `${data.habitsCompleted}/${data.habitsScheduled} concluídos`
          }
          accent="#16a34a"
        />
        <StatCard
          icon={<Flame size={18} />}
          label="Sequência atual"
          value={`${data.streakCurrent} ${data.streakCurrent === 1 ? "dia" : "dias"}`}
          sub={`Recorde: ${data.streakLongest} dias`}
          accent="#ea580c"
        />
        <StatCard
          icon={<Scale size={18} />}
          label="Peso atual"
          value={data.currentWeight === null ? "—" : `${data.currentWeight} kg`}
          sub={data.currentWeight === null ? "Registre seu peso" : weightSub}
          accent="#2563eb"
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Hábitos da semana"
            description="Concluídos vs. agendados por dia"
          />
          <HabitWeekChart data={data.weekBars} />
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="IMC" description="Índice de Massa Corporal" />
          {data.imc ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 py-4">
              <p className="text-5xl font-bold" style={{ color: data.imc.color }}>
                {data.imc.value}
              </p>
              <Badge color={data.imc.color}>{data.imc.category}</Badge>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 py-4 text-center">
              <p className="text-sm text-foreground/60">
                {data.hasHeight
                  ? "Registre seu peso para calcular o IMC."
                  : "Informe sua altura no perfil e registre seu peso."}
              </p>
              <Link href={data.hasHeight ? "/peso" : "/perfil"}>
                <Button variant="secondary" size="sm">
                  {data.hasHeight ? "Registrar peso" : "Ir ao perfil"}
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <QuickLink href="/treinos/novo" label="Registrar treino" icon={<Dumbbell size={18} />} />
        <QuickLink href="/habitos" label="Marcar hábitos" icon={<CircleCheck size={18} />} />
        <QuickLink href="/peso" label="Registrar peso" icon={<Scale size={18} />} />
      </div>
    </div>
  );
}

function QuickLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <Card className="flex items-center justify-between transition-colors hover:border-primary/30 hover:bg-primary/[0.02]">
        <span className="flex items-center gap-3 font-medium text-foreground">
          <span className="text-primary">{icon}</span>
          {label}
        </span>
        <ArrowRight size={18} className="text-foreground/40" />
      </Card>
    </Link>
  );
}
