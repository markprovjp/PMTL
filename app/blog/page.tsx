// ─────────────────────────────────────────────────────────────
//  /blog — Server Component
//  Fetches from Strapi; falls back to mock data if empty
// ─────────────────────────────────────────────────────────────
export const dynamic = 'force-dynamic' // always fetch fresh — no stale ISR cache

import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StickyBanner from '@/components/StickyBanner'
import BlogListClient from '@/components/BlogListClient'
import { getPosts } from '@/lib/api/blog'
import type { BlogPost } from '@/types/strapi'

export const metadata: Metadata = {
  title: 'Blog & Chia Sẻ | Tin Tức & Phản Hồi',
  description: 'Bài khai thị, cảm ngộ và chia sẻ từ cộng đồng tu học toàn cầu',
}

/** Mock data used when Strapi has no posts yet */
const MOCK_POSTS: BlogPost[] = [
  {
    id: 1, documentId: 'mock-1',
    title: "Ba 'Pháp Bảo' linh nghiệm vô cùng — chỉ nửa tháng trị lành bệnh tim bao dịch",
    slug: 'ba-phap-bao-linh-nghiem',
    content: '', excerpt: 'Cảm ơn Nam Mô Quan Thế Âm Bồ Tát! Chồng tôi 50 tuổi đã mắc bệnh gan từ lâu. Sau khi kiên trì niệm kinh, phóng sinh và phát nguyện, chỉ sau nửa tháng bệnh tim bao dịch đã được chữa lành...',
    category: 'cam-ngo', tags: null, author: 'Ban biên tập', thumbnail: null,
    views: 245, seo: null, publishedAt: '2026-02-25T00:00:00Z', createdAt: '2026-02-25T00:00:00Z', updatedAt: '2026-02-25T00:00:00Z',
    category_rel: null, video_url: null, source_type: null, source_code: null, source_time: null,
  },
  {
    id: 2, documentId: 'mock-2',
    title: 'Con gái mang thai bị đột quỵ nguy kịch, Bồ Tát từ bi bảo hộ mẹ con bình an',
    slug: 'con-gai-mang-thai-dot-quy',
    content: '', excerpt: 'Con gái tôi 32 tuổi, mang thai, phạm xung Thái Tuế. Mỗi ngày rằm và mùng một đều nhờ tôi thay phóng sinh, tổng cộng gần 5000 con cá...',
    category: 'cam-ngo', tags: null, author: 'Ban biên tập', thumbnail: null,
    views: 189, seo: null, publishedAt: '2026-02-24T00:00:00Z', createdAt: '2026-02-24T00:00:00Z', updatedAt: '2026-02-24T00:00:00Z',
    category_rel: null, video_url: null, source_type: null, source_code: null, source_time: null,
  },
  {
    id: 3, documentId: 'mock-3',
    title: 'Bạch Thoại Phật Pháp — Tập 12: Buông xả và tự tại trong cuộc sống',
    slug: 'bach-thoai-tap-12-buong-xa',
    content: '', excerpt: 'Chúng ta phải hiểu rằng trong cuộc sống, mọi thứ đều là vô thường. Khi bạn nắm giữ quá chặt, phiền não sẽ theo đó mà sinh ra...',
    category: 'phap-hoc', tags: null, author: 'Ban biên tập', thumbnail: null,
    views: 312, seo: null, publishedAt: '2026-02-23T00:00:00Z', createdAt: '2026-02-23T00:00:00Z', updatedAt: '2026-02-23T00:00:00Z',
    category_rel: null, video_url: null, source_type: null, source_code: null, source_time: null,
  },
  {
    id: 4, documentId: 'mock-4',
    title: 'Hướng dẫn thiết lập bàn thờ Phật tại gia đúng pháp cho người mới',
    slug: 'huong-dan-ban-tho-phat',
    content: '', excerpt: 'Bài viết hướng dẫn chi tiết từng bước cách thiết lập bàn thờ Phật tại gia đúng pháp, từ vị trí đặt bàn thờ đến cách thờ phụng đúng chuẩn...',
    category: 'phap-hoc', tags: null, author: 'Ban biên tập', thumbnail: null,
    views: 567, seo: null, publishedAt: '2026-02-21T00:00:00Z', createdAt: '2026-02-21T00:00:00Z', updatedAt: '2026-02-21T00:00:00Z',
    category_rel: null, video_url: null, source_type: null, source_code: null, source_time: null,
  },
  {
    id: 5, documentId: 'mock-5',
    title: 'Sư Phụ khai thị: Tại sao phải niệm Kinh Đại Bi Chú mỗi ngày',
    slug: 'su-phu-khai-thi-niem-dai-bi-chu',
    content: '', excerpt: 'Chú Đại Bi là một trong ba trụ cột của Pháp Môn Tâm Linh. Đây là bài khai thị quan trọng từ Sư Phụ về ý nghĩa và lợi ích của việc trì tụng hàng ngày...',
    category: 'phap-hoc', tags: null, author: 'Ban biên tập', thumbnail: null,
    views: 891, seo: null, publishedAt: '2026-02-19T00:00:00Z', createdAt: '2026-02-19T00:00:00Z', updatedAt: '2026-02-19T00:00:00Z',
    category_rel: null, video_url: null, source_type: null, source_code: null, source_time: null,
  },
  {
    id: 6, documentId: 'mock-6',
    title: 'Vợ chồng sắp ly hôn — Niệm Kinh Giải Kết Chú hóa giải mâu thuẫn',
    slug: 'vo-chong-sap-ly-hon-giai-ket-chu',
    content: '', excerpt: 'Chúng tôi đã đứng bờ ly hôn sau 8 năm chung sống. Sau khi được hướng dẫn niệm Kinh Giải Kết Chú và thực hành phóng sinh hồi hướng, mọi chuyện đã thay đổi...',
    category: 'phap-hoc', tags: null, author: 'Ban biên tập', thumbnail: null,
    views: 423, seo: null, publishedAt: '2026-02-15T00:00:00Z', createdAt: '2026-02-15T00:00:00Z', updatedAt: '2026-02-15T00:00:00Z',
    category_rel: null, video_url: null, source_type: null, source_code: null, source_time: null,
  },
]

export default async function BlogPage() {
  // Fetch from Strapi — gracefully falls back to mock data
  let posts: BlogPost[] = MOCK_POSTS
  let totalFromStrapi = 0

  try {
    const res = await getPosts({ pageSize: 20, revalidate: 60 })
    if (res.data.length > 0) {
      posts = res.data
      totalFromStrapi = res.meta.pagination.total
    }
  } catch {
    // Strapi not running or no token → use mock data silently
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">
              Blog &amp; Chia Sẻ
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Tin Tức &amp; Phản Hồi
            </h1>
            <p className="text-muted-foreground text-lg">
              Bài khai thị, cảm ngộ và chia sẻ từ cộng đồng tu học toàn cầu
            </p>
          </div>

          <BlogListClient posts={posts} totalFromStrapi={totalFromStrapi} />
        </div>
      </main>
      <Footer />
      <StickyBanner />
    </div>
  )
}

