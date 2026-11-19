/**
 * What each card type is, what users can edit on it, and its defaults.
 * One source of truth: the editor builds its forms from `fields`,
 * and the server (lib/validate.ts) keeps ONLY these fields when saving.
 *
 * New card type: add the component (components/cards), register it (components/cards/registry.ts),
 * then describe it here.
 */

export type Option = { value: string; label: string };

export type Field = {
  key: string;
  label: string;
  kind:
    | "text"
    | "textarea"
    | "url"
    | "email"
    | "image" // photo (upload or URL)
    | "media" // photo upload, or a photo/video URL
    | "icon" // brand icon, symbol or own image
    | "number"
    | "checkbox"
    | "color"
    | "select"
    | "coords"
    | "datetime"
    | "list" // short words, typed comma-separated → string[]
    | "items"
    | "levels"; // not shown in the form: activity grid filled by a smart card (digits 0–4)
  placeholder?: string;
  help?: string;
  optional?: boolean;
  options?: Option[];
  min?: number;
  /** Numbers: the highest value. Lists ("items"): the most rows (default 30). */
  max?: number;
  /** For kind "items": the fields of each item */
  fields?: Field[];
  /** Hide this field in the editor while that other field has a value (e.g. smart data replaces it) */
  unless?: string;
  /** Show this field in the editor only while that key has a value (e.g. an editor-only "_paste" flag) */
  when?: string;
  /** Tucked into the editor's collapsed "More options" (icon, optional link…) so the main form stays short */
  more?: boolean;
  /** Stored and validated, but never shown in the editor (set by a smart card) */
  hidden?: boolean;
  /** A new card starts with this field's sample (a fine generic label like "FAQ"), instead of it being only a hint */
  keepSample?: boolean;
};

export type CardSize = "1x1" | "2x1" | "2x2";

export type CardMeta = {
  label: string;
  description: string;
  /** lucide icon name for the "Add card" menu */
  icon: LucideName;
  size: CardSize;
  defaults: Record<string, unknown>;
  fields: Field[];
  /** Not offered in the "Add card" menu */
  hidden?: boolean;
  /** At most this many of this card on one page (lib/validate.ts checks it on save) */
  max?: number;
  /** "Fill from link" in the editor (/api/oembed): which fields get the title, artist/channel and cover.
   *  `from` = the field holding the link (default "href"). */
  oembed?: { title: string; subtitle?: string; cover?: string; from?: string };
  /** Smart card: the `github` field's username fills the card (lib/github.ts), refreshed daily */
  github?: "activity" | "stats";
  /** Smart card: `href` → a tall screenshot in `screenshot` (lib/screenshot.ts), retaken every 14 days */
  shot?: true;
  /** Social card: `href` → network, icon, label and follower count (lib/social.ts), count refreshed daily */
  social?: true;
  /** Post card: a link to one post (X, Reddit, Bluesky, Mastodon) fills name, handle, text… (lib/social.ts fetchPost) */
  postFill?: true;
  /** Search box for famous quotes in the editor (dummyjson.com, free) */
  quoteSearch?: true;
  /** Place search in the editor (Photon, OpenStreetMap data): "address" fills address/coords/zoom (map card),
   *  "city" fills place/coords (location card) */
  placeSearch?: "address" | "city";
  /** Search box in the editor (lib/lookup.ts): fills the card from a book / podcast / game, or adds a book to the shelf */
  search?: "book" | "podcast" | "song" | "game" | "movie" | "shelf" | "channel";
  /** Extra words the "Add card" search finds this card by (never shown) */
  words?: string;
};

/** Symbols users can pick for card icons (rendered with lucide-react, see components/icons.tsx). */
export const LUCIDE_ICONS = [
  "AlignLeft", "Navigation", "Mail", "PenLine", "Smartphone", "ShoppingBag", "Book", "AppWindow", "Link",
  "Music", "Camera", "Briefcase", "Heart", "Star", "Globe", "Coffee", "Code", "Gamepad2", "Palette", "Mic",
  "Video", "MapPin", "Calendar", "Gift", "Headphones", "Utensils", "Dumbbell", "Plane", "Sparkles", "Store",
  "GraduationCap", "Newspaper", "Phone", "Shirt", "House", "Rocket", "Leaf", "PawPrint", "Car", "Film",
  "Quote", "FileText", "Timer", "ChartColumn", "Clock", "Receipt", "Tags", "Milestone", "CalendarDays", "ShoppingCart",
  "Stethoscope", "UserRound", "Activity", "SquareTerminal", "TicketPercent", "CalendarCheck", "Wifi", "Ticket",
  "Columns2", "CircleGauge", "ChartNoAxesGantt", "Award", "LayoutGrid", "CalendarRange", "AudioLines", "CircleHelp",
  "BadgeCheck", "MapPinned", "Smile", "BookOpen", "Moon", "Languages", "Users", "History", "Flag", "Cake", "Trophy", "ChefHat", "Shield", "Sprout", "Library", "Vote", "SmilePlus", "MessageCircleQuestion", "BookOpenText", "BadgeDollarSign", "Handshake", "PackageOpen", "TrendingUp",
] as const;
export type LucideName = (typeof LUCIDE_ICONS)[number] | "Image" | "Plus" | "Images" | "CircleDot" | "TvMinimalPlay" | "MessageCircle";

/** Colour brand icons in /public/icons. "mask:" = single-colour, tinted to match the theme. */
export const BRAND_ICONS: Option[] = [
  { value: "/icons/instagram.svg", label: "Instagram" },
  { value: "mask:/icons/github.svg", label: "GitHub" },
  { value: "/icons/linkedin.svg", label: "LinkedIn" },
  { value: "mask:/icons/x-card.svg", label: "X" },
  { value: "mask:/icons/threads-card.svg", label: "Threads" },
  { value: "mask:/icons/tiktok.svg", label: "TikTok" },
  { value: "/icons/youtube.svg", label: "YouTube" },
  { value: "/icons/spotify.svg", label: "Spotify" },
  { value: "/icons/apple-music.svg", label: "Apple Music" },
  { value: "/icons/twitch.svg", label: "Twitch" },
  { value: "/icons/bluesky.svg", label: "Bluesky" },
  { value: "/icons/mastodon.svg", label: "Mastodon" },
  { value: "/icons/telegram.svg", label: "Telegram" },
  { value: "/icons/reddit.svg", label: "Reddit" },
  { value: "/icons/snapchat.svg", label: "Snapchat" },
  { value: "/icons/facebook.svg", label: "Facebook" },
  { value: "/icons/pinterest.svg", label: "Pinterest" },
  { value: "/icons/discord.svg", label: "Discord" },
  { value: "/icons/behance.svg", label: "Behance" },
  { value: "/icons/dribbble.svg", label: "Dribbble" },
  { value: "mask:/icons/medium.svg", label: "Medium" },
  { value: "/icons/substack.svg", label: "Substack" },
  { value: "mask:/icons/patreon.svg", label: "Patreon" },
  { value: "/icons/soundcloud.svg", label: "SoundCloud" },
  { value: "/icons/shopify.svg", label: "Shopify" },
  { value: "/icons/cal.svg", label: "Cal.com" },
  { value: "/icons/newsletter.svg", label: "Newsletter" },
];

/** Networks for the header buttons. Icons are tinted, so only logos that work as one-colour silhouettes. */
export const SOCIAL_PRESETS = [
  { name: "X", icon: "/icons/x.svg", placeholder: "https://x.com/you" },
  { name: "GitHub", icon: "/icons/github.svg", placeholder: "https://github.com/you" },
  { name: "LinkedIn", icon: "/icons/linkedin.svg", placeholder: "https://linkedin.com/in/you" },
  { name: "Instagram", icon: "/icons/instagram-mono.svg", placeholder: "https://instagram.com/you" },
  { name: "TikTok", icon: "/icons/tiktok.svg", placeholder: "https://tiktok.com/@you" },
  { name: "YouTube", icon: "/icons/youtube-mono.svg", placeholder: "https://youtube.com/@you" },
  { name: "Threads", icon: "/icons/threads.svg", placeholder: "https://threads.com/@you" },
  { name: "Twitch", icon: "/icons/twitch.svg", placeholder: "https://twitch.tv/you" },
  { name: "Snapchat", icon: "/icons/snapchat.svg", placeholder: "https://snapchat.com/add/you" },
] as const;

const href = (optional = false): Field => ({ key: "href", label: "Link", kind: "url", placeholder: "https://…", optional, more: optional });
// Every card has a sensible default icon, so changing it lives under "More options".
const icon = (optional = false): Field => ({ key: "icon", label: "Icon", kind: "icon", optional, more: true });

