import { LoginForm } from "@/components/login-form";
import { PublicOnlyRoute } from "@/components/ui/protected-route";

export default function LoginPage() {
  return (
    <PublicOnlyRoute>
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <LoginForm />
        </div>
      </div>
    </PublicOnlyRoute>
  );
}