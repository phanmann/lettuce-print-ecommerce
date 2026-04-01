import type { Metadata } from 'next'
import './globals.css'

// Note: Fonts are loaded via CSS import in globals.css for the Brooklyn design system

export const metadata: Metadata = {
  title: {
    default: 'Lettuce Print | Print Shop & Graphic Design — Brooklyn, NYC',
    template: '%s | Lettuce Print'
  },
  description: 'Brooklyn\'s go-to print shop for businesses, restaurants, and brands across NYC. Business cards, banners, labels, flyers & graphic design. Uber delivery available.',
  keywords: 'print shop Brooklyn, printing services NYC, graphic design Brooklyn, business cards NYC, banner printing Brooklyn, die-cut stickers, roll labels NYC, same day printing Brooklyn, Uber delivery printing NYC',
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
    title: 'Lettuce Print | Brooklyn Print Shop & Graphic Design Studio',
    description: 'Brooklyn\'s go-to print shop for businesses, restaurants, and brands across NYC. Business cards, banners, labels, flyers & graphic design. Uber delivery available.',
    url: '/',
    siteName: 'Lettuce Print',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lettuce Print - Premium Brooklyn Printing Services',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lettuce Print | Brooklyn Print Shop & Graphic Design Studio',
    description: 'Brooklyn\'s go-to print shop for businesses, restaurants, and brands across NYC. Business cards, banners, labels, flyers & graphic design. Uber delivery available.',
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
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Lettuce Print",
              "description": "Full-service print shop and graphic design studio in Brooklyn, NY.",
              "url": "https://www.lettuceprint.com",
              "telephone": "+13476030557",
              "email": "info@lettuceprint.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "361 Stagg St",
                "addressLocality": "Brooklyn",
                "addressRegion": "NY",
                "postalCode": "11206",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 40.7069,
                "longitude": -73.9378
              },
              "openingHours": "Mo-Fr 09:00-18:00",
              "areaServed": ["Brooklyn", "Manhattan", "Queens", "Bronx", "Staten Island", "New York City"],
              "priceRange": "$$"
            })
          }}
        />
      </head>
      <body className="antialiased">
        {/* Brooklyn design system - no separate header/footer components needed */}
        {children}
      </body>
    </html>
  )
}