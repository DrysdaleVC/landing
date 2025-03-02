import type { Metadata } from "next"
import Head from "next/head"
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
      <Head>
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <link
          rel="icon"
          href="favicon-light.ico"
          type="image/x-icon"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="favicon.ico"
          type="image/x-icon"
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <body className="antialiased Root">{children}</body>
    </html>
  )
}
