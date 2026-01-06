import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://souzalabz.com"),
  title: "SouzaLabz | Premium Electric Unicycle Upgrades",
  description: "No paywalls. No locks. Every file runs free, they're meant to be remixed, reworked, and pushed harder by the community. We build better when everyone has access.",
  keywords: ["electric unicycle", "EUC pads", "protective gear", "3D printed upgrades", "unicycle accessories", "custom pads"],
  authors: [{ name: "SouzaLabz" }],
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    title: "SouzaLabz | Premium Electric Unicycle Upgrades",
    description: "No paywalls. No locks. Every file runs free, they're meant to be remixed, reworked, and pushed harder by the community. We build better when everyone has access.",
    url: "https://souzalabz.com",
    siteName: "SouzaLabz",
    images: [
      {
        url: "/SouzaLabzLogo3.png",
        width: 1200,
        height: 630,
        alt: "SouzaLabz Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SouzaLabz | Premium Electric Unicycle Upgrades",
    description: "No paywalls. No locks. Every file runs free, they're meant to be remixed, reworked, and pushed harder by the community. We build better when everyone has access.",
    images: ["/SouzaLabzLogo3.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} crt`}>
        {/* Neon grid + drifting plasma */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(115,255,210,0.12),transparent_32%),radial-gradient(circle_at_82%_0%,rgba(255,71,171,0.12),transparent_30%)]" />
          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(115,255,210,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,71,171,0.12)_1px,transparent_1px)] bg-[size:70px_70px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/75 to-black" />
          <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl animate-[drift_9s_ease-in-out_infinite]" />
          <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl animate-[drift_12s_ease-in-out_infinite]" />
          <div className="absolute left-1/2 top-32 h-40 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/50 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-3 rounded-md border border-transparent px-2 py-1 transition hover:border-white/15 hover:bg-white/5">
              <div className="relative h-11 w-11 overflow-hidden rounded-lg border border-white/20 bg-gradient-to-br from-emerald-500/10 via-black to-fuchsia-600/10">
                <Image
                  src="/SouzaLabzLogo3.jpg"
                  alt="SouzaLabz logo"
                  fill
                  className="object-cover"
                  sizes="44px"
                  priority
                />
              </div>
              <div className="leading-tight">
                <div className="glow font-mono text-sm tracking-[0.24em]">SOUZALABZ</div>
                <div className="hidden font-mono text-[11px] uppercase text-white/60 sm:block">Open Hardware Archive</div>
              </div>
            </Link>

            <nav className="flex items-center gap-1 font-mono text-xs text-white/75 sm:gap-4">
              <a className="rounded-md border border-transparent px-1.5 py-1 transition hover:border-white/25 hover:text-white sm:px-2" href="#models">Vault</a>
              <a className="rounded-md border border-transparent px-1.5 py-1 transition hover:border-white/25 hover:text-white sm:px-2" href="#about">About</a>
              <a
                className="rounded-md border border-transparent px-1.5 py-1 transition hover:border-white/25 hover:text-white sm:px-2"
                href="https://cults3d.com/en/NikkaSouza"
                target="_blank"
                rel="noreferrer"
              >
                Cults3D ↗
              </a>
              <a
                className="hidden rounded-md border border-transparent px-1.5 py-1 transition hover:border-fuchsia-400/40 hover:text-white sm:inline-flex sm:px-2"
                href="https://t.me/souzalabzchat"
                target="_blank"
                rel="noreferrer"
                aria-label="Join the SouzaLabz Telegram chat"
              >
                Telegram ↗
              </a>
            </nav>
          </div>
          <div className="border-t border-white/5 bg-gradient-to-r from-emerald-500/15 via-transparent to-fuchsia-500/15">
            <div className="mx-auto flex max-w-6xl items-center gap-4 overflow-x-auto px-4 py-2 font-mono text-[11px] uppercase text-white/60">
              <span className="flex items-center gap-2 text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                Signal: Live
              </span>
              <span className="hidden sm:inline text-white/50">|</span>
              <span className="glow text-white/80">Data stream secured</span>
              <span className="hidden sm:flex items-center gap-2 text-white/55">
                <span className="h-[2px] w-14 bg-gradient-to-r from-emerald-300 via-cyan-400 to-fuchsia-500" />
                v2.9 grid firmware
              </span>
            </div>
          </div>
        </header>

        {children}

        <footer className="mx-auto max-w-6xl px-4 pb-10 pt-6 text-center font-mono text-xs text-white/60">
          <div className="mb-1 glow text-white/80">© {new Date().getFullYear()} SOUZALABZ</div>
          <div className="opacity-80">built in the noise ✦ printed in TPU</div>
        </footer>
      </body>
    </html>
  );
}
