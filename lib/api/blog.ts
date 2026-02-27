// ─────────────────────────────────────────────────────────────
//  lib/api/blog.ts — BlogPost API functions
//  Server-side only — do NOT import from 'use client' files
// ─────────────────────────────────────────────────────────────

import { strapiFetch } from '@/lib/strapi'
import type { BlogPost, StrapiList, StrapiSingle, BlogCategory } from '@/types/strapi'

export interface GetPostsOptions {
  page?: number
  pageSize?: number
  category?: BlogCategory
  search?: string
  /** revalidate interval in seconds — default 60 */
  revalidate?: number
}

/** Get paginated list of published blog posts */
export async function getPosts(options: GetPostsOptions = {}): Promise<StrapiList<BlogPost>> {
  const { page = 1, pageSize = 10, category, search, revalidate = 60 } = options

  const filters: Record<string, unknown> = {}
  if (category) filters['category'] = { $eq: category }
  if (search) {
    filters['$or'] = [
      { title: { $containsi: search } },
      { excerpt: { $containsi: search } },
    ]
  }

  return strapiFetch<StrapiList<BlogPost>>('/blog-posts', {
    sort: ['publishedAt:desc'],
    filters,
    pagination: { page, pageSize },
    populate: ['thumbnail', 'seo'],
    next: { revalidate, tags: ['blog-posts'] },
  })
}

/** Get a single blog post by slug */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const res = await strapiFetch<StrapiList<BlogPost>>('/blog-posts', {
    filters: { slug: { $eq: slug } },
    populate: ['thumbnail', 'seo', 'seo.metaImage'],
    pagination: { page: 1, pageSize: 1 },
    next: { revalidate: 300, tags: [`blog-post-${slug}`] },
  })

  return res.data[0] ?? null
}

/** Get a blog post by documentId */
export async function getPostById(documentId: string): Promise<BlogPost | null> {
  try {
    const res = await strapiFetch<StrapiSingle<BlogPost>>(`/blog-posts/${documentId}`, {
      populate: ['thumbnail', 'seo', 'seo.metaImage'],
      next: { revalidate: 300, tags: [`blog-post-${documentId}`] },
    })
    return res.data
  } catch {
    return null
  }
}

/** Get all slugs (for generateStaticParams) */
export async function getAllPostSlugs(): Promise<string[]> {
  const res = await strapiFetch<StrapiList<Pick<BlogPost, 'slug'>>>('/blog-posts', {
    populate: [],
    fields: ['slug'],
    pagination: { page: 1, pageSize: 200 },
    sort: ['publishedAt:desc'],
    next: { revalidate: 3600, tags: ['blog-posts-slugs'] },
  } as never)
  return res.data.map((p) => p.slug)
}

/** Increment view count for a post (server action) */
export async function incrementPostViews(documentId: string, currentViews: number): Promise<void> {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? 'http://localhost:1337'
  const token = process.env.STRAPI_API_TOKEN
  if (!token) return

  await fetch(`${strapiUrl}/api/blog-posts/${documentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data: { views: currentViews + 1 } }),
    cache: 'no-store',
  }).catch(() => {}) // fire-and-forget
}
