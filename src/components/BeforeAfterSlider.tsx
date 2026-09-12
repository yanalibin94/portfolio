"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { site } from "@/content/site";

export function BeforeAfterSlider() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(50);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    setPercent((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (!dragging.current) return;
      setFromClientX(event.clientX);
    };
    const end = () => {
      dragging.current = false;
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
  }, [setFromClientX]);

  const start = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    setFromClientX(event.clientX);
  };

  return (
    <div
      ref={frameRef}
      className="compare relative w-full cursor-ew-resize overflow-hidden bg-white outline-none select-none [-webkit-tap-highlight-color:transparent]"
      style={{ aspectRatio: "1196 / 470" }}
      onPointerDown={start}
      role="slider"
      aria-label="Compare childhood and today"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(percent)}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") setPercent((value) => Math.max(0, value - 4));
        if (event.key === "ArrowRight") setPercent((value) => Math.min(100, value + 4));
      }}
    >
      {/* Both photos stay full-size. Only the top layer's clip-path changes. */}
      <img
        src={site.slider.base.src}
        alt={site.slider.base.alt}
        draggable={false}
        className="absolute inset-0 size-full border-0 object-cover outline-none"
      />
      <img
        src={site.slider.top.src}
        alt={site.slider.top.alt}
        draggable={false}
        className="absolute inset-0 size-full border-0 object-cover outline-none"
        style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
      />
      <div
        className="pointer-events-none absolute top-0 bottom-0 z-[3] w-[3px] -translate-x-1/2 bg-white"
        style={{ left: `${percent}%` }}
      />
      <div
        className="pointer-events-none absolute top-1/2 z-[4] flex -translate-x-1/2 -translate-y-1/2 items-center gap-1"
        style={{ left: `${percent}%` }}
        aria-hidden
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5 drop-shadow-[0_0_2px_rgba(0,0,0,0.35)]"
        >
          <polyline points="15 6 9 12 15 18" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5 drop-shadow-[0_0_2px_rgba(0,0,0,0.35)]"
        >
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </div>
    </div>
  );
}
