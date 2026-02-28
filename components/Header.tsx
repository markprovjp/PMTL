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
    <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const NavDropdown = ({ label, items, isOpen, onToggle, onClose }: {
  label: string;
  items: { label: string; href: string }[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) => (
  <div className="relative group">
    <button
      onClick={onToggle}
      className={`px-3 py-2.5 text-xs font-medium tracking-wide transition-colors flex items-center gap-1.5 ${isOpen ? "text-gold" : "text-muted-foreground hover:text-gold"}`}
    >
      {label}
      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown /></motion.span>
    </button>
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 mt-1 w-48 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-40"
          >
            <div className="p-1">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="block px-4 py-2 text-xs text-muted-foreground hover:text-gold hover:bg-secondary rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </div>
);

const MobileMenu = ({ onClose }: { onClose: () => void }) => {
  const { user, logout } = useAuth();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const sections = [
    {
      id: 'tu-hoc',
      label: "Tu Học",
      items: [
        { label: "Hướng Dẫn Sơ Học", href: "/beginner-guide" },
        { label: "Hỏi Đáp Phật Học", href: "/qa" },
        { label: "Thư Viện Kinh Sách", href: "/library" },
        { label: "Phim Truyện & Video", href: "/videos" },
        { label: "Đài Phát Thanh", href: "/radio" },
        { label: "Danh Bạ Toàn Cầu", href: "/directory" },
      ]
    },
    {
      id: 'cong-dong',
      label: "Cộng Đồng",
      items: [
        { label: "Sự Kiện & Pháp Hội", href: "/events" },
      ]
    },
  ];

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
          <Image
            src="/images/logoo.png"
            alt="Phap Mon Tam Linh"
            width={160}
            height={50}
            className="h-10 w-auto object-contain"
            unoptimized
          />
        </Link>
        <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground">
          <CloseIcon />
        </button>
      </div>
      <nav className="p-6 space-y-2">
        {user ? (
          <div className="flex items-center justify-between py-3 mb-4 border-b border-border">
            <Link href="/profile" onClick={onClose} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="font-display text-sm text-gold">{(user.fullName || user.username)[0].toUpperCase()}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{user.fullName || user.username}</p>
                <p className="text-xs text-muted-foreground">Xem hồ sơ</p>
              </div>
            </Link>
            <button onClick={() => { logout(); onClose(); }} className="text-xs text-red-400">Đăng xuất</button>
          </div>
        ) : (
          <Link href="/auth" onClick={onClose} className="flex items-center justify-center gap-2 w-full py-3 mb-6 border border-gold/50 text-gold rounded-lg text-sm font-medium">
            <UserIcon /> Đăng nhập / Đăng ký
          </Link>
        )}

        <Link href="/" onClick={onClose} className="block py-3 px-2 text-base font-display text-foreground border-b border-border/50">
          Trang Chủ
        </Link>

        <Link href="/blog" onClick={onClose} className="block py-3 px-2 text-base font-display text-foreground border-b border-border/50">
          Khai Thị (Blog)
        </Link>

        <Link href="/lunar-calendar" onClick={onClose} className="block py-3 px-2 text-base font-display text-foreground border-b border-border/50">
          Lịch Tu Học
        </Link>

        <Link href="/shares" onClick={onClose} className="block py-3 px-2 text-base font-display text-foreground border-b border-border/50">
          Diễn Đàn Đồng Tu
        </Link>

        {sections.map((s) => (
          <div key={s.id} className="border-b border-border/50">
            <button
              onClick={() => setOpenSection(openSection === s.id ? null : s.id)}
              className="w-full flex items-center justify-between py-4 px-2 text-left font-display text-base text-foreground"
            >
              {s.label}
              <motion.span animate={{ rotate: openSection === s.id ? 180 : 0 }}><ChevronDown /></motion.span>
            </button>
            <AnimatePresence>
              {openSection === s.id && (
                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden pl-4 pb-2">
                  {s.items.map((item) => (
                    <Link key={item.href} href={item.href} onClick={onClose} className="block py-2.5 text-sm text-muted-foreground hover:text-gold">
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        <div className="border-b border-border/50">
          <button onClick={() => setOpenSection(openSection === 'khai-thi' ? null : 'khai-thi')} className="w-full flex items-center justify-between py-4 px-2 text-left font-display text-base text-gold">
            Chủ Đề Khai Thị
            <motion.span animate={{ rotate: openSection === 'khai-thi' ? 180 : 0 }}><ChevronDown /></motion.span>
          </button>
          <AnimatePresence>
            {openSection === 'khai-thi' && (
              <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden pb-4">
                <CategoryNavMobile onClose={onClose} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link href="/donations" onClick={onClose} className="block py-4 px-2 text-base font-display text-foreground">
          Hộ Trì Phật Pháp
        </Link>
      </nav>
    </motion.div>
  );
};

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  const groups = {
    tuHoc: [
      { label: "Hướng Dẫn Sơ Học", href: "/beginner-guide" },
      { label: "Hỏi Đáp Phật Học", href: "/qa" },
      { label: "Thư Viện Kinh Sách", href: "/library" },
      { label: "Phim Truyện & Video", href: "/videos" },
      { label: "Đài Phát Thanh", href: "/radio" },
      { label: "Danh Bạ Toàn Cầu", href: "/directory" },
    ],
    congDong: [
      { label: "Sự Kiện & Pháp Hội", href: "/events" },
    ]
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="relative z-[60] bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Image
                src="/images/logoo.png"
                alt="Phap Mon Tam Linh"
                width={200}
                height={60}
                className="h-12 w-auto object-contain"
                unoptimized
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/" className="px-3 py-2.5 text-xs font-medium text-muted-foreground hover:text-gold transition-colors">
                Trang Chủ
              </Link>

              <Link href="/blog" className="px-3 py-2.5 text-xs font-medium text-muted-foreground hover:text-gold transition-colors">
                Khai Thị (Blog)
              </Link>

              <Link href="/lunar-calendar" className="px-3 py-2.5 text-xs font-medium text-muted-foreground hover:text-gold transition-colors">
                Lịch Tu Học
              </Link>

              <Link href="/shares" className="px-3 py-2.5 text-xs font-medium text-muted-foreground hover:text-gold transition-colors">
                Diễn Đàn Đồng Tu
              </Link>

              <NavDropdown
                label="Tu Học"
                items={groups.tuHoc}
                isOpen={activeDropdown === 'tuHoc'}
                onToggle={() => setActiveDropdown(activeDropdown === 'tuHoc' ? null : 'tuHoc')}
                onClose={() => setActiveDropdown(null)}
              />

              <button
                onClick={() => { setCategoryOpen(!categoryOpen); setActiveDropdown(null); }}
                className={`px-3 py-2.5 text-xs font-medium tracking-wide transition-colors flex items-center gap-1.5 ${categoryOpen ? "text-gold" : "text-muted-foreground hover:text-gold"}`}
              >
                Khai Thị
                <motion.span animate={{ rotate: categoryOpen ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown /></motion.span>
              </button>

              <NavDropdown
                label="Cộng Đồng"
                items={groups.congDong}
                isOpen={activeDropdown === 'congDong'}
                onToggle={() => setActiveDropdown(activeDropdown === 'congDong' ? null : 'congDong')}
                onClose={() => setActiveDropdown(null)}
              />

              <Link href="/donations" className="px-3 py-2.5 text-xs font-medium text-muted-foreground hover:text-gold transition-colors">
                Hộ Trì
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/search" className="p-2 text-muted-foreground hover:text-gold transition-colors">
              <SearchIcon />
            </Link>

            {!loading && (
              user ? (
                <div className="relative hidden md:block">
                  <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 hover:border-gold/60 transition-all">
                    <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center">
                      <span className="text-xs text-gold font-bold">{(user.fullName || user.username)[0].toUpperCase()}</span>
                    </div>
                    <span className="text-xs text-foreground max-w-24 truncate">{user.fullName || user.username}</span>
                    <ChevronDown />
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-[100]">
                        <div className="p-2 border-b border-border"><p className="text-xs text-foreground px-2 py-1 truncate">{user.email}</p></div>
                        <div className="p-1">
                          <Link href="/profile" onClick={() => setUserMenuOpen(false)} className="block px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors">Hồ sơ của tôi</Link>
                          <button onClick={() => { logout(); setUserMenuOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">Đăng xuất</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/auth" className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gold/50 text-gold hover:bg-gold/10 rounded-full transition-all">
                  <UserIcon /> Đăng nhập
                </Link>
              )
            )}

            <button className="md:hidden p-2 text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {categoryOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setCategoryOpen(false)} />
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="absolute left-0 right-0 top-full z-[45] overflow-hidden border-b border-border bg-card shadow-2xl">
              <CategoryNav onClose={() => setCategoryOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>{mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}</AnimatePresence>
      {userMenuOpen && <div className="fixed inset-0 z-50" onClick={() => setUserMenuOpen(false)} />}
    </header>
  );
};

export default Header;
