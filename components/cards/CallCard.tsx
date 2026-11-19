import { MessageSquareText, Phone } from "lucide-react";
import { Arrow, Card, CardText, CardTop, type BaseCard } from "../Card";
import { MaskIcon } from "../MaskIcon";

export type CallCardProps = Omit<BaseCard, "href"> & {
  /** e.g. "+43 1 234 5678" */
  phone: string;
  /** "call" opens the phone app, "sms" a text message. "whatsapp" = pages saved before the WhatsApp card existed. */
  mode?: "call" | "whatsapp" | "sms";
  title: string;
};

export type WhatsAppCardProps = Omit<BaseCard, "href"> & {
  phone: string;
  /** Typed into the chat for the visitor (optional) */
  message?: string;
  title: string;
};

const digits = (p: string) => p.replace(/[^\d+]/g, "");

/** Phone card: big green button that calls (or texts) the number. */
export function CallCard({ phone, mode = "call", title, ...card }: CallCardProps) {
  if (mode === "whatsapp") return <WhatsAppCard phone={phone} title={title} {...card} />;
  const Icon = mode === "sms" ? MessageSquareText : Phone;
  return (
    <ContactCard {...card} href={`${mode === "sms" ? "sms" : "tel"}:${digits(phone)}`} title={title} phone={phone} badge="bg-emerald-500">
      <Icon className="size-5" strokeWidth={2} />
    </ContactCard>
  );
}

/** WhatsApp card: opens a chat with the number, with the owner's first message already typed. */
export function WhatsAppCard({ phone, message, title, ...card }: WhatsAppCardProps) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return (
    <ContactCard {...card} href={`https://wa.me/${digits(phone).replace("+", "")}${text}`} newTab title={title} phone={phone} badge="bg-whatsapp">
      <MaskIcon src="/icons/whatsapp.svg" className="size-5" />
    </ContactCard>
  );
}

function ContactCard({
  phone,
  title,
  badge,
  children,
  ...card
}: Omit<BaseCard, "href"> & { href: string; newTab?: boolean; phone: string; title: string; badge: string; children: React.ReactNode }) {
  return (
    <Card {...card} layout="flex flex-col justify-between p-4">
      <CardTop
        left={
          <span className={`flex size-10 items-center justify-center rounded-full text-white shadow-card transition-transform duration-300 ease-spring group-hover:scale-110 ${badge}`}>
            {children}
          </span>
        }
        right={<Arrow />}
      />
      <CardText title={title} subtitle={<span className="tabular-nums">{phone}</span>} />
    </Card>
  );
}
