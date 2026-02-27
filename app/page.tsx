import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PhaoBaoSection from "@/components/PhaoBaoSection";
import ActionCards from "@/components/ActionCards";
import AboutSection from "@/components/AboutSection";
import ContentFeeds from "@/components/ContentFeeds";
import AwardsSection from "@/components/AwardsSection";
import NewsletterSignup from "@/components/NewsletterSignup";
import Footer from "@/components/Footer";
import StickyBanner from "@/components/StickyBanner";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <div className="zen-divider max-w-xs mx-auto" />
        <PhaoBaoSection />
        <div className="zen-divider max-w-xs mx-auto" />
        <ActionCards />
        <div className="zen-divider max-w-xs mx-auto" />
        <AboutSection />
        <div className="zen-divider max-w-xs mx-auto" />
        <AwardsSection />
        <div className="zen-divider max-w-xs mx-auto" />
        <ContentFeeds />
        <div className="zen-divider max-w-xs mx-auto" />
        <NewsletterSignup />
      </main>
      <Footer />
      <StickyBanner />
    </div>
  );
}
