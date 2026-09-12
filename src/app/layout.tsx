import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Jacquard_24, Tiny5 } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const tiny5 = Tiny5({
  variable: "--font-tiny5",
  subsets: ["latin"],
  weight: "400",
});

const jacquard = Jacquard_24({
  variable: "--font-jacquard",
  subsets: ["latin"],
  weight: "400",
});

const plex = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yanalibina.com"),
  title: "Yana Libina — Product Designer",
  description:
    "I turn technical systems into simple, useful experiences. Product design for complex, technical products.",
  openGraph: {
    title: "Yana Libina — Product Designer",
    description:
      "I turn technical systems into simple, useful experiences. Product design for complex, technical products.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${tiny5.variable} ${jacquard.variable} ${plex.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
