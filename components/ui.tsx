import type { ComponentProps, ReactNode } from "react";

/** Form controls in the same style as the cards (pill inputs, soft shadows). */

const buttonVariants = {
  primary: "bg-ink text-page hover:opacity-85",
  secondary: "bg-card text-ink shadow-card hover:bg-hover",
  ghost: "text-muted hover:bg-fill hover:text-ink",
  danger: "text-red-500 hover:bg-red-500/10",
};

/** The Button look, for a link that should look like a button: `<Link className={buttonClass("secondary")}>` */
export const buttonClass = (variant: keyof typeof buttonVariants = "primary") =>
  `inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-full px-4 text-sm font-medium whitespace-nowrap transition-[background-color,opacity,scale] duration-200 ease-smooth active:scale-[0.97] disabled:cursor-default disabled:opacity-50 disabled:active:scale-100 pointer-coarse:h-11 ${buttonVariants[variant]}`;

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: keyof typeof buttonVariants }) {
  return <button className={`${buttonClass(variant)} ${className}`} {...props} />;
}

// 16px text on phones: iOS Safari zooms the page into any field smaller than that.
export const inputClass =
  "h-10 w-full min-w-0 bg-fill px-4 text-base text-ink outline-none transition-shadow placeholder:text-subtle focus:ring-2 focus:ring-ink/15 pointer-coarse:h-11 sm:text-sm";

export function Input({ className = "", ...props }: ComponentProps<"input">) {
  return <input className={`${inputClass} rounded-full ${className}`} {...props} />;
}

export function Label({ text, help, children }: { text: string; help?: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="block px-1 text-xs font-medium text-muted">{text}</span>
      {children}
      {help && <span className="block px-1 text-xs text-subtle">{help}</span>}
    </label>
  );
}

/** Centered card-style panel for small pages (sign up, log in). */
export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[400px] rounded-card bg-card p-6 shadow-card ${className}`}>{children}</div>;
}

/** Section heading of our marketing pages (landing, /templates): mono eyebrow, big title, optional line under it. */
export function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-[560px] px-4 text-center">
      <p className="font-mono text-xs font-medium text-subtle uppercase">{eyebrow}</p>
      <h2 className="mt-3 text-[32px] leading-[1.1] font-semibold tracking-[-0.01em] text-balance md:text-[40px]">{title}</h2>
      {text && <p className="mt-3 text-base text-pretty text-muted">{text}</p>}
    </div>
  );
}
