'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon, SearchIcon } from '@/components/icons/ZenIcons'
import { getStrapiMediaUrl } from '@/lib/strapi'
import type { BlogPost, Category } from '@/types/strapi'

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
  categories: Category[]
}

export default function BlogListClient({ posts, totalFromStrapi, categories }: BlogListClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchCat = activeCategory === 'all' || p.categories?.some(c => c.slug === activeCategory)
      const q = searchTerm.toLowerCase()
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        (p.source ?? '').toLowerCase().includes(q) ||
        (p.original_title ?? '').toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [posts, activeCategory, searchTerm])

  const hasFilter = activeCategory !== 'all' || searchTerm.length > 0

  function clearFilters() {
    setActiveCategory('all')
    setSearchTerm('')
  }

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* ── Sidebar ── */}
      <aside className="lg:w-72 shrink-0 space-y-5">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm bài viết, mã nguồn..."
            className="w-full px-4 py-2.5 pl-10 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>

        {/* SOURCE_TABS removed */}

        {/* Category Filter */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-secondary/50">
            <h3 className="font-display text-base text-foreground">Danh Mục Tra Cứu</h3>
            <p className="text-xs text-muted-foreground">查询目录</p>
          </div>
          <nav className="p-2 max-h-[450px] overflow-y-auto custom-scrollbar">
            <button
              onClick={() => setActiveCategory('all')}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors mb-1 ${activeCategory === 'all'
                ? 'bg-primary/10 text-gold font-medium'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
            >
              <span className="w-5 shrink-0 opacity-50">#</span>
              Tất cả bài viết
            </button>
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors mb-1 ${activeCategory === cat.slug
                  ? 'bg-primary/10 text-gold font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
              >
                <span className="text-xs text-muted-foreground/50 w-5 shrink-0">{i + 1}.</span>
                {cat.name}
              </button>
            ))}
          </nav>
        </div>

        {/* External Links */}
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
        {/* Results bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Hiển thị{' '}
            <span className="text-foreground font-medium">{filtered.length}</span> bài viết
            {hasFilter && (
              <button onClick={clearFilters} className="ml-2 text-gold hover:underline">
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

        {/* Post cards */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">Không tìm thấy bài viết phù hợp</p>
              <button onClick={clearFilters} className="mt-3 text-gold hover:underline text-sm">
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
                className={`p-5 rounded-xl bg-card border transition-all group ${post.featured ? 'border-gold/40 shadow-sm shadow-gold/5' : 'border-border hover:border-gold/30'
                  }`}
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex gap-5">
                    {/* Thumbnail / Gallery Fallback */}
                    {(post.thumbnail || (post.gallery && post.gallery.length > 0)) && (
                      <div className="shrink-0 w-100 h-50 rounded-lg overflow-hidden bg-secondary">
                        <Image
                          src={getStrapiMediaUrl(post.thumbnail?.url ?? post.gallery?.[0]?.url) ?? ''}
                          alt={post.thumbnail?.alternativeText ?? post.gallery?.[0]?.alternativeText ?? post.title}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      {/* Meta badges row */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {post.featured && (
                          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-medium">Nổi bật</span>
                        )}
                        <span className="px-2 py-0.5 rounded bg-secondary text-[10px] text-secondary-foreground">
                          {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                        {/* Source badge */}
                        {post.source && (
                          <span className="px-2 py-0.5 rounded bg-primary/10 text-gold text-[10px] font-medium font-mono lowercase">
                            {post.source}
                          </span>
                        )}
                        {/* Views */}
                        <span className="text-[10px] text-muted-foreground ml-auto">
                          {post.views.toLocaleString('vi-VN')} lượt xem
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="font-display text-lg text-foreground group-hover:text-gold transition-colors mb-1.5 leading-snug">
                        {post.title}
                      </h2>

                      {/* Original Chinese title */}
                      {post.original_title && (
                        <p className="text-xs text-muted-foreground/60 mb-1.5 font-light">{post.original_title}</p>
                      )}

                      {/* Content summary */}
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-3">
                        {post.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                      </p>

                      {/* Footer row */}
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 text-sm text-gold/70 group-hover:text-gold transition-colors">
                          Đọc tiếp{' '}
                          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
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
