import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "gestalt/dist/gestalt.css";
import Providers from "./providers";
import localFont from "next/font/local";

// Font files can be colocated inside of `app`
const heyComicFont = localFont({
  src: "./hey_comic.otf",
  display: "swap",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ninja Typing!",
  description: "Learning typing like a ninja!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={heyComicFont.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
