import { Card, CardTop, type BaseCard } from "../Card";

type Lang = { flag?: string; name: string; level: number };

export type LanguagesCardProps = BaseCard & {
  title?: string;
  /** level 1–5 */
  languages: Lang[];
};

/** Languages you speak, with five-dot levels. */
export function LanguagesCard({ title = "I speak", languages, ...card }: LanguagesCardProps) {
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop left={<span className="text-sm">{title}</span>} />
      <ul className="space-y-2 text-sm">
        {languages.slice(0, 4).map((l, i) => (
          <li key={i} className="flex items-center gap-2">
            {l.flag && <span className="text-base leading-none">{l.flag}</span>}
            <span className="min-w-0 flex-1 truncate">{l.name}</span>
            <span className="flex gap-0.5" aria-label={`${l.level} of 5`}>
              {[1, 2, 3, 4, 5].map((d) => (
                <span
                  key={d}
                  className={`size-1.5 rounded-full transition-transform duration-300 ease-spring group-hover:scale-125 ${d <= l.level ? "bg-ink" : "bg-ink/15"}`}
                  style={{ transitionDelay: `${d * 30}ms` }}
                />
              ))}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
