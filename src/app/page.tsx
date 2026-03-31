'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      {/* Navigation Header */}
      <header className="fixed top-0 w-full z-50 bg-white flex justify-between items-center px-6 h-20">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-black tracking-tighter text-zinc-900 font-headline">
            LETTUCE PRINT
          </span>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="font-headline font-bold uppercase tracking-tighter text-primary border-b-4 border-primary-container py-1">
              PRINT
            </Link>
            <Link href="/configurator" className="font-headline font-bold uppercase tracking-tighter text-zinc-500 hover:bg-zinc-50 px-2 py-1 transition-colors">
              DESIGN
            </Link>
            <Link href="/products" className="font-headline font-bold uppercase tracking-tighter text-zinc-500 hover:bg-zinc-50 px-2 py-1 transition-colors">
              SHOP
            </Link>
            <Link href="/about" className="font-headline font-bold uppercase tracking-tighter text-zinc-500 hover:bg-zinc-50 px-2 py-1 transition-colors">
              ABOUT
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/configurator" 
            className="bg-primary-container text-on-primary-container font-headline font-bold uppercase tracking-tighter px-6 py-2 hover:scale-95 transition-transform duration-75"
          >
            START PROJECT
          </Link>
          <div className="w-10 h-10 bg-surface-container overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-primary-container to-primary flex items-center justify-center">
              <span className="text-on-primary-container font-headline font-black text-sm">LP</span>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section: The Industrial Editor */}
        <section className="relative bg-surface-container-lowest min-h-[870px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-gradient-to-br from-surface-container-low via-surface to-primary-container/5 opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-primary-container/10"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10 grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-10">
              <div className="inline-block bg-on-surface text-surface font-headline font-bold text-sm tracking-widest px-4 py-1 mb-8">
                EST. BROOKLYN NY
              </div>
              <h1 className="font-headline text-[clamp(4rem,12vw,9rem)] leading-[0.85] font-black uppercase tracking-tighter mb-8">
                INKED IN<br/>
                <span className="text-primary-container bg-on-surface px-2">PRESSURE</span>
              </h1>
              <div className="flex flex-wrap items-end gap-8">
                <Link 
                  href="/configurator" 
                  className="bg-primary-container text-on-primary-container font-headline font-black text-2xl uppercase px-10 py-6 hover:bg-primary hover:text-primary-container transition-all hover:scale-95 block"
                >
                  ORDER REELS
                </Link>
                <div className="max-w-xs mb-2">
                  <p className="font-body text-lg font-medium leading-tight text-on-surface-variant">
                    Premium production for the independent era. We turn digital concepts into physical weight.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Brooklyn Badge */}
          <BrooklynBadge />
        </section>

        {/* Product Categories: Bento Grid */}
        <section className="py-24 bg-surface px-6">
          <div className="container mx-auto">
            <div className="flex justify-between items-end mb-16">
              <h2 className="font-headline text-6xl font-black uppercase tracking-tighter">THE CATALOG</h2>
              <Link href="/products" className="font-headline text-primary font-bold text-xl uppercase underline underline-offset-8">
                VIEW ALL SPECS
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Roll Labels */}
              <div className="md:col-span-8 group relative bg-surface-container-lowest overflow-hidden h-[500px] cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 to-primary/10 group-hover:from-primary-container/30 group-hover:to-primary/20 transition-all duration-700"></div>
                <div className="absolute bottom-0 left-0 p-10 z-10">
                  <h3 className="font-headline text-5xl font-black text-white bg-on-surface px-4 py-2 inline-block mb-4">
                    ROLL LABELS
                  </h3>
                  <p className="font-body text-surface bg-on-surface/80 p-4 max-w-sm">
                    High-speed production reels for automated packaging. Solvent-resistant finishes available.
                  </p>
                  <Link 
                    href="/configurator" 
                    className="mt-4 inline-block font-headline font-bold uppercase text-sm bg-primary-container text-on-primary-container px-4 py-2 hover:scale-95 transition-transform"
                  >
                    CONFIGURE →
                  </Link>
                </div>
              </div>

              {/* Streetwear Stickers */}
              <div className="md:col-span-4 group relative bg-surface-container-high overflow-hidden h-[500px] cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-on-surface/60 group-hover:to-on-surface/80 transition-all"></div>
                <div className="absolute inset-0 flex flex-col justify-between p-10 z-10">
                  <div className="text-right">
                    <span className="bg-primary-container text-on-primary-container font-headline font-black px-3 py-1">
                      VINYL HEAVYWEIGHT
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline text-4xl font-black text-on-surface leading-none uppercase mb-4">
                      STREETWEAR<br/>STICKERS
                    </h3>
                    <Link 
                      href="/products/stickers" 
                      className="font-headline font-bold uppercase text-sm border-b-2 border-on-surface hover:bg-on-surface hover:text-surface px-2 py-1 transition-colors"
                    >
                      BROWSE →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Cannabis Packaging */}
              <div className="md:col-span-4 group relative bg-on-surface overflow-hidden h-[400px] cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center p-10 z-10">
                  <div className="text-center">
                    <h3 className="font-headline text-3xl font-black text-primary-container uppercase tracking-tighter mb-4">
                      CANNABIS<br/>PACKAGING
                    </h3>
                    <Link 
                      href="/products/packaging" 
                      className="font-headline font-bold uppercase text-sm text-primary-container border border-primary-container px-4 py-2 hover:bg-primary-container hover:text-on-primary-container transition-colors"
                    >
                      VIEW SAMPLES
                    </Link>
                  </div>
                </div>
              </div>

              {/* Custom Boxes */}
              <div className="md:col-span-8 group relative bg-surface-container-low overflow-hidden h-[400px] cursor-pointer">
                <div className="absolute inset-0 flex p-10 items-start justify-between">
                  <div className="z-10">
                    <h3 className="font-headline text-4xl font-black text-on-surface uppercase mb-4">
                      CUSTOM MAILERS
                    </h3>
                    <p className="font-body max-w-xs text-on-surface-variant font-medium mb-6">
                      Eco-friendly recycled cardstock with high-definition digital printing for premium unboxing.
                    </p>
                    <Link 
                      href="/products/boxes" 
                      className="border-b-2 border-on-surface font-headline font-bold uppercase hover:bg-on-surface hover:text-surface px-2 py-1 transition-colors"
                    >
                      Configure Box →
                    </Link>
                  </div>
                  <div className="w-1/2 h-full bg-gradient-to-l from-primary-container/20 to-transparent flex items-end justify-center pb-8">
                    <div className="w-32 h-48 bg-surface-container border-4 border-on-surface flex items-center justify-center">
                      <span className="font-headline font-black text-on-surface text-2xl -rotate-12">
                        SAMPLE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-on-surface text-surface py-24 px-6 overflow-hidden relative">
          <div className="absolute top-0 right-0 font-headline font-black text-[20rem] text-surface-container/5 leading-none translate-x-1/4 -translate-y-1/4 select-none">
            BK
          </div>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            <div className="flex flex-col gap-2">
              <span className="text-primary-container font-headline text-7xl font-black">1.2M+</span>
              <span className="font-headline font-bold text-xl uppercase tracking-tighter">IMPRESSIONS / MO</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary-container font-headline text-7xl font-black">24H</span>
              <span className="font-headline font-bold text-xl uppercase tracking-tighter">PROTOTYPING</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary-container font-headline text-7xl font-black">100%</span>
              <span className="font-headline font-bold text-xl uppercase tracking-tighter">SOLVENT FREE</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary-container font-headline text-7xl font-black">01</span>
              <span className="font-headline font-bold text-xl uppercase tracking-tighter">PRINTER TO RULE</span>
            </div>
          </div>
        </section>

        {/* Factory Standard Section */}
        <FactoryStandardSection />

        {/* CTA Section */}
        <section className="py-40 bg-primary-container text-on-primary-container text-center px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-headline text-8xl font-black uppercase tracking-tighter mb-12 leading-[0.8]">
              WANT TO PRINT<br/>SOMETHING BOLD?
            </h2>
            <Link 
              href="/configurator" 
              className="bg-on-primary-container text-primary-container font-headline font-black text-3xl px-16 py-8 uppercase hover:scale-105 transition-transform inline-block"
            >
              GET A QUOTE NOW
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 w-full py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div className="flex flex-col gap-6">
            <span className="text-lg font-black text-white font-headline">LETTUCE PRINT</span>
            <p className="font-headline font-bold uppercase text-xs tracking-widest text-primary-container">
              ©2024 LETTUCE PRINT BROOKLYN. ALL RIGHTS RESERVED.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white font-headline font-black uppercase tracking-tight">SERVICES</span>
            <nav className="flex flex-col gap-2 font-headline font-bold uppercase text-xs tracking-widest">
              <Link href="/configurator" className="text-zinc-400 hover:text-white transition-colors">ROLL LABELS</Link>
              <Link href="/products/stickers" className="text-zinc-400 hover:text-white transition-colors">STICKERS</Link>
              <Link href="/products/packaging" className="text-zinc-400 hover:text-white transition-colors">PACKAGING</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white font-headline font-black uppercase tracking-tight">COMPANY</span>
            <nav className="flex flex-col gap-2 font-headline font-bold uppercase text-xs tracking-widest">
              <Link href="/terms" className="text-zinc-400 hover:text-white transition-colors">TERMS</Link>
              <Link href="/privacy" className="text-zinc-400 hover:text-white transition-colors">PRIVACY</Link>
              <Link href="/careers" className="text-zinc-400 hover:text-white transition-colors">CAREERS</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white font-headline font-black uppercase tracking-tight">SOCIAL</span>
            <nav className="flex flex-col gap-2 font-headline font-bold uppercase text-xs tracking-widest">
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">INSTAGRAM</a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">VIMEO</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Brooklyn Badge Component
function BrooklynBadge() {
  return (
    <div className="absolute bottom-12 right-12 hidden md:block">
      <div className="w-40 h-40 border-4 border-on-surface rounded-full flex items-center justify-center p-2 relative">
        <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100">
            <defs>
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
            </defs>
            <text className="font-headline font-black uppercase text-[10px] tracking-[0.2em] fill-on-surface">
              <textPath href="#circlePath">
                MADE IN NEW YORK CITY • 100% BKLYN • QUALITY FIRST • 
              </textPath>
            </text>
          </svg>
        </div>
        <span className="font-headline font-black text-2xl">BKLYN</span>
      </div>
    </div>
  );
}

