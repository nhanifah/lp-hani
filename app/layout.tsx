import type { Metadata } from 'next'
import './globals.css'
import Head from "next/head"

export const metadata: Metadata = {
  title: 'Nurhayatul Hanifah - Biodiversity Researcher',
  description: 'Biodiversity Researcher and Conservation Advocate',
  keywords: 'Biodiversity, Conservation, Research, Ecology, Environmental Science',
  authors: [{ name: 'Nurhayatul Hanifah', url: 'https://nurhayatulhanifah.com' }],
  creator: 'Nurhayatul Hanifah',
  publisher: 'Nurhayatul Hanifah',
  openGraph: {
    title: 'Nurhayatul Hanifah - Biodiversity Researcher',
    description: 'Biodiversity Researcher and Conservation Advocate',
    url: 'https://nurhayatulhanifah.com',
    siteName: 'Nurhayatul Hanifah',
    images: [
      {
        url: 'https://nurhayatulhanifah.com/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nurhayatul Hanifah - Biodiversity Researcher',
      },
    ],
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LH72BBNN1T"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LH72BBNN1T');
            `,
          }}
        />
      </Head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
