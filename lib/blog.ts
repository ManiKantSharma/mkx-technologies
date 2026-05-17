import type { BlogPost } from "./db";
import connectDB from "./db";
import { BlogPost as BlogPostModel } from "./models";

/**
 * Fetches all published blog posts, sorted by newest first.
 * @param {number} limit - Optional limit on the number of posts to fetch.
 */
export async function getBlogPosts(limit?: number) {
  try {
    await connectDB();
    const query = BlogPostModel.find({ published: true }).sort({ createdAt: -1 }).lean();
    
    if (limit) {
      query.limit(limit);
    }

    const posts = await query.exec();
    return JSON.parse(JSON.stringify(posts)) as BlogPost[];
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return [];
  }
}

/**er
 * Fetches a single published blog post by its unique slug.
 * @param {string} slug - The URL slug of the post.
 */
export async function getBlogPostBySlug(slug: string) {
  try {
    await connectDB();
    const post = await BlogPostModel.findOne({ slug, published: true }).lean().exec();
    
    if (!post) return null;
    return JSON.parse(JSON.stringify(post)) as BlogPost;
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    return null;
  }
}
