// ─────────────────────────────────────────────────────────────
//  lib/api/categories-client.ts — Client-side category fetching
//  Uses Next.js Route Handler for authentication
// ─────────────────────────────────────────────────────────────

import type { Category, StrapiList } from '@/types/strapi'

/**
 * Fetch categories from client-side via authenticated route handler.
 * Safe to call from 'use client' components.
 */
export async function getCategoriesClient(): Promise<Category[]> {
  try {
    const res = await fetch('/api/categories', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store', // always fetch fresh categories
    })

    if (!res.ok) {
      return []
    }

    const data: StrapiList<Category> = await res.json()
    return data.data ?? []
  } catch (error) {
    console.error('[Categories] Fetch error:', error)
    return []
  }
}
