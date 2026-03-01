// ─────────────────────────────────────────────────────────────
//  app/page.tsx — Server Component
//  Fetch dữ liệu động từ Strapi CMS → truyền props vào các section
// ─────────────────────────────────────────────────────────────

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PhaoBaoSection from "@/components/PhaoBaoSection";
import ActionCards from "@/components/ActionCards";
import AboutSection from "@/components/AboutSection";
import HallGallery from "@/components/HallGallery";
import VideoSection from "@/components/VideoSection";
import SearchDirectory from "@/components/SearchDirectory";
import ContentFeeds from "@/components/ContentFeeds";
import AwardsSection from "@/components/AwardsSection";
import RegisterSection from "@/components/RegisterSection";
import NewsletterSignup from "@/components/NewsletterSignup";
import Footer from "@/components/Footer";
import StickyBanner from "@/components/StickyBanner";

import {
  getHomepageSettings,
  FALLBACK_HERO_SLIDES,
  FALLBACK_STATS,
  FALLBACK_PHAP_BAO,
  FALLBACK_ACTION_CARDS,
  FALLBACK_VIDEOS,
  FALLBACK_AWARDS,
  FALLBACK_GALLERY,
  FALLBACK_SEARCH_CATEGORIES,
  FALLBACK_STICKY_BANNER,
} from "@/lib/api/homepage";

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  // Fetch dữ liệu trang chủ từ CMS — fallback nếu CMS chưa có data
  const settings = await getHomepageSettings()

  const heroSlides = settings?.heroSlides ?? FALLBACK_HERO_SLIDES
  const stats = settings?.stats ?? FALLBACK_STATS
  const phapBao = settings?.phapBao ?? FALLBACK_PHAP_BAO
  const actionCards = settings?.actionCards ?? FALLBACK_ACTION_CARDS
  const featuredVideos = settings?.featuredVideos ?? FALLBACK_VIDEOS
  const awards = settings?.awards ?? FALLBACK_AWARDS
  const gallerySlides = settings?.gallerySlides ?? FALLBACK_GALLERY
  const searchCategories = settings?.searchCategories ?? FALLBACK_SEARCH_CATEGORIES
  const stickyBanner = settings?.stickyBanner ?? FALLBACK_STICKY_BANNER

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero slideshow 3 ảnh */}
        <HeroSection slides={heroSlides} stats={stats} />
        <div className="zen-divider max-w-xs mx-auto" />

        {/* 5 Đại Pháp Bảo */}
        <PhaoBaoSection items={phapBao} />
        <div className="zen-divider max-w-xs mx-auto" />

        {/* 3 card hành động nhanh */}
        <ActionCards cards={actionCards} />
        <div className="zen-divider max-w-xs mx-auto" />

        {/* Giới thiệu Pháp Môn & Đài Trưởng */}
        <AboutSection />
        <div className="zen-divider max-w-xs mx-auto" />

        {/* Slideshow hội trường trang nghiêm */}
        <HallGallery slides={gallerySlides} />
        <div className="zen-divider max-w-xs mx-auto" />

        {/* 3 Video giới thiệu quan trọng */}
        <VideoSection videos={featuredVideos} />
        <div className="zen-divider max-w-xs mx-auto" />

        {/* 22 Danh mục Tra Cứu */}
        <SearchDirectory categories={searchCategories} />
        <div className="zen-divider max-w-xs mx-auto" />

        {/* Khai thị mới nhất & Chuyện Phật Pháp */}
        <ContentFeeds />
        <div className="zen-divider max-w-xs mx-auto" />

        {/* Giải thưởng quốc tế */}
        <AwardsSection awards={awards} />
        <div className="zen-divider max-w-xs mx-auto" />

        {/* Đăng ký thỉnh Pháp Bảo miễn phí */}
        <RegisterSection />
        <div className="zen-divider max-w-xs mx-auto" />

        {/* Bản tin Phật pháp */}
        <NewsletterSignup />
      </main>
      <Footer />
      <StickyBanner config={stickyBanner} />
    </div>
  );
}
