import { notFound } from "next/navigation";
import { requireUserId } from "@/shared/utils/session";
import { workoutTemplateRepository } from "@/entities/workout-template/repository";
import { WorkoutTemplateFormData } from "@/entities/workout-template/schema";
import { PageHeader } from "@/shared/ui";
import { TemplateForm } from "@/features/workout-template/ui/template-form";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ publicId: string }>;
}

export default async function EditarModeloPage({ params }: PageProps) {
  const { publicId } = await params;
  const userId = await requireUserId();

  const template = await workoutTemplateRepository.getByPublicId(
    userId,
    publicId,
  );

  if (!template) {
    notFound();
  }

  const initialData: WorkoutTemplateFormData = {
    name: template.name,
    muscleGroups: template.muscleGroups,
    exercises: template.exercises.map((ex) => ({
      name: ex.name,
      sets: ex.sets,
      reps: ex.reps,
    })),
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Editar modelo"
        description="Atualize o nome, grupos musculares ou exercícios."
      />
      <TemplateForm publicId={publicId} initialData={initialData} />
    </div>
  );
}
