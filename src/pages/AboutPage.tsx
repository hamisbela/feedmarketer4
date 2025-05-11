import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';
import { Video, Award, Star, Shield } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
              About FeedMarketer
            </h1>
            <p className="text-lg md:text-xl text-neutral-700 mb-8">
              Empowering creators to succeed in the competitive world of short-form content.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
                Our Story
              </h2>
              <p className="text-neutral-700 mb-4">
                FeedMarketer was founded in 2023 by a team of social media experts and content creators who recognized the growing importance of short-form video content on platforms like TikTok and Instagram.
              </p>
              <p className="text-neutral-700 mb-4">
                After years of building successful social media accounts and helping brands increase their digital presence, our founders wanted to share their knowledge with aspiring creators worldwide.
              </p>
              <p className="text-neutral-700">
                Today, FeedMarketer helps thousands of creators master the art of short-form content, from technical skills like video editing with CapCut to strategic approaches for growing an engaged audience.
              </p>
            </div>
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-2 rounded-2xl shadow-xl"
              >
                <img
                  src="https://images.pexels.com/photos/7988742/pexels-photo-7988742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="FeedMarketer team creating content"
                  className="w-full h-auto rounded-xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-neutral-700">
              The principles that guide our educational approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-primary-50 p-3 rounded-lg inline-block mb-5">
                <Video className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-3">
                Quality Content
              </h3>
              <p className="text-neutral-700">
                We believe in teaching creators to focus on quality over quantity, creating content that truly resonates with audiences.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-primary-50 p-3 rounded-lg inline-block mb-5">
                <Award className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-3">
                Practical Education
              </h3>
              <p className="text-neutral-700">
                Our tutorials and guides focus on actionable techniques that can be immediately applied to improve your content.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-primary-50 p-3 rounded-lg inline-block mb-5">
                <Star className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-3">
                Creator-First
              </h3>
              <p className="text-neutral-700">
                We prioritize the needs and success of creators, helping you build sustainable growth rather than chasing trends.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-primary-50 p-3 rounded-lg inline-block mb-5">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-3">
                Authentic Approach
              </h3>
              <p className="text-neutral-700">
                We encourage authenticity and originality, helping you find your unique voice in a crowded digital landscape.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section (Placeholder) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              Our Team
            </h2>
            <p className="text-lg text-neutral-700">
              Meet the content creators and social media experts behind FeedMarketer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team member placeholders */}
            <div className="text-center">
              <div className="bg-neutral-200 rounded-full w-32 h-32 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-primary-900">Alex Rivera</h3>
              <p className="text-neutral-700">Founder & TikTok Specialist</p>
            </div>
            <div className="text-center">
              <div className="bg-neutral-200 rounded-full w-32 h-32 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-primary-900">Sophia Chen</h3>
              <p className="text-neutral-700">Instagram Growth Expert</p>
            </div>
            <div className="text-center">
              <div className="bg-neutral-200 rounded-full w-32 h-32 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-primary-900">Marcus Johnson</h3>
              <p className="text-neutral-700">Video Editing Instructor</p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default AboutPage;