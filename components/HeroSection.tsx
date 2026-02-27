'use client'

import { motion } from "framer-motion";
import Image from "next/image";
import { SearchIcon } from "@/components/icons/ZenIcons";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/banner.jfif"
          alt="Phong cảnh thiền tịnh"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <div className="zen-divider w-24 mx-auto mb-8" />
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight text-foreground mb-6">
            Tâm tịnh thì{" "}
            <span className="gold-gradient-text">cõi Phật hiện tiền</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Khai thị Phật pháp ứng dụng trong đời sống, hóa giải phiền não, 
            vun bồi phước đức cho bản thân và gia đình.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-lg mx-auto"
          >
            <div className="relative group">
              <input
                type="text"
                placeholder="Tìm kiếm khai thị, video, nghi thức..."
                className="w-full px-6 py-4 pl-14 rounded-xl bg-card/80 backdrop-blur-sm border border-border text-foreground placeholder:text-muted-foreground text-base focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all"
              />
              <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-gold transition-colors" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
