// ═══════════════════════════════════════════════════════════════
//  lib/strapi-helpers.ts — Shared utilities cho PMTL VN project
//
//  🔒 QUY TẮC BẤT BIẾN:
//  - Tất cả hàm SERVER-SIDE: import từ '@/lib/strapi-helpers'
//  - Tất cả hàm CLIENT-SIDE: không dùng process.env.STRAPI_API_TOKEN
//  - getStrapiMediaUrl() dùng cho MỌI URL ảnh từ Strapi
// ═══════════════════════════════════════════════════════════════

import { STRAPI_URL, getStrapiMediaUrl } from '@/lib/strapi'

// ─── Image URL Helpers ────────────────────────────────────────

/** Lấy URL ảnh từ media object Strapi (hỗ trợ nhiều format object khác nhau) */
export function resolveMediaUrl(media: StrapiMediaInput | null | undefined): string | null {
  if (!media) return null
  const url =
    (media as any)?.url ??
    (media as any)?.data?.attributes?.url ??    // Strapi v4 compat
    (media as any)?.data?.url ??
    null
  return getStrapiMediaUrl(url)
}

/** Lấy thumbnail nhỏ nhất có thể (tối ưu Largest Contentful Paint) */
export function resolveThumbnailUrl(media: StrapiMediaInput | null | undefined): string | null {
  if (!media) return null
  const formats = (media as any)?.formats ?? (media as any)?.data?.formats ?? null
  const url =
    formats?.thumbnail?.url ??
    formats?.small?.url ??
    (media as any)?.url ??
    (media as any)?.data?.url ??
    null
  return getStrapiMediaUrl(url)
}

/** Giải quyết URL ảnh với fallback mặc định */
export function resolveImageWithFallback(
  media: StrapiMediaInput | null | undefined,
  fallback = '/images/hero-bg.jpg'
): string {
  return resolveMediaUrl(media) ?? fallback
}

/** Giải quyết URL file bất kỳ — PDF, MP3, MP4 */
export function resolveFileUrl(media: StrapiMediaInput | null | undefined): string | null {
  return resolveMediaUrl(media)
}

// Kiểu hỗ trợ — chấp nhận cả v4 và v5 object shapes
type StrapiMediaInput = {
  url?: string
  formats?: Record<string, { url: string }>
  data?: {
    url?: string
    attributes?: { url?: string; formats?: Record<string, { url: string }> }
    formats?: Record<string, { url: string }>
  }
}

// ─── List & Search Helpers ─────────────────────────────────────

/** Build filter object cho Strapi — tìm kiếm full-text trong nhiều trường */
export function buildSearchFilter(
  query: string,
  fields: string[]
): Record<string, unknown> {
  if (!query.trim()) return {}
  return {
    $or: fields.map((field) => ({
      [field]: { $containsi: query.trim() },
    })),
  }
}

/** Build pagination object cho strapiFetch */
export function buildPagination(page = 1, pageSize = 12) {
  return { page: Math.max(1, page), pageSize: Math.min(100, Math.max(1, pageSize)) }
}

/** Merge nhiều filter lại với nhau (AND logic) */
export function mergeFilters(
  ...filters: Array<Record<string, unknown>>
): Record<string, unknown> {
  const nonEmpty = filters.filter((f) => Object.keys(f).length > 0)
  if (nonEmpty.length === 0) return {}
  if (nonEmpty.length === 1) return nonEmpty[0]
  return { $and: nonEmpty }
}

// ─── Date & Time Helpers ──────────────────────────────────────

/** Format ngày sang định dạng Việt Nam: "01 tháng 3, 2026" */
export function formatDateVN(dateStr: string | null | undefined): string {
  if (!dateStr) return ''
  const months = [
    'tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6',
    'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12',
  ]
  const d = new Date(dateStr)
  return `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`
}

/** Format ngày ngắn: "01/03/2026" */
export function formatDateShort(dateStr: string | null | undefined): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
}

/** Tính "X phút/giờ/ngày trước" */
export function timeAgo(dateStr: string | null | undefined): string {
  if (!dateStr) return ''
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Vừa xong'
  if (mins < 60) return `${mins} phút trước`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} giờ trước`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} ngày trước`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} tháng trước`
  return `${Math.floor(months / 12)} năm trước`
}

// ─── Number Helpers ───────────────────────────────────────────

/** Rút gọn số: 1500 → "1.5K", 2000000 → "2M" */
export function formatCount(n: number | undefined | null): string {
  if (!n) return '0'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

// ─── Text Helpers ─────────────────────────────────────────────

/** Cắt ngắn chuỗi an toàn */
export function truncate(str: string | null | undefined, maxLen = 120): string {
  if (!str) return ''
  if (str.length <= maxLen) return str
  return str.slice(0, maxLen).trimEnd() + '…'
}

/** Tạo slug từ tiếng Việt */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// ─── Rich Text Helper ─────────────────────────────────────────

/**
 * Strip HTML tags từ Strapi richtext để dùng làm meta description
 * Không cần DOMParser — chạy an toàn cả server lẫn client
 */
export function stripHtml(html: string | null | undefined): string {
  if (!html) return ''
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

// ─── URL Helpers ──────────────────────────────────────────────

/** Build Public Asset URL cho ảnh/file lưu trong uploads của Strapi */
export { getStrapiMediaUrl }

/** Build URL ảnh tuyệt đối cho og:image SEO tags */
export function buildOgImageUrl(media: StrapiMediaInput | null | undefined): string | null {
  const url = resolveMediaUrl(media)
  if (!url) return null
  // Nếu đã là absolute URL thì dùng luôn
  if (url.startsWith('http')) return url
  // Không bao giờ xảy ra vì getStrapiMediaUrl luôn trả về absolute
  return `${STRAPI_URL}${url}`
}

// ─── Download Helpers ─────────────────────────────────────────

/**
 * Tạo đường dẫn download trực tiếp cho file từ Strapi.
 * PDF, MP3, MP4 đều dùng hàm này — không cần auth (public endpoint).
 */
export function buildDownloadUrl(
  fileMedia: StrapiMediaInput | null | undefined
): string | null {
  return resolveFileUrl(fileMedia)
}

/** Lấy tên file và size mô tả từ media object */
export function describeFile(media: {
  name?: string
  ext?: string
  size?: number
} | null | undefined): { name: string; sizeText: string } {
  if (!media) return { name: 'Không rõ', sizeText: '' }
  const sizeKB = (media.size ?? 0) / 1024
  const sizeText = sizeKB > 1024
    ? `${(sizeKB / 1024).toFixed(1)} MB`
    : `${sizeKB.toFixed(0)} KB`
  return { name: media.name ?? 'file', sizeText }
}
