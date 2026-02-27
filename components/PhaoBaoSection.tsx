'use client'

import { motion } from "framer-motion";
import Link from "next/link";

const phapBao = [
  {
    id: "niem-kinh",
    title: "Niệm Kinh",
    chinese: "念经",
    color: "from-amber-500/20 to-amber-600/10",
    borderColor: "hover:border-amber-500/50",
    description: "Ba trụ cột: Chú Đại Bi, Tâm Kinh và Lễ Phật Đại Sám Hối Văn.",
    link: "/library",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.2">
        <path d="M8 6h18a2 2 0 0 1 2 2v22a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" strokeLinecap="round"/>
        <path d="M12 12h12M12 17h12M12 22h8" strokeLinecap="round"/>
        <path d="M28 6l4 4v22a2 2 0 0 1-2 2H10" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "phat-nguyen",
    title: "Phát Nguyện",
    chinese: "许愿",
    color: "from-purple-500/20 to-purple-600/10",
    borderColor: "hover:border-purple-500/50",
    description: "Nguyện thành tâm dâng lên Bồ Tát, nhận được gia trì và bảo hộ.",
    link: "/search",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.2">
        <path d="M20 4l2.4 7.2H30l-6.2 4.5 2.4 7.2L20 18.5l-6.2 5.4 2.4-7.2L10 11.2h7.6L20 4z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 26c0 4.4 3.6 8 8 8s8-3.6 8-8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "phong-sinh",
    title: "Phóng Sinh",
    chinese: "放生",
    color: "from-emerald-500/20 to-emerald-600/10",
    borderColor: "hover:border-emerald-500/50",
    description: "Giải cứu sinh linh, tích đức hồi hướng, tiêu trừ nghiệp chướng.",
    link: "/blog",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.2">
        <path d="M20 32c0 0-12-8-12-18a12 12 0 0 1 24 0c0 10-12 18-12 18z" strokeLinecap="round"/>
        <path d="M14 18c2-4 6-6 6-6s4 2 6 6" strokeLinecap="round"/>
        <path d="M20 10v4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "bach-thoai",
    title: "Bạch Thoại Phật Pháp",
    chinese: "白话佛法",
    color: "from-blue-500/20 to-blue-600/10",
    borderColor: "hover:border-blue-500/50",
    description: "12 tập học Phật pháp ứng dụng - trí tuệ khai mở tâm trí.",
    link: "/library",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.2">
        <circle cx="20" cy="20" r="14"/>
        <path d="M14 20c0-3.3 2.7-6 6-6s6 2.7 6 6" strokeLinecap="round"/>
        <path d="M20 26v-6" strokeLinecap="round"/>
        <circle cx="20" cy="28" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: "sam-hoi",
    title: "Đại Sám Hối",
    chinese: "大忏悔",
    color: "from-rose-500/20 to-rose-600/10",
    borderColor: "hover:border-rose-500/50",
    description: "Sám hối tội nghiệp, tiêu trừ nghiệp chướng, tâm được thanh tịnh.",
    link: "/search",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.2">
        <path d="M20 8c0 0-10 6-10 14s10 10 10 10 10-2 10-10S20 8 20 8z" strokeLinecap="round"/>
        <path d="M20 16v8M16 22l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const PhaoBaoSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">心灵法门 五大法宝</p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">5 Đại Pháp Bảo</h2>
          <div className="zen-divider w-24 mx-auto mb-4" />
          <p className="text-muted-foreground max-w-xl mx-auto">
            Năm Đại Pháp Bảo do Quán Thế Âm Bồ Tát truyền thụ — con đường hóa giải nghiệp chướng, tích đức hồi hướng và khai mở trí tuệ.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {phapBao.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={item.link}
                className={`flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border ${item.borderColor} transition-all duration-300 group hover:shadow-gold hover:-translate-y-1 block`}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 text-gold group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className="font-display text-lg text-foreground group-hover:text-gold transition-colors leading-tight mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">{item.chinese}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhaoBaoSection;
