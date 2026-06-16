import { notFound } from "next/navigation";
import { requireUserId } from "@/shared/utils/session";
import { habitRepository } from "@/entities/habit/repository";
import { HabitFormData } from "@/entities/habit/schema";
import { PageHeader } from "@/shared/ui";
import { HabitForm } from "@/features/habit/ui/habit-form";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ publicId: string }>;
}

export default async function EditarHabitoPage({ params }: PageProps) {
  const { publicId } = await params;
  const userId = await requireUserId();

  const habit = await habitRepository.getByPublicId(userId, publicId);

  if (!habit) {
    notFound();
  }

  const initialData: HabitFormData = {
    name: habit.name,
    description: habit.description ?? "",
    frequency: habit.frequency,
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Editar hábito"
        description="Atualize o nome, a descrição ou a frequência."
      />
      <HabitForm publicId={publicId} initialData={initialData} />
    </div>
  );
}
