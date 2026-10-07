import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ExperienceShell } from "@/components/shell/ExperienceShell";

const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = "https://aayushneupane-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aayush Neupane — Cybersecurity × Engineering × Chess",
    template: "%s — Aayush Neupane",
  },
  description:
    "Aayush Neupane is a Computer Engineering student and cybersecurity enthusiast from Nepal building secure systems, exploring offensive and defensive security, and thinking several moves ahead.",
  keywords: [
    "Aayush Neupane",
    "cybersecurity",
    "computer engineering",
    "chess",
    "Nepal",
    "portfolio",
    "intrusion detection",
    "network security",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Aayush Neupane",
    title: "Aayush Neupane — Cybersecurity × Engineering × Chess",
    description:
      "Think like a chess player. Defend like a security engineer. Portfolio of Aayush Neupane — Computer Engineering student, cybersecurity, chess.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aayush Neupane — Cybersecurity × Engineering × Chess",
    description:
      "Think like a chess player. Defend like a security engineer.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${inter.variable} ${jetbrains.variable} h-full`}
    >
      <body className="grain min-h-full antialiased">
        <ExperienceShell>{children}</ExperienceShell>
      </body>
    </html>
  );
}
