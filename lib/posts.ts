/** Stand-in for the app's blog: there are no posts here, so the post card shows its empty state. */
export type Post = { slug: string; title: string; date: string; description?: string; words: number; minutes: number };

export function findPost(_slug: string): Post | null {
  return null;
}

export function formatDate(iso: string): string {
  return iso ? new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" }) : "";
}
