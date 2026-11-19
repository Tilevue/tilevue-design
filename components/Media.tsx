/** Fills its parent with an image or an autoplaying muted video (picked by file extension). */
export function Media({ src, className = "" }: { src: string; className?: string }) {
  const cls = `absolute inset-0 size-full object-cover ${className}`;
  if (/\.(mp4|webm|mov)$/i.test(src)) {
    return <video src={src} autoPlay muted loop playsInline preload="metadata" className={cls} />;
  }
  return <img src={src} alt="" loading="lazy" className={cls} />;
}
