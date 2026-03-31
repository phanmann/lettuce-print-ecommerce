'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Quote() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    quantity: '',
    deadline: '',
    budget: '',
    description: '',
    files: null as FileList | null
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, files: e.target.files }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
    }, 2000)
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen">
        {/* Success Hero */}
        <section className="section-hero premium-gradient-light relative overflow-hidden">
          <div className="container-narrow relative z-10">
            <div className="text-center max-w-3xl mx-auto animate-premium-fade-in">
              <div className="w-20 h-20 bg-lettuce-green rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-editorial-large text-neutral-900 mb-6">
                Thank You for
                <span className="block text-lettuce-green">Your Inquiry</span>
              </h1>
              <p className="text-premium-lead mb-12">
                We've received your project details and will review them carefully. Our team will contact you within 24 hours to discuss your vision and provide a detailed proposal.
              </p>
              <div className="space-y-4">
                <Link href="/" className="btn-premium-primary px-8 py-4">
                  Return to Homepage
                </Link>
                <br />
                <Link href="/services" className="text-lettuce-green font-medium hover:text-lettuce-dark transition-colors">
                  Explore Our Services →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Premium Quote Hero */}
      <section className="section-hero premium-gradient-light relative overflow-hidden">
        <div className="container-narrow relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-premium-fade-in">
            <h1 className="text-editorial-hero text-neutral-900 mb-8">
              Let's Discuss
              <span className="block text-lettuce-green">Your Project</span>
            </h1>
            <p className="text-premium-lead mb-12 max-w-2xl mx-auto">
              Every exceptional print project begins with a conversation. Share your vision with us, and we'll craft a detailed proposal tailored to your needs and objectives.
            </p>
          </div>
        </div>
        
        {/* Premium Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lettuce-green opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-lettuce-green opacity-3 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Premium Quote Form */}
      <section className="section-premium bg-premium-white">
        <div className="container-narrow">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-editorial-medium text-neutral-900 mb-6">
                Project Consultation
              </h2>
              <p className="text-premium-body max-w-2xl mx-auto">
                Please provide as much detail as possible about your project. The more information we have, the better we can serve you with accurate pricing and timeline estimates.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Contact Information */}
              <div className="bg-neutral-50 rounded-3xl p-8">
                <h3 className="text-2xl font-semibold text-neutral-900 mb-8">Contact Information</h3>
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
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-lettuce-green focus:border-transparent transition-all duration-300"
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
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-lettuce-green focus:border-transparent transition-all duration-300"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-3">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-lettuce-green focus:border-transparent transition-all duration-300"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-lettuce-green focus:border-transparent transition-all duration-300"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="bg-neutral-50 rounded-3xl p-8">
                <h3 className="text-2xl font-semibold text-neutral-900 mb-8">Project Details</h3>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-neutral-700 mb-3">
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-lettuce-green focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select Project Type</option>
                      <option value="business-cards">Business Cards</option>
                      <option value="marketing-materials">Marketing Materials</option>
                      <option value="large-format">Large Format</option>
                      <option value="stationery">Stationery Systems</option>
                      <option value="packaging">Packaging</option>
                      <option value="specialty-finishes">Specialty Finishes</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-neutral-700 mb-3">
                      Estimated Quantity
                    </label>
                    <select
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-lettuce-green focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select Quantity Range</option>
                      <option value="50-100">50-100 pieces</option>
                      <option value="100-500">100-500 pieces</option>
                      <option value="500-1000">500-1000 pieces</option>
                      <option value="1000-5000">1000-5000 pieces</option>
                      <option value="5000+">5000+ pieces</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="deadline" className="block text-sm font-medium text-neutral-700 mb-3">
                      Project Timeline
                    </label>
                    <select
                      id="deadline"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-lettuce-green focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select Timeline</option>
                      <option value="asap">As soon as possible</option>
                      <option value="1-2-weeks">1-2 weeks</option>
                      <option value="3-4-weeks">3-4 weeks</option>
                      <option value="1-2-months">1-2 months</option>
                      <option value="flexible">Flexible timeline</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-neutral-700 mb-3">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-lettuce-green focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select Budget Range</option>
                      <option value="under-500">Under $500</option>
                      <option value="500-1000">$500 - $1,000</option>
                      <option value="1000-2500">$1,000 - $2,500</option>
                      <option value="2500-5000">$2,500 - $5,000</option>
                      <option value="5000-10000">$5,000 - $10,000</option>
                      <option value="10000+">$10,000+</option>
                      <option value="discuss">Let's discuss</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-3">
                    Project Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={6}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-white border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-lettuce-green focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Please describe your project in detail. Include any specific requirements, design preferences, or reference materials you'd like us to consider."
                  />
                </div>
              </div>

              {/* File Upload */}
              <div className="bg-neutral-50 rounded-3xl p-8">
                <h3 className="text-2xl font-semibold text-neutral-900 mb-8">Additional Materials</h3>
                <div className="border-2 border-dashed border-neutral-300 rounded-2xl p-8 text-center hover:border-lettuce-green transition-colors duration-300">
                  <svg className="w-12 h-12 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-neutral-600 mb-2">Drop files here or click to upload</p>
                  <p className="text-sm text-neutral-500">PDF, JPG, PNG, AI, PSD files up to 10MB each</p>
                  <input
                    type="file"
                    id="files"
                    name="files"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.ai,.psd"
                  />
                  <label
                    htmlFor="files"
                    className="inline-flex items-center px-6 py-3 mt-4 border border-neutral-300 rounded-full text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 cursor-pointer transition-colors duration-300"
                  >
                    Choose Files
                  </label>
                </div>
                {formData.files && formData.files.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm font-medium text-neutral-700 mb-2">Selected files:</p>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      {Array.from(formData.files).map((file, index) => (
                        <li key={index} className="flex items-center justify-between bg-white p-3 rounded-lg">
                          <span>{file.name}</span>
                          <span className="text-neutral-500">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-premium-primary px-12 py-5 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Inquiry'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Premium Process Section */}
      <section className="section-premium bg-neutral-50">
        <div className="container-narrow">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-editorial-medium text-neutral-900 mb-6">
              What Happens Next?
            </h2>
            <p className="text-premium-body">
              Once we receive your inquiry, our team follows a refined process to ensure your project receives the attention it deserves.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Initial Review',
                description: 'We review your project details within 24 hours and prepare initial questions or clarifications.'
              },
              {
                step: '02',
                title: 'Consultation Call',
                description: 'We schedule a call to discuss your vision in detail, timeline, and budget considerations.'
              },
              {
                step: '03',
                title: 'Detailed Proposal',
                description: 'You receive a comprehensive proposal with pricing, timeline, and project scope within 48 hours.'
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

      {/* Contact Information */}
      <section className="section-premium bg-premium-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="card-premium p-8">
              <div className="w-16 h-16 bg-lettuce-pale rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-lettuce-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Phone</h3>
              <p className="text-premium-body mb-2">(555) 123-4567</p>
              <p className="text-sm text-neutral-500">Mon-Fri, 9AM-6PM EST</p>
            </div>
            <div className="card-premium p-8">
              <div className="w-16 h-16 bg-lettuce-pale rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-lettuce-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Email</h3>
              <p className="text-premium-body mb-2">hello@lettuceprint.com</p>
              <p className="text-sm text-neutral-500">Response within 24 hours</p>
            </div>
            <div className="card-premium p-8">
              <div className="w-16 h-16 bg-lettuce-pale rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-lettuce-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Studio</h3>
              <p className="text-premium-body mb-2">Brooklyn, NY</p>
              <p className="text-sm text-neutral-500">By appointment only</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}