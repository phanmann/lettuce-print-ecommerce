'use client'

import Link from 'next/link'
import { Menu, ShoppingCart, X } from 'lucide-react'
import { useState } from 'react'
import { useCartItemCount } from '@/stores/cartStore'

const quickShopLinks = [
  { label: 'Business Cards', href: '/products/business-cards' },
  { label: 'Flyers', href: '/products/flyers' },
  { label: 'Roll Labels', href: '/products/roll-labels' },
  { label: 'Vinyl Banners', href: '/products/vinyl-banners' },
]

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Shop', href: '/products' },
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const cartItemCount = useCartItemCount()

  return (
    <header className="lp-header">
      <div className="lp-shell lp-nav-shell">
        <Link href="/" className="lp-logo" aria-label="Lettuce Print home">
          <span className="lp-logo-mark">🥬</span>
          <span>Lettuce Print</span>
        </Link>

        <nav className="lp-nav desktop-only" aria-label="Primary">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="lp-nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="lp-nav-actions desktop-only">
          <Link href="/cart" className="lp-cart-link" aria-label="View cart">
            <ShoppingCart size={18} />
            <span>Cart</span>
            {cartItemCount > 0 ? <span className="lp-cart-badge">{cartItemCount}</span> : null}
          </Link>
          <Link href="/quote" className="lp-btn lp-btn-dark">
            Get a Quote
          </Link>
        </div>

        <button
          type="button"
          className="lp-mobile-toggle mobile-only"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open ? (
        <div className="lp-mobile-menu mobile-only">
          <div className="lp-shell lp-mobile-menu-inner">
            <div className="lp-mobile-menu-group">
              {navLinks.map((item) => (
                <Link key={item.href} href={item.href} className="lp-mobile-link" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="lp-mobile-divider" />

            <div className="lp-mobile-menu-group">
              <p className="lp-mobile-label">Quick shop</p>
              {quickShopLinks.map((item) => (
                <Link key={item.href} href={item.href} className="lp-mobile-sublink" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="lp-mobile-actions">
              <Link href="/cart" className="lp-btn lp-btn-outline" onClick={() => setOpen(false)}>
                Cart{cartItemCount > 0 ? ` (${cartItemCount})` : ''}
              </Link>
              <Link href="/quote" className="lp-btn lp-btn-dark" onClick={() => setOpen(false)}>
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
