'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { PlayIcon, BookIcon, ArrowRightIcon } from "@/components/icons/ZenIcons";

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
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-3xl text-foreground">Khai Thị Mới Nhất</h2>
              <Link href="/search" className="inline-flex items-center gap-2 text-sm text-gold-dim hover:text-gold transition-colors">
                Xem tất cả <ArrowRightIcon />
              </Link>
            </div>
            <div className="space-y-3">
              {dharmaTalks.map((talk, i) => (
                <motion.button
                  key={talk.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="w-full flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-gold-dim/30 transition-all group text-left"
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-colors">
                    <PlayIcon className="w-5 h-5 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-lg text-foreground truncate group-hover:text-gold transition-colors">
                      {talk.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gold-dim">{talk.category}</span>
                      <span className="text-xs text-muted-foreground">{talk.duration}</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-3xl text-foreground">Chuyện Phật Pháp</h2>
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gold-dim hover:text-gold transition-colors">
                Xem tất cả <ArrowRightIcon />
              </Link>
            </div>
            <div className="space-y-3">
              {stories.map((story, i) => (
                <motion.button
                  key={story.title}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="w-full flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-gold-dim/30 transition-all group text-left"
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-colors">
                    <BookIcon className="w-5 h-5 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-lg text-foreground truncate group-hover:text-gold transition-colors">
                      {story.title}
                    </h4>
                    <span className="text-xs text-muted-foreground mt-1">{story.date}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentFeeds;
