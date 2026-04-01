'use client'

import Link from 'next/link'
import { useState } from 'react'
import { 
  FileText, Package, Tag, Megaphone, Shirt,
  ArrowRight, Sparkles, TrendingUp, Award, 
  Calendar, Clock, Star, Zap
} from 'lucide-react'

interface CategoryCard {
  id: string
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
  href: string
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall'
  gradient: string
  accent: string
  featured?: boolean
}

const categories: CategoryCard[] = [
  {
    id: 'marketing',
    title: 'Marketing Materials',
    subtitle: 'Make an Impact',
    description: 'Business cards, flyers, brochures that drive results',
    icon: <FileText className="h-8 w-8" />,
    href: '/products?category=marketing',
    size: 'large',
    gradient: 'from-blue-500 to-cyan-400',
    accent: 'text-blue-600',
    featured: true
  },
  {
    id: 'stickers',
    title: 'Stickers & Labels',
    subtitle: 'Brand Everything',
    description: 'Custom shapes, premium materials, lasting quality',
    icon: <Tag className="h-6 w-6" />,
    href: '/products?category=stickers-labels',
    size: 'medium',
    gradient: 'from-purple-500 to-pink-400',
    accent: 'text-purple-600'
  },
  {
    id: 'boxes',
    title: 'Boxes & Packaging',
    subtitle: 'Unbox Joy',
    description: 'Custom packaging that creates memorable experiences',
    icon: <Package className="h-6 w-6" />,
    href: '/products?category=packaging',
    size: 'medium',
    gradient: 'from-green-500 to-emerald-400',
    accent: 'text-green-600'
  },
  {
    id: 'signs',
    title: 'Signs & Banners',
    subtitle: 'Stand Out',
    description: 'Large format printing for maximum visibility',
    icon: <Megaphone className="h-7 w-7" />,
    href: '/products?category=signs-banners',
    size: 'wide',
    gradient: 'from-orange-500 to-red-400',
    accent: 'text-orange-600',
    featured: true
  },
  {
    id: 'apparel',
    title: 'Apparel & Promo',
    subtitle: 'Wear Your Brand',
    description: 'Custom apparel and promotional items',
    icon: <Shirt className="h-6 w-6" />,
    href: '/products?category=apparel-promo',
    size: 'small',
    gradient: 'from-indigo-500 to-purple-400',
    accent: 'text-indigo-600'
  }
]

const stats = [
  { icon: <Award className="h-4 w-4" />, label: '5-Star Reviews', value: '500+' },
  { icon: <Clock className="h-4 w-4" />, label: 'Day Turnaround', value: '2-3' },
  { icon: <TrendingUp className="h-4 w-4" />, label: 'Brooklyn Businesses', value: '1000+' }
]

export default function BentoHero() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'small':
        return 'col-span-1 row-span-1 min-h-[160px]'
      case 'medium':
        return 'col-span-1 row-span-2 min-h-[340px]'
      case 'large':
        return 'col-span-2 row-span-2 min-h-[340px]'
      case 'wide':
        return 'col-span-2 row-span-1 min-h-[160px]'
      case 'tall':
        return 'col-span-1 row-span-3 min-h-[520px]'
      default:
        return 'col-span-1 row-span-1 min-h-[160px]'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Simplified Header */}
      <header className="relative z-50 px-6 py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-gray-900">
              Lettuce<span className="text-green-600">Print</span>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/cart"
              className="relative p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15.5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Bento Grid Hero */}
      <div className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Brooklyn's
              <span className="block text-transparent bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text">
                Print Partner
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Choose your category and discover premium printing solutions crafted with Brooklyn precision
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-600">
                  <div className="text-green-600">{stat.icon}</div>
                  <span className="font-semibold text-gray-900">{stat.value}</span>
                  <span className="text-sm">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-min">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className={`${getSizeClasses(category.size)} group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`h-full bg-gradient-to-br ${category.gradient} p-6 flex flex-col justify-between relative`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/20"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/20"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white/10"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        <div className="text-white">
                          {category.icon}
                        </div>
                      </div>
                      
                      {category.featured && (
                        <div className="flex items-center space-x-1 px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                          <Star className="h-3 w-3 text-yellow-300 fill-current" />
                          <span className="text-xs font-medium text-white">Popular</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        {category.title}
                      </h3>
                      {category.size !== 'small' && (
                        <p className="text-sm font-medium text-white/80">
                          {category.subtitle}
                        </p>
                      )}
                      {(category.size === 'large' || category.size === 'wide') && (
                        <p className="text-sm text-white/70 leading-relaxed">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Interactive Elements */}
                  <div className="relative z-10 flex items-end justify-between">
                    <div className="flex-1">
                      {category.size === 'large' && (
                        <div className="flex items-center space-x-2 text-white/80 text-sm mb-2">
                          <Sparkles className="h-4 w-4" />
                          <span>Premium Quality</span>
                        </div>
                      )}
                    </div>
                    
                    <div className={`transform transition-all duration-300 ${
                      hoveredCard === category.id ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-70'
                    }`}>
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <ArrowRight className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-white/10 backdrop-blur-sm transition-opacity duration-300 ${
                    hoveredCard === category.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="h-full flex items-center justify-center">
                      <div className="text-white text-center">
                        <Zap className="h-8 w-8 mx-auto mb-2" />
                        <div className="text-sm font-medium">Click to Explore</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* Special CTA Card */}
            <div className="col-span-1 row-span-1 min-h-[160px] bg-white rounded-2xl p-6 flex flex-col justify-between shadow-lg border-2 border-dashed border-gray-300 hover:border-green-500 transition-colors duration-300 group">
              <div>
                <div className="p-2 bg-gray-100 rounded-lg w-fit mb-3 group-hover:bg-green-100 transition-colors">
                  <Calendar className="h-5 w-5 text-gray-600 group-hover:text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Need Something Custom?
                </h3>
                <p className="text-sm text-gray-600">
                  Get a personalized quote for your unique project
                </p>
              </div>
              
              <Link 
                href="/quote"
                className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
              >
                Get Quote <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Trusted by 1000+ Brooklyn businesses • Same-day rush available
            </p>
            <Link 
              href="/about"
              className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors text-sm"
            >
              Learn about our process <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}