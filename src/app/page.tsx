import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {
  ArrowRight,
  Check,
  Clock3,
  MapPin,
  Package,
  Palette,
  Printer,
  Rocket,
  ShoppingCart,
  Star,
  Truck,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Lettuce Print | Brooklyn Print Shop & Graphic Design Studio',
  description:
    'Brooklyn print shop and graphic design studio with fast turnaround, featured online ordering, and local delivery across NYC.',
}

const featuredProducts = [
  {
    name: 'Business Cards',
    href: '/products/business-cards',
    description: 'Most reordered item for restaurants, agencies, and local brands.',
    price: 'From $49',
    accent: 'yellow',
  },
  {
    name: 'Flyers',
    href: '/products/flyers',
    description: 'Quick-turn promos, menus, handouts, and event drops.',
    price: 'From $79',
    accent: 'pink',
  },
  {
    name: 'Roll Labels',
    href: '/products/roll-labels',
    description: 'Retail-ready labels for jars, tins, boxes, and packaging.',
    price: 'From $129',
    accent: 'green',
  },
  {
    name: 'Vinyl Banners',
    href: '/products/vinyl-banners',
    description: 'Street-facing signage, pop-ups, step-and-repeats, and events.',
    price: 'From $95',
    accent: 'blue',
  },
]

const services = [
  {
    title: 'Commercial Printing',
    icon: Printer,
    body: 'Business cards, flyers, brochures, posters, postcards, menus, and high-volume marketing pieces for NYC teams that need reliability.',
  },
  {
    title: 'Graphic Design',
    icon: Palette,
    body: 'In-house design support for logos, menus, event graphics, sell sheets, packaging systems, and brand refresh work.',
  },
  {
    title: 'Labels & Packaging',
    icon: Package,
    body: 'Roll labels, cartons, sleeves, stickers, and product packaging built to look strong online and on shelf.',
  },
  {
    title: 'Rush Fulfillment',
    icon: Rocket,
    body: 'For repeatable products, customers can move faster with direct product pages instead of waiting on a phone or email quote every time.',
  },
]

const work = [
  { tag: 'Roll Labels · Brooklyn', name: 'Claudine Farms', tone: 'yellow' },
  { tag: 'Event Flyers · NYC', name: 'On The Revel', tone: 'pink' },
  { tag: 'Poster Design', name: 'Dab Pals', tone: 'blue' },
  { tag: 'Vinyl Banners', name: 'Event Wall Graphics', tone: 'green' },
  { tag: 'Brand Identity', name: 'Brooklyn Startup', tone: 'orange' },
  { tag: 'Postcards · Manhattan', name: 'Hospitality Brand', tone: 'lavender' },
]

