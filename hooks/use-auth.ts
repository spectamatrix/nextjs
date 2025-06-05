'use client';

import { useAuth as useAuthContext } from '@/contexts/auth-context';

export function useAuth() {
  return useAuthContext();
}

export function useRequireAuth() {
  const auth = useAuthContext();
  
  if (!auth.user) {
    throw new Error('This component requires authentication');
  }
  
  return {
    ...auth,
    user: auth.user, // TypeScript knows user is not null here
  };
}
