// ─────────────────────────────────────────────────────────────
//  /category/[slug] — Category posts page
// ─────────────────────────────────────────────────────────────
export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StickyBanner from '@/components/StickyBanner'
import BlogListClient from '@/components/BlogListClient'
import { getCategoryBySlug, getCategories, getCategoryBreadcrumb } from '@/lib/api/categories'
import { strapiFetch } from '@/lib/strapi'
import type { BlogPost, StrapiList } from '@/types/strapi'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = await getCategoryBySlug(params.slug)
  if (!cat) return {}
  return {
    title: `${cat.name} | Phap Mon Tam Linh`,
    description: cat.description || `Cac bai viet thuoc chu de ${cat.name}`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const [category, allCats] = await Promise.all([
    getCategoryBySlug(params.slug),
    getCategories(),
  ])

  if (!category) notFound()

  const breadcrumb = getCategoryBreadcrumb(allCats, params.slug)

  // Fetch posts for this category
  let posts: BlogPost[] = []
  let total = 0
  try {
    const res = await strapiFetch<StrapiList<BlogPost>>('/blog-posts', {
      filters: {
        $or: [
          { category_rel: { slug: { $eq: params.slug } } },
          { category: { $eq: params.slug } },
        ],
      },
      sort: ['publishedAt:desc'],
      populate: ['thumbnail', 'category_rel'],
      pagination: { page: 1, pageSize: 20 },
      next: { revalidate: 60, tags: [`category-${params.slug}`] },
    })
    posts = res.data
    total = res.meta.pagination.total
  } catch {
    // empty
  }

  // Sub-categories for this parent
  const subCategories = allCats.filter((c) => c.parent?.id === category.id)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-12">
        <div className="container mx-auto px-6">

          {/* Breadcrumb */}
          <nav className="text-xs text-muted-foreground mb-6 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-gold transition-colors">Trang chu</Link>
            {breadcrumb.map((crumb) => (
              <span key={crumb.id} className="flex items-center gap-2">
                <span>/</span>
                <Link href={`/category/${crumb.slug}`} className={`hover:text-gold transition-colors ${crumb.slug === params.slug ? 'text-foreground' : ''}`}>
                  {crumb.name}
                </Link>
              </span>
            ))}
          </nav>

          {/* Category header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              {category.icon && (
                <span className="text-3xl">{category.icon}</span>
              )}
              <h1 className="font-display text-4xl text-foreground">{category.name}</h1>
            </div>
            {category.description && (
              <p className="text-muted-foreground max-w-2xl">{category.description}</p>
            )}
            <p className="text-xs text-muted-foreground mt-2">{total} bai viet</p>
          </div>

          {/* Sub-categories */}
          {subCategories.length > 0 && (
            <div className="mb-10">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Chu de con
              </h2>
              <div className="flex flex-wrap gap-2">
                {subCategories.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/category/${sub.slug}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary border border-border hover:border-gold/40 hover:text-gold rounded-full text-sm text-foreground transition-all"
                  >
                    {sub.icon && <span>{sub.icon}</span>}
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Posts */}
          {posts.length > 0 ? (
            <BlogListClient posts={posts} totalFromStrapi={total} />
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Chua co bai viet nao trong chu de nay</p>
              <Link href="/blog" className="inline-block mt-4 text-sm text-gold hover:underline">
                Xem tat ca bai viet
              </Link>
            </div>
          )}

        </div>
      </main>

      <Footer />
      <StickyBanner />
    </div>
  )
}
