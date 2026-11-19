"use server";

import type { CardActivity } from "@/lib/store";

/**
 * Stand-in for the app's visitor actions (poll votes, reactions, guestbook notes). On tilevue.com these are checked
 * and saved on the server. Here they only answer as if it worked, so you can click through the cards' states.
 * Nothing is stored: reload and it's gone.
 */
type Result = { ok: true; activity: CardActivity; mine?: string } | { ok: false; error: string };

const empty = (): CardActivity => ({ counts: {}, notes: [] });

export async function vote(_username: string, _cardId: string, option: string): Promise<Result> {
  return { ok: true, activity: { counts: { [option]: 1 }, notes: [] }, mine: option };
}

export async function react(_username: string, _cardId: string, emoji: string): Promise<Result> {
  return { ok: true, activity: { counts: { [emoji]: 1 }, notes: [] }, mine: emoji };
}

export async function sign(_username: string, _cardId: string, name: string, text: string): Promise<Result> {
  return { ok: true, activity: { counts: {}, notes: [{ id: "local", name, text, at: new Date().toISOString() }] }, mine: "local" };
}

export async function removeNote(_username: string, _cardId: string, _noteId: string): Promise<Result> {
  return { ok: true, activity: empty() };
}
