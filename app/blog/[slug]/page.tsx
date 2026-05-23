import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getBlogPostBySlug } from "@/lib/blog";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug)
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(post.title)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-24 sm:px-3 lg:px-8 max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-12 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Insights
        </Link>

        <article>
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-accent" />
                <span className="font-semibold text-accent uppercase tracking-wider text-[10px]">
                  {post.category}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl mb-8 leading-[1.1] bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed border-l-4 border-accent/20 pl-6 py-2">
              {post.description}
            </p>
          </header>

          {post.image && (
            <div className="relative aspect-video mb-16 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-slate dark:prose-invert max-w-none prose-lg prose-headings:text-foreground prose-p:text-muted-foreground/90 prose-blockquote:border-accent prose-a:text-accent hover:prose-a:text-accent/80 transition-colors">
            <div className="whitespace-pre-wrap leading-relaxed">
              {post.content}
            </div>

            <div className="mt-16 pt-8 border-t border-border">
              <h3 className="text-2xl font-bold mb-4">Driving Growth Through Technology</h3>
              <p>
                At MKX Technologies, we believe that the right software tools are the backbone of any successful modern enterprise.
                Our suite of integrated HRMS, CRMS, and POS solutions is designed specifically to help you bridge the gap between
                operational complexity and streamlined growth.
              </p>
              <p>
                Interested in seeing how our solutions can transform your specific business workflows?
                <Link href="/signup" className="ml-1 font-bold">
                  Get started with a free trial today
                </Link>
                .
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
