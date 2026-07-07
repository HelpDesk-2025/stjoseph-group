import type { Metadata } from "next";
import { Poppins, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { getSiteContent } from "@/lib/data";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const company = await getSiteContent("company");
  const c = company as typeof company & {
    favicon?: string;
    ogImage?: string;
  };
  const title = `${company.name} — ${company.tagline}`;

  return {
    title: {
      default: title,
      template: `%s — ${company.name}`,
    },
    description: company.intro,
    keywords: [
      company.name,
      "holding company",
      "Philippines",
      "diversified group",
      "creating meaningful lives",
    ],
    ...(c.favicon ? { icons: { icon: c.favicon } } : {}),
    openGraph: {
      title,
      description: company.intro,
      type: "website",
      ...(c.ogImage ? { images: [{ url: c.ogImage }] } : {}),
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${robotoMono.variable}`}>
      <body className="bg-navy text-white antialiased">{children}</body>
    </html>
  );
}
