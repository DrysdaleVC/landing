import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Drysdale Ventures",
  description: "Angel Investing for Bold Founders",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-black">
      <body className="antialiased Root">{children}</body>
    </html>
  )
}
