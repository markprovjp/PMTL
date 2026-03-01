'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";

import Footer from "@/components/Footer";
import StickyBanner from "@/components/StickyBanner";
import {
  Sparkles,
  Globe,
  Heart,
  Star,
  Megaphone,
  Languages,
  Flower2,
  Clock,
  MapPin,
  Video,
  ChevronRight,
  type LucideIcon
} from "lucide-react";

interface Event { id: number; title: string; description: string; date: string; time: string; location: string; type: "dharma-talk" | "webinar" | "retreat" | "liberation" | "festival"; status: "upcoming" | "live" | "past"; link?: string; youtubeId?: string; speaker: string; language: string; }

const events: Event[] = [
  { id: 1, title: "Pháp Hội Malaysia 2025", description: "Pháp hội lớn thường niên tại Malaysia.", date: "15/03/2025", time: "09:00 - 17:00", location: "Kuala Lumpur Convention Centre, Malaysia", type: "dharma-talk", status: "upcoming", link: "https://www.guanyincitta.info", speaker: "Pháp Sư Lư Quân Hoành", language: "Tiếng Hoa (có phiên dịch)" },
  { id: 2, title: "Online Dharma Talk — Q&A Trực Tuyến Hàng Tuần", description: "Buổi giảng giải Phật Pháp trực tuyến hàng tuần.", date: "Mỗi Thứ 7", time: "19:00 - 21:00 (GMT+8)", location: "Online — YouTube & Zoom", type: "webinar", status: "upcoming", link: "https://www.youtube.com/@xinlingfamen", speaker: "Đội ngũ giảng sư", language: "Song ngữ Hoa-Việt" },
  { id: 3, title: "Khóa Tu Vu Lan Tháng 7 Âm Lịch", description: "Chương trình tu học tập trung tháng Vu Lan — siêu độ vong linh, báo hiếu.", date: "26/07 - 23/08/2025", time: "Suốt tháng 7 Âm lịch", location: "Tất cả Quán Âm Đường trên toàn thế giới", type: "retreat", status: "upcoming", speaker: "Các Quán Âm Đường địa phương", language: "Đa ngôn ngữ" },
  { id: 4, title: "Chương Trình Phóng Sinh Tập Thể — Sydney", description: "Phóng sinh cá tại Brighton-Le-Sands Beach, Sydney.", date: "02/02/2025", time: "07:00 - 10:00", location: "Brighton-Le-Sands Beach, NSW, Australia", type: "liberation", status: "upcoming", speaker: "Quán Âm Đường Sydney", language: "Tiếng Hoa & Tiếng Anh" },
  { id: 5, title: "Phật Đản 2025 — Lễ Hội Trực Tuyến", description: "Kỷ niệm ngày Đức Phật đản sinh với niệm kinh tập thể.", date: "12/05/2025", time: "08:00 - 12:00 (GMT+8)", location: "Online — Livestream toàn cầu", type: "festival", status: "upcoming", link: "https://www.guanyincitta.info", speaker: "Cộng đồng toàn cầu", language: "Đa ngôn ngữ" },
  { id: 6, title: "Pháp Hội Hồng Kông 2024", description: "Pháp hội lớn tổ chức tại Hong Kong với hơn 5,000 đồng tu.", date: "10/11/2024", time: "09:00 - 17:00", location: "Hong Kong Convention Centre", type: "dharma-talk", status: "past", youtubeId: "f-UKk3THR3Y", speaker: "Pháp Sư Lư Quân Hoành", language: "Tiếng Hoa" },
  { id: 7, title: "Online Retreat — 7 Ngày Niệm Chú Đại Bi", description: "Khóa tu trực tuyến 7 ngày tập trung niệm Chú Đại Bi 108 biến/ngày.", date: "01/09 - 07/09/2024", time: "05:00 - 06:30 hàng ngày", location: "Online — Zoom", type: "retreat", status: "past", speaker: "Đội ngũ giảng sư", language: "Tiếng Hoa" },
  { id: 8, title: "Phóng Sinh Tập Thể — Đài Bắc", description: "Phóng sinh lớn tại Taipei với hơn 1,000 thành viên.", date: "15/08/2024", time: "06:00 - 09:00", location: "Tamsui River, Taipei, Taiwan", type: "liberation", status: "past", speaker: "Quán Âm Đường Đài Bắc", language: "Tiếng Hoa" },
];

const typeLabels: Record<string, { label: string; color: string; icon: LucideIcon }> = {
  "dharma-talk": { label: "Pháp Hội", color: "bg-red-500/10 text-red-400", icon: Sparkles },
  "webinar": { label: "Trực Tuyến", color: "bg-blue-500/10 text-blue-400", icon: Globe },
  "retreat": { label: "Khóa Tu", color: "bg-purple-500/10 text-purple-400", icon: Flower2 },
  "liberation": { label: "Phóng Sinh", color: "bg-green-500/10 text-green-400", icon: Heart },
  "festival": { label: "Lễ Hội", color: "bg-amber-500/10 text-amber-400", icon: Star },
};

