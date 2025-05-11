import { BlogPost } from './BlogTypes';
import slugify from 'slugify';
import siteConfig from '../config/site';
import blogConfig, { generateMetaDescription } from '../config/blog.config';

// Use Vite's dynamic import for markdown files
const posts = import.meta.glob('/blog-content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
});

/**
 * Creates a SEO friendly slug from a title or other string
 * @param text The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function createSlug(text: string): string {
  return slugify(text, {
    lower: true,        // Convert to lowercase
    strict: true,       // Strip special characters
    trim: true,         // Trim leading and trailing spaces
    replacement: '-',   // Replace spaces with hyphens
  });
}

/**
 * Extracts the first image URL from the content of a blog post
 * @param content The markdown content to extract an image from
 * @returns The URL of the first image found, or null if no image is found
 */
export function extractFirstImage(content: string): string | null {
  // Look for image markdown format: ![alt](url)
  const markdownImageRegex = /!\[.*?\]\((.*?)\)/;
  const mdMatch = content.match(markdownImageRegex);
  
  if (mdMatch && mdMatch[1]) {
    return mdMatch[1];
  }
  
  // Look for direct image URLs in the content
  const directImageUrlRegex = /(https?:\/\/.*?\.(jpg|jpeg|png|gif|webp))/i;
  const directMatch = content.match(directImageUrlRegex);
  
  if (directMatch && directMatch[1]) {
    return directMatch[1];
  }
  
  // Look for HTML image tags: <img src="url" />
  const htmlImageRegex = /<img.*?src=["'](.*?)["']/;
  const htmlMatch = content.match(htmlImageRegex);
  
  if (htmlMatch && htmlMatch[1]) {
    return htmlMatch[1];
  }
  
  // No image found
  return null;
}

/**
 * Extract front matter from markdown content
 */
function extractFrontMatter(content: string) {
  // Simple front matter parser that works in browser
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);
  
  if (!match) {
    return { frontMatter: {}, content };
  }

  const frontMatterStr = match[1];
  const contentStr = match[2];

  // Parse YAML-style front matter
  const frontMatter: Record<string, any> = {};
  frontMatterStr.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      frontMatter[key.trim()] = valueParts.join(':').trim();
    }
  });

  return { frontMatter, content: contentStr };
}

/**
 * Fix duplicate h1 in markdown content
 * This ensures the h1 appears only once at the beginning
 */
