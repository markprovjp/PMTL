'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyBanner from "@/components/StickyBanner";
import { SearchIcon } from "@/components/icons/ZenIcons";

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 20 20" className={`w-3.5 h-3.5 ${filled ? "fill-amber-400 text-amber-400" : "fill-none text-muted-foreground/30"}`} stroke="currentColor" strokeWidth="1.5">
    <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.26l-4.94 2.44.94-5.49-4-3.9 5.53-.8L10 1.5z" />
  </svg>
);

const QuoteIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179z" />
  </svg>
);

const categories = ["Tất cả","Sức Khỏe","Sự Nghiệp","Gia Đình","Hôn Nhân","Tâm Linh","Thi Cử"];

interface Testimonial { id: number; name: string; country: string; category: string; problem: string; solution: string; result: string; timeframe: string; quote: string; rating: number; hasVideo?: boolean; videoUrl?: string; }

const testimonials: Testimonial[] = [
  { id: 1, name: "Chị Crystal Huang", country: "Hoa Kỳ", category: "Sự Nghiệp", problem: "Muốn chuyển nghề từ tài chính sang giáo dục nhưng thị trường rất khó.", solution: "Niệm Lễ Phật Đại Sám Hối Văn, phóng sinh, sám hối nghiệp chướng.", result: "Ngay hôm sau nhận lời mời phỏng vấn và tìm được công việc mơ ước.", timeframe: "48 giờ", quote: "Bồ Tát đã ứng nguyện chỉ trong 48 giờ!", rating: 5, hasVideo: true, videoUrl: "https://youtube.com" },
  { id: 2, name: "Chị Mieko Kawamata", country: "Nhật Bản", category: "Sức Khỏe", problem: "Chẩn đoán ung thư vú ở tuổi 39. Hoàn toàn tuyệt vọng.", solution: "Phóng sinh 2000 con cá, niệm kinh chuyên cần, phát nguyện ăn chay.", result: "Sau 1 tháng xét nghiệm lại, kết quả bình thường.", timeframe: "1 tháng", quote: "Kết quả xét nghiệm bình thường! Thật là phép mầu!", rating: 5, hasVideo: true, videoUrl: "https://youtube.com" },
  { id: 3, name: "Chị Thị", country: "Úc", category: "Sự Nghiệp", problem: "Tìm việc từ đầu năm nhưng không có kết quả.", solution: "Phóng sinh 600 con cá, niệm Chuẩn Đề Thần Chú 108 biến/ngày.", result: "Tháng 3 nhận cuộc gọi từ công ty lớn và nhận được offer!", timeframe: "2 tháng", quote: "Sư Phụ nói tháng 4 muộn nhất sẽ có việc. Tháng 3 đã có offer!", rating: 5 },
  { id: 4, name: "Chị Jenny Hsu", country: "Đài Loan", category: "Sức Khỏe", problem: "Viêm khớp dạng thấp nhiều năm, thuốc hết hiệu quả.", solution: "Bắt đầu niệm kinh chuyên cần hàng ngày.", result: "Sau 3 tháng, bác sĩ ngạc nhiên kết quả xét nghiệm bình thường.", timeframe: "3 tháng", quote: "Pháp Môn Tâm Linh đã cứu tôi!", rating: 5 },
  { id: 5, name: "Anh Minh Tuấn", country: "Việt Nam", category: "Gia Đình", problem: "Mẹ bệnh nặng nằm viện, bác sĩ nói khó qua khỏi.", solution: "Niệm 87 biến Ngôi Nhà Nhỏ, phóng sinh, phát nguyện ăn chay trường.", result: "Mẹ hồi phục kỳ diệu sau 6 tuần, xuất viện.", timeframe: "6 tuần", quote: "Mẹ tôi đã xuất viện! Bác sĩ nói đây là phép mầu.", rating: 5, hasVideo: true, videoUrl: "https://youtube.com" },
  { id: 6, name: "Chị Ngọc Hà", country: "Việt Nam", category: "Hôn Nhân", problem: "Vợ chồng mâu thuẫn liên tục, suýt ly hôn.", solution: "Niệm 108 biến Giải Kết Chú/ngày, phóng sinh, ăn chay.", result: "Sau 2 tháng chồng tự bỏ rượu, gia đình hòa thuận.", timeframe: "2 tháng", quote: "Chồng tôi tự bỏ rượu! Pháp Môn đã cứu gia đình tôi.", rating: 5 },
  { id: 7, name: "Em Thiện Phúc", country: "Việt Nam", category: "Thi Cử", problem: "Học lực trung bình, lo lắng không đỗ đại học.", solution: "Mẹ niệm 49 biến Chuẩn Đề Thần Chú/ngày, phóng sinh 200 cá.", result: "Đỗ đại học TOP với điểm cao bất ngờ.", timeframe: "3 tháng", quote: "Con không nghĩ mình đỗ được! Bồ Tát linh ứng lắm!", rating: 5 },
  { id: 8, name: "Anh David Chen", country: "Singapore", category: "Sức Khỏe", problem: "Mất ngủ kinh niên 5 năm, mọi cách y khoa không hiệu quả.", solution: "Niệm Chú Đại Bi 21 biến/ngày, Tâm Kinh 7 biến, 21 tờ Ngôi Nhà Nhỏ.", result: "Sau 2 tháng mất ngủ biến mất hoàn toàn.", timeframe: "2 tháng", quote: "5 năm mất ngủ, niệm kinh 3 tuần đã khác. Phật Pháp kỳ diệu!", rating: 5 },
  { id: 9, name: "Chị Lan Anh", country: "Úc", category: "Tâm Linh", problem: "Thường xuyên gặp ác mộng, cảm giác nặng nề, mệt mỏi.", solution: "Niệm 49 tờ Ngôi Nhà Nhỏ, phóng sinh 300 cá, Chú Đại Bi 49 biến/ngày.", result: "Ác mộng biến mất, cảm giác nhẹ nhàng, bắt đầu tu học.", timeframe: "1 tháng", quote: "Cảm giác như cả tấn nặng được nhấc ra.", rating: 5 },
  { id: 10, name: "Anh Văn Hùng", country: "Việt Nam", category: "Sự Nghiệp", problem: "Công ty phá sản, nợ nần, vợ đòi ly hôn. Tuyệt vọng.", solution: "Phát nguyện ăn chay trường, 108 Ngôi Nhà Nhỏ, phóng sinh 1000 cá.", result: "Sau 6 tháng trả hết nợ, vợ quay lại, gia đình hòa thuận.", timeframe: "6 tháng", quote: "Từ vực thẳm tôi đã đứng dậy. Phật Pháp cho tôi sức mạnh.", rating: 5, hasVideo: true, videoUrl: "https://youtube.com" },
];

