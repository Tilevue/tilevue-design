import { RatesCard, type RatesCardProps } from "./RatesCard";
import { CollabCard, type CollabCardProps } from "./CollabCard";
import { GiftingCard, type GiftingCardProps } from "./GiftingCard";
import { CampaignCard, type CampaignCardProps } from "./CampaignCard";
import type { ComponentType } from "react";
import { MoodCard, type MoodCardProps } from "./MoodCard";
import { CurrentlyCard, type CurrentlyCardProps } from "./CurrentlyCard";
import { FunFactsCard, type FunFactsCardProps } from "./FunFactsCard";
import { ZodiacCard, type ZodiacCardProps } from "./ZodiacCard";
import { LanguagesCard, type LanguagesCardProps } from "./LanguagesCard";
import { JourneyCard, type JourneyCardProps } from "./JourneyCard";
import { PetCard, type PetCardProps } from "./PetCard";
import { FamilyCard, type FamilyCardProps } from "./FamilyCard";
import { TravelCard, type TravelCardProps } from "./TravelCard";
import { MemoryCard, type MemoryCardProps } from "./MemoryCard";
import { MilestonesCard, type MilestonesCardProps } from "./MilestonesCard";
import { BirthdayCard, type BirthdayCardProps } from "./BirthdayCard";
import { TopCard, type TopCardProps } from "./TopCard";
import { RecipeCard, type RecipeCardProps } from "./RecipeCard";
import { GameCard, type GameCardProps } from "./GameCard";
import { TeamCard, type TeamCardProps } from "./TeamCard";
import { PlantsCard, type PlantsCardProps } from "./PlantsCard";
import { SpinesCard, type SpinesCardProps } from "./SpinesCard";
import { AskCard, type AskCardProps } from "./AskCard";
import { PollCard, type PollCardProps } from "./PollCard";
import { GuestbookCard, type GuestbookCardProps } from "./GuestbookCard";
import { ReactionsCard, type ReactionsCardProps } from "./ReactionsCard";
import { WishlistCard, type WishlistCardProps } from "./WishlistCard";
import { DailyQuoteCard, type DailyQuoteCardProps } from "./DailyQuoteCard";
import { VcardCard, type VcardCardProps } from "./VcardCard";
import { StreamCard, type StreamCardProps } from "./StreamCard";
import { ListingCard, type ListingCardProps } from "./ListingCard";
import { PromoCard, type PromoCardProps } from "./PromoCard";
import { ItineraryCard, type ItineraryCardProps } from "./ItineraryCard";
import { MapCard, type MapCardProps } from "./MapCard";
import { ScheduleCard, type ScheduleCardProps } from "./ScheduleCard";
import { AudioCard, type AudioCardProps } from "./AudioCard";
import { WebsiteCard, type WebsiteCardProps } from "./WebsiteCard";
import { FaqCard, type FaqCardProps } from "./FaqCard";
import { CertificatesCard, type CertificatesCardProps } from "./CertificatesCard";
import { PolaroidCard, type PolaroidCardProps } from "./PolaroidCard";
import { ActivityCard, type ActivityCardProps } from "./ActivityCard";
import { CodeCard, type CodeCardProps } from "./CodeCard";
import { CouponCard, type CouponCardProps } from "./CouponCard";
import { RatingCard, type RatingCardProps } from "./RatingCard";
import { SlotsCard, type SlotsCardProps } from "./SlotsCard";
import { BookingCard, type BookingCardProps } from "./BookingCard";
import { CallCard, WhatsAppCard, type CallCardProps, type WhatsAppCardProps } from "./CallCard";
import { WifiCard, type WifiCardProps } from "./WifiCard";
import { TourCard, type TourCardProps } from "./TourCard";
import { CompareCard, type CompareCardProps } from "./CompareCard";
import { ProgressCard, type ProgressCardProps } from "./ProgressCard";
import { SkillsCard, type SkillsCardProps } from "./SkillsCard";
import { PressCard, type PressCardProps } from "./PressCard";
import { FeedCard, type FeedCardProps } from "./FeedCard";
import { AppCard, type AppCardProps } from "./AppCard";
import { CollectionCard, type CollectionCardProps } from "./CollectionCard";
import { CountdownCard, type CountdownCardProps } from "./CountdownCard";
import { EventCard, type EventCardProps } from "./EventCard";
import { HoursCard, type HoursCardProps } from "./HoursCard";
import { PricesCard, type PricesCardProps } from "./PricesCard";
import { ProductCard, type ProductCardProps } from "./ProductCard";
import { SupportCard, type SupportCardProps } from "./SupportCard";
import { TagsCard, type TagsCardProps } from "./TagsCard";
import { TimelineCard, type TimelineCardProps } from "./TimelineCard";
import { VideoCard, type VideoCardProps } from "./VideoCard";
import { FileCard, type FileCardProps } from "./FileCard";
import { GalleryCard, type GalleryCardProps } from "./GalleryCard";
import { QuoteCard, type QuoteCardProps } from "./QuoteCard";
import { StatsCard, type StatsCardProps } from "./StatsCard";
import { StatusCard, type StatusCardProps } from "./StatusCard";
import { CoverCard, type CoverCardProps } from "./CoverCard";
import { BookCard, type BookCardProps } from "./BookCard";
import { PodcastCard, type PodcastCardProps } from "./PodcastCard";
import { EmailCard, type EmailCardProps } from "./EmailCard";
import { ImageCard, type ImageCardProps } from "./ImageCard";
import { ItemCard, type ItemCardProps } from "./ItemCard";
import { LinkCard, type LinkCardProps } from "./LinkCard";
import { LocationCard, type LocationCardProps } from "./LocationCard";
import { MediaCard, type MediaCardProps } from "./MediaCard";
import { MusicCard, type MusicCardProps } from "./MusicCard";
import { NewsletterCard, type NewsletterCardProps } from "./NewsletterCard";
import type { PostCardProps } from "./PostCard";
import { ProjectCard, type ProjectCardProps } from "./ProjectCard";
import { TextCard, type TextCardProps } from "./TextCard";
import { TweetCard, type TweetCardProps } from "./TweetCard";
import { WatchCard, type WatchCardProps } from "./WatchCard";

