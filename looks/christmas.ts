/**
 * Christmas look — the parts CSS can't do (looks/README.md → "Script"). Loaded by components/LookFx.tsx only when
 * the page's look is "christmas", never in previews.
 *
 * - The bells (`BELLS`, drawn by LookFx as a button): tap → `ring()` = a strong swing (christmas.css `.ring`) and a
 *   soft chime made with Web Audio, no sound file.
 * - `start(main)`: snow on one canvas behind the content, instead of the CSS snow. The pointer pushes flakes away
 *   and drags them along; flakes crossing a card's top edge sometimes settle on it, and the pile grows; the pointer
 *   sweeps a pile off in a spray. Off under reduced motion (the still CSS snow stays).
 */

/** The bells drawing (same as the CSS fallback in christmas.css), animated by `.xmas-l` / `.xmas-r` / `.xmas-cl`. */
export const BELLS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 164 128"><defs><linearGradient id="xb-gold" x1="0" x2="1"><stop offset="0" stop-color="#6e4810"/><stop offset=".22" stop-color="#d9a53e"/><stop offset=".38" stop-color="#fff0b6"/><stop offset=".55" stop-color="#e4b04a"/><stop offset=".8" stop-color="#a87422"/><stop offset="1" stop-color="#5e3d0c"/></linearGradient><radialGradient id="xb-gold2" cx=".35" cy=".35"><stop offset="0" stop-color="#fff0b6"/><stop offset="1" stop-color="#8a5c14"/></radialGradient><linearGradient id="xb-rim" x1="0" x2="1"><stop offset="0" stop-color="#5e3d0c"/><stop offset=".4" stop-color="#f3cd6e"/><stop offset="1" stop-color="#5e3d0c"/></linearGradient><linearGradient id="xb-vel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e0262f"/><stop offset="1" stop-color="#7c0c14"/></linearGradient><radialGradient id="xb-ber" cx=".35" cy=".3"><stop offset="0" stop-color="#ff8a80"/><stop offset=".4" stop-color="#d81b26"/><stop offset="1" stop-color="#6e0a10"/></radialGradient><linearGradient id="xb-hol" x1="0" x2="1"><stop offset="0" stop-color="#0f3d22"/><stop offset=".5" stop-color="#2f7d47"/><stop offset="1" stop-color="#14502c"/></linearGradient></defs><path d="M80 0V44M84 0V44" stroke="url(#xb-vel)" stroke-width="4"/><g class="xmas-l"><path d="M0 6V0" stroke="#7a5212" stroke-width="2.4"/><path d="M0 4C-11 4-15.5 15-16.5 29C-17.5 41-21 49-27 54H27C21 49 17.5 41 16.5 29C15.5 15 11 4 0 4Z" fill="url(#xb-gold)"/><path d="M-20.5 46H20.5" stroke="#8a5c14" stroke-opacity=".6" stroke-width="1.4"/><path d="M-18 41H18" stroke="#fff3c4" stroke-opacity=".45" stroke-width=".9"/><path d="M-6.5 10C-10 16-11 26-11.5 36" stroke="#fffbe6" stroke-opacity=".7" stroke-width="2.2" fill="none" stroke-linecap="round"/><g class="xmas-cl"><path d="M0 40V58" stroke="#5a3c0e" stroke-width="2"/><circle cx="0" cy="59" r="5" fill="url(#xb-gold2)"/></g><ellipse cx="0" cy="54" rx="27" ry="4.6" fill="url(#xb-rim)"/></g><g class="xmas-r"><path d="M0 6V0" stroke="#7a5212" stroke-width="2.4"/><path d="M0 4C-11 4-15.5 15-16.5 29C-17.5 41-21 49-27 54H27C21 49 17.5 41 16.5 29C15.5 15 11 4 0 4Z" fill="url(#xb-gold)"/><path d="M-20.5 46H20.5" stroke="#8a5c14" stroke-opacity=".6" stroke-width="1.4"/><path d="M-18 41H18" stroke="#fff3c4" stroke-opacity=".45" stroke-width=".9"/><path d="M-6.5 10C-10 16-11 26-11.5 36" stroke="#fffbe6" stroke-opacity=".7" stroke-width="2.2" fill="none" stroke-linecap="round"/><g class="xmas-cl"><path d="M0 40V58" stroke="#5a3c0e" stroke-width="2"/><circle cx="0" cy="59" r="5" fill="url(#xb-gold2)"/></g><ellipse cx="0" cy="54" rx="27" ry="4.6" fill="url(#xb-rim)"/></g><path d="M82 46C70 34 56 32 54 40C52 48 66 52 82 46Z" fill="url(#xb-vel)"/><path d="M82 46C94 34 108 32 110 40C112 48 98 52 82 46Z" fill="url(#xb-vel)"/><path d="M58 40C62 38 70 40 78 45" stroke="#ff6b6b" stroke-opacity=".5" stroke-width="1.2" fill="none"/><path d="M106 40C102 38 94 40 86 45" stroke="#ff6b6b" stroke-opacity=".5" stroke-width="1.2" fill="none"/><g transform="translate(80 46) rotate(200)"><path d="M0 0C4-5 8-3 11-6C12-3 15-2 18-4C18-1 21 1 24 0C21 3 22 6 18 8C17 5 14 6 11 7C9 9 6 8 4 9C3 5 1 3 0 0Z" fill="url(#xb-hol)"/></g><g transform="translate(84 46) rotate(-20)"><path d="M0 0C4-5 8-3 11-6C12-3 15-2 18-4C18-1 21 1 24 0C21 3 22 6 18 8C17 5 14 6 11 7C9 9 6 8 4 9C3 5 1 3 0 0Z" fill="url(#xb-hol)"/></g><g transform="translate(82 47) rotate(250) scale(.8)"><path d="M0 0C4-5 8-3 11-6C12-3 15-2 18-4C18-1 21 1 24 0C21 3 22 6 18 8C17 5 14 6 11 7C9 9 6 8 4 9C3 5 1 3 0 0Z" fill="url(#xb-hol)"/></g><ellipse cx="82" cy="46" rx="6" ry="5.5" fill="#9c1018"/><circle cx="77" cy="49" r="4" fill="url(#xb-ber)"/><circle cx="86" cy="50" r="4" fill="url(#xb-ber)"/><circle cx="82" cy="43" r="4" fill="url(#xb-ber)"/></svg>`;

