import { Card, CardText, type BaseCard } from "../Card";

export type ProductCardProps = BaseCard & {
  /** Cut-out product photo works best (transparent PNG / plain background) */
  image: string;
  name: string;
  price: string;
  /** Second line, e.g. "Handmade · Free shipping" */
  subtitle?: string;
};

/** A product with its price. The photo lifts on hover, like the collection previews. */
export function ProductCard({ image, name, price, subtitle, ...card }: ProductCardProps) {
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <span className="relative z-10 self-end rounded-full bg-fill px-2.5 py-1 text-xs font-semibold tabular-nums">{price}</span>
      <img
        src={image}
        alt=""
        loading="lazy"
        className="absolute inset-x-[15%] top-[12%] h-[52%] w-[70%] object-contain transition-transform duration-300 ease-spring group-hover:-translate-y-0.5"
      />
      <CardText title={name} subtitle={subtitle} />
    </Card>
  );
}
