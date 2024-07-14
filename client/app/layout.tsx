import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "gestalt/dist/gestalt.css";

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
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
