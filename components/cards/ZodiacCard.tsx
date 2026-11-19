import { Badge, Card, CardText, CardTop, type BaseCard } from "../Card";

export const SIGNS = {
  aries: ["♈", "Aries", "Mar 21 – Apr 19"],
  taurus: ["♉", "Taurus", "Apr 20 – May 20"],
  gemini: ["♊", "Gemini", "May 21 – Jun 20"],
  cancer: ["♋", "Cancer", "Jun 21 – Jul 22"],
  leo: ["♌", "Leo", "Jul 23 – Aug 22"],
  virgo: ["♍", "Virgo", "Aug 23 – Sep 22"],
  libra: ["♎", "Libra", "Sep 23 – Oct 22"],
  scorpio: ["♏", "Scorpio", "Oct 23 – Nov 21"],
  sagittarius: ["♐", "Sagittarius", "Nov 22 – Dec 21"],
  capricorn: ["♑", "Capricorn", "Dec 22 – Jan 19"],
  aquarius: ["♒", "Aquarius", "Jan 20 – Feb 18"],
  pisces: ["♓", "Pisces", "Feb 19 – Mar 20"],
} as const;

export type ZodiacCardProps = BaseCard & {
  sign: keyof typeof SIGNS;
  /** Personality type or anything short, e.g. "INFP" */
  extra?: string;
};

/** Star sign (+ an optional personality type) — the symbol turns on hover. */
export function ZodiacCard({ sign, extra, ...card }: ZodiacCardProps) {
  const [symbol, name, dates] = SIGNS[sign] ?? SIGNS.leo;
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop
        left={
          // text presentation selector (U+FE0E) keeps it a glyph, not a colour emoji
          <span className="block text-[44px] leading-none text-ink/80 transition-transform duration-700 ease-spring group-hover:rotate-[20deg]">
            {symbol}
            {"︎"}
          </span>
        }
        right={extra && <Badge>{extra}</Badge>}
      />
      <CardText title={name} subtitle={dates} />
    </Card>
  );
}
