"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { createUserSchema } from "@/entities/user/schema";
import { registerUser } from "../actions";
import { Button, Input, useToast } from "@/shared/ui";

type RegisterFormData = z.infer<typeof createUserSchema>;

export function RegisterForm() {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(createUserSchema),
  });

  async function onSubmit(data: RegisterFormData) {
    setLoading(true);
    const result = await registerUser(data);

    if (!result.success) {
      setLoading(false);
      toast.error(result.error);
      return;
    }

    toast.success("Conta criada com sucesso!");

    // Autentica automaticamente após o cadastro (UC01 → UC02).
    const signInResult = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    setLoading(false);

    if (signInResult?.error) {
      router.push("/");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground">Criar conta</h2>
      <p className="mt-1 text-sm text-foreground/60">
        Comece a acompanhar sua evolução hoje.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
        <Input
          label="Nome completo"
          placeholder="Seu nome"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
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
          placeholder="Mínimo de 8 caracteres"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Input
          label="Confirmar senha"
          type="password"
          placeholder="Repita a senha"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button type="submit" size="lg" loading={loading} className="mt-2">
          Criar conta
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-foreground/60">
        Já tem uma conta?{" "}
        <Link href="/" className="font-semibold text-primary hover:underline">
          Entrar
        </Link>
      </p>
    </div>
  );
}
