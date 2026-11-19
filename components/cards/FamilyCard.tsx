import { Card, CardText, type BaseCard } from "../Card";
import { Avatar } from "../Header";

type Person = { name: string; photo?: string };

export type FamilyCardProps = BaseCard & {
  title: string;
  subtitle?: string;
  people: Person[];
};

/** Overlapping faces of your people. They spread out (and show names) on hover. */
export function FamilyCard({ title, subtitle, people, ...card }: FamilyCardProps) {
  const shown = people.slice(0, 5);
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <ul className="flex pt-1">
        {shown.map((p, i) => (
          <li
            key={i}
            className="relative -ml-3 transition-[margin] duration-500 ease-spring first:ml-0 group-hover:ml-1 first:group-hover:ml-0"
            style={{ zIndex: shown.length - i }}
          >
            <span className="block size-12 rounded-full ring-2 ring-card">
              <Avatar name={p.name} src={p.photo ?? ""} textClass="text-sm" />
            </span>
            <span className="absolute top-full left-1/2 mt-1 -translate-x-1/2 text-[10px] whitespace-nowrap text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {p.name}
            </span>
          </li>
        ))}
      </ul>
      <CardText title={title} subtitle={subtitle} />
    </Card>
  );
}
