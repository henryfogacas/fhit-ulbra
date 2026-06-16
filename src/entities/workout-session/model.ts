export interface IExercise {
  publicId: string;
  name: string;
  sets: number;
  reps: number;
  weightKg: number | null;
  order: number;
}

export interface IExerciseInput {
  name: string;
  sets: number;
  reps: number;
  weightKg?: number | null;
}

export interface IWorkoutSession {
  publicId: string;
  date: Date;
  muscleGroups: string[];
  notes: string | null;
  exercises: IExercise[];
  createdAt: Date;
}

export interface IWorkoutSessionInput {
  date: string;
  muscleGroups: string[];
  notes?: string | null;
  exercises: IExerciseInput[];
}

export const MUSCLE_GROUPS = [
  "Peito",
  "Costas",
  "Ombro",
  "Bíceps",
  "Tríceps",
  "Pernas",
  "Glúteos",
  "Abdômen",
  "Cardio",
] as const;