const statusLabels: Record<string, { label: string; color: string }> = {
  upcoming: { label: "Sắp Diễn Ra", color: "bg-emerald-500/10 text-emerald-400" },
  live: { label: "ĐANG PHÁT", color: "bg-red-500/10 text-red-300 animate-pulse" },
  past: { label: "Đã Kết Thúc", color: "bg-secondary text-muted-foreground" },
};

export default function EventsPage() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const filtered = events.filter((e) => {
    if (filter === "upcoming" && e.status !== "upcoming" && e.status !== "live") return false;
    if (filter === "past" && e.status !== "past") return false;
    if (typeFilter && e.type !== typeFilter) return false;
    return true;
  });

  const upcoming = events.filter((e) => e.status === "upcoming" || e.status === "live");
  const past = events.filter((e) => e.status === "past");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-6">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center mb-10">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Lịch Sự Kiện</p>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">Pháp Hội & Sự Kiện</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Tham gia các pháp hội, khóa tu, phóng sinh và bài giảng trực tuyến cùng cộng đồng toàn cầu.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[{ label: "Pháp Hội/Năm", value: "12+" }, { label: "Quốc Gia", value: "30+" }, { label: "Tham Dự", value: "100K+" }, { label: "Phóng Sinh/Năm", value: "50+" }].map((s) => (
              <div key={s.label} className="p-4 rounded-xl bg-card border border-border text-center"><p className="text-xl font-display text-gold">{s.value}</p><p className="text-xs text-muted-foreground">{s.label}</p></div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="flex gap-2">
              {(["all", "upcoming", "past"] as const).map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${filter === f ? "bg-gold/20 text-gold" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                  {f === "all" ? `Tất Cả (${events.length})` : f === "upcoming" ? `Sắp Tới (${upcoming.length})` : `Đã Qua (${past.length})`}
                </button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(typeLabels).map(([key, { label, icon: Icon }]) => (
                <button
                  key={key}
                  onClick={() => setTypeFilter(typeFilter === key ? null : key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${typeFilter === key ? "bg-gold/20 text-gold" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filtered.map((event) => (
              <motion.div key={event.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: event.id * 0.03 }} className={`rounded-xl border p-5 transition-all ${event.status === "past" ? "bg-card/50 border-border/50" : "bg-card border-border hover:border-gold/20"}`}>
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center shrink-0 text-gold">
                    {(() => {
                      const Icon = typeLabels[event.type].icon;
                      return <Icon className="w-6 h-6" />;
                    })()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <h3 className={`text-sm font-medium ${event.status === "past" ? "text-muted-foreground" : "text-foreground"}`}>{event.title}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${typeLabels[event.type].color}`}>{typeLabels[event.type].label}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusLabels[event.status].color}`}>{statusLabels[event.status].label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{event.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground/80">
                      <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /><span>{event.date} • {event.time}</span></div>
                      <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /><span className="truncate">{event.location}</span></div>
                      <div className="flex items-center gap-1.5"><Megaphone className="w-3.5 h-3.5" /><span>{event.speaker}</span></div>
                      <div className="flex items-center gap-1.5"><Languages className="w-3.5 h-3.5" /><span>{event.language}</span></div>
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col gap-2">
                    {event.status === "upcoming" && event.link && (
                      <a href={event.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 bg-gold/10 text-gold rounded-lg text-xs font-medium hover:bg-gold/20 transition-colors">Tham Gia <ChevronRight className="w-3 h-3" /></a>
                    )}
                    {event.status === "past" && event.youtubeId && (
                      <a href={`https://www.youtube.com/watch?v=${event.youtubeId}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg text-xs font-medium hover:bg-red-500/20 transition-colors"><Video className="w-3.5 h-3.5" /> Xem Lại</a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && <div className="text-center py-16"><p className="text-muted-foreground">Không có sự kiện nào phù hợp.</p></div>}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-gold/5 to-amber-500/5 border border-gold/10 text-center">
            <h2 className="font-display text-2xl text-foreground mb-3">Muốn Tổ Chức Sự Kiện?</h2>
            <p className="text-sm text-muted-foreground mb-5 max-w-lg mx-auto">Nếu bạn muốn tổ chức pháp hội, phóng sinh hoặc khóa tu tại địa phương, liên hệ Quán Âm Đường gần nhất.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/directory" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold/10 text-gold rounded-xl text-sm font-medium hover:bg-gold/20 transition-colors">
                <MapPin className="w-4 h-4" /> Tìm Quán Âm Đường
              </Link>
              <a href="mailto:oriental2or@hotmail.com" className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-foreground rounded-xl text-sm font-medium hover:bg-secondary/80 transition-colors">Liên Hệ Ban Tổ Chức</a>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <StickyBanner />
    </div>
  );
}
