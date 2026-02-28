'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import StickyBanner from "@/components/StickyBanner";
import { PlayIcon, CloseIcon, BookIcon } from "@/components/icons/ZenIcons";

const DownloadIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" />
  </svg>
);

const ExternalLinkIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="15 3 21 3 21 9" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round" />
  </svg>
);

const volumes = [
  { id: 1, title: "Bạch Thoại Phật Pháp - Tập 1", chinese: "白话佛法（第一册）", description: "Tập đầu tiên giới thiệu nền tảng của Pháp Môn Tâm Linh: Nhân quả, nghiệp lực và con đường tu học cơ bản.", chapters: ["Tâm là gì?", "Nhân quả là gì?", "Tại sao phải niệm Kinh?", "Phật Bồ Tát và chúng sinh", "Sám hối và nghiệp chướng", "Từ bi tâm trong đời thường", "Buông xả và vô thường", "Thiện nghiệp và ác nghiệp", "Cầu nguyện đúng pháp", "Trí tuệ Bát Nhã", "Tâm bình thế giới bình", "Thực hành hàng ngày", "Phúc đức và công đức", "Kết duyên lành với Phật Bồ Tát", "Nguyện lực và phát nguyện", "Lời kết và hướng dẫn tu tiếp"], pdfUrl: "https://xlch.org/download/bach-thoai-1", audioUrl: "https://xlch.org/audio/bach-thoai-1", color: "from-amber-900/60 to-amber-800/40" },
  { id: 2, title: "Bạch Thoại Phật Pháp - Tập 2", chinese: "白话佛法（第二册）", description: "Tập 2 đi sâu vào phương pháp niệm Kinh và ý nghĩa của từng bộ kinh chú.", chapters: ["Ý nghĩa của Chú Đại Bi", "Cách niệm đúng pháp", "Tâm Kinh và Bát Nhã", "Lễ Phật Đại Sám Hối Văn", "Mười chú nhỏ và công dụng", "Giải Kết Chú và tình cảm", "Chuẩn Đề Thần Chú học nghiệp", "Kiên trì và nghị lực tu học", "Cảm ứng đạo giao", "Năng lượng niệm Kinh", "Thời gian và số lượng niệm", "Tâm thành kính khi niệm", "Hồi hướng công đức", "Kết quả sau khi tu học", "Những chú ý khi niệm kinh", "Nhật ký tu học hàng ngày"], pdfUrl: "https://xlch.org/download/bach-thoai-2", audioUrl: "https://xlch.org/audio/bach-thoai-2", color: "from-rose-900/60 to-rose-800/40" },
  { id: 3, title: "Bạch Thoại Phật Pháp - Tập 3", chinese: "白话佛法（第三册）", description: "Tập 3 giảng giải về Phát Nguyện, Phóng Sinh và cách tích lũy phước đức.", chapters: ["Phát Nguyện là gì?", "Cách lập nguyện đúng pháp", "Sức mạnh của nguyện lực", "Phóng Sinh và tinh thần từ bi", "Nghi thức phóng sinh chi tiết", "Loài vật phóng sinh và ý nghĩa", "Địa điểm và thời gian phóng sinh", "Hồi hướng sau phóng sinh", "Phướng đức tích lũy", "Nhân quả trong phóng sinh", "Các điều cần tránh", "Phóng sinh ở nước ngoài", "Kết quả phóng sinh thực tế", "Câu chuyện linh nghiệm phóng sinh", "Tinh thần giải thoát chúng sinh", "Tổng kết và thực hành"], pdfUrl: "https://xlch.org/download/bach-thoai-3", audioUrl: "https://xlch.org/audio/bach-thoai-3", color: "from-emerald-900/60 to-emerald-800/40" },
  { id: 4, title: "Bạch Thoại Phật Pháp - Tập 4", chinese: "白话佛法（第四册）", description: "Tập 4 chuyên về Đại Sám Hối và Siêu Độ qua Ngôi Nhà Nhỏ.", chapters: ["Ý nghĩa sám hối trong Phật pháp", "Lễ Phật Đại Sám Hối Văn chi tiết", "Ba mươi lăm vị Phật sám hối", "Oán kết nhiều kiếp và cách hóa giải", "Ngôi Nhà Nhỏ là gì?", "Cách viết và niệm Ngôi Nhà Nhỏ", "Số lượng Ngôi Nhà Nhỏ cần thiết", "Siêu độ người thân đã khuất", "Nghiệp báo và nhân duyên", "Câu chuyện siêu độ thực tế", "Phương pháp đốt Ngôi Nhà Nhỏ", "Cúng dường trong siêu độ", "Tự siêu độ bản thân", "Siêu độ thai nhi và sảy thai", "Thời gian và kết quả siêu độ", "Hướng dẫn tu tiếp sau siêu độ"], pdfUrl: "https://xlch.org/download/bach-thoai-4", audioUrl: "https://xlch.org/audio/bach-thoai-4", color: "from-purple-900/60 to-purple-800/40" },
  { id: 5, title: "Bạch Thoại Phật Pháp - Tập 5", chinese: "白话佛法（第五册）", description: "Tập 5 đi sâu vào ứng dụng Phật pháp trong sức khỏe và chữa bệnh.", chapters: ["Nghiệp chướng và bệnh tật", "Bệnh từ tâm", "Niệm Kinh trị bệnh", "Ung thư và nghiệp lực nặng", "Tiểu đường và nghiệp khẩu", "Tim mạch và oán kết", "Bệnh tâm thần và linh can thiệp", "Phóng sinh chữa bệnh", "Tâm từ bi và sức khỏe", "Ăn chay và giảm sát nghiệp", "Chia sẻ thực tế chữa lành bệnh", "Kết hợp y tế và tâm linh", "Chăm sóc người bệnh đúng pháp", "Khi bệnh không thuyên giảm", "Vượt qua nỗi sợ bệnh", "Sức khỏe là phước đức"], pdfUrl: "https://xlch.org/download/bach-thoai-5", audioUrl: "https://xlch.org/audio/bach-thoai-5", color: "from-blue-900/60 to-blue-800/40" },
  { id: 6, title: "Bạch Thoại Phật Pháp - Tập 6", chinese: "白话佛法（第六册）", description: "Tập 6 tập trung vào hôn nhân, gia đình và mối quan hệ.", chapters: ["Hôn nhân và nghiệp duyên", "Oán kết vợ chồng là gì?", "Kinh Giải Kết Chú cho gia đình", "Tại sao vợ chồng bất hòa?", "Phương pháp hòa giải gia đình", "Ngoại tình và nghiệp báo", "Ly hôn và cách xử lý đúng pháp", "Mối quan hệ với cha mẹ", "Hiếu đạo trong Phật giáo", "Con cái và thiện căn", "Dạy con theo Phật pháp", "Cầu con đúng pháp", "Thai giáo tâm linh", "Trẻ em khó nuôi và nghiệp chướng", "Gia đình hạnh phúc là phước đức", "Xây dựng gia đình học Phật"], pdfUrl: "https://xlch.org/download/bach-thoai-6", audioUrl: "https://xlch.org/audio/bach-thoai-6", color: "from-pink-900/60 to-pink-800/40" },
  { id: 7, title: "Bạch Thoại Phật Pháp - Tập 7", chinese: "白话佛法（第七册）", description: "Tập 7 giảng về sự nghiệp, tài vận và ứng dụng Phật pháp trong công việc.", chapters: ["Sự nghiệp và vận mệnh", "Tại sao có người giàu người nghèo?", "Phước đức và tài lộc", "Cầu tài theo Phật pháp", "Kinh doanh đúng đạo đức", "Giải hạn năm tuổi xấu", "Sao La Hầu và cách hóa giải", "Tích đức cho sự nghiệp", "Học tập và trí tuệ", "Chuẩn Đề Thần Chú thi cử", "Nợ nần và cách giải quyết", "Phá sản và bài học nghiệp", "Vực dậy sau thất bại", "Thành công và biết đủ", "Chia sẻ sự nghiệp vượng", "Tâm thái trong công việc"], pdfUrl: "https://xlch.org/download/bach-thoai-7", audioUrl: "https://xlch.org/audio/bach-thoai-7", color: "from-orange-900/60 to-orange-800/40" },
  { id: 8, title: "Bạch Thoại Phật Pháp - Tập 8", chinese: "白话佛法（第八册）", description: "Tập 8 đề cập đến huyền học, giải mộng và các hiện tượng tâm linh.", chapters: ["Giải mộng theo Phật pháp", "Mộng thấy người đã khuất", "Mộng thấy Bồ Tát ý nghĩa gì?", "Mộng xấu và cách hóa giải", "Huyền học và đồ tướng", "Đọc bản đồ vận mệnh", "Tiền kiếp và nhân duyên", "Tướng số trong Phật pháp", "Phong thủy đúng đắn", "Bàn thờ và trường năng lượng", "Điều bất thường trong nhà", "Cô hồn và cách xử lý", "Năng lượng âm và dương", "Bảo vệ bản thân tâm linh", "Hộ thân thần chú", "Tổng hợp huyền học Phật giáo"], pdfUrl: "https://xlch.org/download/bach-thoai-8", audioUrl: "https://xlch.org/audio/bach-thoai-8", color: "from-indigo-900/60 to-indigo-800/40" },
  { id: 9, title: "Bạch Thoại Phật Pháp - Tập 9", chinese: "白话佛法（第九册）", description: "Tập 9 hướng đến việc độ người và hoằng pháp.", chapters: ["Độ người là công đức lớn", "Phương pháp giới thiệu Phật pháp", "Khi người thân không tin", "Kiên nhẫn trong độ người", "Hiện thân nói pháp", "Chia sẻ trải nghiệm thực tế", "Mạng xã hội và hoằng pháp", "Độ người trong gia đình", "Độ đồng nghiệp và bạn bè", "Tâm không vụ lợi khi độ người", "Kết quả độ người và công đức", "Những trở ngại khi độ người", "Cách vượt qua từ chối", "Bổn phận của người tu học", "Lan tỏa ánh sáng Phật pháp", "Nguyện độ vô lượng chúng sinh"], pdfUrl: "https://xlch.org/download/bach-thoai-9", audioUrl: "https://xlch.org/audio/bach-thoai-9", color: "from-teal-900/60 to-teal-800/40" },
  { id: 10, title: "Bạch Thoại Phật Pháp - Tập 10", chinese: "白话佛法（第十册）", description: "Tập 10 chuyên sâu về tu tâm, đức hạnh và rèn luyện phẩm chất.", chapters: ["Đạo đức của người tu học", "Từ bi trong hành động", "Nhẫn nhục và kiên nhẫn", "Hỷ xả và buông bỏ", "Trí tuệ Bát Nhã ứng dụng", "Tâm từ bi với muôn loài", "Không phán xét người khác", "Lời nói thiện lành", "Hành động và công đức", "Tâm thái trước thành bại", "Vô ngã và tự tại", "Không tham, sân, si", "Giữ giới luật Phật giáo", "Ăn chay và tâm từ bi", "Tập thiền định", "Sống đời sống giác ngộ"], pdfUrl: "https://xlch.org/download/bach-thoai-10", audioUrl: "https://xlch.org/audio/bach-thoai-10", color: "from-cyan-900/60 to-cyan-800/40" },
  { id: 11, title: "Bạch Thoại Phật Pháp - Tập 11", chinese: "白话佛法（第十一册）", description: "Tập 11 giới thiệu về pháp hội, lễ bái và hoạt động cộng đồng.", chapters: ["Pháp hội là gì?", "Lợi ích tham gia pháp hội", "Trang phục và lễ nghi", "Về pháp hội thế giới", "Quán Âm Đường và cộng đồng", "Đồng tu và hỗ trợ lẫn nhau", "Niệm kinh trong tập thể", "Phóng sinh tập thể", "Công đức trong pháp hội", "Ký sự pháp hội Melbourne", "Ký sự pháp hội Đài Loan", "Ký sự pháp hội Singapore", "Ký sự pháp hội New York", "Ký sự pháp hội Hà Nội", "Sức mạnh của cộng đồng tu học", "Tương lai của Pháp Môn Tâm Linh"], pdfUrl: "https://xlch.org/download/bach-thoai-11", audioUrl: "https://xlch.org/audio/bach-thoai-11", color: "from-lime-900/60 to-lime-800/40" },
  { id: 12, title: "Bạch Thoại Phật Pháp - Tập 12", chinese: "白话佛法（第十二册）", description: "Tập 12 — tập cuối — tổng kết toàn bộ hành trình tu học và hướng về tương lai.", chapters: ["Nhìn lại hành trình tu học", "Tổng kết Năm Đại Pháp Bảo", "Bước tiến tiếp theo", "Vô thường và giá trị sự sống", "Cái chết và tái sinh", "Cực Lạc thế giới", "Chuẩn bị cho sự ra đi", "Trợ niệm người lâm chung", "Gia đình và sự tiếp nối", "Bổ sung và hoàn thiện tu học", "Những lời dạy cuối cùng", "Tâm nguyện của Sư Phụ", "Cảm ơn và tri ân", "Gieo hạt tốt lành", "Đồng đăng Cực Lạc", "Namo Amitabha (Nam Mô A Di Đà Phật)"], pdfUrl: "https://xlch.org/download/bach-thoai-12", audioUrl: "https://xlch.org/audio/bach-thoai-12", color: "from-yellow-900/60 to-yellow-800/40" },
];