/** Every card the grid can render. New card type: add it here, in `cardComponents`, and in lib/cardSchema.ts. */
export type CardData =
  | ({ type: "text" } & TextCardProps)
  | ({ type: "image" } & ImageCardProps)
  | ({ type: "link" } & LinkCardProps)
  | ({ type: "email" } & EmailCardProps)
  | ({ type: "location" } & LocationCardProps)
  | ({ type: "newsletter" } & NewsletterCardProps)
  | ({ type: "project" } & ProjectCardProps)
  | ({ type: "media" } & MediaCardProps)
  | ({ type: "watch" } & WatchCardProps)
  | ({ type: "music" } & MusicCardProps)
  | ({ type: "cover" } & CoverCardProps)
  | ({ type: "book" } & BookCardProps)
  | ({ type: "podcast" } & PodcastCardProps)
  | ({ type: "post" } & PostCardProps)
  | ({ type: "tweet" } & TweetCardProps)
  | ({ type: "collection" } & CollectionCardProps)
  | ({ type: "quote" } & QuoteCardProps)
  | ({ type: "stats" } & StatsCardProps)
  | ({ type: "status" } & StatusCardProps)
  | ({ type: "gallery" } & GalleryCardProps)
  | ({ type: "countdown" } & CountdownCardProps)
  | ({ type: "app" } & AppCardProps)
  | ({ type: "file" } & FileCardProps)
  | ({ type: "video" } & VideoCardProps)
  | ({ type: "hours" } & HoursCardProps)
  | ({ type: "prices" } & PricesCardProps)
  | ({ type: "support" } & SupportCardProps)
  | ({ type: "tags" } & TagsCardProps)
  | ({ type: "timeline" } & TimelineCardProps)
  | ({ type: "event" } & EventCardProps)
  | ({ type: "product" } & ProductCardProps)
  | ({ type: "item" } & ItemCardProps)
  | ({ type: "activity" } & ActivityCardProps)
  | ({ type: "code" } & CodeCardProps)
  | ({ type: "coupon" } & CouponCardProps)
  | ({ type: "rating" } & RatingCardProps)
  | ({ type: "slots" } & SlotsCardProps)
  | ({ type: "booking" } & BookingCardProps)
  | ({ type: "call" } & CallCardProps)
  | ({ type: "whatsapp" } & WhatsAppCardProps)
  | ({ type: "wifi" } & WifiCardProps)
  | ({ type: "tour" } & TourCardProps)
  | ({ type: "compare" } & CompareCardProps)
  | ({ type: "progress" } & ProgressCardProps)
  | ({ type: "skills" } & SkillsCardProps)
  | ({ type: "press" } & PressCardProps)
  | ({ type: "feed" } & FeedCardProps)
  | ({ type: "map" } & MapCardProps)
  | ({ type: "schedule" } & ScheduleCardProps)
  | ({ type: "audio" } & AudioCardProps)
  | ({ type: "website" } & WebsiteCardProps)
  | ({ type: "faq" } & FaqCardProps)
  | ({ type: "certificates" } & CertificatesCardProps)
  | ({ type: "polaroid" } & PolaroidCardProps)
  | ({ type: "mood" } & MoodCardProps)
  | ({ type: "currently" } & CurrentlyCardProps)
  | ({ type: "funfacts" } & FunFactsCardProps)
  | ({ type: "zodiac" } & ZodiacCardProps)
  | ({ type: "languages" } & LanguagesCardProps)
  | ({ type: "journey" } & JourneyCardProps)
  | ({ type: "pet" } & PetCardProps)
  | ({ type: "family" } & FamilyCardProps)
  | ({ type: "travel" } & TravelCardProps)
  | ({ type: "memory" } & MemoryCardProps)
  | ({ type: "milestones" } & MilestonesCardProps)
  | ({ type: "birthday" } & BirthdayCardProps)
  | ({ type: "top" } & TopCardProps)
  | ({ type: "recipe" } & RecipeCardProps)
  | ({ type: "game" } & GameCardProps)
  | ({ type: "team" } & TeamCardProps)
  | ({ type: "plants" } & PlantsCardProps)
  | ({ type: "spines" } & SpinesCardProps)
  | ({ type: "ask" } & AskCardProps)
  | ({ type: "poll" } & PollCardProps)
  | ({ type: "guestbook" } & GuestbookCardProps)
  | ({ type: "reactions" } & ReactionsCardProps)
  | ({ type: "wishlist" } & WishlistCardProps)
  | ({ type: "dailyquote" } & DailyQuoteCardProps)
  | ({ type: "vcard" } & VcardCardProps)
  | ({ type: "stream" } & StreamCardProps)
  | ({ type: "listing" } & ListingCardProps)
  | ({ type: "promo" } & PromoCardProps)
  | ({ type: "itinerary" } & ItineraryCardProps)
  | ({ type: "rates" } & RatesCardProps)
  | ({ type: "collab" } & CollabCardProps)
  | ({ type: "gifting" } & GiftingCardProps)
  | ({ type: "campaign" } & CampaignCardProps);

