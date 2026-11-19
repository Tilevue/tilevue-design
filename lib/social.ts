/**
 * Social card (`link` type): recognise the network from a profile link, and fetch the follower count where a
 * free public API exists. Instagram, TikTok, X, LinkedIn, Facebook, Threads and Snapchat have none → typed count.
 * Only fixed API paths are called; Mastodon's host is the user's own instance (public https only — the worker
 * runs with `global_fetch_strictly_public`).
 */

export type Counter = "github" | "bluesky" | "mastodon" | "youtube";
export type Detected = { network: string; icon: string; prefix: string; handle: string; counter?: Counter };

type Rule = { host: RegExp; path: RegExp; network: string; icon: string; prefix: string; counter?: Counter };

// path: first capture group = handle
const RULES: Rule[] = [
  { host: /^(www\.)?instagram\.com$/, path: /^\/([\w.]+)/, network: "Instagram", icon: "/icons/instagram.svg", prefix: "instagram.com/" },
  { host: /^(www\.)?github\.com$/, path: /^\/([\w-]+)/, network: "GitHub", icon: "mask:/icons/github.svg", prefix: "github.com/", counter: "github" },
  { host: /^([a-z]{2,3}\.|www\.)?linkedin\.com$/, path: /^\/(?:in|company)\/([^/?#]+)/, network: "LinkedIn", icon: "/icons/linkedin.svg", prefix: "linkedin.com/in/" },
  { host: /^(www\.)?(x|twitter)\.com$/, path: /^\/(\w+)/, network: "X", icon: "mask:/icons/x-card.svg", prefix: "x.com/" },
  { host: /^(www\.)?threads\.(com|net)$/, path: /^\/@([\w.]+)/, network: "Threads", icon: "mask:/icons/threads-card.svg", prefix: "threads.com/@" },
  { host: /^(www\.)?tiktok\.com$/, path: /^\/@([\w.]+)/, network: "TikTok", icon: "mask:/icons/tiktok.svg", prefix: "tiktok.com/@" },
  { host: /^(www\.|m\.)?youtube\.com$/, path: /^\/@([\w.-]+)/, network: "YouTube", icon: "/icons/youtube.svg", prefix: "youtube.com/@", counter: "youtube" },
  { host: /^(www\.)?twitch\.tv$/, path: /^\/(\w+)/, network: "Twitch", icon: "/icons/twitch.svg", prefix: "twitch.tv/" },
  { host: /^(www\.)?snapchat\.com$/, path: /^\/add\/([\w.-]+)/, network: "Snapchat", icon: "/icons/snapchat.svg", prefix: "snapchat.com/add/" },
  { host: /^(www\.)?reddit\.com$/, path: /^\/(?:u|user)\/([\w-]+)/, network: "Reddit", icon: "/icons/reddit.svg", prefix: "reddit.com/u/" },
  { host: /^(t\.me|telegram\.me)$/, path: /^\/(\w+)/, network: "Telegram", icon: "/icons/telegram.svg", prefix: "t.me/" },
  { host: /^open\.spotify\.com$/, path: /^\/(?:artist|user)\/(\w+)/, network: "Spotify", icon: "/icons/spotify.svg", prefix: "Spotify" },
  { host: /^bsky\.app$/, path: /^\/profile\/([\w.:-]+)/, network: "Bluesky", icon: "/icons/bluesky.svg", prefix: "bsky.app/", counter: "bluesky" },
  { host: /^(www\.|m\.)?(facebook|fb)\.com$/, path: /^\/([\w.]+)/, network: "Facebook", icon: "/icons/facebook.svg", prefix: "facebook.com/" },
  { host: /^([a-z]{2}\.|www\.)?pinterest\.com$/, path: /^\/([\w.-]+)/, network: "Pinterest", icon: "/icons/pinterest.svg", prefix: "pinterest.com/" },
  { host: /^discord\.gg$/, path: /^\/([\w-]+)/, network: "Discord", icon: "/icons/discord.svg", prefix: "discord.gg/" },
  { host: /^(www\.)?discord\.com$/, path: /^\/invite\/([\w-]+)/, network: "Discord", icon: "/icons/discord.svg", prefix: "discord.gg/" },
  { host: /^(www\.)?behance\.net$/, path: /^\/([\w-]+)/, network: "Behance", icon: "/icons/behance.svg", prefix: "behance.net/" },
  { host: /^(www\.)?dribbble\.com$/, path: /^\/([\w-]+)/, network: "Dribbble", icon: "/icons/dribbble.svg", prefix: "dribbble.com/" },
  { host: /^(www\.)?medium\.com$/, path: /^\/@([\w.-]+)/, network: "Medium", icon: "mask:/icons/medium.svg", prefix: "medium.com/@" },
  { host: /^(www\.)?substack\.com$/, path: /^\/@([\w-]+)/, network: "Substack", icon: "/icons/substack.svg", prefix: "substack.com/@" },
  { host: /^(www\.)?patreon\.com$/, path: /^\/(?:c\/)?([\w-]+)/, network: "Patreon", icon: "mask:/icons/patreon.svg", prefix: "patreon.com/" },
  { host: /^(www\.|m\.)?soundcloud\.com$/, path: /^\/([\w-]+)/, network: "SoundCloud", icon: "/icons/soundcloud.svg", prefix: "soundcloud.com/" },
];

/** Profile link → network, icon and "prefix / handle" label. Mastodon = any host with /@user. Null = plain website. */
export function detect(href: string): Detected | null {
  let u: URL;
  try {
    u = new URL(href);
  } catch {
    return null;
  }
  if (!/^https?:$/.test(u.protocol)) return null;
  const host = u.hostname.toLowerCase();
  for (const r of RULES) {
    const m = r.host.test(host) && u.pathname.match(r.path);
    if (m) return { network: r.network, icon: r.icon, prefix: r.prefix, handle: decodeURIComponent(m[1]), counter: r.counter };
  }
  // name.substack.com / name.medium.com: the handle is the subdomain
  const sub = host.match(/^([\w-]+)\.(substack|medium)\.com$/);
  if (sub && sub[1] !== "www") return sub[2] === "substack"
    ? { network: "Substack", icon: "/icons/substack.svg", prefix: "substack.com/@", handle: sub[1] }
    : { network: "Medium", icon: "mask:/icons/medium.svg", prefix: "medium.com/@", handle: sub[1] };
  const masto = u.pathname.match(/^\/@(\w+)\/?$/);
  if (masto && host.includes(".")) return { network: "Mastodon", icon: "/icons/mastodon.svg", prefix: `${host}/@`, handle: masto[1], counter: "mastodon" };
  return null;
}

export type PostNetwork = "X" | "Reddit" | "Threads" | "Bluesky" | "LinkedIn" | "Mastodon";
const POST_ICON: Record<PostNetwork, string> = {
  X: "mask:/icons/x-card.svg", Reddit: "/icons/reddit.svg", Threads: "mask:/icons/threads-card.svg",
  Bluesky: "/icons/bluesky.svg", LinkedIn: "/icons/linkedin.svg", Mastodon: "/icons/mastodon.svg",
};

/** Post card: which site a post link is from (picks the card's look). Unknown → X look. */
export function postNetwork(href: string): { network: PostNetwork; icon: string } {
  let host = "", path = "";
  try {
    ({ hostname: host, pathname: path } = new URL(href));
  } catch {}
  host = host.toLowerCase().replace(/^(www|m|old)\./, "");
  const network: PostNetwork =
    host === "reddit.com" || host === "redd.it" ? "Reddit"
    : /^threads\.(com|net)$/.test(host) ? "Threads"
    : host === "bsky.app" ? "Bluesky"
    : /(^|\.)linkedin\.com$/.test(host) ? "LinkedIn"
    : !/^(x|twitter)\.com$/.test(host) && /^\/@\w+\/\d+/.test(path) ? "Mastodon"
    : "X";
  return { network, icon: POST_ICON[network] };
}

/* ---------- Song card: which app a song link opens ---------- */

export const MUSIC_APPS = [
  { name: "Spotify", icon: "/icons/spotify.svg", host: /^open\.spotify\.com$/, search: (q: string) => `https://open.spotify.com/search/${encodeURIComponent(q)}` },
  { name: "Apple Music", icon: "/icons/apple-music.svg", host: /^music\.apple\.com$/, search: (q: string) => `https://music.apple.com/search?term=${encodeURIComponent(q)}` },
  { name: "YouTube Music", icon: "/icons/youtube-music.svg", host: /^music\.youtube\.com$/, search: (q: string) => `https://music.youtube.com/search?q=${encodeURIComponent(q)}` },
  { name: "Amazon Music", icon: "/icons/amazon-music.svg", host: /^music\.amazon\.[a-z.]+$/, search: (q: string) => `https://music.amazon.com/search/${encodeURIComponent(q)}` },
  { name: "SoundCloud", icon: "/icons/soundcloud.svg", host: /^(m\.|on\.)?soundcloud\.com$/ },
  { name: "YouTube", icon: "/icons/youtube.svg", host: /^((www|m)\.)?youtube\.com$|^youtu\.be$/ },
] as const;

/** The music app a link opens (phones open the app itself when it's installed), or undefined. */
export function musicApp(href: unknown) {
  let host = "";
  try {
    host = new URL(String(href)).hostname.toLowerCase();
  } catch {}
  return MUSIC_APPS.find((a) => a.host.test(host));
}

/** What someone typed as their handle → just the handle: "@max", "max" or a pasted profile link all give "max". */
export function cleanHandle(v: unknown): string {
  let s = typeof v === "string" ? v.trim().slice(0, 200) : "";
  if (/^(https?:\/\/|www\.)|\.(com|tv|net|me)\//i.test(s)) s = detect(/^https?:/i.test(s) ? s : `https://${s}`)?.handle ?? "";
  return s.replace(/^@/, "").replace(/[^\w.-]/g, "").slice(0, 60);
}

/** 12500 → "12.5k", 1200000 → "1.2m" (matches the card's typed style). */
export const compact = (n: number) => new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n).toLowerCase();

export async function json(url: string, token?: string, notFound = "Couldn't find that profile"): Promise<Record<string, unknown>> {
  const res = await fetch(url, {
    headers: { Accept: "application/json", ...(typeof window === "undefined" && { "User-Agent": "tilevue" }), ...(token && { Authorization: `Bearer ${token}` }) },
    signal: AbortSignal.timeout(6000),
  }).catch(() => {
    throw new Error("That site didn't answer, try again");
  });
  if (res.status === 404) throw new Error(notFound);
  if (res.status === 403 || res.status === 429) throw new Error("Too many lookups right now, try again later");
  if (!res.ok) throw new Error("That site didn't answer, try again");
  return res.json();
}

/** Follower count for a detected profile. YouTube needs the server's key (pass it), the rest are keyless.
 *  githubToken (server only) lifts GitHub's per-IP limit, which Workers share. */
export async function followers(href: string, youtubeKey?: string, githubToken?: string): Promise<number> {
  const d = detect(href);
  if (!d?.counter) throw new Error(`${d?.network ?? "This site"} doesn't share follower counts — type yours`);
  const h = encodeURIComponent(d.handle);
  switch (d.counter) {
    case "github":
      return Number((await json(`https://api.github.com/users/${h}`, githubToken)).followers ?? 0);
    case "bluesky":
      return Number((await json(`https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${h}`)).followersCount ?? 0);
    case "mastodon":
      return Number((await json(`https://${new URL(href).hostname}/api/v1/accounts/lookup?acct=${h}`)).followers_count ?? 0);
    case "youtube": {
      if (!youtubeKey) throw new Error("YouTube counts aren't switched on yet — type yours");
      const r = await json(`https://www.googleapis.com/youtube/v3/channels?part=statistics&forHandle=@${h}&key=${encodeURIComponent(youtubeKey)}`);
      const stats = (r.items as { statistics?: { subscriberCount?: string; hiddenSubscriberCount?: boolean } }[] | undefined)?.[0]?.statistics;
      if (!stats) throw new Error("Couldn't find that channel");
      if (stats.hiddenSubscriberCount) throw new Error("This channel hides its subscriber count");
      return Number(stats.subscriberCount ?? 0);
    }
  }
}
