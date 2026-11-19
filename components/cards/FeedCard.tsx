import { Card, CardIcon, type BaseCard } from "../Card";

export type FeedImage = {
  src: string;
  position?: string;
};

export type FeedCardProps = BaseCard & {
  images: (string | FeedImage)[];
  icon?: string;
  /** e.g. "@leorivera" */
  handle?: string;
};

/**
 * Columns and how wide the first photo is, so any count fills the grid with no gaps and no repeats:
 * 1 → one photo · 2–4 → 2 columns · 5–9 → 3 columns, and the first photo widens to fill the last row's gap
 * (3 → wide first + 2, 5 → wide first + 4, 7 → full first row + 6, 8 → wide first + 7). Small cards: ≤ 2 columns.
 */
export function feedLayout(n: number, small: boolean) {
  let cols = n <= 1 ? 1 : n <= 4 ? 2 : 3;
  if (small) cols = Math.min(cols, 2);
  const rows = Math.ceil(n / cols);
  return { cols, rows, first: cols * rows - n + 1 };
}

const COLS = ["", "grid-cols-1", "grid-cols-2", "grid-cols-3"];
const SPAN = ["", "", "col-span-2", "col-span-3"];

/** Instagram-style photo grid: up to 9 photos when big, 6 when wide, 4 when small. Fades on hover like the photo cards. */
export function FeedCard({ images = [], icon = "/icons/instagram.svg", handle, ...card }: FeedCardProps) {
  const size = card.size ?? "2x2";
  const normalized: FeedImage[] = images.map((img) => (typeof img === "string" ? { src: img } : img));
  const shown = normalized.filter((p) => p.src).slice(0, size === "2x2" ? 9 : size === "2x1" ? 6 : 4);
  const { cols, rows, first } = feedLayout(shown.length, size === "1x1");

  return (
    <Card {...card} size={size} hover={card.hover ?? "dim"} layout="flex flex-col gap-2 p-2">
      <div className="flex items-center gap-2 px-2 pt-2 text-sm">
        <CardIcon icon={icon} />
        {handle && <span className="truncate">{handle}</span>}
      </div>
      {shown.length > 0 && (
        <div className={`grid min-h-0 flex-1 ${COLS[cols]} gap-1 overflow-hidden rounded-2xl`} style={{ gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}>
          {shown.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt=""
              loading="lazy"
              style={{ objectPosition: img.position ?? "top" }}
              className={`size-full min-h-0 object-cover ${img.position ?? "object-top"} ${i === 0 ? SPAN[first] : ""}`}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
