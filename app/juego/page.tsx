"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ScratchCard from "../components/ScratchCard";
import MemoryGame from "../components/MemoryGame";
import BalloonPopGame from "../components/BalloonPopGame";
import PasapalabraGame from "../components/PasapalabraGame";

const CONFETTI = ["🎉", "🎈", "✨", "🎂", "💖", "🎁"];

type Step =
  | "scratch"
  | "unlocked1"
  | "memory"
  | "hourReveal"
  | "unlocked2"
  | "balloons"
  | "placeReveal"
  | "unlocked3"
  | "quiz"
  | "conditionsReveal"
  | "unlocked4"
  | "message";

const STEP_LEVEL: Record<Step, number> = {
  scratch: 1,
  unlocked1: 1,
  memory: 2,
  hourReveal: 2,
  unlocked2: 2,
  balloons: 3,
  placeReveal: 3,
  unlocked3: 3,
  quiz: 4,
  conditionsReveal: 4,
  unlocked4: 4,
  message: 4,
};

const STEP_ORDER: Step[] = [
  "scratch",
  "unlocked1",
  "memory",
  "hourReveal",
  "unlocked2",
  "balloons",
  "placeReveal",
  "unlocked3",
  "quiz",
  "conditionsReveal",
  "unlocked4",
  "message",
];

