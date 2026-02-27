// ─────────────────────────────────────────────────────────────
//  lib/strapi.ts — Base Strapi fetcher
//
//  SECURITY RULES:
//  ✅ STRAPI_API_TOKEN    — server-side only (NO NEXT_PUBLIC_ prefix)
//  ✅ NEXT_PUBLIC_STRAPI_API_URL — safe to expose (URL only, no secrets)
//  ✅ All server fetches use Authorization: Bearer <token>
//  ✅ Client fetches only access published public endpoints
// ─────────────────────────────────────────────────────────────

import qs from 'qs'
import { isStrapiError } from '@/types/strapi'

export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? 'http://localhost:1337'

// Server-side token — NEVER exposed to browser
function getServerToken(): string | undefined {
  if (typeof window !== 'undefined') return undefined // safety: no client leakage
  return process.env.STRAPI_API_TOKEN
}

export interface FetchOptions {
  /** Strapi populate param — default: '*' */
  populate?: string | string[] | Record<string, unknown>
  /** Strapi filters */
  filters?: Record<string, unknown>
  /** Strapi sort e.g. ['createdAt:desc'] */
  sort?: string | string[]
  /** Pagination */
  pagination?: { page?: number; pageSize?: number }
  /** Next.js fetch config for ISR */
  next?: NextFetchRequestConfig
  /** Force no-cache (for dynamic / real-time data) */
  noCache?: boolean
}

/**
 * Build full Strapi API URL with query params
 */
export function buildStrapiUrl(path: string, options: Omit<FetchOptions, 'next' | 'noCache'> = {}): string {
  const { populate = '*', filters, sort, pagination } = options
  const query = qs.stringify(
    { populate, filters, sort, pagination },
    { encodeValuesOnly: true, skipNulls: true }
  )
  return `${STRAPI_URL}/api${path}${query ? `?${query}` : ''}`
}

/**
 * Server-side fetch with API token auth + ISR support.
 * ⚠️  Only call from Server Components, Server Actions, or Route Handlers.
 *     Never call from 'use client' files.
 */
export async function strapiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { next, noCache, ...queryOptions } = options
  const url = buildStrapiUrl(path, queryOptions)
  const token = getServerToken()

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(url, {
    headers,
    next: noCache ? undefined : { revalidate: next?.revalidate ?? 60, tags: next?.tags },
    cache: noCache ? 'no-store' : undefined,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new StrapiAPIError(res.status, err?.error?.message ?? res.statusText, path)
  }

  const json = await res.json()
  if (isStrapiError(json)) {
    throw new StrapiAPIError(json.error.status, json.error.message, path)
  }
  return json as T
}

/**
 * Build a public asset URL from a Strapi media url field.
 * Handles both relative (/uploads/...) and absolute URLs.
 */
export function getStrapiMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null
  if (url.startsWith('http')) return url
  return `${STRAPI_URL}${url}`
}

/** Legacy alias — kept for backward compat */
export const strapiImageUrl = (path: string | null | undefined) =>
  getStrapiMediaUrl(path) ?? '/images/logoo.png'

/** Custom error class for Strapi API errors */
export class StrapiAPIError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly path: string
  ) {
    super(`[Strapi ${status}] ${path}: ${message}`)
    this.name = 'StrapiAPIError'
  }
}

/**
 * @deprecated Use strapiFetch() instead.
 * Kept for backward compatibility only.
 */
export async function strapiGet<T = unknown>(
  path: string,
  query?: Record<string, unknown>
): Promise<{ data: T; meta?: unknown }> {
  return strapiFetch<{ data: T; meta?: unknown }>(path, {
    ...(query ?? {}),
    noCache: true,
  })
}
