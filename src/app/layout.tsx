import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Drysdale Ventures",
  description: "Angel Investing for Bold Founders",
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
    <html lang="en" className="min-h-screen bg-black">
      <body className="antialiased Root">{children}</body>
    </html>
  )
}
