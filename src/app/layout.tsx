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
    <html lang="en" className="bg-black">
      {/* <Head>
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
      </Head> */}
      <body className="antialiased Root">{children}</body>
    </html>
  )
}
