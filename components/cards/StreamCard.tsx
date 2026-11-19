import { Arrow, Card, CardIcon, CardText, CardTop, Badge, type BaseCard } from "../Card";

export type StreamCardProps = BaseCard & {
  href: string;
  channel: string;
  title: string;
  game?: string;
  isLive?: boolean;
  viewers?: string;
  avatar?: string;
  platform?: "twitch" | "youtube" | "kick";
  schedule?: string;
};

function detectPlatform(href: string, fallback?: string): { name: string; icon: string } {
  const h = href.toLowerCase();
  if (fallback === "twitch" || h.includes("twitch.tv")) return { name: "Twitch", icon: "/icons/twitch.svg" };
  if (fallback === "youtube" || h.includes("youtube.com") || h.includes("youtu.be")) return { name: "YouTube", icon: "/icons/youtube.svg" };
  return { name: "Stream", icon: "lucide:TvMinimalPlay" };
}

/** Live stream card: shows channel, live status dot, stream title, preview image, and game category. */
export function StreamCard({
  href,
  channel,
  title,
  game,
  isLive = false, // unticked "Currently live" is dropped on save (lib/validate.ts skips optional false), so missing = not live
  viewers,
  avatar,
  platform,
  schedule,
  ...card
}: StreamCardProps) {
  const plat = detectPlatform(href, platform);
  const size = card.size ?? "2x1";
  const is2x2 = size === "2x2";
  const is1x1 = size === "1x1";

  // 2x2 tall / square preview (e.g. video / stream thumbnail taking prominent center)
  if (is2x2) {
    return (
      <Card
        {...card}
        href={href}
        size={size}
        layout="flex flex-col justify-between p-4"
      >
        <CardTop
          left={
            <div className="flex items-center gap-2">
              <CardIcon icon={plat.icon} />
              {isLive ? (
                <span className="flex items-center gap-1.5 text-xs font-medium text-red-500">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-40" />
                    <span className="relative inline-flex size-2 rounded-full bg-red-500" />
                  </span>
                  Live
                </span>
              ) : (
                <span className="text-xs text-subtle">{schedule || "Offline"}</span>
              )}
            </div>
          }
          right={
            <div className="flex items-center gap-2">
              {isLive && viewers && <Badge>{viewers}</Badge>}
              <Arrow />
            </div>
          }
        />

        {avatar ? (
          <div className="relative my-auto flex w-full aspect-video items-center justify-center overflow-hidden rounded-2xl bg-fill shadow-card ring-1 ring-ink/10 transition-transform duration-300 ease-smooth group-hover:scale-[1.02]">
            <img src={avatar} alt={title} className="size-full object-cover" />
            {game && (
              <span className="absolute bottom-2.5 left-2.5 rounded-full bg-black/70 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur">
                {game}
              </span>
            )}
          </div>
        ) : game ? (
          <div className="my-auto flex flex-wrap gap-1">
            <span className="rounded-full bg-fill px-2.5 py-1 text-xs text-muted tabular-nums">
              {game}
            </span>
          </div>
        ) : null}

        <CardText
          title={<span className="line-clamp-2 font-semibold leading-snug">{title}</span>}
          subtitle={`${channel} · ${plat.name}`}
        />
      </Card>
    );
  }

  // 1x1 compact tile: always shows the platform icon (YouTube / Twitch) and Live badge at top,
  // with a 2-line clamped title, avatar thumbnail, and generous breathing room.
  if (is1x1) {
    return (
      <Card
        {...card}
        href={href}
        size="1x1"
        layout="flex flex-col justify-between p-4"
      >
        <CardTop
          left={
            <div className="flex items-center gap-2">
              <CardIcon icon={plat.icon} />
              {isLive ? (
                <span className="flex items-center gap-1.5 text-xs font-medium text-red-500">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-40" />
                    <span className="relative inline-flex size-2 rounded-full bg-red-500" />
                  </span>
                  Live
                </span>
              ) : (
                <span className="text-xs text-subtle">{schedule || "Offline"}</span>
              )}
            </div>
          }
          right={<Arrow />}
        />

        {avatar ? (
          <div className="flex items-center gap-2.5">
            <img
              src={avatar}
              alt=""
              className="size-10 shrink-0 rounded-xl object-cover shadow-card ring-1 ring-ink/10 transition-transform duration-200 ease-smooth group-hover:scale-105"
            />
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-xs font-semibold leading-snug text-ink">
                {title}
              </p>
              <p className="mt-0.5 truncate text-[11px] text-muted">
                {channel}
              </p>
            </div>
          </div>
        ) : (
          <div className="min-w-0">
            <p className="line-clamp-2 text-xs font-semibold leading-snug text-ink">
              {title}
            </p>
            <p className="mt-0.5 truncate text-[11px] text-muted">
              {channel} · {plat.name}
            </p>
          </div>
        )}
      </Card>
    );
  }

  // 2x1 wide card (default)
  return (
    <Card
      {...card}
      href={href}
      size={size}
      layout="flex flex-col justify-between p-4"
    >
      <CardTop
        left={
          <div className="flex items-center gap-2">
            <CardIcon icon={plat.icon} />
            {isLive ? (
              <span className="flex items-center gap-1.5 text-xs font-medium text-red-500">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-40" />
                  <span className="relative inline-flex size-2 rounded-full bg-red-500" />
                </span>
                Live
              </span>
            ) : (
              <span className="text-xs text-subtle">{schedule || "Offline"}</span>
            )}
          </div>
        }
        right={
          <div className="flex items-center gap-2">
            {isLive && viewers && <Badge>{viewers}</Badge>}
            <Arrow />
          </div>
        }
      />

      {avatar ? (
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt=""
            className="size-12 shrink-0 rounded-xl object-cover shadow-card ring-1 ring-ink/10 transition-transform duration-200 ease-smooth group-hover:scale-105"
          />
          <div className="min-w-0 flex-1">
            {game && (
              <span className="mb-1 inline-block rounded-full bg-fill px-2 py-0.5 text-[10px] text-muted">
                {game}
              </span>
            )}
            <CardText
              title={<span className="line-clamp-2 font-semibold leading-snug">{title}</span>}
              subtitle={`${channel} · ${plat.name}`}
            />
          </div>
        </div>
      ) : (
        <>
          {game && (
            <div className="my-auto flex flex-wrap gap-1">
              <span className="rounded-full bg-fill px-2.5 py-1 text-xs text-muted tabular-nums">
                {game}
              </span>
            </div>
          )}
          <CardText
            title={<span className="line-clamp-2 font-semibold leading-snug">{title}</span>}
            subtitle={`${channel} · ${plat.name}`}
          />
        </>
      )}
    </Card>
  );
}
