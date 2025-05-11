import React from 'react';
import PageTransition from '../components/ui/PageTransition';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import BlogPreview from '../components/home/BlogPreview';
import CTA from '../components/home/CTA';

const HomePage: React.FC = () => {
  return (
    <PageTransition>
      <Hero />
      <Features />
      <BlogPreview />
      <CTA />
    </PageTransition>
  );
};

export default HomePage;