'use client';

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyBanner from "@/components/StickyBanner";
import { SearchIcon, PlayIcon, ArrowRightIcon } from "@/components/icons/ZenIcons";
import { mockContributions, categories } from "@/data/mockContributions";
import type { Contribution } from "@/data/mockContributions";

/* ─────────────────────────────── Icons ──────────────────────────────── */

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 20 20" className={`w-3.5 h-3.5 ${filled ? "fill-amber-400 text-amber-400" : "fill-none text-border"}`} stroke="currentColor" strokeWidth="1.5">
    <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.26l-4.94 2.44.94-5.49-4-3.9 5.53-.8L10 1.5z" />
  </svg>
);

const QuoteIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179z" />
  </svg>
);

const EyeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const HeartIcon = ({ className = "w-4 h-4", filled = false }: { className?: string; filled?: boolean }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChatIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
    <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
  </svg>
);

const SendIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <line x1="22" y1="2" x2="11" y2="13" strokeLinecap="round" strokeLinejoin="round" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const GlobeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" />
  </svg>
);

const CalendarIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

/* ──────────────────────── Helper: arrange cards mix A B C ──────────── */
function arrangeCards(items: Contribution[]): Contribution[] {
  const videos = items.filter((c) => c.type === "video");
  const stories = items.filter((c) => c.type === "story");
  const feedbacks = items.filter((c) => c.type === "feedback");
  const result: Contribution[] = [];
  const max = Math.max(videos.length, stories.length, feedbacks.length);
  for (let i = 0; i < max; i++) {
    if (stories[i]) result.push(stories[i]);
    if (videos[i]) result.push(videos[i]);
    if (feedbacks[i]) result.push(feedbacks[i]);
    if (feedbacks[i + 1]) result.push(feedbacks[i + 1]);
  }
  const seen = new Set<number>();
  return result.filter((c) => { if (seen.has(c.id)) return false; seen.add(c.id); return true; });
}

/* ───────────────────── Format view count ────────────────────────────── */
function fmt(n?: number) {
  if (!n) return "0";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(".0", "") + "K";
  return String(n);
}

/* ════════════════════════════════════════════════════════════════════════
   CARD COMPONENTS
═════════════════════════════════════════════════════════════════════════ */

/* ── Type A: Video Card ─────────────────────────────────────────────── */
const VideoCard = ({ item, onClick }: { item: Contribution; onClick: () => void }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="group rounded-2xl bg-card border border-border overflow-hidden hover:border-gold/40 hover:shadow-lg hover:shadow-black/20 transition-all duration-300 cursor-pointer flex flex-col"
    onClick={onClick}
  >
    {/* Thumbnail */}
    <div className="relative aspect-video overflow-hidden bg-secondary shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.videoThumbnail}
        alt={item.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${item.id}/640/360`; }}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-gold text-black flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
          <PlayIcon className="w-5 h-5 ml-1" />
        </div>
      </div>
      {item.videoDuration && (
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded font-medium">
          {item.videoDuration}
        </div>
      )}
      <div className="absolute top-2 left-2 bg-black/60 text-gold text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
        {item.category}
      </div>
    </div>

    <div className="p-4 flex flex-col flex-1 gap-3">
      <h3 className="text-base font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-gold transition-colors duration-200">
        {item.title}
      </h3>
      <p className="text-sm text-foreground/65 italic leading-relaxed line-clamp-3 flex-1">
        &ldquo;{item.excerpt}&rdquo;
      </p>
      <div className="flex items-center gap-2 text-xs">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gold/40 to-amber-600/40 flex items-center justify-center text-gold font-bold text-xs shrink-0">
          {item.author.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-foreground/90">{item.author}</p>
          <p className="text-muted-foreground flex items-center gap-1">
            <GlobeIcon className="w-3 h-3" />
            {item.country}
          </p>
        </div>
      </div>
      {item.rating && (
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < item.rating!} />)}
          </div>
          <span className="text-xs text-muted-foreground">{item.rating}.0</span>
        </div>
      )}
      <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><EyeIcon className="w-3.5 h-3.5" />{fmt(item.viewCount)}</span>
          <span className="flex items-center gap-1"><ChatIcon className="w-3.5 h-3.5" />{item.commentCount}</span>
        </div>
        <div className="flex items-center gap-1 text-gold font-medium hover:underline">
          Xem video <ArrowRightIcon className="w-3 h-3" />
        </div>
      </div>
    </div>
  </motion.div>
);

/* ── Type B: Story Card ─────────────────────────────────────────────── */
const StoryCard = ({ item, onClick }: { item: Contribution; onClick: () => void }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="group rounded-2xl bg-card border border-border overflow-hidden hover:border-gold/40 hover:shadow-lg hover:shadow-black/20 transition-all duration-300 cursor-pointer flex flex-col"
    onClick={onClick}
  >
    <div className="relative overflow-hidden aspect-[16/9] bg-secondary shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.coverImage}
        alt={item.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 group-hover:brightness-110"
        onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/story${item.id}/640/360`; }}
      />
      <div className="absolute top-2 left-2 bg-black/60 text-gold text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
        {item.category}
      </div>
    </div>

    <div className="p-4 flex flex-col flex-1 gap-3">
      <h3 className="text-base font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-gold transition-colors duration-200">
        {item.title}
      </h3>
      <p className="text-sm text-foreground/65 leading-relaxed line-clamp-4 flex-1">
        {item.excerpt}
      </p>
      <div className="flex items-center gap-2 text-xs">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-600/30 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0">
          {item.author.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-foreground/90">{item.author}</p>
          <p className="text-muted-foreground flex items-center gap-1">
            <GlobeIcon className="w-3 h-3" />
            {item.country}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><EyeIcon className="w-3.5 h-3.5" />{fmt(item.viewCount)}</span>
          <span className="flex items-center gap-1 text-rose-400"><HeartIcon className="w-3.5 h-3.5" filled />{fmt(item.likeCount)}</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-gold transition-colors">
          <CalendarIcon className="w-3 h-3" />{item.date}
        </div>
      </div>
      <button className="flex items-center gap-1 text-sm font-medium text-gold hover:text-gold/80 transition-colors">
        Đọc đầy đủ <ArrowRightIcon className="w-4 h-4" />
      </button>
    </div>
  </motion.div>
);

