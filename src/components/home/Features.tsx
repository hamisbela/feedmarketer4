import React from 'react';
import { motion } from 'framer-motion';
import { Video, TrendingUp, Scissors, Users } from 'lucide-react';

const features = [
  {
    id: 1,
    icon: <Video className="h-8 w-8 text-primary-600" />,
    title: 'TikTok Mastery',
    description: 'Learn strategies and techniques to create engaging TikTok content that grows your audience and drives engagement.'
  },
  {
    id: 2,
    icon: <TrendingUp className="h-8 w-8 text-primary-600" />,
    title: 'Instagram Growth',
    description: 'Discover how to create compelling Reels and Stories that boost your Instagram presence and visibility.'
  },
  {
    id: 3,
    icon: <Scissors className="h-8 w-8 text-primary-600" />,
    title: 'CapCut Tutorials',
    description: 'Master video editing with in-depth tutorials on CapCut to create professional-looking content easily.'
  },
  {
    id: 4,
    icon: <Users className="h-8 w-8 text-primary-600" />,
    title: 'Audience Building',
    description: 'Learn proven strategies to grow your following, increase engagement, and build a loyal community.'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Essential Skills for Content Creators
          </h2>
          <p className="text-lg text-neutral-700">
            Our comprehensive educational resources help you master short-form content creation and grow your social media presence.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature) => (
            <motion.div 
              key={feature.id}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              variants={item}
            >
              <div className="bg-primary-50 p-3 rounded-lg inline-block mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-700">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;