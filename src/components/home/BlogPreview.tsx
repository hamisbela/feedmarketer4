import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getAllPosts } from '../../blog/BlogUtils';
import { BlogPost } from '../../blog/BlogTypes';

const BlogPreview: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts.slice(0, 9)); // Get the first 9 posts
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>Loading blog posts...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Latest Content Creation Tips
          </h2>
          <p className="text-lg text-neutral-700">
            Discover our latest tutorials and guides to help you create engaging short-form content
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.slug} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Link to={`/${post.slug}/`}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.featuredImage || 'https://images.pexels.com/photos/2773498/pexels-photo-2773498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              </Link>
              <div className="p-6">
                <p className="text-sm text-neutral-500 mb-2">
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
                <Link to={`/${post.slug}/`}>
                  <h3 className="text-xl font-semibold text-primary-900 mb-2 hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-neutral-700 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <Link 
                  to={`/${post.slug}/`} 
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                >
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/blog/" className="btn btn-primary">
            View All Articles <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;