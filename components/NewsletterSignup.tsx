'use client'

import { useState } from "react";
import { motion } from "framer-motion";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center p-8 md:p-12 rounded-2xl bg-gradient-to-br from-gold/5 via-amber-500/5 to-gold/5 border border-gold/10"
        >
          <span className="text-3xl mb-4 block text-gold">✦</span>
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">
            Nhận Bản Tin Phật Pháp
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Nhận bài giảng mới, lịch tu học, và câu chuyện đồng tu mỗi tuần. Hoàn toàn miễn phí.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-xl bg-green-500/10 border border-green-500/20"
            >
              <p className="text-sm text-green-400 font-medium">✓ Đăng ký thành công!</p>
              <p className="text-xs text-muted-foreground mt-1">
                Bạn sẽ nhận email xác nhận trong vài phút.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn..."
                required
                className="flex-1 px-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/30"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gold/10 text-gold rounded-xl text-sm font-medium hover:bg-gold/20 transition-colors whitespace-nowrap"
              >
                Đăng Ký
              </button>
            </form>
          )}

          <p className="text-xs text-muted-foreground/50 mt-4">
            Chúng tôi tôn trọng sự riêng tư. Bạn có thể hủy bất cứ lúc nào.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
