"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Download, ImageIcon, QrCode, Share2 } from "lucide-react";
import { encode } from "uqr";
import { site } from "@/content/site";
import { Avatar } from "./Header";
import { Button } from "./ui";

/**
 * Public page avatar: tap it → the photo big in a circle (initials when there's none), like Instagram,
 * with Share and a QR code of the page underneath. Closes on Escape or a tap outside.
 */
export function AvatarPreview({ name, src }: { name: string; src: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [qr, setQr] = useState(false);
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const d = ref.current!;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const show = () => {
    // this page on the public site (not localhost / a preview host), without ?q= or #
    setUrl(site.url.replace(/\/$/, "") + location.pathname);
    setQr(false);
    setOpen(true);
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title: name, url }).catch(() => {}); // closing the share sheet isn't an error
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  // the QR as a PNG, made on the device (nothing is stored on our side)
  const download = () => {
    const a = document.createElement("a");
    a.href = qrPng(url, name);
    a.download = `${location.pathname.split("/").filter(Boolean).pop() || "page"}-qr.png`;
    a.click();
  };

  const big = "size-[min(72vw,320px)]";
  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-label={`Open ${name}'s photo, share and QR code`}
        className="block size-full cursor-pointer rounded-full transition-[scale] duration-200 ease-smooth active:scale-[0.95]"
      >
        <Avatar name={name} src={src} />
      </button>

      <dialog
        ref={ref}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === ref.current && setOpen(false)}
        aria-label={name}
        className="m-auto max-w-none flex-col items-center gap-6 bg-transparent p-4 text-ink open:flex open:animate-fade-up backdrop:bg-page/85"
      >
        {open &&
          (qr ? (
            // black on white so every camera can read it, in light and dark mode alike
            <div className={`${big} rounded-card bg-white p-[9%] text-black shadow-card`}>
              <QrSvg text={url} />
            </div>
          ) : (
            <Avatar name={name} src={src} className={`${big} shadow-card`} textClass="text-7xl" />
          ))}

        <div className="text-center">
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-sm text-muted">{url.replace(/^https?:\/\//, "")}</p>
        </div>

        <div className="flex gap-2">
          <Button onClick={share}>
            {copied ? <Check className="size-4" /> : <Share2 className="size-4" />}
            {copied ? "Link copied" : "Share"}
          </Button>
          {qr && (
            <Button variant="secondary" onClick={download}>
              <Download className="size-4" />
              Download
            </Button>
          )}
          <Button variant="secondary" onClick={() => setQr(!qr)}>
            {qr ? <ImageIcon className="size-4" /> : <QrCode className="size-4" />}
            {qr ? "Photo" : "QR code"}
          </Button>
        </div>
      </dialog>
    </>
  );
}

/** 1080px-wide PNG (data URL): the QR with a white margin, the name and link under it. */
function qrPng(text: string, name: string) {
  const { data, size } = encode(text, { border: 0, ecc: "M" });
  const W = 1080, cell = Math.floor(800 / size), side = cell * size, pad = (W - side) / 2;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = pad + side + 260;
  const g = c.getContext("2d")!;
  // a printed QR is always black on white, whatever the page theme
  g.fillStyle = "white";
  g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = "black";
  data.forEach((row, y) => row.forEach((on, x) => on && g.fillRect(pad + x * cell, pad + y * cell, cell, cell)));
  const font = getComputedStyle(document.body).fontFamily;
  g.textAlign = "center";
  g.font = `600 52px ${font}`;
  g.fillText(name, W / 2, pad + side + 110, W - 80);
  g.fillStyle = "gray";
  g.font = `400 36px ${font}`;
  g.fillText(text.replace(/^https?:\/\//, ""), W / 2, pad + side + 170, W - 80);
  return c.toDataURL("image/png");
}

/** The link as a QR code: one SVG path of 1×1 squares, drawn in the text colour. */
function QrSvg({ text }: { text: string }) {
  const { data, size } = encode(text, { border: 0, ecc: "M" });
  let d = "";
  data.forEach((row, y) => row.forEach((on, x) => on && (d += `M${x} ${y}h1v1h-1z`)));
  return (
    <svg viewBox={`0 0 ${size} ${size}`} shapeRendering="crispEdges" role="img" aria-label={`QR code for ${text}`} className="size-full">
      <path d={d} fill="currentColor" />
    </svg>
  );
}
