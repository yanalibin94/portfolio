"use client";

import { motion, useReducedMotion } from "motion/react";

import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import ImageMouseTrail from "@/components/ImageMouseTrail";
import { site } from "@/content/site";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <ImageMouseTrail
      items={site.trail}
      maxNumberOfImages={5}
      distance={16}
      imgClass="h-36 w-28 sm:h-48 sm:w-40"
      className="flex flex-col items-center px-page pt-[clamp(1.75rem,2.24vw,2.6875rem)] pb-[clamp(2rem,4vw,4.5rem)]"
    >
      <motion.div
        className="mb-6 flex flex-col items-center gap-1 text-center"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="flex flex-col items-center gap-0 font-display text-ink">
          <span className="block text-hola leading-none">{site.hero.greeting}</span>
          <span className="block text-yana leading-none">{site.hero.name}</span>
        </h1>
        <p className="whitespace-nowrap font-script text-since leading-none text-ink">
          {site.hero.since}
        </p>
      </motion.div>

      <div className="w-full max-w-[960px]">
        <BeforeAfterSlider />
      </div>

      <div className="mt-[clamp(1.5rem,2.4vw,2.75rem)] h-[67px] w-px bg-ink" aria-hidden />
    </ImageMouseTrail>
  );
}
