import { Arrow, Card, CardText, CardTop, type BaseCard } from "../Card";

export type TeamCardProps = BaseCard & {
  team: string;
  /** Team colours, e.g. "#d10a11", "#ffffff" */
  color: string;
  color2?: string;
  /** Crest image (optional — initials are used otherwise) */
  crest?: string;
  /** e.g. "Next: vs Rapid · Sun 18:00" */
  next?: string;
};

/** Your team: colours, crest and the next match. The colour band slides on hover. */
export function TeamCard({ team, color, color2 = "#ffffff", crest, next, ...card }: TeamCardProps) {
  const initials = team.split(/\s+/).map((w) => w[0]).join("").slice(0, 3).toUpperCase();
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      {/* diagonal colour band in the corner */}
      <span
        aria-hidden
        className="absolute -top-6 -right-10 h-24 w-40 rotate-[30deg] transition-transform duration-500 ease-spring group-hover:translate-x-2"
        style={{ background: `linear-gradient(${color} 0 50%, ${color2} 50% 100%)`, boxShadow: "0 0 0 1px rgb(0 0 0 / 0.04)" }}
      />
      <CardTop
        left={
          crest ? (
            <img src={crest} alt="" className="size-12 object-contain" />
          ) : (
            <span className="flex size-12 items-center justify-center rounded-full text-sm font-bold" style={{ background: color, color: color2 }}>
              {initials}
            </span>
          )
        }
        right={card.href && <Arrow />}
      />
      <CardText title={team} subtitle={next} className="relative" />
    </Card>
  );
}
