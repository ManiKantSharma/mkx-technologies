import type { BlogPost } from "./db";
import connectDB from "./db";
import { BlogPost as BlogPostModel } from "./models";

export type { BlogPost };

export async function getBlogPosts() {
  try {
    await connectDB();
    const posts = await BlogPostModel.find({ published: true }).sort({ createdAt: -1 });
    return posts.map(p => p.toObject()) as BlogPost[];
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    await connectDB();
    const post = await BlogPostModel.findOne({ slug, published: true });
    if (!post) return null;
    return post.toObject() as BlogPost;
  } catch (error) {
    console.error('Failed to fetch blog post:', error)
    return null
  }
}


