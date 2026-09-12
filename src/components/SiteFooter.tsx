import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto flex h-[clamp(5rem,6.3vw,7.5rem)] items-center justify-center border-t border-rule px-page">
      <p className="text-center text-[10px] leading-normal text-ink-soft">
        {site.footer.copyright}
      </p>
    </footer>
  );
}
