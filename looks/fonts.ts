import { Albert_Sans, Anton, Bagel_Fat_One, Big_Shoulders, Bricolage_Grotesque, Chivo_Mono, DM_Sans, Caveat, Figtree, Fragment_Mono, JetBrains_Mono, Mona_Sans, Schibsted_Grotesk, Instrument_Sans, Instrument_Serif, Inter_Tight, Mr_Dafoe, Newsreader, Permanent_Marker, Poppins, Pixelify_Sans, Roboto_Mono, Space_Grotesk, Yellowtail, Sofia_Sans, Modak, Michroma, Orbitron, Hanken_Grotesk, Outfit, Archivo, Host_Grotesk, Silkscreen, Bebas_Neue, Domine } from "next/font/google";

/**
 * Fonts used by looks. Look CSS files refer to them by their CSS variable, e.g. `font-family: var(--font-bagel)`.
 *
 * - `preload: false`: a visitor's browser only downloads a font when the page's look actually uses it.
 * - next/font compiles these calls at build time, so each one is written out in full at the top level —
 *   no shared options object, no loop, no helper function.
 * - Adding a font for a new look: add one call below (say which look uses it), then add it to `lookFonts`.
 * - Already loaded site-wide (app/layout.tsx), free to use: --font-inter and --font-geist-mono (= --font-mono).
 */
const bagel = Bagel_Fat_One({ subsets: ["latin"], weight: "400", variable: "--font-bagel", preload: false }); // sticker: name
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", preload: false }); // sticker: text
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", preload: false }); // editorial: name
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", preload: false }); // editorial: text
const pixelify = Pixelify_Sans({ subsets: ["latin"], variable: "--font-pixelify", preload: false }); // canvas: name
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", preload: false }); // canvas: handwritten note
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], axes: ["wdth"], variable: "--font-bricolage", preload: false }); // mat: name (condensed) + text
const marker = Permanent_Marker({ subsets: ["latin"], weight: "400", variable: "--font-marker", preload: false }); // mat: marker note
const albert = Albert_Sans({ subsets: ["latin"], variable: "--font-albert", preload: false }); // glass: name + text
const shoulders = Big_Shoulders({ subsets: ["latin"], variable: "--font-shoulders", preload: false }); // poster: name
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", preload: false }); // poster: text
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono", preload: false }); // blueprint: name + text
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", preload: false }); // crimson: name
const dafoe = Mr_Dafoe({ subsets: ["latin"], weight: "400", variable: "--font-dafoe", preload: false }); // crimson: script note
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-poppins", preload: false }); // crimson: text
const interTight = Inter_Tight({ subsets: ["latin"], weight: "800", variable: "--font-inter-tight", preload: false }); // noir: name
const instrumentSans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument-sans", preload: false }); // noir: text
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "800", variable: "--font-jetbrains", preload: false }); // departures: flap tiles
const mona = Mona_Sans({ subsets: ["latin"], variable: "--font-mona", preload: false }); // departures: text
const fragment = Fragment_Mono({ subsets: ["latin"], weight: "400", variable: "--font-fragment", preload: false }); // vertical: labels
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", preload: false }); // vertical: text
const schibsted = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-schibsted", preload: false }); // spotlight: name + text
const chivo = Chivo_Mono({ subsets: ["latin"], variable: "--font-chivo", preload: false }); // spotlight: label
const yellowtail = Yellowtail({ subsets: ["latin"], weight: "400", variable: "--font-yellowtail", preload: false }); // forest: script name
const sofia = Sofia_Sans({ subsets: ["latin"], variable: "--font-sofia", preload: false }); // forest: text
const modak = Modak({ subsets: ["latin"], weight: "400", variable: "--font-modak", preload: false }); // bubble: name
const michroma = Michroma({ subsets: ["latin"], weight: "400", variable: "--font-michroma", preload: false }); // cyber: name
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", preload: false }); // cyber: digits
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", preload: false }); // lumiere + index: name + text
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", preload: false }); // notebook: name + text
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", preload: false }); // swatch: name (900) + text
const hostGrotesk = Host_Grotesk({ subsets: ["latin"], variable: "--font-host-grotesk", preload: false }); // brief: name + text
const silkscreen = Silkscreen({ subsets: ["latin"], weight: "700", variable: "--font-silkscreen", preload: false }); // scrapbook: name
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas", preload: false }); // arc: name
const domine = Domine({ subsets: ["latin"], variable: "--font-domine", preload: false }); // cobalt: name

/** All look font variables — put on the element that carries `data-look` (page, editor, preview). */
// an array + join, so a missing space can never glue two class names together
export const lookFonts = [bagel, grotesk, instrument, newsreader, pixelify, caveat, bricolage, marker, albert, shoulders, dmSans, robotoMono, anton, dafoe, poppins, interTight, instrumentSans, jetbrains, mona, fragment, figtree, schibsted, chivo, yellowtail, sofia, modak, michroma, orbitron, hanken, outfit, archivo, hostGrotesk, silkscreen, bebas, domine].map((f) => f.variable).join(" ");
