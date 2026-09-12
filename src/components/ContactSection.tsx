import { site } from "@/content/site";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="flex scroll-mt-32 flex-col items-center gap-[13px] px-page py-[clamp(4rem,6.25vw,7.5rem)] text-center"
    >
      <h2 className="font-display text-cta text-ink">{site.contact.heading}</h2>
      <p className="max-w-[767px] font-mono text-intro text-ink">
        {site.contact.lead}
        <a
          href={`mailto:${site.email}`}
          className="font-semibold italic text-link underline decoration-solid underline-offset-4"
        >
          {site.contact.link}
        </a>
      </p>
    </section>
  );
}
