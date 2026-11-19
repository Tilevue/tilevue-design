/**
 * The list of looks — the one place a look is registered. Read looks/README.md before adding one.
 *
 * A look is a CSS file (looks/<id>.css, imported in looks/index.css) that restyles a profile page through the
 * hooks described in the README; this list makes it selectable in the editor and accepted on save
 * (lib/validate.ts sanitizeProfile only keeps ids found here).
 *
 * "" (no look) is the standard page, which follows the visitor's light/dark setting.
 */

export type Look = {
  /** The `data-look` value and the CSS file name. Lower-case letters only. Never rename one that shipped: saved
   *  pages store it, and an unknown id falls back to the standard page. */
  id: string;
  /** Shown in the editor's look picker */
  label: string;
  /** One line for the picker / docs: what the look is */
  description: string;
  /** This look draws a short note above the name (CSS `attr(data-note)`); the value is its default text.
   *  The owner can change it in the editor (up to NOTE_MAX characters) or clear it. */
  note?: string;
  /** Brand logos: "mono" (default) draws them in the look's icon colour; "color" keeps each brand's own colours
   *  (for looks that put logos on white badges). See looks/base.css. */
  icons?: "mono" | "color";
  /** Filters in the editor's look picker (LOOK_TAGS). A look can have several. */
  tags: readonly LookTag[];
};

/** The look picker's filter chips, in order. */
export const LOOK_TAGS = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "bold", label: "Bold" },
  { id: "playful", label: "Playful" },
  { id: "pro", label: "Professional" },
] as const;
export type LookTag = (typeof LOOK_TAGS)[number]["id"];

