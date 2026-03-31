'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface LabelConfig {
  shape: 'rectangle' | 'circle' | 'die-cut' | 'square';
  width: number;
  height: number;
  material: 'heavyweight-matte' | 'high-gloss-poly' | 'recycled-kraft' | 'metallic-silver';
  quantity: number;
}

const materials = {
  'heavyweight-matte': {
    name: 'Heavyweight Matte',
    description: 'Non-reflective industrial finish.',
    basePrice: 0.85,
  },
  'high-gloss-poly': {
    name: 'High-Gloss Poly', 
    description: 'Weather-resistant chemical sheen.',
    basePrice: 1.20,
  },
  'recycled-kraft': {
    name: 'Recycled Kraft',
    description: 'Unbleached raw Brooklyn pulp.',
    basePrice: 0.75,
  },
  'metallic-silver': {
    name: 'Metallic Silver',
    description: 'Brushed aluminum substrate.',
    basePrice: 1.45,
  },
};

const shapes = {
  rectangle: { name: 'Rectangle', icon: '▬' },
  circle: { name: 'Circle', icon: '●' },
  'die-cut': { name: 'Die-Cut', icon: '◊' },
  square: { name: 'Square', icon: '■' },
};

export default function ConfiguratorPage() {
  const [config, setConfig] = useState<LabelConfig>({
    shape: 'rectangle',
    width: 3.0,
    height: 5.0,
    material: 'heavyweight-matte',
    quantity: 500,
  });

  const [jobTicket, setJobTicket] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  // Generate job ticket ID
  useEffect(() => {
    const generateTicket = () => {
      const timestamp = new Date().getFullYear().toString().slice(-2);
      const random = Math.random().toString(36).substr(2, 2).toUpperCase();
      return `BKLYN-PRNT-${timestamp}${random}`;
    };
    setJobTicket(generateTicket());
  }, []);

  // Calculate price
  useEffect(() => {
    const calculatePrice = () => {
      const material = materials[config.material];
      const area = config.width * config.height;
      const setupFee = 45;
      const materialCost = material.basePrice * area * config.quantity;
      const complexityMultiplier = config.shape === 'die-cut' ? 1.3 : 1.0;
      
      return Math.round((setupFee + materialCost * complexityMultiplier) * 100) / 100;
    };
    
    setTotalPrice(calculatePrice());
  }, [config]);

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body antialiased">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white flex justify-between items-center px-6 h-20">
        <div className="text-2xl font-black tracking-tighter text-zinc-900 font-headline">
          LETTUCE PRINT
        </div>
        <nav className="hidden md:flex gap-8 items-center h-full">
          <Link href="/" className="font-headline font-bold uppercase tracking-tighter text-zinc-500 hover:bg-zinc-50 transition-colors px-2 py-1">
            PRINT
          </Link>
          <Link href="/configurator" className="font-headline font-bold uppercase tracking-tighter text-primary border-b-4 border-primary-container px-2 py-1">
            DESIGN
          </Link>
          <Link href="/products" className="font-headline font-bold uppercase tracking-tighter text-zinc-500 hover:bg-zinc-50 transition-colors px-2 py-1">
            SHOP
          </Link>
          <Link href="/about" className="font-headline font-bold uppercase tracking-tighter text-zinc-500 hover:bg-zinc-50 transition-colors px-2 py-1">
            ABOUT
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <button className="bg-primary-container text-on-primary-container font-headline font-bold uppercase tracking-tighter px-6 py-2 hover:scale-95 transition-transform duration-75">
            START PROJECT
          </button>
        </div>
      </header>

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Configurator Steps */}
          <div className="lg:col-span-8 space-y-12">
            <section>
              <h1 className="text-6xl font-black font-headline uppercase tracking-tighter leading-none mb-4">
                Label <br/>
                <span className="text-primary-container bg-on-surface px-2">Configurator</span>
              </h1>
              <p className="text-on-surface-variant font-body text-xl max-w-xl">
                Select your specs below. Our industrial-grade presses ensure high-contrast clarity and Brooklyn-strength durability.
              </p>
            </section>

            {/* Step 1: Shape */}
            <div className="space-y-6">
              <div className="flex items-baseline gap-4">
                <span className="font-headline text-4xl font-black text-outline-variant opacity-30">01</span>
                <h2 className="font-headline text-2xl font-bold uppercase">SELECT SHAPE</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(shapes).map(([key, shape]) => (
                  <button
                    key={key}
                    onClick={() => setConfig(prev => ({ ...prev, shape: key as any }))}
                    className={`aspect-square flex flex-col items-center justify-center gap-3 transition-all ${
                      config.shape === key 
                        ? 'bg-primary-container border-4 border-on-surface' 
                        : 'bg-white hover:bg-surface-container-high'
                    }`}
                  >
                    <span className="text-4xl text-on-surface">{shape.icon}</span>
                    <span className="font-headline font-bold uppercase text-xs">{shape.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Dimensions */}
            <div className="space-y-6">
              <div className="flex items-baseline gap-4">
                <span className="font-headline text-4xl font-black text-outline-variant opacity-30">02</span>
                <h2 className="font-headline text-2xl font-bold uppercase">DIMENSIONS (IN)</h2>
              </div>
              <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8">
                <div className="w-full space-y-2">
                  <label className="block font-headline font-bold text-xs uppercase text-on-surface-variant">
                    Width
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    min="0.5"
                    max="12"
                    value={config.width}
                    onChange={(e) => setConfig(prev => ({ ...prev, width: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-surface-container-highest border-none focus:ring-0 focus:border-b-2 focus:border-primary text-2xl font-headline font-bold p-4"
                  />
                </div>
                <div className="text-outline-variant font-headline font-black text-2xl">X</div>
                <div className="w-full space-y-2">
                  <label className="block font-headline font-bold text-xs uppercase text-on-surface-variant">
                    Height
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    min="0.5"
                    max="12"
                    value={config.height}
                    onChange={(e) => setConfig(prev => ({ ...prev, height: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-surface-container-highest border-none focus:ring-0 focus:border-b-2 focus:border-primary text-2xl font-headline font-bold p-4"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Material */}
            <div className="space-y-6">
              <div className="flex items-baseline gap-4">
                <span className="font-headline text-4xl font-black text-outline-variant opacity-30">03</span>
                <h2 className="font-headline text-2xl font-bold uppercase">MATERIAL STOCK</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(materials).map(([key, material]) => (
                  <div
                    key={key}
                    onClick={() => setConfig(prev => ({ ...prev, material: key as any }))}
                    className={`p-6 flex justify-between items-start cursor-pointer transition-colors ${
                      config.material === key
                        ? 'bg-on-surface text-white'
                        : 'bg-white hover:bg-surface-container-high'
                    }`}
                  >
                    <div>
                      <h3 className="font-headline font-bold text-lg uppercase tracking-tight">
                        {material.name}
                      </h3>
                      <p className={`font-body text-sm ${config.material === key ? 'opacity-70' : 'text-on-surface-variant'}`}>
                        {material.description}
                      </p>
                    </div>
                    <span className="text-2xl">
                      {config.material === key ? '●' : '○'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4: Quantity */}
            <div className="space-y-6">
              <div className="flex items-baseline gap-4">
                <span className="font-headline text-4xl font-black text-outline-variant opacity-30">04</span>
                <h2 className="font-headline text-2xl font-bold uppercase">QUANTITY</h2>
              </div>
              <div className="bg-white p-8">
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="50"
                  value={config.quantity}
                  onChange={(e) => setConfig(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                  className="w-full mb-4"
                />
                <div className="flex justify-between items-center">
                  <span className="font-headline font-bold text-lg">{config.quantity} units</span>
                  <div className="flex gap-2">
                    {[250, 500, 1000, 2500].map(qty => (
                      <button
                        key={qty}
                        onClick={() => setConfig(prev => ({ ...prev, quantity: qty }))}
                        className={`px-4 py-2 font-headline font-bold text-sm uppercase transition-colors ${
                          config.quantity === qty
                            ? 'bg-primary-container text-on-primary-container'
                            : 'bg-surface-container hover:bg-surface-container-high'
                        }`}
                      >
                        {qty}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Job Ticket / Order Summary */}
          <aside className="lg:col-span-4 sticky top-24">
            <div className="bg-white p-8 space-y-8 relative overflow-hidden shadow-2xl job-ticket">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h2 className="font-headline font-black text-2xl uppercase leading-none">Job Ticket</h2>
                  <p className="font-headline font-bold text-[10px] tracking-widest text-outline-variant uppercase">
                    {jobTicket}
                  </p>
                </div>
                <span className="text-4xl opacity-20">📋</span>
              </div>
              
              <div className="space-y-4 font-headline uppercase text-sm font-bold">
                <div className="flex justify-between border-b border-surface-container pb-2">
                  <span className="text-outline-variant">Shape</span>
                  <span>{shapes[config.shape].name}</span>
                </div>
                <div className="flex justify-between border-b border-surface-container pb-2">
                  <span className="text-outline-variant">Size</span>
                  <span>{config.width}" x {config.height}"</span>
                </div>
                <div className="flex justify-between border-b border-surface-container pb-2">
                  <span className="text-outline-variant">Stock</span>
                  <span>{materials[config.material].name.split(' ').map(w => w.slice(0,3)).join(' ')}</span>
                </div>
                <div className="flex justify-between border-b border-surface-container pb-2">
                  <span className="text-outline-variant">Quantity</span>
                  <span>{config.quantity} units</span>
                </div>
              </div>

              <div className="py-8 bg-surface-container-low px-4 text-center">
                <div className="font-headline font-black text-xs uppercase tracking-[0.2em] text-on-surface mb-2">
                  Total Project Estimate
                </div>
                <div className="font-headline font-black text-6xl text-primary-container bg-on-surface inline-block px-4 py-2">
                  ${totalPrice}
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-on-surface text-white font-headline font-black uppercase text-lg py-5 hover:bg-zinc-800 transition-all hover:scale-95">
                  APPROVE & PRINT
                </button>
                <p className="text-[10px] text-center font-headline font-bold uppercase text-outline-variant">
                  All sales final once ink hits the stock. <br/> Brooklyn, NY Production Floor.
                </p>
              </div>

              {/* Industrial Pattern Overlay */}
              <div className="industrial-overlay">
                <span className="text-9xl">🖨</span>
              </div>
            </div>

            {/* Visual Preview Card */}
            <div className="mt-8 bg-on-surface h-64 flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 to-primary/10 opacity-60"></div>
              <div className="absolute flex flex-col items-center z-10">
                <div 
                  className="bg-primary-container border-4 border-white shadow-xl flex items-center justify-center"
                  style={{
                    width: `${Math.min(config.width * 20, 120)}px`,
                    height: `${Math.min(config.height * 20, 160)}px`,
                    borderRadius: config.shape === 'circle' ? '50%' : config.shape === 'square' ? '0' : config.shape === 'die-cut' ? '20%' : '8px',
                  }}
                >
                  <span className="font-headline font-black text-on-surface text-xl uppercase tracking-tighter transform -rotate-12">
                    LETTUCE
                  </span>
                </div>
                <p className="mt-4 font-headline font-bold text-white text-[10px] uppercase tracking-widest">
                  Digital Simulation
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 w-full py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div className="space-y-4">
            <div className="text-lg font-black text-white font-headline">LETTUCE</div>
            <p className="font-headline font-bold uppercase text-xs tracking-widest text-primary-container">
              ©2024 LETTUCE PRINT BROOKLYN. ALL RIGHTS RESERVED.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/terms" className="font-headline font-bold uppercase text-xs tracking-widest text-zinc-400 hover:text-white transition-colors">
              TERMS
            </Link>
            <Link href="/privacy" className="font-headline font-bold uppercase text-xs tracking-widest text-zinc-400 hover:text-white transition-colors">
              PRIVACY
            </Link>
            <Link href="/shipping" className="font-headline font-bold uppercase text-xs tracking-widest text-zinc-400 hover:text-white transition-colors">
              SHIPPING
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/careers" className="font-headline font-bold uppercase text-xs tracking-widest text-zinc-400 hover:text-white transition-colors">
              CAREERS
            </Link>
            <a href="#" className="font-headline font-bold uppercase text-xs tracking-widest text-zinc-400 hover:text-white transition-colors">
              INSTAGRAM
            </a>
          </div>
          <div className="flex flex-col justify-end items-end">
            <div className="flex gap-4">
              <span className="text-primary-container text-2xl">🖨</span>
              <span className="text-primary-container text-2xl">⚙️</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}