import { cookies } from 'next/headers';

export async function requireAdmin() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin-session');

  if (!adminSession?.value) {
    throw new Error('Admin access required');
  }

  // Return a simple admin user object
  return {
    email: 'admin@jacksonvillehomepros.com',
    role: 'ADMIN'
  };
}