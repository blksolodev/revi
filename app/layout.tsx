import type { Metadata } from 'next'
import './styles.css'
import { ThemeProvider } from '@/components/theme-provider'
import { MorphPanel } from '@/components/ui/ai-input'
import { generateMetadata, generateOrganizationSchema, generateWebsiteSchema, generateServiceSchema } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: 'Professional Website Development & Design Services',
  description: 'Revi builds stunning, high-performance websites for businesses. From custom designs to e-commerce solutions, we deliver exceptional web development with affordable monthly maintenance. Get your professional website today.',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();
  const serviceSchema = generateServiceSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        {/* Verification tags (add your own) */}
        {/* <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" /> */}
        {/* <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" /> */}
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
            <div className="pointer-events-auto">
              <MorphPanel />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
