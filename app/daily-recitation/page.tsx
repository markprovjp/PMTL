'use client'

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyBanner from "@/components/StickyBanner";
import DailyRecitationSteps from "@/components/DailyRecitationSteps";
import DailyRecitationQA from "@/components/DailyRecitationQA";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function DailyRecitationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-12 pb-12">
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-6 mb-8">
          <nav className="flex items-center text-sm text-muted-foreground/80 space-x-2">
            <Link href="/" className="hover:text-gold transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" /> <span>Trang Chủ</span>
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/beginner-guide" className="hover:text-gold transition-colors">
              Tu Học
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Kinh Bài Tập Hằng Ngày</span>
          </nav>
        </div>

        {/* Nội dung trang */}
        <DailyRecitationSteps />
        <DailyRecitationQA />
      </main>

      <Footer />
      <StickyBanner />
    </div>
  );
}
