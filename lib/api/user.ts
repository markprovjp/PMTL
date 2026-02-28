// ─────────────────────────────────────────────────────────────
//  fe-pmtl/lib/api/user.ts
//  API client cho profile: Xử lý upload và cập nhật quan hệ Media
// ─────────────────────────────────────────────────────────────

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'

function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

/**
 * Cập nhật thông tin: Lưu tên, bio... HOẶC truyền ID của Media vào avatar_url
 */
export async function updateMe(data: Record<string, any>): Promise<unknown> {
  const token = getToken()
  const res = await fetch(`${API_URL}/api/users/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ data }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || 'Cập nhật thất bại')
  }
  return res.json()
}

/**
 * Upload và trả về toàn bộ Object Media (có ID để lưu vào User)
 */
export async function uploadAvatarFile(file: File): Promise<{ id: number, url: string }> {
  const token = getToken()
  const form = new FormData()
  form.append('files', file)

  const res = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: form,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || 'Upload thất bại')
  }
  const data = await res.json()
  const uploaded = Array.isArray(data) ? data[0] : data

  // Trả về cả ID và URL để Frontend vừa xem được ngay vừa lưu được vào DB
  return {
    id: uploaded.id,
    url: uploaded.url.startsWith('http') ? uploaded.url : `${API_URL}${uploaded.url}`
  }
}
