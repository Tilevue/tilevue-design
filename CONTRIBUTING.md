# Contributing

Thanks for wanting to make Tilevue prettier. New looks, new cards and fixes to existing ones are all welcome.

## Before you start

- Looks: read [looks/README.md](looks/README.md). Cards: read [components/cards/README.md](components/cards/README.md).
- Have an idea that's very different from what's here? Open an issue first with a sketch or a reference image, so we
  can agree on it before you spend a weekend on it.

## A good pull request

- **One look or one card per pull request.**
- **Looks are CSS only, through the hooks.** No changes to components to make a look work. If you need a hook that
  doesn't exist, say so in the PR.
- **Cards use the theme tokens** (`text-ink`, `bg-fill`, … from `app/globals.css`), never a hard-coded colour, so
  dark mode and every look keep working. Build them from `components/Card.tsx`.
- **No new npm packages** unless there's really no other way. Say why in the PR.
- **No calls to outside services from a card** without talking about it in an issue first.
- **Works in light and dark, on a phone-sized window, in a few looks.** Long text should still fit.
- **Readable:** text has enough contrast on its background.
- **Respects reduced motion:** wrap animations in `@media (prefers-reduced-motion: no-preference)`.
- **Your own work.** No copied themes, no paid fonts, no images you don't have the rights to.
- **`npm run build` passes.**
- **Screenshots** in the PR description.

## What happens next

We review it, may ask for changes, and once it's merged it ships on tilevue.com. Your GitHub name goes in the release
notes.

By contributing, you agree that your contribution is licensed under the [MIT license](LICENSE) of this repo.

## Bugs

Something looks broken on a real Tilevue page? Open an issue with the page link, the look's name and a screenshot.
For account or app problems, use [tilevue-support](https://github.com/Tilevue/tilevue-support) instead.
