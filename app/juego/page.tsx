"use client";

import { useState } from "react";
import Link from "next/link";
import ScratchCard from "../components/ScratchCard";
import MemoryGame from "../components/MemoryGame";
import BalloonPopGame from "../components/BalloonPopGame";

const CONFETTI = ["🎉", "🎈", "✨", "🎂", "💖", "🎁"];

type Step =
  | "scratch"
  | "unlocked1"
  | "memory"
  | "unlocked2"
  | "balloons"
  | "message"
  | "final";

const STEP_LEVEL: Record<Step, number> = {
  scratch: 1,
  unlocked1: 1,
  memory: 2,
  unlocked2: 2,
  balloons: 3,
  message: 3,
  final: 3,
};

export default function JuegoPage() {
  const [step, setStep] = useState<Step>("scratch");

  const level = STEP_LEVEL[step];

  return (
    <div className="relative flex min-h-screen w-full flex-1 flex-col items-center overflow-hidden bg-linear-to-br from-[#ff7a1a] via-[#ff4d6d] to-[#c81e6b] px-4 py-8 sm:py-12">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#ffb347]/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-[#ff2e93]/40 blur-3xl" />

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center sm:max-w-md">
        <div className="mb-6 flex w-full items-center justify-between">
          <Link
            href="/"
            className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/30"
          >
            ← Volver
          </Link>
          <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur">
            Nivel {level}/3
          </span>
        </div>

        {step === "scratch" && (
          <>
          
            <p className="mt-2 text-center text-sm font-medium text-white/90 sm:text-base">
              Pasa el dedo sobre la tarjeta y descubre el día 📅
            </p>

            <ScratchCard
              className="mt-6 h-72 w-full shadow-2xl sm:h-80"
              onComplete={() => setStep("unlocked1")}
            >
              <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden bg-linear-to-b from-[#fff3e6] to-[#ffd9a0] px-6 py-8 text-center">
                <span className="absolute -left-2 top-3 rotate-[-12deg] text-3xl opacity-80">
                  🎈
                </span>
                <span className="absolute -right-1 top-6 rotate-[10deg] text-2xl opacity-80">
                  ✨
                </span>
                <span className="absolute bottom-4 left-4 rotate-[8deg] text-2xl opacity-80">
                  🎊
                </span>
                <span className="absolute -right-2 bottom-3 rotate-[-10deg] text-3xl opacity-80">
                  🎉
                </span>

           

                <div className="relative mt-1 rounded-3xl border-4 border-dashed border-[#ff2e93] bg-white px-6 py-4 shadow-lg">
               
                  <p className="mt-1 text-6xl font-black leading-none text-[#c81e6b] sm:text-7xl">
                    05
                  </p>
                  <p className="text-xl font-black uppercase tracking-wide text-[#ff7a1a] sm:text-2xl">
                    Septiembre
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#7a3b1e]">
                    Sábado
                  </p>
                </div>

              
              </div>
            </ScratchCard>
          </>
        )}

        {step === "unlocked1" && (
          <div className="animate-pop-in mt-6 flex w-full flex-col items-center gap-4 rounded-3xl bg-[#fff3e6] px-6 py-10 text-center shadow-2xl">
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
          <>
            <h1 className="text-center text-2xl font-black text-white sm:text-3xl">
              Encuentra las parejas
            </h1>
            <p className="mt-2 text-center text-sm font-medium text-white/90 sm:text-base">
              Pon a prueba tu memoria y desbloquea la hora 🕜
            </p>
            <div className="mt-6 w-full rounded-3xl bg-[#fff3e6] p-4 shadow-2xl sm:p-6">
              <MemoryGame onComplete={() => setStep("unlocked2")} />
            </div>
          </>
        )}

        {step === "unlocked2" && (
          <div className="animate-pop-in mt-6 flex w-full flex-col items-center gap-4 rounded-3xl bg-[#fff3e6] px-6 py-10 text-center shadow-2xl">
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
          <>
            <h1 className="text-center text-2xl font-black text-white sm:text-3xl">
              Reventá los globos
            </h1>
            <p className="mt-2 text-center text-sm font-medium text-white/90 sm:text-base">
              Tocá todos los globos y desbloqueá el lugar 📍
            </p>
            <div className="mt-6 w-full">
              <BalloonPopGame onComplete={() => setStep("message")} />
            </div>
          </>
        )}

        {step === "message" && (
          <div className="animate-pop-in mt-6 flex w-full flex-col items-center gap-4 rounded-3xl bg-[#fff3e6] px-6 py-10 text-center shadow-2xl">
            <span className="text-4xl">💌</span>
            <p className="whitespace-pre-line text-sm leading-relaxed text-[#7a3b1e] sm:text-base">
              Gracias por la amistad, por el apoyo, por el amor que me dais y
              por acompañarme un año más. Me hace mucha ilusión despedir mis
              veintitantos rodeada de vosotros, gente fundamental e
              importante para mí.
              {"\n\n"}
              Sé que no siempre es fácil coincidir todos, pero estés o no ese
              día, quería hacerte parte de este momento.
            </p>
            <button
              type="button"
              onClick={() => setStep("final")}
              className="animate-pulse-glow mt-2 flex h-14 w-full select-none items-center justify-center rounded-full bg-linear-to-r from-[#ff2e93] to-[#ff7a1a] text-base font-bold text-white shadow-lg transition-transform active:scale-95 sm:h-16"
            >
              Ver la invitación 🎉
            </button>
          </div>
        )}

        {step === "final" && (
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

            <h1 className="text-center text-2xl font-black text-white sm:text-3xl">
              ¡Lo lograste! 🎉
            </h1>
            <p className="mt-2 text-center text-sm font-medium text-white/90 sm:text-base">
              Ya desbloqueaste la invitación de Amanda
            </p>

            <div className="animate-pop-in mt-6 flex w-full flex-col items-center gap-3 rounded-3xl bg-[#fff3e6] px-6 py-8 text-center shadow-2xl">
              <span className="text-4xl">🎂</span>
              <h2 className="text-xl font-black uppercase tracking-tight text-[#c81e6b] sm:text-2xl">
                Amanda cumple 30
              </h2>

              <div className="mt-2 w-full space-y-2 rounded-2xl bg-white/70 px-4 py-3 text-left text-sm sm:text-base">
                <p className="font-semibold text-[#7a3b1e]">
                  📅 Sábado 5 de septiembre
                </p>
                <p className="font-semibold text-[#7a3b1e]">🕜 13:30 hs</p>
                <p className="font-semibold text-[#7a3b1e]">
                  📍 Lugar: ¡muy pronto te cuento!
                </p>
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
