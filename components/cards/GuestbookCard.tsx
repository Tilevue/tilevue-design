"use client";

import { useState, useTransition, type FormEvent } from "react";
import { BookOpenText, Trash2 } from "lucide-react";
import { removeNote, sign } from "@/app/interact";
import type { CardActivity, Note } from "@/lib/store";
import { Badge, Card, CardIcon, CardTop, type BaseCard } from "../Card";
import { TileMark } from "../icons";
import { interacted } from "../MakeYours";
import { Popup } from "../Popup";
import { Button, Input, Label } from "../ui";

export type GuestbookCardProps = Omit<BaseCard, "href"> & {
  title?: string;
  id?: string;
  page?: string;
  activity?: CardActivity;
  /** Page owner viewing their own page: can remove notes */
  canModerate?: boolean;
};

const when = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });

/** Visitors leave a short note. Latest ones show on the card; all of them (and the form) in a popup. */
export function GuestbookCard({ title = "Guestbook", id, page, activity, canModerate, ...card }: GuestbookCardProps) {
  const [notes, setNotes] = useState<Note[]>(activity?.notes ?? []);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card {...card} size={card.size ?? "2x1"} hover={card.hover ?? "bg"} layout="p-0">
        <button onClick={() => setOpen(true)} className="flex size-full cursor-pointer flex-col justify-between p-4 text-left">
          <CardTop
            left={
              <span className="flex items-center gap-2 text-sm">
                <CardIcon icon={<BookOpenText strokeWidth={1.75} />} /> {title}
              </span>
            }
            right={<Badge>{notes.length === 1 ? "1 note" : `${notes.length} notes`}</Badge>}
          />
          <ul className="space-y-1.5 text-sm">
            {notes.slice(0, 2).map((n) => (
              <li key={n.id} className="truncate">
                <span className="text-muted">{n.name}:</span> {n.text}
              </li>
            ))}
            {!notes.length && <li className="text-muted">Be the first to sign ✍️</li>}
          </ul>
          <span className="w-fit rounded-full bg-fill px-3 py-1 text-xs font-medium">Sign the guestbook</span>
        </button>
      </Card>

      <NotesPopup
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        {...{ id, page, notes, setNotes, canModerate }}
        words={{ thanks: "Thanks for signing! ✨", placeholder: "Say something nice…", send: "Sign", sending: "Signing…" }}
      />
    </>
  );
}

/**
 * Popup with the note form + all notes (owner can remove). Shared by the guestbook and birthday wishes — both store
 * in guestbook_notes via `sign` (app/interact.ts). After sending: the "make your own" sheet (MakeYours) once it closes.
 */
export function NotesPopup({
  open, onClose, title, id, page, notes, setNotes, canModerate, words,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  id?: string;
  page?: string;
  notes: Note[];
  setNotes: (n: Note[]) => void;
  canModerate?: boolean;
  words: { thanks: string; placeholder: string; send: string; sending: string };
}) {
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [pending, start] = useTransition();

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (!page || !id) return setError("This works on the published page");
    start(async () => {
      const r = await sign(page, id, String(f.get("name")), String(f.get("text")));
      if (r.ok) {
        setNotes(r.activity.notes);
        setDone(true);
        setError("");
        interacted(); // the "make your own" sheet waits until this popup closes
      } else setError(r.error);
    });
  }

  function remove(noteId: string) {
    if (!page || !id) return;
    start(async () => {
      const r = await removeNote(page, id, noteId);
      if (r.ok) setNotes(r.activity.notes);
    });
  }

  return (
    <Popup open={open} onClose={onClose} title={title} count={notes.length}>
      <div className="space-y-4 p-2">
        {done ? (
          <p className="rounded-2xl bg-fill p-3 text-sm">{words.thanks}</p>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <Label text="Your name">
              <Input name="name" maxLength={24} required />
            </Label>
            <Label text="Message">
              <Input name="text" maxLength={120} required placeholder={words.placeholder} />
            </Label>
            {error && <p className="px-1 text-xs text-red-500">{error}</p>}
            <Button disabled={pending} className="w-full">
              {pending && <TileMark motion="loading" />}
              {pending ? words.sending : words.send}
            </Button>
          </form>
        )}
        <ul className="divide-y divide-ring">
          {notes.map((n) => (
            <li key={n.id} className="flex items-start gap-2 py-2.5 text-sm">
              <span className="flex-1">
                <span className="font-medium">{n.name}</span> <span className="text-xs text-subtle">{when(n.at)}</span>
                <span className="block text-muted">{n.text}</span>
              </span>
              {canModerate && (
                <button onClick={() => remove(n.id)} aria-label="Remove note" className="cursor-pointer p-1 text-subtle hover:text-red-500">
                  <Trash2 className="size-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Popup>
  );
}