/**
 * Card components that can render anywhere (server or browser).
 * The blog `post` card reads files on the server, so it's added only in BentoGrid.
 */
export const cardComponents: Record<Exclude<CardData["type"], "post">, ComponentType<any>> = {
  text: TextCard,
  image: ImageCard,
  link: LinkCard,
  email: EmailCard,
  location: LocationCard,
  newsletter: NewsletterCard,
  project: ProjectCard,
  media: MediaCard,
  watch: WatchCard,
  music: MusicCard,
  cover: CoverCard,
  book: BookCard,
  podcast: PodcastCard,
  tweet: TweetCard,
  collection: CollectionCard,
  quote: QuoteCard,
  stats: StatsCard,
  status: StatusCard,
  gallery: GalleryCard,
  countdown: CountdownCard,
  app: AppCard,
  file: FileCard,
  video: VideoCard,
  hours: HoursCard,
  prices: PricesCard,
  support: SupportCard,
  tags: TagsCard,
  timeline: TimelineCard,
  event: EventCard,
  product: ProductCard,
  item: ItemCard,
  activity: ActivityCard,
  code: CodeCard,
  coupon: CouponCard,
  rating: RatingCard,
  slots: SlotsCard,
  booking: BookingCard,
  call: CallCard,
  whatsapp: WhatsAppCard,
  wifi: WifiCard,
  tour: TourCard,
  compare: CompareCard,
  progress: ProgressCard,
  skills: SkillsCard,
  press: PressCard,
  feed: FeedCard,
  map: MapCard,
  schedule: ScheduleCard,
  audio: AudioCard,
  website: WebsiteCard,
  faq: FaqCard,
  certificates: CertificatesCard,
  polaroid: PolaroidCard,
  mood: MoodCard,
  currently: CurrentlyCard,
  funfacts: FunFactsCard,
  zodiac: ZodiacCard,
  languages: LanguagesCard,
  journey: JourneyCard,
  pet: PetCard,
  family: FamilyCard,
  travel: TravelCard,
  memory: MemoryCard,
  milestones: MilestonesCard,
  birthday: BirthdayCard,
  top: TopCard,
  recipe: RecipeCard,
  game: GameCard,
  team: TeamCard,
  plants: PlantsCard,
  spines: SpinesCard,
  ask: AskCard,
  poll: PollCard,
  guestbook: GuestbookCard,
  reactions: ReactionsCard,
  wishlist: WishlistCard,
  dailyquote: DailyQuoteCard,
  vcard: VcardCard,
  stream: StreamCard,
  listing: ListingCard,
  promo: PromoCard,
  itinerary: ItineraryCard,
  rates: RatesCard,
  collab: CollabCard,
  gifting: GiftingCard,
  campaign: CampaignCard,
};
