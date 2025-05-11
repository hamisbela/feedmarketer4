/**
 * Site Configuration
 * This is the central configuration file for site-wide settings.
 * Customize this file for your specific project needs.
 */
const siteConfig = {
  // Site details
  title: "FeedMarketer",
  description: "FeedMarketer helps creators master short-form content on TikTok, Instagram, and other platforms.",
  defaultAuthor: "FeedMarketer Team",
  
  // Domain configuration - single source of truth
  domain: import.meta.env.VITE_SITE_DOMAIN || "feedmarketer.com",
  
  // Contact information
  contact: {
    email: "info@feedmarketer.com",
    phone: "+1 (555) 123-4567",
    address: "123 Content Street, Los Angeles, CA 90001",
  },
  
  // Social media profiles
  social: {
    twitter: "https://twitter.com/feedmarketer",
    facebook: "https://facebook.com/feedmarketer",
    instagram: "https://instagram.com/feedmarketer",
    linkedin: "https://linkedin.com/company/feedmarketer",
    tiktok: "https://tiktok.com/@feedmarketer",
  },
  
  // Navigation - main menu items
  navigation: {
    main: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog/" },
      { name: "About", path: "/about/" },
      { name: "Contact", path: "/contact/" },
    ],
    footer: [
      { name: "Privacy Policy", path: "/privacy/" },
      { name: "Terms of Service", path: "/terms/" },
      { name: "Sitemap", path: "/sitemap/" },
    ],
  },
  
  // Copyright and legal
  legal: {
    copyright: `© ${new Date().getFullYear()} FeedMarketer. All rights reserved.`,
    company: "FeedMarketer Inc.",
  },
  
  // Additional customization options
  features: {
    darkMode: false,
    comments: false,
    newsletter: false,
    search: true,
  },
};

// Derive the full URL from the domain
export function getSiteUrl(): string {
  return `https://${siteConfig.domain}`;
}

export default siteConfig;