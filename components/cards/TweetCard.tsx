import type { ReactNode } from "react";
import { ArrowBigUp, Heart, MessageCircle, ThumbsUp } from "lucide-react";
import { postNetwork } from "@/lib/social";
import { Badge, Card, CardIcon, CardTop, type BaseCard } from "../Card";

export type TweetCardProps = BaseCard & {
  /** Empty = the post site's icon (from the link) */
  icon?: ReactNode | string;
  followers?: string;
  name: string;
  /** Without @. LinkedIn: the headline under the name. */
  handle: string;
  avatar: string;
  verified?: boolean;
  /** Reddit only, without r/ */
  subreddit?: string;
  text: string;
  /** e.g. "10:30 AM · Jul 15, 2025" */
  time: string;
  likes?: string;
  comments?: string;
  /** Text after the handle (X look only). Set to "" to hide. */
  followLabel?: string;
};

/** Pinned post preview, styled like the site the link points to (X, Reddit, Threads, Bluesky, LinkedIn, Mastodon). */
export function TweetCard({
  icon,
  followers,
  name,
  handle,
  avatar,
  verified,
  subreddit,
  text,
  time,
  likes,
  comments,
  followLabel = "Follow",
  ...card
}: TweetCardProps) {
  const { network, icon: siteIcon } = postNetwork(card.href ?? "");
  const reddit = network === "Reddit";
  const Like = reddit ? ArrowBigUp : network === "LinkedIn" ? ThumbsUp : Heart;
  const check = verified && <img src="/icons/verified.svg" alt="Verified" className="size-3.5" />;

  // second line under the name
  const sub =
    network === "LinkedIn" ? handle
    : network === "Threads" ? time
    : <>
        @{handle}
        {network === "X" && followLabel && <> · <span className="text-accent">{followLabel}</span></>}
      </>;

  return (
    <Card {...card} size={card.size ?? "2x1"} layout="flex flex-col justify-between p-2.5 sm:p-3">
      <div className="px-0.5">
        <CardTop left={<CardIcon icon={icon || siteIcon} />} right={followers && <Badge>{followers}</Badge>} />
      </div>
      <div className="flex flex-1 min-h-0 flex-col justify-between gap-1 rounded-xl bg-subtle/7 p-2.5 text-xs transition-colors duration-200 ease-smooth group-hover:bg-subtle/10">
        <div className="flex items-center gap-2">
          <img src={avatar} alt="" className={`${reddit ? "size-6" : "size-7"} rounded-full object-cover shrink-0`} />
          {reddit ? (
            <p className="truncate leading-tight text-[11px]">
              {subreddit && <span className="font-medium text-ink">r/{subreddit} </span>}
              <span className="text-muted">
                {subreddit && "· "}u/{handle} · {time}
              </span>
            </p>
          ) : (
            <div className="min-w-0 leading-tight">
              <p className="flex items-center gap-1 font-medium text-ink text-xs truncate">
                {network === "Threads" ? handle : name} {check}
              </p>
              <p className="truncate text-[10px] text-muted">{sub}</p>
            </div>
          )}
        </div>

        <p className={`line-clamp-3 text-xs leading-[17px] text-ink ${reddit ? "font-medium" : ""}`}>
          {text}
        </p>

        <div className="flex items-center gap-3 pt-0.5 text-[10px] text-muted">
          {!reddit && network !== "Threads" && <span className="truncate">{time}</span>}
          {likes && (
            <span className="flex items-center gap-1 shrink-0">
              <Like className="size-3" /> {likes}
            </span>
          )}
          {comments && (
            <span className="flex items-center gap-1 shrink-0">
              <MessageCircle className="size-3" /> {comments}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