export const CARD_TYPES = {
  text: {
    label: "Text",
    description: "A short bio or note",
    icon: "AlignLeft",
    size: "1x1",
    defaults: { text: "Write something about yourself." },
    fields: [
      { key: "text", label: "Text", kind: "textarea" },
      { key: "avatar", label: "Small photo (corner)", kind: "image", optional: true },
      icon(true),
    ],
  },
  link: {
    label: "Social / link",
    description: "Instagram, LinkedIn, GitHub… — paste your profile, followers fill in",
    icon: "Link",
    size: "1x1",
    social: true,
    defaults: { href: "https://instagram.com/you", icon: "/icons/instagram.svg", prefix: "instagram.com/", handle: "you" },
    fields: [
      { ...href(), label: "Profile or website link", placeholder: "https://instagram.com/you" },
      { key: "badge", label: "Followers", kind: "text", placeholder: "12.5k", optional: true, help: "Fills in by itself for GitHub, YouTube, Bluesky and Mastodon (updated daily). Type it for other sites." },
      { ...icon(), optional: true },
      { key: "prefix", label: "Gray text", kind: "text", placeholder: "instagram.com/", optional: true, more: true },
      { key: "handle", label: "Dark text", kind: "text", placeholder: "yourname", more: true },
    ],
  },
  image: {
    label: "Photo",
    description: "A picture, small or big",
    icon: "Image",
    size: "1x1",
    defaults: { src: "/images/plant.webp" },
    fields: [
      { key: "src", label: "Photo", kind: "image" },
      { key: "alt", label: "Description (for screen readers)", kind: "text", optional: true },
      {
        key: "position",
        label: "Focus",
        kind: "select",
        optional: true,
        options: [
          { value: "center", label: "Center" },
          { value: "center top", label: "Top" },
          { value: "center bottom", label: "Bottom" },
        ],
      },
      href(true),
    ],
  },
  email: {
    label: "Email",
    description: "Visitors click to copy your address",
    icon: "Mail",
    size: "1x1",
    defaults: { email: "you@example.com" },
    fields: [{ key: "email", label: "Email address", kind: "email" }],
  },
  location: {
    label: "Location",
    description: "Where you are, on a spinning globe",
    icon: "MapPin",
    size: "1x1",
    placeSearch: "city",
    defaults: { place: "Vienna, Austria", detail: "Home sweet home", coords: [48.21, 16.37] },
    fields: [
      { key: "place", label: "Place shown on the card", kind: "text", placeholder: "City, Country" },
      { key: "detail", label: "Second line", kind: "text", placeholder: "19° Sunny", optional: true },
      { key: "coords", label: "Globe position", kind: "coords", more: true, help: "Set by the search above; fine-tune here if you like." },
      { key: "flag", label: "Flag (top right)", kind: "image", optional: true },
    ],
  },
  music: {
    label: "Music",
    description: "A song you love, with a spinning record — search it, or paste a Spotify link",
    icon: "Music",
    size: "1x1",
    search: "song",
    defaults: { href: "https://open.spotify.com/", icon: "/icons/spotify.svg", artist: "Artist", track: "Song name", cover: "/images/vinyl.webp" },
    oembed: { title: "track", subtitle: "artist", cover: "cover" },
    // the link isn't shown: search sets it (app they listen on); "Paste my own link" (`_paste`, editor-only) shows it.
    // after a song search (`_picked`) the cover comes from the search → hidden too (Fields SongExtras)
    fields: [
      { ...href(), when: "_paste" },
      icon(),
      { key: "artist", label: "Artist", kind: "text" },
      { key: "track", label: "Song", kind: "text" },
      { key: "cover", label: "Cover art", kind: "image", unless: "_picked" },
    ],
  },
  book: {
    label: "Book",
    description: "What you're reading — search any book for its cover",
    icon: "Book",
    size: "1x1",
    search: "book",
    defaults: { cover: "/images/book-cover.webp", title: "The Making of Prince of Persia", author: "Jordan Mechner", label: "Currently reading" },
    fields: [
      { key: "cover", label: "Cover", kind: "image", optional: true },
      { key: "title", label: "Title", kind: "text" },
      { key: "author", label: "Author", kind: "text", optional: true },
      { key: "subtitle", label: "Subtitle", kind: "text", placeholder: "Filled when you search a book", optional: true },
      { key: "label", label: "Label", kind: "text", placeholder: "Currently reading", optional: true },
      href(true),
      { key: "bookColor", label: "Book back colour", kind: "color", optional: true, more: true },
    ],
  },
  podcast: {
    label: "Podcast",
    description: "A show you listen to — search it, or paste a Spotify link",
    icon: "Mic",
    size: "1x1",
    search: "podcast",
    oembed: { title: "title", cover: "cover" },
    defaults: { cover: "/images/podcast.webp", title: "Podcast name", label: "Listening to" },
    fields: [
      { ...href(true), label: "Link (Spotify, Apple Podcasts…)", more: false },
      { key: "cover", label: "Artwork", kind: "image", optional: true },
      { key: "title", label: "Show", kind: "text" },
      { key: "author", label: "Host", kind: "text", optional: true },
      { key: "label", label: "Label", kind: "text", placeholder: "Listening to", optional: true },
    ],
  },
  cover: {
    label: "Book / Podcast (old)",
    description: "What you're reading or listening to",
    icon: "Book",
    size: "1x1",
    hidden: true, // replaced by "book" and "podcast"; kept so pages saved with it still render and save
    defaults: { href: "https://example.com", cover: "/images/book-cover.webp", shape: "book", label: "Current read", title: "Book title" },
    fields: [
      href(true),
      { key: "cover", label: "Cover", kind: "image" },
      {
        key: "shape",
        label: "Style",
        kind: "select",
        options: [
          { value: "book", label: "Book (opens in 3D on hover)" },
          { value: "square", label: "Square (podcast, album)" },
        ],
      },
      { key: "label", label: "Label", kind: "text", placeholder: "Current read" },
      { key: "title", label: "Title", kind: "text" },
      { key: "bookColor", label: "Book back colour", kind: "color", optional: true },
    ],
  },
  media: {
    label: "Photo / video link",
    description: "Big picture or video with a title on top",
    icon: "Film",
    size: "1x1",
    defaults: { href: "https://example.com", media: "/images/luno.webp", title: "Title", subtitle: "Subtitle" },
    fields: [
      href(true),
      { key: "media", label: "Photo or video", kind: "media" },
      icon(true),
      { key: "title", label: "Title", kind: "text" },
      { key: "subtitle", label: "Subtitle", kind: "text", optional: true },
      { key: "duration", label: "Duration pill", kind: "text", placeholder: "3:20", optional: true },
      { key: "hoverOpacity", label: "Fade on hover (0.3–1)", kind: "number", min: 0.3, max: 1, optional: true },
      { key: "position", label: "Image focus", kind: "text", optional: true, hidden: true },
    ],
  },
  project: {
    label: "Project",
    description: "Your work, shop or business with a preview",
    icon: "Briefcase",
    size: "2x1",
    defaults: { href: "https://example.com", icon: "lucide:Sparkles", title: "My project", subtitle: "What it is", media: "/images/skateboards.webp", variant: "object" },
    fields: [
      href(true),
      icon(),
      { key: "title", label: "Title", kind: "text" },
      { key: "subtitle", label: "Subtitle", kind: "text", optional: true },
      { key: "media", label: "Preview (photo or video)", kind: "media" },
      {
        key: "variant",
        label: "Preview style",
        kind: "select",
        options: [
          { value: "screen", label: "Screen (website, app)" },
          { value: "object", label: "Cut-out (product photo)" },
        ],
      },
    ],
  },
  website: {
    label: "Website",
    description: "Your site in a little browser window — it scrolls by itself, like a video",
    icon: "AppWindow",
    max: 5,
    size: "2x2",
    shot: true,
    defaults: { href: "https://example.com" },
    fields: [
      { ...href(), label: "Website link", placeholder: "https://yoursite.com" },
      { key: "title", label: "Name in the address bar", kind: "text", placeholder: "yoursite.com", optional: true, more: true },
      { key: "screenshot", label: "Preview image (taken for you)", kind: "image", optional: true, more: true },
      { key: "shotAt", label: "Preview taken", kind: "datetime", optional: true, hidden: true },
    ],
  },
  collection: {
    label: "Collection",
    description: "A list that opens in a popup: gear, books, tools…",
    icon: "ShoppingBag",
    size: "1x1",
    defaults: {
      icon: "lucide:ShoppingBag",
      title: "My favourites",
      noun: "items",
      preview: "/images/wallet.webp",
      previewStyle: "right",
      items: [{ brand: "Brand", name: "Item", image: "/images/items/card-wallet.png", href: "https://example.com" }],
    },
    fields: [
      icon(),
      { key: "title", label: "Title", kind: "text", keepSample: true },
      { key: "noun", label: "Count word", kind: "text", keepSample: true, placeholder: "items", help: "Shown as “3 items”" },
      { key: "popupTitle", label: "Popup title", kind: "text", optional: true },
      { key: "preview", label: "Preview picture", kind: "image", optional: true },
      {
        key: "previewStyle",
        label: "Preview position",
        kind: "select",
        optional: true,
        options: [
          { value: "wide", label: "Wide (bottom right)" },
          { value: "right", label: "Right edge" },
          { value: "tall", label: "Tall (book)" },
          { value: "logo", label: "Logo (corner)" },
          { value: "camera", label: "Camera (corner contained)" },
        ],
      },
      { key: "previewClass", label: "Preview Class", kind: "text", optional: true, hidden: true },
      {
        key: "items",
        label: "Items",
        kind: "items",
        fields: [
          { key: "name", label: "Name", kind: "text" },
          { key: "brand", label: "Small gray line", kind: "text", optional: true },
          { key: "image", label: "Picture", kind: "image" },
          { key: "href", label: "Link", kind: "url", optional: true },
          { key: "mono", label: "Black logo (turn white in dark mode)", kind: "checkbox", optional: true },
        ],
      },
    ],
  },
  tweet: {
    label: "Post",
    description: "A pinned post from X, Reddit, Threads, Bluesky, LinkedIn… — styled like the site it's from",
    icon: "Newspaper",
    size: "2x1",
    postFill: true,
    defaults: {
      href: "https://x.com/",
      name: "Your Name",
      handle: "you",
      avatar: "/images/tweet-avatar.webp",
      text: "Hello world!",
      time: "10:30 AM · Jan 1, 2026",
    },
    fields: [
      { ...href(), label: "Link to the post", help: "The card takes that site's look (X, Reddit, Threads, Bluesky, LinkedIn, Mastodon)" },
      icon(true),
      { key: "followers", label: "Followers (top right)", kind: "text", optional: true },
      { key: "name", label: "Name", kind: "text" },
      { key: "handle", label: "Handle", kind: "text", placeholder: "without @ (LinkedIn: your headline)" },
      { key: "avatar", label: "Profile photo", kind: "image" },
      { key: "verified", label: "Blue check", kind: "checkbox", optional: true },
      { key: "subreddit", label: "Subreddit (Reddit)", kind: "text", placeholder: "without r/", optional: true },
      { key: "text", label: "Post", kind: "textarea" },
      { key: "time", label: "Date line", kind: "text" },
      { key: "likes", label: "Likes / upvotes", kind: "text", placeholder: "1.2k", optional: true, more: true },
      { key: "comments", label: "Comments", kind: "text", placeholder: "48", optional: true, more: true },
    ],
  },
  watch: {
    label: "Watching",
    description: "A movie or show with a star rating — search it for the poster",
    icon: "Video",
    size: "2x1",
    search: "movie",
    defaults: { media: "/videos/f1.mp4", poster: "/images/f1-poster.webp", title: "Movie title", label: "Recent watch", rating: 5 },
    fields: [
      href(true),
      { key: "title", label: "Title", kind: "text" },
      { key: "poster", label: "Poster", kind: "image" },
      { key: "media", label: "Background (trailer or photo)", kind: "media", optional: true, more: true, help: "Empty = the poster" },
      { key: "label", label: "Label", kind: "text", optional: true },
      { key: "rating", label: "Stars (0–5)", kind: "number", min: 0, max: 5 },
    ],
  },
  newsletter: {
    label: "Newsletter",
    description: "Collect email sign-ups",
    icon: "Mail",
    size: "2x1",
    defaults: { icon: "/icons/newsletter.svg", title: "Subscribe to my newsletter", description: "Updates shared infrequently." },
    fields: [
      icon(),
      { key: "title", label: "Title", kind: "text", keepSample: true },
      { key: "description", label: "Description", kind: "textarea", keepSample: true },
      { key: "subscribers", label: "Subscribers (top right)", kind: "text", optional: true },
      { key: "action", label: "Form endpoint", kind: "url", optional: true, help: "Where sign-ups are sent (POST, field “email”)." },
    ],
  },
  gallery: {
    label: "Gallery",
    description: "Several photos that slide by",
    icon: "Images",
    size: "2x2",
    defaults: {
      images: [{ src: "/images/coffee.webp" }, { src: "/images/plant.webp" }, { src: "/images/boats.webp" }],
      interval: 4,
    },
    fields: [
      {
        key: "images",
        label: "Photos",
        kind: "items",
        fields: [
          { key: "src", label: "Photo", kind: "image" },
          { key: "alt", label: "Description", kind: "text", optional: true },
        ],
      },
      { key: "interval", label: "Seconds per photo (0 = manual)", kind: "number", min: 0, max: 30, optional: true },
      href(true),
    ],
  },
  quote: {
    label: "Testimonial",
    description: "What someone said about you",
    icon: "Quote",
    size: "2x1",
    defaults: { quote: "Working together was a joy — thoughtful, fast and always kind.", name: "Alex Morgan", role: "Founder, Studio North" },
    fields: [
      { key: "quote", label: "Quote", kind: "textarea" },
      { key: "name", label: "Name", kind: "text" },
      { key: "role", label: "Role", kind: "text", placeholder: "Founder, Studio X", optional: true },
      { key: "avatar", label: "Photo", kind: "image", optional: true },
      href(true),
    ],
  },
  stats: {
    label: "Stats",
    description: "Big numbers: clients, years, followers…",
    icon: "ChartColumn",
    size: "2x1",
    defaults: {
      label: "Since 2014",
      stats: [
        { value: "40+", label: "Clients" },
        { value: "12", label: "Years" },
        { value: "3", label: "Products" },
      ],
    },
    github: "stats",
    fields: [
      { key: "github", label: "GitHub username", kind: "text", placeholder: "octocat", optional: true, help: "Fills repos, stars and followers for you, updated daily. Leave empty to type your own numbers." },
      {
        key: "stats",
        label: "Numbers (up to 3 are shown)",
        kind: "items",
        unless: "github",
        fields: [
          { key: "value", label: "Number", kind: "text", placeholder: "40+" },
          { key: "label", label: "Label", kind: "text", placeholder: "Clients" },
        ],
      },
      { key: "label", label: "Small text (top right)", kind: "text", optional: true, unless: "github" },
      icon(true),
      href(true),
    ],
  },
  status: {
    label: "Status",
    description: "Available for work, busy, away…",
    icon: "CircleDot",
    size: "1x1",
    defaults: { status: "available", title: "Available for work", subtitle: "Booking from March" },
    fields: [
      {
        key: "status",
        label: "Dot",
        kind: "select",
        options: [
          { value: "available", label: "Green — available" },
          { value: "busy", label: "Amber — busy" },
          { value: "away", label: "Gray — away" },
        ],
      },
      { key: "title", label: "Title", kind: "text" },
      { key: "subtitle", label: "Second line", kind: "text", optional: true },
      href(true),
    ],
  },
  countdown: {
    label: "Countdown",
    description: "Days left until a launch, event or trip",
    icon: "Timer",
    size: "1x1",
    defaults: { title: "Something big", date: "2026-12-24T18:00" },
    fields: [
      { key: "title", label: "What's happening", kind: "text" },
      { key: "date", label: "When", kind: "datetime" },
      { key: "doneText", label: "Text after the date", kind: "text", placeholder: "It's here", optional: true },
      icon(true),
      href(true),
    ],
  },
  app: {
    label: "App",
    description: "Your app, with a “Get” button",
    icon: "Smartphone",
    size: "1x1",
    defaults: { href: "https://apps.apple.com/", appIcon: "/images/podcast.webp", name: "My App", subtitle: "Productivity", rating: 4.8 },
    fields: [
      href(),
      { key: "appIcon", label: "App icon", kind: "image" },
      { key: "name", label: "Name", kind: "text" },
      { key: "subtitle", label: "Category", kind: "text", optional: true },
      { key: "rating", label: "Rating (0–5)", kind: "number", min: 0, max: 5, optional: true },
      { key: "cta", label: "Button text", kind: "text", placeholder: "Get", optional: true },
    ],
  },
  file: {
    label: "File link",
    description: "Link a PDF from Google Drive, Dropbox or Notion: CV, menu, price list…",
    icon: "FileText",
    size: "1x1",
    defaults: { href: "https://drive.google.com/", name: "Resume", detail: "PDF · Google Drive" },
    fields: [
      {
        key: "href",
        label: "File link",
        kind: "url",
        placeholder: "https://drive.google.com/…",
        help: "Share the file as \"anyone with the link\" on Google Drive, Dropbox or Notion, then paste the link here.",
      },
      { key: "name", label: "Name", kind: "text", placeholder: "Resume" },
      { key: "detail", label: "Details", kind: "text", placeholder: "PDF · Google Drive", optional: true },
      icon(true),
    ],
  },
  video: {
    label: "YouTube video",
    description: "Plays right on your page",
    icon: "TvMinimalPlay",
    size: "2x1",
    defaults: { url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ", title: "Big Buck Bunny", subtitle: "Blender Studio", duration: "10:34" },
    oembed: { title: "title", subtitle: "subtitle", from: "url" },
    fields: [
      { key: "url", label: "YouTube link", kind: "url", placeholder: "https://youtube.com/watch?v=…" },
      { key: "title", label: "Title", kind: "text" },
      { key: "subtitle", label: "Subtitle", kind: "text", optional: true },
      { key: "duration", label: "Duration", kind: "text", placeholder: "3:20", optional: true },
    ],
  },
  hours: {
    label: "Opening hours",
    description: "When you're open, with a live “Open now”",
    icon: "Clock",
    size: "1x1",
    defaults: {
      rows: [
        { days: "Mon–Fri", hours: "08:00–18:00" },
        { days: "Sat", hours: "10:00–16:00" },
        { days: "Sun", hours: "Closed" },
      ],
    },
    fields: [
      {
        key: "rows",
        label: "Hours (first 4 are shown)",
        kind: "items",
        fields: [
          { key: "days", label: "Days", kind: "text", placeholder: "Mon–Fri, Sat, Daily…" },
          { key: "hours", label: "Hours", kind: "text", placeholder: "09:00–18:00 or Closed" },
        ],
      },
      { key: "timeZone", label: "Time zone", kind: "text", placeholder: "Europe/Vienna", optional: true, help: "Leave empty to use the visitor's time." },
      href(true),
    ],
  },
  prices: {
    label: "Price list",
    description: "Services or menu with prices",
    icon: "Receipt",
    size: "2x1",
    defaults: {
      title: "Prices",
      items: [
        { name: "Haircut", price: "€35" },
        { name: "Beard trim", price: "€15" },
        { name: "Colour", price: "from €60", note: "Includes wash & style" },
        { name: "Kids (under 12)", price: "€20" },
      ],
    },
    fields: [
      { key: "title", label: "Title", kind: "text", keepSample: true },
      {
        key: "items",
        label: "Items",
        kind: "items",
        fields: [
          { key: "name", label: "Name", kind: "text" },
          { key: "price", label: "Price", kind: "text", placeholder: "€35" },
          { key: "note", label: "Note (shown in the full list)", kind: "text", optional: true },
        ],
      },
      icon(true),
    ],
  },
  support: {
    label: "Support me",
    description: "Tips, donations, “Buy me a coffee”",
    icon: "Heart",
    size: "1x1",
    defaults: { href: "https://buymeacoffee.com/", title: "Buy me a coffee", subtitle: "If you enjoy what I make", amounts: ["$3", "$5", "$10"] },
    fields: [
      { key: "href", label: "Tip link", kind: "url", placeholder: "https://buymeacoffee.com/you" },
      { key: "title", label: "Title", kind: "text", keepSample: true },
      { key: "subtitle", label: "Second line", kind: "text", optional: true },
      { key: "amounts", label: "Amounts (up to 3)", kind: "list", placeholder: "$3, $5, $10", optional: true },
    ],
  },
  tags: {
    label: "Tags",
    description: "Interests, skills or languages",
    icon: "Tags",
    size: "1x1",
    defaults: { title: "Things I love", tags: ["Photography", "Baking", "Hiking", "Jazz", "Dogs", "Travel"] },
    fields: [
      { key: "tags", label: "Tags", kind: "list", placeholder: "Photography, Baking, Hiking" },
      { key: "title", label: "Title", kind: "text", keepSample: true },
      icon(true),
      href(true),
    ],
  },
  timeline: {
    label: "Timeline",
    description: "Experience, studies or milestones",
    icon: "Milestone",
    size: "2x1",
    defaults: {
      title: "Journey",
      steps: [
        { when: "2023 – now", what: "Designer", where: "Studio North" },
        { when: "2019 – 23", what: "Barista", where: "Café Central" },
        { when: "2015 – 19", what: "BA Design", where: "Uni Wien" },
      ],
    },
    fields: [
      { key: "title", label: "Title", kind: "text", keepSample: true },
      {
        key: "steps",
        label: "Steps (newest first, 3 are shown)",
        kind: "items",
        fields: [
          { key: "when", label: "When", kind: "text", placeholder: "2023 – now" },
          { key: "what", label: "What", kind: "text" },
          { key: "where", label: "Where", kind: "text", optional: true },
        ],
      },
      icon(true),
      href(true),
    ],
  },
  event: {
    label: "Event",
    description: "A show, market, meetup or party",
    icon: "CalendarDays",
    placeSearch: "address",
    size: "1x1",
    defaults: { href: "https://example.com", title: "Summer Market", date: "2026-07-18", place: "Vienna · 10:00" },
    fields: [
      { key: "title", label: "Title", kind: "text" },
      { key: "date", label: "Date", kind: "datetime" },
      { key: "place", label: "Place & time", kind: "text", placeholder: "Vienna · 19:00", optional: true },
      { key: "mapLink", label: "Google Maps link (or pin)", kind: "url", placeholder: "https://maps.app.goo.gl/… or https://maps.google.com/…", optional: true, help: "Paste a Google Maps share link or pin" },
      href(true),
    ],
  },
  product: {
    label: "Product",
    description: "Something you sell, with its price",
    icon: "ShoppingCart",
    size: "1x1",
    defaults: { href: "https://example.com", image: "/images/items/card-wallet.png", name: "Card Wallet", price: "$49", subtitle: "Leather · Handmade" },
    fields: [
      { ...href(true), label: "Buy link", help: "Leave empty and the card opens this product on Amazon." },
      { key: "image", label: "Photo (cut-out works best)", kind: "image" },
      { key: "name", label: "Name", kind: "text" },
      { key: "price", label: "Price", kind: "text", placeholder: "$49" },
      { key: "subtitle", label: "Second line", kind: "text", optional: true },
    ],
  },
  item: {
    label: "Item for sale",
    description: "Photos, price and a WhatsApp or buy button — cars, products, anything",
    icon: "Tags",
    size: "2x2",
    defaults: { photos: [{ src: "/images/car.webp" }], title: "Porsche 911", price: "$89,000", details: ["1973", "62,000 km", "Manual"], status: "available" },
    fields: [
      { key: "photos", label: "Photos (visitors swipe through them)", kind: "items", max: 10, fields: [{ key: "src", label: "Photo", kind: "image" }] },
      { key: "title", label: "Name", kind: "text", placeholder: "2019 Honda Civic" },
      { key: "price", label: "Price", kind: "text", placeholder: "$12,900", optional: true },
      { key: "details", label: "Details", kind: "list", placeholder: "2019, 84,000 km, Diesel", optional: true },
      {
        key: "status",
        label: "Status",
        kind: "select",
        options: [
          { value: "available", label: "Available" },
          { value: "reserved", label: "Reserved" },
          { value: "sold", label: "Sold" },
        ],
      },
      { key: "phone", label: "WhatsApp number", kind: "text", placeholder: "+92 300 1234567", optional: true, help: "Visitors message you about this item. Leave empty to use a link instead." },
      { key: "href", label: "Buy link", kind: "url", placeholder: "https://…", optional: true, unless: "phone" },
      { key: "tags", label: "Tags (for search)", kind: "list", placeholder: "SUV, Diesel", optional: true },
      { key: "message", label: "WhatsApp message", kind: "text", placeholder: "Hi! Is the … still available?", optional: true, more: true },
      { key: "code", label: "Search code", kind: "text", placeholder: "LAMP", optional: true, more: true, help: "Say it in your video: “search LAMP on my page”." },
      { key: "cta", label: "Button text", kind: "text", placeholder: "WhatsApp", optional: true, more: true },
    ],
  },
  activity: {
    label: "Activity",
    description: "A GitHub-style grid: commits, workouts, posts",
    icon: "Activity",
    size: "2x1",
    defaults: { title: "Contributions", total: "1,204 this year", intensity: "medium" },
    github: "activity",
    fields: [
      { key: "github", label: "GitHub username", kind: "text", placeholder: "octocat", optional: true, help: "Shows your real contributions, updated daily. Leave empty for a decorative grid." },
      { key: "levels", label: "Contribution grid", kind: "levels", optional: true },
      { key: "title", label: "Title", kind: "text", keepSample: true },
      { key: "total", label: "Total (top right)", kind: "text", placeholder: "1,204 this year", optional: true },
      {
        key: "intensity",
        label: "How busy",
        kind: "select",
        unless: "github",
        options: [
          { value: "low", label: "Calm" },
          { value: "medium", label: "Busy" },
          { value: "high", label: "Very busy" },
        ],
      },
      {
        key: "look",
        label: "Look",
        kind: "select",
        optional: true,
        options: [
          { value: "grid", label: "Squares (GitHub)" },
          { value: "month", label: "This month (gym)" },
        ],
      },
      icon(true),
      href(true),
    ],
  },
  code: {
    label: "Code",
    description: "A snippet in a little code window",
    icon: "SquareTerminal",
    size: "1x1",
    defaults: { filename: "hello.ts", code: 'const hi = (name: string) =>\n  `Hi ${name}, welcome!`;\n\nhi("world");' },
    fields: [
      { key: "code", label: "Code", kind: "textarea" },
      { key: "filename", label: "File name", kind: "text", placeholder: "hello.ts", optional: true },
      href(true),
    ],
  },
  coupon: {
    label: "Coupon",
    description: "A discount code visitors copy",
    icon: "TicketPercent",
    size: "1x1",
    defaults: { code: "WELCOME10", discount: "−10%", title: "First order", subtitle: "Valid until Dec 31" },
    fields: [
      { key: "code", label: "Code", kind: "text" },
      { key: "discount", label: "Discount", kind: "text", placeholder: "−20%", optional: true },
      { key: "title", label: "Title", kind: "text" },
      { key: "subtitle", label: "Second line", kind: "text", optional: true },
    ],
  },
  rating: {
    label: "Rating",
    description: "Your review score and count",
    icon: "Star",
    size: "1x1",
    defaults: { score: 4.9, count: "1,284 reviews", source: "Google reviews" },
    fields: [
      { key: "score", label: "Score (0–5)", kind: "number", min: 0, max: 5 },
      { key: "count", label: "Number of reviews", kind: "text", placeholder: "1,284 reviews", optional: true },
      { key: "source", label: "Where from", kind: "text", keepSample: true, placeholder: "Google reviews" },
      href(true),
    ],
  },
  slots: {
    label: "Time slots",
    description: "Next free appointment times",
    icon: "CalendarCheck",
    size: "1x1",
    defaults: { href: "https://example.com/book", slots: ["Tue 10:00", "Tue 14:30", "Wed 09:00"], title: "Book a visit", subtitle: "Next available" },
    fields: [
      { key: "slots", label: "Times (up to 4)", kind: "list", placeholder: "Tue 10:00, Tue 14:30" },
      { key: "title", label: "Title", kind: "text", keepSample: true },
      { key: "subtitle", label: "Second line", kind: "text", optional: true },
      { key: "href", label: "Booking link", kind: "url" },
      icon(true),
    ],
  },
  booking: {
    label: "Book a call",
    description: "Your Cal.com link, with the next free times",
    icon: "CalendarCheck",
    size: "1x1",
    words: "booking calendar meeting appointment schedule cal.com call",
    oembed: { title: "title", subtitle: "subtitle" },
    defaults: { href: "https://cal.com/you", title: "Book a call", subtitle: "30 min" },
    fields: [
      { key: "href", label: "Cal.com link", kind: "url", placeholder: "https://cal.com/you", help: "Your public page link, or one event's link (cal.com/you/30min)" },
      { key: "title", label: "Title", kind: "text", keepSample: true },
      { key: "subtitle", label: "Second line", kind: "text", optional: true, placeholder: "30 min" },
      icon(true),
    ],
  },
  call: {
    label: "Phone",
    description: "A big green button to call (or text) you",
    icon: "Phone",
    size: "1x1",
    defaults: { phone: "+43 1 234 5678", mode: "call", title: "Call us" },
    fields: [
      { key: "phone", label: "Phone number", kind: "text", placeholder: "+43 1 234 5678" },
      {
        key: "mode",
        label: "Opens",
        kind: "select",
        options: [
          { value: "call", label: "Phone call" },
          { value: "sms", label: "Text message" },
        ],
      },
      { key: "title", label: "Title", kind: "text", keepSample: true },
    ],
  },
  whatsapp: {
    label: "WhatsApp",
    description: "Visitors start a WhatsApp chat with you",
    icon: "MessageCircle",
    size: "1x1",
    defaults: { phone: "+43 1 234 5678", title: "Chat on WhatsApp" },
    fields: [
      { key: "phone", label: "WhatsApp number", kind: "text", placeholder: "+43 1 234 5678", help: "With the country code" },
      { key: "title", label: "Title", kind: "text", keepSample: true },
      { key: "message", label: "First message (typed for the visitor)", kind: "text", placeholder: "Hi! I saw your page…", optional: true },
    ],
  },
  wifi: {
    label: "Wi-Fi",
    description: "Guest network — visitors copy the password",
    icon: "Wifi",
    size: "1x1",
    defaults: { network: "Guest", password: "welcome2026", label: "Free Wi-Fi" },
    fields: [
      { key: "network", label: "Network name", kind: "text" },
      { key: "password", label: "Password", kind: "text" },
      { key: "label", label: "Label", kind: "text", optional: true },
    ],
  },
  tour: {
    label: "Tour dates",
    description: "Shows with ticket links",
    icon: "Ticket",
    size: "2x1",
    defaults: {
      title: "Tour 2026",
      shows: [
        { date: "2026-11-21", city: "Vienna", venue: "Flex", href: "https://example.com" },
        { date: "2026-12-12", city: "Berlin", venue: "Lido", href: "https://example.com" },
        { date: "2026-12-19", city: "Prague", venue: "Lucerna", soldOut: true },
      ],
    },
    fields: [
      { key: "title", label: "Title", kind: "text" },
      {
        key: "shows",
        label: "Shows (3 are shown)",
        kind: "items",
        fields: [
          { key: "date", label: "Date", kind: "datetime" },
          { key: "city", label: "City", kind: "text" },
          { key: "venue", label: "Venue", kind: "text", optional: true },
          { key: "href", label: "Ticket link", kind: "url", optional: true },
          { key: "soldOut", label: "Sold out", kind: "checkbox", optional: true },
        ],
      },
      icon(true),
    ],
  },
  compare: {
    label: "Before / after",
    description: "Drag to compare two photos",
    icon: "Columns2",
    size: "2x2",
    defaults: { before: "/images/landscape.webp", after: "/images/landscape.webp", beforeMono: true },
    fields: [
      { key: "before", label: "Before", kind: "image" },
      { key: "after", label: "After", kind: "image" },
      { key: "beforeMono", label: "Show “before” in black & white", kind: "checkbox", optional: true },
      { key: "beforeLabel", label: "Before label", kind: "text", placeholder: "Before", optional: true },
      { key: "afterLabel", label: "After label", kind: "text", placeholder: "After", optional: true },
    ],
  },
  progress: {
    label: "Progress",
    description: "A goal with a progress ring",
    icon: "CircleGauge",
    size: "1x1",
    defaults: { value: 68, title: "Reading goal", subtitle: "16 of 24 books" },
    fields: [
      { key: "value", label: "Progress (0–100 %)", kind: "number", min: 0, max: 100 },
      { key: "title", label: "Title", kind: "text" },
      { key: "subtitle", label: "Second line", kind: "text", optional: true },
      href(true),
    ],
  },
  skills: {
    label: "Skills",
    description: "Skills or languages with level bars",
    icon: "ChartNoAxesGantt",
    size: "1x1",
    defaults: {
      title: "Skills",
      skills: [
        { name: "Design", level: 90 },
        { name: "Writing", level: 75 },
        { name: "Spanish", level: 60 },
      ],
    },
    fields: [
      { key: "title", label: "Title", kind: "text", keepSample: true },
      {
        key: "skills",
        label: "Skills (3 shown, 6 when wide)",
        kind: "items",
        fields: [
          { key: "name", label: "Name", kind: "text" },
          { key: "level", label: "Level (0–100)", kind: "number", min: 0, max: 100 },
        ],
      },
      icon(true),
      href(true),
    ],
  },
  press: {
    label: "Featured in",
    description: "Press, clients or partners",
    icon: "Award",
    size: "2x1",
    defaults: { title: "As featured in", names: ["Northside Weekly", "The Slow Review", "Form & Field", "Daily Craft"] },
    fields: [
      { key: "title", label: "Label", kind: "text", keepSample: true, placeholder: "As featured in" },
      { key: "names", label: "Names", kind: "list", placeholder: "Magazine, Podcast, Client" },
      {
        key: "logos",
        label: "Logos (shown instead of names)",
        kind: "items",
        optional: true,
        fields: [
          { key: "logo", label: "Logo", kind: "icon" },
          { key: "name", label: "Name", kind: "text", optional: true },
        ],
      },
      href(true),
    ],
  },
  feed: {
    label: "Photo feed",
    description: "An Instagram-style grid of photos",
    icon: "LayoutGrid",
    size: "2x2",
    defaults: {
      href: "https://instagram.com/",
      handle: "@you",
      images: ["coffee", "plant", "boats", "landscape", "car", "shelf", "ferrari", "luno", "kanso"].map((n) => ({ src: `/images/${n}.webp` })),
    },
    fields: [
      {
        key: "images",
        label: "Photos (big shows 9, wide 6, small 4)",
        kind: "items",
        max: 9,
        fields: [
          { key: "src", label: "Photo", kind: "image" },
          { key: "position", label: "Position", kind: "text", optional: true, hidden: true },
        ],
      },
      { key: "handle", label: "Handle", kind: "text", placeholder: "@you", optional: true },
      { key: "icon", label: "Icon", kind: "icon", optional: true },
      href(true),
    ],
  },
  map: {
    label: "Map",
    description: "Where to find you, with directions",
    icon: "MapPinned",
    max: 3,
    size: "1x1",
    placeSearch: "address",
    defaults: { title: "Find us", address: "Neubaugasse 12, 1070 Vienna", coords: [48.1993, 16.3497], zoom: 15 },
    fields: [
      { key: "address", label: "Address shown on the card", kind: "text", placeholder: "Street, city" },
      { key: "coords", label: "Map position", kind: "coords", optional: true, hidden: true },
      { key: "zoom", label: "Map zoom", kind: "number", min: 2, max: 18, optional: true, hidden: true },
      { key: "title", label: "Title", kind: "text", keepSample: true },
      {
        key: "business",
        label: "Google Business Profile link",
        kind: "url",
        placeholder: "https://maps.app.goo.gl/…",
        optional: true,
        help: "For businesses: in Google Maps open your business → Share → Copy link. A tap then shows your reviews, hours and photos.",
      },
    ],
  },
  schedule: {
    label: "Schedule",
    description: "Weekly classes, office hours, streams",
    icon: "CalendarRange",
    size: "2x1",
    defaults: {
      title: "This week",
      sessions: [
        { day: "Mon", name: "Strength", time: "07:00", note: "4 spots" },
        { day: "Wed", name: "Mobility", time: "18:30" },
        { day: "Fri", name: "HIIT", time: "07:00", note: "Full" },
        { day: "Sat", name: "Run club", time: "09:00", note: "Free" },
      ],
    },
    fields: [
      { key: "title", label: "Title", kind: "text", keepSample: true },
      {
        key: "sessions",
        label: "Sessions (today's first; 4 shown)",
        kind: "items",
        fields: [
          {
            key: "day",
            label: "Day",
            kind: "select",
            options: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => ({ value: d, label: d })),
          },
          { key: "name", label: "What", kind: "text" },
          { key: "time", label: "Time", kind: "text", placeholder: "18:30" },
          { key: "note", label: "Note", kind: "text", placeholder: "4 spots left", optional: true },
        ],
      },
      icon(true),
      href(true),
    ],
  },
  audio: {
    label: "Audio",
    description: "A song or episode — tap to listen on Spotify, SoundCloud…",
    icon: "AudioLines",
    size: "2x1",
    defaults: { href: "https://open.spotify.com/", title: "Northern Lights (demo)", subtitle: "Juno Bay", cover: "/images/vinyl.webp" },
    oembed: { title: "title", subtitle: "subtitle", cover: "cover" },
    fields: [
      { key: "href", label: "Track link", kind: "url", placeholder: "https://open.spotify.com/track/…", help: "Spotify, SoundCloud, Apple Music, Bandcamp…" },
      { key: "title", label: "Title", kind: "text" },
      { key: "subtitle", label: "Artist / show", kind: "text", optional: true },
      { key: "cover", label: "Cover art", kind: "image", optional: true },
    ],
  },
  faq: {
    label: "FAQ",
    description: "Questions people always ask",
    icon: "CircleHelp",
    size: "2x1",
    defaults: {
      title: "FAQ",
      items: [
        { q: "How do I book?", a: "Pick a time on the booking page — you'll get a confirmation email right away." },
        { q: "Can I cancel?", a: "Yes, free of charge up to 24 hours before." },
        { q: "Where do I park?", a: "There's a public garage two minutes away." },
      ],
    },
    fields: [
      { key: "title", label: "Title", kind: "text", keepSample: true },
      {
        key: "items",
        label: "Questions",
        kind: "items",
        fields: [
          { key: "q", label: "Question", kind: "text" },
          { key: "a", label: "Answer", kind: "textarea" },
        ],
      },
      icon(true),
    ],
  },
  certificates: {
    label: "Certificates",
    description: "Licences, certifications, awards",
    icon: "BadgeCheck",
    size: "1x1",
    defaults: {
      title: "Certified",
      certificates: [
        { name: "First Aid Instructor", issuer: "Red Cross", year: "2025" },
        { name: "UX Design", issuer: "Google", year: "2024" },
      ],
    },
    fields: [
      { key: "title", label: "Title", kind: "text", keepSample: true },
      {
        key: "certificates",
        label: "Certificates (3 shown, 4 when wide)",
        kind: "items",
        fields: [
          { key: "name", label: "Name", kind: "text" },
          { key: "issuer", label: "Issued by", kind: "text", optional: true },
          { key: "year", label: "Year", kind: "text", optional: true },
        ],
      },
      href(true),
    ],
  },
  polaroid: {
    label: "Polaroids",
    description: "Three photos that fan out on hover",
    icon: "Camera",
    size: "2x1",
    defaults: {
      title: "Summer 2026",
      photos: [
        { src: "/images/boats.webp", caption: "Mallorca" },
        { src: "/images/coffee.webp", caption: "slow mornings" },
        { src: "/images/landscape.webp", caption: "home" },
      ],
    },
    fields: [
      {
        key: "photos",
        label: "Photos (3)",
        kind: "items",
        fields: [
          { key: "src", label: "Photo", kind: "image" },
          { key: "caption", label: "Caption", kind: "text", optional: true },
        ],
      },
      { key: "title", label: "Title", kind: "text", optional: true },
      href(true),
    ],
  },
  /* ---------- everyday / personal ---------- */
  mood: {
    label: "Mood",
    description: "How you're doing right now",
    icon: "Smile",
    size: "1x1",
    defaults: { emoji: "☕", text: "Caffeinated & curious", subtitle: "Updated today" },
    fields: [
      { key: "emoji", label: "Emoji", kind: "text", placeholder: "☕" },
      { key: "text", label: "Mood", kind: "text" },
      { key: "subtitle", label: "Second line", kind: "text", optional: true },
    ],
  },
  currently: {
    label: "Currently",
    description: "Reading, watching, playing, listening",
    icon: "BookOpen",
    size: "1x1",
    defaults: { reading: "Tomorrow, and Tomorrow…", watching: "The Bear", playing: "Zelda: TOTK", listening: "Phoebe Bridgers" },
    fields: [
      { key: "title", label: "Title", kind: "text", placeholder: "Currently", optional: true },
      { key: "reading", label: "📖 Reading", kind: "text", optional: true },
      { key: "watching", label: "🎬 Watching", kind: "text", optional: true },
      { key: "playing", label: "🎮 Playing", kind: "text", optional: true },
      { key: "listening", label: "🎧 Listening", kind: "text", optional: true },
    ],
  },
  funfacts: {
    label: "Fun facts",
    description: "Things about you — tap for the next one",
    icon: "Sparkles",
    size: "1x1",
    defaults: { facts: ["I've never seen Star Wars.", "I can solve a Rubik's cube in under 2 minutes.", "I once met my favourite author by accident."].map((text) => ({ text })) },
    fields: [
      {
        key: "facts",
        label: "Facts",
        kind: "items",
        fields: [{ key: "text", label: "Fact", kind: "text" }],
      },
      { key: "title", label: "Title", kind: "text", placeholder: "Fun fact", optional: true },
    ],
  },
  zodiac: {
    label: "Star sign",
    description: "Your sign (and personality type)",
    icon: "Moon",
    size: "1x1",
    defaults: { sign: "leo", extra: "INFP" },
    fields: [
      {
        key: "sign",
        label: "Sign",
        kind: "select",
        options: ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"].map(
          (v) => ({ value: v, label: v[0].toUpperCase() + v.slice(1) }),
        ),
      },
      { key: "extra", label: "Personality type", kind: "text", placeholder: "INFP, Enneagram 4…", optional: true },
    ],
  },
  languages: {
    label: "Languages",
    description: "Languages you speak, with levels",
    icon: "Languages",
    size: "1x1",
    defaults: {
      languages: [
        { flag: "🇬🇧", name: "English", level: 5 },
        { flag: "🇩🇪", name: "German", level: 4 },
        { flag: "🇪🇸", name: "Spanish", level: 2 },
      ],
    },
    fields: [
      { key: "title", label: "Title", kind: "text", placeholder: "I speak", optional: true },
      {
        key: "languages",
        label: "Languages (4 shown)",
        kind: "items",
        fields: [
          { key: "flag", label: "Flag emoji", kind: "text", placeholder: "🇬🇧", optional: true },
          { key: "name", label: "Language", kind: "text" },
          { key: "level", label: "Level (1–5)", kind: "number", min: 1, max: 5 },
        ],
      },
    ],
  },
  journey: {
    label: "Hometown → now",
    description: "Where you're from and where you live",
    icon: "Plane",
    size: "1x1",
    defaults: { from: "Lahore", fromFlag: "🇵🇰", to: "Vienna", toFlag: "🇦🇹", note: "Since 2019" },
    fields: [
      { key: "from", label: "From", kind: "text" },
      { key: "fromFlag", label: "From flag", kind: "text", placeholder: "🇵🇰", optional: true },
      { key: "to", label: "Now", kind: "text" },
      { key: "toFlag", label: "Now flag", kind: "text", placeholder: "🇦🇹", optional: true },
      { key: "note", label: "Note", kind: "text", placeholder: "Since 2019", optional: true },
    ],
  },
  pet: {
    label: "Pet",
    description: "Your furry (or scaly) friend",
    icon: "PawPrint",
    size: "1x1",
    defaults: { photo: "/images/plant.webp", name: "Biscuit", about: "Golden retriever · 3", fact: "Steals socks, returns none" },
    fields: [
      { key: "photo", label: "Photo", kind: "image" },
      { key: "name", label: "Name", kind: "text" },
      { key: "about", label: "Breed · age", kind: "text", optional: true },
      { key: "fact", label: "Fun fact", kind: "text", optional: true },
    ],
  },
  family: {
    label: "My people",
    description: "Family & friends, faces side by side",
    icon: "Users",
    size: "1x1",
    defaults: { title: "My people", subtitle: "Family & best friends", people: [{ name: "Mia" }, { name: "Leo" }, { name: "Sam" }, { name: "Nora" }] },
    fields: [
      { key: "title", label: "Title", kind: "text", keepSample: true },
      { key: "subtitle", label: "Second line", kind: "text", optional: true },
      {
        key: "people",
        label: "People (5 shown)",
        kind: "items",
        fields: [
          { key: "name", label: "Name", kind: "text" },
          { key: "photo", label: "Photo", kind: "image", optional: true },
        ],
      },
    ],
  },
  travel: {
    label: "Travel map",
    description: "Countries you've visited, pinned on a globe",
    icon: "Globe",
    size: "2x1",
    defaults: { countries: ["Japan", "Italy", "Portugal", "Mexico", "Iceland", "Thailand", "Morocco"] },
    fields: [
      { key: "countries", label: "Countries", kind: "list", placeholder: "Japan, Italy, Mexico", help: "English country names get a pin." },
      { key: "title", label: "Title", kind: "text", placeholder: "Places I've been", optional: true },
    ],
  },
  memory: {
    label: "Memory",
    description: "A photo with “x years ago”",
    icon: "History",
    size: "1x1",
    defaults: { image: "/images/boats.webp", date: "2023-07-14", caption: "Best summer ever" },
    fields: [
      { key: "image", label: "Photo", kind: "image" },
      { key: "date", label: "When", kind: "datetime" },
      { key: "caption", label: "Caption", kind: "text", optional: true },
    ],
  },
  milestones: {
    label: "Milestones",
    description: "Big life moments on a line",
    icon: "Flag",
    size: "2x1",
    defaults: {
      steps: [
        { year: "2016", label: "Graduated", emoji: "🎓" },
        { year: "2019", label: "Moved to Vienna", emoji: "✈️" },
        { year: "2022", label: "Got married", emoji: "💍" },
        { year: "2025", label: "First home", emoji: "🏡" },
      ],
    },
    fields: [
      { key: "title", label: "Title", kind: "text", placeholder: "Milestones", optional: true },
      {
        key: "steps",
        label: "Moments (oldest first, 4 shown)",
        kind: "items",
        fields: [
          { key: "year", label: "Year", kind: "text" },
          { key: "label", label: "What happened", kind: "text" },
          { key: "emoji", label: "Emoji", kind: "text", optional: true },
        ],
      },
    ],
  },
  birthday: {
    label: "Birthday",
    description: "Countdown to your birthday — confetti on the day",
    icon: "Cake",
    size: "1x1",
    defaults: { date: "2000-08-12" },
    fields: [
      { key: "date", label: "Birthday", kind: "datetime", help: "Only the day and month are shown — never your age." },
      { key: "title", label: "Title", kind: "text", placeholder: "My birthday", optional: true },
    ],
  },
  top: {
    label: "Top 3",
    description: "Your three favourites, ranked",
    icon: "Trophy",
    size: "1x1",
    defaults: { title: "Top 3 films", items: ["Spirited Away", "Before Sunrise", "Paddington 2"] },
    fields: [
      { key: "title", label: "Title", kind: "text", placeholder: "Top 3 films" },
      { key: "items", label: "Favourites (in order)", kind: "list", placeholder: "First, Second, Third" },
    ],
  },
  recipe: {
    label: "Recipe",
    description: "A dish you love, with ingredients & steps",
    icon: "ChefHat",
    size: "1x1",
    defaults: {
      image: "/images/coffee.webp",
      name: "Iced oat latte",
      time: "5 min",
      level: "Easy",
      ingredients: ["2 shots espresso", "200 ml oat milk", "Ice", "1 tsp maple syrup"],
      steps: "Fill a glass with ice.\nAdd maple syrup and oat milk.\nPour the espresso on top and stir.",
    },
    fields: [
      { key: "image", label: "Photo", kind: "image" },
      { key: "name", label: "Dish", kind: "text" },
      { key: "time", label: "Time", kind: "text", placeholder: "25 min", optional: true },
      { key: "level", label: "Difficulty", kind: "text", placeholder: "Easy", optional: true },
      { key: "ingredients", label: "Ingredients", kind: "list", placeholder: "2 eggs, 100 g flour, …" },
      { key: "steps", label: "Steps (one per line)", kind: "textarea", optional: true },
    ],
  },
  game: {
    label: "Gaming",
    description: "The game you're playing — search it for the box art",
    icon: "Gamepad2",
    size: "1x1",
    search: "game",
    defaults: { game: "Rocket League", status: "playing", platform: "PC" }, // no example rank/hours: they would stick to the game you pick
    fields: [
      { key: "game", label: "Game", kind: "text" },
      {
        key: "status",
        label: "Status",
        kind: "select",
        optional: true,
        options: [
          { value: "playing", label: "Playing now" },
          { value: "recent", label: "Recently played" },
          { value: "finished", label: "Finished" },
          { value: "favourite", label: "All-time favourite" },
        ],
      },
      { key: "platform", label: "Platform", kind: "text", placeholder: "PS5, PC, Switch", optional: true },
      { key: "rank", label: "Rank", kind: "text", optional: true },
      { key: "hours", label: "Hours", kind: "text", placeholder: "312 h played", optional: true },
      { key: "cover", label: "Box art", kind: "image", optional: true },
    ],
  },
  team: {
    label: "My team",
    description: "Your sports team, colours and next match",
    icon: "Shield",
    size: "1x1",
    defaults: { team: "FC Vienna", color: "#16a34a", color2: "#ffffff", next: "Next: vs Graz · Sun 18:00" },
    fields: [
      { key: "team", label: "Team", kind: "text" },
      { key: "color", label: "Main colour", kind: "color" },
      { key: "color2", label: "Second colour", kind: "color", optional: true },
      { key: "crest", label: "Crest", kind: "image", optional: true },
      { key: "next", label: "Next match", kind: "text", optional: true },
      href(true),
    ],
  },
  plants: {
    label: "Plants",
    description: "Your plants and when to water them",
    icon: "Sprout",
    size: "1x1",
    defaults: {
      plants: [
        { emoji: "🌿", name: "Monstera", note: "every 7 d" },
        { emoji: "🌵", name: "Cactus", note: "monthly" },
        { emoji: "🪴", name: "Pothos", note: "every 5 d" },
      ],
    },
    fields: [
      { key: "title", label: "Title", kind: "text", placeholder: "My plants", optional: true },
      {
        key: "plants",
        label: "Plants (3 shown)",
        kind: "items",
        fields: [
          { key: "emoji", label: "Emoji", kind: "text", optional: true },
          { key: "name", label: "Plant", kind: "text" },
          { key: "note", label: "Water", kind: "text", placeholder: "every 7 d", optional: true },
        ],
      },
    ],
  },
  spines: {
    label: "Bookshelf",
    description: "Book spines on a shelf — search to add books",
    icon: "Library",
    size: "2x1",
    search: "shelf",
    defaults: {
      books: ["Dune", "Normal People", "Atomic Habits", "The Hobbit", "Circe", "Sapiens", "Educated"].map((title) => ({ title })),
    },
    fields: [
      { key: "title", label: "Title", kind: "text", placeholder: "On my shelf", optional: true },
      {
        key: "books",
        label: "Books (9 shown)",
        kind: "items",
        fields: [
          { key: "title", label: "Title", kind: "text" },
          { key: "author", label: "Author", kind: "text", optional: true },
          { key: "cover", label: "Cover", kind: "image", optional: true, help: "Filled when you add a book from the search. It becomes the spine." },
          { key: "pages", label: "Pages", kind: "number", min: 1, max: 5000, optional: true, help: "Makes the spine thick or thin. Filled by the search." },
          { key: "color", label: "Spine colour (no cover)", kind: "color", optional: true },
          { key: "href", label: "Link", kind: "url", optional: true },
        ],
      },
    ],
  },
  ask: {
    label: "Ask me",
    description: "Visitors email you a question",
    icon: "MessageCircleQuestion",
    size: "1x1",
    defaults: { email: "you@example.com", title: "Ask me anything" },
    fields: [
      { key: "email", label: "Send questions to", kind: "email" },
      { key: "title", label: "Title", kind: "text", keepSample: true },
      { key: "placeholder", label: "Placeholder", kind: "text", placeholder: "Your question…", optional: true },
    ],
  },
  poll: {
    label: "Poll",
    description: "Ask visitors to vote — live results",
    icon: "Vote",
    max: 3,
    size: "1x1",
    defaults: { question: "Pineapple on pizza?", options: ["Yes 🍍", "Never"] },
    fields: [
      { key: "question", label: "Question", kind: "text" },
      { key: "options", label: "Answers (2–4)", kind: "list", placeholder: "Yes, No, Maybe" },
    ],
  },
  guestbook: {
    label: "Guestbook",
    description: "Visitors leave you a short note",
    icon: "BookOpenText",
    max: 1,
    size: "2x1",
    defaults: { title: "Guestbook" },
    fields: [{ key: "title", label: "Title", kind: "text", keepSample: true }],
  },
  reactions: {
    label: "Reactions",
    description: "Emoji buttons visitors can tap",
    icon: "SmilePlus",
    max: 2,
    size: "1x1",
    defaults: { title: "Say hi", emojis: ["👋", "❤️", "🔥", "😂"] },
    fields: [
      { key: "emojis", label: "Emoji (up to 4)", kind: "list", keepSample: true, placeholder: "👋, ❤️, 🔥, 😂" },
      { key: "title", label: "Title", kind: "text", optional: true },
    ],
  },
  wishlist: {
    label: "Wishlist",
    description: "Gift ideas — tick off what you got",
    icon: "Gift",
    size: "2x1",
    defaults: {
      items: [
        { name: "Noise-cancelling headphones", price: "$299", image: "/images/items/airpods-max.png", href: "https://example.com" },
        { name: "Leather card wallet", price: "$49", image: "/images/items/card-wallet.png", href: "https://example.com", got: true },
        { name: "Pottery class", price: "$80", href: "https://example.com" },
      ],
    },
    fields: [
      { key: "title", label: "Title", kind: "text", placeholder: "Wishlist", optional: true },
      {
        key: "items",
        label: "Wishes",
        kind: "items",
        fields: [
          { key: "name", label: "Item", kind: "text" },
          { key: "price", label: "Price", kind: "text", optional: true },
          { key: "image", label: "Picture", kind: "image", optional: true },
          { key: "href", label: "Link", kind: "url", optional: true },
          { key: "got", label: "Already got it", kind: "checkbox", optional: true },
        ],
      },
    ],
  },
  dailyquote: {
    label: "Daily quote",
    description: "A different quote every day",
    icon: "Quote",
    size: "2x1",
    quoteSearch: true,
    defaults: {
      quotes: [
        { text: "Luck is what happens when preparation meets opportunity.", author: "Seneca" },
        { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Proverb" },
        { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
        { text: "What we think, we become.", author: "Buddha" },
      ],
    },
    fields: [
      {
        key: "quotes",
        label: "Quotes (one shows each day)",
        kind: "items",
        fields: [
          { key: "text", label: "Quote", kind: "textarea" },
          { key: "author", label: "Author", kind: "text", optional: true },
        ],
      },
    ],
  },
  post: {
    label: "Blog post",
    description: "Links to a post on this site",
    icon: "PenLine",
    size: "1x1",
    hidden: true,
    defaults: { slug: "" },
    fields: [{ key: "slug", label: "Post", kind: "text" }],
  },
  vcard: {
    label: "Contact",
    description: "Downloadable contact card for phone address books",
    icon: "UserRound",
    size: "1x1",
    defaults: { name: "Alex Morgan", title: "Product Designer", company: "Studio", phone: "+1 (555) 0199", email: "alex@example.com" },
    fields: [
      { key: "name", label: "Full name", kind: "text" },
      { key: "title", label: "Job title", kind: "text", optional: true },
      { key: "company", label: "Company / Studio", kind: "text", optional: true },
      { key: "phone", label: "Phone number", kind: "text", optional: true },
      { key: "email", label: "Email", kind: "text", optional: true },
      { key: "avatar", label: "Photo / Avatar", kind: "image", optional: true },
      { key: "note", label: "Note", kind: "text", optional: true, more: true },
    ],
  },
  stream: {
    label: "Live Stream",
    description: "Twitch, YouTube or Kick stream with live indicator",
    icon: "TvMinimalPlay",
    search: "channel",
    oembed: { title: "title", subtitle: "channel", cover: "avatar" },
    size: "2x1",
    defaults: { href: "https://twitch.tv/shroud", channel: "shroud", title: "Rank 1 Grind · Season finale", game: "Valorant", isLive: true, viewers: "4.2k watching" },
    fields: [
      { ...href(), label: "Stream link", placeholder: "https://twitch.tv/…" },
      { key: "channel", label: "Channel name", kind: "text" },
      { key: "title", label: "Stream title", kind: "text" },
      { key: "game", label: "Game / Category", kind: "text", optional: true },
      { key: "isLive", label: "Currently live", kind: "checkbox", optional: true },
      { key: "viewers", label: "Viewer count", kind: "text", placeholder: "2.4k watching", optional: true },
      { key: "avatar", label: "Channel avatar", kind: "image", optional: true },
      { key: "schedule", label: "Offline schedule", kind: "text", placeholder: "Next stream Tue 8 PM", optional: true, more: true },
    ],
  },
  listing: {
    label: "Property",
    description: "Real estate or Airbnb listing with price and specs",
    icon: "House",
    size: "2x1",
    placeSearch: "address",
    defaults: { image: "/images/landscape.webp", title: "Sunset Penthouse", price: "$650,000", location: "Vienna, Austria", badge: "For Sale", specs: ["3 Beds", "2 Baths", "145 m²"], href: "https://example.com" },
    fields: [
      { key: "image", label: "Photo", kind: "image" },
      { key: "title", label: "Property title", kind: "text" },
      { key: "price", label: "Price / rate", kind: "text", placeholder: "$485,000 or $180 / night" },
      { key: "location", label: "Location / Address", kind: "text", optional: true, placeholder: "e.g. 124 Main St, Vienna" },
      { key: "mapLink", label: "Google Maps link (or pin)", kind: "url", placeholder: "https://maps.app.goo.gl/… or https://maps.google.com/…", optional: true, help: "Paste a Google Maps share link or pin" },
      { key: "badge", label: "Status badge", kind: "text", placeholder: "For Sale / Open House", optional: true },
      { key: "specs", label: "Specs (beds, baths, area)", kind: "list", optional: true },
      { ...href(true), label: "Listing link", placeholder: "https://…" },
    ],
  },
  promo: {
    label: "Promo Code",
    description: "Brand discount with 1-tap copy and shop link",
    icon: "TicketPercent",
    size: "1x1",
    defaults: { href: "https://example.com", brand: "Gymshark", code: "TILEVUE20", discount: "20% OFF", subtitle: "Orders over $50" },
    fields: [
      { ...href(), label: "Shop link", placeholder: "https://…" },
      { key: "brand", label: "Brand / Store name", kind: "text" },
      { key: "code", label: "Promo code", kind: "text" },
      { key: "discount", label: "Discount", kind: "text", placeholder: "20% OFF" },
      { key: "subtitle", label: "Details / terms", kind: "text", optional: true },
      { key: "logo", label: "Brand logo", kind: "image", optional: true },
    ],
  },
  itinerary: {
    label: "Event Itinerary",
    description: "Timeline schedule for weddings, meetups and parties",
    icon: "CalendarCheck",
    size: "2x1",
    placeSearch: "address",
    defaults: {
      title: "Alex & Maya's Wedding",
      date: "Saturday, June 20",
      place: "The Glasshouse, Vienna",
      rsvpLabel: "RSVP",
      href: "https://example.com",
      steps: [
        { time: "14:00", title: "Ceremony" },
        { time: "16:30", title: "Cocktails" },
        { time: "19:00", title: "Dinner & Party" },
      ],
    },
    fields: [
      { key: "title", label: "Event name", kind: "text" },
      { key: "date", label: "Date", kind: "text", placeholder: "Saturday, June 20" },
      { key: "place", label: "Location / Venue", kind: "text", optional: true, placeholder: "e.g. The Glasshouse, Vienna" },
      { key: "mapLink", label: "Google Maps link (or pin)", kind: "url", placeholder: "https://maps.app.goo.gl/… or https://maps.google.com/…", optional: true, help: "Paste a Google Maps share link or pin" },
      { ...href(true), label: "RSVP link", placeholder: "https://forms.gle/…" },
      { key: "rsvpLabel", label: "RSVP button text", kind: "text", placeholder: "RSVP", optional: true },
      {
        key: "steps",
        label: "Schedule timeline",
        kind: "items",
        fields: [
          { key: "time", label: "Time", kind: "text" },
          { key: "title", label: "What happens", kind: "text" },
          { key: "note", label: "Note", kind: "text", optional: true },
        ],
      },
    ],
  },
  rates: {
    label: "Sponsorship rates",
    description: "Packages and pricing for brand deals and integrations",
    icon: "BadgeDollarSign",
    size: "2x1",
    defaults: {
      title: "Sponsorship Rates",
      subtitle: "Starting rates · Deliverables & usage rights",
      note: "Custom bundles & whitelisting available upon request.",
      packages: [
        { name: "Dedicated Reel / TikTok", price: "$1,800", deliverable: "45s video · 30d usage rights", badge: "Popular" },
        { name: "YouTube 60s Integration", price: "$3,200", deliverable: "Mid-roll integration + pinned comment" },
        { name: "Story Set (3 frames)", price: "$650", deliverable: "3x vertical slides with link sticker" },
      ],
    },
    fields: [
      icon(true),
      { key: "title", label: "Title", kind: "text", keepSample: true },
      { key: "subtitle", label: "Second line", kind: "text", optional: true },
      {
        key: "packages",
        label: "Packages",
        kind: "items",
        fields: [
          { key: "name", label: "Package name", kind: "text" },
          { key: "price", label: "Price / Starting rate", kind: "text" },
          { key: "deliverable", label: "Deliverable details", kind: "text", optional: true },
          { key: "badge", label: "Badge (e.g. Popular)", kind: "text", optional: true },
        ],
      },
      { key: "note", label: "Footer note", kind: "text", optional: true },
      href(true),
    ],
  },
  collab: {
    label: "Collab inquiry",
    description: "Brand partnership and sponsorship request popup form",
    icon: "Handshake",
    size: "1x1",
    defaults: {
      title: "Work with me",
      subtitle: "Brand deals & sponsorships",
      badge: "Open for Q1",
      email: "collabs@example.com",
      minBudget: "$1,000+",
      options: ["Dedicated Reel", "YouTube Integration", "Brand Ambassador", "Gifting"],
    },
    fields: [
      icon(true),
      { key: "title", label: "Title", kind: "text", keepSample: true },
      { key: "subtitle", label: "Second line", kind: "text", optional: true },
      { key: "badge", label: "Status badge", kind: "text", optional: true, placeholder: "Open for Q1" },
      { key: "email", label: "Inquiry email", kind: "email" },
      { key: "minBudget", label: "Minimum budget", kind: "text", optional: true, placeholder: "$1,000+" },
      { key: "options", label: "Campaign types", kind: "list", optional: true, placeholder: "Dedicated Reel, Gifting" },
      href(true),
    ],
  },
  gifting: {
    label: "Gifting & PR box",
    description: "Shipping address and sizing preferences for PR packages",
    icon: "PackageOpen",
    size: "1x1",
    defaults: {
      title: "PR & Gifting",
      subtitle: "Send products for review",
      attention: "Attn: Studio PR",
      address: "123 Creative Studio Blvd, Suite 400, Los Angeles, CA 90028",
      preferences: "Tops: S/M · Shoes: US 8 · Clean beauty & tech only",
      note: "Gifting does not guarantee dedicated coverage.",
    },
    fields: [
      icon(true),
      { key: "title", label: "Title", kind: "text", keepSample: true },
      { key: "subtitle", label: "Second line", kind: "text", optional: true },
      { key: "attention", label: "Attention / Studio", kind: "text", optional: true },
      { key: "address", label: "Shipping address", kind: "textarea" },
      { key: "preferences", label: "Sizes & preferences", kind: "text", optional: true },
      { key: "note", label: "Guidelines / note", kind: "text", optional: true },
    ],
  },
  campaign: {
    label: "Brand case study",
    description: "Campaign performance metrics, ROI and brand testimonial",
    icon: "TrendingUp",
    size: "2x1",
    defaults: {
      brand: "Sézane Paris",
      campaign: "Spring Capsule Collection",
      logo: "/icons/shopify.svg",
      metrics: [
        { value: "4.8M", label: "Total views" },
        { value: "18.2k", label: "Link clicks" },
        { value: "3.4x", label: "Verified ROAS" },
      ],
      quote: "Our top-converting creator campaign of the year.",
      author: "Head of Influencer Marketing",
      href: "https://example.com",
    },
    fields: [
      { key: "brand", label: "Brand name", kind: "text" },
      { key: "campaign", label: "Campaign title", kind: "text" },
      { key: "logo", label: "Brand logo / icon", kind: "image", optional: true },
      {
        key: "metrics",
        label: "Performance metrics",
        kind: "items",
        fields: [
          { key: "value", label: "Stat (e.g. 4.8M)", kind: "text" },
          { key: "label", label: "Metric name", kind: "text" },
        ],
      },
      { key: "quote", label: "Brand testimonial quote", kind: "textarea", optional: true },
      { key: "author", label: "Author / Title", kind: "text", optional: true },
      href(true),
      icon(true),
    ],
  },
} satisfies Record<string, CardMeta>;

export type CardType = keyof typeof CARD_TYPES;
export const CARD_SIZES: CardSize[] = ["1x1", "2x1", "2x2"];

/*
 * Samples (`defaults`) vs. what people write. A new card starts with its settings (icon, size, stars, colours…)
 * but its text, links, photos and lists start empty: the sample is only a hint in the form and fills the preview,
 * and Save asks for the real thing — so no page goes live with "Book title" or example.com on it.
 */
type Values = Record<string, unknown>;
const CONTENT = new Set<Field["kind"]>(["text", "textarea", "url", "email", "image", "media", "list", "items"]);
const isContent = (f: Field) => CONTENT.has(f.kind) && !f.keepSample;
const isEmpty = (v: unknown) => v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);
/** Fields whose sample stands in until filled (preview) and that Save asks for. "More options" ones never block. */
const stands = (f: Field, values: Values) => isContent(f) && !f.optional && !f.hidden && !f.more && !(f.unless && !isEmpty(values[f.unless]));

