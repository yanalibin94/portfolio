import { site } from "@/content/site";

export function WorkExpand() {
  return (
    <section className="flex justify-center px-page py-[clamp(1.5rem,1.67vw,2rem)]">
      <div className="flex w-full max-w-[928px] flex-col items-start gap-8">
        <p className="font-mono text-intro text-ink">{site.intro}</p>

        <ul className="flex w-full flex-col gap-3">
          {site.work.map((item) => (
            <li key={item.slug} className="font-mono text-intro text-ink">
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
