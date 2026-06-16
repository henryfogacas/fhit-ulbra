import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/config/auth-options";
import { userRepository } from "@/entities/user/repository";
import { AppShell } from "@/widgets/app-shell";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/");
  }

  const profile = await userRepository.getProfileByPublicId(session.user.id);

  if (!profile) {
    redirect("/");
  }

  return <AppShell userName={profile.name}>{children}</AppShell>;
}
