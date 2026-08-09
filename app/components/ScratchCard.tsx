"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ScratchCardProps = {
  children: React.ReactNode;
  onComplete?: () => void;
  className?: string;
  threshold?: number;
};

const BRUSH_RADIUS = 13;
const REVEAL_THRESHOLD_DEFAULT = 0.96;
const REVEAL_TO_COMPLETE_DELAY = 3500;

export default function ScratchCard({
  children,
  onComplete,
  className = "",
  threshold = REVEAL_THRESHOLD_DEFAULT,
}: ScratchCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isScratchingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const revealedRef = useRef(false);
  const moveCountRef = useRef(0);

  const [isRevealed, setIsRevealed] = useState(false);

  const drawOverlay = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = canvas;

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#ff7a1a");
    gradient.addColorStop(1, "#ff2e93");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(255,255,255,0.18)";
    ctx.font = `bold ${Math.max(14, width * 0.07)}px sans-serif`;
    ctx.textBaseline = "middle";
    const label = "RASCA AQUÍ ✨ ";
    const labelWidth = ctx.measureText(label).width;
    for (let y = 20; y < height; y += Math.max(14, width * 0.07) + 14) {
      for (let x = -labelWidth; x < width; x += labelWidth) {
        ctx.fillText(label, x, y);
      }
    }

    ctx.textAlign = "center";
    ctx.font = `bold ${Math.max(16, width * 0.09)}px sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText("RASCA LA TARJETA", width / 2, height / 2);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      drawOverlay(canvas);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => observer.disconnect();
  }, [drawOverlay]);

  const getPoint = (
    canvas: HTMLCanvasElement,
    clientX: number,
    clientY: number
  ) => {
    const rect = canvas.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const scratchAt = (
    ctx: CanvasRenderingContext2D,
    from: { x: number; y: number } | null,
    to: { x: number; y: number }
  ) => {
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = BRUSH_RADIUS * 2;

    ctx.beginPath();
    if (from) {
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    }
    ctx.arc(to.x, to.y, BRUSH_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  };

  const checkRevealProgress = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (revealedRef.current) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { width, height } = canvas;
      if (width === 0 || height === 0) return;

      const sampleStep = 6;
      const data = ctx.getImageData(0, 0, width, height).data;
      let transparent = 0;
      let total = 0;
      for (let y = 0; y < height; y += sampleStep) {
        for (let x = 0; x < width; x += sampleStep) {
          const alpha = data[(y * width + x) * 4 + 3];
          if (alpha < 32) transparent += 1;
          total += 1;
        }
      }

      if (total > 0 && transparent / total >= threshold) {
        revealedRef.current = true;
        setIsRevealed(true);
        window.setTimeout(() => {
          onComplete?.();
        }, REVEAL_TO_COMPLETE_DELAY);
      }
    },
    [onComplete, threshold]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (revealedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    isScratchingRef.current = true;
    const point = getPoint(canvas, e.clientX, e.clientY);
    lastPointRef.current = point;
    const ctx = canvas.getContext("2d");
    if (ctx) scratchAt(ctx, null, point);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratchingRef.current || revealedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const point = getPoint(canvas, e.clientX, e.clientY);
    scratchAt(ctx, lastPointRef.current, point);
    lastPointRef.current = point;

    moveCountRef.current += 1;
    if (moveCountRef.current % 4 === 0) {
      checkRevealProgress(canvas);
    }
  };

  const stopScratching = () => {
    isScratchingRef.current = false;
    lastPointRef.current = null;
    const canvas = canvasRef.current;
    if (canvas) checkRevealProgress(canvas);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-3xl ${className}`}
    >
      <div
        className={`absolute inset-0 select-none overflow-hidden rounded-3xl transition-[filter] duration-1000 ease-out ${
          isRevealed ? "blur-none" : "blur-md"
        }`}
      >
        {children}
      </div>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full touch-none rounded-3xl transition-opacity duration-700 ${
          isRevealed ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopScratching}
        onPointerLeave={stopScratching}
        onPointerCancel={stopScratching}
      />
    </div>
  );
}
