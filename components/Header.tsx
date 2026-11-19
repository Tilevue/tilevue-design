import type { CSSProperties, ReactNode } from "react";
import { site } from "@/content/site";
import type { Social } from "@/lib/profile";
import { detect } from "@/lib/social";
import { AvatarPreview } from "./AvatarPreview";
import { Clock } from "./Clock";
import { LookFx } from "./LookFx";
import { MaskIcon } from "./MaskIcon";

export type HeaderProps = {
  name: string;
  /** Empty = initials */
  avatar: string;
  verified?: boolean;
  socials: Social[];
  /** Replaces the avatar (e.g. an upload button in the editor) */
  avatarSlot?: ReactNode;
  /** Short note above the name — only looks that have one draw it (looks/registry.ts lookNote) */
  note?: string;
};

/** Clock, big faded name with avatar on top, and the row of social buttons. */
export function Header({ name, avatar, verified, socials, avatarSlot, note }: HeaderProps) {
  const lines = nameLines(name);
  // Two lines: the avatar sits between them. One line: above the name, only just touching it, so no letter is hidden.
  const oneLine = lines.length === 1;
  return (
    <header
      className="flex flex-col items-center gap-7 pt-14 pb-10"
      // --photo: the avatar as a CSS image, for looks that use it as a backdrop (Glass, looks/glass.css). JSON.stringify
      // = a quoted CSS string, so nothing in the address can end the url().
      style={avatar ? ({ "--photo": `url(${JSON.stringify(avatar)})` } as CSSProperties) : undefined}
    >
      {site.showClock && <Clock timeZone={site.timeZone} />}

      {/* Styling hooks for looks (looks/README.md → "Hooks"): page-identity = photo + name together,
          page-avatar = the photo, page-name = the name (data-note = the look's note), page-socials = the buttons */}
      <div className={`page-identity relative max-w-[calc(100cqw-32px)] ${oneLine ? "flex flex-col items-center" : ""}`}>
        <div
          className={`page-avatar z-10 size-16 ${oneLine ? "relative -mb-3 md:-mb-4" : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}`}
        >
          {avatarSlot ?? <AvatarPreview name={name} src={avatar} />}
          {verified && <img src="/icons/verified.svg" alt="Verified" className="absolute -right-0.5 -bottom-0.5 size-5" />}
        </div>
        <h1
          data-note={note}
          // Shrink long words to fit the screen instead of breaking them (~0.6em per character in Inter semibold).
          style={{ "--fit": Math.max(...lines.map((w) => w.length), 1) * 0.6 } as CSSProperties}
          className="page-name text-center font-sans text-[min(64px,calc((100cqw-32px)/var(--fit)))] leading-[1] font-semibold tracking-[-0.01em] text-ink/15 md:text-[min(80px,calc((100cqw-32px)/var(--fit)))]"
        >
          {lines.map((part, i) => (
            <span key={i} className="block">
              {part}
            </span>
          ))}
        </h1>
      </div>

      {socials.length > 0 && <SocialBar socials={socials} />}
      <LookFx />
    </header>
  );
}

/** "Tobias Leitner" → 2 lines; "Dr. Sara Lind" → "Dr. Sara" / "Lind". */
function nameLines(name: string): string[] {
  const words = name.trim().split(/\s+/);
  return words.length <= 2 ? words : [words.slice(0, -1).join(" "), words.at(-1)!];
}

export function Avatar({
  name,
  src,
  className = "size-full",
  textClass = "text-lg",
}: {
  name: string;
  src: string;
  className?: string;
  /** Initials size (when there's no photo) */
  textClass?: string;
}) {
  if (src) return <img src={src} alt={name} className={`${className} rounded-full object-cover ring-1 ring-ring`} />;
  const initials = name.split(/\s+/).filter((w) => /^[\p{L}\p{N}]/u.test(w)).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <span className={`${className} ${textClass} flex items-center justify-center rounded-full bg-card font-semibold text-muted shadow-card`}>
      {initials || "?"}
    </span>
  );
}

/** "@name" from a profile link (the last path part when the network isn't recognised). */
function handleOf(href: string) {
  const known = detect(href)?.handle;
  if (known) return known;
  try {
    return new URL(href).pathname.split("/").filter(Boolean).pop()?.replace(/^@/, "") ?? "";
  } catch {
    return "";
  }
}

function SocialBar({ socials }: { socials: Social[] }) {
  // two buttons for the same network (personal + brand account) show their @handle so they can be told apart
  const repeated = new Set(socials.filter((s, i) => socials.findIndex((o) => o.icon === s.icon) !== i).map((s) => s.icon));
  return (
    <nav data-card="header" className="page-socials flex max-w-[calc(100cqw-32px)] flex-wrap justify-center gap-1">
      {socials.map((s, i) => {
        const handle = repeated.has(s.icon) ? handleOf(s.href) : "";
        return (
        <a
          key={s.href + i}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={handle ? `${s.name} @${handle}` : s.name}
          className={`flex h-10 items-center justify-center gap-1.5 bg-pill text-subtle transition-colors duration-200 ease-smooth hover:bg-hover-strong hover:text-ink ${handle ? "max-w-44 px-4" : "w-[60px] md:w-[81px]"} ${
            socials.length === 1
              ? "rounded-full"
              : i === 0
                ? "rounded-l-full rounded-r-lg"
                : i === socials.length - 1
                  ? "rounded-l-lg rounded-r-full"
                  : "rounded-lg"
          }`}
        >
          <MaskIcon src={s.icon} />
          {handle && <span className="truncate text-sm">@{handle}</span>}
        </a>
        );
      })}
    </nav>
  );
}
