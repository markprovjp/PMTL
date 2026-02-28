'use client';

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";

import Footer from "@/components/Footer";
import StickyBanner from "@/components/StickyBanner";
import { SearchIcon } from "@/components/icons/ZenIcons";

interface QnAItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

const categories = [
  "Tất Cả", "Niệm Kinh", "Ngôi Nhà Nhỏ", "Phong Thủy", "Giấc Mơ",
  "Sức Khỏe", "Hôn Nhân", "Sự Nghiệp", "Phóng Sinh", "Bàn Thờ", "Ăn Chay",
];

const qaData: QnAItem[] = [
  { id: 1, question: "Người mới bắt đầu nên niệm kinh gì trước?", answer: "Người mới nên bắt đầu với 3 bộ kinh chú cơ bản: Chú Đại Bi (大悲咒) 3-7 biến/ngày, Tâm Kinh (心经) 3-7 biến/ngày, và Chuẩn Đề Thần Chú (准提神咒) 21-49 biến/ngày. Sau khi quen, thêm Lễ Phật Đại Sám Hối Văn 1-3 biến/ngày. Niệm chậm, rõ ràng, tập trung tâm ý. Có thể đọc theo sách hoặc audio ban đầu, không cần thuộc lòng ngay.", category: "Niệm Kinh", tags: ["sơ học", "kinh chú", "công khóa"] },
  { id: 2, question: "Ngôi Nhà Nhỏ (小房子) là gì và cách sử dụng?", answer: "Ngôi Nhà Nhỏ là tờ giấy vàng A4 ghi gồm 4 loại kinh chú: Chú Đại Bi (27 biến), Tâm Kinh (49 biến), Vãng Sinh Chú (84 biến), Thất Phật Diệt Tội Chân Ngôn (87 biến). Khi niệm xong mỗi biến, chấm một điểm đỏ vào ô tương ứng. Ghi tên người cần siêu độ, sau đó đốt theo nghi thức. Ngôi Nhà Nhỏ dùng để siêu độ oan gia trái chủ, vong linh, giúp giải nghiệp và cầu phước.", category: "Ngôi Nhà Nhỏ", tags: ["tiểu phòng tử", "siêu độ", "oan gia trái chủ"] },
  { id: 3, question: "Bàn thờ Phật tại nhà nên đặt ở đâu?", answer: "Bàn thờ Phật nên đặt ở phòng khách hoặc phòng riêng, sạch sẽ, trang nghiêm. Hướng tốt nhất là hướng Nam hoặc hướng Đông. KHÔNG đặt trong phòng ngủ, nhà bếp, nhà vệ sinh, hoặc dưới cầu thang. Bàn thờ cần cao hơn thắt lưng, có tượng/ảnh Quán Thế Âm Bồ Tát, bát nhang, đèn dầu, hoa tươi, nước sạch, và trái cây. Thay nước mỗi ngày, hoa khi héo.", category: "Bàn Thờ", tags: ["phong thủy", "thiết lập", "quán âm"] },
  { id: 4, question: "Nằm mơ thấy người đã mất có ý nghĩa gì?", answer: "Nằm mơ thấy người đã mất (vong linh) thường là họ đang cần siêu độ. Nên niệm 7-21 tờ Ngôi Nhà Nhỏ ghi cho \"XXX (tên mình) oan gia trái chủ\" hoặc ghi đích danh \"vong linh YYY\" nếu biết rõ. Nếu thấy người mất mặc quần áo sạch đẹp, tươi cười = họ đã siêu thoát, rất tốt. Nếu mặc rách, buồn, quở trách = cần niệm thêm Ngôi Nhà Nhỏ cho họ.", category: "Giấc Mơ", tags: ["vong linh", "siêu độ", "giải mộng"] },
  { id: 5, question: "Phong thủy nhà ở cần chú ý gì?", answer: "Một số nguyên tắc phong thủy quan trọng: (1) Cửa chính không đối diện thang máy, cầu thang hoặc nhà vệ sinh. (2) Giường ngủ không đối diện gương, cửa nhà vệ sinh. (3) Bếp và nhà vệ sinh không đối diện nhau. (4) Nhà nên thoáng, sáng, không ẩm mốc. (5) Tránh nhà ở gần nghĩa trang, bệnh viện, đồn công an. (6) Trồng cây xanh, hoa tươi để thanh lọc năng lượng. Ngoài phong thủy vật lý, niệm kinh và đốt Ngôi Nhà Nhỏ giúp thanh lọc năng lượng tâm linh.", category: "Phong Thủy", tags: ["nhà ở", "năng lượng", "bố trí"] },
  { id: 6, question: "Ăn chay có bắt buộc không? Nên ăn chay thế nào?", answer: "Ăn chay không bắt buộc nhưng RẤT được khuyến khích. Lộ trình từng bước: (1) Bắt đầu ăn chay Mùng 1 và 15 hàng tháng (2 ngày). (2) Tăng lên 6 ngày: Mùng 1, 8, 14, 15, 23, 29-30. (3) Lý tưởng: 10 ngày trai hoặc trường chay. Ăn chay giúp tích đức, tâm thanh tịnh, niệm kinh linh ứng hơn. Ngày rằm và Mùng 1 là ngày vía Phật, nên nhất định ăn chay.", category: "Ăn Chay", tags: ["trai giới", "ngày chay", "sức khỏe"] },
  { id: 7, question: "Bị bệnh nặng/nan y nên niệm kinh gì?", answer: "Khi bị bệnh nặng, cần kết hợp y học hiện đại VÀ tu học: (1) Niệm Chú Đại Bi tăng lên 49 biến/ngày → tăng năng lượng. (2) Lễ Phật Đại Sám Hối Văn 5-7 biến/ngày → sám hối nghiệp bệnh. (3) Đốt 49-108 Ngôi Nhà Nhỏ → siêu độ oan gia trái chủ gây bệnh. (4) Phóng sinh số lượng lớn (ít nhất vài trăm con). (5) Phát nguyện ăn chay trường. (6) Niệm Vãng Sinh Chú 49 biến/ngày nếu bệnh liên quan đến vong linh. LƯU Ý: Phải đi bác sĩ song song, Phật pháp hỗ trợ chứ không thay thế y học.", category: "Sức Khỏe", tags: ["bệnh tật", "nan y", "niệm kinh chữa bệnh"] },
  { id: 8, question: "Vợ chồng hay cãi nhau, hôn nhân bất hòa thì sao?", answer: "Bất hòa hôn nhân thường do nghiệp duyên từ kiếp trước. Cách hóa giải: (1) Niệm Giải Kết Chú (解结咒) 49 biến/ngày, vừa niệm vừa cầu hóa giải oan kết. (2) Tâm Kinh 7-21 biến hồi hướng cho đối phương. (3) Đốt 7-21 Ngôi Nhà Nhỏ cho oan gia trái chủ giữa 2 vợ chồng. (4) Từ bi nhẫn nhịn, không tranh cãi trong ngày niệm kinh. (5) Phát nguyện ăn chay 2-6 ngày/tháng. Quan trọng: Thay đổi bản thân trước, không ép đối phương tu.", category: "Hôn Nhân", tags: ["gia đình", "oan kết", "giải kết chú"] },
  { id: 9, question: "Muốn tìm việc làm tốt, sự nghiệp hanh thông?", answer: "Cầu sự nghiệp nên: (1) Niệm Chuẩn Đề Thần Chú 49-108 biến/ngày, sau đó cầu cụ thể. (2) Niệm Tâm Kinh 7 biến → khai trí tuệ, sáng suốt. (3) Đốt 7 Ngôi Nhà Nhỏ cho oan gia trái chủ (nghiệp cản trở). (4) Phóng sinh cá (đặc biệt cá chép) → khai vận. (5) Phát nguyện: nếu được việc tốt sẽ ăn chay X ngày, niệm kinh X biến hồi hướng. Lưu ý: Cần nỗ lực thực tế song song — Phật giúp người tự giúp mình.", category: "Sự Nghiệp", tags: ["công việc", "cầu nguyện", "chuẩn đề"] },
  { id: 10, question: "Phóng sinh nên phóng loại nào, ở đâu?", answer: "Phóng sinh tốt nhất: (1) Cá (đặc biệt cá đen, cá chép) — phóng ở sông, hồ, biển. (2) Tôm, cua, ốc — phóng ở biển hoặc sông lớn. (3) Chim — phóng ở công viên, rừng (ít dùng). Nguyên tắc: Mua từ chợ/tiệm (cứu mạng đang bị sát sinh), phóng ở nơi an toàn (không câu cá, nước sạch). Trước khi phóng: niệm Chú Đại Bi 1 biến, niệm \"Nam Mô Quán Thế Âm Bồ Tát\" 7 lần. Sau khi phóng: hồi hướng công đức. Số lượng: càng nhiều càng tốt, tối thiểu vài con mỗi lần.", category: "Phóng Sinh", tags: ["phóng cá", "tích đức", "cứu mạng"] },
  { id: 11, question: "Niệm kinh có thời gian nào tốt nhất?", answer: "Thời gian niệm kinh tốt nhất: (1) Sáng sớm 5:00-8:00 — thanh tịnh nhất, linh ứng nhất. (2) 10:00-12:00 — thời gian Phật lực mạnh. (3) Chiều 14:00-17:00 — thời gian tốt. TRÁNH: Sau 22:00 không nên niệm Tâm Kinh và Vãng Sinh Chú (vì dễ chiêu vong). Chú Đại Bi có thể niệm bất cứ lúc nào. Chuẩn Đề niệm ban ngày. Lễ Phật Đại Sám Hối Văn: tốt nhất 6:00-10:00 sáng.", category: "Niệm Kinh", tags: ["thời gian", "công khóa", "quy tắc"] },
  { id: 12, question: "Đốt Ngôi Nhà Nhỏ cần lưu ý gì?", answer: "Quy trình đốt Ngôi Nhà Nhỏ: (1) Chuẩn bị đĩa sứ trắng (không hoa văn) để đốt. (2) Đọc bài khấn trước khi đốt. (3) Đốt từng tờ một, không đốt chung. (4) Tốt nhất đốt vào sáng sớm (6:00-8:00), rằm hoặc mùng 1. (5) Đốt xong gom tro, bọc giấy vứt ở nơi sạch sẽ. (6) Sau khi đốt, niệm Quán Thế Âm Bồ Tát 7 lần. LƯU Ý: Không đốt khi trời mưa to, sấm sét. Không để trẻ em, thú cưng gần khu vực đốt.", category: "Ngôi Nhà Nhỏ", tags: ["đốt", "nghi thức", "quy trình"] },
];

