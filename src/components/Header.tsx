'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartItemCount } from '@/stores/cartStore'
import { ShoppingCart } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const cartItemCount = useCartItemCount()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-premium-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container-custom">
        <div className="flex justify-between items-center py-6">
          {/* Premium Logo */}
          <Link href="/" className="flex items-center group">
            <Image 
              src="/brand-assets/logos/LP_Logos_Wordmark-Green.png" 
              alt="Lettuce Print"
              width={180}
              height={40}
              className="h-10 w-auto group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Premium Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            <Link 
              href="/services" 
              className={`font-medium transition-colors duration-300 ${isScrolled ? 'text-neutral-700 hover:text-lettuce-green' : 'text-neutral-700 hover:text-lettuce-green'}`}
            >
              Services
            </Link>
            <Link 
              href="/portfolio" 
              className={`font-medium transition-colors duration-300 ${isScrolled ? 'text-neutral-700 hover:text-lettuce-green' : 'text-neutral-700 hover:text-lettuce-green'}`}
            >
              Portfolio
            </Link>
            <Link 
              href="/about" 
              className={`font-medium transition-colors duration-300 ${isScrolled ? 'text-neutral-700 hover:text-lettuce-green' : 'text-neutral-700 hover:text-lettuce-green'}`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`font-medium transition-colors duration-300 ${isScrolled ? 'text-neutral-700 hover:text-lettuce-green' : 'text-neutral-700 hover:text-lettuce-green'}`}
            >
              Contact
            </Link>
          </nav>

          {/* Premium Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link 
              href="/cart" 
              className="relative p-2 text-neutral-700 hover:text-lettuce-green transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-lettuce-green text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Link 
              href="/quote" 
              className="btn-premium-primary px-8 py-3 text-sm"
            >
              Start Project
            </Link>
          </div>

          {/* Premium Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-lettuce-green focus:ring-opacity-50"
          >
            <svg className="w-6 h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Premium Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-premium-white/95 backdrop-blur-md rounded-2xl mt-4 p-6 border border-neutral-100 animate-premium-scale-in">
            <nav className="flex flex-col space-y-6">
              <Link 
                href="/services" 
                className="text-lg font-medium text-neutral-700 hover:text-lettuce-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/portfolio" 
                className="text-lg font-medium text-neutral-700 hover:text-lettuce-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link 
                href="/about" 
                className="text-lg font-medium text-neutral-700 hover:text-lettuce-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-lg font-medium text-neutral-700 hover:text-lettuce-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/cart" 
                className="flex items-center justify-center space-x-2 text-lg font-medium text-neutral-700 hover:text-lettuce-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Cart ({cartItemCount})</span>
              </Link>
              <Link 
                href="/quote" 
                className="btn-premium-primary w-full text-center py-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Start Your Project
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}