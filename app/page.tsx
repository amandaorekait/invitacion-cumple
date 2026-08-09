import Image from "next/image";
import Link from "next/link";

const FALLING_ICONS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  icon: i % 2 === 0 ? "30" : "30",
  left: Math.random() * 100,
  duration: 4 + Math.random() * 4,
  delay: -(Math.random() * 8),
  size: 12 + Math.random() * 14,
  drift: (Math.random() - 0.5) * 60,
}));

export default function Home() {
  return (
    <div className="relative flex h-dvh w-full flex-1 items-center justify-center overflow-hidden bg-linear-to-br from-[#ff7a1a] via-[#ff4d6d] to-[#c81e6b] px-4 py-6 sm:py-16">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#ffb347]/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-[#ff2e93]/40 blur-3xl" />

   
   

      {/* the giant card */}
      <main className="animate-pop-in relative z-10 flex max-h-full w-full max-w-sm flex-col items-center overflow-hidden rounded-[2.5rem] bg-[#fff3e6] px-6 py-10 text-center shadow-2xl sm:max-w-md sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute inset-0 -z-10">
          {FALLING_ICONS.map((item) => (
            <span
              key={item.id}
              className="animate-rain-fall absolute top-0 leading-none"
              style={{
                left: `${item.left}%`,
                fontSize: `${item.size}px`,
                animationDuration: `${item.duration}s`,
                animationDelay: `${item.delay}s`,
                ["--rain-drift" as string]: `${item.drift}px`,
              }}
            >
              {item.icon}
            </span>
          ))}
        </div>

        <div className="relative mt-8 h-36 w-36 sm:h-44 sm:w-44">
          <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#ff7a1a] to-[#ff2e93] p-1.5 shadow-lg">
            <div className="relative h-full w-full overflow-hidden rounded-full ring-4 ring-white">
              <Image
                src="/images/amanda-30.png"
                alt="Amanda cumple 30"
                fill
                sizes="(min-width: 640px) 176px, 144px"
                className="scale-150 object-cover"
                style={{ objectPosition: "38% 34%" }}
                priority
              />
            </div>
          </div>
        </div>

        <h1 className="mt-8 text-2xl font-black uppercase tracking-tight text-[#c81e6b] sm:text-3xl">
          Amanda cumple 30
        </h1>
        <p className="bg-linear-to-r from-[#ff7a1a] to-[#ff2e93] bg-clip-text text-1xl font-black italic text-transparent sm:text-2xl">
          ¡y esto es pasarse el juego!
        </p>

        <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#7a3b1e] sm:text-base">
          Antes de saber dónde y cuándo, tienes que ganarte tu lugar. Y si quieres venir, tendrás que jugar. ¿Aceptas el reto?
        </p>

        <Link
          href="/juego"
          className="animate-pulse-glow mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#ff2e93] to-[#ff7a1a] text-base font-bold text-white shadow-lg transition-transform active:scale-95 sm:h-16 sm:text-lg"
        >
          Jugar el primer nivel 🎮
        </Link>
        <p className="mt-3 text-xs font-medium text-[#a15a2e] sm:text-sm">
          Supera los 4 niveles y desbloquea tu invitación
        </p>

        <div className="mt-8 flex w-full items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 text-left">
          <span className="text-xl">🔒</span>
          <p className="text-xs font-semibold text-[#c81e6b] sm:text-sm uppercase">
            todos los detalles bloqueados
          </p>
        </div>
      </main>
    </div>
  );
}
