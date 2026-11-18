import { describe, expect, test } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { DoseCard } from "@/components/dose-card";
import { formatTime, getTodayDoses } from "@/lib/mock-today";

describe("DoseCard", () => {
  test("unmarked: shows medication, dose, time and the «Дал» button", () => {
    const html = renderToStaticMarkup(
      createElement(DoseCard, {
        medication: "Синулокс",
        dose: "250 мг",
        time: "09:00",
      }),
    );
    expect(html).toContain("Синулокс");
    expect(html).toContain("250 мг");
    expect(html).toContain("09:00");
    expect(html).toContain("<button");
    expect(html).toContain("Дал");
    expect(html).not.toContain("Дано в");
  });

  test("marked: shows «Дано в HH:MM» and no button", () => {
    const html = renderToStaticMarkup(
      createElement(DoseCard, {
        medication: "Синулокс",
        dose: "250 мг",
        time: "09:00",
        givenAt: "09:04",
      }),
    );
    expect(html).toContain("Синулокс");
    expect(html).toContain("Дано в 09:04");
    expect(html).not.toContain("<button");
  });
});

describe("mock-today", () => {
  test("today has 3 doses sorted by time", () => {
    expect(getTodayDoses().map((d) => d.time)).toEqual(["09:00", "14:00", "21:00"]);
  });

  test("formatTime pads hours and minutes", () => {
    expect(formatTime(new Date(2026, 0, 1, 9, 4))).toBe("09:04");
  });
});