/** A freshly added card: the type's defaults minus the content fields. */
export function starterCard(type: CardType): Values {
  const meta = CARD_TYPES[type] as CardMeta;
  const content = new Set(meta.fields.filter(isContent).map((f) => f.key));
  return structuredClone(Object.fromEntries(Object.entries(meta.defaults).filter(([k]) => !content.has(k))));
}

/** For the editor's preview only: empty required content filled from the sample (list rows from the sample rows). */
export function withSamples(fields: Field[], samples: Values | undefined, values: Values): { values: Values; sample: boolean } {
  const out = { ...values };
  let sample = false;
  for (const f of fields) {
    const s = samples?.[f.key];
    if (!stands(f, values)) continue;
    const v = out[f.key];
    if (isEmpty(v) && !isEmpty(s)) (out[f.key] = s), (sample = true);
    else if (f.kind === "items" && Array.isArray(v) && Array.isArray(s) && s.length)
      out[f.key] = v.map((row, i) => {
        const r = withSamples(f.fields ?? [], s[i % s.length] as Values, row as Values);
        sample ||= r.sample;
        return r.values;
      });
  }
  return { values: out, sample };
}

/** The first required field still empty that only had a sample (e.g. "Title", "Photo (item 2)"), or null. */
export function missingSample(fields: Field[], samples: Values | undefined, values: Values): string | null {
  for (const f of fields) {
    const s = samples?.[f.key];
    if (!stands(f, values) || isEmpty(s)) continue;
    const v = values[f.key];
    if (isEmpty(v)) return f.label;
    if (f.kind === "items" && Array.isArray(v) && Array.isArray(s))
      for (const [i, row] of v.entries()) {
        const m = missingSample(f.fields ?? [], s[i % s.length] as Values, row as Values);
        if (m) return `${m} (item ${i + 1})`;
      }
  }
  return null;
}

