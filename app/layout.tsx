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
  metadataBase: new URL("https://makemeepic.app/"),
  title: "Make me Epic - Turn your LinkedIn profile into Legendary Titles!",
  description:
    "AI powered generator that turns your LinkedIn profile into Epic Titles, become the Mother of Dragons or the King of the North.",
  openGraph: {
    images: ["/assets/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@gregberge_",
    images: ["/assets/og-image.png"],
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
