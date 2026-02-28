'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import StickyBanner from "@/components/StickyBanner";

const CalendarIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
    <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const MoonIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface Festival {
  name: string;
  lunarDate: string;
  solarDate: string;
  description: string;
  type: "major" | "recitation" | "fast" | "commemoration";
  practices: string[];
}

const months2025 = [
  "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
  "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
];

const festivals: Festival[] = [
  { name: "Tết Nguyên Đán Ất Tỵ", lunarDate: "Mùng 1 tháng Giêng", solarDate: "29/01/2025", description: "Năm mới Âm lịch — niệm kinh cầu an, đốt Ngôi Nhà Nhỏ đầu năm.", type: "major", practices: ["Niệm Chú Đại Bi 108 biến", "Tâm Kinh 21 biến", "Thắp hương khấn nguyện cả năm"] },
  { name: "Rằm Tháng Giêng (Thượng Nguyên)", lunarDate: "15 tháng Giêng", solarDate: "12/02/2025", description: "Ngày vía Phật rất lớn, cầu nguyện linh ứng nhất trong năm.", type: "major", practices: ["Ăn chay", "Niệm kinh nhiều gấp đôi", "Phóng sinh", "Đốt Ngôi Nhà Nhỏ"] },
  { name: "Vía Quán Thế Âm Đản Sinh", lunarDate: "19 tháng 2 Âm lịch", solarDate: "17/03/2025", description: "Ngày đản sinh của Bồ Tát Quán Thế Âm — niệm nhiều Chú Đại Bi.", type: "major", practices: ["Chú Đại Bi 49+ biến", "Ăn chay", "Phóng sinh", "Lễ Phật Đại Sám Hối 7 biến"] },
  { name: "Vía Phật Thích Ca Đản Sinh", lunarDate: "15 tháng 4 Âm lịch", solarDate: "12/05/2025", description: "Phật đản — kỷ niệm ngày Đức Phật Thích Ca ra đời.", type: "major", practices: ["Niệm Tâm Kinh 49 biến", "Lễ Phật Đại Sám Hối 7 biến", "Ăn chay", "Phóng sinh"] },
  { name: "Rằm Tháng 7 (Vu Lan)", lunarDate: "15 tháng 7 Âm lịch", solarDate: "08/08/2025", description: "Tháng báo hiếu — siêu độ vong linh, đốt Ngôi Nhà Nhỏ cho cha mẹ.", type: "major", practices: ["Đốt 21 Ngôi Nhà Nhỏ", "Phóng sinh", "Ăn chay nguyên tháng 7"] },
  { name: "Vía Quán Thế Âm Thành Đạo", lunarDate: "19 tháng 6 Âm lịch", solarDate: "14/07/2025", description: "Ngày Bồ Tát Quán Thế Âm thành đạo — cầu nguyện rất linh ứng.", type: "major", practices: ["Chú Đại Bi 49+ biến", "Ăn chay", "Lễ Phật Đại Sám Hối 7 biến"] },
  { name: "Vía Quán Thế Âm Xuất Gia", lunarDate: "19 tháng 9 Âm lịch", solarDate: "20/10/2025", description: "Kỷ niệm ngày Bồ Tát Quán Thế Âm xuất gia tu hành.", type: "major", practices: ["Chú Đại Bi 49+ biến", "Ăn chay", "Phóng sinh"] },
  { name: "Mùng 1 & 15 Hàng Tháng", lunarDate: "Mỗi tháng", solarDate: "Xem lịch âm", description: "Ngày trai — ăn chay nguyên ngày, tụng kinh nhiều hơn.", type: "fast", practices: ["Ăn chay", "Niệm kinh gấp đôi", "Đốt Ngôi Nhà Nhỏ"] },
  { name: "Ngày Vía Phật A Di Đà", lunarDate: "17 tháng 11 Âm lịch", solarDate: "06/12/2025", description: "Ngày vía Phật A Di Đà — niệm hồng danh cầu siêu độ.", type: "commemoration", practices: ["Niệm danh hiệu A Di Đà", "Tâm Kinh 49 biến", "Ăn chay"] },
  { name: "Tháng Siêu Độ (Tháng 7 Âm)", lunarDate: "Cả tháng 7 Âm lịch", solarDate: "26/07 - 23/08/2025", description: "Tháng cửa Quỷ Môn mở — siêu độ vong linh, đốt nhiều Ngôi Nhà Nhỏ.", type: "recitation", practices: ["Đốt 49-108 Ngôi Nhà Nhỏ", "Vãng Sinh Chú 49 biến/ngày", "Ăn chay trường"] },
];

const typeLabels: Record<string, { label: string; color: string }> = {
  major: { label: "Lễ Lớn", color: "bg-red-500/10 text-red-400" },
  recitation: { label: "Niệm Kinh", color: "bg-blue-500/10 text-blue-400" },
  fast: { label: "Ngày Trai", color: "bg-green-500/10 text-green-400" },
  commemoration: { label: "Kỷ Niệm", color: "bg-purple-500/10 text-purple-400" },
};

