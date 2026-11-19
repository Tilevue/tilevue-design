/**
 * Single-colour SVG tinted with the current text colour, so it flips white in dark mode.
 * Use for black logos: `icon: <MaskIcon src="/icons/x-card.svg" />`
 */
export function MaskIcon({ src, className = "size-5" }: { src: string; className?: string }) {
  return (
    <span
      className={`block shrink-0 bg-current ${className}`}
      style={{ mask: `url(${src}) center / contain no-repeat`, WebkitMask: `url(${src}) center / contain no-repeat` }}
    />
  );
}
