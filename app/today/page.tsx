"use client";

import { useState } from "react";
import { DoseCard } from "@/components/dose-card";
import { formatTime, getTodayDoses, mockCourse } from "@/lib/mock-today";

const doses = getTodayDoses();

export default function TodayPage() {
  // dose id -> "HH:MM" when it was given. Kept in memory only (spec: no persistence).
  const [givenAt, setGivenAt] = useState<Record<string, string>>({});

  function markGiven(id: string) {
    const time = formatTime(new Date());
    // Never overwrite an existing mark.
    setGivenAt((prev) => (id in prev ? prev : { ...prev, [id]: time }));
  }

  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <p className="text-caption font-semibold text-secondary">Сегодня</p>
      <h1 className="mt-2 text-title font-semibold">{mockCourse.petName}</h1>
      <section className="mt-6 grid gap-4" aria-label="Приёмы на сегодня">
        {doses.map((d) => (
          <DoseCard
            key={d.id}
            medication={d.medication}
            dose={d.dose}
            time={d.time}
            givenAt={givenAt[d.id]}
            onGive={() => markGiven(d.id)}
          />
        ))}
      </section>
    </main>
  );
}
