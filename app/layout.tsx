import { Inter } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components";
import Providers from "@/Providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import 'svgmap/dist/svgMap.min.css';
import { siteMetadata } from "@/lib/siteMetadata";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);
  return (
    <html lang="en" data-theme="light">
      <head>
        <meta name="description" content={siteMetadata.description} />
        <meta name="keywords" content={siteMetadata.keywords.join(", ")} />
        <meta property="og:title" content={siteMetadata.openGraph.title} />
        <meta property="og:description" content={siteMetadata.openGraph.description} />
        <meta property="og:type" content={siteMetadata.openGraph.type} />
        <meta property="og:url" content={siteMetadata.openGraph.url} />
        <meta property="og:image" content={siteMetadata.openGraph.images[0].url} />
        <meta name="twitter:card" content={siteMetadata.twitter.card} />
        <meta name="twitter:title" content={siteMetadata.twitter.title} />
        <meta name="twitter:description" content={siteMetadata.twitter.description} />
        <meta name="twitter:image" content={siteMetadata.twitter.images[0]} />
        <link rel="icon" href="/logo%20v1.png" type="image/png" />
      </head>
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
