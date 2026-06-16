"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { loginSchema } from "@/entities/user/schema";
import { ILoginForm } from "@/entities/user/model";
import { Button, Input, useToast } from "@/shared/ui";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: ILoginForm) {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    setLoading(false);

    if (result?.error) {
      toast.error("E-mail ou senha incorretos.");
      return;
    }

    toast.success("Bem-vindo de volta!");
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground">Entrar</h2>
      <p className="mt-1 text-sm text-foreground/60">
        Acesse sua conta para continuar.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex flex-col gap-4"
      >
        <Input
          label="E-mail"
          type="email"
          placeholder="voce@email.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Senha"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" size="lg" loading={loading} className="mt-2">
          Entrar
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-foreground/60">
        Não tem uma conta?{" "}
        <Link
          href="/cadastro"
          className="font-semibold text-primary hover:underline"
        >
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}
