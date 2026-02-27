'use client'
// ─────────────────────────────────────────────────────────────
//  contexts/AuthContext.tsx
//  Global auth state — reads JWT from localStorage, calls Strapi /users/me
// ─────────────────────────────────────────────────────────────
import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
const TOKEN_KEY = 'auth_token'

export interface AuthUser {
  id: number
  documentId?: string
  username: string
  email: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
  // extended fields (if added in Strapi)
  fullName?: string
  avatar?: { url: string } | null
  phone?: string | null
  address?: string | null
  bio?: string | null
  dharmaName?: string | null
}

interface AuthContextValue {
  user: AuthUser | null
  token: string | null
  loading: boolean
  login: (jwt: string, user: AuthUser) => void
  logout: () => void
  refetch: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  token: null,
  loading: true,
  login: () => {},
  logout: () => {},
  refetch: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchMe = useCallback(async (jwt: string) => {
    try {
      const res = await fetch(`${STRAPI_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      if (!res.ok) throw new Error('token invalid')
      const data: AuthUser = await res.json()
      setUser(data)
      setToken(jwt)
    } catch {
      localStorage.removeItem(TOKEN_KEY)
      setUser(null)
      setToken(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // On mount — restore session from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY)
    if (stored) {
      fetchMe(stored)
    } else {
      setLoading(false)
    }
  }, [fetchMe])

  const login = useCallback((jwt: string, userData: AuthUser) => {
    localStorage.setItem(TOKEN_KEY, jwt)
    setToken(jwt)
    setUser(userData)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setUser(null)
  }, [])

  const refetch = useCallback(async () => {
    const stored = localStorage.getItem(TOKEN_KEY)
    if (stored) await fetchMe(stored)
  }, [fetchMe])

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, refetch }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
