import { habitRepository } from "@/entities/habit/repository";
import { habitCompletionRepository } from "@/entities/habit-completion/repository";
import {
  calculateStreak,
  completionKey,
  StreakHabit,
} from "@/entities/habit/streak";
import { addDays, endOfDay, startOfDay } from "@/shared/utils/date";

export interface ChecklistItem {
  publicId: string;
  name: string;
  description: string | null;
  completedToday: boolean;
}

export interface HabitListItem {
  publicId: string;
  name: string;
  description: string | null;
  frequency: number[];
}

export interface HabitsPageData {
  todayItems: ChecklistItem[];
  allHabits: HabitListItem[];
  streakCurrent: number;
  streakLongest: number;
  hasHabits: boolean;
}

export async function getHabitsPageData(
  userId: number,
): Promise<HabitsPageData> {
  const today = new Date();
  const todayWeekday = today.getDay();

  const [habits, todayCompletions, streakCompletions] = await Promise.all([
    habitRepository.listActiveFull(userId),
    habitCompletionRepository.getForDate(userId, startOfDay(today)),
    habitCompletionRepository.getInRange(
      userId,
      addDays(today, -180),
      endOfDay(today),
    ),
  ]);

  const completedTodayIds = new Set(todayCompletions.map((c) => c.habitId));

  const todayItems: ChecklistItem[] = habits
    .filter(
      (h) =>
        h.frequency.includes(todayWeekday) &&
        startOfDay(today).getTime() >= startOfDay(h.createdAt).getTime(),
    )
    .map((h) => ({
      publicId: h.publicId,
      name: h.name,
      description: h.description,
      completedToday: completedTodayIds.has(h.id),
    }));

  const allHabits: HabitListItem[] = habits.map((h) => ({
    publicId: h.publicId,
    name: h.name,
    description: h.description,
    frequency: h.frequency,
  }));

  const streakHabits: StreakHabit[] = habits.map((h) => ({
    id: h.id,
    frequency: h.frequency,
    createdAt: h.createdAt,
  }));
  const completedSet = new Set(
    streakCompletions.map((c) => completionKey(c.habitId, c.date)),
  );
  const streak = calculateStreak(streakHabits, completedSet, today);

  return {
    todayItems,
    allHabits,
    streakCurrent: streak.current,
    streakLongest: streak.longest,
    hasHabits: habits.length > 0,
  };
}
