"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  image?: string;
  category: string;
  date: string;
}

interface BlogContentProps {
  posts: BlogPost[];
}

export function BlogContent({ posts }: BlogContentProps) {
  const POSTS_PER_PAGE = 6;
  const [visiblePosts, setVisiblePosts] = React.useState(POSTS_PER_PAGE);
  const [isLoading, setIsLoading] = React.useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const hasMorePosts = visiblePosts < posts.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMorePosts && !isLoading) {
          setIsLoading(true);
          // Simulate loading delay for smooth UX
          setTimeout(() => {
            setVisiblePosts((prev) => Math.min(prev + POSTS_PER_PAGE, posts.length));
            setIsLoading(false);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMorePosts, isLoading, posts.length]);

  return (
    <>
      <motion.div
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {posts.slice(0, visiblePosts).map((post, index) => (
          <motion.div key={post.slug} variants={fadeIn}>
            <Link href={`/blog/${post.slug}`} className="group">
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
          </motion.div>
        ))}
      </motion.div>

      {hasMorePosts && (
        <div ref={observerTarget} className="mt-16 flex justify-center">
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <div className="h-2 w-2 rounded-full bg-accent animate-bounce" />
              <div className="h-2 w-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="h-2 w-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.2s' }} />
            </motion.div>
          )}
        </div>
      )}
    </>
  );
}
