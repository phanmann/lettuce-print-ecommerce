'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import CustomCursor from '../components/CustomCursor'

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  
  const testimonials = [
    {
      text: "Lettuce Print nailed our product packaging. The roll labels came out exactly right for retail — clean, detailed, and on time. Best print shop in Brooklyn.",
      author: "Maya C.",
      role: "Founder, Brooklyn CPG Brand",
      color: "bg-[#f5e642]"
    },
    {
      text: "Ordered event banners last minute and they delivered — literally, via Uber — same day. Quality was incredible. Lettuce Print is the real deal.",
      author: "Marcus T.",  
      role: "Event Producer, NYC",
      color: "bg-[#8b5e3c] text-white"
    },
    {
      text: "Their graphic design team completely transformed our brand. New logo, new menus, new packaging. Parsons trained — and it absolutely shows in the work.",
      author: "Jasmine R.",
      role: "Restaurant Owner, Brooklyn", 
      color: "bg-[#f5a8c8]"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('in'), i * 60)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )

    document.querySelectorAll('.rv').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-white text-[#0d0d0d] overflow-x-hidden" style={{fontFamily: '"DM Sans", sans-serif'}}>
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 h-17 bg-white/95 backdrop-blur-sm border-b border-[#ebebeb]">
          <Link href="/" className="font-bold text-lg text-black no-underline flex items-center gap-2 tracking-tight">
            🥬 Lettuce Print
          </Link>
          <ul className="hidden md:flex gap-8 list-none">
            <li><Link href="#services" className="text-sm font-medium text-[#666] no-underline hover:text-black transition-colors">Services</Link></li>
            <li><Link href="#work" className="text-sm font-medium text-[#666] no-underline hover:text-black transition-colors">Work</Link></li>
            <li><Link href="#about" className="text-sm font-medium text-[#666] no-underline hover:text-black transition-colors">About</Link></li>
            <li><Link href="/products" className="text-sm font-medium text-[#666] no-underline hover:text-black transition-colors">Products</Link></li>
            <li><Link href="#contact" className="text-sm font-medium text-[#666] no-underline hover:text-black transition-colors">Contact</Link></li>
          </ul>
          <Link href="/quote" className="bg-black text-white text-xs font-semibold px-6 py-3 rounded-full no-underline hover:bg-[#2e6b38] hover:translate-y-[-1px] transition-all">
            Get a Free Quote →
          </Link>
        </nav>

        {/* Hero Section */}
        <section className="pt-17 min-h-screen flex flex-col overflow-hidden" id="home">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-10 pt-11 items-center">
            <div className="hero-left">
              <p className="rv text-[15px] text-[#666] max-w-[420px] leading-7 mb-6">
                Brooklyn's neighborhood print shop and graphic design studio. Business cards, banners, stickers, labels, and more — with same-day Uber delivery to anywhere in NYC.
              </p>
              <h1 className="rv text-6xl lg:text-8xl leading-[0.91] tracking-tight text-black font-normal mb-0" style={{fontFamily: '"Instrument Serif", serif'}}>
                Brooklyn's <em className="italic text-[#2e6b38]">best</em><br/>
                print shop &<br/>
                <em className="italic text-[#2e6b38]">design studio.</em>
              </h1>
            </div>
            <div className="rv w-full h-80 rounded-3xl overflow-hidden relative flex-shrink-0">
              <Image 
                src="https://static.wixstatic.com/media/8523d8_6900d002afda441fa1d018899be4b268~mv2.jpg/v1/crop/x_323,y_0,w_3594,h_2832/fill/w_302,h_238,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Vinyl.jpg"
                alt="Lettuce Print Brooklyn studio"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-[#f5e642] text-black text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-full">
                📍 361 Stagg St, Brooklyn
              </div>
            </div>
          </div>

          {/* Hero Cards Row */}
          <div className="rv flex gap-4 px-10 pt-7 items-start flex-nowrap">
            <div className="rounded-lg flex-shrink-0 relative overflow-hidden flex items-center justify-center bg-[#f5a8c8] flex-1 min-w-[180px] h-40">
              <Image 
                src="https://static.wixstatic.com/media/8523d8_c2b844fe8e72457faba4ed5feff8902e~mv2.jpg/v1/crop/x_604,y_386,w_1092,h_860/fill/w_302,h_238,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/dabPal_posterMock.jpg"
                alt="Graphic design work"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-white/92 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full text-black">
                Graphic Design
              </div>
            </div>
            
            <div className="rounded-lg flex-shrink-0 relative overflow-hidden flex items-center justify-center bg-[#3dba52] flex-[1.3] min-w-[220px] h-40">
              <Image 
                src="https://static.wixstatic.com/media/8523d8_7e2af34100b34fa6b7888e7e766d25ca~mv2.jpg/v1/fill/w_600,h_482,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Full-Service-Lettuce-Print-Banner-Mockup.jpg"
                alt="Custom vinyl banner printing"
                fill
                className="object-cover"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white text-sm font-bold px-5 py-3 rounded-full whitespace-nowrap z-10">
                Let's Print! 🖨️
              </div>
              <div className="absolute bottom-2 left-2 bg-white/92 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full text-black">
                Banners
              </div>
            </div>

            <div className="rounded-lg flex-shrink-0 relative overflow-hidden flex items-center justify-center bg-[#f5e642] flex-[1.1] min-w-[190px] h-40">
              <Image 
                src="https://static.wixstatic.com/media/8523d8_39ab6ee0e5924ac59265eccee6236967~mv2.jpg/v1/crop/x_0,y_740,w_3024,h_2552/fill/w_302,h_238,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Flyers_JPG.jpg"
                alt="Flyer and postcard printing"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-white/92 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full text-black">
                Flyers
              </div>
            </div>

            <div className="rounded-lg flex-shrink-0 relative overflow-hidden flex items-center justify-center bg-[#8b5e3c] flex-1 min-w-[180px] h-40">
              <Image 
                src="https://static.wixstatic.com/media/8523d8_2cf0196a4b64446cad7340d211666662~mv2.jpg/v1/fill/w_587,h_587,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/8523d8_2cf0196a4b64446cad7340d211666662~mv2.jpg"
                alt="Custom roll labels"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-white/92 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full text-black">
                Roll Labels
              </div>
            </div>

            <div className="rounded-lg flex-shrink-0 relative overflow-hidden flex items-center justify-center bg-[#a8d4f5] flex-[0.85] min-w-[150px] h-40">
              <span className="text-6xl">📦</span>
              <div className="absolute bottom-2 left-2 bg-white/92 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full text-black">
                Packaging
              </div>
            </div>
          </div>

          {/* Hero Bottom */}
          <div className="rv flex items-center justify-between px-10 pt-6 pb-10">
            <div className="flex gap-3 items-center">
              <Link href="/products" className="bg-black text-white text-sm font-semibold px-7 py-4 rounded-full no-underline hover:bg-[#2e6b38] hover:translate-y-[-2px] transition-all flex items-center gap-2">
                See What We Print →
              </Link>
              <Link href="#work" className="border-2 border-black text-black text-sm font-semibold px-7 py-4 rounded-full no-underline hover:border-[#2e6b38] hover:text-[#2e6b38] transition-all flex items-center gap-2">
                View Our Work
              </Link>
            </div>
            <div className="hidden lg:flex gap-10">
              <div className="text-right">
                <div className="text-4xl text-[#2e6b38] leading-none italic" style={{fontFamily: '"Instrument Serif", serif'}}>500+</div>
                <div className="text-xs text-[#666] mt-1 font-medium tracking-wider uppercase">Projects Delivered</div>
              </div>
              <div className="text-right">
                <div className="text-4xl text-[#2e6b38] leading-none italic" style={{fontFamily: '"Instrument Serif", serif'}}>200+</div>
                <div className="text-xs text-[#666] mt-1 font-medium tracking-wider uppercase">NYC Clients Served</div>
              </div>
              <div className="text-right">
                <div className="text-4xl text-[#2e6b38] leading-none italic" style={{fontFamily: '"Instrument Serif", serif'}}>3–5</div>
                <div className="text-xs text-[#666] mt-1 font-medium tracking-wider uppercase">Day Turnaround</div>
              </div>
            </div>
          </div>
        </section>

        {/* Ticker */}
        <div className="bg-[#2e6b38] py-3 overflow-hidden whitespace-nowrap">
          <div className="inline-flex animate-[scroll_26s_linear_infinite]">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="inline-flex">
                <span className="text-white text-base font-bold px-7 inline-flex items-center gap-7 tracking-wide">
                  Business Cards<span className="text-xs opacity-55">✦</span>
                </span>
                <span className="text-white text-base font-bold px-7 inline-flex items-center gap-7 tracking-wide">
                  Flyers<span className="text-xs opacity-55">✦</span>
                </span>
                <span className="text-white text-base font-bold px-7 inline-flex items-center gap-7 tracking-wide">
                  Banners<span className="text-xs opacity-55">✦</span>
                </span>
                <span className="text-white text-base font-bold px-7 inline-flex items-center gap-7 tracking-wide">
                  Roll Labels<span className="text-xs opacity-55">✦</span>
                </span>
                <span className="text-white text-base font-bold px-7 inline-flex items-center gap-7 tracking-wide">
                  Packaging<span className="text-xs opacity-55">✦</span>
                </span>
                <span className="text-white text-base font-bold px-7 inline-flex items-center gap-7 tracking-wide">
                  Logo Design<span className="text-xs opacity-55">✦</span>
                </span>
                <span className="text-white text-base font-bold px-7 inline-flex items-center gap-7 tracking-wide">
                  Die-Cut Stickers<span className="text-xs opacity-55">✦</span>
                </span>
                <span className="text-white text-base font-bold px-7 inline-flex items-center gap-7 tracking-wide">
                  Uber Delivery NYC 🚗<span className="text-xs opacity-55">✦</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <section className="py-22 px-10 border-b border-[#ebebeb]" id="services">
          <div className="rv flex justify-between items-end mb-14">
            <h2 className="text-5xl lg:text-7xl leading-[0.95] font-normal tracking-tight" style={{fontFamily: '"Instrument Serif", serif'}}>
              Printing & design<br/>
              <em className="italic text-[#2e6b38]">for all of NYC.</em>
            </h2>
            <p className="max-w-70 text-sm leading-7 text-[#666]">
              From a single business card to a full brand system — if it can be printed or designed, we do it. Walk in, call, or order online and we'll Uber it to your door.
            </p>
          </div>
          
          <div className="rv flex flex-col">
            {/* Die-Cut Stickers - Enhanced */}
            <div className="group flex items-center py-7 border-t border-[#ebebeb] gap-6 hover:px-4 hover:py-7 transition-all duration-300 relative">
              <span className="text-xs font-mono tracking-widest text-[#666] min-w-10">01</span>
              <div className="w-13 h-13 rounded-full flex items-center justify-center text-2xl flex-shrink-0 bg-[#fff0f5] group-hover:scale-110 group-hover:rotate-[-5deg] transition-transform duration-300">
                ✂️
              </div>
              <div className="text-3xl font-normal text-black flex-1 tracking-tight group-hover:text-[#2e6b38] transition-colors" style={{fontFamily: '"Instrument Serif", serif'}}>
                Die-Cut Stickers
              </div>
              <div className="text-sm text-[#666] max-w-85 leading-7">
                Custom shapes, premium materials, and our exclusive AI background removal tool. Upload your logo and watch it transform into perfect die-cut stickers instantly.
              </div>
              <Link href="/products/die-cut-stickers" className="w-11 h-11 rounded-full border-2 border-[#e0e0e0] flex items-center justify-center text-lg text-[#666] group-hover:bg-[#2e6b38] group-hover:border-[#2e6b38] group-hover:text-white group-hover:rotate-45 transition-all duration-300 flex-shrink-0">
                ↗
              </Link>
            </div>

            {/* Roll Labels - Enhanced */}
            <div className="group flex items-center py-7 border-t border-[#ebebeb] gap-6 hover:px-4 hover:py-7 transition-all duration-300 relative">
              <span className="text-xs font-mono tracking-widest text-[#666] min-w-10">02</span>
              <div className="w-13 h-13 rounded-full flex items-center justify-center text-2xl flex-shrink-0 bg-[#e8f3e9] group-hover:scale-110 group-hover:rotate-[-5deg] transition-transform duration-300">
                📦
              </div>
              <div className="text-3xl font-normal text-black flex-1 tracking-tight group-hover:text-[#2e6b38] transition-colors" style={{fontFamily: '"Instrument Serif", serif'}}>
                Roll Labels & Packaging
              </div>
              <div className="text-sm text-[#666] max-w-85 leading-7">
                Professional roll labels with smart cutline generation and real-time preview. Perfect for products, packaging, and retail brands across NYC.
              </div>
              <Link href="/products/roll-labels" className="w-11 h-11 rounded-full border-2 border-[#e0e0e0] flex items-center justify-center text-lg text-[#666] group-hover:bg-[#2e6b38] group-hover:border-[#2e6b38] group-hover:text-white group-hover:rotate-45 transition-all duration-300 flex-shrink-0">
                ↗
              </Link>
            </div>

            {/* Business Cards */}
            <div className="group flex items-center py-7 border-t border-[#ebebeb] gap-6 hover:px-4 hover:py-7 transition-all duration-300 relative">
              <span className="text-xs font-mono tracking-widest text-[#666] min-w-10">03</span>
              <div className="w-13 h-13 rounded-full flex items-center justify-center text-2xl flex-shrink-0 bg-[#fff8e0] group-hover:scale-110 group-hover:rotate-[-5deg] transition-transform duration-300">
                💼
              </div>
              <div className="text-3xl font-normal text-black flex-1 tracking-tight group-hover:text-[#2e6b38] transition-colors" style={{fontFamily: '"Instrument Serif", serif'}}>
                Business Cards & Branding
              </div>
              <div className="text-sm text-[#666] max-w-85 leading-7">
                Premium cardstock with sophisticated finishes. Our smart pricing calculator helps you find the perfect solution for your budget and timeline.
              </div>
              <Link href="/products/business-cards" className="w-11 h-11 rounded-full border-2 border-[#e0e0e0] flex items-center justify-center text-lg text-[#666] group-hover:bg-[#2e6b38] group-hover:border-[#2e6b38] group-hover:text-white group-hover:rotate-45 transition-all duration-300 flex-shrink-0">
                ↗
              </Link>
            </div>

            {/* Banners & Large Format */}
            <div className="group flex items-center py-7 border-t border-[#ebebeb] border-b gap-6 hover:px-4 hover:py-7 transition-all duration-300 relative">
              <span className="text-xs font-mono tracking-widest text-[#666] min-w-10">04</span>
              <div className="w-13 h-13 rounded-full flex items-center justify-center text-2xl flex-shrink-0 bg-[#e8f0ff] group-hover:scale-110 group-hover:rotate-[-5deg] transition-transform duration-300">
                🏳️
              </div>
              <div className="text-3xl font-normal text-black flex-1 tracking-tight group-hover:text-[#2e6b38] transition-colors" style={{fontFamily: '"Instrument Serif", serif'}}>
                Banners & Large Format
              </div>
              <div className="text-sm text-[#666] max-w-85 leading-7">
                Eye-catching vinyl banners, posters, and large format displays. Same-day Uber delivery available across all five NYC boroughs.
              </div>
              <Link href="/products/banners" className="w-11 h-11 rounded-full border-2 border-[#e0e0e0] flex items-center justify-center text-lg text-[#666] group-hover:bg-[#2e6b38] group-hover:border-[#2e6b38] group-hover:text-white group-hover:rotate-45 transition-all duration-300 flex-shrink-0">
                ↗
              </Link>
            </div>
          </div>
        </section>

        {/* Work Portfolio */}
        <section className="py-22 border-b border-[#ebebeb] overflow-hidden" id="work">
          <div className="px-10 flex justify-between items-center mb-12">
            <h2 className="rv text-5xl lg:text-6xl font-normal tracking-tight" style={{fontFamily: '"Instrument Serif", serif'}}>
              Recent <em className="italic text-[#2e6b38]">NYC work.</em>
            </h2>
            <Link href="/products" className="rv border-2 border-black text-black text-sm font-semibold px-7 py-4 rounded-full no-underline hover:border-[#2e6b38] hover:text-[#2e6b38] transition-all">
              See All Work →
            </Link>
          </div>
          
          <div className="flex gap-4 animate-[scrollLeft_32s_linear_infinite] hover:[animation-play-state:paused] w-max px-10">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-4">
                <div className="w-70 h-50 bg-[#f5e642] rounded-2xl flex-shrink-0 flex flex-col justify-end p-5 relative overflow-hidden hover:translate-y-[-6px] transition-transform duration-300">
                  <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-15">🏷️</div>
                  <div className="text-xs font-semibold tracking-wider uppercase mb-1 relative z-10 opacity-80">Roll Labels · Brooklyn</div>
                  <div className="text-2xl font-normal relative z-10" style={{fontFamily: '"Instrument Serif", serif'}}>Claudine Farms</div>
                </div>
                
                <div className="w-70 h-50 bg-[#f5a8c8] rounded-2xl flex-shrink-0 flex flex-col justify-end p-5 relative overflow-hidden hover:translate-y-[-6px] transition-transform duration-300">
                  <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-15">🎉</div>
                  <div className="text-xs font-semibold tracking-wider uppercase mb-1 relative z-10 opacity-80">Event Flyers · NYC</div>
                  <div className="text-2xl font-normal relative z-10" style={{fontFamily: '"Instrument Serif", serif'}}>On The Revel</div>
                </div>
                
                <div className="w-70 h-50 bg-[#a8d4f5] rounded-2xl flex-shrink-0 flex flex-col justify-end p-5 relative overflow-hidden hover:translate-y-[-6px] transition-transform duration-300">
                  <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-15">🖼️</div>
                  <div className="text-xs font-semibold tracking-wider uppercase mb-1 relative z-10 opacity-80">Poster Design</div>
                  <div className="text-2xl font-normal relative z-10" style={{fontFamily: '"Instrument Serif", serif'}}>Dab Pals</div>
                </div>
                
                <div className="w-70 h-50 bg-[#3dba52] text-white rounded-2xl flex-shrink-0 flex flex-col justify-end p-5 relative overflow-hidden hover:translate-y-[-6px] transition-transform duration-300">
                  <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-15">🏳️</div>
                  <div className="text-xs font-semibold tracking-wider uppercase mb-1 relative z-10 opacity-80">Vinyl Banners</div>
                  <div className="text-2xl font-normal relative z-10" style={{fontFamily: '"Instrument Serif", serif'}}>Event Wall Graphics</div>
                </div>
                
                <div className="w-70 h-50 bg-[#f5a86e] rounded-2xl flex-shrink-0 flex flex-col justify-end p-5 relative overflow-hidden hover:translate-y-[-6px] transition-transform duration-300">
                  <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-15">💼</div>
                  <div className="text-xs font-semibold tracking-wider uppercase mb-1 relative z-10 opacity-80">Brand Identity</div>
                  <div className="text-2xl font-normal relative z-10" style={{fontFamily: '"Instrument Serif", serif'}}>Brooklyn Startup</div>
                </div>
                
                <div className="w-70 h-50 bg-[#d4b8f0] rounded-2xl flex-shrink-0 flex flex-col justify-end p-5 relative overflow-hidden hover:translate-y-[-6px] transition-transform duration-300">
                  <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-15">📮</div>
                  <div className="text-xs font-semibold tracking-wider uppercase mb-1 relative z-10 opacity-80">Die-Cut Stickers</div>
                  <div className="text-2xl font-normal relative z-10" style={{fontFamily: '"Instrument Serif", serif'}}>NYC Food Brand</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-22 px-10 border-b border-[#ebebeb] overflow-hidden">
          <div className="rv text-sm font-semibold text-[#666] mb-10">What our NYC clients are saying</div>
          <div className="flex gap-5 overflow-x-auto pb-3 scrollbar-none">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`${testimonial.color} rounded-3xl flex-shrink-0 w-78 p-8 flex flex-col gap-6 hover:translate-y-[-6px] hover:rotate-[-1deg] transition-transform duration-300`}
              >
                <div className="text-[15px] leading-7 font-medium">{testimonial.text}</div>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-black/10 flex items-center justify-center text-xl flex-shrink-0">
                    {index === 0 ? '👩' : index === 1 ? '🧑' : '👩‍💼'}
                  </div>
                  <div>
                    <div className="text-lg font-normal" style={{fontFamily: '"Instrument Serif", serif'}}>{testimonial.author}</div>
                    <div className="text-xs opacity-70 font-medium mt-1">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-25 px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center border-b border-[#ebebeb]" id="contact">
          <div className="rv">
            <h2 className="text-5xl lg:text-7xl leading-[0.95] font-normal tracking-tight mb-10" style={{fontFamily: '"Instrument Serif", serif'}}>
              Start your<br/>
              <em className="italic text-[#2e6b38]">project today.</em>
            </h2>
            
            <div className="space-y-8">
              <div className="pb-8 mb-8 border-b border-[#ebebeb]">
                <div className="text-4xl font-normal mb-2" style={{fontFamily: '"Instrument Serif", serif'}}>Email</div>
                <Link href="mailto:info@lettuceprint.com" className="flex items-center gap-3 text-[15px] font-medium text-[#666] no-underline hover:text-[#2e6b38] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs flex-shrink-0">
                    →
                  </div>
                  info@lettuceprint.com
                </Link>
              </div>
              
              <div className="pb-8 mb-8 border-b border-[#ebebeb]">
                <div className="text-4xl font-normal mb-2" style={{fontFamily: '"Instrument Serif", serif'}}>Call or Text</div>
                <Link href="tel:3476030557" className="flex items-center gap-3 text-[15px] font-medium text-[#666] no-underline hover:text-[#2e6b38] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs flex-shrink-0">
                    →
                  </div>
                  (347) 603-0557
                </Link>
              </div>
              
              <div>
                <div className="text-4xl font-normal mb-2" style={{fontFamily: '"Instrument Serif", serif'}}>Visit Our Brooklyn Studio</div>
                <Link href="https://maps.google.com/?q=361+Stagg+St+Brooklyn+NY+11206" target="_blank" className="flex items-center gap-3 text-[15px] font-medium text-[#666] no-underline hover:text-[#2e6b38] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs flex-shrink-0">
                    →
                  </div>
                  361 Stagg St, Brooklyn NY 11206
                </Link>
              </div>
            </div>
          </div>
          
          <div className="rv bg-[#f5e642] rounded-3xl p-12">
            <span className="text-7xl mb-5 block">🥬</span>
            <h3 className="text-4xl font-normal mb-3 tracking-tight leading-tight" style={{fontFamily: '"Instrument Serif", serif'}}>
              We'll get back to you<br/>
              <em className="italic">within the hour.</em>
            </h3>
            <p className="text-sm text-[#555] leading-7 mb-7">
              Drop us a message and our Brooklyn team will follow up fast — usually within the hour. Rush printing, same-day turnaround, and Uber delivery across NYC all available.
            </p>
            <div className="space-y-3">
              <input 
                className="w-full border-2 border-black/10 rounded-full px-5 py-4 text-sm bg-white outline-none focus:border-[#2e6b38] transition-colors" 
                type="text" 
                placeholder="Your Name" 
              />
              <input 
                className="w-full border-2 border-black/10 rounded-full px-5 py-4 text-sm bg-white outline-none focus:border-[#2e6b38] transition-colors" 
                type="email" 
                placeholder="Email Address" 
              />
              <input 
                className="w-full border-2 border-black/10 rounded-full px-5 py-4 text-sm bg-white outline-none focus:border-[#2e6b38] transition-colors" 
                type="tel" 
                placeholder="Phone Number (optional)" 
              />
              <textarea 
                className="w-full border-2 border-black/10 rounded-2xl px-5 py-4 text-sm bg-white outline-none resize-none h-28 focus:border-[#2e6b38] transition-colors" 
                placeholder="What do you need? Printing, graphic design, rush order, Uber delivery — tell us everything and we'll get you a quote."
              />
              <button className="w-full bg-black text-white border-none rounded-full px-8 py-4 text-sm font-bold hover:bg-[#2e6b38] hover:translate-y-[-2px] transition-all duration-200">
                Send Message →
              </button>
            </div>
          </div>
        </section>

        {/* Footer Marquee */}
        <div className="overflow-hidden py-4 border-t border-[#ebebeb]">
          <div className="inline-flex animate-[scroll_18s_linear_infinite] whitespace-nowrap">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="inline-flex">
                <span className="text-9xl tracking-tight text-[#ebebeb] px-8 italic" style={{fontFamily: '"Instrument Serif", serif'}}>Lettuce Print</span>
                <span className="text-5xl text-[#ddd] px-8" style={{fontFamily: '"Instrument Serif", serif'}}>🥬</span>
                <span className="text-9xl tracking-tight text-[#ebebeb] px-8 italic" style={{fontFamily: '"Instrument Serif", serif'}}>Brooklyn NY</span>
                <span className="text-5xl text-[#ddd] px-8" style={{fontFamily: '"Instrument Serif", serif'}}>✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black text-[#888] py-18 px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
            <div>
              <Link href="/" className="text-white font-bold text-xl no-underline flex items-center gap-2 mb-4">
                🥬 Lettuce Print
              </Link>
              <p className="text-sm leading-7 max-w-70 mb-6">
                Brooklyn's print shop and graphic design studio. Serving businesses, restaurants, and brands across all five NYC boroughs. Uber delivery available.
              </p>
              <div className="flex gap-3">
                <a href="https://www.instagram.com/lettuce.print" className="w-9 h-9 border border-[#2a2a2a] rounded-full flex items-center justify-center text-xs text-[#555] no-underline hover:border-[#3dba52] hover:text-[#3dba52] transition-all">
                  ig
                </a>
                <a href="https://twitter.com/lettuce_print" className="w-9 h-9 border border-[#2a2a2a] rounded-full flex items-center justify-center text-xs text-[#555] no-underline hover:border-[#3dba52] hover:text-[#3dba52] transition-all">
                  𝕏
                </a>
                <a href="https://www.linkedin.com/company/lettuce-print/" className="w-9 h-9 border border-[#2a2a2a] rounded-full flex items-center justify-center text-xs text-[#555] no-underline hover:border-[#3dba52] hover:text-[#3dba52] transition-all">
                  in
                </a>
              </div>
            </div>
            
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase text-[#555] mb-4">Services</div>
              <ul className="list-none space-y-3">
                <li><Link href="/products/business-cards" className="text-sm text-[#444] no-underline hover:text-white transition-colors">Business Card Printing</Link></li>
                <li><Link href="/products/banners" className="text-sm text-[#444] no-underline hover:text-white transition-colors">Banner & Sign Printing</Link></li>
                <li><Link href="/products/flyers" className="text-sm text-[#444] no-underline hover:text-white transition-colors">Flyer & Postcard Printing</Link></li>
                <li><Link href="/products/roll-labels" className="text-sm text-[#444] no-underline hover:text-white transition-colors">Roll Labels</Link></li>
                <li><Link href="/products/die-cut-stickers" className="text-sm text-[#444] no-underline hover:text-white transition-colors">Die-Cut Stickers</Link></li>
                <li><Link href="/services" className="text-sm text-[#444] no-underline hover:text-white transition-colors">Logo & Graphic Design</Link></li>
              </ul>
            </div>
            
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase text-[#555] mb-4">Company</div>
              <ul className="list-none space-y-3">
                <li><Link href="/about" className="text-sm text-[#444] no-underline hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/products" className="text-sm text-[#444] no-underline hover:text-white transition-colors">Our Work / Portfolio</Link></li>
                <li><Link href="/quote" className="text-sm text-[#444] no-underline hover:text-white transition-colors">Get a Free Quote</Link></li>
                <li><Link href="/contact" className="text-sm text-[#444] no-underline hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase text-[#555] mb-4">Location & Hours</div>
              <ul className="list-none space-y-3">
                <li><a href="https://maps.google.com/?q=361+Stagg+St+Brooklyn+NY+11206" target="_blank" className="text-sm text-[#444] no-underline hover:text-white transition-colors">361 Stagg St</a></li>
                <li><span className="text-sm text-[#444]">Brooklyn, NY 11206</span></li>
                <li><span className="text-sm text-[#444]">Mon–Fri: 9am–6pm</span></li>
                <li><span className="text-sm text-[#444]">Walk-ins Welcome</span></li>
                <li><span className="text-sm text-[#444]">🚗 Uber Delivery Available</span></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-7 border-t border-[#1a1a1a] gap-3">
            <span className="text-xs text-[#333]">
              © 2025 Lettuce Print · 361 Stagg St, Brooklyn NY 11206 · Print Shop & Graphic Design for NYC
            </span>
            <div className="flex gap-6">
              <a href="tel:3476030557" className="text-xs text-[#444] no-underline flex items-center gap-2 hover:text-[#3dba52] transition-colors">
                <em className="text-[#3dba52] not-italic">☎</em> (347) 603-0557
              </a>
              <a href="mailto:info@lettuceprint.com" className="text-xs text-[#444] no-underline flex items-center gap-2 hover:text-[#3dba52] transition-colors">
                <em className="text-[#3dba52] not-italic">✉</em> info@lettuceprint.com
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}