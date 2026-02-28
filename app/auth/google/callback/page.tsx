'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import Image from 'next/image'

function CallbackHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const id_token = searchParams.get('id_token')
    const access_token = searchParams.get('access_token')
    // Strapi sometimes puts the JWT directly in the URL if handled as a provider callback redirect
    // but usually we need to call /api/auth/google/callback with the access_token

    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'

    const handleGoogleAuth = async () => {
      try {
        // Exchange the access_token for a Strapi JWT
        const res = await fetch(`${STRAPI_URL}/api/auth/google/callback?access_token=${access_token}`)
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error?.message || 'Authentication failed')
        }

        if (data.jwt && data.user) {
          login(data.jwt, data.user)
          router.push('/')
        } else {
          throw new Error('No user data returned from server')
        }
      } catch (err) {
        console.error('Auth error:', err)
        setError(err instanceof Error ? err.message : 'An error occurred during login')
      }
    }

    if (access_token) {
      handleGoogleAuth()
    } else {
      // If we got here without a token, something is wrong
      setError('No authentication token found.')
    }
  }, [searchParams, login, router])

  if (error) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        <h2 className="text-xl font-display text-foreground">Xác thực thất bại</h2>
        <p className="text-sm text-red-400 max-w-xs mx-auto">{error}</p>
        <button
          onClick={() => router.push('/auth')}
          className="px-6 py-2 bg-gold text-black rounded-full text-sm font-medium"
        >
          Thử lại
        </button>
      </div>
    )
  }

  return (
    <div className="text-center space-y-8">
      <div className="relative w-32 h-32 mx-auto">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[0] border-[3px] border-gold border-t-transparent rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image
            src="/images/logoo.png"
            alt="Logo"
            width={64}
            height={64}
            className="opacity-70 object-contain drop-shadow-md"
          />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-display text-foreground mb-2">Đang hoàn tất đăng nhập</h2>
        <p className="text-base text-muted-foreground animate-pulse">Vui lòng đợi trong giây lát...</p>
      </div>
    </div>
  )
}

export default function GoogleCallbackPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <Suspense fallback={<div>Đang tải...</div>}>
        <CallbackHandler />
      </Suspense>
    </div>
  )
}
