import type { Metadata } from 'next'
import './styles.css'
import { ThemeProvider } from '@/components/theme-provider'
// import { MorphPanel } from '@/components/ui/ai-input' // Temporarily disabled due to syntax error

export const metadata: Metadata = {
  title: 'Revi - Premium Web Development & Design',
  description: 'Transform your business with high-quality website development. Custom designs, AI integration, e-commerce solutions, and ongoing support to help your business grow.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {/* AI Panel temporarily disabled - will fix syntax error */}
          {/* <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
            <div className="pointer-events-auto">
              <MorphPanel />
            </div>
          </div> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
