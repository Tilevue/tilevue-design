import { BentoGrid, type CardData } from "@/components/BentoGrid";
import { Header } from "@/components/Header";
import { CARD_TYPES } from "@/lib/cardSchema";
import { lookFonts } from "@/looks/fonts";
import { LOOKS, isLook, lookIcons, lookNote } from "@/looks/registry";

/**
 * The playground: a sample page with every card type (each filled with its `defaults` from lib/cardSchema.ts),
 * in the look you pick. ?look=<id> picks a look, ?card=<type> shows one card type only.
 */
export default async function Playground({ searchParams }: { searchParams: Promise<{ look?: string; card?: string }> }) {
  const { look = "", card = "" } = await searchParams;
  const id = isLook(look) ? look : undefined;
  const cards = Object.entries(CARD_TYPES)
    .filter(([type]) => !card || type === card)
    .map(([type, meta], i) => ({ type, size: meta.size, ...meta.defaults, id: `demo${i}` }) as unknown as CardData);
  const field = "h-9 rounded-full bg-fill px-3 text-sm text-ink";

  return (
    <>
      <main data-look={id} data-look-icons={id ? lookIcons(id) : undefined} className={lookFonts}>
        <Header
          name="Your Name"
          avatar="/images/avatar.webp"
          socials={[{ name: "Instagram", href: "https://instagram.com/", icon: "/icons/instagram.svg" }]}
          note={id ? lookNote(id) : undefined}
        />
        <BentoGrid cards={cards} />
      </main>
      {/* plain GET form: works without client JS and keeps the URL shareable */}
      <form className="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-fit gap-2 rounded-full bg-card p-2 shadow-card">
        <select name="look" defaultValue={id ?? ""} className={field} aria-label="Look">
          <option value="">Standard</option>
          {LOOKS.map((l) => (
            <option key={l.id} value={l.id}>{l.label}</option>
          ))}
        </select>
        <select name="card" defaultValue={card} className={field} aria-label="Card">
          <option value="">All cards</option>
          {Object.entries(CARD_TYPES).map(([type, meta]) => (
            <option key={type} value={type}>{meta.label}</option>
          ))}
        </select>
        <button className={`${field} bg-ink font-medium text-page`}>Show</button>
      </form>
    </>
  );
}
