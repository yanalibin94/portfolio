"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const TYPE_MS = 72;
const DELETE_MS = 42;
const HOLD_MS = 1500;
const GAP_MS = 320;

export function TypeCycle({ phrases }: { phrases: readonly string[] }) {
  const reduceMotion = useReducedMotion();
  const [text, setText] = useState(phrases[0] ?? "");
  const indexRef = useRef(0);

  useEffect(() => {
    if (reduceMotion || phrases.length === 0) {
      setText(phrases[0] ?? "");
      return;
    }

    let cancelled = false;
    let timeout = 0;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timeout = window.setTimeout(resolve, ms);
      });

    const run = async () => {
      setText("");
      while (!cancelled) {
        const phrase = phrases[indexRef.current];
        for (let i = 1; i <= phrase.length && !cancelled; i += 1) {
          setText(phrase.slice(0, i));
          await wait(TYPE_MS);
        }
        await wait(HOLD_MS);
        for (let i = phrase.length - 1; i >= 0 && !cancelled; i -= 1) {
          setText(phrase.slice(0, i));
          await wait(DELETE_MS);
        }
        await wait(GAP_MS);
        indexRef.current = (indexRef.current + 1) % phrases.length;
      }
    };

    void run();

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [phrases, reduceMotion]);

  return (
    <span className="inline-flex items-baseline justify-center">
      <span>{text}</span>
      <span
        className="type-caret ml-[0.12em] inline-block h-[0.78em] w-[0.42em] translate-y-[0.04em] bg-ink"
        aria-hidden
      />
    </span>
  );
}
