import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Lettuce Print - Brooklyn\'s Premier Printing Service',
    template: '%s | Lettuce Print'
  },
  description: 'Professional B2B printing services in Brooklyn. Business cards, flyers, banners, and more with local expertise and fast turnaround.',
  keywords: 'printing, Brooklyn, business cards, flyers, banners, B2B printing, local printing',
  authors: [{ name: 'Lettuce Print' }],
  creator: 'Lettuce Print',
  publisher: 'Lettuce Print',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://lettuceprint.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Lettuce Print - Brooklyn\'s Premier Printing Service',
    description: 'Professional B2B printing services in Brooklyn. Business cards, flyers, banners, and more with local expertise and fast turnaround.',
    url: '/',
    siteName: 'Lettuce Print',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lettuce Print - Brooklyn Printing Services',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lettuce Print - Brooklyn\'s Premier Printing Service',
    description: 'Professional B2B printing services in Brooklyn. Business cards, flyers, banners, and more with local expertise and fast turnaround.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}