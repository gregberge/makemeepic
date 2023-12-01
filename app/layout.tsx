import type { Metadata } from "next";
import { IM_Fell_English } from "next/font/google";
import "./globals.css";

const im = IM_Fell_English({
  weight: "400",
  variable: "--font-im",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Make me Epic - Generate epic titles from your CV",
  description:
    "Generate epic titles from your LinkedIn CV, become the Mother of Dragons or the King of the North.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${im.variable} font-im text-white bg-[#011A46]`}
    >
      <body>{children}</body>
    </html>
  );
}
