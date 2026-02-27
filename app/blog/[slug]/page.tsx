// ─────────────────────────────────────────────────────────────
//  /blog/[slug] — Server Component (dynamic blog post)
//  ISR: revalidates every 5 minutes
// ─────────────────────────────────────────────────────────────
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StickyBanner from '@/components/StickyBanner'
import { getPostBySlug, getAllPostSlugs, incrementPostViews } from '@/lib/api/blog'
import { getStrapiMediaUrl } from '@/lib/strapi'

export const revalidate = 300 // 5 minutes

interface Props {
  params: { slug: string }
}

/** Pre-generate known slugs at build time */
export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

/** Dynamic SEO metadata per post */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug)
    if (!post) return { title: 'Bài không tồn tại' }

    const seoTitle = post.seo?.metaTitle ?? post.title
    const seoDesc = post.seo?.metaDescription ?? post.excerpt
    const thumb = post.thumbnail
      ? getStrapiMediaUrl(post.thumbnail.formats?.large?.url ?? post.thumbnail.url)
      : null

    return {
      title: seoTitle,
      description: seoDesc,
      openGraph: {
        title: seoTitle,
        description: seoDesc,
        type: 'article',
        publishedTime: post.publishedAt ?? undefined,
        authors: [post.author],
        ...(thumb ? { images: [{ url: thumb }] } : {}),
      },
    }
  } catch {
    return {}
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  // Fire-and-forget view count increment
  incrementPostViews(post.documentId, post.views)

  const thumbnailUrl = post.thumbnail
    ? getStrapiMediaUrl(post.thumbnail.url)
    : null

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-gold transition-colors">Trang chủ</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-gold transition-colors">Blog</Link>
            <span>›</span>
            <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-2.5 py-1 rounded-md bg-gold/10 text-xs font-medium text-gold capitalize">
                {post.category.replace(/-/g, ' ')}
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString('vi-VN', {
                  day: '2-digit', month: 'long', year: 'numeric',
                })}
              </span>
              <span className="text-xs text-muted-foreground ml-auto">{post.views} lượt xem</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed border-l-4 border-gold/30 pl-4 italic">
              {post.excerpt}
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Tác giả: <span className="text-foreground">{post.author}</span>
            </p>
          </div>

          {/* Thumbnail */}
          {thumbnailUrl && (
            <div className="rounded-xl overflow-hidden mb-10 aspect-video bg-secondary">
              <Image
                src={thumbnailUrl}
                alt={post.thumbnail?.alternativeText ?? post.title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          )}

          {/* Content (HTML from CKEditor) */}
          <article
            className="prose prose-invert prose-gold max-w-none
              prose-headings:font-display prose-headings:text-foreground
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-gold hover:prose-a:underline
              prose-strong:text-foreground
              prose-blockquote:border-gold/30 prose-blockquote:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Tags:</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back link */}
          <div className="mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gold hover:underline text-sm"
            >
              ← Quay lại danh sách bài viết
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <StickyBanner />
    </div>
  )
}
