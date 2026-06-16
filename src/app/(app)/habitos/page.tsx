import Link from "next/link";
import { Plus, ListChecks, Flame } from "lucide-react";
import { requireUserId } from "@/shared/utils/session";
import { getHabitsPageData } from "@/features/habit/service";
import { ChecklistItem } from "@/features/habit/ui/checklist-item";
import { HabitCard } from "@/features/habit/ui/habit-card";
import { Button, Card, EmptyState, PageHeader } from "@/shared/ui";

export const dynamic = "force-dynamic";

export default async function HabitosPage() {
  const userId = await requireUserId();
  const data = await getHabitsPageData(userId);

  const allDone =
    data.todayItems.length > 0 &&
    data.todayItems.every((i) => i.completedToday);

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Hábitos"
        description="Marque seus hábitos do dia e mantenha a sequência."
        action={
          <Link href="/habitos/novo">
            <Button>
              <Plus size={18} /> Novo hábito
            </Button>
          </Link>
        }
      />

      {!data.hasHabits ? (
        <EmptyState
          icon={<ListChecks />}
          title="Nenhum hábito ainda"
          description="Cadastre hábitos diários como hidratação, sono ou alongamento para acompanhar sua rotina."
          action={
            <Link href="/habitos/novo">
              <Button>
                <Plus size={18} /> Criar hábito
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="flex flex-col gap-6">
          {/* Banner de sequência */}
          <Card className="flex items-center gap-4 bg-gradient-to-r from-primary to-primary/80 text-white">
            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-white/15">
              <Flame size={24} />
            </span>
            <div>
              <p className="text-2xl font-bold">
                {data.streakCurrent}{" "}
                {data.streakCurrent === 1 ? "dia" : "dias"} de sequência
              </p>
              <p className="text-sm text-white/80">
                Seu recorde é de {data.streakLongest}{" "}
                {data.streakLongest === 1 ? "dia" : "dias"}. Continue assim! 🔥
              </p>
            </div>
          </Card>

          {/* Checklist de hoje */}
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground/50">
              Checklist de hoje
            </h2>
            {data.todayItems.length === 0 ? (
              <Card className="text-center text-sm text-foreground/60">
                Nenhum hábito agendado para hoje. Aproveite o descanso! 😌
              </Card>
            ) : allDone ? (
              <div className="mb-3 rounded-xl border border-green-200 bg-green-50 p-3 text-center text-sm font-medium text-green-700">
                🎉 Todos os hábitos de hoje concluídos!
              </div>
            ) : null}

            <div className="flex flex-col gap-2">
              {data.todayItems.map((item) => (
                <ChecklistItem key={item.publicId} item={item} />
              ))}
            </div>
          </section>

          {/* Todos os hábitos */}
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground/50">
              Meus hábitos
            </h2>
            <div className="flex flex-col gap-3">
              {data.allHabits.map((habit) => (
                <HabitCard key={habit.publicId} habit={habit} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