// Factory Standard Section Component
function FactoryStandardSection() {
  return (
    <section className="bg-white py-32 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-headline text-7xl font-black uppercase tracking-tighter leading-none mb-12">
              FACTORY<br/>
              <span className="text-primary">STANDARD</span>
            </h2>
            <div className="space-y-12">
              <div className="group">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-headline font-black text-4xl">01</span>
                  <span className="text-primary text-4xl">🖨</span>
                </div>
                <h4 className="font-headline font-bold text-2xl uppercase mb-2">PIGMENT DEPTH</h4>
                <p className="font-body text-on-surface-variant">
                  Using 7-color process ink for gamut expansion and deep, archival blacks.
                </p>
              </div>
              <div className="group">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-headline font-black text-4xl">02</span>
                  <span className="text-primary text-4xl">⚙️</span>
                </div>
                <h4 className="font-headline font-bold text-2xl uppercase mb-2">LASER PRECISION</h4>
                <p className="font-body text-on-surface-variant">
                  Digital die-cutting ensures zero drift and sharp edges on every sticker unit.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-high aspect-square p-8 overflow-hidden relative">
            <div className="w-full h-full bg-gradient-to-br from-primary-container/30 to-primary/20 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-primary-container border-4 border-on-surface mb-4 flex items-center justify-center mx-auto">
                  <span className="font-headline font-black text-on-primary-container text-xl">
                    INK TEST
                  </span>
                </div>
                <span className="font-headline font-black text-primary text-sm uppercase">
                  SAMPLES AVAILABLE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}