import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import { KIT_VERSION, SITE_URL } from "@/content/kit";
import "./globals.css";

const body = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-body", display: "swap" });
const display = Oswald({ subsets: ["latin", "cyrillic"], variable: "--font-display", display: "swap" });

const title = "AI Project Starter Kit — проект помнит, даже если чат нет";
const description = "Бесплатная система памяти для проектов с AI-помощниками: цель, правила, решения и статус хранятся в файлах, а любой агент продолжает работу с того же места.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: "AI Project Starter Kit",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AI Project Starter Kit",
    description: "Проект помнит. Даже если чат — нет.",
    url: "/",
    siteName: "AI Project Starter Kit",
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 675, alt: "AI Project Starter Kit — проект помнит, даже если чат нет" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Project Starter Kit",
    description: "Проект помнит. Даже если чат — нет.",
    images: ["/og.jpg"],
  },
  other: { "starter-kit-version": KIT_VERSION },
};

export const viewport: Viewport = {
  themeColor: "#080b0b",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: "AI Project Starter Kit",
  description,
  codeRepository: "https://github.com/webuzateam/Starter-kit",
  license: "https://opensource.org/licenses/MIT",
  version: KIT_VERSION,
  inLanguage: "ru",
  url: SITE_URL,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${body.variable} ${display.variable}`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
