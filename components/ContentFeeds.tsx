'use client'

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PlayIcon, BookIcon, ArrowRightIcon, SearchIcon } from "@/components/icons/ZenIcons";
import { getCategoriesClient } from "@/lib/api/categories-client";
import type { Category } from "@/types/strapi";

const dharmaTalks = [
  { title: "Cách hóa giải oán kết gia đình", category: "Gia Đạo", duration: "15 phút" },
  { title: "Niệm Phật trị bệnh thân tâm", category: "Sức Khỏe", duration: "22 phút" },
  { title: "Phóng sinh đúng pháp tăng phước", category: "Tu Tập", duration: "18 phút" },
  { title: "Cầu con theo lời Phật dạy", category: "Cầu Con", duration: "20 phút" },
];

const stories = [
  { title: "Câu chuyện nhân quả: Lòng hiếu thảo cảm động trời đất", date: "25/02/2026" },
  { title: "Sự mầu nhiệm của niệm Kinh Đại Bi Chú", date: "24/02/2026" },
  { title: "Hành giả chia sẻ: Tu tập thay đổi cuộc đời", date: "23/02/2026" },
  { title: "Phật pháp ứng dụng: Vượt qua khó khăn tài chính", date: "22/02/2026" },
];

const ContentFeeds = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategoriesClient().then(cats => {
      setCategories(cats);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* ── Left Content (8/12) ── */}
          <div className="lg:col-span-8 space-y-20">

            {/* Dharma Talks */}
            <div className="group">
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                  <h2 className="font-display text-3xl text-foreground">Khai Thị Mới Nhất</h2>
                  <p className="text-sm text-muted-foreground">Lời vàng ý ngọc từ Sư Phụ</p>
                </div>
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gold-dim hover:text-gold transition-colors font-medium">
                  Xem tất cả <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dharmaTalks.map((talk, i) => (
                  <motion.div
                    key={talk.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link href="/blog" className="block p-5 rounded-xl bg-card border border-border/50 hover:border-gold/30 transition-all group/item shadow-sm hover:shadow-gold/5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover/item:bg-gold/10 transition-colors">
                          <PlayIcon className="w-4 h-4 text-gold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display text-base text-foreground truncate group-hover/item:text-gold transition-colors">
                            {talk.title}
                          </h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] text-gold-dim uppercase tracking-wider font-bold">{talk.category}</span>
                            <span className="text-[10px] text-muted-foreground font-medium">{talk.duration}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stories */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                  <h2 className="font-display text-3xl text-foreground">Chuyện Phật Pháp</h2>
                  <p className="text-sm text-muted-foreground">Chứng nghiệm mầu nhiệm từ đồng tu</p>
                </div>
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gold-dim hover:text-gold transition-colors font-medium">
                  Xem tất cả <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-3">
                {stories.map((story, i) => (
                  <motion.div
                    key={story.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link href="/blog" className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border/50 hover:border-gold/30 transition-all group/item shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover/item:bg-gold/10 transition-colors">
                        <BookIcon className="w-4 h-4 text-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-lg text-foreground truncate group-hover/item:text-gold transition-colors">
                          {story.title}
                        </h4>
                        <span className="text-xs text-muted-foreground mt-1">{story.date}</span>
                      </div>
                      <ArrowRightIcon className="w-4 h-4 text-muted-foreground/30 group-hover/item:translate-x-1 group-hover/item:text-gold transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Sidebar (4/12) ── */}
          <aside className="lg:col-span-4 space-y-8">

            {/* Search Box Link */}
            <div className="p-6 rounded-2xl bg-gold/5 border border-gold/10 relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="font-display text-xl text-foreground mb-2">Tìm kiếm Khai thị</h3>
                <p className="text-sm text-muted-foreground mb-5">Hàng ngàn câu trả lời cho mọi hoàn cảnh cuộc sống.</p>
                <Link href="/search" className="w-full py-3 px-4 rounded-xl bg-background border border-border flex items-center gap-3 text-muted-foreground hover:border-gold/50 transition-all">
                  <SearchIcon className="w-4 h-4" />
                  <span className="text-sm">Nhập từ khóa...</span>
                </Link>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gold/5 rounded-full blur-2xl group-hover:bg-gold/10 transition-colors" />
            </div>

            {/* Dynamic Categories */}
            <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-border/50 bg-secondary/30">
                <h3 className="font-display text-lg text-foreground flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                  Danh Mục Tra Cứu
                </h3>
              </div>
              <div className="p-3">
                {loading ? (
                  <div className="space-y-2 p-3">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="h-9 bg-secondary rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <nav className="space-y-1 max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
                    {categories.map((cat, i) => (
                      <Link
                        key={cat.id}
                        href={`/category/${cat.slug}`}
                        className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-gold/10 group transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-muted-foreground font-mono opacity-50">{(i + 1).toString().padStart(2, '0')}</span>
                          <span className="text-sm text-muted-foreground group-hover:text-gold group-hover:font-medium transition-colors">{cat.name}</span>
                        </div>
                        <ArrowRightIcon className="w-3 h-3 text-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    ))}
                  </nav>
                )}
                <div className="mt-4 p-4 border-t border-border/30">
                  <Link href="/blog" className="text-xs text-gold hover:underline flex items-center justify-center gap-2 font-medium">
                    Xem tất cả bài viết <ArrowRightIcon className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Support Widget */}
            <div className="p-6 rounded-2xl bg-secondary/50 border border-border text-center">
              <h4 className="text-sm font-bold text-foreground mb-2">Cần giúp đỡ tu học?</h4>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">Kết nối với ban biên tập để được hướng dẫn chi tiết về Pháp Môn Tâm Linh.</p>
              <Link href="/qa" className="inline-block text-xs text-gold border-b border-gold/30 hover:border-gold transition-all pb-0.5">
                Gửi câu hỏi của bạn
              </Link>
            </div>

          </aside>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.2); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(212, 175, 55, 0.4); }
      `}</style>
    </section>
  );
};

export default ContentFeeds;
