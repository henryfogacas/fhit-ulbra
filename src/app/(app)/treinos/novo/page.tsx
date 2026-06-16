import { requireUserId } from "@/shared/utils/session";
import { workoutTemplateRepository } from "@/entities/workout-template/repository";
import { WorkoutSessionFormData } from "@/entities/workout-session/schema";
import { PageHeader } from "@/shared/ui";
import { WorkoutForm } from "@/features/workout/ui/workout-form";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ modelo?: string }>;
}

export default async function NovoTreinoPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  let initialData: WorkoutSessionFormData | undefined;

  // Pré-preenche a sessão a partir de um modelo de treino (UC07).
  if (sp.modelo) {
    const userId = await requireUserId();
    const template = await workoutTemplateRepository.getByPublicId(
      userId,
      sp.modelo,
    );

    if (template) {
      initialData = {
        date: new Date().toISOString().slice(0, 10),
        muscleGroups: template.muscleGroups,
        notes: "",
        exercises: template.exercises.map((ex) => ({
          name: ex.name,
          sets: ex.sets,
          reps: ex.reps,
          weightKg: null,
        })),
      };
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Novo treino"
        description={
          initialData
            ? "Sessão pré-preenchida a partir de um modelo. Ajuste as cargas e salve."
            : "Registre os detalhes da sua sessão de treino."
        }
      />
      <WorkoutForm initialData={initialData} />
    </div>
  );
}
