import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Revi - AI-Powered Website Enhancement Platform',
  description: 'Transform your website with AI agents, appointment booking, and intelligent optimization. Never miss a customer with Revi\'s 24/7 AI assistance.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
