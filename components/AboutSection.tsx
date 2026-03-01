'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@/components/icons/ZenIcons";

const sections = [
  {
    id: "lu-master",
    question: "1. Giới Thiệu Trưởng Ban Đài Loan",
    answer: `Trưởng Ban Đài Loan Lư Quân Hoành là người thành phố Giang Môn, tỉnh Quảng Đông, Trung Quốc. Năm 2015, tháng 1 tại sân vận động Rajamangala ở Kuala Lumpur (Malaysia) đã tổ chức đại pháp hội với hơn mười vạn người tham dự; tháng 4 tại Singapore tổ chức pháp hội, chấn động thế giới.

Lư Quân Hoành vì quảng bá Phật pháp, hoằng dương văn hóa Trung Hoa, tăng tiến hòa bình thế giới, nhiều năm qua không ngừng đi khắp thế giới tổ chức pháp hội quy mô lớn, cứu độ chúng sinh.

Từ năm 2012 đến nay, Sư phụ đã nhiều lần được các quốc gia mời đến diễn giảng, bao gồm Liên Hợp Quốc, Quốc hội Hoa Kỳ cùng các trường đại học trên thế giới, và đã nhận được nhiều giải thưởng.

Sư phụ từng được trao “Giải thưởng Hòa bình Thế giới (Phật giáo)” cùng nhiều vinh dự khác. Sách Pháp Môn Tâm Linh do Sư phụ sáng lập đã được xuất bản hơn 10.000.000 quyển, lưu thông khắp thế giới, độ hóa vô số hữu duyên.`,
  },
  {
    id: "three-dharmas",
    question: "2. Khéo Dùng Ba Đại Pháp Bảo",
    answer: `**Tụng Kinh**
Tâm niệm Đại Bi, tâm lượng rộng lớn; tâm niệm Tâm Kinh, khai mở trí huệ. Chú Đại Bi tăng cường năng lượng, tiêu trừ tai nạn; Tâm Kinh khai mở trí huệ, tăng trưởng công đức. Kinh văn là lời khai thị của chư Phật Bồ Tát, có thể hóa giải các loại vấn đề trong đời sống. Tụng kinh khiến thân tâm thanh tịnh, trang nghiêm mỹ hảo.

**Phát Nguyện**
Nguyện lực có thể cải biến vận mệnh, uy lực của nguyện lực đến từ tâm chân thành. Khi một người nguyện lực kiên cố, phát tâm chân chính, liền có thể đạt được gia trì và bảo hộ của chư Phật Bồ Tát. Phát nguyện không chỉ cần chân thành, mà còn phải lượng sức mà hành.

**Phóng Sinh**
Phóng sinh là bố thí, là hành thiện, là từ bi; vì cứu độ sinh mạng, công đức không thể nghĩ bàn. Phóng sinh không những tiêu tai kéo dài thọ mạng, cát tường như ý, mà còn bồi dưỡng tâm từ bi của chính mình, tích lũy công đức phúc báo.`,
  },
  {
    id: "why-chant",
    question: "3. Vì Sao Phải Tụng Kinh?",
    answer: `Đừng để tâm linh chờ đợi thêm một phút nào nữa! Con cần kinh văn mỗi ngày để tăng trưởng năng lượng, cải thiện đời sống, thay đổi hoàn cảnh sinh hoạt. Vì trưởng bối, vì gia đình, vì con cái, vì tiền đồ, cần phải chăm chỉ tu hành, tinh tấn không ngừng, mới có thể đạt được hạnh phúc chân chính.

Tụng kinh có thể tiêu tai giải nạn! Tụng kinh có thể sám hối nghiệp chướng, khiến tâm được thanh tịnh, khiến gia đình hòa thuận.

Tụng kinh khiến tâm an tịnh, xa lìa phiền não! Tâm thanh tịnh thì thân an lạc, xuất sinh trí huệ, chuyển họa thành phúc, sở cầu như nguyện.`,
  },
];

const AboutSection = () => {
  const [openId, setOpenId] = useState<string | null>("lu-master");

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Giới Thiệu</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6 leading-tight">
              Pháp Môn Tâm Linh<br />
              <span className="gold-gradient-text">Hướng Dẫn Tu Học</span>
            </h2>
            <div className="zen-divider w-20 mb-6" />
            <p className="text-muted-foreground leading-loose text-base mb-8 italic border-l-2 border-gold/30 pl-6">
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
