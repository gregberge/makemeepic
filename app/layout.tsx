import type { Metadata } from "next";
import { Caudex, IM_Fell_English } from "next/font/google";
import "./globals.css";
import PlausibleProvider from "next-plausible";

const im = IM_Fell_English({
  weight: "400",
  variable: "--font-im",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

const caudex = Caudex({
  weight: "400",
  variable: "--font-caudex",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Make me Epic - Generate epic titles from your CV",
  description:
    "Generate epic titles from your LinkedIn CV, become the Mother of Dragons or the King of the North.",
  twitter: {
    card: "summary_large_image",
    creator: "@gregberge_",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${im.variable} ${caudex.variable} font-im text-white bg-[#011A46]`}
    >
      <head>
        <PlausibleProvider domain="makemeepic.app" />
      </head>
      <body>{children}</body>
    </html>
  );
}
