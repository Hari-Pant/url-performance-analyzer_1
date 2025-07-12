import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'URL Performance Analyzer',
  description: 'Created with Hari ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
