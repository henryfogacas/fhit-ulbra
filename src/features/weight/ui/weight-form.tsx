"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, type DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { weightLogSchema, WeightLogFormData } from "@/entities/weight-log/schema";
import { Button, Input, useToast } from "@/shared/ui";
import { createWeightLog } from "../actions";

type WeightFormInput = z.input<typeof weightLogSchema>;

export function WeightForm() {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WeightFormInput, unknown, WeightLogFormData>({
    resolver: zodResolver(weightLogSchema),
    defaultValues: {
      weightKg: "",
      date: new Date().toISOString().slice(0, 10),
    } as DefaultValues<WeightFormInput>,
  });

  async function onSubmit(data: WeightLogFormData) {
    setLoading(true);
    const result = await createWeightLog(data);
    setLoading(false);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Peso registrado!");
    reset({
      weightKg: "",
      date: new Date().toISOString().slice(0, 10),
    });
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 sm:flex-row sm:items-end"
    >
      <Input
        type="number"
        step="0.1"
        label="Peso (kg)"
        placeholder="Ex: 75.5"
        className="sm:w-40"
        error={errors.weightKg?.message}
        {...register("weightKg")}
      />
      <Input
        type="date"
        label="Data"
        className="sm:w-48"
        error={errors.date?.message}
        {...register("date")}
      />
      <Button type="submit" loading={loading} className="sm:mb-0">
        Registrar
      </Button>
    </form>
  );
}
