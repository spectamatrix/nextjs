import { RegisterForm } from "@/components/register-form";
import { PublicOnlyRoute } from "@/components/ui/protected-route";

export default function RegisterPage() {
  return (
    <PublicOnlyRoute>
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <RegisterForm />
        </div>
      </div>
    </PublicOnlyRoute>
  );
}