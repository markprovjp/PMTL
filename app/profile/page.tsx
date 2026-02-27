'use client'
// ─────────────────────────────────────────────────────────────
//  /profile — User profile page
// ─────────────────────────────────────────────────────────────
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StickyBanner from '@/components/StickyBanner'
import { useAuth } from '@/contexts/AuthContext'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'

const StatCard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="bg-secondary rounded-xl p-4 text-center">
    <p className="text-2xl font-display text-gold font-bold">{value}</p>
    <p className="text-xs text-muted-foreground mt-1">{label}</p>
  </div>
)

const InfoRow = ({ label, value }: { label: string; value?: string | null }) => (
  <div className="flex items-start gap-4 py-3 border-b border-border last:border-0">
    <span className="text-xs text-muted-foreground w-32 flex-shrink-0 pt-0.5">{label}</span>
    <span className="text-sm text-foreground flex-1">{value || '—'}</span>
  </div>
)

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading, logout } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
    }
  }, [user, loading, router])

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!user) return null

  const avatarUrl = user.avatar?.url
    ? user.avatar.url.startsWith('http') ? user.avatar.url : `${STRAPI_URL}${user.avatar.url}`
    : null

  const joinDate = new Date(user.createdAt).toLocaleDateString('vi-VN', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-12">
        <div className="container mx-auto px-6 max-w-4xl">

          {/* Breadcrumb */}
          <nav className="text-xs text-muted-foreground mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-gold transition-colors">Trang chu</Link>
            <span>/</span>
            <span className="text-foreground">Ho so ca nhan</span>
          </nav>

          {/* Profile header card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl overflow-hidden mb-6"
          >
            {/* Banner */}
            <div className="h-32 bg-gradient-to-r from-gold/20 via-amber-500/10 to-transparent" />

            <div className="px-6 pb-6">
              <div className="flex items-end justify-between -mt-12 mb-4">
                {/* Avatar */}
                <div className="relative">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={user.username}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full border-4 border-card object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full border-4 border-card bg-gold/20 flex items-center justify-center">
                      <span className="font-display text-2xl text-gold">
                        {(user.fullName || user.username || user.email)[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                  {user.confirmed && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-card flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-xs border border-border text-muted-foreground hover:border-red-500/50 hover:text-red-400 rounded-lg transition-all"
                  >
                    Dang xuat
                  </button>
                </div>
              </div>

              {/* Name + username */}
              <h1 className="font-display text-2xl text-foreground">
                {user.fullName || user.username}
              </h1>
              {user.dharmaName && (
                <p className="text-sm text-gold mt-1">{user.dharmaName}</p>
              )}
              <p className="text-sm text-muted-foreground mt-0.5">@{user.username}</p>

              {user.bio && (
                <p className="text-sm text-foreground/80 mt-3 leading-relaxed max-w-xl">
                  {user.bio}
                </p>
              )}

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  Tham gia: {joinDate}
                </span>
                {user.address && (
                  <span className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {user.address}
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="grid grid-cols-3 gap-4 mb-6"
          >
            <StatCard label="Bai da doc" value={0} />
            <StatCard label="Binh luan" value={0} />
            <StatCard label="Yeu thich" value={0} />
          </motion.div>

          {/* Account info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <h2 className="font-display text-lg text-foreground mb-4">Thong tin tai khoan</h2>
            <InfoRow label="Ho va ten" value={user.fullName} />
            <InfoRow label="Phap danh" value={user.dharmaName} />
            <InfoRow label="Email" value={user.email} />
            <InfoRow label="So dien thoai" value={user.phone} />
            <InfoRow label="Dia chi" value={user.address} />
            <InfoRow label="Gioi thieu" value={user.bio} />
            <InfoRow
              label="Trang thai"
              value={user.confirmed ? 'Da xac thuc' : 'Chua xac thuc email'}
            />
          </motion.div>

        </div>
      </main>

      <Footer />
      <StickyBanner />
    </div>
  )
}
