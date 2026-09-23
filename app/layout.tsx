import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { themeScript } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "dybdev — Personal portfolio", template: "%s — dybdev" },
  description:
    "A personal portfolio exploring thoughtful design and purposeful code. Project and profile content is being prepared.",
  robots: { index: false, follow: false }, // Enable once real content is ready.
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body id="top" className="font-sans antialiased">
        <a
          href="#main"
          className="fixed top-4 left-4 z-50 -translate-y-24 bg-primary px-5 py-3 text-white focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <SmoothScroll />
      </body>
    </html>
  );
}
