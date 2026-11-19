import {
  AlignLeft, AppWindow, Book, Briefcase, Calendar, Camera, Car, ChartColumn, CircleDot, Code, Coffee, Dumbbell, FileText,
  Film, Gamepad2, Gift, Globe, GraduationCap, Headphones, Heart, House, Image, Images, Leaf, Link, Mail, MapPin, Mic,
  Music, Navigation, Newspaper, Palette, PawPrint, PenLine, Phone, Plane, Plus, Quote, Rocket, Shirt, ShoppingBag,
  Smartphone, Sparkles, Star, Store, Timer, Utensils, Video, Clock, Receipt, Tags, Milestone, CalendarDays, ShoppingCart,
  TvMinimalPlay, Stethoscope, UserRound, Activity, SquareTerminal, TicketPercent, CalendarCheck, Wifi, Ticket, Columns2,
  CircleGauge, ChartNoAxesGantt, Award, LayoutGrid, CalendarRange, AudioLines, CircleHelp, BadgeCheck, MapPinned,
  Smile, BookOpen, Moon, Languages, Users, History, Flag, Cake, Trophy, ChefHat, Shield, Sprout, Library, Vote, SmilePlus, MessageCircleQuestion, BookOpenText, MessageCircle, BadgeDollarSign, Handshake, PackageOpen, TrendingUp, type LucideIcon,
} from "lucide-react";
import type { LucideName } from "@/lib/cardSchema";
import { BRAND_MONO } from "./brandIcons";
import { MaskIcon } from "./MaskIcon";

// Explicit map (not `import *`) so only these icons ship to the browser.
const LUCIDE: Record<LucideName, LucideIcon> = {
  AlignLeft, AppWindow, Book, Briefcase, Calendar, Camera, Car, ChartColumn, CircleDot, Code, Coffee, Dumbbell, FileText,
  Film, Gamepad2, Gift, Globe, GraduationCap, Headphones, Heart, House, Image, Images, Leaf, Link, Mail, MapPin, Mic,
  Music, Navigation, Newspaper, Palette, PawPrint, PenLine, Phone, Plane, Plus, Quote, Rocket, Shirt, ShoppingBag,
  Smartphone, Sparkles, Star, Store, Timer, Utensils, Video, Clock, Receipt, Tags, Milestone, CalendarDays, ShoppingCart,
  TvMinimalPlay, Stethoscope, UserRound, Activity, SquareTerminal, TicketPercent, CalendarCheck, Wifi, Ticket, Columns2,
  CircleGauge, ChartNoAxesGantt, Award, LayoutGrid, CalendarRange, AudioLines, CircleHelp, BadgeCheck, MapPinned,
  Smile, BookOpen, Moon, Languages, Users, History, Flag, Cake, Trophy, ChefHat, Shield, Sprout, Library, Vote, SmilePlus, MessageCircleQuestion, BookOpenText, MessageCircle,
  BadgeDollarSign, Handshake, PackageOpen, TrendingUp,
};

/**
 * Renders a stored icon string (the value saved in a card's / social's `icon` field):
 *   "lucide:Heart"            → lucide line icon, tinted muted grey (looks restyle it via `svg.lucide`)
 *   "mask:/icons/x-card.svg"  → one-colour logo tinted with the text colour (follows every look by itself)
 *   "/icons/instagram.svg"    → the brand's full-colour image (`.icon-color`). If the logo is in BRAND_MONO, a
 *                               one-colour version (`.icon-mono`, simple-icons) is drawn right after it; the
 *                               standard page hides it, looks show it instead of the image (looks/base.css).
 */
export function StoredIcon({ value, className = "size-5" }: { value: string; className?: string }) {
  if (value.startsWith("lucide:")) {
    const Icon = LUCIDE[value.slice(7) as LucideName];
    return Icon ? <Icon className={`${className} text-muted`} strokeWidth={1.75} /> : null;
  }
  if (value.startsWith("mask:")) return <MaskIcon src={value.slice(5)} className={`${className} text-ink`} />;
  const mono = BRAND_MONO[value];
  if (!mono) return <img src={value} alt="" className={className} />;
  return (
    <>
      <img src={value} alt="" className={`icon-color ${className}`} />
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={`icon-mono ${className}`}>
        <path d={mono.path} />
      </svg>
    </>
  );
}

/** Lucide icon by name, for UI (menus, editor). */
export function UiIcon({ name, className = "size-4" }: { name: LucideName; className?: string }) {
  const Icon = LUCIDE[name];
  return <Icon className={className} strokeWidth={1.75} />;
}

/** The Tilevue mark (public/brand/tilevue-mark.svg): orange circle = you, tiles in the current text colour. */
/** `motion` = the brand kit's logo animations (app/globals.css → "Logo motion"). */
export function TileMark({ className = "size-4", motion }: { className?: string; motion?: "build" | "hello" | "loading" | "live" | "loop" }) {
  return (
    <svg viewBox="0 0 256 256" aria-hidden className={`overflow-visible ${motion ? `tv-${motion}` : ""} ${className}`} fill="currentColor">
      <circle cx="68" cy="68" r="49" className="tv-dot fill-brand" />
      <rect x="140" y="20" width="96" height="96" rx="24" className="tv-tile" />
      <rect x="20" y="140" width="216" height="96" rx="24" className="tv-wide" />
    </svg>
  );
}
