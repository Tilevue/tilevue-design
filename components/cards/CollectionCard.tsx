"use client";

import { useState, type ReactNode } from "react";
import { Arrow, Card, CardIcon, CardText, CardTop, type BaseCard } from "../Card";
import { Popup, PopupList, type PopupItem } from "../Popup";

export type CollectionCardProps = Omit<BaseCard, "href"> & {
  icon: ReactNode | string;
  title: string;
  /** Popup heading, if different from the card title (e.g. "Carry") */
  popupTitle?: string;
  /** Noun for the count, e.g. "accessories" → "5 accessories" */
  noun: string;
  items: PopupItem[];
  /** Image peeking out at the bottom-right */
  preview?: string;
  /** Where the preview sits (preset). */
  previewStyle?: keyof typeof previewStyles;
  /** Tailwind classes to position the preview image (overrides previewStyle; code only, not saved from the editor) */
  previewClass?: string;
};

const previewStyles = {
  wide: "left-[33%] top-[42.5%] w-full",
  right: "left-[51.5%] top-[52.5%] w-[94.5%]",
  tall: "left-[41%] top-[52%] w-[67%]",
  logo: "right-[10%] bottom-[10%] w-[42%]",
  camera: "right-2.5 bottom-2.5 w-[58%] h-[58%] object-contain drop-shadow-xl select-none pointer-events-none",
};

/** Card that opens a list (gear, books, tools…) in a popup. */
export function CollectionCard({
  icon,
  title,
  popupTitle = title,
  noun,
  items,
  preview,
  previewStyle = "wide",
  previewClass,
  ...card
}: CollectionCardProps) {
  const [open, setOpen] = useState(false);
  const resolvedClass = previewClass || (previewStyle && previewStyles[previewStyle]) || previewStyles.wide;

  return (
    <>
      <Card {...card} hover={card.hover ?? "bg"} layout="cursor-pointer p-0">
        <button onClick={() => setOpen(true)} className="flex size-full cursor-pointer flex-col p-4 text-left">
          <CardTop left={<CardIcon icon={icon} />} right={<Arrow />} />
          <CardText title={title} subtitle={`${items.length} ${noun}`} className="mt-5" />
          {preview && <img src={preview} alt="" className={`absolute max-w-none transition-transform duration-300 ease-spring group-hover:-translate-y-0.5 ${resolvedClass}`} />}
        </button>
      </Card>

      <Popup open={open} onClose={() => setOpen(false)} title={popupTitle} count={items.length}>
        <PopupList items={items} />
      </Popup>
    </>
  );
}
