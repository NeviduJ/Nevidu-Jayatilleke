import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nevidu Jayatilleke | NLP Researcher",
  description: "Personal website of Nevidu Jayatilleke, a Postgraduate Researcher specializing in Natural Language Processing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50`}>
        {children}
      </body>
    </html>
  );
}
