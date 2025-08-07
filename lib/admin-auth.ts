import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret'

export interface AdminUser {
  id: string
  email: string
  name: string
  role: string
}

export async function getAdminSession(): Promise<AdminUser | null> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('admin-session')?.value

    if (!token) {
      return null
    }

    const decoded = verify(token, JWT_SECRET) as AdminUser
    return decoded
  } catch (error) {
    console.error('Admin session verification error:', error)
    return null
  }
}

export async function requireAdmin(): Promise<AdminUser> {
  const user = await getAdminSession()
  if (!user || user.role !== 'ADMIN') {
    throw new Error('Admin access required')
  }
  return user
}
