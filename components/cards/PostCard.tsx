import type { ReactNode } from "react";
import { Clock, PenLine } from "lucide-react";
import { site } from "@/content/site";
import { findPost, formatDate } from "@/lib/posts";
import { Badge, Card, CardIcon, CardTop, type BaseCard } from "../Card";

export type PostCardProps = Omit<BaseCard, "href"> & {
  slug: string;
  /** Top-left icon (image path or React node). Default: pen. */
  icon?: ReactNode | string;
};

/** Links to a blog post in content/posts.ts — title, date and read time come from the post. */
export function PostCard({ slug, icon = <PenLine strokeWidth={1.75} />, ...card }: PostCardProps) {
  const post = findPost(slug);
  if (!post) return null; // post deleted or mistyped: hide the card rather than break the page
  return (
    <Card {...card} href={`/blog/${slug}`} layout="flex flex-col justify-between p-4">
      <CardTop
        left={<CardIcon icon={icon} />}
        right={
          <Badge>
            <Clock className="size-4" strokeWidth={1.75} /> {post.minutes}
            {site.blog.minutesSuffix}
          </Badge>
        }
      />
      <div className="text-sm">
        <p className="text-muted">{formatDate(post.date)}</p>
        <p>{post.title}</p>
      </div>
    </Card>
  );
}