function fixDuplicateH1(content: string): string {
  // Look for the first h1 heading pattern
  const h1Match = content.match(/^#\s+(.+)$/m);
  
  if (!h1Match) {
    return content; // No h1 found, return unchanged
  }
  
  // Get the title and its position
  const title = h1Match[1].trim();
  const h1Index = content.indexOf(h1Match[0]);
  
  // Escape special regex characters in the title
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Create a new string with content after the first h1
  const contentAfterFirstH1 = content.substring(h1Index + h1Match[0].length);
  
  // Find duplicate h1 headings with the same title and remove them
  const duplicateH1Regex = new RegExp(`#\\s+${escapedTitle}(?=\\n|$)`, 'g');
  const cleanedContent = contentAfterFirstH1.replace(duplicateH1Regex, '');
  
  // Reconstruct the content with the first h1 and the cleaned content
  return content.substring(0, h1Index + h1Match[0].length) + cleanedContent;
}

/**
 * Extract meta description from content - use first sentence after h1
 */
function extractMetaDescriptionFromContent(content: string): string {
  // First, remove the h1 title
  const contentWithoutTitle = content.replace(/^#\s+(.+)$/m, '').trim();
  
  // Find the first sentence
  const firstSentenceMatch = contentWithoutTitle.match(/^[^.!?]+[.!?]/);
  if (firstSentenceMatch && firstSentenceMatch[0]) {
    // Clean up the sentence (remove markdown formatting, etc.)
    return firstSentenceMatch[0]
      .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
      .replace(/\[.*?\]\(.*?\)/g, '$1') // Replace links with just the text
      .replace(/[#*_~`]/g, '') // Remove markdown formatting characters
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
  }
  
  // Fallback to the original method
  return generateMetaDescription(content);
}

/**
 * Process markdown content to handle YouTube embeds, images, etc.
 */
function processMarkdownContent(content: string): string {
  // First, process and isolate complete sentences that contain YouTube links
  // This uses a more careful approach to avoid mixing text with the embed tag
  let processedContent = content.replace(
    /([^.!?]*(?:https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/youtu\.be\/)([a-zA-Z0-9_-]+)(?:&[^<\s]*)?[^.!?]*[.!?])/g,
    (match, beforeAndUrl, videoId) => {
      // Extract just the YouTube URL
      const urlMatch = match.match(/(https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/youtu\.be\/)([a-zA-Z0-9_-]+)(?:&[^<\s]*)?/);
      if (!urlMatch) return match;
      
      // Replace just the URL with our embed format, preserving surrounding text
      return match.replace(urlMatch[0], `\n\nyoutube:${urlMatch[2]}\n\n`);
    }
  );
  
  // Also catch standalone YouTube URLs without surrounding text
  processedContent = processedContent.replace(
    /(?:^|\s)(https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/youtu\.be\/)([a-zA-Z0-9_-]+)(?:&[^<\s]*)?(?:\s|$)/g,
    (match, urlPrefix, videoId) => {
      return match.replace(`${urlPrefix}${videoId}`, `\n\nyoutube:${videoId}\n\n`);
    }
  );
  
  // Fix image URLs in the content - preserve absolute URLs
  processedContent = processedContent.replace(
    /(!\[.*?\]\()(.+?)(\))/g,
    (match, prefix, url, suffix) => {
      // Keep absolute URLs as they are
      if (url.startsWith('http') || url.startsWith('https')) {
        return match;
      }
      
      // Clean any leading ./ or / from the relative path
      const cleanUrl = url.replace(/^\.?\/?/, '');
      
      // For relative paths, ensure they're properly resolved
      return `${prefix}${cleanUrl}${suffix}`;
    }
  );

  // Convert standalone image URLs to markdown syntax
  // This handles direct URLs in the content (not already in markdown image format)
  processedContent = processedContent.replace(
    /(^|\n|\s)(https?:\/\/.*?\.(jpg|jpeg|png|gif|webp))(\s|\n|$)/gi,
    (match, before, url, ext, after) => {
      // Only convert if it's not already part of a markdown link or image
      // Check if the URL is surrounded by markdown link/image syntax
      if (match.includes('](') || match.includes('![')) {
        return match;
      }
      return `${before}![Image](${url})${after}`;
    }
  );

  return processedContent;
}

/**
 * Get YouTube thumbnail URL from video ID
 */
function getYoutubeThumbnailUrl(videoId: string): string {
  // Use maxresdefault for highest quality YouTube thumbnail
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

/**
 * Extract YouTube video ID from content
 */
function extractVideoId(content: string): string | null {
  // Look for YouTube URLs in the content
  const youtubeMatch = content.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  
  // Also look for our youtube: format
  if (!youtubeMatch) {
    const youtubeEmbed = content.match(/youtube:([a-zA-Z0-9_-]{11})/);
    return youtubeEmbed ? youtubeEmbed[1] : null;
  }
  
  return youtubeMatch ? youtubeMatch[1] : null;
}

/**
 * Extract title from markdown content
 */
function extractTitleFromMarkdown(content: string): string {
  // Look for the first # heading
  const titleMatch = content.match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1].trim() : 'Untitled Post';
}

/**
 * Get all blog posts
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    return Object.entries(posts).map(([path, content]) => {
      // Extract filename from path
      const pathParts = path.split('/');
      const filename = pathParts[pathParts.length - 1];
      
      // Get the content and front matter
      const { frontMatter, content: markdown } = extractFrontMatter(content as string);
      
      // Fix duplicate h1 headings
      const fixedContent = fixDuplicateH1(markdown);
      
      const processedContent = processMarkdownContent(fixedContent);
      
      // Get the title from front matter or extract it from content
      const title = frontMatter.title || extractTitleFromMarkdown(processedContent);
      
      // Generate a slug from the title if not present in front matter
      const slug = frontMatter.slug 
        ? createSlug(frontMatter.slug) 
        : createSlug(title);
      
      // Try to get a featured image, first from regular image, then from YouTube thumbnail
      let featuredImage = extractFirstImage(processedContent);
      
      // If no image is found, try to get a YouTube video thumbnail
      if (!featuredImage) {
        const videoId = extractVideoId(processedContent);
        if (videoId) {
          featuredImage = getYoutubeThumbnailUrl(videoId);
        }
      }
      
      // Get author from front matter or use default
      const author = frontMatter.author || blogConfig.posts.defaultAuthor;
      
      // Use excerpt from front matter or generate meta description from first sentence
      const excerpt = frontMatter.excerpt || extractMetaDescriptionFromContent(processedContent);
      
      return {
        title,
        slug,
        date: frontMatter.date || new Date().toISOString(),
        content: processedContent,
        excerpt,
        author,
        featuredImage
      };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

/**
 * Helper function to get a post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const allPosts = await getAllPosts();
  return allPosts.find(post => post.slug === slug) || null;
}

/**
 * Helper to get all site URLs for sitemap
 */
export async function getAllUrls() {
  const allPosts = await getAllPosts();
  
  // Base URLs for the site
  const baseUrls = siteConfig.navigation.main.map(item => ({
    path: item.path,
    name: item.name
  }));
  
  // Add any additional pages from footer navigation
  siteConfig.navigation.footer.forEach(item => {
    if (!baseUrls.some(u => u.path === item.path)) {
      baseUrls.push({
        path: item.path,
        name: item.name
      });
    }
  });
  
  // Blog post URLs
  const blogUrls = allPosts.map(post => ({
    path: `/${post.slug}/`,
    name: post.title,
    date: post.date
  }));
  
  return { baseUrls, blogUrls };
}