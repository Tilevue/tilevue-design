import type { ReactNode } from "react";
import { Navigation } from "lucide-react";
import { Card, CardIcon, CardText, CardTop, type BaseCard } from "../Card";
import { Globe, type GlobeOptions } from "../Globe";

export type LocationCardProps = BaseCard & {
  place: string;
  /** e.g. "19° Overcast" */
  detail?: string;
  flag?: string;
  /** [latitude, longitude] the globe faces */
  coords: [number, number];
  /** Top-left icon (image path or React node). Default: navigation arrow. */
  icon?: ReactNode | string;
  /** Globe look (colours, speed…), or `false` to hide it. */
  globe?: GlobeOptions | false;
};

export function LocationCard({
  place,
  detail,
  flag,
  coords,
  icon = <Navigation strokeWidth={1.75} className="-scale-x-100" />,
  globe = {},
  ...card
}: LocationCardProps) {
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop left={<CardIcon icon={icon} />} right={flag && <img src={flag} alt="" className="size-5" />} />
      {globe && <Globe coords={coords} {...globe} className="absolute top-[22%] left-[2%] w-[135%]" />}
      <CardText title={place} subtitle={detail} />
    </Card>
  );
}
