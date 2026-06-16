import { PageHeader } from "@/shared/ui";
import { HabitForm } from "@/features/habit/ui/habit-form";

export default function NovoHabitoPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Novo hábito"
        description="Defina um hábito recorrente e os dias da semana."
      />
      <HabitForm />
    </div>
  );
}
