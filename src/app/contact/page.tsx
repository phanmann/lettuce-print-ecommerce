import Image from 'next/image'
import Link from 'next/link'

export default function Contact() {
  return (
    <div className="min-h-screen">
      {/* Premium Contact Hero */}
      <section className="section-hero premium-gradient-light relative overflow-hidden">
        <div className="container-narrow relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-premium-fade-in">
            <h1 className="text-editorial-hero text-neutral-900 mb-8">
              Let's Start the
              <span className="block text-lettuce-green">Conversation</span>
            </h1>
            <p className="text-premium-lead mb-12 max-w-2xl mx-auto">
              Every exceptional project begins with a dialogue. Reach out to discuss how we can bring your vision to life with the craftsmanship and attention your brand deserves.
            </p>
          </div>
        </div>
        
        {/* Premium Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lettuce-green opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-lettuce-green opacity-3 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-premium bg-premium-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="card-premium p-8 text-center group hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-lettuce-pale rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-lettuce-green transition-colors duration-300">
                <svg className="w-8 h-8 text-lettuce-green group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Phone</h3>
              <p className="text-premium-body mb-2">(555) 123-4567</p>
              <p className="text-sm text-neutral-500">Mon-Fri, 9AM-6PM EST</p>
            </div>
            <div className="card-premium p-8 text-center group hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-lettuce-pale rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-lettuce-green transition-colors duration-300">
                <svg className="w-8 h-8 text-lettuce-green group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Email</h3>
              <p className="text-premium-body mb-2">hello@lettuceprint.com</p>
              <p className="text-sm text-neutral-500">Response within 24 hours</p>
            </div>
            <div className="card-premium p-8 text-center group hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-lettuce-pale rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-lettuce-green transition-colors duration-300">
                <svg className="w-8 h-8 text-lettuce-green group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Studio</h3>
              <p className="text-premium-body mb-2">Brooklyn, NY</p>
              <p className="text-sm text-neutral-500">By appointment only</p>
            </div>
            <div className="card-premium p-8 text-center group hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-lettuce-pale rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-lettuce-green transition-colors duration-300">
                <svg className="w-8 h-8 text-lettuce-green group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Response</h3>
              <p className="text-premium-body mb-2">Within 24 hours</p>
              <p className="text-sm text-neutral-500">Guaranteed reply time</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-editorial-medium text-neutral-900 mb-6">
                Send Us a Message
              </h2>
              <p className="text-premium-body max-w-2xl mx-auto">
                Prefer to write? Send us your questions, project details, or just say hello. We'll get back to you within 24 hours.
              </p>
            </div>

            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-6 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-lettuce-green focus:border-transparent transition-all duration-300"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-6 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-lettuce-green focus:border-transparent transition-all duration-300"
                    placeholder="john@company.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-3">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-6 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-lettuce-green focus:border-transparent transition-all duration-300"
                  placeholder="How can we help you?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-3">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={8}
                  className="w-full px-6 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-lettuce-green focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us about your project, ask questions, or just say hello..."
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn-premium-primary px-12 py-5 text-lg"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-premium bg-neutral-50">
        <div className="container-narrow">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-editorial-medium text-neutral-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-premium-body">
              Common questions about our services, process, and what to expect when working with us.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "What's the typical timeline for a project?",
                answer: "Timelines vary based on project complexity and scope. Business cards typically take 5-7 business days, while larger projects like marketing materials or packaging may take 2-3 weeks. We always provide detailed timeline estimates during our initial consultation."
              },
              {
                question: "Do you offer design services, or do I need to provide my own files?",
                answer: "We offer comprehensive design services and can work with you from concept to completion. If you have existing designs, we're happy to review and optimize them for print. Our team ensures your files meet our premium production standards."
              },
              {
                question: "What types of paper and materials do you offer?",
                answer: "We curate a premium selection of papers including cotton, textured, and specialty stocks. Our collection includes eco-friendly options, luxury finishes, and unique textures. During consultation, we'll recommend the best materials for your specific project and budget."
              },
              {
                question: "Can I see samples before committing to a large order?",
                answer: "Absolutely. We provide comprehensive proofs and samples for approval before production begins. For larger projects, we can create physical mockups so you can see and feel the final result before the full production run."
              },
              {
                question: "Do you work with clients outside of Brooklyn?",
                answer: "While we're proud to be Brooklyn-based, we serve clients throughout New York City and beyond. Many of our clients are based in Manhattan, Queens, and Staten Island. We offer delivery services and virtual consultations for distant clients."
              },
              {
                question: "What's included in your pricing?",
                answer: "Our pricing includes design consultation, file preparation, premium materials, production, and delivery. We provide detailed quotes that break down all costs so you understand exactly what you're paying for. There are no hidden fees or surprises."
              }
            ].map((faq, index) => (
              <details key={index} className="card-premium p-8 group">
                <summary className="flex justify-between items-center cursor-pointer">
                  <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-lettuce-green transition-colors">
                    {faq.question}
                  </h3>
                  <svg className="w-5 h-5 text-neutral-400 group-hover:text-lettuce-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-6 pt-6 border-t border-neutral-100">
                  <p className="text-premium-body">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="section-hero premium-gradient relative overflow-hidden">
        <div className="container-narrow text-center relative z-10">
          <div className="max-w-3xl mx-auto animate-premium-fade-in">
            <h2 className="text-editorial-large text-white mb-8">
              Ready to Begin?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Let's discuss your project and explore how we can bring your vision to life with the craftsmanship and attention it deserves.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/quote" className="btn-premium-primary bg-white text-lettuce-green hover:bg-neutral-50 px-12 py-5 text-lg">
                Request Consultation
              </Link>
              <Link href="/services" className="text-white font-medium text-lg hover:text-neutral-200 transition-colors">
                View Our Services →
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