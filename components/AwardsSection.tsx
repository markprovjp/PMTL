'use client'

import { motion } from "framer-motion";

const awards = [
  {
    year: "2014",
    title: "Giải Peace & Philanthropy Award",
    org: "House of Lords, UK Parliament",
    description: "Vinh danh đóng góp cho hòa bình và từ thiện quốc tế.",
  },
  {
    year: "2013",
    title: "World Peace Award",
    org: "Simon Wiesenthal Centre — Museum of Tolerance",
    description: "Giải thưởng Hòa bình Thế giới tại Los Angeles, Hoa Kỳ.",
  },
  {
    year: "2015",
    title: "Certificate of Appreciation",
    org: "United Nations — UNESCO",
    description: "Chứng nhận đóng góp cho văn hóa, giáo dục và hòa bình.",
  },
  {
    year: "2012",
    title: "Community Service Excellence",
    org: "Liên đoàn Phật giáo Úc",
    description: "Vinh danh hoạt động phục vụ cộng đồng Phật tử tại Australia.",
  },
];

const AwardsSection = () => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">
            Quốc Tế Công Nhận
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
            Giải Thưởng & Vinh Danh
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Pháp Môn Tâm Linh được nhiều tổ chức quốc tế ghi nhận vì hoạt động từ thiện và đóng góp cho hòa bình.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {awards.map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-5 rounded-xl bg-card border border-border hover:border-gold/20 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-gold font-medium bg-gold/10 px-2 py-0.5 rounded">
                  {award.year}
                </span>
              </div>
              <h3 className="text-sm font-medium text-foreground mb-1 group-hover:text-gold transition-colors">
                {award.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-2">{award.org}</p>
              <p className="text-xs text-muted-foreground/70">{award.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
