'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/ui/protected-route';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/auth-context';
import { UserMenu } from '@/components/ui/user-menu';
import { ArrowLeft, Shield, Bell, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  const { user, resetPassword } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const router = useRouter();

  const handlePasswordReset = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await resetPassword(email);
      if (response.error) {
        setError(response.error);
      } else {
        setSuccess('Password reset email sent! Check your inbox.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8 px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-3xl font-bold">Settings</h1>
            </div>
            <UserMenu />
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            {/* Security Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <CardTitle>Security</CardTitle>
                </div>
                <CardDescription>
                  Manage your account security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert>
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <div className="grid gap-2">
                  <Label htmlFor="reset-email">Email for Password Reset</Label>
                  <div className="flex gap-2">
                    <Input
                      id="reset-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email address"
                    />
                    <Button
                      onClick={handlePasswordReset}
                      disabled={loading || !email}
                      variant="outline"
                    >
                      {loading ? 'Sending...' : 'Reset Password'}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We'll send a password reset link to this email address.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  <CardTitle>Notifications</CardTitle>
                </div>
                <CardDescription>
                  Configure how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about your account
                    </p>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  <CardTitle>Privacy</CardTitle>
                </div>
                <CardDescription>
                  Control your privacy and data settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Help us improve by sharing usage analytics
                    </p>
                  </div>
                  <Switch
                    checked={analytics}
                    onCheckedChange={setAnalytics}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard')}
              >
                Back to Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/profile')}
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
