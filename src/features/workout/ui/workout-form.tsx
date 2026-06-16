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
  workoutSessionSchema,
  WorkoutSessionFormData,
} from "@/entities/workout-session/schema";

// O input dos campos é "cru" (strings do formulário); o output é validado/coerced.
type WorkoutFormInput = z.input<typeof workoutSessionSchema>;
import { MUSCLE_GROUPS } from "@/entities/workout-session/model";
import {
  Button,
  Input,
  Textarea,
  Card,
  ChipSelect,
  useToast,
} from "@/shared/ui";
import { createWorkoutSession, updateWorkoutSession } from "../actions";

interface WorkoutFormProps {
  publicId?: string;
  initialData?: WorkoutSessionFormData;
}

function todayInput() {
  return new Date().toISOString().slice(0, 10);
}

const emptyExercise = { name: "", sets: 3, reps: 10, weightKg: null };

export function WorkoutForm({ publicId, initialData }: WorkoutFormProps) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(publicId);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkoutFormInput, unknown, WorkoutSessionFormData>({
    resolver: zodResolver(workoutSessionSchema),
    defaultValues: (initialData ?? {
      date: todayInput(),
      muscleGroups: [],
      notes: "",
      exercises: [emptyExercise],
    }) as DefaultValues<WorkoutFormInput>,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });

  async function onSubmit(data: WorkoutSessionFormData) {
    setLoading(true);
    const result = isEdit
      ? await updateWorkoutSession(publicId!, data)
      : await createWorkoutSession(data);
    setLoading(false);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success(isEdit ? "Treino atualizado!" : "Treino registrado!");
    router.push("/treinos");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Card className="flex flex-col gap-4">
        <Input
          type="date"
          label="Data do treino"
          error={errors.date?.message}
          {...register("date")}
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

        <Textarea
          label="Observações (opcional)"
          placeholder="Como foi o treino, sensações, ajustes..."
          error={errors.notes?.message}
          {...register("notes")}
        />
      </Card>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Exercícios</h3>
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
                <div className="grid grid-cols-3 gap-3">
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
                  <Input
                    type="number"
                    label="Carga (kg)"
                    min={0}
                    step="0.5"
                    placeholder="0"
                    error={errors.exercises?.[index]?.weightKg?.message}
                    {...register(`exercises.${index}.weightKg`)}
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
          {isEdit ? "Salvar alterações" : "Registrar treino"}
        </Button>
      </div>
    </form>
  );
}
