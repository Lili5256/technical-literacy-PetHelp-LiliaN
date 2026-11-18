// Mock data for the "Today" screen. No Supabase yet.

export interface Dose {
  id: string;
  medication: string;
  dose: string;
  /** Scheduled time in "HH:MM" format. */
  time: string;
}

export interface Course {
  petName: string;
  medications: string[];
  doses: Dose[];
}

// Doses are intentionally out of order: sorting is done by getTodayDoses().
export const mockCourse: Course = {
  petName: "Барсик",
  medications: ["Синулокс", "Мелоксидил"],
  doses: [
    { id: "dose-2100", medication: "Синулокс", dose: "250 мг, 1 таблетка", time: "21:00" },
    { id: "dose-0900", medication: "Синулокс", dose: "250 мг, 1 таблетка", time: "09:00" },
    { id: "dose-1400", medication: "Мелоксидил", dose: "0,5 мл", time: "14:00" },
  ],
};

export function getTodayDoses(course: Course = mockCourse): Dose[] {
  return [...course.doses].sort((a, b) => a.time.localeCompare(b.time));
}

export function formatTime(date: Date): string {
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}