const auspiciousDays = [
  { date: "Mùng 1", note: "Ngày vía Bồ Tát Di Lặc (tháng Giêng)" },
  { date: "Mùng 8", note: "Ngày vía Phật Dược Sư (tháng 9 Âm)" },
  { date: "Mùng 15", note: "Ngày rằm — ăn chay, tụng kinh" },
  { date: "Mùng 19", note: "Ngày vía Quán Thế Âm (tháng 2, 6, 9 Âm)" },
  { date: "23 tháng Chạp", note: "Tiễn Ông Táo — sám hối, niệm kinh" },
];

export default function LunarCalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [expandedFestival, setExpandedFestival] = useState<string | null>(null);

  const filteredFestivals = festivals.filter((f) => {
    if (selectedType && f.type !== selectedType) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-6">
          <Breadcrumbs
            centered
            items={[
              { label: 'Lịch tu' }
            ]}
          />
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center mb-10">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Năm Ất Tỵ 2025</p>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4 flex items-center justify-center gap-3">
              <MoonIcon className="w-8 h-8 text-gold" />
              Lịch Tu Học
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Các ngày vía Phật, Bồ Tát, ngày trai và các dịp đặc biệt theo Âm lịch.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main */}
            <div className="flex-1">
              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setSelectedType(null)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${!selectedType ? "bg-gold/20 text-gold" : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                >
                  Tất Cả
                </button>
                {Object.entries(typeLabels).map(([key, { label, color }]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedType(selectedType === key ? null : key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedType === key ? color : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Month selector */}
              <div className="mb-6 overflow-x-auto scrollbar-hide">
                <div className="flex gap-1.5 min-w-max">
                  {months2025.map((m, i) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMonth(i)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${selectedMonth === i ? "bg-gold/20 text-gold" : "bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Festival List */}
              <div className="space-y-3">
                {filteredFestivals.map((festival) => {
                  const isExpanded = expandedFestival === festival.name;
                  return (
                    <motion.div
                      key={festival.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl bg-card border border-border overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFestival(isExpanded ? null : festival.name)}
                        className="w-full flex items-center gap-4 p-5 text-left"
                      >
                        <div className="w-12 h-12 rounded-xl bg-secondary flex flex-col items-center justify-center shrink-0">
                          <CalendarIcon className="w-4 h-4 text-gold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="text-sm font-medium text-foreground">{festival.name}</h3>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${typeLabels[festival.type].color}`}>
                              {typeLabels[festival.type].label}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{festival.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs text-gold font-medium">{festival.lunarDate}</p>
                          <p className="text-xs text-muted-foreground/60">{festival.solarDate}</p>
                        </div>
                      </button>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="px-5 pb-5 border-t border-border/50 pt-4"
                        >
                          <p className="text-xs font-medium text-foreground mb-2">Khóa Tu Đề Xuất:</p>
                          <div className="space-y-1.5">
                            {festival.practices.map((p, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold/40 mt-1.5 shrink-0" />
                                <p className="text-xs text-muted-foreground">{p}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-72 space-y-6">
              {/* Key Dates */}
              <div className="p-5 rounded-xl bg-card border border-border">
                <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <MoonIcon className="w-4 h-4 text-gold" />
                  Ngày Quan Trọng Hàng Tháng
                </h3>
                <div className="space-y-3">
                  {auspiciousDays.map((d) => (
                    <div key={d.date} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                      <div>
                        <p className="text-xs text-gold font-medium">{d.date}</p>
                        <p className="text-xs text-muted-foreground">{d.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fasting Guide */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-gold/5 to-amber-500/5 border border-gold/10">
                <h3 className="text-sm font-medium text-foreground mb-3">Ngày Ăn Chay (Trai NH)</h3>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <p>• Tối thiểu: Mùng 1, 15 hàng tháng (2 ngày)</p>
                  <p>• Tốt hơn: Thêm mùng 8, 14, 23, 29 (6 ngày)</p>
                  <p>• Lý tưởng: 10 ngày trai hoặc trường chay</p>
                  <p>• Ngày trai: không ăn thịt, hải sản, trứng</p>
                  <p>• Tâm thanh tịnh, niệm kinh linh ứng hơn</p>
                </div>
              </div>

              {/* External Links */}
              <div className="p-5 rounded-xl bg-card border border-border">
                <h3 className="text-sm font-medium text-foreground mb-3">Tham Khảo Thêm</h3>
                <div className="space-y-2">
                  {[
                    { label: "Lịch Vạn Niên", href: "https://lichvannien.net" },
                    { label: "Kinh Niệm Hàng Ngày", href: "https://www.guanyincitta.info" },
                    { label: "Hướng Dẫn Sơ Học", href: "/beginner-guide" },
                  ].map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="block px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-gold hover:bg-secondary transition-colors"
                    >
                      {l.label} →
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <StickyBanner />
    </div>
  );
}
