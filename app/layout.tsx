import type { Metadata } from 'next'
import './globals.css'
import Script from "next/script"

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
      <head>
        {/* Metadata dan tag lain jika perlu */}
      </head>
      <body suppressHydrationWarning>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LH72BBNN1T"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LH72BBNN1T');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}
