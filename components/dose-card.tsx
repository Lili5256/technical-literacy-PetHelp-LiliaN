import { Button } from "@/components/ui/button";

export interface DoseCardProps {
  medication: string;
  dose: string;
  /** Scheduled time, "HH:MM". */
  time: string;
  /** Time the dose was given, "HH:MM". When set, the card is in the "given" state. */
  givenAt?: string;
  onGive?: () => void;
}

export function DoseCard({ medication, dose, time, givenAt, onGive }: DoseCardProps) {
  const given = givenAt !== undefined;
  return (
    <article className="flex items-center justify-between gap-4 rounded-card border border-line bg-surface p-5 shadow-card">
      <div>
        <p className="text-caption font-semibold text-secondary">{time}</p>
        <h2 className="mt-1 text-title font-semibold">{medication}</h2>
        <p className="mt-1 text-body text-secondary">{dose}</p>
      </div>
      {given ? (
        <p className="text-body font-semibold text-success">Дано в {givenAt}</p>
      ) : (
        <Button type="button" onClick={onGive}>
          Дал
        </Button>
      )}
    </article>
  );
}
