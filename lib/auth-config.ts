export type AuthProvider = 'pocketbase' | 'firebase' | 'supabase';

export interface AuthConfig {
  provider: AuthProvider;
  apiUrl?: string;
  apiKey?: string;
  projectId?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  verified?: boolean;
  metadata?: Record<string, any>;
}

export interface AuthResponse {
  user: User | null;
  token?: string;
  error?: string;
}

export interface AuthMethods {
  signUp: (email: string, password: string, userData?: Record<string, any>) => Promise<AuthResponse>;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  getCurrentUser: () => Promise<User | null>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  updateProfile: (userData: Partial<User>) => Promise<AuthResponse>;
}

// Environment configuration
export const getAuthConfig = (): AuthConfig => {
  const provider = (process.env.NEXT_PUBLIC_AUTH_PROVIDER as AuthProvider) || 'pocketbase';
  
  return {
    provider,
    apiUrl: process.env.NEXT_PUBLIC_AUTH_API_URL,
    apiKey: process.env.NEXT_PUBLIC_AUTH_API_KEY,
    projectId: process.env.NEXT_PUBLIC_AUTH_PROJECT_ID,
  };
};