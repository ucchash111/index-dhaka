import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  title: "Index Dhaka — The people building this city's future",
  description:
    "A curated network of founders, builders, researchers, operators, and high-agency people in Dhaka. High signal. Low noise.",
  openGraph: {
    title: "Index Dhaka",
    description: "Dhaka's curated builder network.",
    siteName: "Index Dhaka",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
