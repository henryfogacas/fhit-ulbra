import { notFound } from "next/navigation";
import { requireUserId } from "@/shared/utils/session";
import { workoutSessionRepository } from "@/entities/workout-session/repository";
import { WorkoutSessionFormData } from "@/entities/workout-session/schema";
import { toDateInputValue } from "@/shared/utils/date";
import { PageHeader } from "@/shared/ui";
import { WorkoutForm } from "@/features/workout/ui/workout-form";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ publicId: string }>;
}

export default async function EditarTreinoPage({ params }: PageProps) {
  const { publicId } = await params;
  const userId = await requireUserId();

  const session = await workoutSessionRepository.getByPublicId(userId, publicId);

  if (!session) {
    notFound();
  }

  const initialData: WorkoutSessionFormData = {
    date: toDateInputValue(session.date),
    muscleGroups: session.muscleGroups,
    notes: session.notes ?? "",
    exercises: session.exercises.map((ex) => ({
      name: ex.name,
      sets: ex.sets,
      reps: ex.reps,
      weightKg: ex.weightKg,
    })),
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Editar treino"
        description="Atualize os dados da sessão ou os exercícios."
      />
      <WorkoutForm publicId={publicId} initialData={initialData} />
    </div>
  );
}
