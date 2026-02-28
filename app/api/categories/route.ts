// ─────────────────────────────────────────────────────────────
//  app/api/categories/route.ts — Authenticated categories proxy
//  Allows client-side code to fetch categories securely
// ─────────────────────────────────────────────────────────────

import { buildStrapiUrl, STRAPI_URL } from '@/lib/strapi'
import type { StrapiList } from '@/types/strapi'
import type { Category } from '@/types/strapi'

export async function GET(request: Request) {
  try {
    console.log('[API] /api/categories GET request')
    
    const token = process.env.STRAPI_API_TOKEN
    if (!token) {
      console.error('[API] STRAPI_API_TOKEN not configured!')
      return new Response(
        JSON.stringify({ error: 'API token not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const url = buildStrapiUrl('/categories', {
      populate: ['parent', 'children'],
      sort: ['order:asc', 'name:asc'],
      pagination: { page: 1, pageSize: 1000 },
    })

    console.log('[API] Fetching from Strapi:', url)

    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })

    console.log('[API] Strapi response status:', res.status)

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      const errMsg = typeof err === 'object' && 'error' in err ? err.error : err
      console.error('[API] Categories fetch failed:', { status: res.status, error: errMsg })
      return new Response(
        JSON.stringify({ error: 'Failed to fetch categories', status: res.status, details: errMsg }),
        { status: res.status, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const data = await res.json() as any
    
    console.log('[API] Raw response:', {
      keys: Object.keys(data),
      hasResults: Array.isArray(data.results),
      hasData: Array.isArray(data.data),
      resultsLength: data.results?.length,
      dataLength: data.data?.length,
    })
    
    // Handle both standard {data, meta} and legacy {results, pagination} formats
    let normalized: StrapiList<Category>
    
    if (Array.isArray(data.results) && !Array.isArray(data.data)) {
      console.log('[API] Converting from {results} format to {data}')
      normalized = {
        data: data.results as Category[],
        meta: { 
          pagination: data.pagination ?? { page: 1, pageSize: 0, pageCount: 0, total: 0 }
        }
      }
    } else if (Array.isArray(data.data)) {
      console.log('[API] Using standard {data} format')
      normalized = data as StrapiList<Category>
    } else {
      console.warn('[API] Unknown format, returning empty')
      normalized = { 
        data: [], 
        meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } } 
      }
    }

    console.log('[API] Final response:', {
      dataLength: normalized.data?.length,
      firstItemName: normalized.data?.[0]?.name,
    })

    return new Response(JSON.stringify(normalized), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=3600',
      },
    })
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error)
    console.error('[API] FATAL error:', errMsg, error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', message: errMsg }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
