import Link from 'next/link'

const serviceLinks = [
  { label: 'Business Cards', href: '/products/business-cards' },
  { label: 'Flyers', href: '/products/flyers' },
  { label: 'Roll Labels', href: '/products/roll-labels' },
  { label: 'Vinyl Banners', href: '/products/vinyl-banners' },
  { label: 'Packaging', href: '/products/custom-boxes' },
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Quote', href: '/quote' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="lp-footer">
      <div className="lp-shell lp-footer-grid">
        <div>
          <Link href="/" className="lp-logo lp-footer-logo">
            <span className="lp-logo-mark">🥬</span>
            <span>Lettuce Print</span>
          </Link>
          <p className="lp-footer-copy">
            Brooklyn&apos;s print shop and creative production partner. Fast turnaround, cleaner design,
            and easier online ordering for the products customers buy most.
          </p>
          <div className="lp-footer-contact-list">
            <a href="tel:+13476030557">(347) 603-0557</a>
            <a href="mailto:info@lettuceprint.com">info@lettuceprint.com</a>
            <span>361 Stagg St, Brooklyn, NY 11206</span>
          </div>
        </div>

        <div>
          <p className="lp-footer-heading">Shop</p>
          <div className="lp-footer-links">
            {serviceLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="lp-footer-heading">Company</p>
          <div className="lp-footer-links">
            {companyLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="lp-shell lp-footer-bottom">
        <p>© 2026 Lettuce Print. All rights reserved.</p>
        <div className="lp-footer-bottom-links">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
