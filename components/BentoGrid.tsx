import type { ComponentType } from "react";
import { CARD_EXPAND } from "@/lib/cardSchema";
import { Expandable } from "./CardSheet";
import { PageSearch } from "./PageSearch";
import { PostCard } from "./cards/PostCard";
import { cardComponents, type CardData } from "./cards/registry";

export type { CardData } from "./cards/registry";

const components: Record<CardData["type"], ComponentType<any>> = { ...cardComponents, post: PostCard };

// Not searchable: links, files, numbers-as-text a visitor wouldn't type, and our own bookkeeping.
const SKIP = new Set(["type", "size", "hover", "className", "href", "phone", "message", "cta", "id", "page", "levels", "shotAt", "countedAt"]);
const isPath = (s: string) => /^(https?:|\/|mask:|lucide:|mailto:|tel:)/.test(s);

/** Every word a visitor might search for on a card: its titles, prices, details, tags, codes, list items… */
function cardText(v: unknown, key = ""): string {
  if (SKIP.has(key)) return "";
  if (typeof v === "string") return isPath(v) ? "" : v;
  if (Array.isArray(v)) return v.map((x) => cardText(x)).join(" ");
  if (v && typeof v === "object") return Object.entries(v).map(([k, x]) => cardText(x, k)).join(" ");
  return "";
}

/**
 * Renders cards in the owner's order (no dense packing, see `.bento`). `bare` = no grid wrapper.
 * `search` → a small search icon on top (components/PageSearch.tsx).
 */
export function BentoGrid({ cards, bare, search }: { cards: CardData[]; bare?: boolean; search?: boolean }) {
  const list = cards.map(({ type, ...props }, i) => {
    const Component = components[type];
    const id = (props as { id?: string }).id;
    if (!Component) return null;
    // tap → bigger view, for cards that hide something (CARD_EXPAND)
    if (CARD_EXPAND[type])
      return (
        <Expandable key={i} type={type} values={props as Record<string, unknown>} id={id}>
          <Component {...props} />
        </Expandable>
      );
    // `contents` = no box of its own (the grid still sees the card); data-card lets TapTracker count taps on it
    return id ? (
      <div key={i} data-card={id} className="contents">
        <Component {...props} />
      </div>
    ) : (
      <Component key={i} {...props} />
    );
  });
  if (search)
    return <PageSearch items={cards.map((c, i) => ({ node: list[i], text: cardText(c) }))} />;
  return bare ? <>{list}</> : <section className="bento">{list}</section>;
}
