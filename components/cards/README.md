# Cards

Every tile on a page is a card. A card type is three pieces, added in this order (also in `CLAUDE.md`):

1. **The component** — `components/cards/<Name>Card.tsx`
2. **Registered** — `components/cards/registry.ts`: its props join the `CardData` union and the component goes into
   `cardComponents` under its `type`
3. **Described** — `lib/cardSchema.ts`: its entry in `CARD_TYPES` (label, description, icon, default size, sample
   values, and the `fields` the editor shows). This is the only place a card's fields are declared: the editor form
   and the save-time sanitizer (`lib/validate.ts`) both read it, and any prop not listed there is stripped on save.

A card that is only in the registry can't be added or edited; a field that is only in the component never saves.

## Building a card

Start from a small existing card (`TextCard.tsx`, `LinkCard.tsx`) and keep to the shared building blocks in
`components/Card.tsx` — they carry the styling hooks every look uses (see `looks/README.md` → "Hooks"):

```tsx
import { Quote } from "lucide-react";
import { Card, CardIcon, CardTop, CardText, Arrow, type BaseCard } from "../Card";

export type QuoteCardProps = BaseCard & { quote: string; author?: string };

/** One line of what the card is. */
export function QuoteCard({ quote, author, ...card }: QuoteCardProps) {
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop left={<CardIcon icon={<Quote strokeWidth={1.75} />} />} right={card.href && <Arrow />} />
      <CardText title={quote} subtitle={author} />
    </Card>
  );
}
```

| use | for | why |
|---|---|---|
| `Card` | the root | size (1x1 / 2x1 / 2x2), link handling, hover, and the `card` hook |
| `CardTop` | the top row | `card-top` hook |
| `CardIcon` | the main icon | `card-icon` hook (looks put badges behind it) and stored icon strings |
| `Arrow` | the ↗ on links | `card-arrow` hook |
| `CardText`, `Badge` | title / subtitle, small corner text | consistent sizes |

Rules for cards:

- **Colours from tokens only** (`text-ink`, `text-muted`, `bg-card`, `bg-fill`…), never hex values — that's what
  lets dark mode and all looks restyle the card.
- **Icons** as stored strings (`"lucide:Heart"`, `"/icons/x.svg"`, `"mask:/icons/…"`) through `CardIcon` /
  `StoredIcon`, or lucide components. See `looks/README.md` → "Icons".
- **Fit the cell.** A 1x1 card is a square 171px wide on a phone and 200px on desktop; check both.
- **Keep text out of absolute positions near the corners** — some looks round or tilt cards.
- Interactive cards (polls, guestbook…) are listed in `INTERACTIVE` in `lib/validate.ts` and get live data from the
  page; look at `PollCard.tsx` before writing one.

To see a new card in every look, add it to a template in `lib/templates.ts` and open
`/preview/theme?look=<id>&t=<template>`.
