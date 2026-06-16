import { addDays, startOfDay, toDateInputValue } from "@/shared/utils/date";

export interface StreakHabit {
  id: number;
  frequency: number[];
  createdAt: Date;
}

type DayStatus = "neutral" | "complete" | "incomplete";

/** Chave de conclusão usada no Set: `${habitId}-${yyyy-mm-dd}`. */
export function completionKey(habitId: number, date: Date | string): string {
  return `${habitId}-${toDateInputValue(date)}`;
}

function dayStatus(
  habits: StreakHabit[],
  completed: Set<string>,
  day: Date,
): DayStatus {
  const weekday = day.getDay();
  const scheduled = habits.filter(
    (h) =>
      h.frequency.includes(weekday) &&
      startOfDay(day).getTime() >= startOfDay(h.createdAt).getTime(),
  );

  if (scheduled.length === 0) return "neutral";

  const allDone = scheduled.every((h) => completed.has(completionKey(h.id, day)));
  return allDone ? "complete" : "incomplete";
}

/**
 * Calcula a sequência atual e a maior sequência de dias com todos os
 * hábitos agendados concluídos (UC10). Dias sem hábitos agendados são
 * neutros: não contam nem quebram a sequência. O dia de hoje ainda em
 * aberto não quebra a sequência.
 */
export function calculateStreak(
  habits: StreakHabit[],
  completed: Set<string>,
  today: Date,
): { current: number; longest: number } {
  if (habits.length === 0) return { current: 0, longest: 0 };

  const MAX_DAYS = 366;

  // Sequência atual — caminha de hoje para trás.
  let current = 0;
  let cursor = startOfDay(today);

  if (dayStatus(habits, completed, cursor) === "incomplete") {
    // Hoje ainda em aberto: começa a contagem a partir de ontem.
    cursor = addDays(cursor, -1);
  }

  for (let i = 0; i < MAX_DAYS; i++) {
    const status = dayStatus(habits, completed, cursor);
    if (status === "complete") {
      current++;
      cursor = addDays(cursor, -1);
    } else if (status === "neutral") {
      cursor = addDays(cursor, -1);
    } else {
      break;
    }
  }

  // Maior sequência — varre da data mais antiga até hoje.
  const earliest = habits.reduce(
    (min, h) => (h.createdAt < min ? h.createdAt : min),
    today,
  );
  const totalDays = Math.min(
    MAX_DAYS,
    Math.round(
      (startOfDay(today).getTime() - startOfDay(earliest).getTime()) /
        86400000,
    ) + 1,
  );

  let running = 0;
  let longest = 0;
  for (let i = 0; i < totalDays; i++) {
    const day = addDays(startOfDay(earliest), i);
    const status = dayStatus(habits, completed, day);
    if (status === "complete") {
      running++;
      longest = Math.max(longest, running);
    } else if (status === "incomplete") {
      running = 0;
    }
  }

  return { current, longest: Math.max(longest, current) };
}
