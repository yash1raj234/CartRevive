import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import SmoothScroll from '@/components/SmoothScroll'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CartRevive — AI-Powered Cart Recovery',
  description:
    'CartRevive automatically recovers abandoned carts with AI-written emails. One script tag. Any platform. Zero setup cost.',
  openGraph: {
    title: 'CartRevive — AI-Powered Cart Recovery',
    description: 'Recover abandoned carts with AI. One script tag. Any platform.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
