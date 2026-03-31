import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Premium Hero Section */}
      <section className="section-hero premium-gradient-light relative overflow-hidden">
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
        
        {/* Premium Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lettuce-green opacity-5 rounded-full blur-3xl"></div>
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
            {[
              {
                title: 'Business Cards',
                description: 'Impressions that last beyond the handshake. Premium papers, refined finishes, and meticulous attention to detail.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.657 0 3 4.03 3 6s-1.343 6-3 6-3-4.03-3-6 1.343-6 3-6z" />
                  </svg>
                ),
                cta: 'Design Yours'
              },
              {
                title: 'Marketing Materials',
                description: 'Brochures and flyers that command attention. Strategic design meets premium execution.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                cta: 'Explore Options'
              },
              {
                title: 'Large Format',
                description: 'Banners and signage that make statements. From intimate gatherings to grand events.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                cta: 'View Gallery'
              },
              {
                title: 'Stationery Systems',
                description: 'Cohesive brand identity across every touchpoint. Letterheads, envelopes, and notecards.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                cta: 'Design System'
              },
              {
                title: 'Packaging',
                description: 'Packaging that elevates the unboxing experience. Every detail considered and crafted.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ),
                cta: 'Explore Packaging'
              },
              {
                title: 'Specialty Finishes',
                description: 'Embossing, foil stamping, and specialty coatings that add tactile luxury.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
                cta: 'Discover Finishes'
              }
            ].map((service, index) => (
              <div key={index} className="card-premium p-8 group hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-lettuce-pale rounded-full mr-4 group-hover:bg-lettuce-green transition-colors duration-300">
                    <div className="text-lettuce-green group-hover:text-white transition-colors duration-300">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">{service.title}</h3>
                </div>
                <p className="text-premium-body mb-6">{service.description}</p>
                <Link href="/quote" className="text-lettuce-green font-medium hover:text-lettuce-dark transition-colors group-hover:translate-x-1 transform duration-300">
                  {service.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Portfolio Showcase */}
      <section className="section-premium bg-neutral-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-editorial-large text-neutral-900 mb-8">
                Where Vision
                <span className="block text-lettuce-green">Meets Craft</span>
              </h2>
              <p className="text-premium-body mb-8">
                Our portfolio represents collaborations with Brooklyn's most discerning brands. Each project demonstrates our commitment to transforming concepts into tangible excellence.
              </p>
              <p className="text-premium-body mb-12">
                From startups making their first impression to established businesses refreshing their identity, we bring the same level of meticulous attention to every detail.
              </p>
              <Link href="/portfolio" className="btn-premium-outline px-10 py-4">
                View Our Portfolio
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="aspect-square bg-lettuce-green rounded-2xl opacity-20"></div>
                <div className="aspect-square bg-neutral-200 rounded-2xl"></div>
              </div>
              <div className="space-y-6 pt-12">
                <div className="aspect-square bg-neutral-300 rounded-2xl"></div>
                <div className="aspect-square bg-lettuce-pale rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Process Section */}
      <section className="section-premium bg-premium-white">
        <div className="container-narrow">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-editorial-large text-neutral-900 mb-6">
              A Process
              <span className="text-lettuce-green"> Rooted in Excellence</span>
            </h2>
            <p className="text-premium-body">
              Our approach combines traditional craftsmanship with modern efficiency. Every project follows a refined process designed to deliver exceptional results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Consultation',
                description: 'We begin by understanding your vision, brand identity, and objectives. This foundation ensures every decision aligns with your goals.'
              },
              {
                step: '02',
                title: 'Design & Proof',
                description: 'Our team creates refined designs with meticulous attention to typography, spacing, and visual hierarchy. You receive detailed proofs for approval.'
              },
              {
                step: '03',
                title: 'Production & Delivery',
                description: 'Using premium materials and state-of-the-art equipment, we bring your vision to life with precision timing and careful delivery.'
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-lettuce-pale rounded-full mb-8 group-hover:bg-lettuce-green transition-colors duration-300">
                  <span className="text-2xl font-semibold text-lettuce-green group-hover:text-white transition-colors duration-300">{step.step}</span>
                </div>
                <h3 className="text-2xl font-semibold text-neutral-900 mb-4">{step.title}</h3>
                <p className="text-premium-body">{step.description}</p>
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
              Ready to Elevate Your Brand?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Let's discuss how we can transform your printing needs into premium brand experiences that resonate with your audience.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/quote" className="btn-premium-primary bg-white text-lettuce-green hover:bg-neutral-50 px-12 py-5 text-lg">
                Start Your Project
              </Link>
              <Link href="/contact" className="text-white font-medium text-lg hover:text-neutral-200 transition-colors">
                Schedule a Call →
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