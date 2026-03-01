// ═══════════════════════════════════════════════════════════════
//  lib/strapi-client.ts — Client-side API utilities
//
//  ⚠️  QUAN TRỌNG: File này dành cho 'use client' components.
//  KHÔNG import STRAPI_API_TOKEN ở đây.
//  KHÔNG gọi strapiFetch() từ file này.
// ═══════════════════════════════════════════════════════════════

const API = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? 'http://localhost:1337'

// ─── Auth helpers ─────────────────────────────────────────────

/** Lấy JWT token xác thực người dùng từ localStorage (client only) */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

/** Build Authorization header cho client-side requests */
export function buildAuthHeaders(): HeadersInit {
  const token = getAuthToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

/** Build JSON headers với auth */
export function buildJsonHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    ...buildAuthHeaders(),
  }
}

// ─── Base fetch ───────────────────────────────────────────────

/**
 * Gọi API Strapi từ phía client (browser).
 * Không có token server, chỉ được gọi các endpoint Public.
 * @example
 *   const data = await clientFetch('/blog-posts', { page: 1 })
 */
export async function clientFetch<T = unknown>(
  path: string,
  params: Record<string, string | number | boolean> = {}
): Promise<T> {
  const qs = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) qs.set(k, String(v))
  })
  const url = `${API}/api${path}${qs.toString() ? `?${qs}` : ''}`
  const res = await fetch(url, { headers: buildAuthHeaders() })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message ?? `API Error ${res.status}: ${path}`)
  }
  return res.json()
}

// ─── Upload ───────────────────────────────────────────────────

/**
 * Upload file lên Strapi Media Library.
 * Trả về id của file vừa upload (dùng trong relations).
 * @example
 *   const fileId = await uploadFile(file)
 *   await submitPost({ ..., cover_image: fileId })
 */
export async function uploadFile(file: File): Promise<{
  id: number
  url: string
  name: string
  mime: string
  size: number
}> {
  const formData = new FormData()
  formData.append('files', file)
  const res = await fetch(`${API}/api/upload`, {
    method: 'POST',
    body: formData,
    headers: buildAuthHeaders(),
  })
  if (!res.ok) throw new Error('Upload file thất bại')
  const json = await res.json()
  if (!json[0]) throw new Error('Upload trả về dữ liệu trống')
  return {
    id: json[0].id,
    url: json[0].url.startsWith('http') ? json[0].url : `${API}${json[0].url}`,
    name: json[0].name,
    mime: json[0].mime,
    size: json[0].size,
  }
}

/**
 * Upload nhiều file cùng lúc — dùng cho gallery.
 */
export async function uploadMultipleFiles(files: File[]): Promise<Array<{
  id: number
  url: string
  name: string
}>> {
  return Promise.all(files.map((f) => uploadFile(f)))
}

// ─── Like / View ──────────────────────────────────────────────

/** Tăng lượt thích cho một bài viết hoặc tài nguyên */
export async function likeItem(endpoint: string, id: string | number): Promise<number> {
  const res = await fetch(`${API}/api/${endpoint}/like/${id}`, {
    method: 'POST',
    headers: buildAuthHeaders(),
  })
  if (!res.ok) throw new Error('Không thể thích')
  const json = await res.json()
  return json.likes ?? 0
}

/** Tăng lượt xem — fire-and-forget, không cần await */
export function trackView(endpoint: string, id: string | number): void {
  fetch(`${API}/api/${endpoint}/${id}/view`, {
    method: 'POST',
    headers: buildAuthHeaders(),
  }).catch(() => { }) // silent fail
}

// ─── Media URL (client-side) ─────────────────────────────────

/** Resolve URL ảnh/file từ Strapi media object, client-side version */
export function resolveUrl(media: any): string | null {
  if (!media) return null
  const url =
    media?.url ??
    media?.data?.attributes?.url ??
    media?.data?.url ??
    null
  if (!url) return null
  return url.startsWith('http') ? url : `${API}${url}`
}

export const STRAPI_API = API
