import { useEffect, useRef, useState } from "react";
import { MessageCircle, ArrowUp, Calculator, MoveHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";

/** Animated number that counts up when scrolled into view. */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(to); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1600);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export function StatsStrip() {
  const stats = [
    { v: 500, s: "+", l: "Sites inspected" },
    { v: 10, s: "+", l: "Years of experience" },
    { v: 13, s: "", l: "Specialised services" },
    { v: 98, s: "%", l: "Happy customers" },
  ];
  return (
    <div className="stats-strip container-site grid grid-cols-2 gap-px overflow-hidden lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.l} className="bg-card px-6 py-8 text-center">
          <p className="stat-value text-primary"><CountUp to={s.v} suffix={s.s} /></p>
          <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
        </div>
      ))}
    </div>
  );
}

/** Infinite scrolling ticker of words. */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="marquee border-y border-border bg-card py-6" aria-hidden>
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i} className="marquee-item">{t}<span className="marquee-dot" /></span>
        ))}
      </div>
    </div>
  );
}

/** Draggable before/after image comparison. */
export function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="before-after relative aspect-[16/10] w-full select-none overflow-hidden rounded-lg">
      <img src={after} alt="After waterproofing" className="absolute inset-0 size-full object-cover" loading="lazy" />
      <img src={before} alt="Before waterproofing" className="before-img absolute inset-0 size-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} loading="lazy" />
      <span className="ba-tag left-4">Before</span>
      <span className="ba-tag right-4">After</span>
      <div className="ba-handle" style={{ left: `${pos}%` }}><span><MoveHorizontal className="size-5" /></span></div>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare before and after" className="absolute inset-0 size-full cursor-ew-resize opacity-0" />
    </div>
  );
}

const areaTypes = {
  Terrace: [45, 85], Bathroom: [55, 110], "Water Tank": [50, 95], "Wall / Damp": [35, 70], Balcony: [45, 90],
} as const;

/** Rough cost estimator — guidance only, final quote after inspection. */
export function CostEstimator() {
  const [type, setType] = useState<keyof typeof areaTypes>("Terrace");
  const [sqft, setSqft] = useState(800);
  const [lo, hi] = areaTypes[type];
  const fmt = (v: number) => "₹" + Math.round(v).toLocaleString("en-IN");
  const text = `Hello NR Waterproofing, I'd like a quote for ${type} waterproofing, approx ${sqft} sq.ft.`;
  return (
    <div className="estimator rounded-lg border border-border bg-card p-6 md:p-10">
      <div className="flex items-center gap-3"><span className="service-icon grid place-items-center bg-accent text-primary"><Calculator className="size-6" /></span>
        <h3 className="text-2xl font-bold">Quick cost estimator</h3></div>
      <div className="mt-6 flex flex-wrap gap-2">
        {(Object.keys(areaTypes) as (keyof typeof areaTypes)[]).map((k) => (
          <button key={k} type="button" onClick={() => setType(k)} data-active={k === type}
            className="chip rounded-full border border-border px-4 py-2 text-sm font-medium">{k}</button>
        ))}
      </div>
      <label className="mt-8 block text-sm font-medium">Area: <span className="text-primary">{sqft} sq.ft</span></label>
      <input type="range" min={50} max={5000} step={50} value={sqft} onChange={(e) => setSqft(Number(e.target.value))}
        className="estimator-range mt-3 w-full" />
      <div className="mt-8 rounded-lg bg-muted p-6">
        <p className="text-sm text-muted-foreground">Estimated range</p>
        <p className="stat-value mt-1 text-foreground">{fmt(lo * sqft)} – {fmt(hi * sqft)}</p>
        <p className="mt-2 text-xs text-muted-foreground">Indicative only. Final price depends on site condition after a free inspection.</p>
      </div>
      <Button asChild size="lg" className="mt-6 w-full"><a href={whatsappLink(text)} target="_blank" rel="noreferrer">Get exact quote on WhatsApp</a></Button>
    </div>
  );
}

/** Floating WhatsApp, back-to-top, and top scroll progress bar. */
export function FloatingActions() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${p})` }} />
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        <button type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fab-top grid size-11 place-items-center rounded-full border border-border bg-card text-foreground shadow-soft" data-show={p > 0.08}>
          <ArrowUp className="size-5" />
        </button>
        <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
          className="fab-wa grid size-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift">
          <MessageCircle className="size-7" />
        </a>
      </div>
    </>
  );
}
