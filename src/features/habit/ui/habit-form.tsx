"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, type DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { habitSchema, HabitFormData } from "@/entities/habit/schema";
import {
  Button,
  Input,
  Textarea,
  Card,
  ChipSelect,
  useToast,
} from "@/shared/ui";
import { weekdayShort } from "@/shared/utils/date";
import { createHabit, updateHabit } from "../actions";

type HabitFormInput = z.input<typeof habitSchema>;

const WEEKDAY_OPTIONS = [0, 1, 2, 3, 4, 5, 6].map((d) => ({
  label: weekdayShort(d),
  value: d,
}));

interface HabitFormProps {
  publicId?: string;
  initialData?: HabitFormData;
}

export function HabitForm({ publicId, initialData }: HabitFormProps) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(publicId);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HabitFormInput, unknown, HabitFormData>({
    resolver: zodResolver(habitSchema),
    defaultValues: (initialData ?? {
      name: "",
      description: "",
      frequency: [1, 2, 3, 4, 5],
    }) as DefaultValues<HabitFormInput>,
  });

  async function onSubmit(data: HabitFormData) {
    setLoading(true);
    const result = isEdit
      ? await updateHabit(publicId!, data)
      : await createHabit(data);
    setLoading(false);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success(isEdit ? "Hábito atualizado!" : "Hábito criado!");
    router.push("/habitos");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Card className="flex flex-col gap-4">
        <Input
          label="Nome do hábito"
          placeholder="Ex: Beber 2L de água"
          error={errors.name?.message}
          {...register("name")}
        />
        <Textarea
          label="Descrição (opcional)"
          placeholder="Detalhes ou lembrete sobre o hábito"
          error={errors.description?.message}
          {...register("description")}
        />
        <Controller
          control={control}
          name="frequency"
          render={({ field }) => (
            <ChipSelect
              label="Frequência (dias da semana)"
              options={WEEKDAY_OPTIONS}
              value={field.value as number[]}
              onChange={field.onChange}
              error={errors.frequency?.message}
            />
          )}
        />
      </Card>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button type="submit" loading={loading}>
          {isEdit ? "Salvar alterações" : "Criar hábito"}
        </Button>
      </div>
    </form>
  );
}
