import type { Metadata } from "next";
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
  title: "SouzaLabz | Premium Electric Unicycle Upgrades",
  description: "Discover premium 3D-printed protective pads and custom upgrades for electric unicycles. Engineered for durability, comfort, and style. SouzaLabz - Elevate your ride.",
  keywords: ["electric unicycle", "EUC pads", "protective gear", "3D printed upgrades", "unicycle accessories", "custom pads"],
  authors: [{ name: "SouzaLabz" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "SouzaLabz | Premium Electric Unicycle Upgrades",
    description: "Discover premium 3D-printed protective pads and custom upgrades for electric unicycles. Engineered for durability, comfort, and style.",
    url: "https://souzalabz.com",
    siteName: "SouzaLabz",
    images: [
      {
        url: "/SouzaLabzLogo1.png",
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
    description: "Discover premium 3D-printed protective pads and custom upgrades for electric unicycles. Engineered for durability, comfort, and style.",
    images: ["/SouzaLabzLogo1.png"],
  },
  viewport: "width=device-width, initial-scale=1.0",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
