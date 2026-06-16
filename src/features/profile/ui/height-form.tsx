"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, type DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { heightSchema, HeightFormData } from "@/entities/weight-log/schema";
import { Button, Input, useToast } from "@/shared/ui";
import { updateHeight } from "../actions";

type HeightFormInput = z.input<typeof heightSchema>;

export function HeightForm({ initialHeight }: { initialHeight: number | null }) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HeightFormInput, unknown, HeightFormData>({
    resolver: zodResolver(heightSchema),
    defaultValues: {
      heightCm: initialHeight ?? "",
    } as DefaultValues<HeightFormInput>,
  });

  async function onSubmit(data: HeightFormData) {
    setLoading(true);
    const result = await updateHeight(data);
    setLoading(false);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Altura atualizada!");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 sm:flex-row sm:items-end"
    >
      <Input
        type="number"
        label="Altura (cm)"
        placeholder="Ex: 175"
        className="sm:w-48"
        hint="Usada para calcular seu IMC"
        error={errors.heightCm?.message}
        {...register("heightCm")}
      />
      <Button type="submit" loading={loading}>
        Salvar
      </Button>
    </form>
  );
}