const resourceLinks = [
  { label: "Tải toàn bộ 12 tập (PDF)", href: "https://xlch.org/download", icon: "pdf" },
  { label: "Audio niệm kinh tổng hợp", href: "https://xlch.org/audio", icon: "audio" },
  { label: "Hướng dẫn tu học sơ học", href: "https://xlch.org/guide", icon: "guide" },
  { label: "Mẫu Ngôi Nhà Nhỏ (PDF)", href: "https://xlch.org/ngoinha", icon: "pdf" },
  { label: "Kinh văn thường dụng", href: "https://xlch.org/kinh", icon: "audio" },
  { label: "Website Toàn Cầu XLFM", href: "https://xinlingfamen.info", icon: "external" },
];

export default function LibraryPage() {
  const [selectedVolume, setSelectedVolume] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChapter, setActiveChapter] = useState<number>(0);

  const selected = volumes.find((v) => v.id === selectedVolume);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-6">
          <Breadcrumbs
            centered
            items={[
              { label: 'Thư viện' }
            ]}
          />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center mb-4">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">白话佛法</p>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">Thư Viện Bạch Thoại Phật Pháp</h1>
            <p className="text-muted-foreground text-lg">12 tập kinh điển — Trí tuệ Phật pháp ứng dụng trong đời sống</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-2 mb-12">
            {resourceLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-gold/40 text-sm text-muted-foreground hover:text-gold transition-all">
                <DownloadIcon className="w-3.5 h-3.5" />
                {link.label}
              </a>
            ))}
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className={`${selected ? "lg:w-5/12" : "w-full"} transition-all duration-500`}>
              <div className={`grid ${selected ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"} gap-4`}>
                {volumes.map((vol, i) => (
                  <motion.button key={vol.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} whileHover={{ y: -10, rotateY: 8, scale: 1.02 }} onClick={() => { setSelectedVolume(vol.id === selectedVolume ? null : vol.id); setActiveChapter(0); setIsPlaying(false); }} className={`relative aspect-[3/4] rounded-xl border-2 transition-all overflow-hidden group cursor-pointer ${selectedVolume === vol.id ? "border-gold shadow-gold shadow-lg" : "border-border hover:border-gold/40"}`} style={{ perspective: "800px", transformStyle: "preserve-3d" }}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${vol.color}`} />
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-white/10 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                        <BookIcon className="w-5 h-5 text-amber-300" />
                      </div>
                      <span className="font-display text-base text-white leading-tight drop-shadow">Tập {vol.id}</span>
                      <span className="text-xs text-white/60 mt-1">{vol.chapters.length} chương</span>
                      <span className="text-xs text-white/40 mt-0.5">白话佛法</span>
                    </div>
                    {selectedVolume === vol.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                        <svg viewBox="0 0 12 12" fill="white" className="w-3 h-3"><polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {selected && (
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ type: "spring", damping: 20, stiffness: 200 }} className="lg:w-7/12 bg-card border border-border rounded-xl overflow-hidden flex flex-col max-h-[80vh] lg:sticky lg:top-24">
                  <div className="flex items-start justify-between p-5 border-b border-border bg-secondary/30">
                    <div className="flex-1 min-w-0 pr-4">
                      <h2 className="font-display text-xl text-foreground leading-tight">{selected.title}</h2>
                      <p className="text-xs text-muted-foreground mt-0.5">{selected.chinese}</p>
                    </div>
                    <button onClick={() => setSelectedVolume(null)} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors shrink-0">
                      <CloseIcon className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-secondary/10">
                    <a href={selected.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-gold hover:bg-primary/20 transition-colors text-xs font-medium">
                      <DownloadIcon className="w-3.5 h-3.5" />Tải PDF
                    </a>
                    <a href={selected.audioUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-xs font-medium text-muted-foreground hover:text-foreground">
                      <ExternalLinkIcon className="w-3.5 h-3.5" />Nghe Online
                    </a>
                    <a href="https://xlch.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-xs font-medium text-muted-foreground hover:text-foreground">
                      <ExternalLinkIcon className="w-3.5 h-3.5" />Website Gốc
                    </a>
                  </div>

                  <div className="px-5 py-4 border-b border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed">{selected.description}</p>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    <div className="px-5 py-3 border-b border-border bg-secondary/20">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Mục Lục — {selected.chapters.length} Chương</p>
                    </div>
                    <div className="p-3 space-y-1">
                      {selected.chapters.map((chapter, i) => (
                        <button key={i} onClick={() => setActiveChapter(i)} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors group text-left ${activeChapter === i ? "bg-primary/10 text-gold" : "hover:bg-secondary text-muted-foreground hover:text-foreground"}`}>
                          <span className={`text-xs w-6 text-center shrink-0 ${activeChapter === i ? "text-gold" : "text-muted-foreground/50"}`}>{i + 1}</span>
                          <span className="text-sm flex-1">{chapter}</span>
                          {activeChapter === i && <PlayIcon className="w-3.5 h-3.5 text-gold shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border p-4 bg-secondary/30">
                    <p className="text-xs text-muted-foreground mb-3 truncate">Đang xem: <span className="text-foreground">Chương {activeChapter + 1} — {selected.chapters[activeChapter]}</span></p>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setActiveChapter(Math.max(0, activeChapter - 1))} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="19 20 9 12 19 4" strokeLinecap="round" strokeLinejoin="round" /><line x1="5" y1="19" x2="5" y2="5" strokeLinecap="round" /></svg>
                      </button>
                      <button onClick={() => setIsPlaying(!isPlaying)} className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0">
                        {isPlaying ? (
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                        ) : (
                          <PlayIcon className="w-4 h-4 ml-0.5" />
                        )}
                      </button>
                      <button onClick={() => setActiveChapter(Math.min(selected.chapters.length - 1, activeChapter + 1))} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="5 4 15 12 5 20" strokeLinecap="round" strokeLinejoin="round" /><line x1="19" y1="5" x2="19" y2="19" strokeLinecap="round" /></svg>
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                          <motion.div className="h-full bg-gradient-to-r from-gold to-amber-400 rounded-full" animate={{ width: isPlaying ? "60%" : "30%" }} transition={{ duration: 2, ease: "linear" }} />
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">24:18</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-16 p-8 rounded-2xl bg-card border border-border text-center">
            <h3 className="font-display text-2xl text-foreground mb-3">Tải Miễn Phí Toàn Bộ 12 Tập</h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm">Tất cả sách, audio và tài liệu Pháp Môn Tâm Linh đều miễn phí. Không bao giờ dùng Phật pháp để kinh doanh.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://xlch.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">
                <DownloadIcon className="w-4 h-4" />Tải tất cả tài liệu
              </a>
              <a href="https://xinlingfamen.info" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-medium">
                <ExternalLinkIcon className="w-4 h-4" />Website Toàn Cầu
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <StickyBanner />
    </div>
  );
}
