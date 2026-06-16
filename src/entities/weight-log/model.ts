export interface IWeightLog {
  publicId: string;
  weightKg: number;
  date: Date;
  createdAt: Date;
}

export interface IWeightLogInput {
  weightKg: number;
  date: string;
}
