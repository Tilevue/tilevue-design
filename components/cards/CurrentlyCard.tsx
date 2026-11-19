import { BookOpen, Gamepad2, Headphones, Tv } from "lucide-react";
import { Card, CardTop, type BaseCard } from "../Card";

export type CurrentlyCardProps = BaseCard & {
  title?: string;
  reading?: string;
  watching?: string;
  playing?: string;
  listening?: string;
};

const rows = [
  ["reading", BookOpen],
  ["watching", Tv],
  ["playing", Gamepad2],
  ["listening", Headphones],
] as const;

/** What you're reading, watching, playing and listening to — empty rows are hidden. */
export function CurrentlyCard({ title = "Currently", ...props }: CurrentlyCardProps) {
  const { size, href, newTab, className, hover } = props;
  const filled = rows.filter(([k]) => props[k]);
  return (
    <Card size={size} href={href} newTab={newTab} className={className} hover={hover} layout="flex flex-col justify-between p-4">
      <CardTop left={<span className="text-sm">{title}</span>} />
      <ul className="space-y-1.5 text-sm">
        {filled.map(([k, Icon]) => (
          <li key={k} className="flex items-center gap-2">
            <Icon className="size-4 shrink-0 text-muted transition-transform duration-300 ease-spring group-hover:scale-110" strokeWidth={1.75} />
            <span className="truncate">{props[k]}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