export default function QnAPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất Cả");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return qaData.filter((item) => {
      const matchesCategory = selectedCategory === "Tất Cả" || item.category === selectedCategory;
      const matchesSearch =
        !search ||
        item.question.toLowerCase().includes(search.toLowerCase()) ||
        item.answer.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-6">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center mb-10">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Kho Tri Thức Phật Pháp</p>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">Hỏi Đáp Phật Học</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tổng hợp {qaData.length}+ câu hỏi thường gặp về tu học Pháp Môn Tâm Linh. Tìm kiếm theo chủ đề hoặc từ khóa.
            </p>
          </motion.div>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm câu hỏi, ví dụ: niệm kinh, phóng sinh, giấc mơ..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/30"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((cat) => {
              const count = cat === "Tất Cả" ? qaData.length : qaData.filter((q) => q.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedCategory === cat ? "bg-gold/20 text-gold" : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Results count */}
          <p className="text-xs text-muted-foreground mb-4">{filtered.length} kết quả</p>

          {/* Q&A List */}
          <div className="space-y-3 max-w-3xl mx-auto">
            {filtered.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl bg-card border border-border overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="w-full flex items-start gap-3 p-5 text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-gold font-display text-sm">Q</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-foreground leading-relaxed">{item.question}</h3>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded text-xs bg-secondary text-muted-foreground">{item.category}</span>
                        {item.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs text-muted-foreground/50">#{tag}</span>
                        ))}
                      </div>
                    </div>
                    <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} className="text-muted-foreground shrink-0 mt-1">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 border-t border-border/50 pt-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                              <span className="text-emerald-400 font-display text-sm">A</span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{item.answer}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-sm">Không tìm thấy câu hỏi phù hợp.</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Thử tìm từ khóa khác hoặc chọn danh mục khác.</p>
            </div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-gold/5 to-amber-500/5 border border-gold/10 text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-xl text-foreground mb-2">Không Tìm Thấy Câu Trả Lời?</h2>
            <p className="text-sm text-muted-foreground mb-5">
              Gọi đường dây tư vấn miễn phí hoặc gửi câu hỏi qua email. Đội ngũ tình nguyện viên sẽ trả lời trong vòng 24-48 giờ.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+61292832758"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold/10 text-gold rounded-xl text-sm font-medium hover:bg-gold/20 transition-colors"
              >
                +61 2 9283 2758
              </a>
              <a
                href="mailto:oriental2or@hotmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-foreground rounded-xl text-sm font-medium hover:bg-secondary/80 transition-colors"
              >
                Gửi Email Hỏi Đáp
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <StickyBanner />
    </div>
  );
}
