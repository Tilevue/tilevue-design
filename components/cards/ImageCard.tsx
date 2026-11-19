import Image from "next/image";
import { Card, type BaseCard } from "../Card";

export type ImageCardProps = BaseCard & { src: string; alt?: string; position?: string };

/** Full-bleed photo. `position` maps to CSS object-position (e.g. "center bottom"). */
export function ImageCard({ src, alt = "", position, ...card }: ImageCardProps) {
  const big = card.size && card.size !== "1x1";
  return (
    <Card {...card} hover={card.hover ?? "dim"}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={big ? "(min-width: 768px) 416px, 100vw" : "(min-width: 768px) 200px, 50vw"}
        // Local files are optimized; user URLs / uploads are shown as-is (no host allow-list needed).
        unoptimized={!src.startsWith("/images/")}
        className="object-cover"
        style={{ objectPosition: position }}
      />
    </Card>
  );
}
