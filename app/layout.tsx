import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components";
import Providers from "@/Providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import 'svgmap/dist/svgMap.min.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shree Prathmesh Engineering - Professional PCB Manufacturing",
  description: "Leading PCB manufacturer specializing in single layer, multi-layer, flex, and rigid-flex printed circuit boards. Quality PCB prototypes and production runs.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <Providers session={session}>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
