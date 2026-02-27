// ─────────────────────────────────────────────────────────────
//  POST /api/auth/login — Login với Strapi
// ─────────────────────────────────────────────────────────────
import { cookies } from 'next/headers'

interface LoginRequestBody {
  email: string
  password: string
}

interface StrapiAuthResponse {
  jwt: string
  user: {
    id: number
    username: string
    email: string
    confirmed: boolean
  }
}

interface StrapiErrorResponse {
  error: {
    status: number
    name: string
    message: string
  }
}

export async function POST(req: Request) {
  try {
    const body: LoginRequestBody = await req.json()

    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
    const res = await fetch(`${strapiUrl}/api/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier: body.email,
        password: body.password,
      }),
    })

    const data: StrapiAuthResponse | StrapiErrorResponse = await res.json()

    if (!res.ok) {
      const error = data as StrapiErrorResponse
      return Response.json(
        { error: error.error.message || 'Đăng nhập thất bại' },
        { status: res.status }
      )
    }

    const auth = data as StrapiAuthResponse
    const cookieStore = await cookies()
    cookieStore.set('auth_token', auth.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return Response.json({
      success: true,
      user: auth.user,
    })
  } catch (err) {
    console.error('Login error:', err)
    return Response.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
