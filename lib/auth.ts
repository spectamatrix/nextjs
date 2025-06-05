import { AuthConfig, AuthMethods, AuthResponse, User, getAuthConfig } from './auth-config';

// PocketBase implementation
class PocketBaseAuth implements AuthMethods {
  private apiUrl: string;

  constructor(config: AuthConfig) {
    this.apiUrl = config.apiUrl || 'http://localhost:8090';
  }

  async signUp(email: string, password: string, userData?: Record<string, any>): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.apiUrl}/api/collections/users/records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          passwordConfirm: password,
          ...userData,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { user: null, error: data.message || 'Sign up failed' };
      }

      return { 
        user: {
          id: data.id,
          email: data.email,
          name: data.name,
          avatar: data.avatar,
          verified: data.verified,
          metadata: data,
        }
      };
    } catch (error) {
      return { user: null, error: 'Network error' };
    }
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.apiUrl}/api/collections/users/auth-with-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity: email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { user: null, error: data.message || 'Sign in failed' };
      }

      // Store token
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', data.token);
      }

      return {
        user: {
          id: data.record.id,
          email: data.record.email,
          name: data.record.name,
          avatar: data.record.avatar,
          verified: data.record.verified,
          metadata: data.record,
        },
        token: data.token,
      };
    } catch (error) {
      return { user: null, error: 'Network error' };
    }
  }

  async signOut(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      if (typeof window === 'undefined') return null;
      
      const token = localStorage.getItem('auth_token');
      if (!token) return null;

      const response = await fetch(`${this.apiUrl}/api/collections/users/auth-refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        localStorage.removeItem('auth_token');
        return null;
      }

      const data = await response.json();
      return {
        id: data.record.id,
        email: data.record.email,
        name: data.record.name,
        avatar: data.record.avatar,
        verified: data.record.verified,
        metadata: data.record,
      };
    } catch (error) {
      return null;
    }
  }

  async resetPassword(email: string): Promise<{ error?: string }> {
    try {
      const response = await fetch(`${this.apiUrl}/api/collections/users/request-password-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        return { error: data.message || 'Password reset failed' };
      }

      return {};
    } catch (error) {
      return { error: 'Network error' };
    }
  }

  async updateProfile(userData: Partial<User>): Promise<AuthResponse> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return { user: null, error: 'Not authenticated' };

      const currentUser = await this.getCurrentUser();
      if (!currentUser) return { user: null, error: 'Not authenticated' };

      const response = await fetch(`${this.apiUrl}/api/collections/users/records/${currentUser.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return { user: null, error: data.message || 'Update failed' };
      }

      return {
        user: {
          id: data.id,
          email: data.email,
          name: data.name,
          avatar: data.avatar,
          verified: data.verified,
          metadata: data,
        }
      };
    } catch (error) {
      return { user: null, error: 'Network error' };
    }
  }
}

// Firebase implementation
class FirebaseAuth implements AuthMethods {
  private config: AuthConfig;

  constructor(config: AuthConfig) {
    this.config = config;
  }

  async signUp(email: string, password: string, userData?: Record<string, any>): Promise<AuthResponse> {
    // Firebase implementation would go here
    // For now, return a placeholder
    return { user: null, error: 'Firebase implementation needed' };
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    // Firebase implementation would go here
    return { user: null, error: 'Firebase implementation needed' };
  }

  async signOut(): Promise<void> {
    // Firebase implementation would go here
  }

  async getCurrentUser(): Promise<User | null> {
    // Firebase implementation would go here
    return null;
  }

  async resetPassword(email: string): Promise<{ error?: string }> {
    // Firebase implementation would go here
    return { error: 'Firebase implementation needed' };
  }

  async updateProfile(userData: Partial<User>): Promise<AuthResponse> {
    // Firebase implementation would go here
    return { user: null, error: 'Firebase implementation needed' };
  }
}

// Supabase implementation
class SupabaseAuth implements AuthMethods {
  private config: AuthConfig;

  constructor(config: AuthConfig) {
    this.config = config;
  }

  async signUp(email: string, password: string, userData?: Record<string, any>): Promise<AuthResponse> {
    // Supabase implementation would go here
    return { user: null, error: 'Supabase implementation needed' };
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    // Supabase implementation would go here
    return { user: null, error: 'Supabase implementation needed' };
  }

  async signOut(): Promise<void> {
    // Supabase implementation would go here
  }

  async getCurrentUser(): Promise<User | null> {
    // Supabase implementation would go here
    return null;
  }

  async resetPassword(email: string): Promise<{ error?: string }> {
    // Supabase implementation would go here
    return { error: 'Supabase implementation needed' };
  }

  async updateProfile(userData: Partial<User>): Promise<AuthResponse> {
    // Supabase implementation would go here
    return { user: null, error: 'Supabase implementation needed' };
  }
}

// Auth service factory
export const createAuthService = (config?: AuthConfig): AuthMethods => {
  const authConfig = config || getAuthConfig();

  switch (authConfig.provider) {
    case 'firebase':
      return new FirebaseAuth(authConfig);
    case 'supabase':
      return new SupabaseAuth(authConfig);
    case 'pocketbase':
    default:
      return new PocketBaseAuth(authConfig);
  }
};

// Default export
export const auth = createAuthService();