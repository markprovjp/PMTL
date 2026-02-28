// ─────────────────────────────────────────────────────────────
//  fe-pmtl/lib/api/community.ts
//  Client functions cho Community Posts & Comments
// ─────────────────────────────────────────────────────────────

const API = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'

function getToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

function authHeaders(): HeadersInit {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

function imgUrl(media: any): string {
  if (!media) return ''
  const url = media?.url || media?.data?.attributes?.url || ''
  return url.startsWith('http') ? url : `${API}${url}`
}

/* ── Types ──────────────────────────────────────────────────── */
export interface CommunityPost {
  id: number
  documentId: string
  title: string
  content: string
  type: 'story' | 'feedback' | 'video'
  category: string
  cover_image: any
  video_url?: string
  author_name: string
  author_country?: string
  author?: any
  likes: number
  views: number
  rating?: number
  tags?: string[]
  pinned?: boolean
  createdAt: string
  publishedAt: string
  comments?: CommunityComment[]
  coverUrl?: string // computed
}

export interface CommunityComment {
  id: number
  documentId: string
  content: string
  author_name: string
  author_country?: string
  likes: number
  createdAt: string
  parent_comment?: any
}

/* ── Helpers ─────────────────────────────────────────────────── */
export function normalizePosts(raw: any[]): CommunityPost[] {
  return raw.map((item) => {
    const attrs = item.attributes || item
    return {
      id: item.id,
      documentId: item.documentId,
      ...attrs,
      coverUrl: imgUrl(attrs.cover_image?.data || attrs.cover_image),
      comments: (attrs.comments?.data || attrs.comments || []).map((c: any) => ({
        id: c.id,
        documentId: c.documentId,
        ...(c.attributes || c),
      })),
    }
  })
}

/* ── API calls ───────────────────────────────────────────────── */

export async function fetchPosts(params?: {
  search?: string
  category?: string
  sort?: string
  page?: number
  pageSize?: number
}): Promise<{ posts: CommunityPost[]; total: number }> {
  const qs = new URLSearchParams()
  qs.append('populate[0]', 'cover_image')
  qs.append('populate[1]', 'comments')
  qs.set('pagination[page]', String(params?.page || 1))
  qs.set('pagination[pageSize]', String(params?.pageSize || 20))

  if (params?.search) {
    qs.set('filters[$or][0][title][$containsi]', params.search)
    qs.set('filters[$or][1][content][$containsi]', params.search)
    qs.set('filters[$or][2][author_name][$containsi]', params.search)
  }
  if (params?.category && params.category !== 'Tất cả') {
    qs.set('filters[category][$eq]', params.category)
  }

  const sortMap: Record<string, string> = {
    newest: 'createdAt:desc',
    popular: 'views:desc',
    most_liked: 'likes:desc',
  }
  qs.set('sort', sortMap[params?.sort || 'newest'] || 'createdAt:desc')

  const res = await fetch(`${API}/api/community-posts?${qs}`)
  if (!res.ok) throw new Error('Không thể tải bài viết')
  const json = await res.json()
  return {
    posts: normalizePosts(json.data || []),
    total: json.meta?.pagination?.total || 0,
  }
}

export async function fetchPostById(id: string | number): Promise<CommunityPost> {
  const res = await fetch(`${API}/api/community-posts/${id}?populate[0]=cover_image&populate[1]=comments`)
  if (!res.ok) throw new Error('Không tìm thấy bài viết')
  const json = await res.json()
  const raw = json.data
  const attrs = raw.attributes || raw
  return {
    id: raw.id,
    documentId: raw.documentId,
    ...attrs,
    coverUrl: imgUrl(attrs.cover_image?.data || attrs.cover_image),
    comments: (attrs.comments?.data || attrs.comments || []).map((c: any) => ({
      id: c.id,
      documentId: c.documentId,
      ...(c.attributes || c),
    })),
  }
}

export async function likePost(id: string | number): Promise<number> {
  const res = await fetch(`${API}/api/community-posts/like/${id}`, {
    method: 'POST',
    headers: { ...authHeaders() },
  })
  if (!res.ok) throw new Error('Không thể thích bài viết')
  const json = await res.json()
  return json.likes
}

export async function viewPost(id: string | number): Promise<number> {
  const res = await fetch(`${API}/api/community-posts/${id}/view`, {
    method: 'POST',
    headers: { ...authHeaders() },
  })
  if (!res.ok) return 0
  const json = await res.json()
  return json.views || 0
}

export async function submitPost(data: {
  title: string
  content: string
  type: string
  category: string
  author_name: string
  author_country: string
  video_url?: string
  tags?: string | string[]
}): Promise<void> {
  const res = await fetch(`${API}/api/community-posts/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || 'Gửi bài thất bại')
  }
}

export async function submitComment(data: {
  postId: string | number
  content: string
  author_name: string
  author_country: string
  parent_comment?: string | number
}): Promise<void> {
  const res = await fetch(`${API}/api/community-comments/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Gửi bình luận thất bại')
}

export async function likeComment(id: string | number): Promise<number> {
  const res = await fetch(`${API}/api/community-comments/like/${id}`, {
    method: 'POST',
    headers: { ...authHeaders() },
  })
  if (!res.ok) throw new Error('Không thể thích bình luận')
  const json = await res.json()
  return json.likes
}
