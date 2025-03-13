import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Drysdale Ventures",
  description: "Backing software companies from day 0",
  icons: [
    {
      media: "(prefers-color-scheme: light)",
      url: "/icon-light.svg",
      type: "image/svg+xml",
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: "/icon-dark.svg",
      type: "image/svg+xml",
    },
  ],
  openGraph: {
    title: "Drysdale Ventures",
    description: "Backing software companies from day 0",
    url: "https://drysdale.vc",
    siteName: "Drysdale Ventures",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Drysdale Ventures",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Drysdale Ventures",
    description: "Backing software companies from day 0",
    images: ["/opengraph-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="min-h-screen bg-background">
      <body className="antialiased Root">{children}</body>
    </html>
  )
}
