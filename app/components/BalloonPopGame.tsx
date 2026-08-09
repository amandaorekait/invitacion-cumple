"use client";

import { useEffect, useRef, useState } from "react";

const TARGET_POPS = 10;
const SPAWN_INTERVAL_MS = 480;
const TRAP_CHANCE = 0.3;
const TRAP_ICONS = ["30", "❌", "💣", "🚫", "👻", "🎯", "⚡", "🕷️"];

type Item = {
  id: number;
  kind: "balloon" | "trap";
  icon?: string;
  left: number;
  duration: number;
  drift: number;
  hue: number;
  size: number;
};

type Popup = { id: number; left: number; top: number; text: string; color: string };

export default function BalloonPopGame({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [popped, setPopped] = useState(0);
  const [penaltyFlash, setPenaltyFlash] = useState(false);
  const [popups, setPopups] = useState<Popup[]>([]);
  const nextId = useRef(0);
  const nextPopupId = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (completedRef.current) return;
      const isTrap = Math.random() < TRAP_CHANCE;
      setItems((prev) => [
        ...prev,
        {
          id: nextId.current++,
          kind: isTrap ? "trap" : "balloon",
          icon: isTrap
            ? TRAP_ICONS[Math.floor(Math.random() * TRAP_ICONS.length)]
            : undefined,
          left: 20 + Math.random() * 74,
          duration: 1.25 + Math.random() * 0.7,
          drift: -(60 + Math.random() * 110),
          hue: Math.floor(Math.random() * 360),
          size: 34 + Math.random() * 16,
        },
      ]);
    }, SPAWN_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!completedRef.current && popped >= TARGET_POPS) {
      completedRef.current = true;
      const timer = setTimeout(() => onComplete?.(), 500);
      return () => clearTimeout(timer);
    }
  }, [popped, onComplete]);

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const showPopup = (
    e: React.PointerEvent<HTMLButtonElement>,
    text: string,
    color: string
  ) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    const btnRect = e.currentTarget.getBoundingClientRect();
    if (!containerRect) return;
    const popupId = nextPopupId.current++;
    setPopups((prev) => [
      ...prev,
      {
        id: popupId,
        left: btnRect.left - containerRect.left + btnRect.width / 2,
        top: btnRect.top - containerRect.top,
        text,
        color,
      },
    ]);
    window.setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== popupId));
    }, 900);
  };

  const popBalloon = (id: number, e: React.PointerEvent<HTMLButtonElement>) => {
    removeItem(id);
    setPopped((prev) => Math.min(prev + 1, TARGET_POPS));
    showPopup(e, "+1 🎈", "#1fae5f");
  };

  const tapTrap = (id: number, e: React.PointerEvent<HTMLButtonElement>) => {
    removeItem(id);
    setPopped((prev) => prev - 1);
    setPenaltyFlash(true);
    window.setTimeout(() => setPenaltyFlash(false), 300);
    showPopup(e, "-1 😢", "#ff2e5c");
  };

  return (
    <div
      ref={containerRef}
      className="relative h-100 w-full overflow-hidden rounded-2xl bg-linear-to-b from-[#ffe1c2] to-[#ffc2de] sm:h-96"
    >
      <div
        className={`pointer-events-none absolute inset-0 z-20 bg-[#ff2e5c] transition-opacity duration-200 ${
          penaltyFlash ? "opacity-40" : "opacity-0"
        }`}
      />

      <p className="absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-full bg-white/80 px-4 py-1 text-xs font-bold text-[#c81e6b] shadow">
        Globos reventados: {Math.min(popped, TARGET_POPS)}/{TARGET_POPS}🎈
      </p>

      {popups.map((p) => (
        <span
          key={p.id}
          className="animate-penalty-float pointer-events-none absolute z-30 -translate-x-1/2 text-xl font-black drop-shadow"
          style={{ left: p.left, top: p.top, color: p.color }}
        >
          {p.text}
        </span>
      ))}

      {items.map((item) =>
        item.kind === "balloon" ? (
          <button
            key={item.id}
            type="button"
            onPointerDown={(e) => popBalloon(item.id, e)}
            onAnimationEnd={() => removeItem(item.id)}
            aria-label="Globo"
            className="animate-balloon-fall absolute select-none leading-none active:scale-125"
            style={{
              left: `${item.left}%`,
              fontSize: `${item.size}px`,
              animationDuration: `${item.duration}s`,
              filter: `hue-rotate(${item.hue}deg)`,
              ["--balloon-drift" as string]: `${item.drift}px`,
            }}
          >
            🎈
          </button>
        ) : (
          <button
            key={item.id}
            type="button"
            onPointerDown={(e) => tapTrap(item.id, e)}
            onAnimationEnd={() => removeItem(item.id)}
            aria-label="No tocar"
            className="animate-balloon-fall absolute select-none leading-none font-black active:scale-125"
            style={{
              left: `${item.left}%`,
              fontSize: `${item.size * 1.3}px`,
              animationDuration: `${item.duration}s`,
              color: "#ff2e5c",
              filter: `hue-rotate(${item.hue}deg)`,
              ["--balloon-drift" as string]: `${item.drift}px`,
            }}
          >
            {item.icon}
          </button>
        )
      )}
    </div>
  );
}
