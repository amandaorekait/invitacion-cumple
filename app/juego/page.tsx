"use client";

import { useState } from "react";
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
  | "unlocked2"
  | "balloons"
  | "unlocked3"
  | "quiz"
  | "unlocked4"
  | "message";

const STEP_LEVEL: Record<Step, number> = {
  scratch: 1,
  unlocked1: 1,
  memory: 2,
  unlocked2: 2,
  balloons: 3,
  unlocked3: 3,
  quiz: 4,
  unlocked4: 4,
  message: 4,
};

const STEP_ORDER: Step[] = [
  "scratch",
  "unlocked1",
  "memory",
  "unlocked2",
  "balloons",
  "unlocked3",
  "quiz",
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

  return (
    <div className="relative flex min-h-screen w-full flex-1 flex-col items-center overflow-hidden bg-linear-to-br from-[#ff7a1a] via-[#ff4d6d] to-[#c81e6b] px-4 py-8 sm:py-12">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#ffb347]/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-[#ff2e93]/40 blur-3xl" />

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center sm:max-w-md">
        <div className="mb-3 flex w-full items-center justify-between">
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

      
        {step === "scratch" && (
          <div className="animate-pop-in flex w-full flex-col items-center">
            <h1 className="text-center text-2xl font-black text-white sm:text-3xl">
              RASCA Y DESCUBRE
            </h1>
            <p className="mt-2 text-center text-sm font-medium text-white/90 sm:text-base">
              Pasa el dedo sobre la tarjeta y descubre el día 📅
            </p>

            <ScratchCard
              className="mt-6 h-[28rem] w-full shadow-2xl sm:h-[32rem]"
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
          <div className="animate-pop-in mt-6 flex min-h-88 w-full flex-col items-center justify-center gap-4 rounded-3xl bg-[#fff3e6] px-6 py-10 text-center shadow-2xl">
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
            <div className="mt-6 flex min-h-112 w-full flex-col justify-center rounded-3xl bg-[#fff3e6] p-4 shadow-2xl sm:min-h-128 sm:p-6">
              <MemoryGame onComplete={() => setStep("unlocked2")} />
            </div>
          </div>
        )}

        {step === "unlocked2" && (
          <div className="animate-pop-in mt-6 flex min-h-88 w-full flex-col items-center justify-center gap-4 rounded-3xl bg-[#fff3e6] px-6 py-10 text-center shadow-2xl">
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
            <div className="mt-6 w-full rounded-3xl bg-[#fff3e6] p-4 shadow-2xl sm:p-6">
              <BalloonPopGame onComplete={() => setStep("unlocked3")} />
            </div>
          </div>
        )}

        {step === "unlocked3" && (
          <div className="animate-pop-in mt-6 flex min-h-88 w-full flex-col items-center justify-center gap-4 rounded-3xl bg-[#fff3e6] px-6 py-10 text-center shadow-2xl">
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
              Responde a las preguntas y desbloquea las condiciones de
              entrada 🎟️
            </p>
            <div className="mt-6 flex min-h-112 w-full flex-col justify-center rounded-3xl bg-[#fff3e6] p-4 shadow-2xl sm:min-h-128 sm:p-6">
              <PasapalabraGame onComplete={() => setStep("unlocked4")} />
            </div>
          </div>
        )}

        {step === "unlocked4" && (
          <div className="animate-pop-in mt-6 flex min-h-88 w-full flex-col items-center justify-center gap-4 rounded-3xl bg-[#fff3e6] px-6 py-10 text-center shadow-2xl">
            <span className="text-5xl">🔓</span>
            <h2 className="text-xl font-black text-[#c81e6b] sm:text-2xl">
              ¡Nivel 4 superado!
            </h2>
            <p className="text-sm font-medium text-[#7a3b1e] sm:text-base">
              No esperaba menos de tus habilidades y tu inteligencia. Ahora
              solo tienes una misión para el día 05:{" "}
              <span className="font-bold">venir de blanco</span> y con muchas
              ganas de pasarla bien.
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

            <div className="animate-pop-in mt-6 flex w-full flex-col items-center gap-4 rounded-3xl bg-[#fff3e6] px-6 py-10 text-center shadow-2xl">
              <span className="text-4xl">💌</span>
              <p className="whitespace-pre-line text-sm leading-relaxed text-[#7a3b1e] sm:text-base">
                Gracias por la amistad, por el amor que me dais y por
                acompañarme un año más. Me hace mucha ilusión despedir mis
                veintitodos rodeada de vosotros, gente fundamental e
                importante para mí.
                {"\n\n"}
                Sé que no siempre es fácil coincidir todos, pero aunque no
                puedas venir, te tendré presente en mi día.
              </p>

              <div className="mt-2 w-full space-y-2 rounded-2xl bg-linear-to-br from-[#ff7a1a] to-[#c81e6b] px-4 py-3 text-left text-sm text-white sm:text-base">
                <p className="font-semibold">📅 Sábado 5 de septiembre</p>
                <p className="font-semibold">🕜 13:30 hs</p>
                <p className="font-semibold">📍 Lugar: ¡muy pronto te cuento!</p>
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
