import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getBlogPosts } from "@/lib/blog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
      <main className="container mx-auto px-4 py-24 sm:px-3 lg:px-8 max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Insights & Resources
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Stay updated with the latest trends, guides, and insights on how to grow your business using enterprise-grade SaaS tools.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <Card className="h-full hover:border-accent/50 transition-all duration-300 cursor-pointer flex flex-col overflow-hidden bg-card/50 backdrop-blur-sm">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image || "/placeholder-blog.png"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-white px-3 py-1 bg-accent rounded-full shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="text-xs text-muted-foreground mb-2">{post.date}</div>
                  <CardTitle className="line-clamp-2 text-xl group-hover:text-accent transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                    {post.description}
                  </CardDescription>
                  <div className="mt-6 flex items-center text-sm font-semibold text-accent group-hover:translate-x-1 transition-transform">
                    Read article <span className="ml-1">→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
