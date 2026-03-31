export const SEO_DEFAULTS = {
  title: 'Lettuce Print - Brooklyn\'s Premier Printing Service',
  description: 'Professional B2B printing services in Brooklyn. Business cards, flyers, banners, and more with local expertise and fast turnaround.',
  keywords: 'printing, Brooklyn, business cards, flyers, banners, B2B printing, local printing',
  author: 'Lettuce Print',
  url: 'https://lettuceprint.com',
  image: '/images/og-image.jpg',
};

export const generateSEOMeta = (page: string, overrides?: Partial<typeof SEO_DEFAULTS>) => {
  const pageMeta = {
    home: {
      title: 'Lettuce Print - Brooklyn\'s Premier Printing Service',
      description: 'Professional B2B printing services in Brooklyn. Business cards, flyers, banners, and more with local expertise and fast turnaround.',
    },
    products: {
      title: 'Our Products - Lettuce Print',
      description: 'Discover our wide range of professional printing services. From business cards to large format banners.',
    },
    services: {
      title: 'Our Services - Lettuce Print',
      description: 'Comprehensive printing solutions tailored to meet your business needs.',
    },
    about: {
      title: 'About Us - Lettuce Print',
      description: 'Learn about Lettuce Print, Brooklyn\'s trusted printing partner since 2020.',
    },
    contact: {
      title: 'Contact Us - Lettuce Print',
      description: 'Ready to start your printing project? Get in touch with us today.',
    },
    quote: {
      title: 'Get a Free Quote - Lettuce Print',
      description: 'Tell us about your printing project and we\'ll provide you with a competitive quote within 24 hours.',
    },
    cart: {
      title: 'Shopping Cart - Lettuce Print',
      description: 'Review your items and proceed to checkout.',
    },
  };

  const pageData = pageMeta[page as keyof typeof pageMeta] || pageMeta.home;
  
  return {
    ...SEO_DEFAULTS,
    ...pageData,
    ...overrides,
  };
};