/* ── Type C: Feedback Card ──────────────────────────────────────────── */
const FeedbackCard = ({ item, onClick }: { item: Contribution; onClick: () => void }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="group p-5 rounded-2xl bg-gradient-to-br from-card via-card to-primary/5 border border-border/70 hover:border-gold/30 transition-all duration-300 cursor-pointer flex flex-col gap-3"
    onClick={onClick}
  >
    <QuoteIcon className="w-7 h-7 text-gold/25 shrink-0" />
    <p className="text-sm italic text-foreground/80 leading-relaxed flex-1">
      &ldquo;{item.quote}&rdquo;
    </p>
    <div className="flex items-center gap-2.5 pt-2 border-t border-border/40">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500/20 to-gold/20 flex items-center justify-center text-gold font-bold text-sm shrink-0">
        {item.author.charAt(0)}
      </div>
      <div className="text-xs">
        <p className="font-semibold text-gold">{item.author}</p>
        <p className="text-muted-foreground flex items-center gap-1">
          <GlobeIcon className="w-3 h-3" />{item.country}
        </p>
      </div>
      <span className="ml-auto text-xs text-muted-foreground/50">{item.date}</span>
    </div>
    {item.tags && item.tags.length > 0 && (
      <div className="flex flex-wrap gap-1">
        {item.tags.map((tag) => (
          <span key={tag} className="text-xs bg-secondary/60 text-gold/60 px-2 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    )}
  </motion.div>
);

/* ════════════════════════════════════════════════════════════════════════
   DETAIL MODAL
═════════════════════════════════════════════════════════════════════════ */
const DetailModal = ({ item, onClose }: { item: Contribution | null; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="sticky top-4 ml-auto mr-4 flex w-8 h-8 rounded-full bg-secondary hover:bg-border transition-colors items-center justify-center z-10"
            >
              <CloseIcon className="w-4 h-4" />
            </button>

            <div className="px-6 pb-8 -mt-6">
              {/* VIDEO */}
              {item.type === "video" && (
                <div className="space-y-5">
                  {item.videoUrl && (
                    <div className="aspect-video rounded-xl overflow-hidden bg-black relative group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.videoThumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${item.id}/640/360`; }}
                      />
                      <a
                        href={item.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors"
                      >
                        <div className="w-20 h-20 rounded-full bg-gold text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                          <PlayIcon className="w-8 h-8 ml-1" />
                        </div>
                      </a>
                    </div>
                  )}
                  <CategoryAuthorMeta item={item} />
                  <h2 className="font-display text-2xl text-foreground">{item.title}</h2>
                  {item.rating && (
                    <div className="flex gap-0.5">
                      {[...Array(item.rating)].map((_, i) => <StarIcon key={i} filled />)}
                    </div>
                  )}
                  {item.fullStory && <StoryDetails story={item.fullStory} />}
                  <p className="text-sm italic text-foreground/70 border-l-2 border-gold/30 pl-4 leading-relaxed">&ldquo;{item.excerpt}&rdquo;</p>
                </div>
              )}

              {/* STORY */}
              {item.type === "story" && (
                <div className="space-y-5">
                  {item.coverImage && (
                    <div className="aspect-video rounded-xl overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/story${item.id}/640/360`; }} />
                    </div>
                  )}
                  <CategoryAuthorMeta item={item} />
                  <h2 className="font-display text-2xl text-foreground">{item.title}</h2>
                  {item.fullContent && (
                    <div
                      className="prose prose-sm dark:prose-invert max-w-none text-foreground/80 prose-headings:text-foreground prose-headings:font-display prose-h3:text-xl prose-h4:text-base prose-p:leading-relaxed prose-p:text-foreground/75"
                      dangerouslySetInnerHTML={{ __html: item.fullContent }}
                    />
                  )}
                </div>
              )}

              {/* FEEDBACK */}
              {item.type === "feedback" && (
                <div className="space-y-5 py-4">
                  <QuoteIcon className="w-12 h-12 text-gold/20" />
                  <CategoryAuthorMeta item={item} />
                  <p className="text-xl italic text-foreground leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                  {item.tags && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-sm bg-secondary px-3 py-1 rounded-full text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* CTA */}
              <div className="mt-8 p-5 rounded-xl bg-secondary/50 border border-border">
                <p className="text-sm text-foreground/70 mb-4">Bạn cũng có câu chuyện cảm ngộ muốn chia sẻ?</p>
                <a
                  href="mailto:oriental2or@hotmail.com?subject=Chia sẻ câu chuyện cảm ngộ"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  <SendIcon className="w-4 h-4" /> Gửi Câu Chuyện Của Bạn
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ── Shared detail sub-components ───────────────────────────────────── */
const CategoryAuthorMeta = ({ item }: { item: Contribution }) => (
  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
    <span className="px-2 py-1 bg-primary/10 text-gold rounded-full font-medium">{item.category}</span>
    <span className="font-medium text-foreground/80">{item.author}</span>
    <span className="flex items-center gap-1"><GlobeIcon className="w-3 h-3" />{item.country}</span>
    <span className="flex items-center gap-1"><CalendarIcon className="w-3 h-3" />{item.date}</span>
  </div>
);

const StoryDetails = ({ story }: { story: NonNullable<Contribution["fullStory"]> }) => (
  <div className="rounded-xl border border-border overflow-hidden text-sm">
    {story.problem && (
      <div className="p-4 border-b border-border">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Vấn đề</p>
        <p className="text-foreground/80">{story.problem}</p>
      </div>
    )}
    {story.solution && (
      <div className="p-4 border-b border-border">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Pháp Bảo Áp Dụng</p>
        <p className="text-foreground/80">{story.solution}</p>
      </div>
    )}
    {story.result && (
      <div className="p-4 bg-primary/5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-1">Kết Quả</p>
        <p className="text-gold/90 font-medium">{story.result}</p>
        {story.timeframe && <p className="text-xs text-muted-foreground mt-1">Thời gian: {story.timeframe}</p>}
      </div>
    )}
  </div>
);

/* ════════════════════════════════════════════════════════════════════════
   FORUM / COMMUNITY COMMENT SECTION
═════════════════════════════════════════════════════════════════════════ */
interface ForumPost {
  id: number;
  name: string;
  country: string;
  message: string;
  date: string;
  likes: number;
}

const sampleForumPosts: ForumPost[] = [
  { id: 1, name: "Chị Thanh Hương", country: "Pháp", message: "Câu chuyện của chị Mieko khiến tôi rơi nước mắt. Cảm ơn Phật Pháp đã cứu chị ấy!", date: "27/02/2026", likes: 34 },
  { id: 2, name: "Anh Vũ Hải", country: "Đức", message: "Tôi cũng trải qua điều tương tự. Phóng sinh và ăn chay thay đổi sức khoẻ tôi rõ rệt chỉ trong 2 tháng.", date: "26/02/2026", likes: 28 },
  { id: 3, name: "Chị Kim Lan", country: "Mỹ", message: "Đọc các câu chuyện này tôi thêm vững tin vào con đường tu học. Nam Mô A Di Đà Phật!", date: "25/02/2026", likes: 52 },
  { id: 4, name: "Chú Minh Phước", country: "Úc", message: "Câu chuyện kinh doanh thịnh vượng nhờ Phật pháp rất cảm hứng. Chúc mọi người vạn sự như ý.", date: "25/02/2026", likes: 19 },
  { id: 5, name: "Chị Diệu Hương", country: "Canada", message: "Cảm ơn ban quản trị đã tạo không gian để mọi người chia sẻ như này. Rất quý, rất ý nghĩa!", date: "24/02/2026", likes: 41 },
];

const ForumSection = () => {
  const [posts, setPosts] = useState<ForumPost[]>(sampleForumPosts);
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleLike = (id: number) => {
    if (likedIds.has(id)) return;
    setLikedIds((prev) => { const next = new Set(prev); next.add(id); return next; });
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const newPost: ForumPost = {
      id: Date.now(),
      name: name.trim(),
      country: country.trim() || "—",
      message: message.trim(),
      date: new Date().toLocaleDateString("vi-VN"),
      likes: 0,
    };
    setPosts((prev) => [newPost, ...prev]);
    setName(""); setCountry(""); setMessage("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="mt-24 border-t border-border pt-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Diễn Đàn Cộng Tu</p>
          <h2 className="font-display text-3xl text-foreground mb-4">Chia Sẻ &amp; Góp Ý</h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Đây là không gian để các đồng tu góp ý, trả lời, hoặc chia sẻ thêm về câu chuyện của mình. Mọi bình luận đều được bảo vệ và tôn trọng.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl bg-card border border-border mb-10 space-y-4"
        >
          <h3 className="text-sm font-semibold text-foreground">Để Lại Lời Nhắn</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tên của bạn *"
              required
              className="px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors"
            />
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Quốc gia"
              className="px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Chia sẻ cảm nghĩ hoặc câu chuyện của bạn... *"
            required
            rows={4}
            className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors resize-none"
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Bình luận được kiểm duyệt trong 24h</p>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <SendIcon className="w-4 h-4" /> Gửi Ngay
            </button>
          </div>
          <AnimatePresence>
            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-emerald-400 text-center"
              >
                Cảm ơn bạn đã chia sẻ! Bình luận đang chờ kiểm duyệt.
              </motion.p>
            )}
          </AnimatePresence>
        </form>

        <div className="space-y-4">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="p-5 rounded-xl bg-card border border-border hover:border-border/80 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold/30 to-amber-600/20 flex items-center justify-center text-gold font-bold text-sm shrink-0">
                  {post.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-sm font-semibold text-foreground/90">{post.name}</span>
                    {post.country !== "—" && (
                      <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                        <GlobeIcon className="w-3 h-3" />{post.country}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground/50 ml-auto">{post.date}</span>
                  </div>
                  <p className="text-sm text-foreground/75 leading-relaxed">{post.message}</p>
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`mt-2 flex items-center gap-1.5 text-xs transition-colors ${likedIds.has(post.id) ? "text-rose-400" : "text-muted-foreground hover:text-rose-400"}`}
                  >
                    <HeartIcon className="w-3.5 h-3.5" filled={likedIds.has(post.id)} />
                    {post.likes}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════════════════════
   STATS BAR
═════════════════════════════════════════════════════════════════════════ */
const StatsBar = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
    className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden mb-16"
  >
    {[
      { value: "2,000+", label: "Câu Chuyện" },
      { value: "50+", label: "Quốc Gia" },
      { value: "10M+", label: "Lượt Đọc" },
      { value: "4.9★", label: "Đánh Giá TB" },
    ].map((s) => (
      <div key={s.label} className="bg-card py-6 text-center">
        <p className="font-display text-2xl text-gold">{s.value}</p>
        <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
      </div>
    ))}
  </motion.div>
);

/* ════════════════════════════════════════════════════════════════════════
   MAIN PAGE
═════════════════════════════════════════════════════════════════════════ */
export default function SharesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [sort, setSort] = useState<"newest" | "popular" | "highest_rated">("newest");
  const [selectedItem, setSelectedItem] = useState<Contribution | null>(null);

  const filtered = useMemo(() => {
    const lq = search.toLowerCase();
    return mockContributions
      .filter((item) => {
        const matchSearch =
          (item.title ?? "").toLowerCase().includes(lq) ||
          item.author.toLowerCase().includes(lq) ||
          item.excerpt.toLowerCase().includes(lq) ||
          (item.quote ?? "").toLowerCase().includes(lq) ||
          item.category.toLowerCase().includes(lq);
        const matchCat = activeCategory === "Tất cả" || item.category === activeCategory;
        return matchSearch && matchCat;
      })
      .sort((a, b) => {
        if (sort === "popular") return (b.viewCount ?? 0) - (a.viewCount ?? 0);
        if (sort === "highest_rated") return (b.rating ?? 0) - (a.rating ?? 0);
        const parseDate = (d: string) => {
          const [dd, mm, yyyy] = d.split("/");
          return new Date(`${yyyy}-${mm}-${dd}`).getTime();
        };
        return parseDate(b.date) - parseDate(a.date);
      });
  }, [search, activeCategory, sort]);

  const arranged = useMemo(() => arrangeCards(filtered), [filtered]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-6">

          {/* ── HERO ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-10 bg-gold/40" />
              <p className="text-gold text-xs font-medium tracking-[0.2em] uppercase">Cộng Đồng Tu Học Toàn Cầu</p>
              <div className="h-px w-10 bg-gold/40" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-6 leading-tight">
              NGƯỜI THẬT<br />
              <span className="text-gold">VIỆC THẬT</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Dưới đây là những câu chuyện người thật việc thật được gửi về từ các đồng tu trên khắp thế giới.
              Có những giọt nước mắt sám hối, có niềm vỡ òa khi bệnh tật tiêu tan, và có cả những hạnh phúc
              giản đơn khi gia đình hòa hợp. Hãy cứ lướt xem, biết đâu bạn sẽ tìm thấy chính mình
              trong câu chuyện của họ.
            </p>
          </motion.div>

          {/* ── STATS ── */}
          <StatsBar />

          {/* ── SEARCH + FILTER CONTROLS ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 space-y-4"
          >
            <div className="relative max-w-xl mx-auto">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tìm theo tên, nội dung, danh mục..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div className="flex gap-2 overflow-x-auto pb-1 flex-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-gold text-black shadow-sm"
                        : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-gold/30"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="shrink-0 px-4 py-2 rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:border-gold/50 transition-colors cursor-pointer"
              >
                <option value="newest">Mới Nhất</option>
                <option value="popular">Phổ Biến</option>
                <option value="highest_rated">Đánh Giá Cao</option>
              </select>
            </div>

            <p className="text-xs text-muted-foreground/60 text-center">
              Hiển thị <span className="text-gold font-medium">{arranged.length}</span> câu chuyện
            </p>
          </motion.div>

          {/* ── MASONRY GRID ── */}
          {arranged.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-0">
              {arranged.map((item, i) => (
                <div key={item.id} className="break-inside-avoid mb-5">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                  >
                    {item.type === "video" && (
                      <VideoCard item={item} onClick={() => setSelectedItem(item)} />
                    )}
                    {item.type === "story" && (
                      <StoryCard item={item} onClick={() => setSelectedItem(item)} />
                    )}
                    {item.type === "feedback" && (
                      <FeedbackCard item={item} onClick={() => setSelectedItem(item)} />
                    )}
                  </motion.div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <QuoteIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground/20" />
              <h3 className="font-display text-xl text-foreground mb-2">Không tìm thấy câu chuyện</h3>
              <p className="text-muted-foreground text-sm">Hãy thử từ khóa khác hoặc chọn danh mục khác.</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("Tất cả"); }}
                className="mt-4 px-5 py-2.5 rounded-xl bg-secondary text-sm text-foreground hover:bg-border transition-colors"
              >
                Xem tất cả
              </button>
            </motion.div>
          )}

          {/* ── BOTTOM CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-10 rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/5 text-center"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mb-6" />
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4">
              Bạn Cũng Có Câu Chuyện?
            </h3>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto mb-7">
              Nếu bạn đã trải nghiệm sự thay đổi kỳ diệu nhờ tu học Pháp Môn Tâm Linh, hãy chia sẻ để
              truyền cảm hứng cho hàng nghìn đồng tu khác trên thế giới.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:oriental2or@hotmail.com?subject=Chia sẻ câu chuyện cảm ngộ"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm"
              >
                <SendIcon className="w-4 h-4" /> Gửi Câu Chuyện Qua Email
              </a>
              <a
                href="https://zalo.me/g/sjajsj328"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-border bg-card hover:border-gold/40 transition-colors text-sm text-muted-foreground hover:text-foreground"
              >
                Chia Sẻ Qua Zalo
              </a>
            </div>
          </motion.div>

          {/* ── FORUM ── */}
          <ForumSection />

        </div>
      </main>
      <Footer />
      <StickyBanner />

      {/* ── MODAL ── */}
      <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
