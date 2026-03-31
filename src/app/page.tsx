'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener('mousemove', updateMousePosition)
      
      return () => {
        heroElement.removeEventListener('mousemove', updateMousePosition)
      }
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Premium Hero Section */}
      <section 
        ref={heroRef}
        className="section-hero premium-gradient-light relative overflow-hidden"
      >
        <div className="container-narrow relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-premium-fade-in">
            <h1 className="text-editorial-hero text-neutral-900 mb-8">
              Brooklyn's
              <span className="block text-lettuce-green">Creative Partner</span>
              for Premium Print
            </h1>
            <p className="text-premium-lead mb-12 max-w-2xl mx-auto">
              We transform your vision into tangible excellence. From business cards that command attention to marketing materials that tell your story with sophistication.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/quote" className="btn-premium-primary text-lg px-12 py-5">
                Start Your Project
              </Link>
              <Link href="/services" className="text-lettuce-green font-medium text-lg hover:text-lettuce-dark transition-colors">
                Explore Our Work →
              </Link>
            </div>
          </div>
        </div>
        
        {/* Premium Background Elements with Cursor Following */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Cursor-following green circle */}
          <div 
            className="absolute w-96 h-96 bg-lettuce-green opacity-5 rounded-full blur-3xl transition-transform duration-300 ease-out"
            style={{
              transform: `translate3d(${mousePosition.x * 0.1 - 192}px, ${mousePosition.y * 0.1 - 192}px, 0)`,
              left: '25%',
              top: '25%',
            }}
          />
          
          {/* Static background circle */}
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-lettuce-green opacity-3 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Premium Services Section */}
      <section className="section-premium bg-premium-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-editorial-large text-neutral-900 mb-6">
              Crafted with
              <span className="text-lettuce-green"> Precision</span>
            </h2>
            <p className="text-premium-body">
              Every piece we create is a testament to our commitment to excellence. From the first design consultation to the final delivery, we ensure your brand is represented with the sophistication it deserves.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Business Cards */}
            <div className="group">
              <div className="bg-white p-8 premium-card-shadow hover:premium-card-shadow-hover transition-all duration-300 group-hover:scale-105">
                <div className="text-lettuce-green mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2 0v2h16V6H4zm0 4v8h16v-8H4z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Business Cards</h3>
                <p className="text-neutral-600 mb-4">
                  Premium cardstock with sophisticated finishes that make the perfect first impression.
                </p>
                <Link href="/products/business-cards" className="text-lettuce-green font-medium hover:text-lettuce-dark transition-colors">
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Brochures */}
            <div className="group">
              <div className="bg-white p-8 premium-card-shadow hover:premium-card-shadow-hover transition-all duration-300 group-hover:scale-105">
                <div className="text-lettuce-green mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 2a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 2h16v16H4V4zm2 2v2h12V6H6zm0 4v2h12v-2H6zm0 4v2h8v-2H6z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Brochures & Flyers</h3>
                <p className="text-neutral-600 mb-4">
                  Eye-catching marketing materials that communicate your message with clarity and style.
                </p>
                <Link href="/products/brochures" className="text-lettuce-green font-medium hover:text-lettuce-dark transition-colors">
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Roll Labels */}
            <div className="group">
              <div className="bg-white p-8 premium-card-shadow hover:premium-card-shadow-hover transition-all duration-300 group-hover:scale-105">
                <div className="text-lettuce-green mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Roll Labels</h3>
                <p className="text-neutral-600 mb-4">
                  Professional label solutions for products, packaging, and promotional needs.
                </p>
                <Link href="/products/roll-labels" className="text-lettuce-green font-medium hover:text-lettuce-dark transition-colors">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Process Section */}
      <section className="section-premium bg-premium-warm">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-editorial-large text-neutral-900 mb-6">
              Our
              <span className="text-lettuce-green"> Process</span>
            </h2>
            <p className="text-premium-body">
              From concept to completion, we guide you through every step of creating exceptional print materials.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-lettuce-green text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Consultation</h3>
              <p className="text-neutral-600">
                We start by understanding your vision, brand, and objectives to create the perfect print solution.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lettuce-green text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Design & Proof</h3>
              <p className="text-neutral-600">
                Our designers create compelling layouts that we refine together until everything is perfect.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lettuce-green text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Production & Delivery</h3>
              <p className="text-neutral-600">
                Using premium materials and precise techniques, we bring your project to life and deliver excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-premium bg-lettuce-green text-white">
        <div className="container-narrow text-center">
          <h2 className="text-editorial-large mb-6">
            Ready to Create Something
            <span className="block">Extraordinary?</span>
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Let's bring your vision to life with print materials that make a lasting impression.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/quote" className="bg-white text-lettuce-green font-semibold px-12 py-5 hover:bg-neutral-50 transition-colors">
              Get Your Quote
            </Link>
            <Link href="/contact" className="text-white font-medium text-lg hover:opacity-80 transition-opacity">
              Contact Us →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}