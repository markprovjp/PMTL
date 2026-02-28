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

/** Category with hierarchical tree support — can have parent/children */
export interface Category {
  id: number
  documentId: string
  name: string
  slug: string
  description: string | null       // rich text — ghi chú cho admin
  color: string | null             // hex color for UI accents
  order: number                     // display order among siblings
  is_active: boolean
  parent: Category | null           // self-relation — null means root category
  children: Category[] | null       // child categories (populated client-side)
  blog_posts: BlogPost[] | null     // posts that belong to this category (not populated by default)
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

/** Tree node built client-side from flat Category list */
export interface CategoryTree extends Category {
  children: CategoryTree[]
  depth: number
}

// BlogCategory is removed as we now use true relations

/** BlogPost entity (Strapi v5 flat format) */
export interface BlogPost {
  id: number
  documentId: string
  title: string
  slug: string
  content: string
  /** Original link to the source if available */
  original_link: string | null
  /** Many-to-many: one post can have multiple topic categories */
  categories: Category[] | null
  tags: string[] | null
  thumbnail: StrapiMedia | null
  gallery: StrapiMedia[] | null      // additional images
  video_url: string | null           // YouTube / embed URL
  audio_url: string | null           // audio player URL
  views: number
  likes: number

  // ── Publishing ──────────────────────────────────────────
  status: 'draft' | 'published' | 'archived'
  featured: boolean                  // pin to top
  original_title: string | null      // Chinese title for bilingual posts

  // ── Source tracking ────────
  /** Consistently formatted source e.g. "wenda20140829 42:22" */
  source: string | null

  // ── Related content ─────────────────────────────────────
  related_posts: BlogPost[] | null

  seo: StrapiSEO | null
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface BeginnerGuide {
  id: number
  documentId: string
  title: string
  description: string | null
  content: string | null // rich text
  duration: string | null
  order: number
  images: StrapiMedia[] | null
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

/** Site title/SEO settings */
export interface StrapiSEO {
  id: number
  metaTitle: string | null
  metaDescription: string | null
  metaImage: StrapiMedia | null
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
