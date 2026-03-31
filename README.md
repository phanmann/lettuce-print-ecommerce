# Lettuce Print - Brooklyn's Premier Printing Service

A modern, responsive e-commerce website for Lettuce Print, a Brooklyn-based printing company specializing in B2B printing services with local expertise and fast turnaround times.

## 🚀 Features

- **Next.js 14** with App Router for optimal performance
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** for responsive, mobile-first design
- **SEO Optimized** with proper meta tags and structured data
- **E-commerce Ready** with product catalog, cart, and quote system
- **Professional Design** tailored for B2B printing services
- **Fast & Responsive** optimized for all devices

## 📋 Pages & Features

- **Homepage** - Hero section, services overview, why choose us
- **Products** - Complete product catalog with categories
- **Services** - Detailed service descriptions and process
- **About** - Company story, mission, and values
- **Contact** - Contact form and business information
- **Quote** - Comprehensive quote request system
- **Cart** - Shopping cart functionality

## 🛠️ Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Code Quality:** ESLint, Prettier
- **Deployment:** Vercel-ready

## 🏗️ Project Structure

```
lettuce-print/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.tsx      # Homepage
│   │   ├── layout.tsx    # Root layout
│   │   ├── globals.css   # Global styles
│   │   ├── products/     # Products page
│   │   ├── services/     # Services page
│   │   ├── about/        # About page
│   │   ├── contact/      # Contact page
│   │   ├── quote/        # Quote request page
│   │   └── cart/         # Shopping cart page
│   ├── components/       # Reusable components
│   │   ├── Header.tsx    # Navigation header
│   │   └── Footer.tsx    # Site footer
│   ├── lib/              # Utility libraries
│   │   └── seo.ts        # SEO utilities
│   ├── types/            # TypeScript types
│   │   └── index.ts      # Type definitions
│   └── utils/            # Utility functions
│       └── formatters.ts # Data formatting utilities
├── public/               # Static assets
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

## 🎨 Design Features

- **Brooklyn Brand Identity** - Local personality with professional B2B focus
- **Mobile-First Design** - Optimized for all screen sizes
- **Accessibility** - WCAG compliant with proper semantic HTML
- **Performance** - Optimized images and lazy loading
- **SEO Friendly** - Proper meta tags, structured data, and semantic markup

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/lettuce-print.git
   cd lettuce-print
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_COMPANY_NAME=Lettuce Print
NEXT_PUBLIC_COMPANY_PHONE=(555) 123-4567
NEXT_PUBLIC_COMPANY_EMAIL=info@lettuceprint.com
```

### Next.js Configuration

The `next.config.js` file includes:
- App Router configuration
- Image optimization settings
- Environment variable handling

### Tailwind Configuration

Custom colors and fonts configured in `tailwind.config.js`:
- Lettuce green color scheme
- Inter font family
- Custom breakpoints

## 📱 Responsive Design

- **Mobile:** 320px and up
- **Tablet:** 768px and up  
- **Desktop:** 1024px and up
- **Large screens:** 1280px and up

## 🔍 SEO Optimization

- Dynamic meta tags for each page
- Open Graph tags for social sharing
- Structured data for better search indexing
- Semantic HTML structure
- Optimized images with alt text

## 🎯 Brand Guidelines

- **Primary Color:** Lettuce Green (#4CAF50)
- **Secondary Color:** Brooklyn Blue (#1976D2)
- **Typography:** Inter font family
- **Voice:** Professional, local, trustworthy

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🏢 Business Context

Lettuce Print serves the Brooklyn business community with:
- 22+ product categories
- B2B focus with local expertise
- Fast turnaround times
- Competitive pricing
- Professional quality printing

## 📞 Contact

For questions about this project:
- Email: info@lettuceprint.com
- Phone: (555) 123-4567
- Location: Brooklyn, NY

---

Built with ❤️ for Brooklyn businesses