import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rate My Mate',
  description: 'Find honest reviews from past partners. Make more informed decisions about your dating life.',
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