/** Hint text for a field: its own placeholder, else its sample. */
export function sampleHint(field: Field, sample: unknown): string | undefined {
  if (field.placeholder) return field.placeholder;
  if (typeof sample === "string" && !/^(\/|https?:)/.test(sample)) return sample.split("\n")[0];
  if (Array.isArray(sample) && sample.every((x) => typeof x === "string")) return sample.join(", ");
}

/** "Add a card" groups, in menu order. */
export const CATEGORIES = [
  { id: "basics", label: "Basics" },
  { id: "social", label: "Social" },
  { id: "media", label: "Photos & music" },
  { id: "work", label: "Work" },
  { id: "business", label: "Business" },
  { id: "personal", label: "About you" },
  { id: "fun", label: "Fun" },
] as const;
export type Category = (typeof CATEGORIES)[number]["id"];

/** Every card type's group (a Record over CardType, so a new card won't compile without one). */
export const CARD_CATEGORY: Record<CardType, Category> = {
  text: "basics", image: "basics", email: "basics", location: "basics", map: "basics", file: "basics", call: "basics",
  status: "basics", countdown: "basics", tags: "basics", code: "basics",
  link: "social", tweet: "social", feed: "social", activity: "social", newsletter: "social", support: "social",
  music: "media", audio: "media", cover: "media", book: "media", podcast: "media", media: "media", video: "media", gallery: "media", polaroid: "media",
  compare: "media", watch: "media", memory: "media",
  project: "work", website: "work", quote: "work", stats: "work", timeline: "work", skills: "work", certificates: "work",
  press: "work", app: "work", post: "work",
  hours: "business", prices: "business", product: "business", item: "business", coupon: "business", rating: "business", slots: "business", booking: "business",
  whatsapp: "basics", wifi: "business", tour: "business", event: "business", schedule: "business", faq: "business",
  mood: "personal", currently: "personal", funfacts: "personal", zodiac: "personal", languages: "personal",
  journey: "personal", pet: "personal", family: "personal", travel: "personal", milestones: "personal",
  birthday: "personal", top: "personal", recipe: "personal", game: "personal", team: "personal", plants: "personal",
  spines: "personal", collection: "personal", dailyquote: "personal", progress: "personal",
  ask: "fun", poll: "fun", guestbook: "fun", reactions: "fun", wishlist: "fun", vcard: "work", stream: "media", listing: "business", promo: "business", itinerary: "business", rates: "business", collab: "business", gifting: "personal", campaign: "work",
};

/**
 * What a tap on the public page opens (components/CardSheet.tsx) — only for cards that hide something.
 * photos = big photo viewer · details = photos + all text + the card's button · list = every entry ·
 * more = full text, only when it's cut off. Not listed = the tap keeps doing what the card does (link, copy…).
 */
export type CardExpand = "photos" | "details" | "list" | "more";
export const CARD_EXPAND: Partial<Record<CardType, CardExpand>> = {
  image: "photos", polaroid: "photos", gallery: "photos", memory: "photos", pet: "photos", feed: "photos",
  item: "details", product: "details", event: "details", project: "details", tour: "details", app: "details", listing: "details", itinerary: "details",
  timeline: "list", certificates: "list", skills: "list", milestones: "list", journey: "list", top: "list",
  languages: "list", funfacts: "list", family: "list", travel: "list", plants: "list", spines: "list", press: "list",
  hours: "list", schedule: "list", slots: "list", rates: "list", campaign: "details",
  text: "more", quote: "more", tweet: "more",
};
