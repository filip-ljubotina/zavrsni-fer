import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MedTrack App",
  description: "App For Tracking Medical Devices",
  icons:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhvc3BpdGFsIj48cGF0aCBkPSJNMTIgNnY0Ii8+PHBhdGggZD0iTTE0IDE0aC00Ii8+PHBhdGggZD0iTTE0IDE4aC00Ii8+PHBhdGggZD0iTTE0IDhoLTQiLz48cGF0aCBkPSJNMTggMTJoMmEyIDIgMCAwIDEgMiAydjZhMiAyIDAgMCAxLTIgMkg0YTIgMiAwIDAgMS0yLTJ2LTlhMiAyIDAgMCAxIDItMmgyIi8+PHBhdGggZD0iTTE4IDIyVjRhMiAyIDAgMCAwLTItMkg4YTIgMiAwIDAgMC0yIDJ2MTgiLz48L3N2Zz4=",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`overflow-y-hidden ${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