export const LOOKS = [
  { id: "sticker", label: "Sticker", description: "Cream paper, thick outlines, hard shadows, colour-block cards", tags: ["light", "playful"], icons: "color" },
  { id: "editorial", label: "Editorial", description: "Warm paper, hairlines, a big serif name, black-and-white arch photo", tags: ["light", "pro"] },
  { id: "canvas", label: "Canvas", description: "A design-tool artboard: grid, ruler, the name in a selection frame", tags: ["light", "playful"], note: "hello, I’m", icons: "color" },
  { id: "mat", label: "Cutting Mat", description: "A green cutting mat; every card a die-cut sticker", tags: ["playful", "bold"], note: "hello, my name is", icons: "color" },
  { id: "glass", label: "Glass", description: "Your photo blurred into the background, frosted cards, amber accents", tags: ["dark", "pro"] },
  { id: "poster", label: "Poster", description: "A huge blue condensed name with a capsule photo over it", tags: ["light", "bold"] },
  { id: "resume", label: "Resume", description: "Black and mint; a profile card pinned beside the cards on wide screens", tags: ["dark", "pro"] },
  { id: "blueprint", label: "Blueprint", description: "One colour — pure blue on white, monospace, a typed-in name", tags: ["light", "bold"] },
  { id: "crimson", label: "Crimson", description: "Deep red; a huge fading name with a script note across it", tags: ["bold"], note: "hello, I’m" },
  { id: "noir", label: "Noir", description: "Pure black, a huge tight name, the photo floating in front like an object", tags: ["dark", "bold"] },
  { id: "departures", label: "Departures", description: "A departures board on cables; the name in split-flap tiles", tags: ["light", "playful"] },
  { id: "vertical", label: "Vertical", description: "Near-black and acid green; everything loads in pixelated", tags: ["dark", "bold"] },
  { id: "spotlight", label: "Spotlight", description: "A capsule photo in blue light; the name inverts where it crosses it", tags: ["dark", "pro"] },
  { id: "forest", label: "Forest", description: "Deep teal, a cream script name, a tilted framed photo", tags: ["pro"] },
  { id: "daybreak", label: "Daybreak", description: "A painted sunrise sky with clouds and a skyline; the photo is the sun", tags: ["light", "playful"] },
  { id: "pop", label: "Pop", description: "Grid paper, heavy capitals, a blue label, colour blocks", tags: ["light", "playful", "bold"] },
  { id: "reel", label: "Reel", description: "Black and magenta, a crosshatch name, a glowing swoosh", tags: ["dark", "bold"] },
  { id: "bubble", label: "Bubble", description: "A fat bubbly name with floating app-icon shapes", tags: ["dark", "playful"] },
  { id: "cyber", label: "Cyber", description: "Red neon, a wide futuristic name, digital numbers, glitch entrance", tags: ["dark", "bold"] },
  { id: "lumiere", label: "Lumière", description: "A halftone dot screen, an oval photo, black-and-white card photos", tags: ["dark", "pro"] },
  { id: "index", label: "Index", description: "Pure black; cards become numbered rows on hairlines", tags: ["dark", "pro"] },
  { id: "notebook", label: "Notebook", description: "Dot-grid paper, a marker-highlighted name, pastel note cards", tags: ["light", "playful"] },
  { id: "dusk", label: "Dusk", description: "An evening sky, smoky glass panels, a rounded photo beside the name", tags: ["dark", "pro"] },
  { id: "swatch", label: "Swatch", description: "A cream sheet in a blue frame, a heavy name with an orange dot, primary-colour blocks", tags: ["light", "bold"] },
  { id: "riso", label: "Riso", description: "One red ink on graph paper: mono capitals, a red-print photo, thick outlines", tags: ["light", "bold"] },
  { id: "drafting", label: "Drafting", description: "An architect’s drawing sheet: grid paper, registration marks, a hairline title block", tags: ["light", "pro"] },
  { id: "brief", label: "Brief", description: "Clean white, a huge name with a yellow highlighter, calm panels", tags: ["light", "pro"] },
  { id: "scrapbook", label: "Scrapbook", description: "Ruled paper, a taped polaroid, a pixel name in a hand-drawn box, doodles", tags: ["light", "playful"], note: "hi, my name is", icons: "color" },
  { id: "tiles", label: "Tiles", description: "The whole page as soft pastel tiles, the header included", tags: ["light", "pro"] },
  { id: "split", label: "Split", description: "Lime and violet halves, the name split across the middle, a round photo badge", tags: ["bold", "playful"] },
  { id: "arc", label: "Arc", description: "Near-black, lilac and plum: an arch photo on big shapes, a huge tall name over it", tags: ["dark", "bold"] },
  { id: "cobalt", label: "Cobalt", description: "Blue ink on white, a serif name with a red typing cursor, a sidebar on wide screens", tags: ["light", "pro"] },
  { id: "swarm", label: "Swarm", description: "A dark design tool: rulers and team cursors, the cards built like a design timelapse", tags: ["dark", "pro"] },
  { id: "christmas", label: "Christmas", description: "A snowy night: chasing string lights, ringing gold bells, a holly wreath, falling snow", tags: ["dark", "playful"] },
] as const satisfies readonly Look[];

export type LookId = (typeof LOOKS)[number]["id"];

export const isLook = (v: unknown): v is LookId => LOOKS.some((l) => l.id === v);

/** Longest note the owner can write (it sits on one line above the name). */
export const NOTE_MAX = 24;

const find = (look: unknown): Look | undefined => LOOKS.find((l) => l.id === look);

/** The look's default note, or undefined when the look has no note. */
export function defaultNote(look: unknown): string | undefined {
  return find(look)?.note;
}

/** The note to show above the name: the owner's text ("" = none), else the look's default. Undefined = no note. */
export function lookNote(look: unknown, note?: string): string | undefined {
  const fallback = defaultNote(look);
  return fallback === undefined ? undefined : (note ?? fallback) || undefined;
}

/** How the look draws brand logos — goes on the page wrapper as data-look-icons (looks/base.css). */
export function lookIcons(look: unknown): "mono" | "color" {
  return find(look)?.icons ?? "mono";
}
