"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Card = {
  id: number;
  icon: string;
};

// Corazones de colores: misma forma, distinto tono. A propósito muy
// parecidos entre sí para que cueste más encontrar las parejas.
const ICONS = [
  "❤️",
  "🧡",
  "💛",
  "💚",
  "💙",
  "💜",
  "🤎",
  "🖤",
  "💗",
  "💓",
];

function shuffledBoard(icons: string[]): Card[] {
  const pairs = [...icons, ...icons];
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs.map((icon, id) => ({ id, icon }));
}

export default function MemoryGame({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [locked, setLocked] = useState(false);
  const completedRef = useRef(false);

  const board = useMemo(() => shuffledBoard(ICONS), []);

  const cols = 5;

  useEffect(() => {
    if (
      !completedRef.current &&
      board.length > 0 &&
      matched.length === board.length
    ) {
      completedRef.current = true;
      const timer = setTimeout(() => onComplete?.(), 600);
      return () => clearTimeout(timer);
    }
  }, [matched, board.length, onComplete]);

  const handleFlip = (id: number) => {
    if (locked || flipped.includes(id) || matched.includes(id)) return;

    const next = [...flipped, id];
    setFlipped(next);

    if (next.length === 2) {
      setLocked(true);
      const [a, b] = next;
      if (board[a].icon === board[b].icon) {
        setMatched((prev) => [...prev, a, b]);
        setFlipped([]);
        setLocked(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setLocked(false);
        }, 700);
      }
    }
  };

  return (
    <div
      className="grid w-full gap-2.5"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {board.map((card) => {
        const isFlipped = flipped.includes(card.id) || matched.includes(card.id);
        const isMatched = matched.includes(card.id);
        return (
          <button
            key={card.id}
            type="button"
            onClick={() => handleFlip(card.id)}
            className="aspect-square select-none perspective-[600px]"
            aria-label={isFlipped ? "Carta boca arriba" : "Carta boca abajo"}
          >
            <div
              className={`relative h-full w-full transform-3d rounded-2xl transition-transform duration-300 ${
                isFlipped ? "transform-[rotateY(180deg)]" : ""
              }`}
            >
              <div className="absolute inset-0 flex backface-hidden items-center justify-center rounded-2xl bg-linear-to-br from-[#ff7a1a] to-[#ff2e93] text-2xl font-black text-white/90 shadow-md">
                ?
              </div>
              <div
                className={`absolute inset-0 flex items-center justify-center overflow-hidden backface-hidden transform-[rotateY(180deg)] rounded-2xl bg-white text-3xl shadow-md sm:text-4xl ${
                  isMatched ? "ring-4 ring-[#ff2e93]/60" : ""
                }`}
              >
                {card.icon}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
