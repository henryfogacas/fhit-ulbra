import { redirect } from "next/navigation";
import { getCurrentUserPublicId } from "@/shared/utils/session";
import { userRepository } from "@/entities/user/repository";
import { Card, CardHeader, PageHeader } from "@/shared/ui";
import { HeightForm } from "@/features/profile/ui/height-form";
import { formatDate } from "@/shared/utils/date";

export const dynamic = "force-dynamic";

export default async function PerfilPage() {
  const publicId = await getCurrentUserPublicId();

  if (!publicId) {
    redirect("/");
  }

  const profile = await userRepository.getProfileByPublicId(publicId);

  if (!profile) {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Perfil" description="Seus dados e configurações." />

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader title="Dados pessoais" />
          <dl className="flex flex-col gap-3">
            <div className="flex justify-between border-b border-black/5 pb-3">
              <dt className="text-sm text-foreground/60">Nome</dt>
              <dd className="text-sm font-medium text-foreground">
                {profile.name}
              </dd>
            </div>
            <div className="flex justify-between border-b border-black/5 pb-3">
              <dt className="text-sm text-foreground/60">E-mail</dt>
              <dd className="text-sm font-medium text-foreground">
                {profile.email}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-foreground/60">Membro desde</dt>
              <dd className="text-sm font-medium text-foreground">
                {formatDate(profile.createdAt)}
              </dd>
            </div>
          </dl>
        </Card>

        <Card>
          <CardHeader
            title="Altura"
            description="Necessária para o cálculo automático do IMC."
          />
          <HeightForm initialHeight={profile.heightCm} />
        </Card>
      </div>
    </div>
  );
}
