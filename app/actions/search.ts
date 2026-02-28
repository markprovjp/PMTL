'use server'

import { getPosts, GetPostsOptions } from '@/lib/api/blog'
import { getCategories } from '@/lib/api/blog'

export async function searchPostsAndCategories(options: GetPostsOptions) {
  // Enforce zero cache via revalidate: 0
  const res = await getPosts({ ...options, revalidate: 0 })
  return {
    data: res.data ?? [],
    meta: res.meta,
  }
}

export async function fetchAllCategories() {
  const cats = await getCategories()
  return cats
}

import { revalidatePath } from 'next/cache'

export async function incrementViewAction(documentId: string, slug?: string) {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? 'http://localhost:1337'
    const res = await fetch(`${strapiUrl}/api/blog-posts/${documentId}/view`, {
      method: 'POST',
      cache: 'no-store',
    })
    console.log(`[Action] View increment for ${documentId} returned status ${res.status}`)

    // If successful and slug provided, trigger a background revalidation
    if (res.ok && slug) {
      revalidatePath(`/blog/${slug}`)
      revalidatePath('/blog')
    }

    return { success: res.ok, status: res.status }
  } catch (err) {
    console.error('[Action] Failed to increment view:', err)
    return { success: false, error: String(err) }
  }
}

export async function revalidateBlogPath(slug: string) {
  revalidatePath(`/blog/${slug}`)
  revalidatePath('/blog')
}
