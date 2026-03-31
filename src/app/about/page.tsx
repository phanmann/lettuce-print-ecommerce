import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Premium About Hero */}
      <section className="section-hero premium-gradient-light relative overflow-hidden">
        <div className="container-narrow relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-premium-fade-in">
            <h1 className="text-editorial-hero text-neutral-900 mb-8">
              Brooklyn's Creative
              <span className="block text-lettuce-green">Print Partner</span>
            </h1>
            <p className="text-premium-lead mb-12 max-w-2xl mx-auto">
              Founded on the principle that every brand deserves to be represented with sophistication and craftsmanship, Lettuce Print transforms visions into tangible excellence.
            </p>
          </div>
        </div>
        
        {/* Premium Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lettuce-green opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-lettuce-green opacity-3 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-premium bg-premium-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="text-sm font-medium text-lettuce-green mb-4">OUR STORY</div>
              <h2 className="text-editorial-large text-neutral-900 mb-8">
                From Vision to
                <span className="block">Excellence</span>
              </h2>
              <p className="text-premium-body mb-8">
                Lettuce Print was born from a simple observation: too many brands were settling for generic print experiences that failed to capture their unique essence. We set out to change that by combining traditional craftsmanship with modern design sensibility.
              </p>
              <p className="text-premium-body mb-12">
                Today, we're proud to serve as Brooklyn's creative partner for premium print, helping businesses of all sizes elevate their brand presence through meticulously crafted materials that tell compelling stories.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-bold text-lettuce-green mb-2">500+</div>
                  <div className="text-sm text-neutral-600">Projects Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-lettuce-green mb-2">8+</div>
                  <div className="text-sm text-neutral-600">Years of Excellence</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-lettuce-green mb-2">98%</div>
                  <div className="text-sm text-neutral-600">Client Satisfaction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-lettuce-green mb-2">24h</div>
                  <div className="text-sm text-neutral-600">Average Response Time</div>
                </div>
              </div>
            </div>
            <div className="aspect-square bg-neutral-100 rounded-3xl flex items-center justify-center">
              <div className="text-center text-neutral-400">
                <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p className="text-sm">Our Brooklyn Studio</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="section-premium bg-neutral-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="text-sm font-medium text-lettuce-green mb-4">OUR VALUES</div>
            <h2 className="text-editorial-large text-neutral-900 mb-6">
              Principles That Guide
              <span className="block text-lettuce-green">Every Decision</span>
            </h2>
            <p className="text-premium-body">
              Our commitment to excellence extends beyond the final product. It's reflected in every interaction, every recommendation, and every detail we craft.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Craftsmanship',
                description: 'Every piece we create is crafted with meticulous attention to detail, using premium materials and time-tested techniques.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              {
                title: 'Collaboration',
                description: 'We believe the best results come from true partnerships, working closely with clients to understand their vision and objectives.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                title: 'Innovation',
                description: 'We continuously explore new techniques and technologies while respecting traditional craftsmanship that stands the test of time.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: 'Sustainability',
                description: 'We're committed to environmentally responsible practices, using eco-friendly materials and minimizing waste in our production process.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )
              },
              {
                title: 'Excellence',
                description: 'We hold ourselves to the highest standards, never compromising on quality and always striving to exceed expectations.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                )
              },
              {
                title: 'Community',
                description: 'As a Brooklyn-based business, we're proud to support our local community and contribute to the vibrant creative ecosystem.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )
              }
            ].map((value, index) => (
              <div key={index} className="card-premium p-8 group hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-lettuce-pale rounded-full mr-4 group-hover:bg-lettuce-green transition-colors duration-300">
                    <div className="text-lettuce-green group-hover:text-white transition-colors duration-300">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">{value.title}</h3>
                </div>
                <p className="text-premium-body">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="section-premium bg-premium-white">
        <div className="container-narrow">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="text-sm font-medium text-lettuce-green mb-4">OUR PROCESS</div>
            <h2 className="text-editorial-large text-neutral-900 mb-6">
              A Refined Approach
              <span className="block text-lettuce-green">to Every Project</span>
            </h2>
            <p className="text-premium-body">
              Our process combines traditional craftsmanship with modern efficiency, ensuring every project receives the attention it deserves from concept to completion.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 mb-20">
            {[
              {
                step: '01',
                title: 'Discovery',
                description: 'We begin by understanding your brand, objectives, and vision. This foundation ensures every decision aligns with your goals and identity.',
                icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              },
              {
                step: '02',
                title: 'Design & Development',
                description: 'Our team creates refined concepts with meticulous attention to typography, spacing, and visual hierarchy. We provide detailed proofs for your approval.',
                icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3m-3.036 0L5.464 18.5M15.232 15.232l3.536 3.536'
              },
              {
                step: '03',
                title: 'Production & Delivery',
                description: 'Using premium materials and state-of-the-art equipment, we bring your vision to life with precision timing and careful attention to every detail.',
                icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
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

          {/* Process CTA */}
          <div className="text-center">
            <Link href="/quote" className="btn-premium-primary px-10 py-4">
              Start Your Project
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-premium bg-neutral-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="text-sm font-medium text-lettuce-green mb-4">OUR TEAM</div>
            <h2 className="text-editorial-large text-neutral-900 mb-6">
              Craftsmen &
              <span className="block text-lettuce-green">Creative Partners</span>
            </h2>
            <p className="text-premium-body">
              Our team brings together decades of experience in print production, design, and client service. Each member is dedicated to ensuring your project exceeds expectations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'Creative Director',
                description: 'With 12 years in luxury brand design, Sarah ensures every project meets our exacting aesthetic standards.',
                image: '/images/team/sarah-chen.jpg'
              },
              {
                name: 'Michael Rodriguez',
                role: 'Production Manager',
                description: 'Michael brings 15 years of print production expertise, overseeing every technical aspect of our operations.',
                image: '/images/team/michael-rodriguez.jpg'
              },
              {
                name: 'Emma Thompson',
                role: 'Client Relations',
                description: 'Emma ensures seamless communication and project management from initial consultation to final delivery.',
                image: '/images/team/emma-thompson.jpg'
              }
            ].map((member, index) => (
              <div key={index} className="card-premium p-8 text-center">
                <div className="w-32 h-32 bg-neutral-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-16 h-16 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{member.name}</h3>
                <p className="text-lettuce-green font-medium mb-4">{member.role}</p>
                <p className="text-premium-body">{member.description}</p>
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
              Ready to Partner with
              <span className="block">Brooklyn's Finest?</span>
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Let's discuss how our commitment to craftsmanship and creativity can elevate your brand through exceptional print experiences.
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