let audio: AudioContext | undefined;

/** Ring the bells: restart the swing, play the chime. */
export function ring(button: HTMLElement) {
  button.classList.remove("ring");
  void button.offsetWidth; // restart the animation on every tap
  button.classList.add("ring");
  // back to the idle ringing once the swing ends (a new tap cancels the old swing, which never "ends")
  const done = (e: AnimationEvent) => {
    if (e.animationName !== "christmas-ring-l") return;
    button.classList.remove("ring");
    button.removeEventListener("animationend", done);
  };
  button.addEventListener("animationend", done);
  try {
    audio ??= new AudioContext();
    const t = audio.currentTime;
    const out = audio.createGain();
    out.gain.value = 0.12;
    out.connect(audio.destination);
    // two small bells a third apart (E6, G6); partials of a struck bell, the high ones die first
    for (const [base, at] of [[1318.5, 0], [1568, 0.11]])
      for (const [ratio, amp, decay] of [[1, 1, 1.8], [2.76, 0.45, 0.8], [5.4, 0.22, 0.4], [8.93, 0.1, 0.22]]) {
        const osc = audio.createOscillator();
        const env = audio.createGain();
        osc.frequency.value = base * ratio;
        env.gain.setValueAtTime(0, t + at);
        env.gain.linearRampToValueAtTime(amp, t + at + 0.004);
        env.gain.exponentialRampToValueAtTime(0.0001, t + at + decay);
        osc.connect(env).connect(out);
        osc.start(t + at);
        osc.stop(t + at + decay + 0.05);
      }
  } catch {
    // no audio (old browser, blocked): the swing alone is fine
  }
}

type Flake = { x: number; y: number; vx: number; vy: number; r: number; o: number; z: number; ph: number };
type Spray = { x: number; y: number; vx: number; vy: number; r: number; life: number };
type Pile = { h: Float32Array; width: number; left: number; top: number };

const COL = 3; // px per column of a pile
const MAX_H = 18; // tallest pile, px
const CORNER = 14; // px kept clear at each end of a card's top (its corners are rounded, --radius-card 22px)
const LAND = 0.35; // chance a flake crossing a card's top edge settles there (the rest fall in front / behind)

