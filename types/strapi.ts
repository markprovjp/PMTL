// ─────────────────────────────────────────────────────────────
//  STRAPI v5 Types — shared across all API calls
//  Follows Strapi's flat response format (v5 removed data.attributes)
// ─────────────────────────────────────────────────────────────

/** Generic paginated list response from Strapi */
export interface StrapiList<T> {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

/** Generic single item response from Strapi */
export interface StrapiSingle<T> {
  data: T
  meta: Record<string, unknown>
}

/** Strapi media/image format */
export interface StrapiMedia {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number | null
  height: number | null
  formats: {
    thumbnail?: StrapiMediaFormat
    small?: StrapiMediaFormat
    medium?: StrapiMediaFormat
    large?: StrapiMediaFormat
  } | null
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  createdAt: string
  updatedAt: string
}

export interface StrapiMediaFormat {
  name: string
  hash: string
  ext: string
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  url: string
}

/** SEO component (shared.seo) */
export interface StrapiSEO {
  id: number
  metaTitle: string | null
  metaDescription: string | null
  metaImage: StrapiMedia | null
  keywords: string | null
  canonicalURL: string | null
}

// ─── Category ─────────────────────────────────────────────────

/** Hierarchical category — parent/child tree structure */
export interface Category {
  id: number
  documentId: string
  name: string
  slug: string
  description: string | null
  icon: string | null           // emoji or text icon e.g. "📖"
  color: string | null          // hex color for UI accents
  order: number                 // display order among siblings
  is_active: boolean
  parent: Category | null       // self-relation — null means root
  children?: Category[]         // populated client-side when building tree
  thumbnail: StrapiMedia | null
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

/** Tree node built client-side from flat Category list */
export interface CategoryTree extends Category {
  children: CategoryTree[]
  depth: number
}

// ─── BlogPost ────────────────────────────────────────────────

export type BlogCategory =
  | 'phap-hoc'
  | 'hoi-dap'
  | 'cam-ngo'
  | 'kinh-dien'
  | 'thien-dinh'
  | 'tu-hoc'
  | 'van-hoa'
  | 'doi-song'
  | 'su-kien'
  | 'tin-tuc'

/** BlogPost entity (Strapi v5 flat format) */
export interface BlogPost {
  id: number
  documentId: string
  title: string
  slug: string
  content: string
  excerpt: string
  /** Legacy string category enum (kept for backwards compat) */
  category: BlogCategory
  /** Relation to Category content type (dynamic tree) */
  category_rel: Category | null
  tags: string[] | null
  author: string
  thumbnail: StrapiMedia | null
  video_url: string | null      // YouTube / embed URL
  views: number

  // ── Source tracking (wenda / shuohua references) ──
  /**
   * Type of dharma source:
   *   wenda   = Q&A session  (問答 — "wenda")
   *   shuohua = Dharma talk  (說話 — "shuohua")
   */
  source_type: 'wenda' | 'shuohua' | 'other' | null
  /**
   * Date code portion: e.g. "wenda20140829" or "shuohua20140829"
   * Used for deduplication + filtering
   */
  source_code: string | null
  /**
   * Timestamp within the session: e.g. "42:22"
   * Combined with source_code forms a unique reference key
   */
  source_time: string | null

  seo: StrapiSEO | null
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

/** Unique deduplication key for a post — source_code + source_time */
export function getSourceKey(post: Pick<BlogPost, 'source_code' | 'source_time'>): string | null {
  if (!post.source_code) return null
  return post.source_time ? `${post.source_code}@${post.source_time}` : post.source_code
}

// ─── Settings ────────────────────────────────────────────────

export interface SocialLinks {
  facebook?: string
  youtube?: string
  zalo?: string
  tiktok?: string
  instagram?: string
  telegram?: string
}

/** Settings single type */
export interface SiteSetting {
  id: number
  documentId: string
  siteTitle: string
  siteDescription: string
  logo: StrapiMedia | null
  socialLinks: SocialLinks | null
  contactEmail: string | null
  contactPhone: string | null
  address: string | null
  footerText: string | null
  createdAt: string
  updatedAt: string
}

// ─── API Errors ───────────────────────────────────────────────

export interface StrapiError {
  data: null
  error: {
    status: number
    name: string
    message: string
    details?: Record<string, unknown>
  }
}

export type StrapiResponse<T> = T | StrapiError

export function isStrapiError(res: unknown): res is StrapiError {
  return (
    typeof res === 'object' &&
    res !== null &&
    'error' in res &&
    typeof (res as StrapiError).error?.status === 'number'
  )
}
