import { userRepository } from "@/entities/user/repository";
import { workoutSessionRepository } from "@/entities/workout-session/repository";
import { habitRepository } from "@/entities/habit/repository";
import { habitCompletionRepository } from "@/entities/habit-completion/repository";
import { weightLogRepository } from "@/entities/weight-log/repository";
import {
  calculateStreak,
  completionKey,
  StreakHabit,
} from "@/entities/habit/streak";
import { calculateImc, ImcResult } from "@/shared/utils/imc";
import {
  addDays,
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
  weekdayShort,
} from "@/shared/utils/date";

interface DayBar {
  label: string;
  completed: number;
  scheduled: number;
}

export interface WeeklyDashboard {
  weekStart: Date;
  weekEnd: Date;
  workouts: number;
  habitCompletionRate: number | null;
  habitsCompleted: number;
  habitsScheduled: number;
  streakCurrent: number;
  streakLongest: number;
  currentWeight: number | null;
  weightDelta: number | null;
  imc: ImcResult | null;
  hasHeight: boolean;
  weekBars: DayBar[];
}

function buildCompletionSet(
  completions: { habitId: number; date: Date }[],
): Set<string> {
  const set = new Set<string>();
  for (const c of completions) {
    set.add(completionKey(c.habitId, c.date));
  }
  return set;
}

function scheduledOn(habits: StreakHabit[], day: Date): StreakHabit[] {
  const weekday = day.getDay();
  return habits.filter(
    (h) =>
      h.frequency.includes(weekday) &&
      startOfDay(day).getTime() >= startOfDay(h.createdAt).getTime(),
  );
}

export async function getWeeklyDashboard(
  userId: number,
): Promise<WeeklyDashboard> {
  const today = new Date();
  const weekStart = startOfWeek(today);
  const weekEnd = endOfWeek(today);

  const [workouts, habits, completions, latestWeight, weekWeights, heightRow] =
    await Promise.all([
      workoutSessionRepository.countInRange(userId, weekStart, weekEnd),
      habitRepository.listActiveForStreak(userId),
      habitCompletionRepository.getInRange(
        userId,
        addDays(today, -180),
        endOfDay(today),
      ),
      weightLogRepository.latest(userId),
      weightLogRepository.getInRange(userId, weekStart, weekEnd),
      userRepository.getHeightById(userId),
    ]);

  const completedSet = buildCompletionSet(completions);
  const streak = calculateStreak(habits, completedSet, today);

  // Taxa de conclusão e barras por dia da semana (até hoje).
  let habitsScheduled = 0;
  let habitsCompleted = 0;
  const weekBars: DayBar[] = [];

  for (let i = 0; i < 7; i++) {
    const day = addDays(weekStart, i);
    const scheduled = scheduledOn(habits, day);
    const isFuture = startOfDay(day).getTime() > startOfDay(today).getTime();
    const completedCount = isFuture
      ? 0
      : scheduled.filter((h) => completedSet.has(completionKey(h.id, day)))
          .length;

    if (!isFuture) {
      habitsScheduled += scheduled.length;
      habitsCompleted += completedCount;
    }

    weekBars.push({
      label: weekdayShort(day.getDay()),
      completed: completedCount,
      scheduled: scheduled.length,
    });
  }

  const height = heightRow?.heightCm ?? null;
  const imc =
    height && latestWeight
      ? calculateImc(latestWeight.weightKg, height)
      : null;

  const sortedWeekWeights = [...weekWeights].sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );
  const weightDelta =
    sortedWeekWeights.length >= 2
      ? Math.round(
          (sortedWeekWeights[sortedWeekWeights.length - 1].weightKg -
            sortedWeekWeights[0].weightKg) *
            10,
        ) / 10
      : null;

  return {
    weekStart,
    weekEnd,
    workouts,
    habitCompletionRate:
      habitsScheduled > 0 ? habitsCompleted / habitsScheduled : null,
    habitsCompleted,
    habitsScheduled,
    streakCurrent: streak.current,
    streakLongest: streak.longest,
    currentWeight: latestWeight?.weightKg ?? null,
    weightDelta,
    imc,
    hasHeight: Boolean(height),
    weekBars,
  };
}

export interface MonthlyDashboard {
  monthStart: Date;
  workouts: number;
  habitCompletionRate: number | null;
  weightDelta: number | null;
  imc: ImcResult | null;
  weightSeries: { label: string; weight: number }[];
  weekBars: { label: string; workouts: number; habitRate: number }[];
}

export async function getMonthlyDashboard(
  userId: number,
): Promise<MonthlyDashboard> {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);

  const [habits, completions, monthWeights, heightRow, latestWeight] =
    await Promise.all([
      habitRepository.listActiveForStreak(userId),
      habitCompletionRepository.getInRange(userId, monthStart, monthEnd),
      weightLogRepository.getInRange(userId, monthStart, monthEnd),
      userRepository.getHeightById(userId),
      weightLogRepository.latest(userId),
    ]);

  const completedSet = buildCompletionSet(completions);

  // Taxa de conclusão de hábitos no mês inteiro (até hoje).
  let scheduledTotal = 0;
  let completedTotal = 0;

  // Buckets por semana do mês.
  const buckets: { workouts: number; scheduled: number; completed: number }[] =
    [];

  const lastDay = monthEnd.getDate();
  for (let dayNum = 1; dayNum <= lastDay; dayNum++) {
    const day = new Date(today.getFullYear(), today.getMonth(), dayNum);
    const isFuture = startOfDay(day).getTime() > startOfDay(today).getTime();
    const weekIndex = Math.floor((dayNum - 1) / 7);
    if (!buckets[weekIndex]) {
      buckets[weekIndex] = { workouts: 0, scheduled: 0, completed: 0 };
    }

    if (!isFuture) {
      const scheduled = scheduledOn(habits, day);
      const completed = scheduled.filter((h) =>
        completedSet.has(completionKey(h.id, day)),
      ).length;
      scheduledTotal += scheduled.length;
      completedTotal += completed;
      buckets[weekIndex].scheduled += scheduled.length;
      buckets[weekIndex].completed += completed;
    }
  }

  // Treinos por semana do mês.
  const monthWorkouts = await workoutSessionRepository.listByUser(userId, {
    from: monthStart,
    to: monthEnd,
  });
  for (const session of monthWorkouts) {
    const dayNum = new Date(session.date).getUTCDate();
    const weekIndex = Math.floor((dayNum - 1) / 7);
    if (buckets[weekIndex]) buckets[weekIndex].workouts += 1;
  }

  const weekBars = buckets.map((b, i) => ({
    label: `Sem ${i + 1}`,
    workouts: b.workouts,
    habitRate: b.scheduled > 0 ? Math.round((b.completed / b.scheduled) * 100) : 0,
  }));

  const sortedWeights = [...monthWeights].sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );
  const weightSeries = sortedWeights.map((w) => ({
    label: new Date(w.date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      timeZone: "UTC",
    }),
    weight: w.weightKg,
  }));

  const weightDelta =
    sortedWeights.length >= 2
      ? Math.round(
          (sortedWeights[sortedWeights.length - 1].weightKg -
            sortedWeights[0].weightKg) *
            10,
        ) / 10
      : null;

  const height = heightRow?.heightCm ?? null;
  const imc =
    height && latestWeight
      ? calculateImc(latestWeight.weightKg, height)
      : null;

  return {
    monthStart,
    workouts: monthWorkouts.length,
    habitCompletionRate:
      scheduledTotal > 0 ? completedTotal / scheduledTotal : null,
    weightDelta,
    imc,
    weightSeries,
    weekBars,
  };
}
