# Looks

A **look** restyles a whole profile page — colours, fonts, the name, the photo, the social buttons, every card and
the motion — without touching the page's content or markup. The owner picks one in the editor; "Standard" (no look)
is the default page, which follows the visitor's light/dark setting.

This folder is self-contained on purpose, so it can move to its own repository later. Everything a look needs is
here; the rest of the app only has to put two attributes and a class on the page wrapper (see
[How a look is applied](#how-a-look-is-applied)).

```
looks/
  README.md        ← you are here
  registry.ts      the list of looks (id, label, description, note, icons) + helpers
  fonts.ts         every font a look uses (next/font, loaded lazily)
  all.css          imports base.css + every look file — imported once from app/globals.css
  base.css         rules shared by all looks (derived colours, card shadow, brand-logo switch)
  <id>.css         one file per look, e.g. sticker.css, glass.css …
  christmas.ts     the one look with a script (see "Script")
  scripts/check.mjs   checks every look's fonts and name fit on a phone (npm run looks:check)
```

## How a look is applied

The page wrapper gets:

```html
<main data-look="sticker" data-look-icons="color" class="…font variables from looks/fonts.ts…">
```

- `data-look` switches the look on. Every rule in `<id>.css` starts with `[data-look="<id>"]`, so a look only ever
  applies inside its own wrapper.
- `data-look-icons` is `lookIcons(id)` from the registry: how brand logos are drawn (see [Icons](#icons)).
- the class is `lookFonts` from `fonts.ts`: makes every look font's CSS variable available.

Three places do this today: the public page (`app/[username]/page.tsx`), the editor (`components/editor/Editor.tsx`,
so owners see their look while editing) and the dev preview (`app/preview/theme/page.tsx`). The saved choice lives
on the profile (`look`, `lookNote` — `lib/profile.ts`, checked in `lib/validate.ts`, stored by `lib/store.ts`).

**Try any look on any template:** `npm run dev`, then open
`http://localhost:3000/preview/theme?look=<id>&t=<template>` (dev only). The buttons at the top switch both.

## Making a new look

1. **Copy a look that is close** to what you want (`cp looks/poster.css looks/<id>.css`) and replace every
   `"poster"` with your id. Ids are lower-case letters only and never change once shipped (saved pages store them).
2. **Register it** in `registry.ts` (`id`, `label`, one-line `description`, optional `note` / `icons`) and add
   `@import "./<id>.css";` to `all.css` in the same position.
3. **Fonts:** if it needs a new font, add it to `fonts.ts` (comment which look uses it) and refer to it in CSS by its
   variable, `var(--font-xyz)`.
4. **Style it** — start with the four colours, then the hooks below. Open the preview on several templates.
5. **Check it:** `npm run looks:check <id>` (fonts load, every template's name fits a 390px phone, no sideways
   scroll), then go through the [checklist](#checklist).

## Colours (tokens)

A look sets four colours; `base.css` derives the rest from them, and any of them can be overridden.

| token | what it is | derived from |
|---|---|---|
| `--color-page` | page background | — set it |
| `--color-card` | card background | — set it |
| `--color-ink` | main text | — set it |
| `--color-accent` | the look's accent | — set it |
| `--color-muted`, `--color-subtle` | secondary / tertiary text, icons | ink mixed into card |
| `--color-fill`, `--color-pill` | inputs, small pills | ink 6% over card |
| `--color-hover`, `--color-hover-strong` | card / button hover backgrounds | fill |
| `--color-popup` | popup frames | fill |
| `--color-ring` | 1px outlines | ink 10% |
| `--look-shadow` | the card outline + shadow (applied to `.shadow-card`) | ring + soft shadow |
| `--radius-card` | card corner radius | site default 24px |
| `--font-sans` | the look's text font | site Inter |

Tokens can be changed for one part of the page by setting them on that element — e.g. a coloured card sets
`--color-card` and `--color-ink` on its grid slot, and everything inside follows. Use `color-mix()` for shades
instead of writing new colours. Never set colours with `!important`.

Looks are fixed: they don't react to the visitor's dark-mode setting. Popups (`dialog`) inherit the look; if your
cards are see-through (glass), give `dialog` a solid `--color-card`.

## Hooks

Style the page **only** through these. They are stable class names on purpose — don't target Tailwind utility
classes (`.size-5`, `.items-start`…) or element structure (`header > p`): those change with any markup edit.

| hook | element | notes |
|---|---|---|
| `[data-look="<id>"]` | the page wrapper | where the tokens go |
| `header` | the page header | flex column: clock, identity, socials |
| `.page-clock` | the live clock | restyle freely (pill, label, top bar); `::before` / `::after` are free |
| `.page-identity` | photo + name wrapper | `display: contents` lets you reorder photo / name |
| `.page-avatar` | the photo | between the name's two lines by default (`position: absolute` + a centring `translate`); set `position: relative; inset: auto; translate: none` to put it above |
| `.page-name` | the name (`<h1>`) | one `<span>` per line; `--fit` is set inline (see [Name size](#name-size)); `data-note` holds the note |
| `.page-socials`, `.page-socials a` | the social buttons | |
| `.bento` | the card grid | `--gap`, `--cell`, `--cols` are its variables |
| `.card` | every card's root | `a.card` = a card that is a link |
| `:is(.bento > .card, .bento > * > .card)` | a card in the grid | use this for "every card" rules (scroll animations, tints) so cards nested inside cards aren't hit twice |
| `.card-top` | a card's top row | icon left, arrow / badge right |
| `.card-top > .card-icon` | a card's main icon | put badges here; it's a wrapper, so a background never paints over the icon inside |
| `.card-arrow` | the ↗ on link cards | |
| `svg.lucide`, `.icon-mono` | line icons, one-colour brand logos | colour both with one rule: `:is(svg.lucide, .icon-mono)` |
| `.shadow-card` | anything with the card shadow | gets `--look-shadow` automatically |

New hooks are fine when a look needs one: add a class to the shared component (`components/Header.tsx`,
`components/Clock.tsx`, `components/Card.tsx`), comment it there, and list it here.

## Rules (learned the hard way)

- **Never animate the photo's `translate`.** The header centres the photo with `translate`; an animation that sets
  it throws the photo off centre. Animate `transform`, `rotate` or `scale`, or animate an inner element.
- **Never tilt a card's text on hover.** Tilt, scale or move the whole card, an icon (`.card-top > .card-icon`) or the
  arrow — not the title or text group.
- **Hover only on devices that hover:** wrap hover rules in `@media (hover: hover)` (on touch screens a hover sticks
  after the tap). Give taps their own `:active` feedback.
- **All entrance, scroll and idle motion goes inside `@media (prefers-reduced-motion: no-preference)`.** Scroll-driven
  animations also go inside `@supports (animation-timeline: view())` so other browsers simply show the content.
- **Keep the name readable.** If your photo sits over the name, check short names ("Café") and long ones on a phone;
  put the photo above the name on small screens if it hides letters.
- **Don't add words.** A look may draw decoration, but text it adds (a note, a label) must come from the owner's data
  or be clearly decorative. A note is editable — declare it with `note` in the registry and draw it with
  `content: attr(data-note)`.
- **Keep it in CSS.** No JavaScript per look unless the owner asks for it — see [Script](#script) (only Christmas has one).
- **Inline SVG backgrounds** (skylines, patterns) are fine as `data:` URLs — draw them yourself, no copied artwork.

## Script

Some things CSS can't do: Christmas rings its bells when tapped and lets snow pile up on the cards and be swept off
with the pointer. That lives in `looks/christmas.ts`, started by `components/LookFx.tsx` (in the header):

- loaded with a dynamic `import()` only while the page's look is that look, so no other page pays for it;
- never in previews (`.look-thumb`, `.look-swatch`) — they stay still pictures;
- follows the editor's look picker (LookFx watches `data-look`) and cleans up after itself (`start()` returns `stop`);
- the CSS version stays as the fallback (no script, reduced motion, previews); the script sets `data-snow` on the
  wrapper and adds `.xmas-bells` / `.xmas-snow`, and the CSS hides its own snow and bells when those are there.

Elements a script adds are named in the look's CSS file with a prefix (`xmas-…`).

## Name size

The name shrinks to fit the screen: the header sets `--fit` (longest line length × 0.6, tuned for Inter semibold), and
the default size is `min(64px, (100vw - 32px) / var(--fit))`. Display fonts are wider or narrower, so each look sets
its own size with a factor:

```css
[data-look="poster"] .page-name {
  font-size: min(210px, calc((100vw - 32px) / var(--fit) * 1.0)); /* ← the factor */
}
```

Wide fonts need a smaller factor (Michroma in Cyber ≈ 0.5, the split-flap tiles in Departures ≈ 0.72), condensed
fonts a bigger one (Big Shoulders, Anton ≈ 1.0–1.05). `npm run looks:check <id>` tells you if any template's name runs off a phone screen.

## Fonts

All look fonts live in `fonts.ts` with `preload: false`, so a visitor only downloads the fonts of the look they're
looking at. next/font compiles the calls at build time: write each call out in full (no shared options object, no
loop). The site already loads Inter (`--font-inter`) and Geist Mono (`--font-mono`).

## Icons

Card icons come in three kinds (`components/icons.tsx` → `StoredIcon`):

- **line icons** — [lucide](https://lucide.dev) (`svg.lucide`): tinted with CSS, follow every look.
- **one-colour logos** — `mask:` icons: drawn in the text colour, follow every look.
- **brand logos** (`/icons/<brand>.svg`) — the brand's full-colour image. For logos listed in
  `components/brandIcons.ts`, a one-colour version from [simple-icons](https://simpleicons.org) (CC0) is drawn next
  to it (`.icon-mono`, `currentColor`).

The standard page shows the colour image. A look shows the one-colour version, so logos take the look's icon colour
(`:is(svg.lucide, .icon-mono) { color: … }`) — unless its registry entry says `icons: "color"` (for looks that set
logos on white badges, like Sticker). Logos simple-icons doesn't have (LinkedIn, Amazon Music, ChatGPT, our own
marks) stay in colour everywhere. To add one: map its file to its `si<Slug>` in `brandIcons.ts`.

## Checklist

Before a pull request:

- [ ] `looks/<id>.css` starts with a comment saying what the look is, and every section is commented
- [ ] registered in `registry.ts` and imported in `all.css`
- [ ] only hooks from the table above (or a new hook added to the component and this README)
- [ ] only token colours inside cards; new shades via `color-mix()`
- [ ] hover inside `@media (hover: hover)`, motion inside `prefers-reduced-motion: no-preference`
- [ ] the photo's `translate` is never animated; card text never tilts
- [ ] `npm run looks:check <id>` passes
- [ ] looked at in the preview on at least: creator, cafe, shop, doctor — desktop and a phone-sized window
- [ ] popups (tap a card that opens one) are readable
- [ ] the editor still works in the look (`/edit` with the look picked)
