export interface ITemplateExercise {
  publicId: string;
  name: string;
  sets: number;
  reps: number;
  order: number;
}

export interface ITemplateExerciseInput {
  name: string;
  sets: number;
  reps: number;
}

export interface IWorkoutTemplate {
  publicId: string;
  name: string;
  muscleGroups: string[];
  exercises: ITemplateExercise[];
  createdAt: Date;
}

export interface IWorkoutTemplateInput {
  name: string;
  muscleGroups: string[];
  exercises: ITemplateExerciseInput[];
}
