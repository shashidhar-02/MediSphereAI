import type { Metadata, Viewport } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata: Metadata = {
  title: 'MediSphere AI — Hospital Operations Intelligence Platform',
  description: 'Autonomous Multi-Agent AI platform for real-time hospital operations management, bed intelligence, emergency response, and predictive analytics.',
  keywords: 'hospital management, AI, healthcare, bed management, emergency response, analytics',
  authors: [{ name: 'MediSphere AI Team' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f0f18',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased font-sans">{children}</body>
    </html>
  )
}
