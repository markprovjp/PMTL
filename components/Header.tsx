'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SearchIcon, MenuIcon, CloseIcon } from "@/components/icons/ZenIcons";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import CategoryNav, { CategoryNavMobile } from "@/components/CategoryNav";

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);

const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const MobileMenu = ({ onClose }: { onClose: () => void }) => {
  const { user, logout } = useAuth();
  const [catOpen, setCatOpen] = useState(false);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed inset-0 z-50 bg-background overflow-y-auto"
    >
      <div className="flex items-center justify-between p-6 border-b border-border">
        <Link href="/" onClick={onClose} className="flex items-center gap-2">
          <Image src="/images/logoo.png" alt="Phap Mon Tam Linh" width={40} height={40} className="h-10 w-auto object-contain" />
        </Link>
        <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground">
          <CloseIcon />
        </button>
      </div>
      <nav className="p-6 space-y-2">
        {user ? (
          <div className="flex items-center justify-between py-3 mb-2 border-b border-border">
            <Link href="/profile" onClick={onClose} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="font-display text-sm text-gold">{(user.fullName || user.username)[0].toUpperCase()}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{user.fullName || user.username}</p>
                <p className="text-xs text-muted-foreground">Xem hồ sơ</p>
              </div>
            </Link>
            <button onClick={() => { logout(); onClose(); }} className="text-xs text-red-400 hover:text-red-300 transition-colors">
              Đăng xuất
            </button>
          </div>
        ) : (
          <Link href="/auth" onClick={onClose} className="flex items-center justify-center gap-2 w-full py-3 mb-4 border border-gold/50 text-gold hover:bg-gold/10 rounded-lg transition-all text-sm font-medium">
            <UserIcon />
            Đăng nhập / Đăng ký
          </Link>
        )}
        <div className="pb-4 mb-2 border-b border-border space-y-0.5">
          {[
            { label: "Radio", href: "/radio" },
            { label: "Video", href: "/videos" },
            { label: "Thư Viện", href: "/library" },
            { label: "Blog", href: "/blog" },
            { label: "Sơ Học", href: "/beginner-guide" },
            { label: "Hỏi Đáp", href: "/qa" },
            { label: "Lịch Tu Học", href: "/lunar-calendar" },
            { label: "Sự Kiện", href: "/events" },
            { label: "Quán Âm Dương", href: "/directory" },
            { label: "Hỗ Trợ Phật Pháp", href: "/donations" },
          ].map((link) => (
            <Link key={link.href} href={link.href} onClick={onClose}
              className="block py-2.5 px-2 text-sm text-foreground hover:text-gold transition-colors rounded-lg hover:bg-secondary">
              {link.label}
            </Link>
          ))}
        </div>
        <div>
          <button onClick={() => setCatOpen(!catOpen)} className="w-full flex items-center justify-between py-4 text-left font-display text-lg text-foreground">
            Chủ Đề
            <motion.span animate={{ rotate: catOpen ? 180 : 0 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </motion.span>
          </button>
          <AnimatePresence>
            {catOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-2">
                <CategoryNavMobile onClose={onClose} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </motion.div>
  );
};

const Header = () => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  return (
    <header className="sticky top-0 z-40">
      {/* Primary bar */}
      <div className="bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image src="/images/logoo.png" alt="Phap Mon Tam Linh" width={48} height={48} className="h-12 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1 mr-2">
              {[
                { label: "Radio", href: "/radio" },
                { label: "Video", href: "/videos" },
              { label: "Thư Viện", href: "/library" },
              { label: "Sơ Học", href: "/beginner-guide" },
              { label: "Hỏi Đáp", href: "/qa" },
              { label: "Sự Kiện", href: "/events" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="px-2.5 py-1 text-xs text-muted-foreground hover:text-gold transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
            <ThemeToggle />
            <Link href="/search" className="p-2 text-muted-foreground hover:text-gold transition-colors">
              <SearchIcon />
            </Link>

            {/* Desktop auth */}
            {!loading && (
              user ? (
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 hover:border-gold/60 transition-all"
                  >
                    <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center">
                      <span className="text-xs text-gold font-bold">{(user.fullName || user.username)[0].toUpperCase()}</span>
                    </div>
                    <span className="text-xs text-foreground max-w-24 truncate">{user.fullName || user.username}</span>
                    <ChevronDown />
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-500"
                      >
                        <div className="p-2 border-b border-border">
                          <p className="text-xs text-foreground px-2 py-1 truncate">{user.email}</p>
                        </div>
                        <div className="p-1">
                          <Link href="/profile" onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors">
                            Hồ sơ của tôi
                          </Link>
                          <button onClick={() => { logout(); setUserMenuOpen(false); }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                            Đăng xuất
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/auth" className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gold/50 text-gold hover:bg-gold/10 rounded-full transition-all">
                  <UserIcon />
                  Đăng nhập
                </Link>
              )
            )}

            <button className="md:hidden p-2 text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Secondary bar */}
      <div className="hidden md:block bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-center gap-1">
            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className={`relative px-5 py-3.5 font-body text-sm tracking-wide transition-colors flex items-center gap-1.5 ${categoryOpen ? "text-gold" : "text-muted-foreground hover:text-foreground"}`}
            >
              Chu De
              <motion.span animate={{ rotate: categoryOpen ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown /></motion.span>
              {categoryOpen && <motion.div layoutId="activeTab" className="absolute bottom-0 left-2 right-2 h-0.5 gold-gradient rounded-full" />}
            </button>
            {[
              { label: "Blog", href: "/blog" },
              { label: "Khai Thị", href: "/khai-thi" },
              { label: "Kinh Điển", href: "/category/kinh-dien" },
              { label: "Pháp Học", href: "/category/phap-hoc" },
              { label: "Hỏi Đáp", href: "/category/hoi-dap" },
              { label: "Cảm Ngộ", href: "/category/cam-ngo" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-5 py-3.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Category mega panel */}
      <AnimatePresence>
        {categoryOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/20" onClick={() => setCategoryOpen(false)} />
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative z-40 overflow-hidden border-b border-border bg-card/98 backdrop-blur-md shadow-2xl"
            >
              <CategoryNav onClose={() => setCategoryOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>

      {userMenuOpen && <div className="fixed inset-0 z-30" onClick={() => setUserMenuOpen(false)} />}
    </header>
  );
};

export default Header;
