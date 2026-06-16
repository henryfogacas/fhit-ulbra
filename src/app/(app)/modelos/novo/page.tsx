import { PageHeader } from "@/shared/ui";
import { TemplateForm } from "@/features/workout-template/ui/template-form";

export default function NovoModeloPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Novo modelo"
        description="Defina um modelo de treino reutilizável."
      />
      <TemplateForm />
    </div>
  );
}
