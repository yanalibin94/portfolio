"use client";

import { motion } from "motion/react";
import { useState } from "react";

import { site } from "@/content/site";

export function WorkExpand() {
  const [activeImage, setActiveImage] = useState<number | null>(0);

  return (
    <section className="flex justify-center px-page py-[clamp(1.5rem,1.67vw,2rem)]">
      <div className="flex w-full max-w-[928px] flex-col items-start gap-3">
        <div className="w-full pb-6">
          <p className="font-mono text-intro text-ink">{site.intro}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex w-full flex-col gap-3"
        >
          {site.work.map((item, index) => {
            const active = activeImage === index;
            return (
              <motion.button
                key={item.slug}
                type="button"
                className="relative w-full cursor-pointer overflow-hidden text-left"
                style={{ background: item.background }}
                initial={false}
                animate={{
                  height: active ? "clamp(16rem, 25.36vw, 30.4375rem)" : "4.9375rem",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                onClick={() => setActiveImage(index)}
                onHoverStart={() => setActiveImage(index)}
                aria-expanded={active}
                aria-label={item.title}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
