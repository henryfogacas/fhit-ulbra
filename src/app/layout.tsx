import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/shared/config/providers";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fhit — Acompanhamento de Saúde e Treinos",
  description:
    "Organize treinos, hábitos, peso e IMC em uma única plataforma. Acompanhe sua evolução de forma clara e motivadora.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`${montserrat.className} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f7f8f7] text-foreground">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
