import Link from "next/link";
import { Plus, CopyPlus } from "lucide-react";
import { requireUserId } from "@/shared/utils/session";
import { workoutTemplateRepository } from "@/entities/workout-template/repository";
import { IWorkoutTemplate } from "@/entities/workout-template/model";
import { Button, EmptyState, PageHeader } from "@/shared/ui";
import { TemplateCard } from "@/features/workout-template/ui/template-card";

export const dynamic = "force-dynamic";

export default async function ModelosPage() {
  const userId = await requireUserId();
  const templates = (await workoutTemplateRepository.listByUser(
    userId,
  )) as IWorkoutTemplate[];

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Modelos de treino"
        description="Crie modelos reutilizáveis para agilizar o registro das sessões."
        action={
          <Link href="/modelos/novo">
            <Button>
              <Plus size={18} /> Novo modelo
            </Button>
          </Link>
        }
      />

      {templates.length === 0 ? (
        <EmptyState
          icon={<CopyPlus />}
          title="Nenhum modelo ainda"
          description="Modelos permitem preencher uma nova sessão de treino com um clique."
          action={
            <Link href="/modelos/novo">
              <Button>
                <Plus size={18} /> Criar modelo
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {templates.map((template) => (
            <TemplateCard key={template.publicId} template={template} />
          ))}
        </div>
      )}
    </div>
  );
}
