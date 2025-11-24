import { Metadata } from 'next';

export const siteConfig = {
  name: 'Revi',
  domain: 'revi.com', // Update with your actual domain
  url: 'https://revi.com', // Update with your actual URL
  title: 'Revi - Professional Website Development & Design Services',
  description: 'Revi builds stunning, high-performance websites for businesses. From custom designs to e-commerce solutions, we deliver exceptional web development with affordable monthly maintenance. Get your professional website today.',
  keywords: [
    'revi',
    'website development',
    'web design',
    'custom website',
    'website builder',
    'professional website',
    'business website',
    'e-commerce website',
    'website maintenance',
    'responsive web design',
    'SEO optimization',
    'website development services',
    'affordable website design',
    'small business website',
    'startup website',
    'modern web design',
    'website redesign',
    'landing page design',
    'web application development',
  ],
  author: 'Revi',
  creator: 'Revi',
  publisher: 'Revi',
  category: 'Web Development',
  email: 'hello@revi.com', // Update with your actual email
  phone: '+1 (555) 123-4567', // Update with your actual phone
  address: {
    streetAddress: '123 Main Street',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    postalCode: '94102',
    addressCountry: 'US',
  },
  social: {
    twitter: '@revi', // Update with your actual handle
    github: 'https://github.com/revi',
    linkedin: 'https://linkedin.com/company/revi',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Revi',
  },
};

export function generateMetadata({
  title,
  description,
  image = '/og-image.png',
  path = '',
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.title;
  const pageDescription = description || siteConfig.description;
  const pageUrl = `${siteConfig.url}${path}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: siteConfig.openGraph.type as any,
      locale: siteConfig.openGraph.locale,
      url: pageUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: siteConfig.openGraph.siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [image],
      creator: siteConfig.social.twitter,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    category: siteConfig.category,
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Website Development',
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Website Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Starter Website Package',
            description: '5-page custom website with mobile-responsive design and basic SEO optimization',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Professional Website Package',
            description: '10-page custom website with advanced animations, e-commerce, and AI chatbot integration',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Enterprise Website Package',
            description: 'Unlimited pages, custom web application, and full e-commerce solution',
          },
        },
      ],
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
