'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/contexts/auth-context";
import { AuthLoading } from "@/components/ui/auth-loading";
import Image from 'next/image';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return <AuthLoading message="Loading application..." />;
  }

  if (user) {
    return null; // Will redirect to dashboard
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <main className="flex flex-col gap-8 row-start-2 items-center text-center">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            Welcome to <span className="text-primary">AuthApp</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A flexible authentication boilerplate that works with PocketBase, Firebase, and Supabase
          </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button
            size="lg"
            onClick={() => router.push('/auth/login')}
            className="w-full sm:w-auto"
          >
            Sign In
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push('/auth/register')}
            className="w-full sm:w-auto"
          >
            Create Account
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
          <div className="p-6 border rounded-lg space-y-2">
            <h3 className="font-semibold">🔐 Multi-Backend</h3>
            <p className="text-sm text-muted-foreground">
              Works with PocketBase, Firebase, and Supabase out of the box
            </p>
          </div>
          <div className="p-6 border rounded-lg space-y-2">
            <h3 className="font-semibold">🎨 Modern UI</h3>
            <p className="text-sm text-muted-foreground">
              Clean interface built with Tailwind CSS and shadcn/ui
            </p>
          </div>
          <div className="p-6 border rounded-lg space-y-2">
            <h3 className="font-semibold">📱 Responsive</h3>
            <p className="text-sm text-muted-foreground">
              Perfect on desktop, tablet, and mobile devices
            </p>
          </div>
        </div>
      </main>
            
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
