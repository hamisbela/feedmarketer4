import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getAllPosts, getPostBySlug, createSlug } from './BlogUtils';
import { BlogPost as IBlogPost } from './BlogTypes';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PageTransition from '../components/ui/PageTransition';
import { ArrowLeft, Clock, User, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import blogConfig, { getDefaultFeaturedImage } from '../config/blog.config';

/**
 * Renders the blog list page
 */
export const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  return (
    <PageTransition>
      <Helmet>
        <title>Blog | FeedMarketer</title>
        <meta name="description" content="Content creation tips, tutorials, and guides for TikTok, Instagram, and CapCut." />
      </Helmet>
      
      <div className="bg-gradient-to-b from-primary-50 to-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
              Content Creation Blog
            </h1>
            <p className="text-lg text-neutral-700 mb-8">
              Tutorials, tips, and strategies to help you create better content for TikTok, Instagram, and other platforms.
            </p>
          </div>
          
          {loading ? (
            <div className="py-20 text-center">
              <p className="text-neutral-600">Loading blog posts...</p>
            </div>
          ) : (
            <>
              {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                  {posts.map((post) => (
                    <div key={post.slug} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <Link to={`/${post.slug}/`}>
                        <div className={blogConfig.ui.featuredImage.height.blogList || 'h-48'} style={{ position: 'relative' }}>
                          <img 
                            src={post.featuredImage || getDefaultFeaturedImage()} 
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                      <div className="p-6">
                        <div className="flex items-center text-sm text-neutral-500 mb-3">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>
                            {new Date(post.date).toLocaleDateString('en-US', { 
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <Link to={`/${post.slug}/`}>
                          <h2 className="text-xl font-semibold text-primary-900 hover:text-primary-600 transition-colors mb-3">
                            {post.title}
                          </h2>
                        </Link>
                        <p className="text-neutral-600 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-sm text-neutral-500">
                            <User className="h-4 w-4 mr-1" />
                            <span>{post.author}</span>
                          </div>
                          <Link 
                            to={`/${post.slug}/`} 
                            className="text-primary-600 font-medium hover:text-primary-700 flex items-center"
                          >
                            Read More <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <p className="text-neutral-600">No blog posts found.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

/**
 * Renders a single blog post
 */
export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<IBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<IBlogPost[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!slug) return;
        
        setLoading(true);
        const fetchedPost = await getPostBySlug(slug);
        
        if (fetchedPost) {
          setPost(fetchedPost);
          
          // Fetch related posts
          const allPosts = await getAllPosts();
          const filtered = allPosts
            .filter(p => p.slug !== slug)
            .slice(0, 3);
          
          setRelatedPosts(filtered);
        } else {
          navigate('/404');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [slug, navigate]);
  
  // Render YouTube embeds
  const renderMarkdown = (content: string) => {
    const contentWithEmbeds = content.split('\n').map((line, i) => {
      if (line.startsWith('youtube:')) {
        const videoId = line.split(':')[1].trim();
        return (
          <div key={`youtube-${i}`} className="youtube-embed-container">
            <div className="aspect-w-16">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        );
      }
      return line;
    }).join('\n');
    
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        className="prose prose-lg max-w-none prose-img:rounded-lg prose-headings:font-semibold prose-h2:text-2xl prose-h3:text-xl prose-a:text-primary-600"
      >
        {contentWithEmbeds}
      </ReactMarkdown>
    );
  };
  
  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-neutral-600">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-neutral-600">Post not found</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <PageTransition>
      <Helmet>
        <title>{post.title} | FeedMarketer</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.featuredImage && <meta property="og:image" content={post.featuredImage} />}
      </Helmet>
      
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <div className="mb-8">
              <Link 
                to="/blog/" 
                className="inline-flex items-center text-neutral-600 hover:text-primary-600 transition-colors"
              >
                <ArrowLeft className="mr-2 h-5 w-5" /> Back to all posts
              </Link>
            </div>
            
            {/* Featured Image */}
            {post.featuredImage && (
              <div className={`${blogConfig.ui.featuredImage.height.blogPost || 'h-64 md:h-96'} mb-8 rounded-xl overflow-hidden`}>
                <img 
                  src={post.featuredImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {/* Post Title & Meta */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center text-sm text-neutral-500 gap-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>{post.author}</span>
                </div>
                
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
                </div>
              </div>
            </div>
            
            {/* Post Content */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
              {renderMarkdown(post.content)}
            </div>
            
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-primary-900 mb-6">
                  Related Posts
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.slug} className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <Link to={`/${relatedPost.slug}/`}>
                        <div className={blogConfig.ui.featuredImage.height.relatedPosts || 'h-40'}>
                          <img 
                            src={relatedPost.featuredImage || getDefaultFeaturedImage()} 
                            alt={relatedPost.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                      <div className="p-4">
                        <Link to={`/${relatedPost.slug}/`}>
                          <h3 className="text-lg font-semibold text-primary-900 hover:text-primary-600 transition-colors mb-2">
                            {relatedPost.title}
                          </h3>
                        </Link>
                        <div className="flex items-center text-xs text-neutral-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>
                            {new Date(relatedPost.date).toLocaleDateString('en-US', { 
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};