// ─────────────────────────────────────────────────────────────
//  POST /api/auth/register — Đăng ký với Strapi
// ─────────────────────────────────────────────────────────────
import { cookies } from 'next/headers'

interface RegisterRequestBody {
  username: string
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
    const body: RegisterRequestBody = await req.json()

    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
    const res = await fetch(`${strapiUrl}/api/auth/local/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: body.username,
        email: body.email,
        password: body.password,
      }),
    })

    const data: StrapiAuthResponse | StrapiErrorResponse = await res.json()

    if (!res.ok) {
      const error = data as StrapiErrorResponse
      return Response.json(
        { error: error.error.message || 'Đăng ký thất bại' },
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
    console.error('Register error:', err)
    return Response.json({ error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
