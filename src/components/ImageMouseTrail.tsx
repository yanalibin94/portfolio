"use client";

import {
  createRef,
  useRef,
  type MouseEvent,
  type ReactNode,
  type RefObject,
  type TouchEvent,
} from "react";

type ImageMouseTrailProps = {
  items: string[];
  children?: ReactNode;
  className?: string;
  maxNumberOfImages?: number;
  imgClass?: string;
  distance?: number;
  fadeAnimation?: boolean;
};

export default function ImageMouseTrail({
  items,
  children,
  className,
  maxNumberOfImages = 5,
  imgClass = "w-40 h-48",
  distance = 20,
  fadeAnimation = false,
}: ImageMouseTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const refs = useRef<RefObject<HTMLImageElement | null>[]>(
    items.map(() => createRef<HTMLImageElement>()),
  );
  if (refs.current.length !== items.length) {
    refs.current = items.map(() => createRef<HTMLImageElement>());
  }
  const currentZIndexRef = useRef(1);
  const globalIndex = useRef(0);
  const last = useRef({ x: 0, y: 0 });

  const activate = (image: HTMLImageElement, x: number, y: number) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    image.style.left = `${x - containerRect.left}px`;
    image.style.top = `${y - containerRect.top}px`;

    if (currentZIndexRef.current > 40) {
      currentZIndexRef.current = 1;
    }
    image.style.zIndex = String(currentZIndexRef.current);
    currentZIndexRef.current += 1;
    image.dataset.status = "active";

    if (fadeAnimation) {
      window.setTimeout(() => {
        image.dataset.status = "inactive";
      }, 1500);
    }

    last.current = { x, y };
  };

  const deactivate = (image: HTMLImageElement) => {
    image.dataset.status = "inactive";
  };

  const handleOnMove = (clientX: number, clientY: number) => {
    const dx = clientX - last.current.x;
    const dy = clientY - last.current.y;
    if (Math.hypot(dx, dy) <= window.innerWidth / distance) return;

    const lead = refs.current[globalIndex.current % refs.current.length]?.current;
    const tail =
      refs.current[
        (globalIndex.current - maxNumberOfImages) % refs.current.length
      ]?.current;

    if (lead) activate(lead, clientX, clientY);
    if (tail) deactivate(tail);
    globalIndex.current += 1;
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className ?? ""}`}
      onMouseMove={(event: MouseEvent<HTMLDivElement>) =>
        handleOnMove(event.clientX, event.clientY)
      }
      onTouchMove={(event: TouchEvent<HTMLDivElement>) => {
        const touch = event.touches[0];
        if (touch) handleOnMove(touch.clientX, touch.clientY);
      }}
    >
      {items.map((item, index) => (
        <img
          key={`${item}-${index}`}
          ref={refs.current[index]}
          src={item}
          alt=""
          data-index={index}
          data-status="inactive"
          className={`pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 scale-0 object-contain opacity-0 transition-[transform,opacity] duration-300 data-[status=active]:scale-100 data-[status=active]:opacity-100 data-[status=active]:duration-500 data-[status=active]:ease-out ${imgClass}`}
        />
      ))}
      {children}
    </div>
  );
}
