"use client";

import { motion } from "motion/react";

import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-[clamp(4.5rem,5.5vw,6.625rem)] w-full items-center justify-between bg-white/80 px-page backdrop-blur-md">
      <a
        href="#top"
        className="font-sans text-wordmark font-bold text-ink transition-opacity hover:opacity-60"
      >
        {site.name}
      </a>

      <motion.a
        href="#contact"
        className="flex h-[42px] min-w-[126px] items-center justify-center rounded-full border border-ink px-6 text-base font-medium text-ink transition-colors duration-300 hover:bg-ink hover:text-white"
        whileHover={{ y: -1 }}
        whileTap={{ y: 0, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        Contact
      </motion.a>
    </header>
  );
}
