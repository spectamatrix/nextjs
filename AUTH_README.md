# Authentication Boilerplate

A flexible authentication boilerplate for Next.js applications that supports multiple backends (PocketBase, Firebase, Supabase) with a consistent API and UI.

## Features

- 🔐 **Multi-backend Support**: Works with PocketBase, Firebase, and Supabase
- 🎨 **Consistent UI**: Clean, modern interface with Tailwind CSS and shadcn/ui
- 🔄 **Easy Switching**: Change backends with just environment variables
- 📱 **Responsive Design**: Works perfectly on all devices
- 🛡️ **Protected Routes**: Built-in route protection components
- 👤 **User Management**: Profile, settings, and password reset
- 🌙 **Dark Mode**: Built-in theme switching
- 📊 **Dashboard**: Example dashboard with user context

## Quick Start

### 1. Environment Setup

Copy the environment example file:

```bash
cp .env.example .env.local
```

Configure your authentication provider:

```env
# Choose your provider: pocketbase, firebase, or supabase
NEXT_PUBLIC_AUTH_PROVIDER=pocketbase

# PocketBase (default)
NEXT_PUBLIC_AUTH_API_URL=http://localhost:8090

# Firebase (uncomment if using)
# NEXT_PUBLIC_AUTH_API_KEY=your_firebase_api_key
# NEXT_PUBLIC_AUTH_PROJECT_ID=your_firebase_project_id

# Supabase (uncomment if using)
# NEXT_PUBLIC_AUTH_API_URL=https://your-project.supabase.co
# NEXT_PUBLIC_AUTH_API_KEY=your_supabase_anon_key
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Start Development Server

```bash
pnpm dev
```

## Backend Setup

### PocketBase (Default)

1. Download PocketBase from [pocketbase.io](https://pocketbase.io/docs/)
2. Run PocketBase:
   ```bash
   ./pocketbase serve
   ```
3. Access admin panel at http://127.0.0.1:8090/_/
4. Create a `users` collection with these fields:
   - `email` (Email)
   - `password` (Password)
   - `name` (Text, optional)
   - `avatar` (File, optional)
   - `verified` (Bool, optional)

### Firebase

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication and configure sign-in methods
3. Get your project configuration from Project Settings
4. Update your `.env.local` with Firebase credentials
5. Implement Firebase methods in `/lib/auth.ts` (currently placeholder)

### Supabase

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Enable Authentication in the dashboard
3. Get your project URL and anon key from Settings > API
4. Update your `.env.local` with Supabase credentials
5. Implement Supabase methods in `/lib/auth.ts` (currently placeholder)

## Usage

### Authentication Context

The app provides a global authentication context:

```tsx
import { useAuth } from '@/contexts/auth-context';

function MyComponent() {
  const { user, loading, signIn, signOut } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in</div>;
  
  return <div>Welcome, {user.name}!</div>;
}
```

### Protected Routes

Wrap components that require authentication:

```tsx
import { ProtectedRoute } from '@/components/ui/protected-route';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>Protected content here</div>
    </ProtectedRoute>
  );
}
```

### Public Only Routes

For pages that should only be accessible to non-authenticated users:

```tsx
import { PublicOnlyRoute } from '@/components/ui/protected-route';

export default function LoginPage() {
  return (
    <PublicOnlyRoute>
      <LoginForm />
    </PublicOnlyRoute>
  );
}
```

### User Menu

Add a user menu to your components:

```tsx
import { UserMenu } from '@/components/ui/user-menu';

function Header() {
  return (
    <header>
      <UserMenu />
    </header>
  );
}
```

## File Structure

```
lib/
├── auth-config.ts       # Configuration and types
└── auth.ts             # Authentication service implementations

contexts/
└── auth-context.tsx    # React context for auth state

components/
├── login-form.tsx      # Login form component
├── register-form.tsx   # Registration form component
└── ui/
    ├── protected-route.tsx  # Route protection components
    ├── user-menu.tsx       # User dropdown menu
    └── auth-loading.tsx    # Loading component

app/
├── auth/
│   ├── login/page.tsx     # Login page
│   └── register/page.tsx  # Registration page
├── dashboard/page.tsx     # Protected dashboard
├── profile/page.tsx       # User profile page
└── settings/page.tsx      # User settings page
```

## Customization

### Adding New Auth Methods

1. Create a new class implementing `AuthMethods` interface in `/lib/auth.ts`
2. Add your provider to the `AuthProvider` type in `/lib/auth-config.ts`
3. Update the factory function in `createAuthService`

### Styling

The UI uses Tailwind CSS and shadcn/ui components. Customize by:

1. Modifying component styles in `/components`
2. Updating the Tailwind config
3. Customizing shadcn/ui theme in `/app/globals.css`

### Adding User Fields

1. Update the `User` interface in `/lib/auth-config.ts`
2. Modify auth service methods to handle new fields
3. Update forms and profile pages as needed

## API Reference

### Auth Service Methods

```typescript
interface AuthMethods {
  signUp(email: string, password: string, userData?: Record<string, any>): Promise<AuthResponse>;
  signIn(email: string, password: string): Promise<AuthResponse>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  resetPassword(email: string): Promise<{ error?: string }>;
  updateProfile(userData: Partial<User>): Promise<AuthResponse>;
}
```

### Auth Context

```typescript
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, userData?: Record<string, any>) => Promise<AuthResponse>;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  updateProfile: (userData: Partial<User>) => Promise<AuthResponse>;
  refresh: () => Promise<void>;
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