const testimonials = [
  {
    quote:
      'The new packaging and labels came out clean, premium, and right on time. We stopped bouncing between printers after working with Lettuce Print.',
    name: 'Maya C.',
    role: 'Founder, Brooklyn CPG Brand',
  },
  {
    quote:
      'We needed banners fast for an event and they made the process simple. The quality was strong and the turnaround felt built for New York.',
    name: 'Marcus T.',
    role: 'Event Producer, NYC',
  },
  {
    quote:
      'Their team understands both design and production, which is rare. We got better looking collateral and a smoother ordering process.',
    name: 'Jasmine R.',
    role: 'Restaurant Owner, Brooklyn',
  },
]

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="lp-home">
        <section className="lp-hero">
          <div className="lp-shell lp-hero-grid">
            <div className="lp-hero-copy">
              <p className="lp-kicker">Brooklyn print shop + design studio</p>
              <h1>
                Brooklyn&apos;s <em>best</em>
                <br />
                print shop &amp;
                <br />
                <em>online-ready storefront.</em>
              </h1>
              <p className="lp-hero-text">
                A more premium Lettuce Print homepage inspired by the LP site example, but rebuilt for the
                current e-commerce repo so select products can move from quote-only to click-to-buy.
              </p>

              <div className="lp-hero-actions">
                <Link href="/products" className="lp-btn lp-btn-dark">
                  Shop Products
                  <ArrowRight size={18} />
                </Link>
                <Link href="/quote" className="lp-btn lp-btn-outline">
                  Custom Quote
                </Link>
              </div>

              <div className="lp-hero-stats">
                <div>
                  <strong>500+</strong>
                  <span>Projects delivered</span>
                </div>
                <div>
                  <strong>200+</strong>
                  <span>NYC clients served</span>
                </div>
                <div>
                  <strong>3–5</strong>
                  <span>Day turnaround</span>
                </div>
              </div>
            </div>

            <div className="lp-hero-visuals">
              <div className="lp-hero-feature-card lp-photo-card">
                <img
                  src="https://static.wixstatic.com/media/8523d8_6900d002afda441fa1d018899be4b268~mv2.jpg/v1/crop/x_323,y_0,w_3594,h_2832/fill/w_900,h_760,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Vinyl.jpg"
                  alt="Lettuce Print studio workspace"
                />
                <span className="lp-chip lp-chip-yellow">
                  <MapPin size={14} /> 361 Stagg St, Brooklyn
                </span>
              </div>

              <div className="lp-mini-grid">
                <article className="lp-mini-card pink">
                  <span className="lp-mini-label">Graphic Design</span>
                </article>
                <article className="lp-mini-card green">
                  <span className="lp-bubble">Let&apos;s Print!</span>
                  <span className="lp-mini-label">Banners</span>
                </article>
                <article className="lp-mini-card yellow">
                  <span className="lp-mini-label">Flyers</span>
                </article>
                <article className="lp-mini-card brown">
                  <span className="lp-mini-label">Roll Labels</span>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-marquee" aria-label="Featured services">
          <div className="lp-marquee-track">
            <span>Business Cards</span>
            <span>Flyers</span>
            <span>Roll Labels</span>
            <span>Vinyl Banners</span>
            <span>Packaging</span>
            <span>Posters</span>
            <span>Trade Show Displays</span>
            <span>Business Cards</span>
            <span>Flyers</span>
            <span>Roll Labels</span>
            <span>Vinyl Banners</span>
            <span>Packaging</span>
            <span>Posters</span>
            <span>Trade Show Displays</span>
          </div>
        </section>

        <section className="lp-delivery-bar">
          <div className="lp-shell lp-delivery-inner">
            <div>
              <p className="lp-delivery-title">Featured items can be ordered faster</p>
              <p className="lp-delivery-copy">
                Keep quote-based flows for custom jobs, but let repeatable products route straight into the
                cart for a cleaner buying experience.
              </p>
            </div>
            <Link href="/products" className="lp-btn lp-btn-yellow">
              Browse shop
            </Link>
          </div>
        </section>

        <section className="lp-section">
          <div className="lp-shell">
            <div className="lp-section-head split">
              <div>
                <p className="lp-section-tag">Quick order</p>
                <h2>
                  Click to buy the
                  <em> most requested products.</em>
                </h2>
              </div>
              <p className="lp-section-copy">
                This is the main commerce upgrade: spotlight the SKUs that have consistent specs, standard
                turnaround, and the least friction to sell online.
              </p>
            </div>

            <div className="lp-product-grid">
              {featuredProducts.map((product) => (
                <article key={product.name} className={`lp-product-card ${product.accent}`}>
                  <div>
                    <p className="lp-product-price">{product.price}</p>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>
                  <div className="lp-product-actions">
                    <Link href={product.href} className="lp-text-link">
                      View product
                    </Link>
                    <Link href={product.href} className="lp-btn lp-btn-dark small">
                      <ShoppingCart size={16} /> Buy now
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section lp-section-cream">
          <div className="lp-shell lp-about-grid">
            <div>
              <p className="lp-section-tag">Who we are</p>
              <h2>
                Brooklyn&apos;s print shop,
                <em> built for NYC.</em>
              </h2>
              <p className="lp-section-copy wide">
                Lettuce Print is a full-service print shop and graphic design studio in Bushwick. The redesign
                keeps the lively, editorial direction of the LP example while making the current Next.js store
                feel easier to browse, easier to trust, and easier to buy from.
              </p>

              <div className="lp-pill-row">
                <span className="lp-pill"><Check size={14} /> Uber delivery</span>
                <span className="lp-pill"><Clock3 size={14} /> Rush orders</span>
                <span className="lp-pill"><Star size={14} /> Price-match positioning</span>
                <span className="lp-pill"><Truck size={14} /> All NYC boroughs</span>
              </div>
            </div>

            <div className="lp-info-card">
              <div className="lp-info-grid">
                <div>
                  <span>Address</span>
                  <strong>361 Stagg St, Brooklyn, NY 11206</strong>
                </div>
                <div>
                  <span>Hours</span>
                  <strong>Mon–Fri · 9am–6pm</strong>
                </div>
                <div>
                  <span>Phone</span>
                  <strong>(347) 603-0557</strong>
                </div>
                <div>
                  <span>Ordering</span>
                  <strong>Shop online or request a custom quote</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section">
          <div className="lp-shell">
            <div className="lp-section-head split">
              <div>
                <p className="lp-section-tag">Services</p>
                <h2>
                  Printing & design
                  <em> for all of NYC.</em>
                </h2>
              </div>
              <p className="lp-section-copy">
                The original example page leans editorial and playful. This version keeps that energy but adds a
                clearer e-commerce hierarchy under it.
              </p>
            </div>

            <div className="lp-services-list">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <article key={service.title} className="lp-service-row">
                    <span className="lp-service-number">0{index + 1}</span>
                    <div className="lp-service-icon">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3>{service.title}</h3>
                      <p>{service.body}</p>
                    </div>
                    <ArrowRight size={20} />
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="lp-section lp-section-cream" id="work">
          <div className="lp-shell">
            <div className="lp-section-head split">
              <div>
                <p className="lp-section-tag">Recent work</p>
                <h2>
                  Recent NYC work,
                  <em> still front and center.</em>
                </h2>
              </div>
              <Link href="/services" className="lp-text-link">
                See all services
              </Link>
            </div>

            <div className="lp-work-grid">
              {work.map((item) => (
                <article key={`${item.tag}-${item.name}`} className={`lp-work-card ${item.tone}`}>
                  <p>{item.tag}</p>
                  <h3>{item.name}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section">
          <div className="lp-shell">
            <div className="lp-section-head split">
              <div>
                <p className="lp-section-tag">Testimonials</p>
                <h2>
                  Proof that the work
                  <em> already sells itself.</em>
                </h2>
              </div>
            </div>

            <div className="lp-testimonial-grid">
              {testimonials.map((item) => (
                <article key={item.name} className="lp-testimonial-card">
                  <p className="lp-testimonial-quote">“{item.quote}”</p>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.role}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section lp-contact-band">
          <div className="lp-shell lp-contact-grid">
            <div>
              <p className="lp-section-tag">Start your project</p>
              <h2>
                Give customers two paths:
                <em> buy now or quote later.</em>
              </h2>
              <p className="lp-section-copy wide">
                Standardized products should convert online. Complex packaging, large installs, and special
                production work can still route into your quote workflow.
              </p>
            </div>

            <div className="lp-cta-card">
              <h3>Recommended rollout</h3>
              <ul>
                <li>Phase 1: Business Cards, Flyers, Roll Labels, Vinyl Banners</li>
                <li>Phase 2: Brochures, Postcards, Window Clings, Promo Items</li>
                <li>Phase 3: Packaging workflows with spec-based quote gates</li>
              </ul>
              <div className="lp-hero-actions stacked-mobile">
                <Link href="/products" className="lp-btn lp-btn-dark">
                  Shop products
                </Link>
                <Link href="/quote" className="lp-btn lp-btn-outline">
                  Request custom quote
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