export default function JuegoPage() {
  const [step, setStep] = useState<Step>("scratch");

  const level = STEP_LEVEL[step];
  const stepIndex = STEP_ORDER.indexOf(step);

  const goToStep = (delta: number) => {
    const nextIndex = Math.min(
      Math.max(stepIndex + delta, 0),
      STEP_ORDER.length - 1,
    );
    setStep(STEP_ORDER[nextIndex]);
  };

  useEffect(() => {
    if (step === "hourReveal") {
      const timer = window.setTimeout(() => setStep("unlocked2"), 1800);
      return () => window.clearTimeout(timer);
    }
    if (step === "placeReveal") {
      const timer = window.setTimeout(() => setStep("unlocked3"), 1800);
      return () => window.clearTimeout(timer);
    }
    if (step === "conditionsReveal") {
      const timer = window.setTimeout(() => setStep("unlocked4"), 1800);
      return () => window.clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="relative flex min-h-screen w-full flex-1 flex-col items-center overflow-hidden bg-linear-to-br from-[#ff7a1a] via-[#ff4d6d] to-[#c81e6b] px-4 py-5 sm:py-12">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#ffb347]/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-[#ff2e93]/40 blur-3xl" />

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center sm:max-w-md">
        <div className="mb-2 flex w-full items-center justify-between">
          <Link
            href="/"
            className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/30"
          >
            ← Volver
          </Link>
          <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur">
            Nivel {level}/4
          </span>
        </div>

        {/* TODO: controles de testing, quitar antes de publicar */}
        <div className="mb-2 flex items-center gap-2 rounded-full border-2 border-dashed border-yellow-300 bg-black/40 px-3 py-1.5 text-xs font-bold text-yellow-300">
          <button
            type="button"
            onClick={() => goToStep(-1)}
            disabled={stepIndex === 0}
            className="px-2 disabled:opacity-30"
          >
            ⬅
          </button>
          <span>
            🧪 {stepIndex + 1}/{STEP_ORDER.length} · {step}
          </span>
          <button
            type="button"
            onClick={() => goToStep(1)}
            disabled={stepIndex === STEP_ORDER.length - 1}
            className="px-2 disabled:opacity-30"
          >
            ➡
          </button>
        </div>

        {step === "scratch" && (
          <div className="animate-pop-in flex w-full flex-col items-center">
            <h1 className="text-center text-2xl font-black text-white sm:text-3xl">
              RASCA Y DESCUBRE
            </h1>
            <p className="mt-2 text-center text-sm font-medium text-white/90 sm:text-base">
              Pasa el dedo sobre la tarjeta y descubre el día 📅
            </p>

            <ScratchCard
              className="mt-4 h-72 w-full shadow-2xl sm:h-112"
              onComplete={() => setStep("unlocked1")}
            >
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-linear-to-b from-[#fff3e6] to-[#ffd9a0] px-6 text-center">
                <p className="text-8xl font-black leading-none text-[#c81e6b] sm:text-9xl">
                  05
                </p>
                <p className="text-2xl font-black uppercase tracking-wide text-[#ff7a1a] sm:text-3xl">
                  Septiembre
                </p>
                <p className="text-base font-semibold text-[#7a3b1e]">SÁBADO</p>
              </div>
            </ScratchCard>
          </div>
        )}

        {step === "unlocked1" && (
          <div className="animate-pop-in mt-4 flex min-h-64 w-full flex-col items-center justify-center gap-3 rounded-3xl bg-[#fff3e6] px-6 py-8 text-center shadow-2xl">
            <span className="text-5xl">🔓</span>
            <h2 className="text-xl font-black text-[#c81e6b] sm:text-2xl">
              ¡Nivel 1 completo!
            </h2>
            <p className="text-sm font-medium text-[#7a3b1e] sm:text-base">
              Ya sabes el día. Encuentra las parejas en el próximo nivel para
              desbloquear la hora ⏰
            </p>
            <button
              type="button"
              onClick={() => setStep("memory")}
              className="animate-pulse-glow mt-2 flex h-14 w-full select-none items-center justify-center rounded-full bg-linear-to-r from-[#ff2e93] to-[#ff7a1a] text-base font-bold text-white shadow-lg transition-transform active:scale-95 sm:h-16"
            >
              Ir al nivel 2 🧠
            </button>
          </div>
        )}

        {step === "memory" && (
          <div className="animate-pop-in flex w-full flex-col items-center">
            <h1 className="text-center text-2xl font-black text-white sm:text-3xl">
              ENCUENTRA LAS PAREJAS
            </h1>
            <p className="mt-2 text-center text-sm font-medium text-white/90 sm:text-base">
              Pon a prueba tu memoria y desbloquea la hora 🕜
            </p>
            <div className="mt-4 flex min-h-64 w-full flex-col justify-center rounded-3xl bg-[#fff3e6] p-4 shadow-2xl sm:min-h-112 sm:p-6">
              <MemoryGame onComplete={() => setStep("hourReveal")} />
            </div>
          </div>
        )}

        {step === "hourReveal" && (
          <div className="animate-pop-in mt-4 flex h-72 w-full flex-col items-center justify-center gap-2 rounded-3xl bg-linear-to-b from-[#fff3e6] to-[#ffd9a0] px-6 text-center shadow-2xl sm:h-112">
            <p className="mt-1 text-6xl font-black leading-none text-[#c81e6b] sm:text-7xl">
              13:30
            </p>
            <p className="text-lg font-black uppercase tracking-wide text-[#ff7a1a] sm:text-xl">
              hs
            </p>
          </div>
        )}

        {step === "unlocked2" && (
          <div className="animate-pop-in mt-4 flex min-h-64 w-full flex-col items-center justify-center gap-3 rounded-3xl bg-[#fff3e6] px-6 py-8 text-center shadow-2xl">
            <span className="text-5xl">🔓</span>
            <h2 className="text-xl font-black text-[#c81e6b] sm:text-2xl">
              ¡Nivel 2 completo!
            </h2>
            <p className="text-sm font-medium text-[#7a3b1e] sm:text-base">
              Ya sabes el día y la hora. Revienta todos los globos para
              desbloquear el sitio, pero...cuidado, hay trampa📍
            </p>
            <button
              type="button"
              onClick={() => setStep("balloons")}
              className="animate-pulse-glow mt-2 flex h-14 w-full select-none items-center justify-center rounded-full bg-linear-to-r from-[#ff2e93] to-[#ff7a1a] text-base font-bold text-white shadow-lg transition-transform active:scale-95 sm:h-16"
            >
              Ir al nivel 3 🎈
            </button>
          </div>
        )}

        {step === "balloons" && (
          <div className="animate-pop-in flex w-full flex-col items-center">
            <h1 className="text-center text-2xl font-black text-white sm:text-3xl">
              REVIENTA LOS GLOBOS
            </h1>
            <p className="mt-2 text-center text-sm font-medium text-white/90 sm:text-base">
              Revienta todos los globos y desbloquea el lugar 📍
            </p>
            <div className="mt-4 w-full rounded-3xl bg-[#fff3e6] p-4 shadow-2xl sm:p-6">
              <BalloonPopGame onComplete={() => setStep("placeReveal")} />
            </div>
          </div>
        )}

        {step === "placeReveal" && (
          <div className="animate-pop-in mt-4 flex h-72 w-full flex-col items-center justify-center gap-2 rounded-3xl bg-linear-to-b from-[#fff3e6] to-[#ffd9a0] px-6 text-center shadow-2xl sm:h-112">
            <span className="text-6xl">📍</span>
            <p className="mt-2 text-2xl font-black leading-snug text-[#c81e6b] sm:text-3xl">
              ¡Muy pronto
              <br />
              te cuento!
            </p>
          </div>
        )}

        {step === "unlocked3" && (
          <div className="animate-pop-in mt-4 flex min-h-64 w-full flex-col items-center justify-center gap-3 rounded-3xl bg-[#fff3e6] px-6 py-8 text-center shadow-2xl">
            <span className="text-5xl">🔓</span>
            <h2 className="text-xl font-black text-[#c81e6b] sm:text-2xl">
              ¡Nivel 3 completo!
            </h2>
            <p className="text-sm font-medium text-[#7a3b1e] sm:text-base">
              Ya sabes el día, la hora y el lugar. Responde el quiz para conocer
              las condiciones de entrada 🎟️
            </p>
            <button
              type="button"
              onClick={() => setStep("quiz")}
              className="animate-pulse-glow mt-2 flex h-14 w-full select-none items-center justify-center rounded-full bg-linear-to-r from-[#ff2e93] to-[#ff7a1a] text-base font-bold text-white shadow-lg transition-transform active:scale-95 sm:h-16"
            >
              Ir al nivel 4 🧠
            </button>
          </div>
        )}

        {step === "quiz" && (
          <div className="animate-pop-in flex w-full flex-col items-center">
            <h1 className="text-center text-2xl font-black text-white sm:text-3xl">
              ¿Cuánto me conoces?
            </h1>
            <p className="mt-2 text-center text-sm font-medium text-white/90 sm:text-base">
              Responde a las preguntas y desbloquea las condiciones de entrada
              🎟️
            </p>
            <div className="mt-4 flex min-h-64 w-full flex-col justify-center rounded-3xl bg-[#fff3e6] p-4 shadow-2xl sm:min-h-112 sm:p-6">
              <PasapalabraGame onComplete={() => setStep("conditionsReveal")} />
            </div>
          </div>
        )}

        {step === "conditionsReveal" && (
          <div className="animate-pop-in mt-4 flex h-72 w-full flex-col items-center justify-center gap-2 rounded-3xl bg-linear-to-b from-[#fff3e6] to-[#ffd9a0] px-6 text-center shadow-2xl sm:h-112">
            <span className="text-6xl">🎟️</span>
            <p className="mt-2 text-xl font-black leading-snug text-[#c81e6b] sm:text-2xl">
              Tu misión para el día 05:
            </p>
            <p className="text-3xl font-black uppercase tracking-wide text-[#ff7a1a] sm:text-4xl">
              Venir de blanco
            </p>
          </div>
        )}

        {step === "unlocked4" && (
          <div className="animate-pop-in mt-4 flex min-h-64 w-full flex-col items-center justify-center gap-3 rounded-3xl bg-[#fff3e6] px-6 py-8 text-center shadow-2xl">
            <span className="text-5xl">🔓</span>
            <h2 className="text-xl font-black text-[#c81e6b] sm:text-2xl">
              ¡Nivel 4 superado!
            </h2>
            <p className="text-sm font-medium text-[#7a3b1e] sm:text-base">
              Enhorabuena has superado todos los niveles. No esperaba menos de
              tus habilidades y tu inteligencia.
            </p>
            <button
              type="button"
              onClick={() => setStep("message")}
              className="animate-pulse-glow mt-2 flex h-14 w-full select-none items-center justify-center rounded-full bg-linear-to-r from-[#ff2e93] to-[#ff7a1a] text-base font-bold text-white shadow-lg transition-transform active:scale-95 sm:h-16"
            >
              Ver invitación 🎉
            </button>
          </div>
        )}

        {step === "message" && (
          <>
            <div className="pointer-events-none flex justify-center gap-3 text-2xl">
              {CONFETTI.map((emoji, i) => (
                <span
                  key={i}
                  className="animate-confetti-fall"
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  {emoji}
                </span>
              ))}
            </div>

            <div className="animate-pop-in mt-4 flex w-full flex-col items-center gap-3 rounded-3xl bg-[#fff3e6] px-6 py-8 text-center shadow-2xl">
              <span className="text-4xl">💌</span>
              <p className="whitespace-pre-line text-sm leading-relaxed text-[#7a3b1e] sm:text-base">
                Gracias por la amistad, por el amor que me dais y por
                acompañarme un año más. Me hace mucha ilusión despedir mis
                veintitodos rodeada de vosotros, gente fundamental e importante
                para mí.
                {"\n\n"}
                Sé que no siempre es fácil coincidir todos, pero aunque no
                puedas venir, te tendré presente en mi día.
              </p>

              <div className="mt-2 w-full space-y-2 rounded-2xl bg-linear-to-br from-[#ff7a1a] to-[#c81e6b] px-4 py-3 text-left text-sm text-white sm:text-base">
                <p className="font-semibold">📅 Sábado 5 de septiembre</p>
                <p className="font-semibold">🕜 13:30 hs</p>
                <p className="font-semibold">
                  📍 Lugar: ¡muy pronto te cuento!
                </p>
                <p className="font-semibold">🎟️ Vestimenta de blanco</p>
              </div>

              <p className="mt-1 text-xs font-medium text-[#a15a2e] sm:text-sm">
                Guarda la fecha, ¡te espero para pasarla bien! 💌
              </p>
            </div>

            <Link
              href="/"
              className="mt-8 flex h-14 w-full items-center justify-center rounded-full bg-white text-base font-bold text-[#c81e6b] shadow-lg transition-transform active:scale-95 sm:h-16 sm:text-lg"
            >
              Volver a jugar
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
