"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useForm,
  useFieldArray,
  Controller,
  type DefaultValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Trash2, Plus } from "lucide-react";
import {
  workoutTemplateSchema,
  WorkoutTemplateFormData,
} from "@/entities/workout-template/schema";

type TemplateFormInput = z.input<typeof workoutTemplateSchema>;
import { MUSCLE_GROUPS } from "@/entities/workout-session/model";
import {
  Button,
  Input,
  Card,
  ChipSelect,
  useToast,
} from "@/shared/ui";
import { createWorkoutTemplate, updateWorkoutTemplate } from "../actions";

interface TemplateFormProps {
  publicId?: string;
  initialData?: WorkoutTemplateFormData;
}

const emptyExercise = { name: "", sets: 3, reps: 10 };

export function TemplateForm({ publicId, initialData }: TemplateFormProps) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(publicId);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TemplateFormInput, unknown, WorkoutTemplateFormData>({
    resolver: zodResolver(workoutTemplateSchema),
    defaultValues: (initialData ?? {
      name: "",
      muscleGroups: [],
      exercises: [emptyExercise],
    }) as DefaultValues<TemplateFormInput>,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });

  async function onSubmit(data: WorkoutTemplateFormData) {
    setLoading(true);
    const result = isEdit
      ? await updateWorkoutTemplate(publicId!, data)
      : await createWorkoutTemplate(data);
    setLoading(false);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success(isEdit ? "Modelo atualizado!" : "Modelo criado!");
    router.push("/modelos");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Card className="flex flex-col gap-4">
        <Input
          label="Nome do modelo"
          placeholder="Ex: Treino A — Peito e Tríceps"
          error={errors.name?.message}
          {...register("name")}
        />

        <Controller
          control={control}
          name="muscleGroups"
          render={({ field }) => (
            <ChipSelect
              label="Grupos musculares"
              options={MUSCLE_GROUPS.map((g) => ({ label: g, value: g }))}
              value={field.value}
              onChange={field.onChange}
              error={errors.muscleGroups?.message}
            />
          )}
        />
      </Card>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Exercícios padrão</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append(emptyExercise)}
          >
            <Plus size={16} /> Adicionar
          </Button>
        </div>

        {errors.exercises?.message && (
          <p className="mb-3 text-xs font-medium text-red-600">
            {errors.exercises.message}
          </p>
        )}

        <div className="flex flex-col gap-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-xl border border-black/5 bg-[#f7f8f7] p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground/70">
                  Exercício {index + 1}
                </span>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-foreground/40 hover:text-red-600"
                    aria-label="Remover exercício"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Input
                  label="Nome"
                  placeholder="Ex: Supino reto"
                  error={errors.exercises?.[index]?.name?.message}
                  {...register(`exercises.${index}.name`)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    label="Séries"
                    min={1}
                    error={errors.exercises?.[index]?.sets?.message}
                    {...register(`exercises.${index}.sets`)}
                  />
                  <Input
                    type="number"
                    label="Reps"
                    min={1}
                    error={errors.exercises?.[index]?.reps?.message}
                    {...register(`exercises.${index}.reps`)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
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
          {isEdit ? "Salvar alterações" : "Criar modelo"}
        </Button>
      </div>
    </form>
  );
}