/** Start the snow on this page wrapper. Returns the stop function. */
export function start(main: HTMLElement): () => void {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  const canvas = document.createElement("canvas");
  canvas.className = "xmas-snow";
  canvas.setAttribute("aria-hidden", "true");
  main.insertBefore(canvas, main.firstChild); // (not prepend: the Workers types redefine Element.prepend)
  main.dataset.snow = "";
  const ctx = canvas.getContext("2d")!;

  // a soft round flake, drawn once and stamped
  const sprite = document.createElement("canvas");
  sprite.width = sprite.height = 32;
  const s = sprite.getContext("2d")!;
  const g = s.createRadialGradient(16, 16, 0, 16, 16, 16);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.4, "rgba(255,255,255,.85)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  s.fillStyle = g;
  s.fillRect(0, 0, 32, 32);

  let W = 0, H = 0;
  const flakes: Flake[] = [];
  const spray: Spray[] = [];
  const piles = new Map<Element, Pile>();
  const newFlake = (f: Partial<Flake> = {}): Flake => {
    const z = Math.random();
    return { x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 20 + z * 55, r: 0.8 + z * z * 3.4, o: 0.35 + z * 0.5, z, ph: Math.random() * 7, ...f };
  };
  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    W = innerWidth;
    H = innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // ponytail: flake count by screen area, capped; lower the cap if old phones stutter
    const want = Math.min(260, Math.round((W * H) / 5000));
    while (flakes.length < want) flakes.push(newFlake());
    flakes.length = want;
  }
  resize();
  addEventListener("resize", resize);

  // the pointer: position, velocity, when it last moved
  const p = { x: -1e4, y: -1e4, vx: 0, vy: 0, t: 0 };
  const move = (e: PointerEvent) => {
    const now = performance.now();
    const dt = Math.max(8, now - p.t) / 1000;
    if (now - p.t < 100) {
      p.vx = p.vx * 0.5 + ((e.clientX - p.x) / dt) * 0.5;
      p.vy = p.vy * 0.5 + ((e.clientY - p.y) / dt) * 0.5;
    } else p.vx = p.vy = 0;
    p.x = e.clientX;
    p.y = e.clientY;
    p.t = now;
  };
  const leave = () => (p.x = p.y = -1e4);
  addEventListener("pointermove", move, { passive: true });
  document.addEventListener("pointerleave", leave);

  // cards: re-listed now and then (the editor adds and removes them); a pile keeps its snow while its card lives
  let cards: Element[] = [];
  const listCards = () => {
    cards = [...main.querySelectorAll(".bento > .card, .bento > * > .card")];
    for (const el of piles.keys()) if (!el.isConnected) piles.delete(el);
  };

  function deposit(pl: Pile, x: number, r: number) {
    const n = pl.h.length, c = Math.floor(x / COL);
    // a soft round lump
    for (let k = -4; k <= 4; k++) {
      const i = c + k;
      if (i < 0 || i >= n) continue;
      // thinner towards the rounded corners, so the pile slopes off the edges
      const edge = Math.min(i, n - 1 - i) * COL;
      pl.h[i] = Math.min(pl.h[i] + r * 0.75 * Math.exp(-(k * k) / 5), MAX_H, edge * 0.5);
    }
    // too steep → it slides to the side
    for (let pass = 0; pass < 3; pass++)
      for (let i = Math.max(0, c - 14); i < Math.min(n - 1, c + 14); i++) {
        const d = pl.h[i] - pl.h[i + 1];
        if (Math.abs(d) > 0.8) {
          const m = (Math.abs(d) - 0.8) / 2;
          pl.h[i] -= Math.sign(d) * m;
          pl.h[i + 1] += Math.sign(d) * m;
        }
      }
  }

  let frame = 0, last = performance.now(), raf = 0;
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (frame++ % 60 === 0) listCards();

    // where the cards are this frame (scrolling moves them; the snow canvas stays put)
    const visible: Pile[] = [];
    for (const el of cards) {
      const r = el.getBoundingClientRect();
      if (r.width < 40 || r.bottom < -40 || r.top > H + 40) continue;
      let pl = piles.get(el);
      // snow rests on the flat part of the top only, not out over the rounded corners
      const width = Math.round(r.width - 2 * CORNER);
      if (!pl || pl.width !== width) piles.set(el, (pl = { h: new Float32Array(Math.ceil(width / COL)), width, left: 0, top: 0 }));
      pl.left = r.left + CORNER;
      pl.top = r.top;
      visible.push(pl);
    }

    const active = now - p.t < 600;
    const speed = Math.hypot(p.vx, p.vy);

    // the pointer sweeps snow off the piles it brushes
    if (active && speed > 60)
      for (const pl of visible) {
        const cx = p.x - pl.left;
        if (cx < -20 || cx > pl.width + 20) continue;
        const c0 = Math.max(0, Math.floor((cx - 22) / COL)), c1 = Math.min(pl.h.length - 1, Math.ceil((cx + 22) / COL));
        for (let i = c0; i <= c1; i++) {
          const top = pl.top - pl.h[i];
          if (pl.h[i] < 0.3 || Math.abs(p.y - top) > 24) continue;
          const take = Math.min(pl.h[i], (1 - Math.abs(i * COL - cx) / 24) * speed * dt * 0.12);
          if (take <= 0) continue;
          pl.h[i] -= take;
          if (spray.length < 160 && Math.random() < take * 0.9)
            spray.push({ x: pl.left + i * COL, y: top, vx: p.vx * 0.35 + (Math.random() - 0.5) * 60, vy: p.vy * 0.25 - 60 - Math.random() * 120, r: 1 + Math.random() * 2, life: 1.6 });
        }
      }

    ctx.clearRect(0, 0, W, H);

    // falling snow
    for (const f of flakes) {
      const fall = 20 + f.z * 55;
      const sway = Math.sin(now / 1600 + f.ph) * 14 * (0.4 + f.z);
      f.vx += (sway - f.vx) * dt * 1.5;
      f.vy += (fall - f.vy) * dt * 1.2;
      if (active) {
        const dx = f.x - p.x, dy = f.y - p.y, d = Math.hypot(dx, dy), R = 70 + f.z * 60;
        if (d < R && d > 0.1) {
          const k = 1 - d / R;
          f.vx += (dx / d) * k * 1400 * dt + p.vx * k * 0.06;
          f.vy += (dy / d) * k * 1400 * dt + p.vy * k * 0.06;
        }
      }
      const py = f.y;
      f.x += f.vx * dt;
      f.y += f.vy * dt;
      // near flakes can settle on a card they cross
      if (f.z > 0.3 && f.vy > 0)
        for (const pl of visible) {
          const cx = f.x - pl.left;
          if (cx < 0 || cx >= pl.width) continue;
          const surface = pl.top - pl.h[Math.floor(cx / COL)];
          if (py < surface && f.y >= surface) {
            if (Math.random() < LAND) {
              deposit(pl, cx, f.r);
              Object.assign(f, newFlake({ y: -8 }));
            }
            break;
          }
        }
      if (f.y > H + 8 || f.x < -30 || f.x > W + 30) Object.assign(f, newFlake({ y: -8 }));
      const d = f.r * 3.2;
      ctx.globalAlpha = f.o;
      ctx.drawImage(sprite, f.x - d / 2, f.y - d / 2, d, d);
    }

    // swept-off snow: a little arc, then gone
    for (let i = spray.length - 1; i >= 0; i--) {
      const q = spray[i];
      q.vy += 520 * dt;
      q.x += q.vx * dt;
      q.y += q.vy * dt;
      q.life -= dt;
      if (q.life <= 0 || q.y > H + 10) {
        spray.splice(i, 1);
        continue;
      }
      const d = q.r * 3.2;
      ctx.globalAlpha = Math.min(1, q.life) * 0.9;
      ctx.drawImage(sprite, q.x - d / 2, q.y - d / 2, d, d);
    }

    // the piles, sitting on each card's top edge (the bottom tucks under the card)
    ctx.globalAlpha = 1;
    for (const pl of visible) {
      const n = pl.h.length;
      let any = false;
      for (let i = 0; i < n; i++) if (pl.h[i] > 0.4) { any = true; break; }
      if (!any) continue;
      for (const [dy, fill] of [[1.5, "rgba(120,150,180,.45)"], [0, "#f4f8fc"]] as const) {
        ctx.beginPath();
        ctx.moveTo(pl.left, pl.top + 1);
        let px = pl.left, py = pl.top + dy - pl.h[0];
        ctx.lineTo(px, py);
        for (let i = 1; i < n; i++) {
          const x = pl.left + i * COL, y = pl.top + dy - pl.h[i];
          ctx.quadraticCurveTo(px, py, (px + x) / 2, (py + y) / 2);
          px = x;
          py = y;
        }
        ctx.lineTo(pl.left + pl.width, py);
        ctx.lineTo(pl.left + pl.width, pl.top + 1);
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
      }
    }
  }
  listCards();
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    removeEventListener("resize", resize);
    removeEventListener("pointermove", move);
    document.removeEventListener("pointerleave", leave);
    canvas.remove();
    delete main.dataset.snow;
  };
}
