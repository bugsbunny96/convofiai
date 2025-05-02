import { cookies } from 'next/headers';

export const getAuthToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('auth-token')?.value;
};

export const setAuthToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
};

export const removeAuthToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
};

export const isAuthenticated = async () => {
  const token = await getAuthToken();
  return !!token;
};