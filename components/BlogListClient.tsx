'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon, SearchIcon } from '@/components/icons/ZenIcons'
import { getStrapiMediaUrl } from '@/lib/strapi'
import type { BlogPost } from '@/types/strapi'

interface BlogCategory_UI {
  id: string
  label: string
}

const CATEGORIES: BlogCategory_UI[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'phap-hoc', label: 'Phật Học Vấn Đáp' },
  { id: 'hoi-dap', label: 'Hỏi Đáp Huyền Nghệ' },
  { id: 'cam-ngo', label: 'Cảm Ngộ Đồng Tu' },
  { id: 'kinh-dien', label: 'Kinh Điển' },
  { id: 'thien-dinh', label: 'Thiền Định' },
  { id: 'tu-hoc', label: 'Tự Học' },
  { id: 'van-hoa', label: 'Văn Hóa Phật Giáo' },
  { id: 'doi-song', label: 'Đời Sống' },
  { id: 'su-kien', label: 'Sự Kiện' },
  { id: 'tin-tuc', label: 'Tin Tức' },
]

const EXTERNAL_LINKS = [
  { label: 'Website Toàn Cầu (心灵法门)', href: 'https://xinlingfamen.info' },
  { label: 'Blog Đài Trưởng Lư', href: 'https://xlch.org' },
  { label: 'Đài Đông Phương Úc', href: 'https://xlch.org' },
  { label: 'Zalo Group XLFM', href: 'https://zalo.me' },
  { label: 'YouTube Channel', href: 'https://youtube.com' },
]

interface BlogListClientProps {
  posts: BlogPost[]
  totalFromStrapi: number
}

export default function BlogListClient({ posts, totalFromStrapi }: BlogListClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory
      const match = searchTerm.toLowerCase()
      const matchSearch =
        !match ||
        p.title.toLowerCase().includes(match) ||
        p.excerpt.toLowerCase().includes(match)
      return matchCat && matchSearch
    })
  }, [posts, activeCategory, searchTerm])

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* ── Sidebar ── */}
      <aside className="lg:w-72 shrink-0 space-y-5">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm bài viết..."
            className="w-full px-4 py-2.5 pl-10 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-secondary/50">
            <h3 className="font-display text-base text-foreground">Danh Mục Tra Cứu</h3>
            <p className="text-xs text-muted-foreground">查询目录</p>
          </div>
          <nav className="p-2 max-h-[420px] overflow-y-auto">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-left transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-primary/10 text-gold font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {cat.id !== 'all' && (
                  <span className="text-xs text-muted-foreground/50 w-5 shrink-0">{i}.</span>
                )}
                {cat.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 space-y-1">
          <h3 className="font-display text-base text-foreground mb-3">Liên Kết Quan Trọng</h3>
          {EXTERNAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-secondary transition-colors group text-sm"
            >
              <span className="text-muted-foreground group-hover:text-gold transition-colors">
                {link.label}
              </span>
              <ArrowRightIcon className="w-3.5 h-3.5 text-gold opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </aside>

      {/* ── Post List ── */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Hiển thị{' '}
            <span className="text-foreground font-medium">{filtered.length}</span> bài viết
            {activeCategory !== 'all' && (
              <button
                onClick={() => setActiveCategory('all')}
                className="ml-2 text-gold hover:underline"
              >
                × Xóa bộ lọc
              </button>
            )}
          </p>
          {totalFromStrapi > 0 && (
            <span className="text-xs text-muted-foreground/60">
              {totalFromStrapi} bài trong hệ thống
            </span>
          )}
        </div>

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">Không tìm thấy bài viết phù hợp</p>
              <button
                onClick={() => {
                  setActiveCategory('all')
                  setSearchTerm('')
                }}
                className="mt-3 text-gold hover:underline text-sm"
              >
                Xem tất cả
              </button>
            </div>
          ) : (
            filtered.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-gold/30 transition-all group"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex gap-5">
                    {post.thumbnail && (
                      <div className="shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-secondary">
                        <Image
                          src={getStrapiMediaUrl(post.thumbnail.url) ?? ''}
                          alt={post.thumbnail.alternativeText ?? post.title}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="px-2.5 py-1 rounded-md bg-secondary text-xs font-medium text-secondary-foreground">
                          {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-gold/10 text-xs font-medium text-gold capitalize">
                          {CATEGORIES.find((c) => c.id === post.category)?.label ?? post.category}
                        </span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {post.views} lượt xem
                        </span>
                      </div>
                      <h2 className="font-display text-xl text-foreground group-hover:text-gold transition-colors mb-2 leading-snug">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm text-gold/70 group-hover:text-gold transition-colors">
                        Đọc tiếp{' '}
                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
