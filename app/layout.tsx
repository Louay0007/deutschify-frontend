import React from "react"
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Deutschify | Master German B2. Pass with Confidence.',
  description:
    'Interactive German B2 exam prep for Tunisian students. Practice Lesen, Sprachbausteine, Hören, Schreiben, and Mündlich with structured lessons, instant feedback, and progress tracking.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className="overflow-x-clip">
      <body className="overflow-x-clip font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
