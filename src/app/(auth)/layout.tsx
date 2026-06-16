import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/config/auth-options";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session?.user?.id) {
    redirect("/dashboard");
  }
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between bg-primary p-12 text-white lg:flex">
        <Image src="/images/logo.png" alt="Fhit" width={88} height={88} />

        <div className="max-w-md">
          <h1 className="text-4xl font-bold leading-tight">
            Sua evolução fitness em um só lugar.
          </h1>
          <p className="mt-4 text-white/80">
            Treinos, hábitos, peso e IMC — acompanhe tudo de forma centralizada
            e mantenha a motivação em dia.
          </p>
        </div>

        <ul className="space-y-2 text-sm text-white/80">
          <li>• Registro detalhado de treinos</li>
          <li>• Checklist de hábitos com sequência</li>
          <li>• Evolução de peso e cálculo de IMC</li>
          <li>• Dashboards semanal e mensal</li>
        </ul>
      </div>

      <div className="flex flex-col gap-6 items-center justify-center bg-[#f7f8f7] p-6 w-full">
        <Image
          src="/images/logo.png"
          alt="Fhit"
          width={88}
          height={88}
          className="self-center"
        />
        <div className="max-w-sm w-full">{children}</div>
      </div>
    </div>
  );
}
