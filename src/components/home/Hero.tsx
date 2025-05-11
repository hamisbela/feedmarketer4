import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0 md:pr-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 mb-6">
                Master <span className="text-primary-600">Short-Form Content</span> Creation
              </h1>
              <p className="text-lg md:text-xl text-neutral-700 mb-8 max-w-lg">
                Learn how to create viral TikToks, Instagram Reels, and short videos that grow your audience and boost engagement.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/blog/" className="btn btn-primary">
                  Start Learning <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/blog/" className="btn bg-white text-primary-700 border border-primary-200 hover:bg-primary-50">
                  Browse Tutorials
                </Link>
              </div>
            </motion.div>
          </div>
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-2 rounded-2xl shadow-xl"
            >
              <img
                src="https://images.pexels.com/photos/2773498/pexels-photo-2773498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Creator making content for social media"
                className="w-full h-auto rounded-xl"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;