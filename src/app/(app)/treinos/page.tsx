import { Suspense } from "react";
import Link from "next/link";
import { Plus, Dumbbell } from "lucide-react";
import { requireUserId } from "@/shared/utils/session";
import { workoutSessionRepository } from "@/entities/workout-session/repository";
import { IWorkoutSession } from "@/entities/workout-session/model";
import { Button, EmptyState, PageHeader } from "@/shared/ui";
import { WorkoutCard } from "@/features/workout/ui/workout-card";
import { WorkoutFilters } from "@/features/workout/ui/workout-filters";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ from?: string; to?: string; muscleGroup?: string }>;
}

export default async function TreinosPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const userId = await requireUserId();

  const sessions = (await workoutSessionRepository.listByUser(userId, {
    from: sp.from ? new Date(sp.from) : undefined,
    to: sp.to ? new Date(sp.to) : undefined,
    muscleGroup: sp.muscleGroup || undefined,
  })) as IWorkoutSession[];

  const hasFilters = Boolean(sp.from || sp.to || sp.muscleGroup);

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Treinos"
        description="Histórico completo das suas sessões."
        action={
          <Link href="/treinos/novo">
            <Button>
              <Plus size={18} /> Novo treino
            </Button>
          </Link>
        }
      />

      <div className="mb-6">
        <Suspense fallback={null}>
          <WorkoutFilters />
        </Suspense>
      </div>

      {sessions.length === 0 ? (
        <EmptyState
          icon={<Dumbbell />}
          title={hasFilters ? "Nenhum treino encontrado" : "Nenhum treino ainda"}
          description={
            hasFilters
              ? "Tente ajustar os filtros de período ou grupo muscular."
              : "Registre sua primeira sessão de treino para começar."
          }
          action={
            !hasFilters && (
              <Link href="/treinos/novo">
                <Button>
                  <Plus size={18} /> Registrar treino
                </Button>
              </Link>
            )
          }
        />
      ) : (
        <div className="flex flex-col gap-4">
          {sessions.map((session) => (
            <WorkoutCard key={session.publicId} session={session} />
          ))}
        </div>
      )}
    </div>
  );
}