export default function TestimonialsPage() {
  const [activeCat, setActiveCat] = useState("Tất cả");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = testimonials.filter((t) => {
    const matchCat = activeCat === "Tất cả" || t.category === activeCat;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.problem.toLowerCase().includes(search.toLowerCase()) || t.result.toLowerCase().includes(search.toLowerCase()) || t.quote.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Chứng Nghiệm Thực Tế</p>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">Câu Chuyện Đồng Tu</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Hàng nghìn đồng tu đã thay đổi cuộc đời nhờ tu học Pháp Môn Tâm Linh.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex flex-wrap justify-center gap-6 mb-10">
            {[{ label: "Câu Chuyện", value: "2,000+" },{ label: "Quốc Gia", value: "50+" },{ label: "Đánh Giá TB", value: "4.9" },{ label: "Danh Mục", value: "7" }].map((s) => (
              <div key={s.label} className="text-center"><p className="text-2xl font-display text-gold">{s.value}</p><p className="text-xs text-muted-foreground">{s.label}</p></div>
            ))}
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Tìm câu chuyện..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold/40" />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mb-8">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCat(cat)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeCat === cat ? "bg-gold text-black" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>{cat}</button>
            ))}
            <span className="px-3 py-1.5 text-xs text-muted-foreground">{filtered.length} câu chuyện</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((t) => (
                <motion.div key={t.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="p-6 rounded-xl bg-card border border-border hover:border-gold/20 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-amber-600/30 flex items-center justify-center text-sm font-display text-gold">{t.name.charAt(t.name.lastIndexOf(" ") + 1)}</div>
                      <div><p className="text-sm font-medium text-foreground">{t.name}</p><p className="text-xs text-muted-foreground">{t.country}</p></div>
                    </div>
                    <div className="flex items-center gap-0.5">{Array.from({ length: 5 }).map((_, i) => (<StarIcon key={i} filled={i < t.rating} />))}</div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-gold">{t.category}</span>
                    <span className="text-xs text-muted-foreground">Kết quả sau {t.timeframe}</span>
                    {t.hasVideo && <a href={t.videoUrl} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">Video</a>}
                  </div>
                  <div className="relative pl-4 border-l-2 border-gold/20 mb-4">
                    <QuoteIcon className="absolute -left-2.5 -top-1 w-4 h-4 text-gold/30" />
                    <p className="text-sm text-foreground/80 italic leading-relaxed">&quot;{t.quote}&quot;</p>
                  </div>
                  <button onClick={() => setExpandedId(expandedId === t.id ? null : t.id)} className="text-xs text-gold hover:text-gold/80 transition-colors">{expandedId === t.id ? "Thu gọn ▲" : "Xem chi tiết ▼"}</button>
                  <AnimatePresence>
                    {expandedId === t.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="mt-3 pt-3 border-t border-border space-y-2">
                          <div><p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Vấn Đề</p><p className="text-sm text-foreground/70 mt-0.5">{t.problem}</p></div>
                          <div><p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Pháp Bảo Áp Dụng</p><p className="text-sm text-foreground/70 mt-0.5">{t.solution}</p></div>
                          <div><p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Kết Quả</p><p className="text-sm text-gold/80 mt-0.5 font-medium">{t.result}</p></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground"><QuoteIcon className="w-10 h-10 mx-auto mb-3 opacity-20" /><p>Không tìm thấy câu chuyện phù hợp.</p></div>
          )}

          <div className="mt-16 p-8 rounded-2xl bg-card border border-border text-center">
            <h3 className="font-display text-2xl text-foreground mb-3">Bạn Cũng Có Câu Chuyện?</h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm">Nếu bạn đã trải nghiệm sự thay đổi nhờ tu học, hãy chia sẻ để truyền cảm hứng cho người khác.</p>
            <a href="mailto:oriental2or@hotmail.com?subject=Chia sẻ câu chuyện đồng tu" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">Gửi Câu Chuyện Của Bạn</a>
          </div>
        </div>
      </main>
      <Footer />
      <StickyBanner />
    </div>
  );
}
