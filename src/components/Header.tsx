'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartItemCount } from '@/stores/cartStore'
import { ShoppingCart, ChevronDown } from 'lucide-react'

interface NavItem {
  name: string
  href?: string
  items?: Array<{
    name: string
    href: string
    description?: string
  }>
}

const navigation: NavItem[] = [
  {
    name: 'Marketing Materials',
    items: [
      { name: 'Business Cards', href: '/products/business-cards', description: 'Professional business cards' },
      { name: 'Flyers', href: '/products/flyers', description: 'Eye-catching promotional flyers' },
      { name: 'Brochures', href: '/products/brochures', description: 'Detailed product brochures' },
      { name: 'Postcards', href: '/products/postcards', description: 'Direct mail postcards' }
    ]
  },
  {
    name: 'Stickers & Labels',
    items: [
      { name: 'Die-Cut Stickers', href: '/products/die-cut-stickers', description: 'Custom shaped stickers' },
      { name: 'Roll Labels', href: '/products/roll-labels', description: 'Product labeling solutions' }
    ]
  },
  {
    name: 'Boxes & Packaging',
    items: [
      { name: 'Custom Boxes', href: '/products/custom-boxes', description: 'Product packaging boxes' },
      { name: 'Mailers', href: '/products/mailers', description: 'Shipping packaging' },
      { name: 'Folders', href: '/products/folders', description: 'Presentation folders' }
    ]
  },
  {
    name: 'Signs & Banners',
    items: [
      { name: 'Vinyl Banners', href: '/products/vinyl-banners', description: 'Outdoor advertising banners' },
      { name: 'Yard Signs', href: '/products/yard-signs', description: 'Corrugated plastic signs' },
      { name: 'Window Clings', href: '/products/window-clings', description: 'Static cling window decals' }
    ]
  },
  {
    name: 'Apparel & Promo',
    items: [
      { name: 'T-Shirts', href: '/products/t-shirts', description: 'Custom printed apparel' },
      { name: 'Promotional Items', href: '/products/promotional-items', description: 'Branded merchandise' },
      { name: 'Magnets', href: '/products/magnets', description: 'Custom promotional magnets' }
    ]
  }
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const cartItemCount = useCartItemCount()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDropdownEnter = (name: string) => {
    setActiveDropdown(name)
  }

  const handleDropdownLeave = () => {
    setActiveDropdown(null)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image 
              src="/brand-assets/logos/LP_Logos_Wordmark-Green.png" 
              alt="Lettuce Print"
              width={160}
              height={36}
              className="h-9 w-auto group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(item.name)}
                onMouseLeave={handleDropdownLeave}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                )}

                {/* Dropdown Menu */}
                {item.items && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
                      >
                        <div className="font-medium text-gray-900">{subItem.name}</div>
                        {subItem.description && (
                          <div className="text-sm text-gray-500 mt-1">{subItem.description}</div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              href="/cart" 
              className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Link 
              href="/quote" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-blue-600 hover:text-blue-700 font-medium px-4 py-2 block transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <>
                      <div className="text-blue-600 font-medium px-4 py-2">
                        {item.name}
                      </div>
                      {item.items && (
                        <div className="ml-4 space-y-2">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block text-gray-700 hover:text-blue-600 px-4 py-2 transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
              
              <div className="border-t border-gray-200 pt-4 px-4">
                <Link
                  href="/cart"
                  className="flex items-center text-gray-700 hover:text-blue-600 py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart ({cartItemCount})
                </Link>
                <Link
                  href="/quote"
                  className="block bg-orange-500 hover:bg-orange-600 text-white text-center py-3 px-4 rounded-lg font-medium mt-4 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Quote
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}