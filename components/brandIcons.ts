import {
  siApplemusic, siBehance, siBluesky, siCaldotcom, siClaude, siCursor, siDiscord, siDribbble, siFacebook, siGithub,
  siGoogle, siInstagram, siMastodon, siMedium, siNotion, siPatreon, siPinterest, siRaycast, siReddit, siShopify,
  siSnapchat, siSoundcloud, siSpotify, siSubstack, siTelegram, siThreads, siTiktok, siTwitch, siWhatsapp, siX,
  siYoutube, siYoutubemusic, type SimpleIcon,
} from "simple-icons";

/**
 * One-colour versions of the full-colour brand logos in public/icons, from simple-icons (CC0, simpleicons.org).
 *
 * Why: a stored logo like "/icons/instagram.svg" is a fixed full-colour image, so it can't follow a look. When a
 * logo is listed here, StoredIcon (components/icons.tsx) also draws this one-colour path in `currentColor`, and
 * looks show it instead of the image (looks/base.css) — so logos take each look's icon colour.
 *
 * Named imports (not `import *`) so only these paths ship to the browser.
 * Not in simple-icons, so they stay full-colour in every look: linkedin, amazon-music, stack-chatgpt (removed from
 * the package at those companies' request), and our own marks (kanso, luno, method, curated, newsletter…).
 *
 * Adding a logo: add the file to public/icons, find its slug on simpleicons.org, import `si<Slug>` and map it here.
 */
export const BRAND_MONO: Record<string, SimpleIcon> = {
  "/icons/instagram.svg": siInstagram,
  "/icons/instagram-mono.svg": siInstagram,
  "/icons/youtube.svg": siYoutube,
  "/icons/youtube-mono.svg": siYoutube,
  "/icons/youtube-music.svg": siYoutubemusic,
  "/icons/spotify.svg": siSpotify,
  "/icons/stack-spotify.svg": siSpotify,
  "/icons/apple-music.svg": siApplemusic,
  "/icons/twitch.svg": siTwitch,
  "/icons/bluesky.svg": siBluesky,
  "/icons/mastodon.svg": siMastodon,
  "/icons/telegram.svg": siTelegram,
  "/icons/reddit.svg": siReddit,
  "/icons/snapchat.svg": siSnapchat,
  "/icons/facebook.svg": siFacebook,
  "/icons/pinterest.svg": siPinterest,
  "/icons/discord.svg": siDiscord,
  "/icons/behance.svg": siBehance,
  "/icons/dribbble.svg": siDribbble,
  "/icons/substack.svg": siSubstack,
  "/icons/soundcloud.svg": siSoundcloud,
  "/icons/shopify.svg": siShopify,
  "/icons/cal.svg": siCaldotcom,
  "/icons/whatsapp.svg": siWhatsapp,
  "/icons/google.svg": siGoogle,
  "/icons/notion.svg": siNotion,
  "/icons/x.svg": siX,
  "/icons/threads.svg": siThreads,
  "/icons/tiktok.svg": siTiktok,
  "/icons/github.svg": siGithub,
  "/icons/medium.svg": siMedium,
  "/icons/patreon.svg": siPatreon,
  "/icons/stack-claude.svg": siClaude,
  "/icons/stack-cursor.svg": siCursor,
  "/icons/stack-raycast.svg": siRaycast,
};
