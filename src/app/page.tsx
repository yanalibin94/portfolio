import { ContactSection } from "@/components/ContactSection";
import { Hero } from "@/components/Hero";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WorkExpand } from "@/components/WorkExpand";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="flex-1">
        <Hero />
        <WorkExpand />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
