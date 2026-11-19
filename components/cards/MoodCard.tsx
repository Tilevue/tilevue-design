import { Badge, Card, CardText, CardTop, type BaseCard } from "../Card";

export type MoodCardProps = BaseCard & {
  emoji: string;
  text: string;
  /** e.g. "Updated today" */
  subtitle?: string;
};

/** How you're doing right now — a big emoji that wobbles on hover. */
export function MoodCard({ emoji, text, subtitle, ...card }: MoodCardProps) {
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop
        left={
          <span className="block origin-bottom text-[44px] leading-none transition-transform duration-500 ease-spring group-hover:-rotate-12 group-hover:scale-110">
            {emoji}
          </span>
        }
        right={<Badge>Mood</Badge>}
      />
      <CardText title={text} subtitle={subtitle} />
    </Card>
  );
}
