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
