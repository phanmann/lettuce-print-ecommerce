import Image from 'next/image'
import Link from 'next/link'

export default function Services() {
  return (
    <div className="min-h-screen">
      {/* Premium Services Hero */}
      <section className="section-hero premium-gradient-light relative overflow-hidden">
        <div className="container-narrow relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-premium-fade-in">
            <h1 className="text-editorial-hero text-neutral-900 mb-8">
              Premium Print
              <span className="block text-lettuce-green">Services</span>
            </h1>
            <p className="text-premium-lead mb-12 max-w-2xl mx-auto">
              Every project receives our full attention to detail, from paper selection to finishing touches. We craft experiences, not just prints.
            </p>
          </div>
        </div>
        
        {/* Premium Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lettuce-green opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-lettuce-green opacity-3 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Business Cards Section */}
      <section className="section-premium bg-premium-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="text-sm font-medium text-lettuce-green mb-4">01 • BUSINESS CARDS</div>
              <h2 className="text-editorial-large text-neutral-900 mb-8">
                First Impressions
                <span className="block">That Endure</span>
              </h2>
              <p className="text-premium-body mb-8">
                Your business card is often the first tangible representation of your brand. We ensure it's memorable through premium paper stocks, refined typography, and sophisticated finishing techniques.
              </p>
              <div className="space-y-4 mb-10">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-lettuce-green rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1">Premium Paper Selection</h4>
                    <p className="text-neutral-600">From classic cotton to modern synthetics, each paper tells a different story.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-lettuce-green rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1">Specialty Finishes</h4>
                    <p className="text-neutral-600">Embossing, foil stamping, and spot UV that add tactile luxury.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-lettuce-green rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1">Custom Design</h4>
                    <p className="text-neutral-600">Collaborative design process that captures your brand essence.</p>
                  </div>
                </div>
              </div>
              <Link href="/quote" className="btn-premium-primary">
                Design Your Cards
              </Link>
            </div>
            <div className="aspect-square bg-neutral-100 rounded-3xl flex items-center justify-center">
              <div className="text-center text-neutral-400">
                <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.657 0 3 4.03 3 6s-1.343 6-3 6-3-4.03-3-6 1.343-6 3-6z" />
                </svg>
                <p className="text-sm">Premium Business Card Showcase</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Materials Section */}
      <section className="section-premium bg-neutral-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-square bg-neutral-100 rounded-3xl flex items-center justify-center">
                <div className="text-center text-neutral-400">
                  <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm">Marketing Materials Portfolio</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="text-sm font-medium text-lettuce-green mb-4">02 • MARKETING MATERIALS</div>
              <h2 className="text-editorial-large text-neutral-900 mb-8">
                Stories That
                <span className="block">Captivate</span>
              </h2>
              <p className="text-premium-body mb-8">
                Marketing materials should do more than inform—they should inspire. We create brochures, flyers, and promotional pieces that engage your audience and communicate your value with clarity and sophistication.
              </p>
              <div className="space-y-4 mb-10">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-lettuce-green rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1">Editorial Design</h4>
                    <p className="text-neutral-600">Magazine-quality layouts that guide readers through your narrative.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-lettuce-green rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1">Brand Consistency</h4>
                    <p className="text-neutral-600">Seamless integration with your existing brand identity and messaging.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-lettuce-green rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1">Strategic Messaging</h4>
                    <p className="text-neutral-600">Content that resonates with your target audience and drives action.</p>
                  </div>
                </div>
              </div>
              <Link href="/quote" className="btn-premium-primary">
                Create Materials
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Large Format Section */}
      <section className="section-premium bg-premium-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="text-sm font-medium text-lettuce-green mb-4">03 • LARGE FORMAT</div>
              <h2 className="text-editorial-large text-neutral-900 mb-8">
                Statements That
                <span className="block">Command Attention</span>
              </h2>
              <p className="text-premium-body mb-8">
                From intimate gatherings to grand events, our large format printing ensures your message is seen and remembered. We create banners, signage, and displays that make impactful statements.
              </p>
              <div className="space-y-4 mb-10">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-lettuce-green rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1">Event Graphics</h4>
                    <p className="text-neutral-600">Banners, backdrops, and displays that enhance your event experience.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-lettuce-green rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1">Retail Signage</h4>
                    <p className="text-neutral-600">Window graphics, posters, and promotional displays that drive sales.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-lettuce-green rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1">Architectural Applications</h4>
                    <p className="text-neutral-600">Wall graphics, wayfinding, and environmental branding solutions.</p>
                  </div>
                </div>
              </div>
              <Link href="/quote" className="btn-premium-primary">
                Explore Large Format
              </Link>
            </div>
            <div className="aspect-square bg-neutral-100 rounded-3xl flex items-center justify-center">
              <div className="text-center text-neutral-400">
                <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">Large Format Gallery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialty Finishes Section */}
      <section className="section-premium bg-neutral-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="text-sm font-medium text-lettuce-green mb-4">04 • SPECIALTY FINISHES</div>
            <h2 className="text-editorial-large text-neutral-900 mb-6">
              Tactile Luxury
              <span className="block text-lettuce-green">That Elevates</span>
            </h2>
            <p className="text-premium-body">
              The details make the difference. Our specialty finishing techniques add layers of sophistication that engage multiple senses and create lasting impressions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Embossing',
                description: 'Raised relief that adds dimension and texture to your design.',
                icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
              },
              {
                title: 'Foil Stamping',
                description: 'Metallic accents that catch light and add premium appeal.',
                icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
              },
              {
                title: 'Spot UV',
                description: 'Glossy highlights that create contrast and visual interest.',
                icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
              },
              {
                title: 'Letterpress',
                description: 'Impressed typography that creates elegant debossed effects.',
                icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
              }
            ].map((finish, index) => (
              <div key={index} className="card-premium p-8 text-center group hover:-translate-y-2 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-lettuce-pale rounded-full mb-6 group-hover:bg-lettuce-green transition-colors duration-300">
                  <svg className="w-8 h-8 text-lettuce-green group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={finish.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">{finish.title}</h3>
                <p className="text-premium-body">{finish.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="section-hero premium-gradient relative overflow-hidden">
        <div className="container-narrow text-center relative z-10">
          <div className="max-w-3xl mx-auto animate-premium-fade-in">
            <h2 className="text-editorial-large text-white mb-8">
              Let's Create Something
              <span className="block">Extraordinary Together</span>
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Every project begins with a conversation. Tell us about your vision, and we'll help bring it to life with the sophistication and craftsmanship your brand deserves.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/quote" className="btn-premium-primary bg-white text-lettuce-green hover:bg-neutral-50 px-12 py-5 text-lg">
                Request Consultation
              </Link>
              <Link href="/contact" className="text-white font-medium text-lg hover:text-neutral-200 transition-colors">
                Call Us: (555) 123-4567 →
              </Link>
            </div>
          </div>
        </div>
        
        {/* Premium Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"></div>
        </div>
      </section>
    </div>
  )
}