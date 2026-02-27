'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyBanner from "@/components/StickyBanner";
import { SearchIcon } from "@/components/icons/ZenIcons";

const categoryChips = ["Phật Học Vấn Đáp","Huyền Nghệ","Bàn Thờ Phật","Sảy Thai & Phá Thai","Tình Cảm","Giới Luật","Học Tập","Phản Hồi Thính Giả","Phong Thủy","Niệm Kinh","Siêu Độ","Sự Nghiệp","Ăn Chay","Bệnh Tật","Tu Tâm","Ngôi Nhà Nhỏ","Độ Người","Giải Mộng","Phóng Sinh","Bàn Thờ Phật Nhỏ","Phát Nguyện","Bạch Thoại","Cảm Ngộ"];
const timeFilters = ["Trong tuần", "Trong tháng", "Tất cả"];
const sampleResults = [
  { title: "Cách niệm Chú Đại Bi cho người mới bắt đầu", source: "Bạch Thoại Phật Pháp Tập 3", date: "15/01/2026", snippet: "Người mới bắt đầu nên niệm 3-7 biến Chú Đại Bi mỗi ngày, tập trung tâm trí..." },
  { title: "Phóng sinh đúng cách để tích đức", source: "Phật Học Vấn Đáp Kỳ 245", date: "10/01/2026", snippet: "Phóng sinh cá tại sông hoặc biển, niệm Quán Thế Âm Bồ Tát trước khi thả..." },
  { title: "Giải mộng: Mơ thấy người đã mất", source: "Huyền Nghệ Tổng Thuật", date: "08/01/2026", snippet: "Khi mơ thấy người đã qua đời, thường là họ cần siêu độ bằng Ngôi Nhà Nhỏ..." },
  { title: "Cách hóa giải oán kết vợ chồng", source: "Phật Học Vấn Đáp Kỳ 189", date: "05/01/2026", snippet: "Niệm Giải Kết Chú 49 biến/ngày, phóng sinh và phát nguyện ăn chay để hóa giải..." },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTime, setActiveTime] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Tìm Kiếm Khai Thị</p>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">Kho Tàng Khai Thị</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Tra cứu hàng ngàn bài giảng, khai thị và câu trả lời từ Sư Phụ.</p>
          </motion.div>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Nhập từ khóa..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold/30" />
              </div>
              <button onClick={() => setShowFilters(!showFilters)} className="px-4 py-3 rounded-xl bg-card border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">Bộ lọc</button>
            </div>
          </div>

          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="max-w-2xl mx-auto mb-8 space-y-4 overflow-hidden">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Danh mục:</p>
                <div className="flex flex-wrap gap-2">
                  {categoryChips.map((cat) => (
                    <button key={cat} onClick={() => setActiveCategory(activeCategory === cat ? null : cat)} className={`px-3 py-1 rounded-full text-xs transition-colors ${activeCategory === cat ? "bg-gold text-black" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>{cat}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Thời gian:</p>
                <div className="flex gap-2">
                  {timeFilters.map((t) => (
                    <button key={t} onClick={() => setActiveTime(activeTime === t ? null : t)} className={`px-3 py-1 rounded-full text-xs transition-colors ${activeTime === t ? "bg-gold text-black" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>{t}</button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div className="max-w-2xl mx-auto space-y-4">
            {sampleResults.map((r, i) => (
              <motion.div key={r.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-5 rounded-xl bg-card border border-border hover:border-gold/30 transition-all cursor-pointer">
                <p className="text-xs text-muted-foreground mb-1">{r.source} • {r.date}</p>
                <h3 className="text-sm font-medium text-foreground mb-2 hover:text-gold transition-colors">{r.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{r.snippet}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <StickyBanner />
    </div>
  );
}
