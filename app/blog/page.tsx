import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getBlogPosts } from "@/lib/blog";
import { BlogContent } from "./blog-content";
import { BlogHero } from "./blog-hero";

export const metadata: Metadata = {
  title: "Blog | Insights on HRMS, CRMS & POS Systems",
  description: "Stay updated with the latest trends and insights in enterprise business solutions and SaaS technology.",
};

export default async function BlogPage() {
  const dbPosts = await getBlogPosts();
  const blogPosts = dbPosts

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 pt-30 pb-8 sm:px-3 lg:px-8 max-w-7xl">
        <BlogHero />
        <BlogContent posts={blogPosts} />
      </main>
      <Footer />
    </div>
  );
}
