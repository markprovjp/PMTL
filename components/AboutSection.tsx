'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@/components/icons/ZenIcons";

const sections = [
  {
    id: "what",
    question: "1. Pháp Môn Tâm Linh Là Gì?",
    answer: `Pháp Môn Tâm Linh được Quán Thế Âm Bồ Tát truyền thụ cho chúng sanh. Gồm Năm Đại Pháp Bảo: Niệm Kinh, Phát nguyện, Phóng sanh, Đọc Bạch Thoại Phật Pháp và Đại Sám Hối.

"Tâm Linh" là Khóa, "Pháp Môn" là Chìa Khóa — dùng pháp môn mở ra tâm linh của quý vị, tức là "Pháp Môn Tâm Linh".

Đây là một kiến thức về tâm, bởi vì vạn vật trên thế gian "đều do tâm sinh ra", cứu người trước hết là cứu tâm. Và đây chính là một cánh cửa thần kỳ — bởi vì nó có thể mở ra trí tuệ nhân sinh, dẫn dắt chúng sinh đi lên con đường Phật đạo, ly khổ đắc lạc (lìa khổ được vui — thoát khỏi đau khổ và đạt được hạnh phúc).`,
  },
  {
    id: "who",
    question: "2. Đài Trưởng Lư Quân Hoành Là Ai?",
    answer: `Ngài tên Lư Quân Hoành, là người Hoa Kiều sống tại Úc, là đại diện cho cư sỹ tu tại gia. Ngài thành lập Đài Phát thanh Đông Phương để truyền bá Phật Pháp ở Úc và khắp nơi trên thế giới.

Nhận được sự khai thị của Quán Thế Âm Bồ Tát, Đài Trưởng Lư Quân Hoành giúp chúng sanh hiểu nhân biết quả, biết niệm Kinh Phật và sám hối. Thông qua đó có thể hóa giải oán kết, tai nạn, rủi ro, bệnh tật trong cuộc sống.

Ngoài ra, Ngài còn là Chủ tịch Hội đồng Quản trị của tổ chức Từ thiện truyền thông Đông Phương-Úc, là chuyên gia tâm lý người Úc có bằng cấp cao, là Dato của Malaysia, là Giáo sư thỉnh giảng tại Đại học Siena, Ý.`,
  },
  {
    id: "precepts",
    question: "3. Năm Đại Pháp Bảo Hoạt Động Như Thế Nào?",
    answer: `Ba trụ cột quan trọng của Kinh văn Pháp môn Tâm linh là "Chú Đại Bi (大悲咒)", "Tâm Kinh (心经)" và "Lễ Phật Đại Sám Hối Văn (礼佛大忏悔文)".

• Chú Đại Bi có thể tăng cường năng lượng và giúp cơ thể khỏe mạnh
• Tâm Kinh mở ra trí tuệ và hóa giải phiền não
• Lễ Phật Đại Sám Hối Văn giúp sám hối tội lỗi và xóa bỏ nghiệp chướng

Chỉ cần kiên trì niệm kinh, chúng ta có thể xóa bỏ nghiệp chướng, mọi việc sẽ thuận lợi và thay đổi vận mệnh của chính mình.`,
  },
];

const AboutSection = () => {
  const [openId, setOpenId] = useState<string | null>("what");

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Giới Thiệu</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6 leading-tight">
              Pháp Môn Tâm Linh<br />
              <span className="gold-gradient-text">心灵法门</span>
            </h2>
            <div className="zen-divider w-20 mb-6" />
            <p className="text-muted-foreground leading-loose text-base mb-8">
              Nguyện rằng sẽ càng có thêm nhiều chúng sinh hữu duyên có thể lên được chiếc thuyền cứu độ của Quán Thế Âm Bồ Tát, tâm hồn thanh tịnh, thoát khổ an vui, tiêu trừ nghiệp chướng, siêu độ hữu duyên, trả sạch oán kết, quảng độ chúng sinh, đồng đăng cực lạc.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Đồng Tu Toàn Cầu", value: "Hàng triệu" },
                { label: "Năm Hoằng Pháp", value: "20+" },
                { label: "Quán Âm Đường", value: "Toàn Cầu" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-xl bg-card border border-border">
                  <p className="font-display text-xl text-gold mb-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {sections.map((sec) => (
              <div key={sec.id} className="rounded-xl border border-border bg-card overflow-hidden">
                <button
                  onClick={() => setOpenId(openId === sec.id ? null : sec.id)}
                  className="w-full flex items-center justify-between p-5 text-left group"
                >
                  <span className="font-display text-lg text-foreground group-hover:text-gold transition-colors">
                    {sec.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openId === sec.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 ml-4 text-muted-foreground"
                  >
                    <ChevronDownIcon />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openId === sec.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-border pt-4">
                        {sec.answer.split("\n\n").map((para, i) => (
                          <p key={i} className="text-muted-foreground leading-loose text-sm mb-3 last:mb-0 whitespace-pre-line">
                            {para}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <div className="p-4 rounded-xl bg-secondary/50 border border-border text-sm text-muted-foreground">
              <p className="mb-1 font-medium text-foreground">Địa chỉ Văn phòng Đài Đông Phương:</p>
              <p>2A Holden Street, Ashfield NSW 2131 Australia</p>
              <p className="mt-1">
                <a href="tel:+61292832758" className="text-gold hover:underline">+61 2 9283 2758</a>
                {" · "}
                <a href="https://xlch.org/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">xlch.org</a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
