"use client";

import { useState } from "react";

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

const QUESTIONS: Question[] = [
  {
    question: "Grupo musical más escuchado en el 2025",
    options: ["SFDK", "Siloe", "Delaossa", "Natos y Waor"],
    correctAnswer: "Siloe",
  },
  {
    question: "Lugar donde quiero viajar para bucear próximamente",
    options: ["Azores", "Vietnam", "Japón", "Maldivas"],
    correctAnswer: "Maldivas",
  },
  {
    question: "Mi color favorito es",
    options: ["Verde", "Morado", "Rojo", "Azul"],
    correctAnswer: "Verde",
  },
  {
    question: "¿Cómo me llamaban de pequeña?",
    options: ["Mandi", "Amandota", "Wanda", "Mandasita"],
    correctAnswer: "Wanda",
  },
  {
    question: "Tipo de comida favorita",
    options: ["Italiana", "Peruana", "Mexicana", "Mediterránea"],
    correctAnswer: "Mexicana",
  },
  {
    question: "Personaje favorito de Marvel",
    options: ["Capitana Marvel", "Hulk", "Viuda Negra", "Thor"],
    correctAnswer: "Viuda Negra",
  },
  {
    question: "País que no visitaría de nuevo",
    options: ["Marruecos", "Francia", "Italia", "Grecia"],
    correctAnswer: "Marruecos",
  },
  {
    question: "¿Qué hobbie me hubiese gustado aprender?",
    options: ["Nado profesional", "Baile moderno", "Cantar opera", "Pintar cuadros"],
    correctAnswer: "Baile moderno",
  },
  {
    question: "Película favorita",
    options: ["Fractura", "La cenicienta", "El origen", "Un mostruo viene a verme"],
    correctAnswer: "Un mostruo viene a verme",
  },
  {
    question: "Tarta de cumpleaños que no debe faltar en mi fiesta",
    options: ["Tarta de chocolate", "Tarta de queso", "Tarta de la abuela", "Tarta de nata"],
    correctAnswer: "Tarta de la abuela",
  },
];

const MAX_FAILS = 3;

const shuffle = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const normalize = (s: string) =>
  s
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export default function PasapalabraGame({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [questions, setQuestions] = useState<Question[]>(() =>
    shuffle(QUESTIONS)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fails, setFails] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    type: "correct" | "wrong";
    text: string;
  } | null>(null);

  const total = questions.length;
  const current = questions[currentIndex];

  const goNext = () => {
    if (currentIndex + 1 >= total) {
      onComplete?.();
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSelect = (choice: string) => {
    if (gameOver || message) return;
    const correct = normalize(choice) === normalize(current.correctAnswer);
    setSelected(choice);

    if (correct) {
      setMessage({ type: "correct", text: "¡Correcto! 🎉" });
      window.setTimeout(() => {
        setMessage(null);
        setSelected(null);
        goNext();
      }, 700);
    } else {
      const remainingFails = fails + 1;
      setFails(remainingFails);
      setMessage({ type: "wrong", text: "¡Uy, no! 😅" });

      if (remainingFails >= MAX_FAILS) {
        window.setTimeout(() => {
          setMessage(null);
          setSelected(null);
          setGameOver(true);
        }, 900);
      } else {
        window.setTimeout(() => {
          setMessage(null);
          setSelected(null);
          goNext();
        }, 900);
      }
    }
  };

  const handlePrevTest = () => {
    if (gameOver || currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
    setMessage(null);
    setSelected(null);
  };

  const handleRetry = () => {
    setQuestions(shuffle(QUESTIONS));
    setCurrentIndex(0);
    setFails(0);
    setGameOver(false);
    setMessage(null);
    setSelected(null);
  };

  if (gameOver) {
    return (
      <div className="flex w-full flex-col items-center gap-4 py-8 text-center">
        <span className="text-5xl">💔</span>
        <h3 className="text-xl font-black text-[#c81e6b]">
          ¡Se acabaron los intentos!
        </h3>
        <p className="text-sm font-medium text-[#7a3b1e]">
          El quiz se reinicia. ¡Tú puedes! 💪
        </p>
        <button
          type="button"
          onClick={handleRetry}
          className="animate-pulse-glow mt-2 flex h-14 w-full select-none items-center justify-center rounded-full bg-linear-to-r from-[#ff2e93] to-[#ff7a1a] text-base font-bold text-white shadow-lg transition-transform active:scale-95"
        >
          Reintentar el quiz 🔄
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full items-center justify-between">
        <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-[#7a3b1e]">
          Pregunta {currentIndex + 1}/{total}
        </span>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: MAX_FAILS }).map((_, i) => (
            <span key={i} className="text-lg">
              {i < MAX_FAILS - fails ? "❤️" : "🖤"}
            </span>
          ))}
        </div>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/60">
        <div
          className="h-full rounded-full bg-linear-to-r from-[#ff2e93] to-[#ff7a1a] transition-all"
          style={{ width: `${(currentIndex / total) * 100}%` }}
        />
      </div>

      <p className="min-h-14 text-center text-base font-bold text-[#7a3b1e] sm:text-lg">
        {current.question}
      </p>

      {message && (
        <p
          className={`animate-pop-in text-sm font-bold ${
            message.type === "correct" ? "text-[#1fae5f]" : "text-[#ff2e5c]"
          }`}
        >
          {message.text}
        </p>
      )}

      <div className="grid w-full grid-cols-2 gap-2">
        {current.options.map((opt) => {
          const showResult = !!message;
          const isSelected = opt === selected;
          const optBg = showResult
            ? isSelected
              ? message?.type === "correct"
                ? "bg-[#22c55e] text-white"
                : "bg-[#ff2e5c] text-white"
              : "bg-white text-[#7a3b1e] opacity-60"
            : "bg-white text-[#7a3b1e]";
          return (
            <button
              key={opt}
              type="button"
              disabled={showResult}
              onClick={() => handleSelect(opt)}
              className={`flex min-h-16 items-center justify-center rounded-2xl px-3 py-3 text-center text-sm font-bold shadow-md transition-transform active:scale-95 ${optBg}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handlePrevTest}
        disabled={currentIndex === 0}
        className="rounded-full border-2 border-dashed border-[#7a3b1e]/30 bg-transparent px-3 py-1 text-xs font-semibold text-[#7a3b1e]/60 transition-transform active:scale-95 disabled:opacity-30"
      >
        ⏪ Anterior (solo pruebas)
      </button>
    </div>
  );
}
