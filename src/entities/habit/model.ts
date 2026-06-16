export interface IHabit {
  publicId: string;
  name: string;
  description: string | null;
  frequency: number[]; // dias da semana: 0 (domingo) a 6 (sábado)
  active: boolean;
  createdAt: Date;
}

export interface IHabitWithStatus extends IHabit {
  completedToday: boolean;
}

export interface IHabitInput {
  name: string;
  description?: string | null;
  frequency: number[];
}
