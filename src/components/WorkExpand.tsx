import { site } from "@/content/site";

export function WorkExpand() {
  return (
    <section className="flex justify-center px-page py-[clamp(1.5rem,1.67vw,2rem)]">
      <p className="w-full max-w-[928px] font-mono text-intro text-ink">{site.intro}</p>
    </section>
  );
}
