import { Arrow, Card, CardTop, type BaseCard } from "../Card";
import { StoredIcon } from "../icons";

export type PressCardProps = BaseCard & {
  /** e.g. "As featured in" */
  title: string;
  /** Publication / client names */
  names: string[];
  /** Brand logos with names — shown instead of `names` when set */
  logos?: { logo: string; name?: string }[];
};

/** "As featured in" — names set large and faded, like the big name in the header. Or a row of brand logos. */
export function PressCard({ title, names, logos, ...card }: PressCardProps) {
  const isSmall = card.size === "1x1";
  return (
    <Card {...card} size={card.size ?? "2x1"} layout="flex flex-col justify-between p-4">
      <CardTop left={<span className="font-mono text-xs font-medium text-subtle uppercase">{title}</span>} right={card.href && <Arrow />} />
      {logos?.length ? (
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {logos.slice(0, 8).map((l, i) => (
            <li key={i} className="flex items-center gap-2 text-sm font-medium" title={l.name}>
              <StoredIcon value={l.logo} className="size-8 rounded-lg" />
              {l.name && <span className="text-muted">{l.name}</span>}
            </li>
          ))}
        </ul>
      ) : (
        <p className={`flex flex-wrap font-semibold tracking-[-0.01em] text-ink/30 transition-colors duration-200 ease-smooth group-hover:text-ink/60 ${isSmall ? "text-sm leading-5 gap-x-3 gap-y-1" : "text-xl leading-7 gap-x-4 gap-y-1"}`}>
          {names.slice(0, 8).map((n, i) => (
            <span key={i}>{n}</span>
          ))}
        </p>
      )}
    </Card>
  );
}
