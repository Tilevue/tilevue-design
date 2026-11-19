/** Stand-in for the app's database module: just the types the interactive cards use. */
export type Note = { id: string; name: string; text: string; at: string };
export type CardActivity = { counts: Record<string, number>; notes: Note[] };
