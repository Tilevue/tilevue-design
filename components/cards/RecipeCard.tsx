"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { Card, CardText, type BaseCard } from "../Card";
import { Popup } from "../Popup";

export type RecipeCardProps = Omit<BaseCard, "href"> & {
  image: string;
  name: string;
  /** e.g. "25 min" */
  time?: string;
  /** e.g. "Easy" */
  level?: string;
  ingredients: string[];
  /** One step per line */
  steps?: string;
};

/** A favourite recipe: photo + name on the card, ingredients and steps in a popup. */
export function RecipeCard({ image, name, time, level, ingredients, steps = "", ...card }: RecipeCardProps) {
  const [open, setOpen] = useState(false);
  const meta = [time, level].filter(Boolean).join(" · ");
  return (
    <>
      <Card {...card} hover={card.hover ?? "bg"} layout="p-0">
        <button onClick={() => setOpen(true)} className="flex size-full cursor-pointer flex-col gap-3 p-2 text-left">
          <span className="relative block min-h-0 flex-1 overflow-hidden rounded-2xl">
            <img src={image} alt="" loading="lazy" className="size-full object-cover transition-transform duration-500 ease-spring group-hover:scale-105" />
            {time && (
              <span className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 text-xs font-medium text-white backdrop-blur">
                <Clock className="size-3" /> {time}
              </span>
            )}
          </span>
          <CardText title={name} subtitle={meta ? `Recipe · ${meta}` : "Recipe"} className="px-2 pb-2" />
        </button>
      </Card>

      <Popup open={open} onClose={() => setOpen(false)} title={name}>
        <div className="space-y-4 p-2 text-sm">
          {meta && <p className="text-muted">{meta}</p>}
          <div>
            <p className="mb-2 font-medium">Ingredients</p>
            <ul className="space-y-1">
              {ingredients.map((x, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-subtle">•</span> {x}
                </li>
              ))}
            </ul>
          </div>
          {steps.trim() && (
            <div>
              <p className="mb-2 font-medium">Steps</p>
              <ol className="space-y-2">
                {steps
                  .split("\n")
                  .filter((l) => l.trim())
                  .map((l, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-fill text-xs tabular-nums">{i + 1}</span>
                      <span className="text-muted">{l.trim()}</span>
                    </li>
                  ))}
              </ol>
            </div>
          )}
        </div>
      </Popup>
    </>
  );
}
